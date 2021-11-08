<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Activity\ActivityGetRequest;
use App\Http\Requests\OuterApi\GetServiceDataRequest;
use App\Models\Activity;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class OuterApiController extends Controller
{
    public function getServiceData(GetServiceDataRequest $request)
    {

        return ['success' => true];
    }

    public function createOrder(Request $request)
    {

        return ['success' => true];
    }

    public function setStatus(Request $request)
    {

        return ['success' => true];
    }

    public function cancelOrder(Request $request)
    {

        return ['success' => true];
    }
}
