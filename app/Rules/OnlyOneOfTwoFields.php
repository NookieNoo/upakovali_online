<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\DataAwareRule;
use Illuminate\Contracts\Validation\Rule;

class OnlyOneOfTwoFields implements Rule, DataAwareRule
{
    protected array $data = [];
    protected string $firstField;
    protected string $secondField;

    /**
     * Create a new rule instance.
     *
     * @return void
     */
    public function __construct(string $firstField, string $secondField)
    {
        $this->firstField = $firstField;
        $this->secondField = $secondField;
    }

    /**
     * Determine if the validation rule passes.
     *
     * @param  string  $attribute
     * @param  mixed  $value
     * @return bool
     */
    public function passes($attribute, $value): bool
    {
        if (empty($this->data[$this->firstField]) && empty($this->data[$this->secondField])) {
            return false;
        }
        if (!empty($this->data[$this->firstField]) && !empty($this->data[$this->secondField])) {
            return false;
        }
        return true;
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return "Необходимо заполнить или {$this->firstField} или {$this->secondField}";
    }

    public function setData($data)
    {
        $this->data = $data;
        return $this;
    }
}
