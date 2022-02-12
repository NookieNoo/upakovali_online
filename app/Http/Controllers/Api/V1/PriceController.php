<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Price\PriceGetRequest;
use App\Http\Requests\Price\PriceStoreRequest;
use App\Http\Requests\Price\PriceUpdateRequest;
use App\Models\Price;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class PriceController extends Controller
{
    public function index(PriceGetRequest $request)
    {
        return Price::with('parthner')->withFilters($request)->withOrder($request)->paginate();
    }

    public function show(Request $request, $id)
    {
        try {
            $price = Price::with('parthner', 'services')->findOrFail($id);
            if ($request->user()->cannot('view', $price, Price::class)) {
                return $this->sendError('Доступ закрыт', Response::HTTP_FORBIDDEN);
            }
        } catch (ModelNotFoundException $e) {
            return $this->sendError('Прайс не найден', Response::HTTP_NOT_FOUND);
        }

        return $this->send(Response::HTTP_OK, null, $price);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  PriceStoreRequest  $request
     * @return JsonResponse
     */
    public function store(PriceStoreRequest $request)
    {
        if ($request->user()->cannot('create', Price::class)) {
            return $this->sendError('Доступ закрыт', Response::HTTP_FORBIDDEN);
        }
        try {
            $validated = $request->validated();
            $price = Price::create($validated);
        } catch (\Exception $e) {
            return $this->sendError('Не удалось создать прайс', Response::HTTP_INTERNAL_SERVER_ERROR, $e->getMessage());
        }

        return $this->send(
            Response::HTTP_CREATED,
            Response::$statusTexts[Response::HTTP_CREATED],
            $price
        );
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  PriceUpdateRequest  $request
     * @param int $id
     * @return JsonResponse
     */
    public function update(PriceUpdateRequest $request, int $id)
    {
        try {
            $price = Price::findOrFail($id);
            if ($request->user()->cannot('update', $price, Price::class)) {
                return $this->sendError('Доступ закрыт', Response::HTTP_FORBIDDEN);
            }
        } catch (ModelNotFoundException $e) {
            return $this->sendError('Прайс не найден.', Response::HTTP_NOT_FOUND);
        }

        $validatedData = $request->validated();

//        if ($validatedData['manager_id'] !== $parthner->manager_id) {
//            if ($parthner->orders()->exists()) {
//                return $this->sendError('Нельзя изменить менеджера этого партнера, т.к. у него есть заказы', Response::HTTP_BAD_REQUEST);
//            }
//        }

        $price->update($validatedData);

        return $this->send(Response::HTTP_OK, 'Данные сохранены.', $price);
    }
}
