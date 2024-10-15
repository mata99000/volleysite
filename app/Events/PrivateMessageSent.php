<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use App\Models\Notification;
class PrivateMessageSent implements ShouldBroadcastNow
{
    use Dispatchable, InteractsWithSockets, SerializesModels;
    public $message;
    public $userId;
    public $clubId;
    public $withButtons;

    public function __construct($message, $userId, $clubName = null, $withButtons = false)
    {
        $this->message = $message;
        $this->userId = $userId;
        $this->clubName = $clubName;
        $this->withButtons = $withButtons;

        // Sačuvaj notifikaciju u bazi za specifičnog korisnika
        Notification::create([
            'user_id' => $userId,
            'message' => $message,
            'read' => false,
        ]);
    }

    public function broadcastOn()
    {
        return new PrivateChannel('private-messages.' . $this->userId);
    }

    public function broadcastWith()
    {
        
        return [
            'message' => $this->message,
            'clubName' => $this->clubName,
            'withButtons' => $this->withButtons,
        ];
    }
}
