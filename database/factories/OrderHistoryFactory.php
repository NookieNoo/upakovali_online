<?php

namespace Database\Factories;

use App\Models\OrderHistory;
use App\Models\OrderStatus;
use App\Models\Parthner;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class OrderHistoryFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = OrderHistory::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $causerType = get_class(new User());
        return [
            'status_id' => fn() => OrderStatus::inRandomOrder()->first()->id,
            'date' => $this->faker->dateTime(),
            'causer_id' => fn() => User::inRandomOrder()->first()->id,
            'causer_type' => $causerType,
        ];
    }
}
