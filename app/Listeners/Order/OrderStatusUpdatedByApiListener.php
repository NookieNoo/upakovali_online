<?php

namespace App\Listeners\Order;

use App\Events\Order\OrderStatusUpdatedByApi;
use App\Notifications\Order\OrderStatusUpdatedByApiNotification;
use App\Notifications\Order\UpdateOrderStatusNotification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Notification;

class OrderStatusUpdatedByApiListener
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
     * @param  \App\Events\Order\OrderStatusUpdatedByApi  $event
     * @return void
     */
    public function handle(OrderStatusUpdatedByApi $event)
    {
        Notification::route('mail', config('mail.send_api_reports_to'))
            ->notify(new OrderStatusUpdatedByApiNotification($event->getOrder(), $event->getPartner()));
    }
}
