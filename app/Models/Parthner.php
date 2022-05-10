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
use Illuminate\Notifications\Notifiable;


/**
 * App\Models\Parthner
 *
 * @property int $id
 * @property string $full_name
 * @property int $manager_id
 * @property string $phone
 * @property string $email
 * @property string|null $comment
 * @property string $parthner_hash
 * @property int $role_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection|\Spatie\Activitylog\Models\Activity[] $activities
 * @property-read int|null $activities_count
 * @property-read \App\Models\User $manager
 * @property-read \App\Models\OrderHistory|null $orderHistory
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Order[] $orders
 * @property-read int|null $orders_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Price[] $prices
 * @property-read int|null $prices_count
 * @property-read \App\Models\Role $role
 * @property-read \Illuminate\Database\Eloquent\Collection|\Laravel\Sanctum\PersonalAccessToken[] $tokens
 * @property-read int|null $tokens_count
 * @method static \Database\Factories\ParthnerFactory factory(...$parameters)
 * @method static Builder|Parthner newModelQuery()
 * @method static Builder|Parthner newQuery()
 * @method static Builder|Parthner query()
 * @method static Builder|Parthner whereComment($value)
 * @method static Builder|Parthner whereCreatedAt($value)
 * @method static Builder|Parthner whereEmail($value)
 * @method static Builder|Parthner whereFullName($value)
 * @method static Builder|Parthner whereId($value)
 * @method static Builder|Parthner whereManagerId($value)
 * @method static Builder|Parthner whereParthnerHash($value)
 * @method static Builder|Parthner wherePhone($value)
 * @method static Builder|Parthner whereRoleId($value)
 * @method static Builder|Parthner whereUpdatedAt($value)
 * @method static Builder|Parthner withFilters(\Illuminate\Http\Request $request)
 * @method static \Illuminate\Database\Eloquent\Builder|BaseModel withOrder(\Illuminate\Http\Request $request)
 * @method static \Illuminate\Database\Eloquent\Builder|BaseModel withPaginate(\Illuminate\Http\Request $request)
 * @mixin \Eloquent
 * @property string $password
 * @method static Builder|Parthner wherePassword($value)
 */
class Parthner extends BaseModel implements
    AuthenticatableContract,
    AuthorizableContract
{
    use LogsActivity, HasApiTokens, Authenticatable, Authorizable, Notifiable;

    protected $hidden = [
        'password',
    ];

    public function __construct(array $attributes = [])
    {
        parent::__construct($attributes);
        $additionalHidden = ['manager_id'];
        $this->hidden = array_merge($this->hidden, $additionalHidden);
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
