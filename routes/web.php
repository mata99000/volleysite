<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserProfileController;
use App\Http\Controllers\PersonalInfromationController;
use App\Http\Controllers\TournamentController;
use App\Http\Controllers\ClubController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Events\ImmediateMessageSent;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\NotificationController;

Route::middleware('auth')->group(function () {
    Route::get('/notifications', [NotificationController::class, 'index']);
    Route::post('/notifications', [NotificationController::class, 'store']);
    Route::patch('/notifications/{id}/read', [NotificationController::class, 'markAsRead']);
    Route::post('/test-notification', [NotificationController::class, 'createTestNotification']);
});


Route::get('/send', function () {
    Log::info('Emitting ImmediateMessageSent event...');
    event(new ImmediateMessageSent('Hello from Immediate Event!'));
    return 'Immediate event has been sent!';
});

Route::get('tournaments-api', [TournamentController::class, 'index']);
Route::get('/tournament/{tournament_name}', [TournamentController::class, 'view_tournament']);

//Protected Tournament Routs for creating and editing
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/tournaments', function() {
        return Inertia::render('Tournaments/Tournaments');
    })->name('tournaments.index');
    Route::get('/add_tournament', function() {
        return Inertia::render('Tournaments/AddTournament');
    })->name('addtournaments.index');
    Route::post('/add_tournament', [TournamentController::class, 'add_tournament'])->name('add.tournament');
    Route::post('/tournaments', [TournamentController::class, 'add_tournament'])->name('tournaments.store');
    Route::get('/tournaments/{tournament}', [TournamentController::class, 'show'])->name('tournaments.show');
    Route::get('/tournaments/{tournament}/edit', [TournamentController::class, 'edit'])->name('tournaments.edit');
    Route::put('/tournaments/{tournament}', [TournamentController::class, 'update'])->name('tournaments.update');
    Route::delete('/tournaments/{tournament}', [TournamentController::class, 'destroy'])->name('tournaments.destroy');
});
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});



// vraca view za kreiranje turnira
Route::get('/profile/{id}/{name}-{lastname}', [ProfileController::class, 'show_profile'])->name('profile.show');


Route::middleware('auth')->group(function () {



    //vraca view za kreiranje turnira

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

