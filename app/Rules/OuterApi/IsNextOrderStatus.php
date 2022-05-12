<?php

namespace App\Rules\OuterApi;

use App\Models\Order;
use Illuminate\Contracts\Validation\DataAwareRule;
use Illuminate\Contracts\Validation\Rule;

class IsNextOrderStatus implements Rule, DataAwareRule
{

    protected array $data = [];
    protected int $partnerId;

    public function __construct(int $partnerId)
    {
        $this->partnerId = $partnerId;
    }

    /**
     * Determine if the validation rule passes.
     *
     * @param string $attribute
     * @param mixed $value
     * @return bool
     */
    public function passes($attribute, $value)
    {
        $order = Order::where(['parthner_id' => $this->partnerId, 'external_number' => $this->data['external_number']])->first();
        return $order && $order->order_status_id < $value;
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return 'Некорректный статус заказа. Изменение статуса заказа на предыдущий невозможно.';
    }

    public function setData($data)
    {
        $this->data = $data;
        return $this;
    }
}
