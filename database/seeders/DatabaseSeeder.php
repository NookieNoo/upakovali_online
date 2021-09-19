<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Parthner;
use App\Models\Client;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        Client::factory(20)->create();
        Parthner::factory(20)->create();
    }
}
