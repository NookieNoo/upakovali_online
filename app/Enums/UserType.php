<?php

namespace App\Enums;

use BenSampo\Enum\Enum;

/**
 * @method static static ADMIN()
 * @method static static MANAGER()
 * @method static static MASTER()
 * @method static static COURIER()
 * @method static static PARTHNER()
 * @method static static UNCONFIRMED()
 */
final class UserType extends Enum
{
    const ADMIN = 1;
    const MANAGER = 2;
    const MASTER = 3;
    const COURIER = 4;
    const PARTHNER = 5;
    const UNCONFIRMED = 6;
}
