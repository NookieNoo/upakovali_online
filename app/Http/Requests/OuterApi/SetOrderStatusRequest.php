<?php

namespace App\Http\Requests\OuterApi;

use App\Http\Requests\JsonRequest;

class SetOrderStatusRequest extends JsonRequest
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
            'external_number' => 'required',
            'order_status_id' => 'required|integer|min:1|exists:order_statuses,id',
        ];
    }
}
