<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('roles')->insert([
            ['id' => 1, 'name' => 'Администратор'],
            ['id' => 2, 'name' => 'Менеджер'],
            ['id' => 3, 'name' => 'Мастер'],
            ['id' => 4, 'name' => 'Курьер'],
        ]);
    }
}
