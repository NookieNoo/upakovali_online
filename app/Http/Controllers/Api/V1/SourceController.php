<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Source\SourceCreateRequest;
use App\Http\Requests\Source\SourceEditRequest;
use App\Http\Requests\Workshop\WorkshopStoreRequest;
use App\Http\Requests\Workshop\WorkshopUpdateRequest;
use App\Models\Source;
use App\Models\Workshop;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class SourceController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return Builder[]|Collection
     */
    public function index(Request $request)
    {
        return Source::withFilters($request)->withOrder($request)->paginate();
    }

    public function show(Request $request, $id)
    {
        try {
            $source = Source::findOrFail($id);
//            if ($request->user()->cannot('view', $price, Price::class)) {
//                return $this->sendError('Доступ закрыт', Response::HTTP_FORBIDDEN);
//            }
        } catch (ModelNotFoundException $e) {
            return $this->sendError('Источник не найден', Response::HTTP_NOT_FOUND);
        }

        return $this->send(Response::HTTP_OK, null, $source);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  SourceCreateRequest  $request
     * @return JsonResponse
     */
    public function store(SourceCreateRequest $request)
    {
//        if ($request->user()->cannot('create', Price::class)) {
//            return $this->sendError('Доступ закрыт', Response::HTTP_FORBIDDEN);
//        }
        try {
            $validated = $request->validated();
            $source = Source::create($validated);
        } catch (\Exception $e) {
            return $this->sendError('Не удалось создать источник', Response::HTTP_INTERNAL_SERVER_ERROR, $e->getMessage());
        }

        return $this->send(
            Response::HTTP_CREATED,
            Response::$statusTexts[Response::HTTP_CREATED],
            $source
        );
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  SourceEditRequest  $request
     * @param int $id
     * @return JsonResponse
     */
    public function update(SourceEditRequest $request, int $id)
    {
        try {
            $source = Source::findOrFail($id);
//            if ($request->user()->cannot('update', $price, Price::class)) {
//                return $this->sendError('Доступ закрыт', Response::HTTP_FORBIDDEN);
//            }
        } catch (ModelNotFoundException $e) {
            return $this->sendError('Источник не найден.', Response::HTTP_NOT_FOUND);
        }

        try {
            $validatedData = $request->validated();
            $source->update($validatedData);
        } catch (\Exception $e) {
            return $this->sendError('Не удалось обновить источник', Response::HTTP_INTERNAL_SERVER_ERROR, $e->getMessage());
        }

        return $this->send(Response::HTTP_OK, 'Данные сохранены.', $source);
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
            $source = Source::findOrFail($id);
//            if ($request->user()->cannot('delete', $order, Order::class)) {
//                return $this->sendError('Доступ закрыт', Response::HTTP_FORBIDDEN);
//            }

            if ($source->orders()->exists()) {
                return $this->sendError('Нельзя удалить этот источник, т.к. у него есть заказы', Response::HTTP_BAD_REQUEST);
            }

            $source->delete();
        } catch (ModelNotFoundException $e) {
            return $this->sendError('Источник не найден.', Response::HTTP_NOT_FOUND);
        }
        return $this->send(Response::HTTP_OK, 'Источник успешно удален');
    }
}
