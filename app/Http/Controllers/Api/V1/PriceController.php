<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Price\PriceGetRequest;
use App\Http\Requests\Price\PriceStoreRequest;
use App\Http\Requests\Price\PriceUpdateRequest;
use App\Models\Price;
use App\Models\Service;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Arr;

class PriceController extends Controller
{
    public function index(PriceGetRequest $request)
    {
        return Price::with('parthner')->withFilters($request)->withOrder($request)->paginate();
    }

    public function show(Request $request, $id)
    {
        try {
            $price = Price::with('parthner', 'services', 'services.product')->findOrFail($id);
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
            $price = DB::transaction(function () use ($request) {
                $validated = $request->validated();
                $price = Price::create($validated);

                foreach($validated['services'] as $serviceData) {
                    $service = Service::create(array_merge($serviceData, ['price_id' => $price->id]));
                }

                return $price;
            });
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

        try {
            $price = DB::transaction(function () use ($request, $price) {
                $validatedData = $request->validated();
                $price->update($validatedData);


                //@FIXME Запретить изменение services, если на них уже есть ссылка
                //        if ($validatedData['manager_id'] !== $parthner->manager_id) {
//            if ($parthner->orders()->exists()) {
//                return $this->sendError('Нельзя изменить менеджера этого партнера, т.к. у него есть заказы', Response::HTTP_BAD_REQUEST);
//            }
//        }


                $price->load('services');
                $addServicesIds = Arr::whereNotNull(Arr::pluck($validatedData['services'] ?? [], 'id'));
                $oldServicesIds = $price->services->pluck('id')->toArray();
                $idsServicesToDelete = array_diff($oldServicesIds, $addServicesIds);

                foreach ($price->services as $service) {
                    if (in_array($service->id, $idsServicesToDelete)) {
                        if ($service->gifts()->exists()) {
                            //TODO Вынести в правило
                            throw new \RuntimeException('Невозможно удалить сервис, т.к. есть подарок, использующий его');
                        }
                    }
                }

                Service::destroy($idsServicesToDelete);
                if (!empty($validatedData['services'])) {
                    foreach ($validatedData['services'] as $serviceData) {
                        if (isset($serviceData['id'])) {
                            $price->services->find($serviceData['id'])->fill($serviceData)->save();
                        } else {
                            $price->services()->create($serviceData);
                        }
                    }
                }

                return $price;
            });
        } catch (\RuntimeException $e) {
            return $this->sendError($e->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR, $e->getMessage());
        } catch (\Exception $e) {
            return $this->sendError('Не удалось обновить прайс', Response::HTTP_INTERNAL_SERVER_ERROR, $e->getMessage());
        }

        return $this->send(Response::HTTP_OK, 'Данные сохранены.', $price);
    }
}
