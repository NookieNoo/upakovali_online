<?php

namespace App\Models;

use App\Enums\UserType;
use App\Notifications\VerifyEmailNotification;
use Illuminate\Auth\Notifications\VerifyEmail;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Activitylog\LogOptions;
use Spatie\Activitylog\Models\Activity;
use Spatie\Activitylog\Traits\LogsActivity;

/**
 * App\Models\User
 *
 * @property int $id
 * @property string $full_name
 * @property string $email
 * @property string|null $phone
 * @property \Illuminate\Support\Carbon|null $email_verified_at
 * @property string $password
 * @property int|null $role_id
 * @property bool $is_active
 * @property string|null $remember_token
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection|Activity[] $activities
 * @property-read int|null $activities_count
 * @property-read \Illuminate\Notifications\DatabaseNotificationCollection|\Illuminate\Notifications\DatabaseNotification[] $notifications
 * @property-read int|null $notifications_count
 * @property-read \App\Models\OrderHistory|null $orderHistory
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Order[] $ordersLikeCourierIssuer
 * @property-read int|null $orders_like_courier_issuer_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Order[] $ordersLikeCourierReceiver
 * @property-read int|null $orders_like_courier_receiver_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Order[] $ordersLikeMaster
 * @property-read int|null $orders_like_master_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Parthner[] $parthners
 * @property-read int|null $parthners_count
 * @property-read \App\Models\Role|null $role
 * @property-read \Illuminate\Database\Eloquent\Collection|\Laravel\Sanctum\PersonalAccessToken[] $tokens
 * @property-read int|null $tokens_count
 * @method static \Database\Factories\UserFactory factory(...$parameters)
 * @method static Builder|User newModelQuery()
 * @method static Builder|User newQuery()
 * @method static Builder|User query()
 * @method static Builder|User whereCreatedAt($value)
 * @method static Builder|User whereEmail($value)
 * @method static Builder|User whereEmailVerifiedAt($value)
 * @method static Builder|User whereFullName($value)
 * @method static Builder|User whereId($value)
 * @method static Builder|User whereIsActive($value)
 * @method static Builder|User wherePassword($value)
 * @method static Builder|User wherePhone($value)
 * @method static Builder|User whereRememberToken($value)
 * @method static Builder|User whereRoleId($value)
 * @method static Builder|User whereUpdatedAt($value)
 * @method static Builder|User withFilters(\Illuminate\Http\Request $request)
 * @method static Builder|User withOrder(\Illuminate\Http\Request $request)
 * @method static Builder|User withPaginate(\Illuminate\Http\Request $request)
 * @mixin \Eloquent
 */
class User extends Authenticatable implements MustVerifyEmail
{
    use HasApiTokens, HasFactory, Notifiable, LogsActivity;

    /**
     * The attributes that are mass assignable.
     *
     * @var string[]
     */
    protected $fillable = [
        'full_name',
        'password',
        'remember_token',
        'phone',
        'role_id',
        'email',
        'is_active'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
        'created_at',
        'updated_at',
        'role_id',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function isAdmin() {
        return $this->role->id === UserType::ADMIN;
    }

    public function isManager() {
        return $this->role->id === UserType::MANAGER;
    }

    public function isMaster() {
        return $this->role->id === UserType::MASTER;
    }

    public function isCourier() {
        return $this->role->id === UserType::COURIER;
    }

    public function role()
    {
        return $this->belongsTo(Role::class);
    }

    public function parthners()
    {
        return $this->hasMany(Parthner::class, 'manager_id');
    }

    public function ordersLikeMaster()
    {
        return $this->hasMany(Order::class, 'master_id');
    }

    public function ordersLikeCourierReceiver()
    {
        return $this->hasMany(Order::class, 'courier_receiver_id');
    }

    public function ordersLikeCourierIssuer()
    {
        return $this->hasMany(Order::class, 'courier_issuer_id');
    }

    public function orderHistory()
    {
        return $this->morphOne(OrderHistory::class, 'user');
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
            ->when($request->query('is_active'), function (Builder $query, $is_active) {
                if ($is_active) $query->where($this->getTable() . ".is_active", $is_active);
            })
            ->when($request->query('role_id'), function (Builder $query, $roleId) {
                $query->where($this->getTable() . ".role_id", $roleId);
            });
    }

    public function scopeWithOrder($query, Request $request) {
        $sorts = explode(',', $request->query('sort', $this->getTable() . '.id'));
        $columnNames = $this->getColumnNames();
        foreach ($sorts as $sortColumn) {
            $sortDirection = Str::startsWith($sortColumn, '-') ? 'desc' : 'asc';
            $sortColumn = ltrim($sortColumn, '-');
            if (in_array($sortColumn, $columnNames)) {
                $query->orderBy($this->getTable() . '.' . $sortColumn, $sortDirection);
            }
        }

        return $query;
    }

    public function scopeWithPaginate($query, Request $request) {
        $pageParam = $request->query('page');
        $perPage = 15;
        $number = 1;
        if (!empty($pageParam)) {
            $number = $pageParam['number'] ?? $number;
            $perPage = $pageParam['size'] ?? $perPage;
        }
        $filterParams = $request->query->all();

        return $query->paginate($perPage, ['*'], 'page[number]', $number)->appends($filterParams);
    }

    protected function getColumnNames() {
        return DB::getSchemaBuilder()->getColumnListing($this->getTable());
    }

    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
            ->logFillable()
            ->logOnlyDirty()
            ->setDescriptionForEvent(function ($eventName) {
                switch ($eventName) {
                    case "updated":
                        $logName = "Редактирование пользователя {$this->full_name}";
                        break;
                    case "created":
                        $logName = "Создание пользователя {$this->full_name}";
                        break;
                    case "deleted":
                        $logName = "Удаление пользователя {$this->full_name}";
                        break;
                    default:
                        $logName = "Другое действие с пользователя {$this->full_name}";
                }
                return $logName;
            });
    }

//    public function sendEmailVerificationNotification()
//    {
//        $this->notify(new VerifyEmailNotification);
//    }
}
