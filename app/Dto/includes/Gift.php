<?php

namespace App\Dto\includes;

use Spatie\DataTransferObject\DataTransferObject;

class Gift extends DataTransferObject
{
    public ?int $id;
    public float $weight;
    public int $length;
    public int $width;
    public int $height;
    public int $addressee_id;
    public int $service_id;
}
