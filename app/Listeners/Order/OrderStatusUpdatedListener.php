<?php

namespace App\Listeners\Order;

use App\Events\Order\OrderStatusUpdated;
use App\Jobs\NotifyStatusChanged;
use App\Notifications\Order\UpdateOrderStatusNotification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Notification;

class OrderStatusUpdatedListener
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  OrderStatusUpdated  $event
     * @return void
     */
    public function handle(OrderStatusUpdated $event)
    {
        $order = $event->getOrder();
        Notification::route('mail', config('mail.send_reports_to'))
            ->notify(new UpdateOrderStatusNotification($order));
        if ($order->isFromApi()) {
            NotifyStatusChanged::dispatch($order, $event->getBatchUuid());
        }
    }
}
