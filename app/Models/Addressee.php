<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

/**
 * App\Models\Addressee
 *
 * @property int $id
 * @property string $name
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Gift[] $gifts
 * @property-read int|null $gifts_count
 * @method static Builder|Addressee newModelQuery()
 * @method static Builder|Addressee newQuery()
 * @method static Builder|Addressee query()
 * @method static Builder|Addressee whereCreatedAt($value)
 * @method static Builder|Addressee whereId($value)
 * @method static Builder|Addressee whereName($value)
 * @method static Builder|Addressee whereUpdatedAt($value)
 * @method static Builder|Addressee withFilters(\Illuminate\Http\Request $request)
 * @method static \Illuminate\Database\Eloquent\Builder|BaseModel withOrder(\Illuminate\Http\Request $request)
 * @method static \Illuminate\Database\Eloquent\Builder|BaseModel withPaginate(\Illuminate\Http\Request $request)
 * @mixin \Eloquent
 */
class Addressee extends BaseModel
{
    public function gifts()
    {
        return $this->hasMany(Gift::class);
    }

    public function scopeWithFilters($query, Request $request)
    {
        return $query->when($request->query('query'), function (Builder $query, $queryParam) {
            $query->where(DB::raw("LOWER(" . $this->getTable() . ".name)"), 'LIKE', "%" . mb_strtolower($queryParam) . "%");
        });
    }
}
