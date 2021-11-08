<?php

namespace App\Exceptions;

use Exception;
use Illuminate\Http\Response;

class TokenMismatchException extends Exception
{
    /**
     * Report the exception.
     *
     * @return void
     */
    public function report()
    {
        //
    }

    /**
     * Render the exception into an HTTP response.
     *
     * @param  \Illuminate\Http\Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function render($request)
    {
        return response()->json(['error' => 'Unauthorized'], Response::HTTP_FORBIDDEN);
    }
}
