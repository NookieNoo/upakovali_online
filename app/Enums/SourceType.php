<?php

namespace App\Enums;

use BenSampo\Enum\Enum;

/**
 * @method static static WALKING()
 * @method static static SITE()
 * @method static static API()
 */
final class SourceType extends Enum
{
    const WALKING = 1;
    const SITE = 2;
    const API = 3;
}
