<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class OrderStatusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('order_statuses')->insert([
            ['id' => 1, 'name' => 'Создан'],
            ['id' => 2, 'name' => 'Курьер назначен'],
            ['id' => 3, 'name' => 'Забрали'],
            ['id' => 4, 'name' => 'Приняли'],
            ['id' => 5, 'name' => 'В работе'],
            ['id' => 6, 'name' => 'Упаковали'],
            ['id' => 7, 'name' => 'Выдали'],
            ['id' => 8, 'name' => 'Курьер выдает'],
            ['id' => 9, 'name' => 'Доставили'],
            ['id' => 10, 'name' => 'Оплатили'],
            ['id' => 11, 'name' => 'Отмена'],
        ]);
    }
}
