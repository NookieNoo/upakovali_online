<?php

namespace App\Rules;

use App\Models\Parthner;
use Illuminate\Contracts\Validation\Rule;

class UniquePartner implements Rule
{
    protected string $phone;
    protected string $email;
    protected ?int $editPartnerId;
    /**
     * Create a new rule instance.
     *
     * @return void
     */
    public function __construct(string $phone, string $email, ?int $editPartnerId = null)
    {
        $this->phone = $phone;
        $this->email = $email;
        $this->editPartnerId = $editPartnerId;
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
        if ($this->editPartnerId) {
            return !Parthner::where(['email' => $this->email, 'phone' => $this->phone])
                ->where('id', '<>', $this->editPartnerId)
                ->exists();
        }
        return !Parthner::where(['email' => $this->email, 'phone' => $this->phone])->exists();
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return 'Партнер с таким email и телефоном уже существует';
    }
}
