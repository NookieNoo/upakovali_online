<?php

namespace App\Listeners\Order;

use App\Events\Order\OrderCreated;
use App\Notifications\CreateOrderNotification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
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
