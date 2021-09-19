<?php

namespace Database\Seeders;

use App\Models\User;
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
        $this->call([
            RoleSeeder::class,
            SourceSeeder::class,
            WorkshopSeeder::class,
            AddresseeSeeder::class,
            OrderStatusSeeder::class,
            UserSeeder::class,
        ]);
        Client::factory(20)->create();
        Parthner::factory(20)->create();
//        User::factory(5)->create();
    }
}
