<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Club;
use Illuminate\Support\Facades\Storage;

class ClubController extends Controller
{
    public function create()
    {
        return Inertia::render('Club/AddClub');
    }

    public function index()
{
    // Dohvati sve klubove
    $clubs = Club::all();

    // Vrati stranicu sa svim klubovima
    return Inertia::render('Club/AllClubs', [
        'clubs' => $clubs,
    ]);
}

    public function show(Club $club)
    {
        // Prikazivanje stranice sa informacijama o klubu i dugmetom za izmenu
        return Inertia::render('Club/ShowClub', [
            'club' => $club,
            'auth' => auth()->user(), // Prosleđivanje podataka o korisniku ako je potrebno za proveru prava
        ]);
    }
public function store(Request $request)
{
    // Validacija polja uključujući slike
    $request->validate([
        'name' => 'required|string|max:255',
        'club_pic' => 'nullable|image|mimes:jpg,png,jpeg|max:6144', // Validacija za club_pic
        'roster' => 'nullable|image|mimes:jpg,png,jpeg|max:6144',   // Validacija za roster
        'country' => 'nullable|string',
        'city' => 'nullable|string',
        'socials' => 'nullable|string',
    ]);

        // Kreiranje kluba bez slika
        $club = Club::create([
            'name' => $request->name,
            'user_id' => auth()->id(),
            'country' => $request->country,
            'city' => $request->city,
            'socials' => $request->socials,
        ]);
    
        // Ako je fajl za club_pic poslat, sačuvaj ga u storage
        if ($request->hasFile('club_pic')) {
            $fileName = time() . '_club_pic.' . $request->file('club_pic')->extension();
            $filePath = $request->file('club_pic')->storeAs('public/club_pics', $fileName);
            $club->update(['club_pic' => $fileName]); // Čuvamo samo ime fajla u bazi
        }
    
        // Ako je fajl za roster poslat, sačuvaj ga u storage
        if ($request->hasFile('roster')) {
            $fileName = time() . '_roster.' . $request->file('roster')->extension();
            $filePath = $request->file('roster')->storeAs('public/roster_pics', $fileName);
            $club->update(['roster' => $fileName]); // Čuvamo samo ime fajla u bazi
        }
    
        return redirect()->route('clubs')->with('success', 'Klub uspešno kreiran.');
    }

   
    

    public function edit(Club $club)
{
    // Osiguraj da samo kreator može uređivati klub
    if ($club->user_id !== auth()->id()) {
        abort(403, 'Nemate pravo da uređujete ovaj klub.');
    }

    return Inertia::render('Club/EditClub', [
        'auth' => auth()->user(),
        'data' => $club // Prosleđujemo podatke kluba
    ]);
}

public function update(Request $request, Club $club)
{
    $request->validate([
        'name' => 'required|string|max:255',
        'club_pic' => 'nullable|image|mimes:jpg,png,jpeg|max:6144', // Validacija za club_pic
        'roster' => 'nullable|image|mimes:jpg,png,jpeg|max:6144',   // Validacija za roster
        'country' => 'nullable|string',
        'city' => 'nullable|string',
        'socials' => 'nullable|string',
    ]);
    
    // Provera prava na uređivanje kluba
    if ($club->user_id !== auth()->id()) {
        abort(403, 'Nemate pravo da uređujete ovaj klub.');
    }
    
    // Ažuriranje podataka kluba
    $club->update([
        'name' => $request->name,
        'country' => $request->country,
        'city' => $request->city,
        'socials' => $request->socials,
    ]);
    
    // Ako je fajl za club_pic poslat, sačuvaj ga
    if ($request->hasFile('club_pic')) {
        // Obriši staru sliku ako postoji
        if ($club->club_pic && \Storage::exists('public/club_pics/' . $club->club_pic)) {
            \Storage::delete('public/club_pics/' . $club->club_pic);
        }
        
        // Generiši ime fajla
        $fileName = time() . '_club_pic.' . $request->file('club_pic')->extension();
        
        // Sačuvaj fajl u storage/public/club_pics
        $filePath = $request->file('club_pic')->storeAs('public/club_pics', $fileName);
        
        // Sačuvaj ime fajla u bazi
        $club->update(['club_pic' => $fileName]);
    }
    
    // Ako je fajl za roster poslat, sačuvaj ga
    if ($request->hasFile('roster')) {
        // Obriši stari fajl za roster ako postoji
        if ($club->roster && \Storage::exists('public/roster_pics/' . $club->roster)) {
            \Storage::delete('public/roster_pics/' . $club->roster);
        }
    
        // Generiši ime fajla
        $fileName = time() . '_roster.' . $request->file('roster')->extension();
        
        // Sačuvaj fajl u storage/public/roster_pics
        $filePath = $request->file('roster')->storeAs('public/roster_pics', $fileName);
        
        // Sačuvaj ime fajla u bazi
        $club->update(['roster' => $fileName]);
    }
    

    return redirect()->route('club.edit', $club)->with('success', 'Klub uspešno ažuriran.');
}


}
