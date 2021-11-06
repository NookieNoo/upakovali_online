<?php

namespace App\Models;

class OrderPhoto extends BaseModel
{

    public function toArray()
    {
        return [
            'id' => $this->id,
            'abs_path' => asset($this->path),
            'src' => asset($this->path),
            'rel_path' => $this->path,
        ];
    }
}
