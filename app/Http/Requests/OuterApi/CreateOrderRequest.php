<?php

namespace App\Http\Requests\OuterApi;

use App\Dto\OrderCreateByApiDto;
use App\Enums\ServiceTypes;
use App\Http\Requests\JsonRequest;
use App\Rules\OnlyOneOfTwoFields;
use App\Rules\OuterApi\IsPartnerOrderExist;
use App\Rules\OuterApi\IsServiceIdBelongsToPartner;
use App\Rules\UniqueExternalNumberByPartner;

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
        $dateTimeFormat = config('main.datetime_format');
        $phoneRegex = config('main.phone_format_regex');

        return [
            'external_number' => ['bail', 'required', 'string', new IsPartnerOrderExist($this->user()->id, 'Заказ с таким external_number уже существует')],
            'client' => 'required',
            'client.full_name' => 'required|string|max:255',
            'client.phone' => ['required', 'string', 'max:50', "regex:$phoneRegex"],
            'client.email' => 'string|email',
            'client.comment' => 'string|max:1000',
            'workshop_id' => 'required|integer|min:1|exists:workshops,id',

            'pick_up_point_id' => ['required_without:pick_up_address', new OnlyOneOfTwoFields('pick_up_point_id', 'pick_up_address'), 'integer', 'min:1', 'exists:workshops,id'],
            'pick_up_address' => ['required_without:pick_up_point_id', new OnlyOneOfTwoFields('pick_up_point_id', 'pick_up_address'), 'string', 'max:255'],
            'pick_up_price' => ['required_with:pick_up_address', new OnlyOneOfTwoFields('pick_up_point_id', 'pick_up_price'), 'numeric', 'min:0'],

            'delivery_point_id' => ['required_without:delivery_address', new OnlyOneOfTwoFields('delivery_point_id', 'delivery_address'), 'integer', 'min:1', 'exists:workshops,id'],
            'delivery_address' => ['required_without:delivery_point_id', new OnlyOneOfTwoFields('delivery_point_id', 'delivery_address'), 'string', 'max:255'],
            'delivery_price' => ['required_with:delivery_price', new OnlyOneOfTwoFields('delivery_point_id', 'delivery_price'), 'numeric', 'min:0'],

            'receiving_date' => "required|date|date_format:$dateTimeFormat|after:+30 minutes|before:+5 days",
            'issue_date' => "required|date|date_format:$dateTimeFormat|after:receiving_date",

            'comment' => 'nullable|string|max:1000',

            'courier' => 'required',
            'courier.full_name' => 'required|string|max:255',
            'courier.phone' => ['required', 'string', 'max:50', "regex:$phoneRegex"],
            'courier.email' => 'string|email',

            'receiver' => 'required',
            'receiver.full_name' => 'required|string|max:255',
            'receiver.phone' => ['required', 'string', 'max:50', "regex:$phoneRegex"],
            'receiver.email' => 'string|email',

            'gifts' => 'required|array',
            'gifts.*.weight' => 'required|numeric|min:0.1',
            'gifts.*.length' => 'required|int|min:1',
            'gifts.*.width' => 'required|int|min:1',
            'gifts.*.height' => 'required|int|min:1',
            'gifts.*.addressee_id' => 'required|integer|min:1|exists:addressees,id',
            'gifts.*.service_id' => ['required', 'integer', 'min:1', new IsServiceIdBelongsToPartner($this->user()->id, ServiceTypes::PACKAGE)],

            'additional_products' => 'array',
            'additional_products.*.price' => 'required|numeric|min:0.1', //decimal 2
            'additional_products.*.name' => 'required|string|max:255',

            //TODO photos
        ];
    }

    public function messages()
    {
        $phoneMask = config('main.phone_format_mask');
        return [
            'regex' => "Формат телефона не соответствует шаблону: $phoneMask"
        ];
    }

    public function getDto(): OrderCreateByApiDto
    {
        return new OrderCreateByApiDto($this->validated());
    }


}
