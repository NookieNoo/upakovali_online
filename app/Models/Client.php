<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Spatie\Activitylog\LogOptions;
use Spatie\Activitylog\Traits\LogsActivity;

class Client extends BaseModel
{
    use LogsActivity;
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
        })
        ->when($request->query('q'), function (Builder $query, $q) {
            $query->where(DB::raw("LOWER(" . $this->getTable() . ".full_name)"), 'LIKE', "%" . mb_strtolower($q) . "%")
                ->orWhere(DB::raw("LOWER(" . $this->getTable() . ".phone)"), 'LIKE', "%" . mb_strtolower($q) . "%")
                ->orWhere(DB::raw("LOWER(" . $this->getTable() . ".email)"), 'LIKE', "%" . mb_strtolower($q) . "%");
        });
    }

    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
            ->logUnguarded()
            ->logOnlyDirty()
            ->setDescriptionForEvent(function ($eventName) {
                switch ($eventName) {
                    case "updated":
                        $logName = "Редактирование клиента {$this->full_name}";
                        break;
                    case "created":
                        $logName = "Создание клиента {$this->full_name}";
                        break;
                    case "deleted":
                        $logName = "Удаление клиента {$this->full_name}";
                        break;
                    default:
                        $logName = "Другое действие с клиента {$this->full_name}";
                }
                return $logName;
            });
    }
}
