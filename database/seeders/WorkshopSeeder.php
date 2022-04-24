<?php

namespace Database\Seeders;

use App\Models\Workshop;
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
        Workshop::create(['address' => 'Плющиха-Москва, Плющиха, 42', 'latitude' => '37.576367', 'longitude' => '55.741024']);
    }
}
