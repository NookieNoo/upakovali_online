<?php

namespace Database\Seeders;

use App\Models\Parthner;
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
        Parthner::factory()
            ->create();
    }
}
