<?php

namespace App\Http\Requests\Parthner;

use App\Http\Requests\JsonRequest;
use App\Rules\UniquePartner;


class ParthnerStoreRequest extends JsonRequest
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
        return [
            'full_name' => 'required|string|max:255',
            'manager' => 'required|string|max:255',
            'phone' => 'required|string|max:50',
            'email' => ['required', 'string', 'max:255', 'email', new UniquePartner($this->get('phone'), $this->get('email'))],
            'notification_url' => 'required|string|max:255|url',
            'comment' => 'string'
        ];
    }
}
