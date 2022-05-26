<?php


namespace App\Services;


use App\Models\Activity;
use App\Models\Order;
use Illuminate\Support\Facades\Http;

class UpdatesNotifierService
{
    public function __construct(
        private Http $client
    )
    {
    }

    public function notifyOrderChanged(string $batchActivitiesUuid)
    {
        $batchActivities = Activity::forBatch($batchActivitiesUuid)->get();
        $orderChange = $batchActivities->first(fn($item) => $item->subject_type === Order::class);
        if (!$orderChange) throw new \RuntimeException('Не удалось найти заказ');
        $order = Order::find($orderChange->subject_id);

        $sendUpdateTo = $order->parthner->notification_url;

        $forSend = [
            'action' => 'update_order',
            'subject_id' => '',
            'data' => $batchActivities
        ];
        $sendUpdateTo = "http://google.com";
        $response = $this->client::post($sendUpdateTo, $forSend);
        dd($response);
    }

    public function notifyOrderStatusChanged(Order $order, array $data, string $url)
    {
        $forSend = [
            'action' => 'update_order_status',
            'subject_id' => $order->external_number,
            'data' => $data,
        ];

        $response = $this->client::post($url, $forSend);
        if (!$response->ok()) {
            throw new \RuntimeException('Отправленное уведомление не было принято. Status= ' . $response->status());
        }
    }
}
