<?php

namespace App\Models;

class Parthner extends BaseModel
{
    public function __construct(array $attributes = [])
    {
        parent::__construct($attributes);
        $this->hidden[] = 'manager_id';
    }

    public function manager()
    {
        return $this->belongsTo(User::class);
    }
}
