<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Product\ProductCreateRequest;
use App\Http\Requests\Product\ProductUpdateRequest;
use App\Http\Requests\Workshop\WorkshopStoreRequest;
use App\Http\Requests\Workshop\WorkshopUpdateRequest;
use App\Models\Product;
use App\Models\Workshop;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        return Product::withFilters($request)->withOrder($request)->paginate();
    }

    public function show(Request $request, $id)
    {
        try {
            $product = Product::findOrFail($id);
//            if ($request->user()->cannot('view', $price, Price::class)) {
//                return $this->sendError('Доступ закрыт', Response::HTTP_FORBIDDEN);
//            }
        } catch (ModelNotFoundException $e) {
            return $this->sendError('ServiceType не найден', Response::HTTP_NOT_FOUND);
        }

        return $this->send(Response::HTTP_OK, null, $product);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  ProductCreateRequest  $request
     * @return JsonResponse
     */
    public function store(ProductCreateRequest $request)
    {
        //        if ($request->user()->cannot('create', Price::class)) {
//            return $this->sendError('Доступ закрыт', Response::HTTP_FORBIDDEN);
//        }
        try {
            $validated = $request->validated();
            $product = Product::create($validated);
        } catch (\Exception $e) {
            return $this->sendError('Не удалось создать ServiceType', Response::HTTP_INTERNAL_SERVER_ERROR, $e->getMessage());
        }

        return $this->send(
            Response::HTTP_CREATED,
            Response::$statusTexts[Response::HTTP_CREATED],
            $product
        );
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  WorkshopUpdateRequest  $request
     * @param int $id
     * @return JsonResponse
     */
    public function update(ProductUpdateRequest $request, $id)
    {
        try {
            $product = Product::findOrFail($id);
//            if ($request->user()->cannot('update', $price, Price::class)) {
//                return $this->sendError('Доступ закрыт', Response::HTTP_FORBIDDEN);
//            }
        } catch (ModelNotFoundException $e) {
            return $this->sendError('ServiceType не найден.', Response::HTTP_NOT_FOUND);
        }

        try {
            $validatedData = $request->validated();
            $product->update($validatedData);
        } catch (\Exception $e) {
            return $this->sendError('Не удалось обновить ServiceType', Response::HTTP_INTERNAL_SERVER_ERROR, $e->getMessage());
        }

        return $this->send(Response::HTTP_OK, 'Данные сохранены.', $product);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return JsonResponse
     */
    public function destroy(Request $request, $id)
    {
        try {
            $product = Product::findOrFail($id);
//            if ($request->user()->cannot('delete', $order, Order::class)) {
//                return $this->sendError('Доступ закрыт', Response::HTTP_FORBIDDEN);
//            }

            if ($product->services()->exists()) {
                return $this->sendError('Нельзя удалить ServiceType, т.к. у есть заказы', Response::HTTP_BAD_REQUEST);
            }

            $product->delete();
        } catch (ModelNotFoundException $e) {
            return $this->sendError('ServiceType не найден.', Response::HTTP_NOT_FOUND);
        }
        return $this->send(Response::HTTP_OK, 'ServiceType успешно удалена');
    }
}
