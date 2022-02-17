<?php

namespace App\Http\Requests\Client;

use App\Http\Requests\JsonRequest;
use App\Rules\UniqueClient;

class ClientUpdateRequest extends JsonRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'full_name' => 'required|string|max:255',
            'phone' => 'required|string|max:50',
            'email' => ['required', 'string', 'email', new UniqueClient($this->get('phone'), $this->get('email'), $this->route('id'))],
            'comment' => 'string|nullable'
        ];
    }
}
