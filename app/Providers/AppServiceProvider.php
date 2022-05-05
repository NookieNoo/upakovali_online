<?php

namespace App\Providers;

use App\Http\Controllers\Api\V1\OrderController;
use App\Services\ImageUploader;
use App\Utils\CustomPaginator;
use Illuminate\Contracts\Filesystem\Filesystem;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        if ($this->app->environment('local')) {
            $this->app->register(\Laravel\Telescope\TelescopeServiceProvider::class);
            $this->app->register(TelescopeServiceProvider::class);
        }
        $this->app->when(ImageUploader::class)
            ->needs(Filesystem::class)
            ->give(fn() => Storage::disk('order_images'));
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        $this->app->bind(LengthAwarePaginator::class, CustomPaginator::class);
    }
}
