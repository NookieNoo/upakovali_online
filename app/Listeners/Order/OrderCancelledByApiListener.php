<?php

namespace App\Listeners\Order;

use App\Events\Order\OrderCancelledByApi;
use App\Notifications\Order\OrderCancelledByApiNotification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Notification;

class OrderCancelledByApiListener
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
     * @param  \App\Events\Order\OrderCancelledByApi  $event
     * @return void
     */
    public function handle(OrderCancelledByApi $event)
    {
        Notification::route('mail', config('mail.send_api_reports_to'))
            ->notify(new OrderCancelledByApiNotification($event->getOrder(), $event->getPartner()));
    }
}
