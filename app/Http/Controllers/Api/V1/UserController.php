<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\User\UserGetRequest;
use App\Http\Requests\User\UserStoreRequest;
use App\Http\Requests\User\UserUpdateRequest;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
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
     * @return JsonResponse
     */
    public function index(UserGetRequest $request)
    {
        if ($request->user()->cannot('viewAny', User::class)) {
            return $this->sendError('Доступ закрыт', Response::HTTP_FORBIDDEN);
        }
        return User::with('role')->withFilters($request)->withOrder($request)->withPaginate($request);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param UserStoreRequest $request
     * @return JsonResponse
     */
    public function store(UserStoreRequest $request)
    {
        if ($request->user()->cannot('create', User::class)) {
            return $this->sendError('Доступ закрыт', Response::HTTP_FORBIDDEN);
        }
        try {
            $validatedData = $request->validated();
            $validatedData['remember_token'] = Str::random(10);
            $validatedData['password'] = Hash::make($validatedData['password']);
            $user = User::create($validatedData);
        } catch (\Exception $e) {
            return $this->sendError('Не удалось создать пользователя', Response::HTTP_INTERNAL_SERVER_ERROR, $e->getMessage());
        }

        $this->dispatch(new Registered($user));
        
        return $this->send(
            Response::HTTP_CREATED,
            Response::$statusTexts[Response::HTTP_CREATED],
            $user->load('role'),
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
            $user = User::with('role')->findOrFail($id);
            if ($request->user()->cannot('view', $user, User::class)) {
                return $this->sendError('Доступ закрыт', Response::HTTP_FORBIDDEN);
            }
        } catch (ModelNotFoundException $e) {
            return $this->sendError('Пользователь не найден', Response::HTTP_NOT_FOUND);
        }

        return $this->send(Response::HTTP_OK, null, $user);
    }


    /**
     * Update the specified resource in storage.
     *
     * @param UserUpdateRequest $request
     * @param  int  $id
     * @return JsonResponse
     */
    public function update(UserUpdateRequest $request, $id)
    {
        try {
            $user = User::findOrFail($id);
            if ($request->user()->cannot('update', $user, User::class)) {
                return $this->sendError('Доступ закрыт', Response::HTTP_FORBIDDEN);
            }
        } catch (ModelNotFoundException $e) {
            return $this->sendError('Пользователь не найден.', Response::HTTP_NOT_FOUND);
        }

        $validatedData = $request->validated();
        if (!empty($validatedData['password'])) {
            $validatedData['password'] = Hash::make($validatedData['password']);
        }

        if ($validatedData['role_id'] !== $user->role_id) {
            if ($user->parthners()->exists()) {
                return $this->sendError('Нельзя изменить роль этого пользователя, т.к. это менеджер, и у него есть партнер', Response::HTTP_BAD_REQUEST);
            }

            if ($user->ordersLikeMaster()->exists()) {
                return $this->sendError('Нельзя изменить роль этого пользователя, т.к. это мастер, и у него есть заказы', Response::HTTP_BAD_REQUEST);
            }

            if ($user->ordersLikeCourierReceiver()->exists() || $user->ordersLikeCourierIssuer()->exists()) {
                return $this->sendError('Нельзя изменить роль этого пользователя, т.к. это курьер, и у него есть заказы', Response::HTTP_BAD_REQUEST);
            }
        }

        $user->update($validatedData);

        return $this->send(Response::HTTP_OK, 'Данные сохранены.', $user->load('role'));
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
            $user = User::findOrFail($id);
            if ($request->user()->cannot('delete', $user, User::class)) {
                return $this->sendError('Доступ закрыт', Response::HTTP_FORBIDDEN);
            }

            if ($user->parthners()->exists()) {
                return $this->sendError('Нельзя изменить роль этого пользователя, т.к. это менеджер, и у него есть партнер', Response::HTTP_BAD_REQUEST);
            }

            if ($user->ordersLikeMaster()->exists()) {
                return $this->sendError('Нельзя изменить роль этого пользователя, т.к. это мастер, и у него есть заказы', Response::HTTP_BAD_REQUEST);
            }

            if ($user->ordersLikeCourierReceiver()->exists() || $user->ordersLikeCourierIssuer()->exists()) {
                return $this->sendError('Нельзя изменить роль этого пользователя, т.к. это курьер, и у него есть заказы', Response::HTTP_BAD_REQUEST);
            }

            $user->delete();
        } catch (ModelNotFoundException $e) {
            return $this->sendError('Пользователь не найден.', Response::HTTP_NOT_FOUND);
        }

        return $this->send(Response::HTTP_OK, 'Пользователь успешно удален');
    }
}
