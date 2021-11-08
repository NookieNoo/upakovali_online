<?php

namespace App\Http\Controllers\Api\V1;

use App\Enums\OrderStatus;
use App\Http\Controllers\Controller;
use App\Http\Requests\Activity\ActivityGetRequest;
use App\Http\Requests\OuterApi\CancelOrderRequest;
use App\Http\Requests\OuterApi\GetServiceDataRequest;
use App\Models\Activity;
use App\Models\Order;
use App\Models\OrderHistory;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\ModelNotFoundException;
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

    public function setStatus(Request $request)
    {

        return ['success' => true];
    }

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
