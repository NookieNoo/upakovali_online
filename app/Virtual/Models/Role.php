<?php


namespace App\Virtual\Models;


/**
 * @OA\Schema(
 *     description="Роль пользователя",
 *     type="object",
 *     title="Role",
 * )
 */
class Role
{
    /**
     * @OA\Property(
     *     title="Id",
     *     description="Id роли",
     *     format="integer",
     *     example=1
     * )
     *
     * @var numeric
     */
    public $id;

    /**
     * @OA\Property(
     *     title="name",
     *     description="Название роли",
     *     format="string",
     *     example="Мастер"
     * )
     *
     * @var string
     */
    public $name;
}

