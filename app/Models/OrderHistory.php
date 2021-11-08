<?php

namespace App\Models;

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
