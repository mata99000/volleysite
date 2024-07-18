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
use App\Models\Profile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log; // Dodajte ovaj import



class PersonalInfromationController extends Controller
{



    public function edit(Request $request): Response
    {
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    public function update_profile(Request $request): RedirectResponse {
        $request->validate([
            'name' => 'required|string|max:255',
            'lastname' => 'required|string|max:255',
            'dob' => 'required|date',
            'contact' => 'nullable|string|max:255',
            'city' => 'nullable|string|max:255',
            'gender' => 'nullable|string|max:255',
        ]);

        $user = $request->user();
        $user->name = $request->name;
        $user->lastname = $request->lastname;
        $user->dob = date("Y-m-d", strtotime($request->dob));
        $user->phone_number = $request->contact;
        $user->city = $request->city;
        $user->gender = $request->gender;

        try {
            $user->save();
            Log::info('User profile updated successfully', ['user_id' => $user->id]);
        } catch (\Exception $e) {
            Log::error('Error updating user profile', ['error' => $e->getMessage()]);
            return Redirect::route('personal.edit')->withErrors('Error updating profile.');
        }

        return Redirect::route('personal.edit')->with('status', 'Profile updated successfully');
    }
    public function update(Request $request): RedirectResponse
    {
        // Validacija podataka
        $request->validate([
            'nickname' => 'nullable|string|max:255',
            'motto' => 'nullable|string|max:255',
            'fav_num' => 'nullable|integer',
            'about' => 'nullable|string|max:1000',
            'idol' => 'nullable|string|max:255',
            'image' => 'nullable|image|mimes:jpg,png,jpeg|max:2048',
        ]);

        // Ažuriranje korisničkih podataka
        $user = $request->user();
        $user->nickname = $request->nickname;
        $user->motto = $request->motto;
        $user->fav_num = $request->fav_num;
        $user->about = $request->about;
        $user->idol = $request->idol;

       

        // Sačuvajte korisničke podatke
        $user->save();

        return Redirect::route('personal.edit')->with('status', 'Profile updated successfully');
    }

    public function update_email(Request  $request): RedirectResponse {
    $request->validate([
            'email' => '|string|lowercase|email|max:255|unique:users|email',
        ]);
        $request->user()->update([
            'email' => $request->email,
        ]);
        $request->user()->save();
        return Redirect::route('personal.edit');
}

}