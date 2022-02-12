<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class Price extends BaseModel
{
    public function __construct(array $attributes = [])
    {
        parent::__construct($attributes);
        $additionalHidden = ['parthner_id'];
        $this->hidden = array_merge($this->hidden, $additionalHidden);
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
