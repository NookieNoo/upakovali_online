<?php

namespace App\Actions\Order;

use App\Events\Order\OrderUpdated;
use App\Models\Activity;
use App\Models\AdditionalProduct;
use App\Models\Gift;
use App\Models\Order;
use App\Models\OrderHistory;
use App\Models\OrderPhoto;
use App\Models\User;
use App\Services\ImageUploader;
use Carbon\Carbon;
use Illuminate\Contracts\Events\Dispatcher;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Spatie\Activitylog\Facades\LogBatch;

class OrderUpdateAction
{
    public function __construct(
        private Dispatcher    $dispatcher,
        private ImageUploader $imageUploader,
    )
    {
    }

    public function handle(Order $order, array $orderData, User $user)
    {
        LogBatch::startBatch();
        $order = DB::transaction(function () use ($order, $orderData, $user) {
            $validatedData = $orderData;

            if ($order->order_status_id !== $validatedData['order_status_id']) {
                $orderHistory = OrderHistory::create([
                    'order_id' => $order->id,
                    'status_id' => $validatedData['order_status_id'],
                    'causer_id' => $user->id,
                    'causer_type' => get_class($user),
                    'date' => Carbon::now(),
                ]);
            }

            $order->update($validatedData);

            $order->gifts()->delete(); //FIXME update instead of create
            foreach ($validatedData['gifts'] as $giftData) {
                $gift = Gift::create(array_merge($giftData, ['order_id' => $order->id]));
            }

            if (!empty($validatedData['additional_products'])) {
                $order->additionalProducts()->delete();
                foreach ($validatedData['additional_products'] as $productData) {
                    $product = AdditionalProduct::create(array_merge($productData, ['order_id' => $order->id]));
                }
            }

            if (empty($validatedData['order_photos'])) $order->orderPhotos()->delete();

            foreach ($validatedData['order_photos'] as $photo) {
                if (!empty($photo['id'])) continue;
                $base64str = preg_replace('/^data:image\/\w+;base64,/', '', $photo['src']);

                $this->imageUploader->save($order->id . '/' . $photo['title'], base64_decode($base64str));
//                Storage::disk('order_images')->put($order->id . '/' . $photo['title'], base64_decode($base64str));

                $orderPhoto = OrderPhoto::create([
                    'order_id' => $order->id,
                    'path' => '/' . basename(Storage::disk('order_images')->getAdapter()->getPathPrefix()) . '/' . $order->id . '/' . $photo['title'],
                ]);
            }

            return $order;
        });
        $batchUuid = LogBatch::getUuid();
        LogBatch::endBatch();

//        $lastActivity = Activity::where(['subject_type' => get_class($order), 'subject_id' => $order->id])->latest()->first();
//        $acts = $order->activities;

        $this->dispatcher->dispatch(new OrderUpdated($order, $batchUuid));

        return $order;
    }

}
