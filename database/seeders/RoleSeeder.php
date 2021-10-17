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
            ['id' => 1, 'name' => 'admin', 'visible_name' => 'Администратор'],
            ['id' => 2, 'name' => 'manager', 'visible_name' => 'Менеджер'],
            ['id' => 3, 'name' => 'master', 'visible_name' => 'Мастер'],
            ['id' => 4, 'name' => 'courier', 'visible_name' => 'Курьер'],
        ]);
    }
}
