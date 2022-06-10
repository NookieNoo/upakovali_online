<?php

namespace App\Providers;

use App\Models\Client;
use App\Models\User;
use Illuminate\Auth\Access\Response;
use Illuminate\Auth\Notifications\VerifyEmail;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Carbon;
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

        VerifyEmail::createUrlUsing(function ($notifiable) {
            $params = [
                "expires" => Carbon::now()
                    ->addMinutes(60)
                    ->getTimestamp(),
                "id" => $notifiable->getKey(),
                "hash" => sha1($notifiable->getEmailForVerification()),
            ];

            ksort($params);

            // then create API url for verification. my API have `/api` prefix,
            // so I don't want to show that url to users
            $url = \URL::route("verification.verify", $params, true);

            // get APP_KEY from config and create signature
            $key = config("app.key");
            $signature = hash_hmac("sha256", $url, $key);

            // generate url for yous SPA page to send it to use
            return config('main.frontend_domain') .
                "/verify-email/" .
                $params["id"] .
                "/" .
                $params["hash"] .
                "?expires=" .
                $params["expires"] .
                "&signature=" .
                $signature;
        });

//        Gate::define('show-one-order', function (User $user, Order $order) {
//            if ($user->id === $order->client_id) {
//                return Response::allow();
//            }
//            return Response::deny();
//        });
    }
}
