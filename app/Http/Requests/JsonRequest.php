<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Symfony\Component\HttpFoundation\Response;

class JsonRequest extends FormRequest
{
    public function validator($factory)
    {
        return $factory->make(
            $this->sanitize(), $this->container->call([$this, 'rules']), $this->messages()
        );
    }

    public function sanitize()
    {
        $this->merge([
            'data_to_array' => json_decode($this->input('data'), true)
        ]);
        return $this->all();
    }

    protected function failedValidation(Validator $validator) {
        throw new HttpResponseException(response()->json([
            'code' => Response::HTTP_BAD_REQUEST,
            'message' => $validator->errors(),
        ], Response::HTTP_BAD_REQUEST));
    }
}
