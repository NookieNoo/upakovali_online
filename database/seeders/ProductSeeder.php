<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('products')->insert([
            ['id' => 1, 'name' => 'Доставка/Забор'],
            ['id' => 2, 'name' => 'Упаковка'],
            ['id' => 3, 'name' => 'Коробки'],
            ['id' => 4, 'name' => 'Открытки'],
        ]);
    }
}
