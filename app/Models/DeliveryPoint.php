<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DeliveryPoint extends BaseModel
{
    use HasFactory;

    // public function orders()
    // {
    //     return $this->morphMany(Order::class, 'pickupable');
    // }
}
