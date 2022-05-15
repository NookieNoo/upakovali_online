<?php

namespace App\Http\Requests\OuterApi;

use App\Dto\OrderCreateByApiDto;
use App\Http\Requests\JsonRequest;
use App\Rules\OnlyOneOfTwoFields;
use App\Rules\OuterApi\IsPartnerOrderExist;
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

            'delivery_point_id' => ['required_without:delivery_address', new OnlyOneOfTwoFields('delivery_point_id', 'delivery_address'), 'integer', 'min:1', 'exists:workshops,id'],
            'delivery_address' => ['required_without:delivery_point_id', new OnlyOneOfTwoFields('delivery_point_id', 'delivery_address'), 'string', 'max:255'],

            'receiving_date' => "required|date|date_format:$dateTimeFormat",
            'issue_date' => "required|date|date_format:$dateTimeFormat|after:receiving_date", // after now

            'comment' => 'nullable|string|max:1000',

            'courier' => 'required',
            'courier.full_name' => 'required|string|max:255',
            'courier.phone' => ['required', 'string', 'max:50', "regex:$phoneRegex"],
            'courier.email' => 'string|email',

            'receiver' => 'required',
            'receiver.full_name' => 'required|string|max:255',
            'receiver.phone' => ['required', 'string', 'max:50', "regex:$phoneRegex"],
            'receiver.email' => 'string|email',

            //gifts
            //additional
            //prices
            //photos
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
