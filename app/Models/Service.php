<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class Service extends BaseModel
{
    protected $casts = [
        'sum' => 'float',
    ];

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
        })
            ->when($request->query('parthner_id'), function (Builder $query, $parthnerId) {
                if (!self::isJoined($query, Price::getTableName())) {
                    $query->join(Price::getTableName(), Service::getTableName() . '.price_id', '=', Price::getTableName() . '.id')
                        ->select(Service::getTableName() . '.*');
                }
                $query->where(Price::getTableName() . ".parthner_id", $parthnerId);
            })
            ->when($request->query('ids'), function (Builder $query, $ids) {
                $query->whereIn($this->getTable() . ".id", $ids);
            });
    }
}
