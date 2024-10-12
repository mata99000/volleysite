<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Club extends Model
{
    use HasFactory;

    protected $fillable = [
         'name', 'country', 'city', 'tournaments', 'roster', 'socials', 'club_pic','user_id'
    ];
}
