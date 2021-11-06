<?php

namespace App\Http\Requests\Activity;

use App\Http\Requests\JsonRequest;

class ActivityGetRequest extends JsonRequest
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
            'user_id' => 'integer|min:1|exists:users,id',
        ];
    }
}
