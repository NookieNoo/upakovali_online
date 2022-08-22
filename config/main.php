<?php
$phoneRegex = '/^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/mi';

return [
    'frontend_domain' => env('FRONTEND_DOMAIN'),
    'datetime_format' => env('DEFAULT_DATETIME_FORMAT'),
    //'phone_format_regex' => '/^\+7\([0-9]{3}\)[0-9]{3}-[0-9]{4}$/mi',
    'phone_format_regex' => $phoneRegex,
    'phone_format_mask' => $phoneRegex,
    'login_front_page' => 'https://' . env('FRONTEND_DOMAIN') . '/login'
];
