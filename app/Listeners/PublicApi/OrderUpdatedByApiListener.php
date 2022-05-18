<?php

namespace App\Listeners\PublicApi;

use App\Events\PublicApi\OrderUpdatedByApi;
use App\Notifications\Order\UpdateOrderNotification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Notification;

class OrderUpdatedByApiListener
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
     * @param  object  $event
     * @return void
     */
    public function handle(OrderUpdatedByApi $event)
    {
        Notification::route('mail', config('mail.send_api_reports_to'))
            ->notify(new UpdateOrderNotification($event->getOrder(), $event->getBatchUuid()));
    }
}
