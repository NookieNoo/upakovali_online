<?php

namespace App\Actions\PublicApi;

use App\Dto\OrderUpdateByApiDto;
use App\Enums\OrderStatus as OrderStatusEnum;
use App\Enums\SourceType;
use App\Events\PublicApi\OrderCreatedByApi;
use App\Events\PublicApi\OrderUpdatedByApi;
use App\Helpers\Geocoder;
use App\Models\AdditionalProduct;
use App\Models\Client;
use App\Models\DeliveryPoint;
use App\Models\Gift;
use App\Models\Order;
use App\Models\Parthner;
use Carbon\Carbon;
use Illuminate\Contracts\Events\Dispatcher;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;
use Spatie\Activitylog\Facades\LogBatch;

class OrderUpdateAction
{
    public function __construct(
        private Dispatcher $dispatcher,
        private Geocoder   $geocoder,
    )
    {
    }

    public function handle(Order $order, OrderUpdateByApiDto $orderDto, Parthner $partner): Order
    {
        $orderDto->is_pickupable = isset($orderDto->pick_up_address);
        $orderDto->is_deliverable = isset($orderDto->delivery_address);

        $order->fill($orderDto->toArray());

        $client = Client::where($orderDto->client->only('full_name', 'phone')->toArray())->first();
        if (!$client) {
            $client = Client::create($orderDto->client->toArray());
        }
        $order->client_id = $client->id; //TODO До какого статуса можно менять клиента
//дать возможность менять мастера (или не указывать его при создании)
        $receiver = Client::where($orderDto->receiver->only('full_name', 'phone')->toArray())->first();
        if (!$receiver) {
            $receiver = Client::create($orderDto->receiver->toArray());
        }
        $order->receiver_id = $receiver->id; //TODO До какого статуса можно менять получателя

        if ($order->isDirty('pick_up_address') && $order->is_pickupable === true) { // TODO До какого статуса можно менять опции доставки
            $pickUpPoint = DeliveryPoint::where(["address" => $order->pick_up_address])->first();
            if (!$pickUpPoint) {
                $coords = $this->geocoder->getCoordsByAddress($order->pick_up_address); //todo проверить, что будет при недоступности сервиса
                $pickUpPoint = new DeliveryPoint([
                    'address' => $order->pick_up_address,
                    'latitude' => $coords['latitude'],
                    'longitude' => $coords['longitude'],
                ]);
                $pickUpPoint->save();
            }
            $order->pick_up_address_point_id = $pickUpPoint->id;
            $order->pick_up_point_id = null;
        }
        if ($order->isDirty('is_pickupable') && $order->is_pickupable === false) {
            $order->pick_up_price = null;
            $order->pick_up_address = null;
            $order->pick_up_address_point_id = null;
        }


        if ($order->isDirty('delivery_address') && $order->is_deliverable === true) { // TODO До какого статуса можно менять опции доставки
            $deliveryPoint = DeliveryPoint::where(["address" => $order->delivery_address])->first();
            if (!$deliveryPoint) {
                $coords = $this->geocoder->getCoordsByAddress($order->delivery_address); //todo проверить, что будет при недоступности сервиса
                $deliveryPoint = new DeliveryPoint([
                    'address' => $order->delivery_address,
                    'latitude' => $coords['latitude'],
                    'longitude' => $coords['longitude'],
                ]);
                $deliveryPoint->save();
            }
            $order->delivery_address_point_id = $deliveryPoint->id;
            $order->delivery_point_id = null;
        }
        if ($order->isDirty('is_deliverable') && $order->is_deliverable === false) {
            $order->delivery_price = null;
            $order->delivery_address = null;
            $order->delivery_address_point_id = null;
        }

        LogBatch::startBatch();
        $order = DB::transaction(function () use ($order, $orderDto, $partner) {
            $order->save();

            $order->load('gifts');
            $giftIds = Arr::whereNotNull(Arr::pluck(array_map(fn($it) => $it->toArray(), $orderDto->gifts), 'id'));
            $oldIds = $order->gifts->pluck('id')->toArray();
            $idsToDelete = array_diff($oldIds, $giftIds);

            Gift::destroy($idsToDelete);
            foreach ($orderDto->gifts as $giftData) {
                if (isset($giftData->id)) {
                    $order->gifts->find($giftData->id)->fill($giftData->toArray())->save();
                } else {
                    $order->gifts()->create($giftData->toArray());
                }
            }


            $order->load('additionalProducts');
            $addProductsIds = Arr::whereNotNull(Arr::pluck(array_map(fn($it) => $it->toArray(), $orderDto->additional_products), 'id'));
            $oldProductsIds = $order->additionalProducts->pluck('id')->toArray();
            $idsProductsToDelete = array_diff($oldProductsIds, $addProductsIds);

            AdditionalProduct::destroy($idsProductsToDelete);
            if (!empty($orderDto->additional_products)) {
                foreach ($orderDto->additional_products as $additionalProductData) {
                    if (isset($additionalProductData->id)) {
                        $order->additionalProducts->find($additionalProductData->id)->fill($additionalProductData->toArray())->save();
                    } else {
                        $order->additionalProducts()->create($additionalProductData->toArray());
                    }
                }
            }

            if ($order->isDirty('order_status_id')) {
                $order->history()->create([
                    'status_id' => $order->order_status_id,
                    'causer_id' => $partner->id,
                    'causer_type' => get_class($partner),
                    'date' => Carbon::now(),
                ]);
            }

            return $order;
        });
        $batchUuid = LogBatch::getUuid();
        LogBatch::endBatch();

        $this->dispatcher->dispatch(new OrderUpdatedByApi($order, $batchUuid));

        return $order;
    }
}
