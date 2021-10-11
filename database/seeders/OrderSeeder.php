<?php

namespace Database\Seeders;

use App\Models\Client;
use App\Models\Order;
use App\Models\OrderHistory;
use App\Models\OrderPhoto;
use Illuminate\Database\Seeder;

class OrderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Order::factory(20)
            ->create()
            ->each(
                fn($order) => OrderPhoto::factory(rand(0, 5))->create(['order_id' => $order->id])
            )
            ->each(
                fn($order) => OrderHistory::factory(rand(1, 5))->create(['order_id' => $order->id])
            );
    }
}
