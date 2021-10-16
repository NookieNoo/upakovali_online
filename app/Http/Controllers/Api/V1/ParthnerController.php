<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Parthner\ParthnerGetRequest;
use App\Http\Requests\Parthner\ParthnerStoreRequest;
use App\Http\Requests\Parthner\ParthnerUpdateRequest;
use App\Models\Parthner;
use http\Exception\RuntimeException;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class ParthnerController extends Controller
{
    /**
     * @OA\Get(
     *     path="/parthner",
     *     operationId="parthnersAll",
     *     tags={"Parthner"},
     *     summary="Получить список партнеров",
     *     security={
     *       {"api_key": {}},
     *     },
     *     @OA\Parameter(
     *         name="page",
     *         in="query",
     *         description="The page number",
     *         required=false,
     *         @OA\Schema(
     *             type="integer",
     *         )
     *     ),
     *     @OA\Response(
     *         response="200",
     *         description="Everything is fine",
     *     ),
     * )
     *
     * Получить список партнеров
     *
     * @return JsonResponse
     */
    public function index(ParthnerGetRequest $request)
    {
        if ($request->user()->cannot('viewAny', Parthner::class)) {
            return $this->sendError('Доступ закрыт', Response::HTTP_FORBIDDEN);
        }
        return Parthner::with('manager', 'manager.role')->withFilters($request)->withOrder($request)->withPaginate($request);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  ParthnerStoreRequest  $request
     * @return JsonResponse
     */
    public function store(ParthnerStoreRequest $request)
    {
        if ($request->user()->cannot('create', Parthner::class)) {
            return $this->sendError('Доступ закрыт', Response::HTTP_FORBIDDEN);
        }
        try {
            $parthner = Parthner::create($request->validated());
        } catch (\Exception $e) {
            return $this->sendError('Не удалось создать партнера', Response::HTTP_INTERNAL_SERVER_ERROR, $e->getMessage());
        }

        return $this->send(
            Response::HTTP_CREATED,
            Response::$statusTexts[Response::HTTP_CREATED],
            $parthner
        );
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return Builder|Builder[]|Collection|Model|JsonResponse
     */
    public function show(Request $request, $id)
    {
        try {
            $parthner = Parthner::with('manager', 'manager.role')->findOrFail($id);
            if ($request->user()->cannot('view', $parthner, Parthner::class)) {
                return $this->sendError('Доступ закрыт', Response::HTTP_FORBIDDEN);
            }
        } catch (ModelNotFoundException $e) {
            return $this->sendError('Партнер не найден', Response::HTTP_NOT_FOUND);
        }

        return $this->send(Response::HTTP_OK, null, $parthner);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  ParthnerUpdateRequest  $request
     * @param  int  $id
     * @return JsonResponse
     */
    public function update(ParthnerUpdateRequest $request, $id)
    {
        try {
            $parthner = Parthner::findOrFail($id);
            if ($request->user()->cannot('update', $parthner, Parthner::class)) {
                return $this->sendError('Доступ закрыт', Response::HTTP_FORBIDDEN);
            }
        } catch (ModelNotFoundException $e) {
            return $this->sendError('Партнер не найден.', Response::HTTP_NOT_FOUND);
        }

        $validatedData = $request->validated();

        if ($validatedData['manager_id'] !== $parthner->manager_id) {
            if ($parthner->orders()->exists()) {
                return $this->sendError('Нельзя изменить менеджера этого партнера, т.к. у него есть заказы', Response::HTTP_BAD_REQUEST);
            }
        }

        $parthner->update($validatedData);

        return $this->send(Response::HTTP_OK, 'Данные сохранены.', $parthner->load('manager'));
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
            $parthner = Parthner::findOrFail($id);
            if ($request->user()->cannot('delete', $parthner, Parthner::class)) {
                return $this->sendError('Доступ закрыт', Response::HTTP_FORBIDDEN);
            }

            if ($parthner->orders()->exists()) {
                return $this->sendError('Нельзя удалить этого партнера, т.к. у него есть заказы', Response::HTTP_BAD_REQUEST);
            }

            $parthner->delete();
        } catch (ModelNotFoundException $e) {
            return $this->sendError('Партнер не найден.', Response::HTTP_NOT_FOUND);
        }
        return $this->send(Response::HTTP_OK, 'Партнер успешно удален');
    }
}
