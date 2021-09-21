<?php

namespace App\Http\Requests\User;

use App\Http\Requests\JsonRequest;

class UserStoreRequest extends JsonRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        //TODO
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
            'email' => 'required|string|email|unique:users,email',
            'role_id' => 'required|integer|min:1|exists:roles,id',
            'password' => 'required|string|min:4|max:255|confirmed'
        ];
    }
}
