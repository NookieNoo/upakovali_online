<?php

namespace App\Http\Requests\Price;

use App\Http\Requests\JsonRequest;

class PriceGetRequest extends JsonRequest
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
            'parthner_id' => 'integer|min:1|exists:parthners,id',
            'start_from' => 'date|date_format:Y-m-d',
            'start_to' => 'date|date_format:Y-m-d',
            'end_from' => 'date|date_format:Y-m-d',
            'end_to' => 'date|date_format:Y-m-d',
        ];
    }
}
