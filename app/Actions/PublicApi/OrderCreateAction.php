<?php

namespace App\Actions\PublicApi;

use App\Dto\OrderCreateByApiDto;
use App\Enums\OrderStatus as OrderStatusEnum;
use App\Enums\SourceType;
use App\Events\PublicApi\OrderCreatedByApi;
use App\Models\Client;
use App\Models\Order;
use App\Models\OrderHistory;
use App\Models\Parthner;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Contracts\Events\Dispatcher;
use Illuminate\Support\Facades\DB;

class OrderCreateAction
{
    public function __construct(
        private Dispatcher $dispatcher,
    )
    {
    }

    public function handle(OrderCreateByApiDto $orderDto, Parthner $partner): Order
    {
        $orderDto->source_id = SourceType::API;
        $orderDto->parthner_id = $partner->id;
        $orderDto->is_paid = false;
        $orderDto->order_status_id = OrderStatusEnum::CREATED;
        $orderDto->is_pickupable = isset($orderDto->pick_up_address);
        $orderDto->is_deliverable = isset($orderDto->delivery_address);

        $client = Client::where($orderDto->client->only('full_name', 'phone')->toArray())->first();
        if (!$client) {
            $client = Client::create($orderDto->client->toArray());
        }

        $order = DB::transaction(function () use ($client, $orderDto, $partner) {
            $order = Order::create(array_merge($orderDto->toArray(), [
                'client_id' => $client->id,
                'receiver_id' => $client->id, //TODO Узнать, правильно ли?
            ]));

            $order->history()->create([
                'order_id' => $order->id,
                'status_id' => OrderStatusEnum::CREATED,
                'causer_id' => $partner->id,
                'causer_type' => get_class($partner),
                'date' => Carbon::now(),
            ]);

            return $order;
        });

        $this->dispatcher->dispatch(new OrderCreatedByApi($order, $partner));

        return $order;
    }
}
