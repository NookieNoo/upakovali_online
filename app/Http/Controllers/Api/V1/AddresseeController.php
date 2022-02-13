<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Addressee\AddresseeStoreRequest;
use App\Http\Requests\Addressee\AddresseeUpdateRequest;
use App\Http\Requests\Workshop\WorkshopStoreRequest;
use App\Http\Requests\Workshop\WorkshopUpdateRequest;
use App\Models\Addressee;
use App\Models\Workshop;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class AddresseeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return Builder[]|Collection
     */
    public function index(Request $request)
    {
        return Addressee::withFilters($request)->withOrder($request)->paginate();
    }

    public function show(Request $request, $id)
    {
        try {
            $addressee = Addressee::findOrFail($id);
//            if ($request->user()->cannot('view', $price, Price::class)) {
//                return $this->sendError('Доступ закрыт', Response::HTTP_FORBIDDEN);
//            }
        } catch (ModelNotFoundException $e) {
            return $this->sendError('Адресат не найден', Response::HTTP_NOT_FOUND);
        }

        return $this->send(Response::HTTP_OK, null, $addressee);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  AddresseeStoreRequest  $request
     * @return JsonResponse
     */
    public function store(AddresseeStoreRequest $request)
    {
//        if ($request->user()->cannot('create', Price::class)) {
//            return $this->sendError('Доступ закрыт', Response::HTTP_FORBIDDEN);
//        }
        try {
            $validated = $request->validated();
            $addressee = Addressee::create($validated);
        } catch (\Exception $e) {
            return $this->sendError('Не удалось создать адресата', Response::HTTP_INTERNAL_SERVER_ERROR, $e->getMessage());
        }

        return $this->send(
            Response::HTTP_CREATED,
            Response::$statusTexts[Response::HTTP_CREATED],
            $addressee
        );
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  AddresseeUpdateRequest  $request
     * @param int $id
     * @return JsonResponse
     */
    public function update(AddresseeUpdateRequest $request, int $id)
    {
        try {
            $addressee = Addressee::findOrFail($id);
//            if ($request->user()->cannot('update', $price, Price::class)) {
//                return $this->sendError('Доступ закрыт', Response::HTTP_FORBIDDEN);
//            }
        } catch (ModelNotFoundException $e) {
            return $this->sendError('Адресат не найдена.', Response::HTTP_NOT_FOUND);
        }

        try {
            $validatedData = $request->validated();
            $addressee->update($validatedData);
        } catch (\Exception $e) {
            return $this->sendError('Не удалось обновить адресата', Response::HTTP_INTERNAL_SERVER_ERROR, $e->getMessage());
        }

        return $this->send(Response::HTTP_OK, 'Данные сохранены.', $addressee);
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
            $addressee = Addressee::findOrFail($id);
//            if ($request->user()->cannot('delete', $order, Order::class)) {
//                return $this->sendError('Доступ закрыт', Response::HTTP_FORBIDDEN);
//            }

            if ($addressee->gifts()->exists()) {
                return $this->sendError('Нельзя удалить адресата, т.к. у него есть заказы', Response::HTTP_BAD_REQUEST);
            }

            $addressee->delete();
        } catch (ModelNotFoundException $e) {
            return $this->sendError('Адресат не найден.', Response::HTTP_NOT_FOUND);
        }
        return $this->send(Response::HTTP_OK, 'Адресат успешно удален');
    }
}
