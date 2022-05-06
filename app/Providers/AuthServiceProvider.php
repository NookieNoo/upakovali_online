<?php

namespace App\Providers;

use App\Models\Client;
use App\Models\User;
use Illuminate\Auth\Access\Response;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;
use Illuminate\Auth\Notifications\ResetPassword;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array
     */
    protected $policies = [
        // 'App\Models\Model' => 'App\Policies\ModelPolicy',
        'App\Models\Order' => 'App\Policies\OrderPolicy',
        'App\Models\Client' => 'App\Policies\ClientPolicy',
        'App\Models\User' => 'App\Policies\UserPolicy',
        'App\Models\Parthner' => 'App\Policies\ParthnerPolicy',
        'App\Models\Activity' => 'App\Policies\ActivityPolicy',
        'App\Models\Price' => 'App\Policies\PricePolicy',
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();

        ResetPassword::createUrlUsing(function ($user, string $token) {
            $domain = config('main.frontend_domain');
            return "https://$domain/new-password?token=$token&email=$user->email";
        });

//        Gate::define('show-one-order', function (User $user, Order $order) {
//            if ($user->id === $order->client_id) {
//                return Response::allow();
//            }
//            return Response::deny();
//        });
    }
}
