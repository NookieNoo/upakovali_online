<?php

namespace App\Rules;

use App\Models\Order;
use Illuminate\Contracts\Validation\Rule;

class UniqueExternalNumberByPartner implements Rule
{
    protected ?string $externalNumber;
    protected ?int $partnerId;
    protected ?int $orderId;
    /**
     * Create a new rule instance.
     *
     * @return void
     */
    public function __construct(?string $externalNumber, ?int $partnerId, ?int $orderId = null)
    {
        $this->externalNumber = $externalNumber;
        $this->partnerId = $partnerId;
        $this->orderId = $orderId;
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
        if (!$this->externalNumber || !$this->partnerId) return false;
        if ($this->orderId) {
            return !Order::where(['external_number' => $this->externalNumber, 'parthner_id' => $this->partnerId])
                ->where('id', '<>', $this->orderId)
                ->exists();
        }
        return !Order::where(['external_number' => $this->externalNumber, 'parthner_id' => $this->partnerId])->exists();
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return 'Внешний номер заказа не уникален для текущего партнера';
    }
}
