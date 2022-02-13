<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class Product extends BaseModel
{
    public function services()
    {
        return $this->hasMany(Service::class);
    }

    public function scopeWithFilters($query, Request $request)
    {
        return $query->when($request->query('query'), function (Builder $query, $queryParam) {
            $query->where(DB::raw("LOWER(" . $this->getTable() . ".name)"), 'LIKE', "%" . mb_strtolower($queryParam) . "%");
        });
    }
}
