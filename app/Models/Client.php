<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Spatie\Activitylog\LogOptions;
use Spatie\Activitylog\Traits\LogsActivity;

/**
 * App\Models\Client
 *
 * @property int $id
 * @property string $full_name
 * @property string $phone
 * @property string $email
 * @property string|null $comment
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection|\Spatie\Activitylog\Models\Activity[] $activities
 * @property-read int|null $activities_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Order[] $orders
 * @property-read int|null $orders_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Order[] $ordersLikeReceiver
 * @property-read int|null $orders_like_receiver_count
 * @method static \Database\Factories\ClientFactory factory(...$parameters)
 * @method static Builder|Client newModelQuery()
 * @method static Builder|Client newQuery()
 * @method static Builder|Client query()
 * @method static Builder|Client whereComment($value)
 * @method static Builder|Client whereCreatedAt($value)
 * @method static Builder|Client whereEmail($value)
 * @method static Builder|Client whereFullName($value)
 * @method static Builder|Client whereId($value)
 * @method static Builder|Client wherePhone($value)
 * @method static Builder|Client whereUpdatedAt($value)
 * @method static Builder|Client withFilters(\Illuminate\Http\Request $request)
 * @method static \Illuminate\Database\Eloquent\Builder|BaseModel withOrder(\Illuminate\Http\Request $request)
 * @method static \Illuminate\Database\Eloquent\Builder|BaseModel withPaginate(\Illuminate\Http\Request $request)
 * @mixin \Eloquent
 */
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
