<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

/**
 * App\Models\Workshop
 *
 * @property int $id
 * @property string $address
 * @property string|null $longitude
 * @property string|null $latitude
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Order[] $orders
 * @property-read int|null $orders_count
 * @method static Builder|Workshop newModelQuery()
 * @method static Builder|Workshop newQuery()
 * @method static Builder|Workshop query()
 * @method static Builder|Workshop whereAddress($value)
 * @method static Builder|Workshop whereCreatedAt($value)
 * @method static Builder|Workshop whereId($value)
 * @method static Builder|Workshop whereLatitude($value)
 * @method static Builder|Workshop whereLongitude($value)
 * @method static Builder|Workshop whereUpdatedAt($value)
 * @method static Builder|Workshop withFilters(\Illuminate\Http\Request $request)
 * @method static \Illuminate\Database\Eloquent\Builder|BaseModel withOrder(\Illuminate\Http\Request $request)
 * @method static \Illuminate\Database\Eloquent\Builder|BaseModel withPaginate(\Illuminate\Http\Request $request)
 * @mixin \Eloquent
 */
class Workshop extends BaseModel
{
   public function orders()
   {
       return $this->hasMany(Order::class);
   }

    // public function orders()
    // {
    //     return $this->morphMany(Order::class, 'pickupable');
    // }

    public function scopeWithFilters($query, Request $request)
    {
        return $query->when($request->query('query'), function (Builder $query, $queryParam) {
            $query->where(DB::raw("LOWER(" . $this->getTable() . ".address)"), 'LIKE', "%" . mb_strtolower($queryParam) . "%");
        });
    }
}
