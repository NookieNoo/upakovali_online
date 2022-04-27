<?php

/**
 * @OA\Schema(
 *     description="Партнер",
 *     type="object",
 *     title="Parthner",
 * )
 */
class Parthner
{
    /**
     * @OA\Property(
     *     title="Id",
     *     description="Id партнера",
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
     *     description="Название",
     *     format="string",
     *     example="ПАО ТехГараж"
     * )
     *
     * @var string
     */
    public $full_name;

    /**
     * @OA\Property(
     *     title="manager",
     *     description="Менеджер",
     *     format="User",
     * )
     *
     * @var \App\Virtual\Models\User
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
}
