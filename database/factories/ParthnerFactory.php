<?php

namespace Database\Factories;

use App\Models\Parthner;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class ParthnerFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Parthner::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'full_name' => $this->faker->company(),
            'manager_id' => function () {
                return User::where(['role_id' => 2])->inRandomOrder()->first()->id;
            },
            'phone' => $this->faker->phoneNumber(),
            'email' => $this->faker->email(),
            'comment' => $this->faker->sentence(),
        ];
    }
}
