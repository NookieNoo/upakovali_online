<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Client\ClientStoreRequest;
use App\Http\Requests\User\UserGetRequest;
use App\Models\Client;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class ClientController extends Controller
{
    /**
     * @OA\Get(
     *     path="/client",
     *     operationId="clientsAll",
     *     tags={"Client"},
     *     summary="Получить список клиентов",
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
     * Получить список клиентов
     *
     * @return Response
     */
    public function index(UserGetRequest $request)
    {
        return Client::withFilters($request)->get();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  ClientStoreRequest  $request
     * @return JsonResponse
     */
    public function store(ClientStoreRequest $request)
    {
        try {
            $client = Client::create($request->validated());
        } catch (\Exception $e) {
            return response()->json([
                'code' => Response::HTTP_INTERNAL_SERVER_ERROR,
                'message' => 'Не удалось создать клиента',
                'errorMessage' => $e->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return response()->json([
            'code' => Response::HTTP_CREATED,
            'message' => Response::$statusTexts[Response::HTTP_CREATED],
            'client' => $client
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
            $client = Client::findOrFail($id);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'code' => Response::HTTP_NOT_FOUND,
                'message' => 'Client Not Found.',
            ], Response::HTTP_NOT_FOUND);
        }

        return $client;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return Response
     */
    public function update(Request $request, $id)
    {
        //
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
            $client = Client::findOrFail($id);

            if ($client->orders()->exists()) {
                return response()->json([
                    'code' => Response::HTTP_BAD_REQUEST,
                    'message' => 'Нельзя удалить этого клиента, т.к. у него есть заказы',
                ], Response::HTTP_BAD_REQUEST);
            }

            if ($client->ordersLikeReceiver()->exists()) {
                return response()->json([
                    'code' => Response::HTTP_BAD_REQUEST,
                    'message' => 'Нельзя удалить этого клиента, т.к. он является получателем',
                ], Response::HTTP_BAD_REQUEST);
            }

            $client->delete();
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'code' => Response::HTTP_NOT_FOUND,
                'message' => 'Client Not Found.',
            ], Response::HTTP_NOT_FOUND);
        }
        return response()->json([
            'code' => Response::HTTP_OK,
            'message' => 'Клиент успешно удален',
        ], Response::HTTP_OK);
    }
}
