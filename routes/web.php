<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserProfileController;
use App\Http\Controllers\PersonalInfromationController;
use App\Http\Controllers\TournamentController;
use App\Http\Controllers\ClubController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});
Route::get('/add_club', function() {
    return Inertia::render('Club/AddClub');
});

Route::post('/add_club', [ClubController::class, 'store'])->name('add.club');       

Route::post('/edit/club/{id}', [ClubController::class, 'edit_club'])->name('edit.club');
Route::get('/edit/club/{id}', [ClubController::class, 'edit_show'])->name('editshow.club');

// vraca view za kreiranje turnira
Route::get('/add_tournament', function() {
    return Inertia::render('Tournaments/AddTournament');
})->name('addtournaments.index');






Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

    
Route::get('/profile/{id}/{name}-{lastname}', [ProfileController::class, 'show_profile'])->name('profile.show');


Route::middleware('auth')->group(function () {

    Route::get('/tournaments', function() {
        return Inertia::render('Tournaments/Tournaments');
    })->name('tournaments.index');
    
    //vraca view za kreiranje turnira
    Route::post('/add_tournament', [TournamentController::class, 'add_tournament'])->name('add.tournament');       

    // vraca personal_settings view 
    Route::get('/personal_settings', [PersonalInfromationController::class, 'edit'])->name('personal.edit');

    // vraca profile view 
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');

    // update name,lastname, dob , phone_number, city, gender
    Route::patch('/personal_settings_profile', [PersonalInfromationController::class, 'update_profile'])->name('personal.update_profile');    

    // update Nickname, fav_num, about ... 
    Route::patch('/personal_settings_information', [PersonalInfromationController::class, 'update'])->name('personal.settings_information');    

    // update profile image
    Route::post('/profile', [ProfileController::class, 'set_profile_image'])->name('profile.set_profile_image');

    // update email
    Route::post('/personal_settings', [PersonalInfromationController::class, 'update_email'])->name('email.update');
    
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

});

require __DIR__.'/auth.php';
