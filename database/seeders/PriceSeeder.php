<?php

namespace Database\Seeders;

use App\Models\Price;
use DateInterval;
use Illuminate\Database\Seeder;

class PriceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $start = new \DateTimeImmutable();
        Price::create([
            "name" => "Виртуальный прайс для UPAKOVALI",
            "start" => $start,
            "end" => $start->add(new DateInterval('P4Y')),
        ]);
    }
}
