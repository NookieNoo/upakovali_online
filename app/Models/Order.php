<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Spatie\Activitylog\Traits\LogsActivity;
use Spatie\Activitylog\LogOptions;

class Order extends BaseModel
{
    use LogsActivity;

    public static $supportedRelations = ['source', 'parthner', 'client', 'workshop', 'pickUpPoint',
        'deliveryPoint', 'courierReceiver', 'courierIssuer', 'master', 'receiver', 'history', 'history.status',
        'history.user', 'history.user.role', 'orderStatus', 'orderPhotos', 'gifts', 'gifts.addressee', 'gifts.service',
        'gifts.service.price', 'gifts.service.product', 'additionalProducts'];

    public function __construct(array $attributes = [])
    {
        parent::__construct($attributes);
        $additionalHidden = ['order_status_id', 'source_id', 'parthner_id', 'client_id', 'workshop_id', 'pick_up_point_id',
            'delivery_point_id', 'courier_receiver_id', 'courier_issuer_id', 'master_id', 'receiver_id'];
        $this->hidden = array_merge($this->hidden, $additionalHidden);
    }

    public function orderStatus()
    {
        return $this->belongsTo(OrderStatus::class);
    }

    public function source()
    {
        return $this->belongsTo(Source::class);
    }

    public function parthner()
    {
        return $this->belongsTo(Parthner::class);
    }

    public function client()
    {
        return $this->belongsTo(Client::class);
    }

    public function workshop()
    {
        return $this->belongsTo(Workshop::class);
    }

    public function pickUpPoint()
    {
        return $this->belongsTo(Workshop::class);
    }

    public function deliveryPoint()
    {
        return $this->belongsTo(Workshop::class);
    }

    public function courierReceiver()
    {
        return $this->belongsTo(User::class);
    }

    public function courierIssuer()
    {
        return $this->belongsTo(User::class);
    }

    public function master()
    {
        return $this->belongsTo(User::class);
    }

    public function receiver()
    {
        return $this->belongsTo(Client::class);
    }

    public function history()
    {
        return $this->hasMany(OrderHistory::class);
    }

    public function orderPhotos()
    {
        return $this->hasMany(OrderPhoto::class);
    }

    public function gifts()
    {
        return $this->hasMany(Gift::class);
    }

    public function additionalProducts()
    {
        return $this->hasMany(AdditionalProduct::class);
    }

    public function scopeWithAllRelations($query)
    {
        $query->with(self::$supportedRelations);
    }

    public function getTotalAttribute()
    {
        $gifts = $this->gifts;
        $total = 0;
        foreach ($gifts as $gift) {
            $total += $gift->service->sum;
        }
        return $total;
    }

    public function scopeWithFilters($query, Request $request)
    {
        return $query->when($request->query('source_id'), function (Builder $query, $sourceId) {
            $query->where($this->getTable() . ".source_id", $sourceId);
        })
            ->when($request->query('order_status_id'), function (Builder $query, $orderStatusId) {
                $query->where($this->getTable() . ".order_status_id", $orderStatusId);
            })
            ->when($request->query('parthner_id'), function (Builder $query, $parthnerId) {
                $query->where($this->getTable() . ".parthner_id", $parthnerId);
            })
            ->when($request->query('external_number'), function (Builder $query, $extNumb) {
                $query->where(DB::raw("LOWER(" . $this->getTable() . ".external_number)"), 'LIKE', "%" . mb_strtolower($extNumb) . "%");
            })
            ->when($request->query('client_id'), function (Builder $query, $clientId) {
                $query->where($this->getTable() . ".client_id", $clientId);
            })
            ->when($request->query('workshop_id'), function (Builder $query, $workshopId) {
                $query->where($this->getTable() . ".workshop_id", $workshopId);
            })
            ->when($request->query('isPaid'), function (Builder $query, $isPaid) {
                $query->where($this->getTable() . ".isPaid", $isPaid);
            })
            ->when($request->query('courier_receiver_id'), function (Builder $query, $courierReceiverId) {
                $query->where($this->getTable() . ".courier_receiver_id", $courierReceiverId);
            })
            ->when($request->query('courier_issuer_id'), function (Builder $query, $courierIssuerId) {
                $query->where($this->getTable() . ".courier_issuer_id", $courierIssuerId);
            })
            ->when($request->query('master_id'), function (Builder $query, $masterId) {
                $query->where($this->getTable() . ".master_id", $masterId);
            })
            ->when($request->query('receiver_id'), function (Builder $query, $receiverId) {
                $query->where($this->getTable() . ".receiver_id", $receiverId);
            });
    }

    public function scopeWithFiltersByPermission($query, User $user)
    {
        if ($user->isCourier()) {
            return $query->where($this->getTable() . ".courier_receiver_id", $user->id)
                ->orWhere($this->getTable() . ".courier_issuer_id", $user->id);
        } elseif ($user->isMaster()) {
            return $query->where($this->getTable() . ".master_id", $user->id);
        }
        return $query;
    }

    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
            ->logUnguarded()
            ->logOnlyDirty()
            ->setDescriptionForEvent(function ($eventName) {
                switch ($eventName) {
                    case "updated":
                        $logName = "Редактирование заказа №{$this->id}";
                        break;
                    case "created":
                        $logName = "Создание заказа №{$this->id}";
                        break;
                    case "deleted":
                        $logName = "Удаление заказа №{$this->id}";
                        break;
                    default:
                        $logName = "Другое действие с заказом №{$this->id}";
                }
                return $logName;
            });
    }
}
