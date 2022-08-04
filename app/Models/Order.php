<?php

namespace App\Models;

use App\Enums\SourceType;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Support\Facades\DB;
use Spatie\Activitylog\Traits\LogsActivity;
use Spatie\Activitylog\LogOptions;

/**
 * App\Models\Order
 *
 * @property int $id
 * @property int $order_status_id
 * @property int $source_id
 * @property int|null $parthner_id
 * @property string|null $external_number
 * @property int $client_id
 * @property int $workshop_id
 * @property bool $is_pickupable
 * @property int|null $pick_up_point_id Точка забора товара
 * @property int|null $pick_up_address_point_id
 * @property string|null $pick_up_address Точка забора товара
 * @property float|null $pick_up_price Стоимость забора товара
 * @property bool $is_deliverable
 * @property int|null $delivery_point_id Точка выдачи товара
 * @property int|null $delivery_address_point_id
 * @property string|null $delivery_address
 * @property float|null $delivery_price Стоимость доставки товара
 * @property string $receiving_date
 * @property string $issue_date
 * @property string|null $comment
 * @property int|null $courier_receiver_id Курьер принимающий
 * @property int|null $courier_issuer_id Курьер выдающий
 * @property bool|null $isPaid
 * @property int|null $master_id
 * @property int $receiver_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection|\Spatie\Activitylog\Models\Activity[] $activities
 * @property-read int|null $activities_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\AdditionalProduct[] $additionalProducts
 * @property-read int|null $additional_products_count
 * @property-read \App\Models\Client $client
 * @property-read \App\Models\User|null $courierIssuer
 * @property-read \App\Models\User|null $courierReceiver
 * @property-read \App\Models\DeliveryPoint|null $deliveryAddressPoint
 * @property-read \App\Models\Workshop|null $deliveryPoint
 * @property-read mixed $total
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Gift[] $gifts
 * @property-read int|null $gifts_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\OrderHistory[] $history
 * @property-read int|null $history_count
 * @property-read \App\Models\User|null $master
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\OrderPhoto[] $orderPhotos
 * @property-read int|null $order_photos_count
 * @property-read \App\Models\OrderStatus $orderStatus
 * @property-read \App\Models\Parthner|null $parthner
 * @property-read \App\Models\DeliveryPoint|null $pickUpAddressPoint
 * @property-read \App\Models\Workshop|null $pickUpPoint
 * @property-read \App\Models\Client $receiver
 * @property-read \App\Models\Source $source
 * @property-read \App\Models\Workshop $workshop
 * @method static \Database\Factories\OrderFactory factory(...$parameters)
 * @method static Builder|Order newModelQuery()
 * @method static Builder|Order newQuery()
 * @method static Builder|Order query()
 * @method static Builder|Order whereClientId($value)
 * @method static Builder|Order whereComment($value)
 * @method static Builder|Order whereCourierIssuerId($value)
 * @method static Builder|Order whereCourierReceiverId($value)
 * @method static Builder|Order whereCreatedAt($value)
 * @method static Builder|Order whereDeliveryAddress($value)
 * @method static Builder|Order whereDeliveryAddressPointId($value)
 * @method static Builder|Order whereDeliveryPointId($value)
 * @method static Builder|Order whereDeliveryPrice($value)
 * @method static Builder|Order whereExternalNumber($value)
 * @method static Builder|Order whereId($value)
 * @method static Builder|Order whereIsDeliverable($value)
 * @method static Builder|Order whereIsPaid($value)
 * @method static Builder|Order whereIsPickupable($value)
 * @method static Builder|Order whereIssueDate($value)
 * @method static Builder|Order whereMasterId($value)
 * @method static Builder|Order whereOrderStatusId($value)
 * @method static Builder|Order whereParthnerId($value)
 * @method static Builder|Order wherePickUpAddress($value)
 * @method static Builder|Order wherePickUpAddressPointId($value)
 * @method static Builder|Order wherePickUpPointId($value)
 * @method static Builder|Order wherePickUpPrice($value)
 * @method static Builder|Order whereReceiverId($value)
 * @method static Builder|Order whereReceivingDate($value)
 * @method static Builder|Order whereSourceId($value)
 * @method static Builder|Order whereUpdatedAt($value)
 * @method static Builder|Order whereWorkshopId($value)
 * @method static Builder|Order withAllRelations()
 * @method static Builder|Order withFilters(\Illuminate\Http\Request $request)
 * @method static Builder|Order withFiltersByPermission(\App\Models\User $user)
 * @method static \Illuminate\Database\Eloquent\Builder|BaseModel withOrder(\Illuminate\Http\Request $request)
 * @method static \Illuminate\Database\Eloquent\Builder|BaseModel withPaginate(\Illuminate\Http\Request $request)
 * @mixin \Eloquent
 */
class Order extends BaseModel
{
    use LogsActivity;

    protected $casts = [
        'pick_up_price' => 'float',
        'delivery_price' => 'float',
    ];

    public static $supportedRelations = ['source', 'parthner', 'client', 'workshop', 'pickUpPoint',
        'deliveryPoint', 'courierReceiver', 'courierIssuer', 'master', 'receiver', 'history', 'history.status',
        'history.user', 'history.user.role', 'orderStatus', 'orderPhotos', 'gifts', 'gifts.addressee', 'gifts.service',
        'gifts.service.price', 'gifts.service.product', 'additionalProducts', 'deliveryAddressPoint', 'pickUpAddressPoint'];

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

    public function pickUpAddressPoint()
    {
        return $this->belongsTo(DeliveryPoint::class);
    }

//    public function pickupable()
//    {
//        return $this->morphTo();
//    }

    public function deliveryPoint()
    {
        return $this->belongsTo(Workshop::class);
    }

    public function deliveryAddressPoint()
    {
        return $this->belongsTo(DeliveryPoint::class);
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

    public function isFromApi()
    {
        return $this->source_id === SourceType::API;
    }

    public function getTotalAttribute()
    {
        $gifts = $this->gifts;
        $total = 0;
        foreach ($gifts as $gift) {
            $total += $gift->service->sum;
        }
        foreach ($this->additionalProducts as $product) {
            $total += $product->price;
        }
        if ($this->is_pickupable) $total += $this->pick_up_price;
        if ($this->is_deliverable) $total += $this->delivery_price;
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
            ->when($request->query('id'), function (Builder $query, $id) {
                $query->where($this->getTable() . ".id", $id);
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
            })
            ->when($request->query('order_date'), function (Builder $query, $orderDate) {
                $query
                    ->whereDate($this->getTable() . ".issue_date", '=', $orderDate)
                    ->orWhereDate($this->getTable() . ".receiving_date", '=', $orderDate);
            })
            ->when($request->query('receiving_date_from'), function (Builder $query, $date) {
                $query->whereDate($this->getTable() . ".receiving_date", '>=', $date);
            })
            ->when($request->query('receiving_date_to'), function (Builder $query, $date) {
                $query->whereDate($this->getTable() . ".receiving_date", '<=', $date);
            })
            ->when($request->query('issue_date_from'), function (Builder $query, $date) {
                $query->whereDate($this->getTable() . ".issue_date", '>=', $date);
            })
            ->when($request->query('issue_date_to'), function (Builder $query, $date) {
                $query->whereDate($this->getTable() . ".issue_date", '<=', $date);
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
                return match ($eventName) {
                    "updated" => "Редактирование заказа №{$this->id}",
                    "created" => "Создание заказа №{$this->id}",
                    "deleted" => "Удаление заказа №{$this->id}",
                    default => "Другое действие с заказом №{$this->id}",
                };
            });
    }
}
