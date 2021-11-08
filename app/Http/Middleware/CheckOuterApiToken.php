<?php

namespace App\Http\Middleware;

use App\Exceptions\TokenMismatchException;
use App\Models\Parthner;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CheckOuterApiToken
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        if ($this->verify($request)) {
            return $next($request);
        }

        throw new TokenMismatchException;
    }

    /**
     * Verify token by querying database for existence of the client:token pair specified in headers.
     *
     * @param \Illuminate\Http\Request $request
     *
     * @return bool
     */
    public function verify($request): bool
    {
        return DB::table('personal_access_tokens')->select('token')->where([
            'tokenable_type' => get_class(new Parthner()),
            'token'  => request()->bearerToken(),
        ])->exists();
    }
}
