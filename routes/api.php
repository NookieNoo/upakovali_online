<?php

use App\Http\Controllers\Api\V1\AddresseeController;
use App\Http\Controllers\Api\V1\AuthController;
use App\Http\Controllers\Api\V1\ClientController;
use App\Http\Controllers\Api\V1\OrderController;
use App\Http\Controllers\Api\V1\OrderStatusController;
use App\Http\Controllers\Api\V1\ParthnerController;
use App\Http\Controllers\Api\V1\RoleController;
use App\Http\Controllers\Api\V1\ServiceController;
use App\Http\Controllers\Api\V1\SourceController;
use App\Http\Controllers\Api\V1\UserController;
use App\Http\Controllers\Api\V1\WorkshopController;
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

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login'])->name('login');

Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::prefix('client')->group(function () {
        Route::post('', [ClientController::class, 'store']);
        Route::get('/', [ClientController::class, 'index']);
        Route::delete('/{id}', [ClientController::class, 'destroy'])->where('id', '[0-9]+');
        Route::get('/{id}', [ClientController::class, 'show'])->where('id', '[0-9]+');
        Route::put('/{id}', [ClientController::class, 'update'])->where('id', '[0-9]+');
    });

    Route::prefix('parthner')->group(function () {
        Route::post('', [ParthnerController::class, 'store']);
        Route::get('/', [ParthnerController::class, 'index']);
        Route::delete('/{id}', [ParthnerController::class, 'destroy'])->where('id', '[0-9]+');
        Route::get('/{id}', [ParthnerController::class, 'show'])->where('id', '[0-9]+');
        Route::put('/{id}', [ParthnerController::class, 'update'])->where('id', '[0-9]+');
    });

    Route::prefix('order')->group(function () {
        Route::post('', [OrderController::class, 'store']);
        Route::get('/', [OrderController::class, 'index']);
        Route::get('/{id}', [OrderController::class, 'show'])->where('id', '[0-9]+');
        Route::delete('/{id}', [OrderController::class, 'destroy'])->where('id', '[0-9]+');
        Route::put('/{id}', [OrderController::class, 'update'])->where('id', '[0-9]+');
        Route::patch('/{id}', [OrderController::class, 'updateStatus'])->where('id', '[0-9]+');
    });

    Route::prefix('user')->group(function () {
        Route::post('', [UserController::class, 'store']);
        Route::get('/', [UserController::class, 'index']);
        Route::delete('/{id}', [UserController::class, 'destroy'])->where('id', '[0-9]+');
        Route::get('/{id}', [UserController::class, 'show'])->where('id', '[0-9]+');
        Route::put('/{id}', [UserController::class, 'update'])->where('id', '[0-9]+');
    });

    Route::prefix('role')->group(function () {
        Route::get('/', [RoleController::class, 'index']);
    });

    Route::prefix('source')->group(function () {
        Route::get('/', [SourceController::class, 'index']);
    });

    Route::prefix('workshop')->group(function () {
        Route::get('/', [WorkshopController::class, 'index']);
    });

    Route::prefix('addressee')->group(function () {
        Route::get('/', [AddresseeController::class, 'index']);
    });

    Route::prefix('order_status')->group(function () {
        Route::get('/', [OrderStatusController::class, 'index']);
    });

    Route::prefix('service')->group(function () {
        Route::get('/', [ServiceController::class, 'index']);
    });

    Route::post('/logout', [AuthController::class, 'logout']);
});


Route::fallback(function () {
    return response()->json([
        'code' => 404,
        'message' => 'Page Not Found.',
    ], 404);
});
