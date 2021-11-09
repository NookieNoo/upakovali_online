<?php

namespace App\Http\Requests\OuterApi;

use App\Http\Requests\JsonRequest;

class CancelOrderRequest extends JsonRequest
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
     *
     * @return array
     */
    public function rules()
    {
        return [
            'external_number' => 'required'
        ];
    }
}
