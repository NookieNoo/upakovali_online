<?php

namespace App\Http\Requests\OuterApi;

use App\Http\Requests\JsonRequest;
use App\Rules\OuterApi\IsOrderCancelled;
use App\Rules\OuterApi\IsPartnerOrderExist;

class CancelOrderRequest extends JsonRequest
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
     *
     * @return array
     */
    public function rules()
    {
        return [
            'external_number' => ['bail', 'required', 'string', new IsPartnerOrderExist($this->user()->id), new IsOrderCancelled($this->user()->id)],
        ];
    }
}
