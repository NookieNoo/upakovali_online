<?php

namespace App\Rules\OuterApi;

use App\Models\Order;
use Illuminate\Contracts\Validation\DataAwareRule;
use Illuminate\Contracts\Validation\Rule;

class IsPartnerOrderExist implements Rule, DataAwareRule
{

    protected array $data = [];
    protected int $partnerId;
    protected ?string $customMsg;

    public function __construct(int $partnerId, ?string $customMsg = null)
    {
        $this->partnerId = $partnerId;
        $this->customMsg = $customMsg;
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
        return !Order::where(['external_number' => $this->data['external_number'], 'parthner_id' => $this->partnerId])->exists();
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        if ($this->customMsg) return $this->customMsg;
        return 'Не найден заказ с таким external_number';
    }

    public function setData($data)
    {
        $this->data = $data;
        return $this;
    }
}
