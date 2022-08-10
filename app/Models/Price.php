<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

/**
 * App\Models\Price
 *
 * @property int $id
 * @property string $name
 * @property int $parthner_id
 * @property string $start
 * @property string $end
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Parthner $parthner
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Service[] $services
 * @property-read int|null $services_count
 * @method static \Database\Factories\PriceFactory factory(...$parameters)
 * @method static Builder|Price newModelQuery()
 * @method static Builder|Price newQuery()
 * @method static Builder|Price query()
 * @method static Builder|Price whereCreatedAt($value)
 * @method static Builder|Price whereEnd($value)
 * @method static Builder|Price whereId($value)
 * @method static Builder|Price whereName($value)
 * @method static Builder|Price whereParthnerId($value)
 * @method static Builder|Price whereStart($value)
 * @method static Builder|Price whereUpdatedAt($value)
 * @method static Builder|Price withFilters(\Illuminate\Http\Request $request)
 * @method static \Illuminate\Database\Eloquent\Builder|BaseModel withOrder(\Illuminate\Http\Request $request)
 * @method static \Illuminate\Database\Eloquent\Builder|BaseModel withPaginate(\Illuminate\Http\Request $request)
 * @mixin \Eloquent
 */
class Price extends BaseModel
{
    protected $appends = ['is_virtual'];

    public function __construct(array $attributes = [])
    {
        parent::__construct($attributes);
        // $additionalHidden = ['parthner_id'];
        $additionalHidden = [];
        $this->hidden = array_merge($this->hidden, $additionalHidden);
    }

    public function getIsVirtualAttribute()
    {
        return !isset($this->parthner_id);
    }

    public function services()
    {
        return $this->hasMany(Service::class);
    }

    public function parthner()
    {
        return $this->belongsTo(Parthner::class);
    }

    public function scopeWithFilters($query, Request $request)
    {
        return $query->when($request->query('query'), function (Builder $query, $queryParam) {
                $query->where(DB::raw("LOWER(" . $this->getTable() . ".name)"), 'LIKE', "%" . mb_strtolower($queryParam) . "%");
            })
            ->when($request->query('parthner_id'), function (Builder $query, $parthnerId) {
                $query->where($this->getTable() . ".parthner_id", $parthnerId);
            })
            ->when($request->query('start_from'), function (Builder $query, $date) {
                $query->whereDate($this->getTable() . ".start", '>=', $date);
            })
            ->when($request->query('start_to'), function (Builder $query, $date) {
                $query->whereDate($this->getTable() . ".start", '<=', $date);
            })
            ->when($request->query('end_from'), function (Builder $query, $date) {
                $query->whereDate($this->getTable() . ".end", '>=', $date);
            })
            ->when($request->query('end_to'), function (Builder $query, $date) {
                $query->whereDate($this->getTable() . ".end", '<=', $date);
            });
    }
}
