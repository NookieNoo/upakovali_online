<?php

namespace Database\Factories;

use App\Models\Parthner;
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
            'name' => $this->faker->company(),
            'manager' => $this->faker->name(),
            'phone' => $this->faker->phoneNumber(),
            'email' => $this->faker->email(),
            'comment' => $this->faker->sentence(),
        ];
    }
}
