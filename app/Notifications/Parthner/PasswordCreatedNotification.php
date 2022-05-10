<?php

namespace App\Notifications\Parthner;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class PasswordCreatedNotification extends Notification implements ShouldQueue
{
    use Queueable;

    private string $password;
    private string $email;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct(string $password, string $email)
    {
        $this->password = $password;
        $this->email = $email;
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
        return (new MailMessage)
            ->subject('Реквизиты для использования api upakovali_online')
            ->view('mails.parthner.password_created', ['password' => $this->password, 'email' => $this->email]);
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
