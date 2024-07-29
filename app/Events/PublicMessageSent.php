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
class PublicMessageSent implements ShouldBroadcastNow
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $message;

    public function __construct($message)
    {
        $this->message = $message;

        // Sačuvaj notifikaciju u bazi za sve korisnike (ovde je samo primer, možda ćete želeti drugačiju logiku)
        $users = \App\Models\User::all();
        foreach ($users as $user) {
            Notification::create([
                'user_id' => $user->id,
                'message' => $message,
                'read' => false,
            ]);
        }
    }

    public function broadcastOn()
    {
        return new Channel('public-messages');
    }

    public function broadcastWith()
    {
        return ['message' => $this->message];
    }
}
