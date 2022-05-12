<?php

namespace App\Http\Requests\OuterApi;

use App\Http\Requests\JsonRequest;
use App\Rules\OuterApi\IsNextOrderStatus;
use App\Rules\OuterApi\IsPartnerOrderExist;

class SetOrderStatusRequest extends JsonRequest
{
    protected $stopOnFirstFailure = true;

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
            'external_number' => ['bail', 'required', 'string', new IsPartnerOrderExist($this->user()->id)],
            'order_status_id' => ['bail', 'required', 'integer', 'min:1', 'exists:order_statuses,id', new IsNextOrderStatus($this->user()->id)],
        ];
    }
}
