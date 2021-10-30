<?php

namespace App\Models;

class Gift extends BaseModel
{
    public function __construct(array $attributes = [])
    {
        parent::__construct($attributes);
        $additionalHidden = ['order_id', 'addressee_id', 'service_id'];
        $this->hidden = array_merge($this->hidden, $additionalHidden);
    }

    public function addressee()
    {
        return $this->belongsTo(Addressee::class);
    }

    public function service()
    {
        return $this->belongsTo(Service::class);
    }
}
