<?php

namespace App\Http\Controllers;

use App\Models\Notification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Events\ImmediateMessageSent;

class NotificationController extends Controller
{
    public function index()
    {
        try {
            $notifications = Notification::where('user_id', Auth::id())->where('read', false)->get();
            return response()->json($notifications);
        } catch (\Exception $e) {
            \Log::error('Error fetching notifications: '.$e->getMessage());
            return response()->json(['error' => 'Error fetching notifications'], 500);
        }
    }

    public function store(Request $request)
    {
        try {
            $user = Auth::user();
            $notification = new Notification();
            $notification->user_id = $user->id;
            $notification->message = $request->input('message', 'This is a test notification for ' . $user->name);
            $notification->save();

            event(new ImmediateMessageSent($notification));
            return response()->json(['message' => 'Notification created successfully']);
        } catch (\Exception $e) {
            \Log::error('Error creating notification: '.$e->getMessage());
            return response()->json(['error' => 'Error creating notification'], 500);
        }
    }

    public function markAsRead($id)
    {
        try {
            $notification = Notification::find($id);
            if ($notification && $notification->user_id == Auth::id()) {
                $notification->read = true;
                $notification->save();
                return response()->json(['message' => 'Notification marked as read']);
            }
            return response()->json(['message' => 'Notification not found or not authorized'], 404);
        } catch (\Exception $e) {
            \Log::error('Error marking notification as read: '.$e->getMessage());
            return response()->json(['error' => 'Error marking notification as read'], 500);
        }
    }

    public function createTestNotification()
    {
        try {
            $user = Auth::user();

            $notification = new Notification();
            $notification->user_id = $user->id;
            $notification->message = 'This is a test notification for ' . $user->name;
            $notification->save();

            event(new ImmediateMessageSent($notification));
            return response()->json(['message' => 'Test notification created successfully']);
        } catch (\Exception $e) {
            \Log::error('Error creating test notification: '.$e->getMessage());
            return response()->json(['error' => 'Error creating test notification'], 500);
        }
    }
}
