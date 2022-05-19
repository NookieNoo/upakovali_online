<?php

namespace App\Listeners\Order;

use App\Events\Order\OrderUpdated;
use App\Jobs\NotifyOrderChanged;
use App\Jobs\NotifyStatusChanged;
use App\Notifications\Order\UpdateOrderNotification;
use Illuminate\Support\Facades\Notification;

class OrderUpdatedListener
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
     * @param  \App\Events\Order\OrderUpdated  $event
     * @return void
     */
    public function handle(OrderUpdated $event)
    {
        $order = $event->getOrder();
        Notification::route('mail', config('mail.send_reports_to'))
            ->notify(new UpdateOrderNotification($order, $event->getBatchUuid()));
        if ($order->isFromApi()) {
            NotifyOrderChanged::dispatch($event->getBatchUuid());
        }
    }
}
