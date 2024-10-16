<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\User;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;



class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('Profile/Profile', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    public function show_profile($user_id) {
    $user = User::where('id', $user_id)->first();

    if ($user) {
        // Odaberite atribute koje želite vratiti, izuzev šifre
       
        $userData = [
            'nickname' => $user->nickname,
            'email' => $user->email,
            'created_at' => $user->created_at,
            // Dodajte ostale atribute koje želite uključiti
        ];

        dd($userData);
        
        return Inertia::render('Profile/Profile', [
            'users_profile' => $userData,
        ]);
        
    } else {
        // Dodajte odgovarajući kod ako korisnik nije pronađen
        // Na primer, možete vratiti grešku ili preusmeriti korisnika
        abort(404);
        
    }
}
    
public function set_profile_image(Request $request)
    {
        $request->validate([
            'image' => 'required|image|mimes:jpg,png,jpeg|max:2048',
        ]);

        // Generišite jedinstveno ime za fajl
        $fileName = time() . '.' . $request->file('image')->extension();

        // Sačuvajte fajl u storage/app/public/avatars
        $filePath = $request->file('image')->storeAs('public/avatars', $fileName);

        // Ažurirajte korisnički model sa novim imenom slike
        $user = Auth::user();
        $user->image_name = $fileName;
        $user->save();

        $imageUrl = Storage::url('public/avatars/' . $fileName);

        return response()->json(['status' => 'Profile image updated successfully', 'image_name' => $fileName, 'image_url' => $imageUrl]);
    }
    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
    
}
