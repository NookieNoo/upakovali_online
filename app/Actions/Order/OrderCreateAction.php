<?php

namespace App\Actions\Order;

use App\Enums\OrderStatus as OrderStatusEnum;
use App\Events\Order\OrderCreated;
use App\Helpers\Geocoder;
use App\Models\AdditionalProduct;
use App\Models\Client;
use App\Models\DeliveryPoint;
use App\Models\Gift;
use App\Models\Order;
use App\Models\OrderHistory;
use App\Models\OrderPhoto;
use App\Models\User;
use App\Notifications\CreateOrderNotification;
use App\Services\ImageUploader;
use Carbon\Carbon;
use Illuminate\Contracts\Events\Dispatcher;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class OrderCreateAction
{
    public function __construct(
        private Dispatcher $dispatcher,
        private ImageUploader $imageUploader,
    )
    {
    }

    public function handle($orderData, User $user)
    {
        $order = DB::transaction(function () use ($orderData, $user) {
            $validatedData = $orderData;
            $validatedData['order_status_id'] = OrderStatusEnum::CREATED;

            if ($validatedData['is_new_client']) {
                $client = Client::where(['email' => $validatedData['client']['email'], 'phone' => $validatedData['client']['phone']])->first();
                if (!$client) {
                    $client = new Client($validatedData['client']);
                    $client->save();
                }
            } else {
                $client = new Client();
                $client->id = $validatedData['client_id'];
            }

            $validatedData['client_id'] = $client->id;

            if ($validatedData['is_receiver_same']) {
                $receiver = new Client();
                $receiver->id = $client->id;
            } else {
                if ($validatedData['is_new_receiver']) {
                    $receiver = Client::where(['email' => $validatedData['receiver']['email'], 'phone' => $validatedData['receiver']['phone']])->first();
                    if (!$receiver) {
                        $receiver = new Client($validatedData['receiver']);
                        $receiver->save();
                    }
                } else {
                    $receiver = new Client();
                    $receiver->id = $validatedData['receiver_id'];
                }
            }
            $validatedData['receiver_id'] = $receiver->id;

            $geocoder = new Geocoder();
            if (!empty($validatedData['delivery_address'])) {
                $coords = $geocoder->getCoordsByAddress($validatedData['delivery_address']);
                $deliveryPoint = new DeliveryPoint([
                    'address' => $validatedData['delivery_address'],
                    'latitude' => $coords['latitude'],
                    'longitude' => $coords['longitude'],
                ]);
                $deliveryPoint->save();

                $validatedData['delivery_address_point_id'] = $deliveryPoint->id;
            }
            if (!empty($validatedData['pick_up_address'])) {
                $coords = $geocoder->getCoordsByAddress($validatedData['pick_up_address']);
                $deliveryPoint = new DeliveryPoint([
                    'address' => $validatedData['pick_up_address'],
                    'latitude' => $coords['latitude'],
                    'longitude' => $coords['longitude'],
                ]);
                $deliveryPoint->save();

                $validatedData['pick_up_address_point_id'] = $deliveryPoint->id;
            }

            $order = Order::create($validatedData);

            foreach ($validatedData['gifts'] as $giftData) {
                $gift = Gift::create(array_merge($giftData, ['order_id' => $order->id]));
            }

            if (!empty($validatedData['additional_products'])) {
                foreach ($validatedData['additional_products'] as $productData) {
                    $product = AdditionalProduct::create(array_merge($productData, ['order_id' => $order->id]));
                }
            }

            $orderHistory = OrderHistory::create([
                'order_id' => $order->id,
                'status_id' => OrderStatusEnum::CREATED,
                'causer_id' => $user->id,
                'causer_type' => get_class($user),
                'date' => Carbon::now(),
            ]);

            foreach ($validatedData['order_photos'] as $photo) {
                $base64str = preg_replace('/^data:image\/\w+;base64,/', '', $photo['src']);
                $this->imageUploader->save($order->id . '/' . $photo['title'], base64_decode($base64str));
//                Storage::disk('order_images')->put($order->id . '/' . $photo['title'], base64_decode($base64str));

                $orderPhoto = OrderPhoto::create([
                    'order_id' => $order->id,
                    'path' => '/' . basename(Storage::disk('order_images')->getAdapter()->getPathPrefix()) . '/' . $order->id . '/' . $photo['title'],
                    //Storage::url('file.jpg');
                ]);
            }

            return $order;
        });

        $this->dispatcher->dispatch(new OrderCreated($order));

        return $order;
    }
}
