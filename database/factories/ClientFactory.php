<?php

namespace Database\Factories;

use App\Models\Client;
use Illuminate\Database\Eloquent\Factories\Factory;

class ClientFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Client::class;

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
            'phone' => $phone,
            'email' => $this->faker->email(),
            'comment' => $this->faker->sentence(),
        ];
    }
}
