<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginParthnerRequest;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegisterRequest;
use App\Models\Parthner;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

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

        $token = $user->createToken('myapptoken')->plainTextToken;

        return response()->json([
            'code' => Response::HTTP_OK,
            'message' => Response::$statusTexts[Response::HTTP_OK],
            'user' => $user,
            'token' => $token,
        ], Response::HTTP_OK);
    }

    public function loginParthner(LoginParthnerRequest $request)
    {
        $validated = $request->validated();
        $parthner = Parthner::where('parthner_hash', $validated['parthner_hash'])->exists();
        if (!$parthner) return $this->sendError('Unauthorized', Response::HTTP_UNAUTHORIZED);
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
}
