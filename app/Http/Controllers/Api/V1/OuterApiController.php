<?php

namespace App\Http\Controllers\Api\V1;

use App\Enums\OrderStatus;
use App\Http\Controllers\Controller;
use App\Http\Requests\Activity\ActivityGetRequest;
use App\Http\Requests\OuterApi\CancelOrderRequest;
use App\Http\Requests\OuterApi\GetServiceDataRequest;
use App\Http\Requests\OuterApi\SetOrderStatusRequest;
use App\Http\Requests\OuterApi\UpdateOrderRequest;
use App\Models\Activity;
use App\Models\Order;
use App\Models\OrderHistory;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;

class OuterApiController extends Controller
{
    public function getServiceData(GetServiceDataRequest $request)
    {

        return ['success' => true];
    }

    public function createOrder(Request $request)
    {

        return ['success' => true];
    }


    /**
     * @OA\Patch (
     *     path="/outer-api/updateOrder",
     *     operationId="updateOrder",
     *     tags={"Order"},
     *     summary="Изменить время приема/доставки заказа",
     *     security={
     *       {"Bearer Token": {}},
     *     },
     *
     *     @OA\RequestBody(
     *         @OA\MediaType(mediaType="application/json",
     *              @OA\Schema(
     *                  @OA\Property(property="external_number", type="string", description="Внешний номер заказа"),
     *                  @OA\Property(property="receiving_date", type="string", description="Время приема в формате (d-m-Y H:i)"),
     *                  @OA\Property(property="issue_date", type="string", description="Время выдачи в формате (d-m-Y H:i)"),
     *                  example={"external_number": "04073d28-5ffd-3715-b7fa-77736767bf29", "receiving_date": "09-11-2021 15:21", "issue_date": "09-11-2021 16:00"}
     *              ),
     *         )
     *     ),
     *
     *     @OA\Response(
     *         response="200",
     *         description="Ok",
     *     ),
     * )
     *
     * Изменить статус заказа
     *
     * @return JsonResponse
     */
    public function updateOrder(UpdateOrderRequest $request)
    {
        $validatedData = $request->validated();
        $external_number = $validatedData['external_number'];
        try {
            $order = Order::where([
                'parthner_id' => $request->user()->id,
                'external_number' => $external_number
            ])->firstOrFail();
            //@TODO Добавить policy
//            if ($request->user()->cannot('updateStatus', $order, Order::class)) {
//                return $this->sendError('Доступ закрыт', Response::HTTP_FORBIDDEN);
//            }
        } catch (ModelNotFoundException $e) {
            return $this->sendError('Заказ не найден.', Response::HTTP_NOT_FOUND);
        }

        try {
            DB::transaction(function () use ($order, $validatedData) {
                $order->receiving_date = $validatedData['receiving_date'];
                $order->issue_date = $validatedData['issue_date'];
                $order->save();
            });
        } catch (\Exception $e) {
            return $this->sendError('Не удалось изменить заказ', Response::HTTP_INTERNAL_SERVER_ERROR, $e->getMessage());
        }

        return $this->send(Response::HTTP_OK, 'Заказ обновлен');
    }

