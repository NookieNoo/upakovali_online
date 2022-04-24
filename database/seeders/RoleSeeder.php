<?php
namespace Database\Seeders;

use App\Models\Role;
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
        $items = [
            ['name' => 'admin', 'visible_name' => 'Администратор'],
            ['name' => 'manager', 'visible_name' => 'Менеджер'],
            ['name' => 'master', 'visible_name' => 'Мастер'],
            ['name' => 'courier', 'visible_name' => 'Курьер'],
            ['name' => 'parthner', 'visible_name' => 'Партнер'],
        ];
        foreach ($items as $item) {
            Role::create($item);
        }
    }
}
