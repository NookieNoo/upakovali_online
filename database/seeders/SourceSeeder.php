<?php

namespace Database\Seeders;

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
        DB::table('sources')->insert([
            ['id' => 1, 'name' => 'Пешеход'],
            ['id' => 2, 'name' => 'Сайт'],
            ['id' => 3, 'name' => 'API'],
        ]);
    }
}
