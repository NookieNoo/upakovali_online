<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Price\PriceStoreRequest;
use App\Http\Requests\Price\PriceUpdateRequest;
use App\Http\Requests\Workshop\WorkshopStoreRequest;
use App\Http\Requests\Workshop\WorkshopUpdateRequest;
use App\Models\Price;
use App\Models\Service;
use App\Models\Workshop;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;

class WorkshopController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return Builder[]|Collection
     */
    public function index(Request $request)
    {
        return Workshop::withFilters($request)->withOrder($request)->paginate();
    }

    public function show(Request $request, $id)
    {
        try {
            $price = Workshop::findOrFail($id);
//            if ($request->user()->cannot('view', $price, Price::class)) {
//                return $this->sendError('Доступ закрыт', Response::HTTP_FORBIDDEN);
//            }
        } catch (ModelNotFoundException $e) {
            return $this->sendError('Мастерская не найдена', Response::HTTP_NOT_FOUND);
        }

        return $this->send(Response::HTTP_OK, null, $price);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  WorkshopStoreRequest  $request
     * @return JsonResponse
     */
    public function store(WorkshopStoreRequest $request)
    {
//        if ($request->user()->cannot('create', Price::class)) {
//            return $this->sendError('Доступ закрыт', Response::HTTP_FORBIDDEN);
//        }
        try {
            $validated = $request->validated();
            $workshop = Workshop::create($validated);
        } catch (\Exception $e) {
            return $this->sendError('Не удалось создать мастерскую', Response::HTTP_INTERNAL_SERVER_ERROR, $e->getMessage());
        }

        return $this->send(
            Response::HTTP_CREATED,
            Response::$statusTexts[Response::HTTP_CREATED],
            $workshop
        );
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  WorkshopUpdateRequest  $request
     * @param int $id
     * @return JsonResponse
     */
    public function update(WorkshopUpdateRequest $request, int $id)
    {
        try {
            $workshop = Workshop::findOrFail($id);
//            if ($request->user()->cannot('update', $price, Price::class)) {
//                return $this->sendError('Доступ закрыт', Response::HTTP_FORBIDDEN);
//            }
        } catch (ModelNotFoundException $e) {
            return $this->sendError('Мастерская не найдена.', Response::HTTP_NOT_FOUND);
        }

        try {
            $validatedData = $request->validated();
            $workshop->update($validatedData);
        } catch (\Exception $e) {
            return $this->sendError('Не удалось обновить мастерскую', Response::HTTP_INTERNAL_SERVER_ERROR, $e->getMessage());
        }

        return $this->send(Response::HTTP_OK, 'Данные сохранены.', $workshop);
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
            $workshop = Workshop::findOrFail($id);
//            if ($request->user()->cannot('delete', $order, Order::class)) {
//                return $this->sendError('Доступ закрыт', Response::HTTP_FORBIDDEN);
//            }

            if ($workshop->orders()->exists()) {
                return $this->sendError('Нельзя удалить эту мастерскую, т.к. у неё есть заказы', Response::HTTP_BAD_REQUEST);
            }

            $workshop->delete();
        } catch (ModelNotFoundException $e) {
            return $this->sendError('Мастерская не найдена.', Response::HTTP_NOT_FOUND);
        }
        return $this->send(Response::HTTP_OK, 'Мастерская успешно удалена');
    }
}
