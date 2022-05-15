<?php

return [
    'frontend_domain' => env('FRONTEND_DOMAIN'),
    'datetime_format' => env('DEFAULT_DATETIME_FORMAT'),
    'phone_format_regex' => '/^\+7\([0-9]{3}\)[0-9]{3}-[0-9]{4}$/mi',
    'phone_format_mask' => env('PHONE_FORMAT_MASK'),
];
