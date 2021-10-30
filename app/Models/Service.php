<?php

namespace App\Models;

class Service extends BaseModel
{
    public function __construct(array $attributes = [])
    {
        parent::__construct($attributes);
        $additionalHidden = ['price_id', 'product_id'];
        $this->hidden = array_merge($this->hidden, $additionalHidden);
    }

    public function price()
    {
        return $this->belongsTo(Price::class);
    }

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
