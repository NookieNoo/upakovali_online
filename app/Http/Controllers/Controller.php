<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

/**
 * @OA\Info(
 *     title="Upakovali online API documentation",
 *     version="1.0.0",
 *     @OA\Contact(
 *         email="ib@mitlabs.ru"
 *     ),
 *     @OA\License(
 *         name="Apache 2.0",
 *         url="http://www.apache.org/licenses/LICENSE-2.0.html"
 *     )
 * )
 * @OA\Server(
 *     description="Тестовый url для методов API (префикс)",
 *     url="https://upakovali-online.herokuapp.com/api/v1"
 * )
 * @OA\Server(
 *     description="Локальный url для методов API (префикс)",
 *     url="http://localhost:29080/api/v1"
 * )
 * @OA\SecurityScheme(
 *     type="http",
 *     description="Login with parthner_hash to get the authentication token",
 *     scheme="bearer",
 *     in="header",
 *     name="bearerAuth",
 *     securityScheme="Bearer Token"
 * )
 */
class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    public function __construct()
    {
        $this->dispatcher = app('events');
    }

    public function send($code, $msg, $data = null)
    {
        $respData = [
            'code' => $code,
        ];
        if ($msg) $respData['message'] = $msg;
        if ($data) $respData['data'] = $data;
        return response()->json($respData, $code);
    }

    public function sendError($msg, $code, $errorMsg = null)
    {
        $respData = [
            'code' => $code,
            'message' => $msg,
        ];
        if ($errorMsg) $respData['errorMessage'] = $errorMsg;
        return response()->json($respData, $code);
    }
}
