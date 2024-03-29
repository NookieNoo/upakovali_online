<?php

namespace App\Http\Requests\Order;

use App\Enums\SourceType;
use App\Http\Requests\JsonRequest;
use App\Rules\OnlyOneOfTwoFields;
use App\Rules\UniqueExternalNumberByPartner;

class OrderStoreRequest extends JsonRequest
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
        $dateTimeFormat = config('main.datetime_format');
        $phoneRegex = config('main.phone_format_regex');
        return [
            'source_id' => 'required|integer|min:1|exists:sources,id',
            'parthner_id' => "exclude_unless:source_id,{$apiSourceId}|required|integer|min:1|exists:parthners,id",
            'external_number' => [
                "exclude_unless:source_id,{$apiSourceId}", "required", "string", "max:255", new UniqueExternalNumberByPartner($this->get('external_number'), $this->get('parthner_id'))
            ],
            'is_new_client' => 'required|boolean',
            'client_id' => 'exclude_unless:is_new_client,false|required|integer|min:1|exists:clients,id',
            'client' => 'exclude_unless:is_new_client,true|required|array',
            'client.full_name' => 'exclude_unless:is_new_client,true,false|required|string|max:255',
            'client.phone' => ['exclude_unless:is_new_client,true,false', 'required', 'string', 'max:50', "regex:$phoneRegex"],
            'client.email' => 'exclude_unless:is_new_client,true,false|nullable|string|email',
            'workshop_id' => 'required|integer|min:1|exists:workshops,id',
            'is_pickupable' => 'nullable|boolean',
            'pick_up_point_id' => 'nullable|integer|min:1|exists:workshops,id',
            'pick_up_address' => 'nullable|string|max:255',
            'pick_up_price' => 'exclude_unless:is_pickupable,true|required|numeric|min:0',
            'is_deliverable' => 'nullable|boolean',
            'delivery_point_id' => 'nullable|integer|min:1|exists:workshops,id',
            'delivery_address' => 'nullable|string|max:255',
            'delivery_price' => 'exclude_unless:is_deliverable,true|required|numeric|min:0',

            'receiving_date' => "required|date|after:+30 minutes|before:+5 days",
            'issue_date' => "required|date|after:receiving_date",

            'comment' => 'nullable|string',
            'courier_receiver_id' => 'nullable|integer|min:1|exists:users,id,role_id,4',
            'courier_issuer_id' => 'nullable|integer|min:1|exists:users,id,role_id,4',
            'isPaid' => 'nullable|boolean',
            'master_id' => 'nullable|integer|min:1|exists:users,id,role_id,3',
            'is_receiver_same' => 'required|boolean',
            'is_new_receiver' => 'exclude_unless:is_receiver_same,false|required|boolean',
            'receiver_id' => 'exclude_if:is_receiver_same,true|exclude_if:is_new_receiver,true|required|integer|min:1|exists:clients,id',
            'receiver.full_name' => 'exclude_if:is_receiver_same,true|exclude_if:is_new_receiver,false|required|string|max:255',
            'receiver.phone' => ['exclude_if:is_receiver_same,true', 'exclude_if:is_new_receiver,false', 'required', 'string', 'max:50', "regex:$phoneRegex"],
            'receiver.email' => 'exclude_if:is_receiver_same,true|exclude_if:is_new_receiver,false|nullable|string|email',
            'gifts' => 'required|array',
            'gifts.*.weight' => 'required|numeric|min:0.1',
            'gifts.*.length' => 'required|int|min:1',
            'gifts.*.width' => 'required|int|min:1',
            'gifts.*.height' => 'required|int|min:1',
            'gifts.*.addressee_id' => 'required|integer|min:1|exists:addressees,id',
            'gifts.*.service_id' => 'required|integer|min:1|exists:services,id',
            'additional_products' => 'array',
            'additional_products.*.price' => 'required|numeric|min:0.1',
            'additional_products.*.name' => 'required|string|max:255',
            'order_photos' => 'array',
        ];
    }

    public function messages()
    {
        $phoneMask = config('main.phone_format_mask');
        return [
            'regex' => "Формат телефона не соответствует шаблону: $phoneMask"
        ];
    }
}
