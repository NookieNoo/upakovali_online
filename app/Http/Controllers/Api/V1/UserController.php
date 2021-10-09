<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\User\UserGetRequest;
use App\Http\Requests\User\UserStoreRequest;
use App\Http\Requests\User\UserUpdateRequest;
use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return Builder[]|Collection
     */
    public function index(UserGetRequest $request)
    {
        return User::with('role')->withFilters($request)->paginate();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param UserStoreRequest $request
     * @return JsonResponse
     */
    public function store(UserStoreRequest $request)
    {
        try {
            $validatedData = $request->validated();
            $validatedData['remember_token'] = Str::random(10);
            $validatedData['password'] = Hash::make($validatedData['password']);
            $user = User::create($validatedData);
        } catch (\Exception $e) {
            return response()->json([
                'code' => Response::HTTP_INTERNAL_SERVER_ERROR,
                'message' => 'Не удалось создать пользователя',
                'errorMessage' => $e->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return response()->json([
            'code' => Response::HTTP_CREATED,
            'message' => Response::$statusTexts[Response::HTTP_CREATED],
            'user' => $user->load('role'),
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
            $user = User::with('role')->findOrFail($id);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'code' => Response::HTTP_NOT_FOUND,
                'message' => 'User Not Found.',
            ], Response::HTTP_NOT_FOUND);
        }

        return $user;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param  int  $id
     * @return JsonResponse
     */
    public function update(UserUpdateRequest $request, $id)
    {
        try {
            $user = User::findOrFail($id);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'code' => Response::HTTP_NOT_FOUND,
                'message' => 'Пользователь не найден.',
            ], Response::HTTP_NOT_FOUND);
        }

        $validatedData = $request->validated();
        if ($validatedData['role_id'] !== $user->role_id) {
            if ($user->parthners()->exists()) {
                return response()->json([
                    'code' => Response::HTTP_BAD_REQUEST,
                    'message' => 'Нельзя изменить роль этого пользователя, т.к. это менеджер, и у него есть партнер',
                ], Response::HTTP_BAD_REQUEST);
            }

            if ($user->ordersLikeMaster()->exists()) {
                return response()->json([
                    'code' => Response::HTTP_BAD_REQUEST,
                    'message' => 'Нельзя изменить роль этого пользователя, т.к. это мастер, и у него есть заказы',
                ], Response::HTTP_BAD_REQUEST);
            }

            if ($user->ordersLikeCourierReceiver()->exists() || $user->ordersLikeCourierIssuer()->exists()) {
                return response()->json([
                    'code' => Response::HTTP_BAD_REQUEST,
                    'message' => 'Нельзя изменить роль этого пользователя, т.к. это курьер, и у него есть заказы',
                ], Response::HTTP_BAD_REQUEST);
            }
        }

        $user->update($validatedData);

        return response()->json([
            'code' => Response::HTTP_OK,
            'message' => 'Данные сохранены.',
            'data' => $user->load('role'),
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
            $user = User::findOrFail($id);

            if ($user->parthners()->exists()) {
                return response()->json([
                    'code' => Response::HTTP_BAD_REQUEST,
                    'message' => 'Нельзя удалить этого пользователя, т.к. это менеджер, и у него есть партнер',
                ], Response::HTTP_BAD_REQUEST);
            }

            if ($user->ordersLikeMaster()->exists()) {
                return response()->json([
                    'code' => Response::HTTP_BAD_REQUEST,
                    'message' => 'Нельзя удалить этого пользователя, т.к. это мастер, и у него есть заказы',
                ], Response::HTTP_BAD_REQUEST);
            }

            if ($user->ordersLikeCourierReceiver()->exists() || $user->ordersLikeCourierIssuer()->exists()) {
                return response()->json([
                    'code' => Response::HTTP_BAD_REQUEST,
                    'message' => 'Нельзя удалить этого пользователя, т.к. это курьер, и у него есть заказы',
                ], Response::HTTP_BAD_REQUEST);
            }

            $user->delete();
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'code' => Response::HTTP_NOT_FOUND,
                'message' => 'User Not Found.',
            ], Response::HTTP_NOT_FOUND);
        }

        return response()->json([
            'code' => Response::HTTP_OK,
            'message' => 'Пользователь успешно удален',
        ], Response::HTTP_OK);
    }
}
