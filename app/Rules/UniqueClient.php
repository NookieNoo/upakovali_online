<?php

namespace App\Rules;

use App\Models\Client;
use Illuminate\Contracts\Validation\Rule;

class UniqueClient implements Rule
{
    protected string $phone;
    protected string $email;
    protected ?int $editClientId;
    /**
     * Create a new rule instance.
     *
     * @return void
     */
    public function __construct(string $phone, string $email, ?int $editClientId = null)
    {
        $this->phone = $phone;
        $this->email = $email;
        $this->editClientId = $editClientId;
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
        if ($this->editClientId) {
            return !Client::where(['email' => $this->email, 'phone' => $this->phone])
                ->where('id', '<>', $this->editClientId)
                ->exists();
        }
        return !Client::where(['email' => $this->email, 'phone' => $this->phone])->exists();
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return 'Клиент с таким email и телефоном уже существует';
    }
}
