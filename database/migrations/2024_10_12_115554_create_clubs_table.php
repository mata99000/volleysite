<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('clubs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade'); // Dodaj user_id kolonu
            $table->string('name');
            $table->string('country')->nullable();
            $table->string('city')->nullable();
            $table->string('tournaments')->nullable();
            $table->string('roster')->nullable();
            $table->string('socials')->nullable();
            $table->string('club_pic')->nullable();
            $table->timestamps();
        });
        Schema::create('club_members', function (Blueprint $table) {
            $table->id();
            $table->foreignId('club_id')->constrained()->onDelete('cascade');
            $table->foreignId('user_id')->constrained()->onDelete('cascade'); // Član kluba
            $table->enum('status', ['pending', 'accepted', 'rejected'])->default('pending'); // Status članstva
            $table->timestamps();
        });
    }
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('clubs');
    }
};
