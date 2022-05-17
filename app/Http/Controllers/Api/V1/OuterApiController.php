<?php

namespace App\Http\Controllers\Api\V1;

use App\Actions\PublicApi\OrderCreateAction;
use App\Enums\OrderStatus;
use App\Enums\OrderStatus as OrderStatusEnum;
use App\Enums\SourceType;
use App\Events\Order\OrderCancelledByApi;
use App\Events\Order\OrderStatusUpdatedByApi;
use App\Http\Controllers\Controller;
use App\Http\Requests\Activity\ActivityGetRequest;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\OuterApi\CancelOrderRequest;
use App\Http\Requests\OuterApi\CreateOrderRequest;
use App\Http\Requests\OuterApi\GetServiceDataRequest;
use App\Http\Requests\OuterApi\SetOrderStatusRequest;
use App\Http\Requests\OuterApi\UpdateOrderRequest;
use App\Http\Resources\OrderShowOneResource;
use App\Models\Activity;
use App\Models\Addressee;
use App\Models\Client;
use App\Models\Order;
use App\Models\OrderHistory;
use App\Models\Price;
use App\Models\User;
use App\Models\Workshop;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class OuterApiController extends Controller
{
    public function getServiceData(GetServiceDataRequest $request)
    {

        return ['success' => true];
    }

    /**
     * @OA\Post  (
     *     path="/outer-api/createOrder",
     *     operationId="createOrder",
     *     tags={"Заказ"},
     *     summary="Создать заказ",
     *     security={
     *       {"Bearer Token": {}},
     *     },
     *
     *     @OA\RequestBody(
     *         @OA\MediaType(mediaType="application/json",
     *              @OA\Schema(
     *                  @OA\Property(property="external_number", type="string", description="Внешний номер заказа"),
     *
     *                  @OA\Property(property="client", type="object", description="Клиент",
     *                     properties={
     *                          @OA\Property(property="full_name", type="string", description="ФИО клиента",),
     *                          @OA\Property(property="phone", type="string", description="Телефон клиента",),
     *                          @OA\Property(property="email", type="string", description="email клиента",),
     *                     }
     *                  ),
     *
     *                  @OA\Property(property="workshop_id", type="integer", description="Id мастерской"),
     *                  @OA\Property(property="is_pickupable", type="boolean", description="Забор (если да, то указать pick_up_address, иначе выбрать мастерскую)"),
     *                  @OA\Property(property="pick_up_address", type="string", description="Адрес, откуда будем забирать"),
     *                  @OA\Property(property="pick_up_point_id", type="integer", description="Id мастерской, откуда будем забирать"),
     *                  @OA\Property(property="is_deliverable", type="boolean", description="Доставка (если да, то указать delivery_address, иначе выбрать мастерскую)"),
     *                  @OA\Property(property="delivery_address", type="string", description="Адрес, куда доставить"),
     *                  @OA\Property(property="delivery_point_id", type="integer", description="Id мастерской, куда доставить"),
     *
     *                  @OA\Property(property="receiving_date", type="string", description="Время приема в формате (d-m-Y H:i)"),
     *                  @OA\Property(property="issue_date", type="string", description="Время выдачи в формате (d-m-Y H:i)"),
     *                  @OA\Property(property="comment", type="string", maxLength=255, description="Комментарий к заказу"),
     *                  example={"external_number": "14073d28-5ffd-3715-b7fa-77736767bf29", "client": {"full_name": "Григорьев Алексей", "phone": "+79568956624", "email": "test@email.com"}, "workshop_id": 1, "is_pickupable": true, "pick_up_address": "г. Воронеж, Революции проспект 17", "is_deliverable": false, "delivery_point_id": 1, "receiving_date": "10-11-2021 09:00", "issue_date": "11-11-2021 10:00", "comment": "О чернилах и чернильном оружии головоногих моллюсков."}
     *              ),
     *         )
     *     ),
     *
     *     @OA\Response(
     *         response="201",
     *         description="Ok",
     *     ),
     * )
     *
     * Создать заказ
     *
     * @return JsonResponse
     */
    public function createOrder(CreateOrderRequest $request, OrderCreateAction $orderCreateAction)
    {
        try {
            $orderCreateAction->handle($request->getDto(), $request->user());
        } catch (\Exception $e) {
            return $this->sendError('Не удалось создать заказ', Response::HTTP_INTERNAL_SERVER_ERROR, $e->getMessage());
        }

        return $this->send(Response::HTTP_CREATED, 'Заказ создан');
    }


    /**
     * @OA\Patch (
     *     path="/outer-api/updateOrder",
     *     operationId="updateOrder",
     *     tags={"Заказ"},
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

    public function getOrderById(Request $request, $id)
    {
        $order = Order::withAllRelations()->where(['parthner_id' => $request->user()->id, 'external_number' => $id])->first();
        if (!$order) return $this->sendError('Не найден заказ с таким номером', Response::HTTP_NOT_FOUND);

        //FIXME FIX RESOURCE
//        return $this->send(Response::HTTP_OK, null, new OrderShowOneResource($order));
        return $this->send(Response::HTTP_OK, null, $order);
    }

    /**
     * @OA\Patch (
     *     path="/outer-api/setStatus",
     *     operationId="setStatus",
     *     tags={"Заказ"},
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
        $newOrderStatus = $validatedData['order_status_id'];

        $order = Order::where([
            'parthner_id' => $request->user()->id,
            'external_number' => $external_number
        ])->first();

        try {
            DB::transaction(function () use ($order, $request, $newOrderStatus) {
                $order->history()->create([
                    'status_id' => $newOrderStatus,
                    'causer_id' => $request->user()->id,
                    'causer_type' => get_class($request->user()),
                    'date' => Carbon::now()
                ]);

                $order->order_status_id = $newOrderStatus;
                $order->save();
            });
        } catch (\Exception $e) {
            return $this->sendError('Не удалось изменить статус заказа', Response::HTTP_INTERNAL_SERVER_ERROR, $e->getMessage());
        }

        $this->dispatcher->dispatch(new OrderStatusUpdatedByApi($order, $request->user()));

        return $this->send(Response::HTTP_OK, 'Статус заказа изменен');
    }

    /**
     * @OA\Patch (
     *     path="/outer-api/cancelOrder",
     *     operationId="cancelOrder",
     *     tags={"Заказ"},
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
        $order = Order::where([
            'parthner_id' => $request->user()->id,
            'external_number' => $validatedData['external_number']
        ])->first();

        try {
            DB::transaction(function () use ($order, $request) {
                $order->history()->create([
                    'status_id' => OrderStatus::CANCELED,
                    'causer_id' => $request->user()->id,
                    'causer_type' => get_class($request->user()),
                    'date' => Carbon::now()
                ]);

                $order->order_status_id = OrderStatus::CANCELED;
                $order->save();
            });
        } catch (\Exception $e) {
            return $this->sendError('Не удалось отменить заказ', Response::HTTP_INTERNAL_SERVER_ERROR, $e->getMessage());
        }

        $this->dispatcher->dispatch(new OrderCancelledByApi($order, $request->user()));

        return $this->send(Response::HTTP_OK, 'Заказ отменен');
    }

    /**
     * @OA\Get  (
     *     path="/outer-api/workshops",
     *     operationId="getWorkshops",
     *     tags={"Мастерские"},
     *     summary="Получить список мастерских",
     *     security={
     *       {"Bearer Token": {}},
     *     },
     *
     *      @OA\Parameter(
     *         name="page[number]",
     *         in="query",
     *         description="Номер страницы/сдвиг(целое число)",
     *         required=true,
     *      ),
     *      @OA\Parameter(
     *         name="page[size]",
     *         in="query",
     *         description="Записей на странице(целое число)",
     *         required=true,
     *      ),
     *
     *     @OA\Response(
     *         response="200",
     *         description="Ok",
     *     ),
     * )
     *
     * @return JsonResponse
     */
    public function getWorkshops(Request $request)
    {
        return Workshop::withPaginate($request);
    }

    public function getAddressees(Request $request)
    {
        return Addressee::withPaginate($request);
    }

    public function getPrices(Request $request)
    {
        $prices = Price::where(["parthner_id" => $request->user()->id])->with('services')->withFilters($request)->withPaginate($request);
        return $prices;
    }
}