    /**
     * @OA\Patch (
     *     path="/outer-api/setStatus",
     *     operationId="setStatus",
     *     tags={"Order"},
     *     summary="Изменить статус заказа",
     *     security={
     *       {"Bearer Token": {}},
     *     },
     *
     *     @OA\RequestBody(
     *         @OA\MediaType(mediaType="application/json",
     *              @OA\Schema(
     *                  @OA\Property(property="external_number", type="string", description="Внешний номер заказа"),
     *                  @OA\Property(property="order_status_id", type="integer", description="Новый статус заказа ( 1 - Создан, 2 - Курьер назначен, 3 - Забрали, 4 - Приняли, 5 - В работе, 6 - Упаковали, 7 - Выдали, 8 - Курьер выдает, 9 - Доставили, 10 - Оплатили, 11 - Отмена)"),
     *                  example={"external_number": "04073d28-5ffd-3715-b7fa-77736767bf29", "order_status_id": 2}
     *              ),
     *         )
     *     ),
     *
     *     @OA\Response(
     *         response="200",
     *         description="Ok",
     *     ),
     * )
     *
     * Изменить статус заказа
     *
     * @return JsonResponse
     */
    public function setStatus(SetOrderStatusRequest $request)
    {
        $validatedData = $request->validated();
        $external_number = $validatedData['external_number'];
        $newOrderStatus = (int)$validatedData['order_status_id'];
        try {
            $order = Order::where([
                'parthner_id' => $request->user()->id,
                'external_number' => $external_number
            ])->firstOrFail();
            //@TODO Добавить policy
//            if ($request->user()->cannot('updateStatus', $order, Order::class)) {
//                return $this->sendError('Доступ закрыт', Response::HTTP_FORBIDDEN);
//            }
        } catch (ModelNotFoundException $e) {
            return $this->sendError('Заказ не найден.', Response::HTTP_NOT_FOUND);
        }

        try {
            DB::transaction(function () use ($order, $request, $newOrderStatus) {

                if ($order->order_status_id !== $newOrderStatus) {
                    $orderHistory = new OrderHistory([
                        'order_id' => $order->id,
                        'status_id' => $newOrderStatus,
                        'causer_id' => $request->user()->id,
                        'causer_type' => get_class($request->user()),
                        'date' => Carbon::now(),
                    ]);
                    $orderHistory->save();
                }

                $order->order_status_id = $newOrderStatus;
                $order->save();
            });
        } catch (\Exception $e) {
            return $this->sendError('Не удалось изменить статус заказа', Response::HTTP_INTERNAL_SERVER_ERROR, $e->getMessage());
        }

        return $this->send(Response::HTTP_OK, 'Статус заказа изменен');
    }

    /**
     * @OA\Patch (
     *     path="/outer-api/cancelOrder",
     *     operationId="cancelOrder",
     *     tags={"Order"},
     *     summary="Отменить заказ",
     *     security={
     *       {"Bearer Token": {}},
     *     },
     *
     *     @OA\RequestBody(
     *         @OA\MediaType(mediaType="application/json",
     *              @OA\Schema(
     *                  @OA\Property(property="external_number", type="string", description="Внешний номер заказа"),
     *                  example={"external_number": "04073d28-5ffd-3715-b7fa-77736767bf29"}
     *              )
     *         )
     *     ),
     *
     *     @OA\Response(
     *         response="200",
     *         description="Ok",
     *     ),
     * )
     *
     * Отменить заказ
     *
     * @return JsonResponse
     */
    public function cancelOrder(CancelOrderRequest $request)
    {
        $validatedData = $request->validated();
        try {
            $order = Order::where([
                'parthner_id' => $request->user()->id,
                'external_number' => $validatedData['external_number']
            ])->firstOrFail();
            //@TODO Добавить policy
//            if ($request->user()->cannot('updateStatus', $order, Order::class)) {
//                return $this->sendError('Доступ закрыт', Response::HTTP_FORBIDDEN);
//            }
        } catch (ModelNotFoundException $e) {
            return $this->sendError('Заказ не найден.', Response::HTTP_NOT_FOUND);
        }

        try {
            DB::transaction(function () use ($order, $request) {

                if ($order->order_status_id !== OrderStatus::CANCELED) {
                    $orderHistory = new OrderHistory([
                        'order_id' => $order->id,
                        'status_id' => $order->order_status_id,
                        'causer_id' => $request->user()->id,
                        'causer_type' => get_class($request->user()),
                        'date' => Carbon::now(),
                    ]);
                    $orderHistory->save();
                }

                $order->order_status_id = OrderStatus::CANCELED;
                $order->save();
            });
        } catch (\Exception $e) {
            return $this->sendError('Не удалось отменить заказ', Response::HTTP_INTERNAL_SERVER_ERROR, $e->getMessage());
        }

        return $this->send(Response::HTTP_OK, 'Заказ отменен');
    }
}
