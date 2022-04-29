<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\DeliveryPoint
 *
 * @property int $id
 * @property string $address
 * @property string|null $longitude
 * @property string|null $latitude
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|DeliveryPoint newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|DeliveryPoint newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|DeliveryPoint query()
 * @method static \Illuminate\Database\Eloquent\Builder|DeliveryPoint whereAddress($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DeliveryPoint whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DeliveryPoint whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DeliveryPoint whereLatitude($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DeliveryPoint whereLongitude($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DeliveryPoint whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BaseModel withOrder(\Illuminate\Http\Request $request)
 * @method static \Illuminate\Database\Eloquent\Builder|BaseModel withPaginate(\Illuminate\Http\Request $request)
 * @mixin \Eloquent
 */
class DeliveryPoint extends BaseModel
{
    use HasFactory;

    // public function orders()
    // {
    //     return $this->morphMany(Order::class, 'pickupable');
    // }
}
