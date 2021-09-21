<?php

namespace App\Models;


class Client extends BaseModel
{
    public function orders()
    {
        return $this->hasMany(Order::class);
    }

    public function ordersLikeReceiver()
    {
        return $this->hasMany(Order::class, 'receiver_id');
    }
}
