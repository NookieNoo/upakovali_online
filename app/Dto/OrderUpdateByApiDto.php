<?php

namespace App\Dto;

use App\Dto\includes\AdditionalProduct;
use App\Dto\includes\Client;
use App\Dto\includes\Courier;
use App\Dto\includes\Gift;
use App\Dto\includes\Receiver;
use Spatie\DataTransferObject\Attributes\CastWith;
use Spatie\DataTransferObject\Casters\ArrayCaster;
use Spatie\DataTransferObject\DataTransferObject;

class OrderUpdateByApiDto extends DataTransferObject
{
    public Client $client;
    public int $workshop_id;
    public ?string $pick_up_point_id;
    public ?string $pick_up_address;
    public ?string $pick_up_price;
    public ?string $delivery_point_id;
    public ?string $delivery_address;
    public string $receiving_date;
    public string $issue_date;
    public ?string $comment;
    public Courier $courier;
    public Receiver $receiver;

    #[CastWith(ArrayCaster::class, itemType: Gift::class)]
    public array $gifts;

    #[CastWith(ArrayCaster::class, AdditionalProduct::class)]
    public array $additional_products;

    public ?bool $is_pickupable;
    public ?bool $is_deliverable;
    public ?int $pick_up_address_point_id;
    public ?int $delivery_address_point_id;
}
