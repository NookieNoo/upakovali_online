<?php

namespace Database\Factories;

use App\Models\Addressee;
use App\Models\Client;
use App\Models\Order;
use App\Models\OrderStatus;
use App\Models\Parthner;
use App\Models\Source;
use App\Models\User;
use App\Models\Workshop;
use Illuminate\Database\Eloquent\Factories\Factory;

class OrderFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Order::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $isDeliverable = $this->faker->boolean();
        $isPickupable = $this->faker->boolean();
        return [
            'order_status_id' => fn() => OrderStatus::inRandomOrder()->first()->id,
            'source_id' => fn() => Source::inRandomOrder()->first()->id,
            'parthner_id' => fn() => Parthner::inRandomOrder()->first()->id,
            'external_number' => $this->faker->uuid(),
            'client_id' => fn() => Client::inRandomOrder()->first()->id,
            'workshop_id' => fn() => Workshop::inRandomOrder()->first()->id,
            'is_pickupable' => $isPickupable,
            'pick_up_point_id' => $isPickupable ? null : fn() => Workshop::inRandomOrder()->first()->id,
            'pick_up_address' => $isPickupable ? $this->faker->address() : null,
            'pick_up_price' => $isPickupable ? $this->faker->randomFloat(2, 1, 1000) : null,
            'is_deliverable' => $isDeliverable,
            'delivery_point_id' => $isDeliverable ? null : fn() => Workshop::inRandomOrder()->first()->id,
            'delivery_address' => $isDeliverable ? $this->faker->address() : null,
            'delivery_price' => $isDeliverable ? $this->faker->randomFloat(2, 1, 1000) : null,
            'receiving_date' => $this->faker->dateTime(),
            'issue_date' => $this->faker->dateTime(),
            'comment' => $this->faker->sentence(),
            'courier_receiver_id' => fn() => User::where(['role_id' => 4])->inRandomOrder()->first()->id,
            'courier_issuer_id' => fn() => User::where(['role_id' => 4])->inRandomOrder()->first()->id,
            'isPaid' => $this->faker->boolean(),
            'master_id' => fn() => User::where(['role_id' => 3])->inRandomOrder()->first()->id,
            'receiver_id' => fn() => Client::inRandomOrder()->first()->id,
        ];
    }
}
