<?php

namespace App\Notifications\PublicApi;

use App\Models\Order;
use App\Models\Parthner;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class OrderCreatedByApiNotification extends Notification implements ShouldQueue
{
    use Queueable;

    private Order $order;
    private Parthner $partner;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct(Order $order, Parthner $partner)
    {
        $this->order = $order;
        $this->partner = $partner;
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
        return (new MailMessage)
            ->subject('Партнер ' . $this->partner->full_name . ' создал заказ №' . $this->order->id )
            ->view('mails.public_api.order_created_by_api', [
                'order' => $this->order,
                'partner' => $this->partner,
                'link' => "$frontendDomain/order/" . $this->order->id
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
