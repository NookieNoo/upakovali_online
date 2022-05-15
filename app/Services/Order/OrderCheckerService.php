<?php

namespace App\Services\Order;

use App\Enums\OrderStatus;
use App\Models\Order;
use App\Models\User;
use App\Services\Order\Exceptioin\OrderCheckerServiceException;

class OrderCheckerService
{
    public function checkCanUpdateOrder(Order $order, User $performer): void
    {
        if (!$performer->isAdmin()) {
            if ($order->isDirty('order_status_id') && $order->getOriginal('order_status_id') + 1 !== $order->order_status_id) {
                throw new OrderCheckerServiceException('Изменение статуса заказа доступно только по цепочке');
            }

            $deliveryOrPickingAttributes = ['is_pickupable', 'pick_up_point_id', 'pick_up_address', 'is_deliverable', 'delivery_point_id', 'delivery_address'];
            if ($order->isDirty($deliveryOrPickingAttributes) && in_array($order->getOriginal('order_status_id'), [OrderStatus::DELIVERED, OrderStatus::CANCELED])) {
                throw new OrderCheckerServiceException('Нельзя менять опции(доставки/забора) доставленного/отмененного заказа');
            }
        }


    }
}
