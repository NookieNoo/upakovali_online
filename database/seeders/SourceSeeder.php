<?php

namespace Database\Seeders;

use App\Models\Source;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SourceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $items = ['Пешеход', 'Сайт', 'API'];
        foreach ($items as $item) {
            Source::create(['name' => $item]);
        }
    }
}
