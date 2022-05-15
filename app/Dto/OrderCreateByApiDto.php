<?php

namespace App\Dto;

use App\Dto\includes\Client;
use App\Dto\includes\Courier;
use App\Dto\includes\Receiver;
use Spatie\DataTransferObject\DataTransferObject;

class OrderCreateByApiDto extends DataTransferObject
{
    public string $external_number;
    public Client $client;
    public int $workshop_id;
    public ?string $pick_up_point_id;
    public ?string $pick_up_address;
    public ?string $delivery_point_id;
    public ?string $delivery_address;
    public string $receiving_date;
    public string $issue_date;
    public ?string $comment;
    public Courier $courier;
    public Receiver $receiver;
    public ?int $source_id;
    public ?bool $is_paid;
    public ?int $order_status_id;
    public ?int $parthner_id;
    public ?bool $is_pickupable;
    public ?bool $is_deliverable;
}
