<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class Client extends BaseModel
{
    public function orders()
    {
        return $this->hasMany(Order::class);
    }

    public function ordersLikeReceiver()
    {
        return $this->hasMany(Order::class, 'receiver_id');
    }

    public function scopeWithFilters($query, Request $request)
    {
        return $query->when($request->query('query'), function (Builder $query, $queryParam) {
            $query->where(DB::raw("LOWER(" . $this->getTable() . ".full_name)"), 'LIKE', "%" . mb_strtolower($queryParam) . "%");
        });
    }
}
