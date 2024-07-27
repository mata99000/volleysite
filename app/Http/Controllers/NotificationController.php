<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Notification;
use Illuminate\Support\Facades\Auth;
use App\Events\ImmediateMessageSent; // Importujte vaš događaj

class NotificationController extends Controller
{
    public function createTestNotification()
    {
        $notification = new Notification();
        $notification->user_id = auth()->user()->id; // ID korisnika 1
        $notification->message = 'This is a test notification for user ';
        $notification->save();
        event(new ImmediateMessageSent($notification));
        return response()->json(['message' => 'Test notification created successfully']);

    }
    public function index()
    {
        $notifications = Notification::where('user_id', Auth::id())->where('read', false)->get();
        return response()->json($notifications);
    }

    public function store(Request $request)
    {
        $notification = new Notification();
        $notification->user_id = Auth::id();
        $notification->message = $request->message;
        $notification->save();

        return response()->json(['message' => 'Notification created successfully']);
    }

    public function markAsRead($id)
    {
        $notification = Notification::find($id);
        if ($notification && $notification->user_id == Auth::id()) {
            $notification->read = true;
            $notification->save();
            return response()->json(['message' => 'Notification marked as read']);
        }
        return response()->json(['message' => 'Notification not found or not authorized'], 404);
    }
}
