<?php

namespace App\Providers;

use App\Events\Order\OrderCreated;
use App\Events\Order\OrderStatusUpdated;
use App\Events\Order\OrderUpdated;
use App\Listeners\Order\OrderCreatedListener;
use App\Listeners\Order\OrderStatusUpdatedListener;
use App\Listeners\Order\OrderUpdatedListener;
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
