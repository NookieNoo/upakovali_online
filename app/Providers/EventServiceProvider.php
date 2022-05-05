<?php

namespace App\Providers;

use App\Events\Order\OrderCreated;
use App\Events\Order\OrderStatusUpdated;
use App\Listeners\Order\OrderCreatedListener;
use App\Listeners\Order\OrderStatusUpdatedListener;
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
