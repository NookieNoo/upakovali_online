<?php

namespace App\Http\Requests\Order;

use App\Enums\SourceType;
use App\Http\Requests\JsonRequest;
use App\Rules\UniqueExternalNumberByPartner;

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
        $apiSourceId = SourceType::API;
        return [
            'order_status_id' => 'required|integer|min:1|exists:order_statuses,id',
            'source_id' => 'required|integer|min:1|exists:sources,id',
            'parthner_id' => "exclude_unless:source_id,{$apiSourceId}|required|integer|min:1|exists:parthners,id",
            'external_number' => [
                "exclude_unless:source_id,{$apiSourceId}", "required", "string", "max:255",
                new UniqueExternalNumberByPartner($this->get('external_number'), $this->get('parthner_id'), $this->route('id'))
            ],
            'client_id' => 'required|integer|min:1|exists:clients,id',
            'workshop_id' => 'required|integer|min:1|exists:workshops,id',
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
            'gifts' => 'required|array',
            'gifts.*.id' => 'nullable|integer|min:1|exists:gifts,id', //TODO Валидация на принадлежность заказу
            'gifts.*.weight' => 'required|numeric|min:0.1',
            'gifts.*.length' => 'required|int|min:1',
            'gifts.*.width' => 'required|int|min:1',
            'gifts.*.height' => 'required|int|min:1',
            'gifts.*.addressee_id' => 'required|integer|min:1|exists:addressees,id',
            'gifts.*.service_id' => 'required|integer|min:1|exists:services,id',
            'additional_products' => 'array',
            'additional_products.*.id' => 'nullable|integer|min:1|exists:additional_products,id', //TODO Валидация на принадлежность заказу
            'additional_products.*.price' => 'required|numeric|min:0.1',
            'additional_products.*.name' => 'required|string|max:255',
            'order_photos' => 'array',
        ];
    }
}
