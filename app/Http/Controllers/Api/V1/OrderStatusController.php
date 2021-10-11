<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\OrderStatus;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;

class OrderStatusController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return Builder[]|Collection
     */
    public function index(Request $request)
    {
        return OrderStatus::paginate();
    }
}
