<?php

namespace Database\Seeders;

use App\Enums\ServiceTypes;
use App\Models\Price;
use App\Models\Service;
use Illuminate\Database\Eloquent\Factories\Sequence;
use Illuminate\Database\Seeder;

class ServiceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Service::factory()
            ->count(6)
            ->state(new Sequence(
                ['name' => 'Упаковка до 50', 'price_id' => Price::orderBy('id')->first()->id, 'product_id' => ServiceTypes::PACKAGE],
                ['name' => 'Упаковка 50-100', 'price_id' => Price::orderBy('id')->first()->id, 'product_id' => ServiceTypes::PACKAGE],
                ['name' => 'Упаковка 100-150', 'price_id' => Price::orderBy('id')->first()->id, 'product_id' => ServiceTypes::PACKAGE],
                ['name' => 'Упаковка 150-200', 'price_id' => Price::orderBy('id')->first()->id, 'product_id' => ServiceTypes::PACKAGE],
                ['name' => 'Доставка', 'price_id' => Price::orderBy('id')->first()->id, 'product_id' => ServiceTypes::DELIVERY_OR_PICKING],
                ['name' => 'Забор', 'price_id' => Price::orderBy('id')->first()->id, 'product_id' => ServiceTypes::DELIVERY_OR_PICKING],
            ))
            ->create();
    }
}
