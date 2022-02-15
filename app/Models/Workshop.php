<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

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
