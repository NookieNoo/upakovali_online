<?php

namespace Database\Seeders;

use App\Enums\ServiceTypes;
use App\Models\Parthner;
use App\Models\Price;
use App\Models\Service;
use Illuminate\Database\Eloquent\Factories\Sequence;
use Illuminate\Database\Seeder;

class ParthnerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Parthner::factory(20)
            ->has(
                Price::factory()
                    ->count(3)
                    ->state(new Sequence(
                        ['name' => 'Прайс для нашего сайта'],
                        ['name' => 'Прайс для Озон'],
                        ['name' => 'Прайс для Спортмастер'],
                    ))
                    ->has(
                        Service::factory()
                            ->count(6)
                            ->state(new Sequence(
                                ['name' => 'Упаковка до 50', 'product_id' => ServiceTypes::PACKAGE],
                                ['name' => 'Упаковка 50-100', 'product_id' => ServiceTypes::PACKAGE],
                                ['name' => 'Упаковка 100-150', 'product_id' => ServiceTypes::PACKAGE],
                                ['name' => 'Упаковка 150-200', 'product_id' => ServiceTypes::PACKAGE],
                                ['name' => 'Доставка', 'product_id' => ServiceTypes::DELIVERY_OR_PICKING],
                                ['name' => 'Забор', 'product_id' => ServiceTypes::DELIVERY_OR_PICKING],
                            ))
                    )
            )
            ->create();
    }
}
