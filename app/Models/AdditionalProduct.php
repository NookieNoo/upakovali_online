<?php

namespace App\Models;

class AdditionalProduct extends BaseModel
{
    protected $casts = [
        'price' => 'float',
    ];

    public function __construct(array $attributes = [])
    {
        parent::__construct($attributes);
        $additionalHidden = ['order_id'];
        $this->hidden = array_merge($this->hidden, $additionalHidden);
    }
}
