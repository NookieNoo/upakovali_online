<?php


namespace App\Virtual\Models;


/**
 * @OA\Schema(
 *     description="Пользователь",
 *     type="object",
 *     title="User",
 * )
 */
class User
{
    /**
     * @OA\Property(
     *     title="Id",
     *     description="Id пользователя",
     *     format="integer",
     *     example=1
     * )
     *
     * @var numeric
     */
    public $id;

    /**
     * @OA\Property(
     *     title="Full name",
     *     description="ФИО",
     *     format="string",
     *     example="Любимов Алексей Валерьевич"
     * )
     *
     * @var string
     */
    public $full_name;

    /**
     * @OA\Property(
     *     title="manager",
     *     description="Менеджер",
     *     format="string",
     * )
     *
     * @var \App\Models\User
     */
    public $manager;

    /**
     * @OA\Property(
     *     title="Phone",
     *     description="Телефон",
     *     format="string",
     *     example="+79586526652"
     * )
     *
     * @var string
     */
    public $phone;

    /**
     * @OA\Property(
     *     title="Email",
     *     description="Email",
     *     format="email",
     *     example="sergeev2@example.com"
     * )
     *
     * @var string
     */
    public $email;

    /**
     * @OA\Property(
     *     title="Comment",
     *     description="Комментарий",
     *     format="string",
     *     example="Лучше купи себе часы"
     * )
     *
     * @var string
     */
    public $comment;

    /**
     * @OA\Property(
     *     title="Role",
     *     description="Роль пользователя",
     *     format="Role",
     * )
     *
     * @var Role
     */
    public $role;
}

