<?php

namespace Database\Factories;

use App\Models\Parthner;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;

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
        $phone = $this->faker->regexify('^\+7ё[0-9]{3}й[0-9]{3}-[0-9]{4}$');
        $phone = str_replace('ё', '(', $phone);
        $phone = str_replace('й', ')', $phone);
        $email = $this->faker->email();
        return [
            'full_name' => $this->faker->company(),
            'manager_id' => function () {
                return User::where(['role_id' => 2])->inRandomOrder()->first()->id;
            },
            'phone' => $phone,
            'email' => $email,
            'comment' => $this->faker->sentence(),
            'password' => Hash::make('0000'), // password
            'notification_url' => $this->faker->url,
        ];
    }
}
