<?php

namespace App\Jobs;

use App\Models\Activity;
use App\Models\Order;
use App\Services\UpdatesNotifierService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class NotifyStatusChanged implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct(
        private Order $order,
        private int   $activityId
    )
    {
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle(UpdatesNotifierService $notifier)
    {
        $dateTimeFormat = config('main.datetime_format');
        $activity = Activity::find($this->activityId);
        $data = [
            'id' => $this->order->orderStatus->id,
            'name' => $this->order->orderStatus->name,
            'updated_at' => $activity->created_at->format($dateTimeFormat),
        ];
        try {
            $notifier->notifyOrderStatusChanged($this->order, $data, $this->order->parthner->notification_url);
        } catch (\Exception $e) {
            Log::error($e->getMessage());
        }
    }
}
