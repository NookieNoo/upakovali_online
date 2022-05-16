<?php

namespace App\Jobs;

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

    protected UpdatesNotifierService $notifier;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct(UpdatesNotifierService $notifier)
    {
        $this->notifier = $notifier;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $this->notifier->handle('sdfsdf', []);
    }
}
