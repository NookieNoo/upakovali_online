<?php

namespace App\Http\Requests\Price;

use App\Http\Requests\JsonRequest;

class PriceUpdateRequest extends JsonRequest
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
            'parthner_id' => 'exclude_if:is_virtual,true|required|integer|min:1|exists:parthners,id',
            'start' => 'required|date|before_or_equal:end',
            'end' => 'required|date',
            'services' => 'required|array',
            'services.*.id' => 'nullable|integer|min:1|exists:services,id', //TODO Валидация на принадлежность прайсу
            'services.*.name' => 'required||string|max:255',
            'services.*.sum' => 'required|numeric|min:0',
            'services.*.product_id' => 'required|integer|min:1|exists:products,id',
        ];
    }
}
