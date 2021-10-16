<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Order\OrderGetRequest;
use App\Http\Requests\Order\OrderStoreRequest;
use App\Http\Requests\Order\OrderUpdateRequest;
use App\Models\Order;
use App\Models\OrderStatus;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

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
        return Order::withFilters($request)->with('orderStatus', 'source', 'parthner', 'client', 'workshop', 'addressee', 'pickUpPoint',
            'deliveryPoint', 'courierReceiver', 'courierIssuer', 'master')->withOrder($request)->withPaginate($request);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  OrderStoreRequest  $request
     * @return JsonResponse
     */
    public function store(OrderStoreRequest $request)
    {
        if ($request->user()->cannot('create', Order::class)) {
            return $this->sendError('Доступ закрыт', Response::HTTP_FORBIDDEN);
        }
        try {
            $validatedData = $request->validated();
            $validatedData['order_status_id'] = OrderStatus::first()->id;
            $order = Order::create($validatedData);
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

        return $this->send(Response::HTTP_OK, null, $order);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return JsonResponse
     */
    public function update(OrderUpdateRequest $request, $id)
    {
        try {
            $order = Order::findOrFail($id);
            if ($request->user()->cannot('update', $order, Order::class)) {
                return $this->sendError('Доступ закрыт', Response::HTTP_FORBIDDEN);
            }
        } catch (ModelNotFoundException $e) {
            return $this->sendError('Заказ не найден.', Response::HTTP_NOT_FOUND);
        }

        $validatedData = $request->validated();

        $order->update($validatedData);

        return $this->send(Response::HTTP_OK, 'Данные сохранены.', $order->load(Order::$supportedRelations));
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
