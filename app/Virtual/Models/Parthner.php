<?php

/**
 * @OA\Schema(
 *     description="Клиент",
 *     type="object",
 *     title="Client",
 * )
 */
class Parthner
{
    /**
     * @OA\Property(
     *     title="Id",
     *     description="Id клиента",
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
     *     description="Имя менеджера",
     *     format="string",
     *     example="Любимов Алексей Валерьевич"
     * )
     *
     * @var string
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
