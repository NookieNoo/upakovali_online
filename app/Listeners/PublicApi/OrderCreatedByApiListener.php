<?php

namespace App\Listeners\PublicApi;

use App\Events\PublicApi\OrderCreatedByApi;
use App\Notifications\Order\OrderCancelledByApiNotification;
use App\Notifications\PublicApi\OrderCreatedByApiNotification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Notification;

class OrderCreatedByApiListener
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
     * @param  \App\Events\PublicApi\OrderCreatedByApi  $event
     * @return void
     */
    public function handle(OrderCreatedByApi $event)
    {
        Notification::route('mail', config('mail.send_api_reports_to'))
            ->notify(new OrderCreatedByApiNotification($event->getOrder(), $event->getPartner()));
    }
}
