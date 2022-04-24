<?php

namespace Database\Seeders;

use App\Models\OrderStatus;
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
        $items = ['Создан', 'Курьер назначен', 'Забрали', 'Приняли', 'В работе', 'Упаковали', 'Выдали', 'Курьер выдает', 'Доставили', 'Оплатили', 'Отмена'];
        foreach ($items as $item) {
            OrderStatus::create(['name' => $item]);
        }
    }
}
