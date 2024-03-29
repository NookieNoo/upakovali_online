<?php

namespace App\Jobs;

use App\Models\Order;
use App\Services\UpdatesNotifierService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

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
        private string $batchActivitiesUuid
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
//        $notifier->notifyOrderChanged($this->batchActivitiesUuid);
    }
}
