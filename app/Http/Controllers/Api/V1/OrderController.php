<?php

namespace App\Http\Controllers\Api\V1;

use App\Actions\Order\OrderCreateAction;
use App\Actions\Order\OrderUpdateAction;
use App\Events\Order\OrderStatusUpdated;
use App\Http\Controllers\Controller;
use App\Http\Requests\Order\OrderGetRequest;
use App\Http\Requests\Order\OrderStoreRequest;
use App\Http\Requests\Order\OrderUpdateRequest;
use App\Http\Requests\Order\OrderUpdateStatusRequest;
use App\Http\Resources\OrderShowOneResource;
use App\Models\Order;
use App\Models\OrderHistory;
use App\Services\Order\Exceptioin\OrderCheckerServiceException;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return JsonResponse
     */
    public function index(OrderGetRequest $request)
    {
        if ($request->user()->cannot('viewAny', Order::class)) {
            return $this->sendError('Доступ закрыт', Response::HTTP_FORBIDDEN);
        }
        return Order::withFiltersByPermission($request->user())->withFilters($request)->with('orderStatus', 'source', 'parthner',
            'client', 'workshop', 'pickUpPoint', 'deliveryPoint', 'deliveryAddressPoint', 'pickUpAddressPoint', 'courierReceiver', 'courierIssuer', 'master', 'receiver')
            ->withOrder($request)->withPaginate($request);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  OrderStoreRequest  $request
     * @return JsonResponse
     */
    public function store(OrderStoreRequest $request, OrderCreateAction $orderCreateAction)
    {
        if ($request->user()->cannot('create', Order::class)) {
            return $this->sendError('Доступ закрыт', Response::HTTP_FORBIDDEN);
        }
        try {
            $order = $orderCreateAction->handle($request->validated(), $request->user());
        } catch (\Exception $e) {
            return $this->sendError('Не удалось создать заказ', Response::HTTP_INTERNAL_SERVER_ERROR, $e->getMessage());
        }

        return $this->send(
            Response::HTTP_CREATED,
            Response::$statusTexts[Response::HTTP_CREATED],
            $order->load(Order::$supportedRelations)
        );
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return JsonResponse
     */
    public function show(Request $request, $id)
    {
        try {
            $order = Order::withAllRelations()->findOrFail($id);
            if ($request->user()->cannot('view', $order, Order::class)) {
                return $this->sendError('Доступ закрыт', Response::HTTP_FORBIDDEN);
            }
        } catch (ModelNotFoundException $e) {
            return $this->sendError('Заказ не найден', Response::HTTP_NOT_FOUND);
        }

        return $this->send(Response::HTTP_OK, null, new OrderShowOneResource($order));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return JsonResponse
     */
    public function update(OrderUpdateRequest $request, $id, OrderUpdateAction $orderUpdateAction)
    {
        try {
            $order = Order::findOrFail($id);
            if ($request->user()->cannot('update', $order, Order::class)) {
                return $this->sendError('Доступ закрыт', Response::HTTP_FORBIDDEN);
            }
        } catch (ModelNotFoundException $e) {
            return $this->sendError('Заказ не найден.', Response::HTTP_NOT_FOUND);
        }

        try {
            $order = $orderUpdateAction->handle($order, $request->validated(), $request->user());
        } catch (OrderCheckerServiceException $e) {
            return $this->sendError($e->getMessage(), Response::HTTP_CONFLICT, $e->getMessage());
        } catch (\Exception $e) {
            return $this->sendError('Не удалось обновить заказ', Response::HTTP_INTERNAL_SERVER_ERROR, $e->getMessage());
        }

        return $this->send(Response::HTTP_OK, 'Данные сохранены.', $order->load(Order::$supportedRelations));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  OrderUpdateStatusRequest  $request
     * @param  int  $id
     * @return JsonResponse
     */
    public function updateStatus(OrderUpdateStatusRequest $request, $id)
    {
        try {
            $order = Order::findOrFail($id);
            if ($request->user()->cannot('updateStatus', $order, Order::class)) {
                return $this->sendError('Доступ закрыт', Response::HTTP_FORBIDDEN);
            }
        } catch (ModelNotFoundException $e) {
            return $this->sendError('Заказ не найден.', Response::HTTP_NOT_FOUND);
        }

        try {
            DB::transaction(function () use ($request, $order) {
                $order->order_status_id = $request->get('order_status_id');
                $order->save();

                $orderHistory = new OrderHistory([
                    'order_id' => $order->id,
                    'status_id' => $order->order_status_id,
                    'causer_id' => $request->user()->id,
                    'causer_type' => get_class($request->user()),
                    'date' => Carbon::now(),
                ]);
                $orderHistory->save();
            });
        } catch (\Exception $e) {
            return $this->sendError('Не удалось изменить статус заказа', Response::HTTP_INTERNAL_SERVER_ERROR, $e->getMessage());
        }

        //TODO убрать dispatch bз контроллера
        $this->dispatcher->dispatch(new OrderStatusUpdated($order));
        return $this->send(Response::HTTP_OK, 'Статус обновлен');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return JsonResponse
     */
    public function destroy(Request $request, $id)
    {
        try {
            $order = Order::findOrFail($id);
            if ($request->user()->cannot('delete', $order, Order::class)) {
                return $this->sendError('Доступ закрыт', Response::HTTP_FORBIDDEN);
            }
            $order->delete();
        } catch (ModelNotFoundException $e) {
            return $this->sendError('Заказ не найден.', Response::HTTP_NOT_FOUND);
        }
        return $this->send(Response::HTTP_OK, 'Заказ успешно удален');
    }
}
