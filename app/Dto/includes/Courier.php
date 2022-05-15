<?php

namespace App\Dto\includes;

use Spatie\DataTransferObject\DataTransferObject;

class Courier extends DataTransferObject
{
    public string $full_name;
    public string $phone;
    public ?string $email;
}
