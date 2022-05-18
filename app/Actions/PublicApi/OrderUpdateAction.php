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

//        $client = Client::where($orderDto->client->only('full_name', 'phone')->toArray())->first();
//        if (!$client) {
//            $client = Client::create($orderDto->client->toArray());
//        }
//
//        if ($orderDto->is_pickupable) {
//            $coords = $this->geocoder->getCoordsByAddress($orderDto->pick_up_address);
//            $deliveryPoint = new DeliveryPoint([
//                'address' => $orderDto->pick_up_address,
//                'latitude' => $coords['latitude'],
//                'longitude' => $coords['longitude'],
//            ]);
//            $deliveryPoint->save();
//
//            $orderDto->pick_up_address_point_id = $deliveryPoint->id;
//        }
//
//        if ($orderDto->is_deliverable) {
//            $coords = $this->geocoder->getCoordsByAddress($orderDto->delivery_address);
//            $deliveryPoint = new DeliveryPoint([
//                'address' => $orderDto->delivery_address,
//                'latitude' => $coords['latitude'],
//                'longitude' => $coords['longitude'],
//            ]);
//            $deliveryPoint->save();
//
//            $orderDto->delivery_address_point_id = $deliveryPoint->id;
//        }

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
//            $addProductsIds = Arr::whereNotNull(Arr::pluck($validatedData['additional_products'] ?? [], 'id'));
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

            $order->history()->create([
                'order_id' => $order->id,
                'status_id' => OrderStatusEnum::CREATED,
                'causer_id' => $partner->id,
                'causer_type' => get_class($partner),
                'date' => Carbon::now(),
            ]);

            return $order;
        });
        $batchUuid = LogBatch::getUuid();
        LogBatch::endBatch();

        $this->dispatcher->dispatch(new OrderUpdatedByApi($order, $batchUuid));

        return $order;
    }
}
