<?php

namespace App\Models;

class Price extends BaseModel
{
    public function services()
    {
        return $this->hasMany(Service::class);
    }
}
