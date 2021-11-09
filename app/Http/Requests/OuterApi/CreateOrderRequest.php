<?php

namespace App\Http\Requests\OuterApi;

use App\Http\Requests\JsonRequest;

class CreateOrderRequest extends JsonRequest
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
            'client' => 'required',
            'client.full_name' => 'required|string|max:255',
            'client.phone' => 'required|string|max:50',
            'client.email' => 'required|string|email',
            'workshop_id' => 'required|integer|min:1|exists:workshops,id',
            'is_pickupable' => 'nullable|boolean',
            'pick_up_point_id' => 'nullable|integer|min:1|exists:workshops,id',
            'pick_up_address' => 'nullable|string|max:255',
            'is_deliverable' => 'nullable|boolean',
            'delivery_point_id' => 'nullable|integer|min:1|exists:workshops,id',
            'delivery_address' => 'nullable|string|max:255',
            //courier
            //receiver

            'receiving_date' => "required|date|date_format:$dateTimeFormat",
            'issue_date' => "required|date|date_format:$dateTimeFormat",
            'comment' => 'nullable|string',

            //gifts
        ];
    }
}
