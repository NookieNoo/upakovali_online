<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

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
        'email'
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

    public function scopeWithFilters($query, Request $request)
    {
        return $query->when($request->query('query'), function (Builder $query, $queryParam) {
            $query->where(DB::raw("LOWER(" . $this->getTable() . ".full_name)"), 'LIKE', "%" . mb_strtolower($queryParam) . "%");
        })
            ->when($request->query('role_id'), function (Builder $query, $roleId) {
                $query->where($this->getTable() . ".role_id", $roleId);
            });
    }
}
