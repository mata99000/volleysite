<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Log;

class ImmediateMessageSent implements ShouldBroadcastNow
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $message;

    public function __construct($message)
    {
        $this->message = $message;
        Log::info('ImmediateMessageSent event created with message: ' . $message);
    }

    public function broadcastOn()
    {
        Log::info('ImmediateMessageSent event broadcast on channel: immediate-messages');
        return new Channel('immediate-messages');
    }
}
