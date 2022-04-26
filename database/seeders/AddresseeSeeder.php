<?php

namespace Database\Seeders;

use App\Models\Addressee;
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
        $items = ['Женщина', 'Мужчина', 'Девочка', 'Мальчик'];
        foreach ($items as $item) {
            Addressee::create(['name' => $item]);
        }
    }
}
