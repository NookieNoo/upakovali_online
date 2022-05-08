<?php

namespace App\Notifications\Order;

use App\Models\Activity;
use App\Models\AdditionalProduct;
use App\Models\Gift;
use App\Models\Order;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class UpdateOrderNotification extends Notification implements ShouldQueue
{
    use Queueable;

    private Order $order;
    private string $batchUuid;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct(Order $order,  string $batchUuid)
    {
        $this->order = $order;
        $this->batchUuid = $batchUuid;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable)
    {
        $frontendDomain = config('main.frontend_domain');
//        $batchActivities = Activity::forBatch('78ca1211-a7a9-433f-b82d-7e8a3ed7146f')->get();
        $batchActivities = Activity::forBatch($this->batchUuid)->get();
        $orderChanges = $batchActivities->filter(fn($item) => $item->subject_type === Order::class);
        $giftChanges = $batchActivities->filter(fn($item) => $item->subject_type === Gift::class);
        $additionalProductsChanges = $batchActivities->filter(fn($item) => $item->subject_type === AdditionalProduct::class);
        return (new MailMessage)
            ->subject('Заказ успешно обновлен')
            ->view('mails.order.updated', [
                'order' => $this->order,
                'link' => "$frontendDomain/order/" . $this->order->id,
                'orderChanges' => $orderChanges,
                'giftChanges' => $giftChanges,
                'additionalProductsChanges' => $additionalProductsChanges,
            ]);
    }

    /**
     * Get the array representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function toArray($notifiable)
    {
        return [
            //
        ];
    }
}
