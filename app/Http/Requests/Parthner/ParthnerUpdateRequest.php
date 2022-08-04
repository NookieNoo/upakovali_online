<?php

namespace App\Http\Requests\Parthner;

use App\Http\Requests\JsonRequest;
use App\Rules\UniquePartner;

class ParthnerUpdateRequest extends JsonRequest
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
            'manager' => 'required|string|max:255',
            'phone' => 'required|string|max:50',
            'email' => ['required', 'string', 'max:255', 'email', new UniquePartner(
                $this->get('phone'), $this->get('email'), $this->route('id')
            )],
            'notification_url' => 'required|string|max:255|url',
            'comment' => 'nullable|string'
        ];
    }
}
