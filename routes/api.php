<?php

use App\Http\Controllers\Api\V1\ClientController;
use App\Http\Controllers\Api\V1\OrderController;
use App\Http\Controllers\Api\V1\ParthnerController;
use App\Http\Controllers\Api\V1\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

//Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//    return $request->user();
//});
Route::prefix('client')->group(function (){
    Route::get('/', [ClientController::class, 'index']);
    Route::get('/{id}', [ClientController::class, 'show'])->where('id', '[0-9]+');
});

Route::prefix('parthner')->group(function (){
//    Route::post('', function () {
//        return response()->json([
//            'code' => 200,
//            'message' => '24324.',
//        ], 200);
//    });
    Route::post('', [ParthnerController::class, 'store']);
    Route::get('/', [ParthnerController::class, 'index']);
    Route::get('/{id}', [ParthnerController::class, 'show'])->where('id', '[0-9]+');
});

Route::prefix('order')->group(function (){
    Route::get('/', [OrderController::class, 'index']);
    Route::get('/{id}', [OrderController::class, 'show'])->where('id', '[0-9]+');
});

Route::prefix('user')->group(function (){
    Route::get('/', [UserController::class, 'index']);
    Route::get('/{id}', [UserController::class, 'show'])->where('id', '[0-9]+');
});

Route::fallback(function () {
    return response()->json([
        'code' => 404,
        'message' => 'Page Not Found.',
    ], 404);
});
