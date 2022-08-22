<?php

namespace App\Http\Requests\Client;

use App\Http\Requests\JsonRequest;
use App\Rules\UniqueClient;

class ClientStoreRequest extends JsonRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        //@FIXME
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $emailValidators = ['nullable', 'string', 'email'];
        if ($this->get('email')) {
            $emailValidators[] = new UniqueClient($this->get('phone'), $this->get('email'), $this->route('id'));
        }
        return [
            'full_name' => 'required|string|max:255',
            'phone' => 'required|string|max:50',
            'email' => $emailValidators,
            'comment' => 'string'
        ];
    }
}
