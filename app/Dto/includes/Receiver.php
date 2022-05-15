<?php

namespace App\Dto\includes;

use Spatie\DataTransferObject\DataTransferObject;

class Receiver extends DataTransferObject
{
    public string $full_name;
    public string $phone;
    public ?string $email;
}
