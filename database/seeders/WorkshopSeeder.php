<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class WorkshopSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('workshops')->insert([
            ['id' => 1, 'address' => 'Плющиха-Москва, Плющиха, 42', 'latitude' => '37.576367', 'longitude' => '55.741024'],
        ]);
    }
}
