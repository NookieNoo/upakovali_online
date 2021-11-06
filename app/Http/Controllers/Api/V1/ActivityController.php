<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Activity\ActivityGetRequest;
use Illuminate\Http\Response;
use App\Models\Activity;

class ActivityController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(ActivityGetRequest $request)
    {
        if ($request->user()->cannot('viewAny', Activity::class)) {
            return $this->sendError('Доступ закрыт', Response::HTTP_FORBIDDEN);
        }

        return Activity::withFilters($request)->withOrder($request)->withPaginate($request);
    }
}
