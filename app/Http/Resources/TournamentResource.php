<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TournamentResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray($request)
    {
        return [
            'tournament_id' => $this->id,
            'tournament_name' => $this->name,
            'tournament_date' => $this->start_date,
            'tournament_location' => $this->location,
            'tournament_pic' => $this->tournament_pic, 
        ];
    }
}
