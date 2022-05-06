<?php

namespace App\Listeners\Order;

use App\Events\Order\OrderCreated;
use App\Notifications\Order\CreateOrderNotification;
use Illuminate\Support\Facades\Notification;

class OrderCreatedListener
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
     * @param  OrderCreated  $event
     * @return void
     */
    public function handle(OrderCreated $event)
    {
        Notification::route('mail', config('mail.send_reports_to'))
            ->notify(new CreateOrderNotification($event->getOrder()));
    }
}
