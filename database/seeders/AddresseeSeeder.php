<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AddresseeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('addressees')->insert([
            ['id' => 1, 'name' => 'Женщина'],
            ['id' => 2, 'name' => 'Мужчина'],
            ['id' => 3, 'name' => 'Девочка'],
            ['id' => 4, 'name' => 'Мальчик'],
        ]);
    }
}
