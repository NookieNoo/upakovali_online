<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

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

    public function scopeWithFilters($query, Request $request)
    {
        return $query->when($request->query('product_id'), function (Builder $query, $productId) {
            $query->where($this->getTable() . ".product_id", $productId);
        });
    }
}
