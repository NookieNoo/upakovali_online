<?php

namespace Database\Factories;

use App\Models\Price;
use Illuminate\Database\Eloquent\Factories\Factory;

class PriceFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Price::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
//        $availablePriceNames = ['Прайс для нашего сайта', 'Прайс для Озон', 'Прайс для Спортмастер',
//            'Прайс для ЯМаркет', 'Прайс для WB'];
        return [
//            'name' => \Arr::random($availablePriceNames),
//            'price' => $this->faker->randomFloat(2, 1, 1000),
            'start' => $this->faker->dateTimeBetween('-3 days', '-1 day'),
            'end' => $this->faker->dateTimeBetween('+60 days', '+ 90 days'),
        ];
    }
}
