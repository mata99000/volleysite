<?php

namespace App\Http\Controllers;
use App\Models\Tournament;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;


class TournamentController extends Controller
{
   public function add_tournament(Request $request){
                            // Validacija
                         

                $validatedData = $request->validate([
                    'name' => 'required',
                    'start_date' => 'required|date',
                    'location' => 'required',

                ]);

                $fileName = time().'.'.$request->tournament_pic->extension();  
                $request->tournament_pic->move(public_path('tournament_pics'), $fileName);
               
                // Formatiranje datuma
                $start_date = date("d-m-Y", strtotime($request->start_date));
                $end_date = date("d-m-Y", strtotime($request->end_date));

                // Kreiraj turnir
                $tournament = new Tournament;
                $tournament->name = $request->name;
                $tournament->start_date = $start_date; 
                $tournament->end_date = $end_date; 
                $tournament->tournament_pic = $fileName;
                $tournament->location = $request->location;
                

                $tournament->save();
                
                // Redirect nazad i trebalo bi da vrati tournaments u react... 

                return Redirect::to('/add_tournament');
 


    }
    public function tournament1_api(){
        $tournaments = Tournament::all();
       
        return response()->json($tournaments) ;
    }
    public function list(){
        $tournaments = Tournament::all();
       
        return response()->json($tournaments) ;
    }
    public function index()
    {

    }

 
}
