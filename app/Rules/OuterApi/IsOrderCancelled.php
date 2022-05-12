<?php

namespace App\Rules\OuterApi;

use App\Enums\OrderStatus;
use App\Models\Order;
use Illuminate\Contracts\Validation\DataAwareRule;
use Illuminate\Contracts\Validation\Rule;

class IsOrderCancelled implements Rule, DataAwareRule
{
    protected array $data = [];
    protected int $partnerId;

    /**
     * Create a new rule instance.
     *
     * @return void
     */
    public function __construct(int $partnerId)
    {
        $this->partnerId = $partnerId;
    }

    /**
     * Determine if the validation rule passes.
     *
     * @param  string  $attribute
     * @param  mixed  $value
     * @return bool
     */
    public function passes($attribute, $value)
    {
        $order = Order::where(['external_number' => $this->data['external_number'], 'parthner_id' => $this->partnerId])->first();
        return $order && $order->order_status_id !== OrderStatus::CANCELED;
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return 'Заказ уже отменен';
    }

    public function setData($data)
    {
        $this->data = $data;
        return $this;
    }
}
