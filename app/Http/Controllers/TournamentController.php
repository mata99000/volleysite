<?php

namespace App\Http\Controllers;
use App\Models\Tournament;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use App\Http\Resources\TournamentResource;


class TournamentController extends Controller
{
    public function index()
    {
        $tournaments = Tournament::all();
        return response()->json([
            'tournaments' => TournamentResource::collection($tournaments)
        ]);
        }

    public function create()
    {
        return Inertia::render('Tournaments/Create');
    }

    public function add_tournament(Request $request)
    {
        // Validacija
        $validatedData = $request->validate([
            'name' => 'required|unique:tournaments',
            'start_date' => 'required|date',
            'end_date' => 'required|date',
            'location' => 'required',
            'tournament_pic' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048'
        ]);

        // Upload slike
        $fileName = time() . '.' . $request->tournament_pic->extension();  
        $request->tournament_pic->move(public_path('tournament_pics'), $fileName);

        // Kreiraj turnir
        $tournament = new Tournament;
        $tournament->name = $request->name;
        $tournament->start_date = $request->start_date;
        $tournament->end_date = $request->end_date;
        $tournament->tournament_pic = $fileName;
        $tournament->location = $request->location;
        $tournament->created_by = Auth::id();

        $tournament->save();

        // Redirect nazad sa statusom
        return Redirect::route('tournaments.index')->with('status', 'Tournament created successfully');
    }

    public function show(Tournament $tournament)
    {
        return Inertia::render('Tournaments/Show', ['tournament' => $tournament]);
    }

    public function edit(Tournament $tournament)
    {
        return Inertia::render('Tournaments/Edit', ['tournament' => $tournament]);
    }

    public function update(Request $request, Tournament $tournament)
    {
        // Validacija
        $validatedData = $request->validate([
            'name' => 'required',
            'start_date' => 'required|date',
            'end_date' => 'required|date',
            'location' => 'required',
            'tournament_pic' => 'sometimes|image|mimes:jpeg,png,jpg,gif,svg|max:2048'
        ]);

        if ($request->hasFile('tournament_pic')) {
            $fileName = time() . '.' . $request->tournament_pic->extension();  
            $request->tournament_pic->move(public_path('tournament_pics'), $fileName);
            $tournament->tournament_pic = $fileName;
        }

        $tournament->name = $request->name;
        $tournament->start_date = $request->start_date;
        $tournament->end_date = $request->end_date;
        $tournament->location = $request->location;

        $tournament->save();

        return Redirect::route('tournaments.index')->with('status', 'Tournament updated successfully');
    }

    public function destroy(Tournament $tournament)
    {
        $tournament->delete();
        return Redirect::route('tournaments.index')->with('status', 'Tournament deleted successfully');
    }

 
}
