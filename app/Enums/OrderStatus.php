<?php

namespace App\Enums;

use BenSampo\Enum\Enum;

/**
 * @method static static CREATED()
 * @method static static COURIER_APPOINTED()
 * @method static static WAS_TAKEN()
 * @method static static ACCEPTED()
 * @method static static IN_PROGRESS()
 * @method static static PACKED()
 * @method static static WAS_ISSUED()
 * @method static static COURIER_ISSUES()
 * @method static static DELIVERED()
 * @method static static PAID()
 * @method static static CANCELED()
 */
final class OrderStatus extends Enum
{
    const CREATED =   1;
    const COURIER_APPOINTED =   2;
    const WAS_TAKEN = 3;
    const ACCEPTED = 4;
    const IN_PROGRESS = 5;
    const PACKED = 6;
    const WAS_ISSUED = 7;
    const COURIER_ISSUES = 8;
    const DELIVERED = 9;
    const PAID = 10;
    const CANCELED = 11;
}

