<?php

namespace App\Http\Requests\OuterApi;

use Illuminate\Foundation\Http\FormRequest;

class UpdateOrderRequest extends FormRequest
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
        $dateTimeFormat = env('DEFAULT_DATETIME_FORMAT');
        return [
            'external_number' => 'required',
            'receiving_date' => "required|date|date_format:$dateTimeFormat",
            'issue_date' => "required|date|date_format:$dateTimeFormat",
        ];
    }
}
