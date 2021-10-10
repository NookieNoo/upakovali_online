<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Parthner\ParthnerGetRequest;
use App\Http\Requests\Parthner\ParthnerStoreRequest;
use App\Http\Requests\Parthner\ParthnerUpdateRequest;
use App\Models\Order;
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
     * @return Builder[]|Collection
     */
    public function index(ParthnerGetRequest $request)
    {
        return Parthner::with('manager', 'manager.role')->withFilters($request)->paginate();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  ParthnerStoreRequest  $request
     * @return JsonResponse
     */
    public function store(ParthnerStoreRequest $request)
    {
        try {
            $parthner = Parthner::create($request->validated());
        } catch (\Exception $e) {
            return response()->json([
                'code' => Response::HTTP_INTERNAL_SERVER_ERROR,
                'message' => 'Не удалось создать партнера',
                'errorMessage' => $e->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return response()->json([
            'code' => Response::HTTP_CREATED,
            'message' => Response::$statusTexts[Response::HTTP_CREATED],
            'data' => $parthner
        ], Response::HTTP_CREATED);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return Builder|Builder[]|Collection|Model|JsonResponse
     */
    public function show($id)
    {
        try {
            $parthner = Parthner::with('manager', 'manager.role')->findOrFail($id);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'code' => Response::HTTP_NOT_FOUND,
                'message' => 'Parthner Not Found.',
            ], Response::HTTP_NOT_FOUND);
        }

        return response()->json([
            'code' => Response::HTTP_OK,
            'data' => $parthner,
        ], Response::HTTP_OK);
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
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'code' => Response::HTTP_NOT_FOUND,
                'message' => 'Партнер не найден.',
            ], Response::HTTP_NOT_FOUND);
        }

        $validatedData = $request->validated();

        if ($validatedData['manager_id'] !== $parthner->manager_id) {
            if ($parthner->orders()->exists()) {
                return response()->json([
                    'code' => Response::HTTP_BAD_REQUEST,
                    'message' => 'Нельзя изменить менеджера этого партнера, т.к. у него есть заказы',
                ], Response::HTTP_BAD_REQUEST);
            }
        }

        $parthner->update($validatedData);

        return response()->json([
            'code' => Response::HTTP_OK,
            'message' => 'Данные сохранены.',
            'data' => $parthner->load('manager'),
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
            $parthner = Parthner::findOrFail($id);

            if ($parthner->orders()->exists()) {
                return response()->json([
                    'code' => Response::HTTP_BAD_REQUEST,
                    'message' => 'Нельзя удалить этого партнера, т.к. у него есть заказы',
                ], Response::HTTP_BAD_REQUEST);
            }

            $parthner->delete();
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'code' => Response::HTTP_NOT_FOUND,
                'message' => 'Parthner Not Found.',
            ], Response::HTTP_NOT_FOUND);
        }
        return response()->json([
            'code' => Response::HTTP_OK,
            'message' => 'Партнер успешно удален',
        ], Response::HTTP_OK);
    }
}
