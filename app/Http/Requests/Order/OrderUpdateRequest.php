<?php

namespace App\Http\Requests\Order;

use App\Http\Requests\JsonRequest;

class OrderUpdateRequest extends JsonRequest
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
            'order_status_id' => 'required|integer|min:1|exists:order_statuses,id',
            'source_id' => 'required|integer|min:1|exists:sources,id',
            'parthner_id' => 'nullable|integer|min:1|exists:parthners,id',
            'external_number' => 'nullable|string|max:255',
            'client_id' => 'required|integer|min:1|exists:clients,id',
            'workshop_id' => 'required|integer|min:1|exists:workshops,id',
            'addressee_id' => 'required|integer|min:1|exists:addressees,id',
            'is_pickupable' => 'nullable|boolean',
            'pick_up_point_id' => 'nullable|integer|min:1|exists:workshops,id',
            'pick_up_address' => 'nullable|string|max:255',
            'is_deliverable' => 'nullable|boolean',
            'delivery_point_id' => 'nullable|integer|min:1|exists:workshops,id',
            'delivery_address' => 'nullable|string|max:255',
            'receiving_date' => 'required|date',
            'issue_date' => 'required|date',
            'comment' => 'nullable|string',
            'courier_receiver_id' => 'nullable|integer|min:1|exists:users,id,role_id,4',
            'courier_issuer_id' => 'nullable|integer|min:1|exists:users,id,role_id,4',
            'isPaid' => 'nullable|boolean',
            'master_id' => 'nullable|integer|min:1|exists:users,id,role_id,3',
            'receiver_id' => 'required|integer|min:1|exists:clients,id',
        ];
    }
}
