<?php

namespace App\Http\Requests\Client;

use App\Http\Requests\JsonRequest;

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
            'email' => 'required|string|email',
            'comment' => 'string|nullable'
        ];
    }
}
