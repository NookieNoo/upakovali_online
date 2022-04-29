<?php

namespace App\Models;

/**
 * App\Models\OrderHistory
 *
 * @property int $id
 * @property int $order_id
 * @property int $status_id
 * @property int $causer_id
 * @property string $causer_type
 * @property string $date
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\OrderStatus $status
 * @property-read \Illuminate\Database\Eloquent\Model|\Eloquent $user
 * @method static \Database\Factories\OrderHistoryFactory factory(...$parameters)
 * @method static \Illuminate\Database\Eloquent\Builder|OrderHistory newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|OrderHistory newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|OrderHistory query()
 * @method static \Illuminate\Database\Eloquent\Builder|OrderHistory whereCauserId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|OrderHistory whereCauserType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|OrderHistory whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|OrderHistory whereDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|OrderHistory whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|OrderHistory whereOrderId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|OrderHistory whereStatusId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|OrderHistory whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BaseModel withOrder(\Illuminate\Http\Request $request)
 * @method static \Illuminate\Database\Eloquent\Builder|BaseModel withPaginate(\Illuminate\Http\Request $request)
 * @mixin \Eloquent
 */
class OrderHistory extends BaseModel
{
    protected $table = 'order_history';
    public function __construct(array $attributes = [])
    {
        parent::__construct($attributes);
        $additionalHidden = ['status_id', 'order_id', 'causer_id'];
        $this->hidden = array_merge($this->hidden, $additionalHidden);
    }

    public function status()
    {
        return $this->belongsTo(OrderStatus::class);
    }

    public function user()
    {
        return $this->morphTo(__FUNCTION__, 'causer_type', 'causer_id');
    }
}
