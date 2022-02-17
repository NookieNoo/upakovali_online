<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UserFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = User::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $phone = $this->faker->regexify('^\+7ё[0-9]{3}й[0-9]{3}-[0-9]{4}$');
        $phone = str_replace('ё', '(', $phone);
        $phone = str_replace('й', ')', $phone);

        return [
            'full_name' => $this->faker->name(),
            'email' => $this->faker->unique()->safeEmail(),
            'phone' => $phone,
            'email_verified_at' => now(),
            'password' => Hash::make('0000'), // password
            'remember_token' => Str::random(10),
            'role_id' => rand(1, 4),
            'is_active' => true
        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     *
     * @return \Illuminate\Database\Eloquent\Factories\Factory
     */
    public function unverified()
    {
        return $this->state(function (array $attributes) {
            return [
                'email_verified_at' => null,
            ];
        });
    }
}
