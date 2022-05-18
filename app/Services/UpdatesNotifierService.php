<?php


namespace App\Services;


use Illuminate\Support\Facades\Http;

class UpdatesNotifierService
{
    public function handle(string $url, array $changes)
    {
        Http::post($url, $changes);
    }
}
