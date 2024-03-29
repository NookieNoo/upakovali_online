<?php

namespace App\Http\Requests\Auth;

use App\Http\Requests\JsonRequest;
use Illuminate\Foundation\Http\FormRequest;

class ResetPasswordRequest extends JsonRequest
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
            'token' => 'required',
            'email' => 'required|email',
            'password' => 'required|min:4|confirmed',
        ];
    }
}
