<?php

namespace App\Models;

use Illuminate\Auth\Authenticatable;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Foundation\Auth\Access\Authorizable;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Activitylog\LogOptions;
use Spatie\Activitylog\Traits\LogsActivity;


class Parthner extends BaseModel implements
    AuthenticatableContract,
    AuthorizableContract
{
    use LogsActivity, HasApiTokens, Authenticatable, Authorizable;
    public function __construct(array $attributes = [])
    {
        parent::__construct($attributes);
        $additionalHidden = ['manager_id'];
        //@FIXME Скрывать parthner_hash всем, кроме админов
        // $additionalHidden = ['manager_id', 'parthner_hash'];
        $this->hidden = array_merge($this->hidden, $additionalHidden);

        $additionalGuarded = ['parthner_hash'];
        $this->guarded = array_merge($this->guarded, $additionalGuarded);
    }

    public function manager()
    {
        return $this->belongsTo(User::class);
    }

    public function orders()
    {
        return $this->hasMany(Order::class);
    }

    public function prices()
    {
        return $this->hasMany(Price::class);
    }

    public function orderHistory()
    {
        return $this->morphOne(OrderHistory::class, 'user');
    }

    public function role()
    {
        return $this->belongsTo(Role::class);
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
            })
            ->when($request->query('manager_id'), function (Builder $query, $roleId) {
                $query->where($this->getTable() . ".manager_id", $roleId);
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
                        $logName = "Редактирование партнера {$this->full_name}";
                        break;
                    case "created":
                        $logName = "Создание партнера {$this->full_name}";
                        break;
                    case "deleted":
                        $logName = "Удаление партнера {$this->full_name}";
                        break;
                    default:
                        $logName = "Другое действие с партнера {$this->full_name}";
                }
                return $logName;
            });
    }
}
