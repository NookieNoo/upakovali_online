<?php

namespace App\Enums;

use BenSampo\Enum\Enum;

/**
 * @method static static DELIVERY_OR_PICKING()
 * @method static static PACKAGE()
 * @method static static BOX()
 * @method static static POSTCARD()
 */
final class ServiceTypes extends Enum
{
    const DELIVERY_OR_PICKING =   1;
    const PACKAGE =   2;
    const BOX = 3;
    const POSTCARD  = 4;
}
