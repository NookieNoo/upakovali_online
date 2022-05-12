<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

/**
 * App\Models\Service
 *
 * @property int $id
 * @property int $price_id
 * @property string $name
 * @property int $product_id
 * @property float $sum
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Price $price
 * @property-read \App\Models\Product $product
 * @method static \Database\Factories\ServiceFactory factory(...$parameters)
 * @method static Builder|Service newModelQuery()
 * @method static Builder|Service newQuery()
 * @method static Builder|Service query()
 * @method static Builder|Service whereCreatedAt($value)
 * @method static Builder|Service whereId($value)
 * @method static Builder|Service whereName($value)
 * @method static Builder|Service wherePriceId($value)
 * @method static Builder|Service whereProductId($value)
 * @method static Builder|Service whereSum($value)
 * @method static Builder|Service whereUpdatedAt($value)
 * @method static Builder|Service withFilters(\Illuminate\Http\Request $request)
 * @method static \Illuminate\Database\Eloquent\Builder|BaseModel withOrder(\Illuminate\Http\Request $request)
 * @method static \Illuminate\Database\Eloquent\Builder|BaseModel withPaginate(\Illuminate\Http\Request $request)
 * @mixin \Eloquent
 */
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
                if ($parthnerId === '-1') $query->whereNull(Price::getTableName() . ".parthner_id");
                else $query->where(Price::getTableName() . ".parthner_id", $parthnerId);
            })
            ->when($request->query('ids'), function (Builder $query, $ids) {
                $query->whereIn($this->getTable() . ".id", $ids);
            });
    }
}
