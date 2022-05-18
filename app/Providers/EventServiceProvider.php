<?php

namespace App\Providers;

use App\Events\Order\OrderCancelledByApi;
use App\Events\Order\OrderCreated;
use App\Events\Order\OrderStatusUpdated;
use App\Events\Order\OrderStatusUpdatedByApi;
use App\Events\Order\OrderUpdated;
use App\Events\PublicApi\OrderCreatedByApi;
use App\Events\PublicApi\OrderUpdatedByApi;
use App\Listeners\Order\OrderCancelledByApiListener;
use App\Listeners\Order\OrderCreatedListener;
use App\Listeners\Order\OrderStatusUpdatedByApiListener;
use App\Listeners\Order\OrderStatusUpdatedListener;
use App\Listeners\Order\OrderUpdatedListener;
use App\Listeners\PublicApi\OrderCreatedByApiListener;
use App\Listeners\PublicApi\OrderUpdatedByApiListener;
use Illuminate\Auth\Events\Registered;
use Illuminate\Auth\Listeners\SendEmailVerificationNotification;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Event;

class EventServiceProvider extends ServiceProvider
{
    /**
     * The event listener mappings for the application.
     *
     * @var array
     */
    protected $listen = [
        Registered::class => [
            SendEmailVerificationNotification::class,
        ],
        OrderStatusUpdated::class => [OrderStatusUpdatedListener::class],
        OrderCreated::class => [OrderCreatedListener::class],
        OrderUpdated::class => [OrderUpdatedListener::class],
        OrderStatusUpdatedByApi::class => [OrderStatusUpdatedByApiListener::class],
        OrderCancelledByApi::class => [OrderCancelledByApiListener::class],
        OrderCreatedByApi::class => [OrderCreatedByApiListener::class],
        OrderUpdatedByApi::class => [OrderUpdatedByApiListener::class]
    ];

    /**
     * Register any events for your application.
     *
     * @return void
     */
    public function boot()
    {
        //
    }
}
