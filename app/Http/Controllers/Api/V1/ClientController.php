<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Client\ClientGetRequest;
use App\Http\Requests\Client\ClientStoreRequest;
use App\Http\Requests\Client\ClientUpdateRequest;
use App\Models\Client;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class ClientController extends Controller
{
    /**
     * Получить список клиентов
     *
     * @return JsonResponse
     */
    public function index(ClientGetRequest $request)
    {
        if ($request->user()->cannot('viewAny', Client::class)) {
            return $this->sendError('Доступ закрыт', Response::HTTP_FORBIDDEN);
        }
        return Client::withFilters($request)->withOrder($request)->withPaginate($request);
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  ClientStoreRequest  $request
     * @return JsonResponse
     */
    public function store(ClientStoreRequest $request)
    {
        if ($request->user()->cannot('create', Client::class)) {
            return $this->sendError('Доступ закрыт', Response::HTTP_FORBIDDEN);
        }
        try {
            $client = Client::create($request->validated());
        } catch (\Exception $e) {
            return $this->sendError('Не удалось создать клиента', Response::HTTP_INTERNAL_SERVER_ERROR, $e->getMessage());
        }

        return $this->send(
            Response::HTTP_CREATED,
            Response::$statusTexts[Response::HTTP_CREATED],
            $client
        );
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return JsonResponse
     */
    public function show(Request $request, $id)
    {
        try {
            $client = Client::findOrFail($id);
            if ($request->user()->cannot('view', $client, Client::class)) {
                return $this->sendError('Доступ закрыт', Response::HTTP_FORBIDDEN);
            }
        } catch (ModelNotFoundException $e) {
            return $this->sendError('Клиент не найден', Response::HTTP_NOT_FOUND);
        }

        return $this->send(Response::HTTP_OK, null, $client);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  ClientUpdateRequest  $request
     * @param  int  $id
     * @return JsonResponse
     */
    public function update(ClientUpdateRequest $request, $id)
    {
        try {
            $client = Client::findOrFail($id);
            if ($request->user()->cannot('update', $client, Client::class)) {
                return $this->sendError('Доступ закрыт', Response::HTTP_FORBIDDEN);
            }
        } catch (ModelNotFoundException $e) {
            return $this->sendError('Клиент не найден.', Response::HTTP_NOT_FOUND);
        }

        $client->update($request->validated());

        return $this->send(Response::HTTP_OK, 'Данные сохранены.', $client);
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
            $client = Client::findOrFail($id);
            if ($request->user()->cannot('delete', $client, Client::class)) {
                return $this->sendError('Доступ закрыт', Response::HTTP_FORBIDDEN);
            }

            if ($client->orders()->exists()) {
                return $this->sendError('Нельзя удалить этого клиента, т.к. у него есть заказы', Response::HTTP_BAD_REQUEST);
            }

            if ($client->ordersLikeReceiver()->exists()) {
                return $this->sendError('Нельзя удалить этого клиента, т.к. он является получателем', Response::HTTP_BAD_REQUEST);
            }

            $client->delete();
        } catch (ModelNotFoundException $e) {
            return $this->sendError('Клиент не найден.', Response::HTTP_NOT_FOUND);
        }
        return $this->send(Response::HTTP_OK, 'Клиент успешно удален');
    }
}
