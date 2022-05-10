<?php

namespace App\Http\Requests\Parthner;

use App\Http\Requests\JsonRequest;


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
            'manager_id' => 'required|integer|min:1|exists:users,id,role_id,2',
            'phone' => 'required|string|max:50',
            'email' => 'required|string|email',
            'notification_url' => 'required|string|max:255|url',
            'comment' => 'string'
        ];
    }
}
