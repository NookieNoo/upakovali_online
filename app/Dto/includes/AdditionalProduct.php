<?php

namespace App\Dto\includes;

use Spatie\DataTransferObject\DataTransferObject;

class AdditionalProduct extends DataTransferObject
{
    public float $price;
    public string $name;
}
