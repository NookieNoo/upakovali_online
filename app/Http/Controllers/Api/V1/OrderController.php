<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Order\OrderGetRequest;
use App\Http\Requests\Order\OrderStoreRequest;
use App\Http\Requests\Order\OrderUpdateRequest;
use App\Models\Order;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return Builder[]|Collection
     */
    public function index(OrderGetRequest $request)
    {
//        return Order::with('source', 'parthner', 'client', 'workshop', 'addressee', 'pickUpPoint',
//            'deliveryPoint', 'courierReceiver', 'courierIssuer', 'master')->paginate();
        return Order::withFilters($request)->with('source', 'parthner', 'client', 'workshop', 'addressee', 'pickUpPoint',
            'deliveryPoint', 'courierReceiver', 'courierIssuer', 'master')->paginate();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  OrderStoreRequest  $request
     * @return JsonResponse
     */
    public function store(OrderStoreRequest $request)
    {
        try {
            $order = Order::create($request->validated());
        } catch (\Exception $e) {
            return response()->json([
                'code' => Response::HTTP_INTERNAL_SERVER_ERROR,
                'message' => 'Не удалось создать заказ',
                'errorMessage' => $e->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return response()->json([
            'code' => Response::HTTP_CREATED,
            'message' => Response::$statusTexts[Response::HTTP_CREATED],
            'data' => $order->load(Order::$supportedRelations)
        ], Response::HTTP_CREATED);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return JsonResponse
     */
    public function show($id)
    {
        try {
            $order = Order::withAllRelations()->findOrFail($id);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'code' => 404,
                'message' => 'Order Not Found.',
            ], 404);
        }

        return response()->json([
            'code' => Response::HTTP_OK,
            'data' => $order,
        ], Response::HTTP_OK);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return JsonResponse
     */
    public function update(OrderUpdateRequest $request, $id)
    {
        try {
            $order = Order::findOrFail($id);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'code' => Response::HTTP_NOT_FOUND,
                'message' => 'Заказ не найден.',
            ], Response::HTTP_NOT_FOUND);
        }

        $validatedData = $request->validated();

        $order->update($validatedData);

        return response()->json([
            'code' => Response::HTTP_OK,
            'message' => 'Данные сохранены.',
            'data' => $order->load(Order::$supportedRelations),
        ], Response::HTTP_OK);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return JsonResponse
     */
    public function destroy($id)
    {
        try {
            $order = Order::findOrFail($id);
            $order->delete();
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'code' => Response::HTTP_NOT_FOUND,
                'message' => 'Заказ не найден.',
            ], Response::HTTP_NOT_FOUND);
        }
        return response()->json([
            'code' => Response::HTTP_OK,
            'message' => 'Заказ успешно удален',
        ], Response::HTTP_OK);
    }
}
