<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Club;
use App\Models\ClubMember;
use App\Models\User;
use Illuminate\Support\Facades\Storage;
use App\Events\PrivateMessageSent;

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
 // Prihvatanje poziva
 public function acceptInvitation(Request $request, Club $club)
 {
     $user = auth()->user();
     // Pronađi članstvo koje je u 'pending' statusu
     $membership = ClubMember::where('club_id', $club->id)
                             ->where('user_id', $user->id)
                             ->where('status', 'pending')
                             ->first();

     if (!$membership) {
         return response()->json(['error' => 'Članstvo nije pronađeno ili nije u pending statusu'], 404);
     }

     // Ažuriraj status na 'accepted'
     $membership->update(['status' => 'accepted']);

     return response()->json(['message' => 'Uspešno ste prihvatili poziv za pridruživanje klubu.']);
 }

 // Odbijanje poziva
 public function rejectInvitation(Request $request, Club $club)
 {
     $user = auth()->user();

     // Pronađi članstvo koje je u 'pending' statusu
     $membership = ClubMember::where('club_id', $club->id)
                             ->where('user_id', $user->id)
                             ->where('status', 'pending')
                             ->first();

     if (!$membership) {
         return response()->json(['error' => 'Članstvo nije pronađeno ili nije u pending statusu'], 404);
     }

     // Ažuriraj status na 'rejected'
     $membership->update(['status' => 'rejected']);

     return response()->json(['message' => 'Uspešno ste odbili poziv za pridruživanje klubu.']);
 }
public function addMember(Request $request, Club $club)
{
    // Validacija email-a
    $request->validate([
        'email' => 'required|email|exists:users,email', // Proverava da email postoji u users tabeli
    ]);

    // Proveri da li je korisnik vlasnik kluba
    if ($club->user_id !== auth()->id()) {
        return redirect()->back()->with('error', 'Nemate dozvolu za ovu akciju.');
    }

    // Pronađi korisnika po emailu
    $user = User::where('email', $request->email)->first();

    // Proveri da li je korisnik već član kluba
    $existingMember = ClubMember::where('club_id', $club->id)
                                ->where('user_id', $user->id)
                                ->first();

    if ($existingMember) {
        return redirect()->back()->with('error', 'Ovaj korisnik je već član kluba ili je poslao zahtev.');
    }

    // Dodaj novog člana sa statusom "accepted"
    ClubMember::create([
        'club_id' => $club->id,
        'user_id' => $user->id,
        'status' => 'pending',
    ]);
    // Emituj događaj kako bi korisnik bio obavešten
    $message = "Pozvani ste da se pridružite klubu '{$club->name}'.";
event(new PrivateMessageSent($message, $user->id, $club->name, true)); // Dugmad su uključena

    return redirect()->back()->with('message', 'Novi član je uspešno dodat i ceka se na njegova potvrda.');
}

public function acceptMember(Request $request, Club $club, ClubMember $member)
{
    // Provera da li je korisnik vlasnik kluba
    if ($club->user_id !== auth()->id()) {
        return redirect()->back()->with('error', 'Nemate dozvolu za ovu akciju.');
    }

    // Prihva članstvo
    $member->update(['status' => 'accepted']);

    // Emituj događaj kako bi korisnik bio obavešten
    $message = "Vaš zahtev za članstvo u klubu '{$club->name}' je prihvaćen.";
    event(new PrivateMessageSent($message, $member->user_id));

    return redirect()->back()->with('message', 'Član je uspešno prihvaćen.');
}

public function rejectMember(Request $request, Club $club, ClubMember $member)
{
    // Proveri da li je korisnik vlasnik kluba
    if ($club->user_id !== auth()->id()) {
        return redirect()->back()->with('error', 'Nemate dozvolu za ovu akciju.');
    }

    // Odbij članstvo
    $member->update(['status' => 'rejected']);

    return redirect()->back()->with('message', 'Član je odbijen.');
}
public function join(Club $club)
{
    $user = auth()->user();

    $existingMembership = ClubMember::where('club_id', $club->id)
        ->where('user_id', $user->id)
        ->first();

    if ($existingMembership) {
        return redirect()->back()->with('message', 'Već ste poslali zahtev ili ste član ovog kluba.');
    }

    ClubMember::create([
        'club_id' => $club->id,
        'user_id' => $user->id,
        'status' => 'pending',
    ]);

    return redirect()->back()->with('message', 'Zahtev za pridruživanje klubu je poslat.');
}


public function show(Club $club)
{
    $user = auth()->user();

    // Provera da li je korisnik član ili ima pending zahtev
    $userIsMember = false;
    $membershipStatus = null;

    if ($user) {
        $membership = ClubMember::where('club_id', $club->id)
                                ->where('user_id', $user->id)
                                ->first();
        if ($membership) {
            $userIsMember = true;
            $membershipStatus = $membership->status;
        }
    }

    // Učitaj članove kluba
    $clubMembers = ClubMember::with('user')
                    ->where('club_id', $club->id)
                    ->get();

    return inertia('Club/ShowClub', [
        'club' => $club,
        'auth' => $user,
        'userIsMember' => $userIsMember,
        'membershipStatus' => $membershipStatus,
        'clubMembers' => $clubMembers, // Prosleđivanje članova
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
