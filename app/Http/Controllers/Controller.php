<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Http\Response;
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
 * @OA\Tag(
 *     name="Examples",
 *     description="Some example pages",
 * )
 * @OA\Server(
 *     description="Локальный базовый url для методов API (префикс)",
 *     url="http://localhost:29080/api/v1"
 * )
 * @OA\SecurityScheme(
 *     type="apiKey",
 *     in="header",
 *     name="X-APP-ID",
 *     securityScheme="X-APP-ID"
 * )
 */
class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

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
