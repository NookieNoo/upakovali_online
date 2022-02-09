<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class TransformStringBoolToBoolean
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @param  string|null  $guard
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        if ($request->method() === 'GET') {
            $request->replace($this->transform($request->all()));
        }
        return $next($request);
    }

    /**
     * Transform boolean strings to boolean
     * @param array $parameters
     * @return array
     */
    private function transform(array $parameters): array
    {
        return collect($parameters)->map(function ($param) {
            if ($param === 'true' || $param === 'false') {
                return filter_var($param, FILTER_VALIDATE_BOOLEAN);
            }

            return $param;
        })->all();
    }
}
