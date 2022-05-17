<?php

use App\Http\Controllers\Api\V1\ActivityController;
use App\Http\Controllers\Api\V1\AddresseeController;
use App\Http\Controllers\Api\V1\AuthController;
use App\Http\Controllers\Api\V1\ClientController;
use App\Http\Controllers\Api\V1\OrderController;
use App\Http\Controllers\Api\V1\OrderStatusController;
use App\Http\Controllers\Api\V1\OuterApiController;
use App\Http\Controllers\Api\V1\ParthnerController;
use App\Http\Controllers\Api\V1\PriceController;
use App\Http\Controllers\Api\V1\ProductController;
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
Route::post('/forgot-password', [AuthController::class, 'forgotPassword']);
Route::post('/reset-password', [AuthController::class, 'resetPassword'])->name('password.reset');
Route::post('/login/parthner', [AuthController::class, 'loginParthner']);

Route::get('/debug-sentry', function () {
    throw new Exception('My first Sentry error!');
});

Route::group(['middleware' => ['auth:users']], function () {
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
        Route::post('', [SourceController::class, 'store']);
        Route::put('/{id}', [SourceController::class, 'update'])->where('id', '[0-9]+');
        Route::get('/{id}', [SourceController::class, 'show'])->where('id', '[0-9]+');
        Route::delete('/{id}', [SourceController::class, 'destroy'])->where('id', '[0-9]+');
    });

    Route::prefix('workshop')->group(function () {
        Route::get('/', [WorkshopController::class, 'index']);
        Route::post('', [WorkshopController::class, 'store']);
        Route::put('/{id}', [WorkshopController::class, 'update'])->where('id', '[0-9]+');
        Route::get('/{id}', [WorkshopController::class, 'show'])->where('id', '[0-9]+');
        Route::delete('/{id}', [WorkshopController::class, 'destroy'])->where('id', '[0-9]+');
    });

    Route::prefix('addressee')->group(function () {
        Route::get('/', [AddresseeController::class, 'index']);
        Route::post('', [AddresseeController::class, 'store']);
        Route::put('/{id}', [AddresseeController::class, 'update'])->where('id', '[0-9]+');
        Route::get('/{id}', [AddresseeController::class, 'show'])->where('id', '[0-9]+');
        Route::delete('/{id}', [AddresseeController::class, 'destroy'])->where('id', '[0-9]+');
    });

    Route::prefix('product')->group(function () {
        Route::get('/', [ProductController::class, 'index']);
        Route::post('', [ProductController::class, 'store']);
        Route::put('/{id}', [ProductController::class, 'update'])->where('id', '[0-9]+');
        Route::get('/{id}', [ProductController::class, 'show'])->where('id', '[0-9]+');
        Route::delete('/{id}', [ProductController::class, 'destroy'])->where('id', '[0-9]+');
    });

    Route::prefix('order_status')->group(function () {
        Route::get('/', [OrderStatusController::class, 'index']);
    });

    Route::prefix('service')->group(function () {
        Route::get('/', [ServiceController::class, 'index']);
    });

    Route::prefix('activity')->group(function () {
        Route::get('/', [ActivityController::class, 'index']);
    });

    Route::prefix('price')->group(function () {
        Route::get('/', [PriceController::class, 'index']);
        Route::get('/{id}', [PriceController::class, 'show'])->where('id', '[0-9]+');
        Route::post('', [PriceController::class, 'store']);
        Route::put('/{id}', [PriceController::class, 'update'])->where('id', '[0-9]+');
    });

    Route::post('/logout', [AuthController::class, 'logout']);
});

Route::group(['middleware' => ['auth:parthners']], function () {
    Route::prefix('outer-api')->group(function () {
//        Route::get('/getServiceData', [OuterApiController::class, 'getServiceData']);
        Route::post('/order/createOrder', [OuterApiController::class, 'createOrder']);
        Route::patch('/updateOrder', [OuterApiController::class, 'updateOrder']);
        Route::patch('/setStatus', [OuterApiController::class, 'setStatus']);
        Route::post('/order/setStatus', [OuterApiController::class, 'setStatus']);
        Route::post('/order/cancelOrder', [OuterApiController::class, 'cancelOrder']);
        Route::patch('/cancelOrder', [OuterApiController::class, 'cancelOrder']);
        Route::get('/workshops', [OuterApiController::class, 'getWorkshops']);
        //get order by id
        //get addressees
        //get services
//        Route::get('/sources', [OuterApiController::class, 'getWorkshops']);
    });
});

Route::fallback(function () {
    return response()->json([
        'code' => 404,
        'message' => 'Page Not Found.',
    ], 404);
});
