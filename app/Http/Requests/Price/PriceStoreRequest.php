<?php

namespace App\Http\Requests\Price;

use App\Http\Requests\JsonRequest;

class PriceStoreRequest extends JsonRequest
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
            'name' => 'required|string|max:255',
            'parthner_id' => 'required|integer|min:1|exists:parthners,id',
            'start' => 'required|date|date_format:Y-m-d',
            'end' => 'required|date|date_format:Y-m-d',
            'services' => 'required|array',
            'services.*.name' => 'required||string|max:255',
            'services.*.sum' => 'required|numeric|min:0',
            'services.*.product_id' => 'required|integer|min:1|exists:products,id',
        ];
    }
}
