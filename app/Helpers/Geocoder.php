<?php

namespace App\Helpers;

use App\Helpers\Geo\Api;


class Geocoder
{
    protected $api;
    public function __construct()
    {
        $this->api = new Api();
        $this->api->setToken(config('services.yandex-geo.token'));
    }

    public function getCoordsByAddress(string $address)
    {
        try {
            $this->api
                ->setLimit(1)
                ->setLang(\App\Helpers\Geo\Api::LANG_US)
                ->setQuery($address)
                ->load();
        } catch (\Exception $e) {
            throw new \Exception($e->getMessage());
        }

        $response = $this->api->getResponse();
        return [
            'latitude' => $response->getLatitude(),
            'longitude' => $response->getLongitude(),
        ];
    }
}
