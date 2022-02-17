<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::factory(5)
            ->create();
        DB::table('users')->insert([
            [
                'full_name' => 'Тестовый админ',
                'email' => 'admin@admin.admin',
                'phone' => '+7(197)360-9340',
                'email_verified_at' => now(),
                'password' => Hash::make('0000'),
                'remember_token' => Str::random(10),
                'role_id' => 1,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'full_name' => 'Тестовый менеджер',
                'email' => 'manager@manager.manager',
                'phone' => '+7(535)988-7816',
                'email_verified_at' => now(),
                'password' => Hash::make('0000'),
                'remember_token' => Str::random(10),
                'role_id' => 2,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'full_name' => 'Тестовый мастер',
                'email' => 'master@master.master',
                'phone' => '+7(431)810-1408',
                'email_verified_at' => now(),
                'password' => Hash::make('0000'),
                'remember_token' => Str::random(10),
                'role_id' => 3,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'full_name' => 'Тестовый курьер',
                'email' => 'courier@courier.courier',
                'phone' => '+7(591)367-4638',
                'email_verified_at' => now(),
                'password' => Hash::make('0000'),
                'remember_token' => Str::random(10),
                'role_id' => 4,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);

    }
}
