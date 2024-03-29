<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\ForgotPasswordRequest;
use App\Http\Requests\Auth\LoginParthnerRequest;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegisterRequest;
use App\Http\Requests\Auth\ResetPasswordRequest;
use App\Models\Parthner;
use App\Models\User;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Auth\Events\Verified;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Str;
use Illuminate\Auth\Events\Registered;

class AuthController extends Controller
{
    public function register(RegisterRequest $request)
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
        event(new Registered($user));

        $token = $user->createToken('myapptoken')->plainTextToken;
        return response()->json([
            'code' => Response::HTTP_CREATED,
            'message' => Response::$statusTexts[Response::HTTP_CREATED],
            'user' => $user->load('role'),
            'token' => $token,
        ], Response::HTTP_CREATED);
    }

    public function login(LoginRequest $request)
    {
        $fields = $request->validated();

        $user = User::where('email', $fields['email'])->with('role')->first();

        if (!$user || !Hash::check($fields['password'], $user->password)) {
            return response([
                'message' => 'Неправильный пароль/почта',
                'code' => Response::HTTP_UNAUTHORIZED,
            ], Response::HTTP_UNAUTHORIZED);
        }

        if (!$user->email_verified_at) {
            return $this->sendError('Пожалуйста, подтвердите email', Response::HTTP_UNAUTHORIZED);
        }

        if (!$user->role_id) {
            return $this->sendError('Пожалуйста, дождитесь подтверждения аккаунта', Response::HTTP_UNAUTHORIZED);
        }

        $token = $user->createToken('myapptoken')->plainTextToken;

        return response()->json([
            'code' => Response::HTTP_OK,
            'message' => Response::$statusTexts[Response::HTTP_OK],
            'user' => $user,
            'token' => $token,
        ], Response::HTTP_OK);
    }

    /**
     * @OA\Post (
     *     path="/login/parthner",
     *     operationId="loginParthner",
     *     tags={"Login"},
     *     summary="Получить токен доступа",
     *
     *     @OA\RequestBody(
     *         @OA\MediaType(mediaType="application/json",
     *              @OA\Schema(
     *                  @OA\Property(property="parthner_hash", type="string", description="Parthner hash"),
     *                  example={"parthner_hash": "$2y$10$XVxaSMF64H3NdAUfkULvFuLESv1w5GaokWUJMzpQgAR/bY8zsCa6a"}
     *              )
     *         )
     *     ),
     *
     *     @OA\Response(
     *         response="200",
     *         description="Everything is fine",
     *     ),
     * )
     *
     * Получить токен доступа
     *
     * @return JsonResponse
     */
    public function loginParthner(LoginParthnerRequest $request)
    {
        $validated = $request->validated();
        $parthner = Parthner::where('email', $validated['email'])->first();
        if (!$parthner || !Hash::check($validated['password'], $parthner->password)) {
            return $this->sendError('Неправильный пароль/почта', Response::HTTP_UNAUTHORIZED);
        }
        $token = $parthner->createToken('parthner_token')->plainTextToken;

        return $this->send(Response::HTTP_OK, null, ['token' => $token]);
    }

    public function logout(Request $request)
    {
        auth()->user()->tokens()->delete();

        return response()->json([
            'code' => Response::HTTP_NO_CONTENT,
            'message' => 'Logged out',
        ], Response::HTTP_NO_CONTENT);
    }

    public function forgotPassword(ForgotPasswordRequest $request)
    {
        $status = Password::sendResetLink(
            $request->only('email')
        );

        return $status === Password::RESET_LINK_SENT
            ? $this->send(Response::HTTP_OK, __($status))
            : $this->sendError(__($status), Response::HTTP_INTERNAL_SERVER_ERROR);
    }

    public function resetPassword(ResetPasswordRequest $request)
    {
        $status = Password::reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function ($user, $password) {
                $user->forceFill([
                    'password' => Hash::make($password)
                ])->setRememberToken(Str::random(60));

                $user->save();

                event(new PasswordReset($user));
            }
        );

        return $status === Password::PASSWORD_RESET
            ? $this->send(Response::HTTP_OK, __($status))
            : $this->sendError(__($status), Response::HTTP_INTERNAL_SERVER_ERROR);
    }

    public function verifyEmail(Request $request)
    {
        $id = (int) $request->route('id');
        $user = User::findOrFail($id);
        $url = config('main.login_front_page');
        if ($user->hasVerifiedEmail()) {
            return $this->send(Response::HTTP_OK, 'Email уже подтвержден', ['alreadyVerified' => true]);
        }

        if ($user->markEmailAsVerified()) {
            event(new Verified($user));
        }

        return $this->send(Response::HTTP_OK, 'Успешно подтвержден email', ['alreadyVerified' => false]);
    }
}
