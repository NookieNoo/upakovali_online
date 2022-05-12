<?php

namespace App\Events\Order;

use App\Models\Order;
use App\Models\Parthner;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class OrderStatusUpdatedByApi
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    private Order $order;
    private Parthner $partner;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct(Order $order, Parthner $partner)
    {
        $this->order = $order;
        $this->partner = $partner;
    }

    public function getOrder(): Order
    {
        return $this->order;
    }

    public function getPartner(): Parthner
    {
        return $this->partner;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        return new PrivateChannel('channel-name');
    }
}
