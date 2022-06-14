<?php

namespace App\Http\Requests\User;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\Response;

class UserGetRequest extends FormRequest
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
            'query' => 'string|max:255',
            'role_id' => 'integer|min:1|exists:roles,id',
        ];
    }

    protected function failedValidation(Validator $validator) {
        $errors = $validator->errors();
        $messages = $errors->all();

        throw new HttpResponseException(response()->json([
            'code' => Response::HTTP_BAD_REQUEST,
            'errors' => $errors,
            'message' => implode(' ', $messages),
        ], Response::HTTP_BAD_REQUEST));
    }
}
