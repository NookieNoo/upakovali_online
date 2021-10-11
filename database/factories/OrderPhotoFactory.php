<?php

namespace Database\Factories;

use App\Models\OrderPhoto;
use Illuminate\Database\Eloquent\Factories\Factory;

class OrderPhotoFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = OrderPhoto::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'path' => '/assets/images/orders/' . rand(1, 4) . '.jpg',
        ];
    }
}
