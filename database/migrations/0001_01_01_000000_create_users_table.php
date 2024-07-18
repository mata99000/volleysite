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
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('lastname')->nullable();
            $table->string('nickname')->nullable()->unique();
            $table->string('city')->nullable();
            $table->string('motto')->nullable();
            $table->string('dob')->nullable();
            $table->string('about')->nullable();
            $table->string('idol')->nullable();
            $table->string('image_name')->nullable();

            $table->string('phone_number')->nullable();
            $table->string('preffered_sports')->nullable();
            $table->integer('height')->nullable();
            $table->string('gender')->nullable();
            $table->integer('fav_num')->nullable();
            $table->integer('weight')->nullable();
            $table->string('club_id')->nullable();
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->rememberToken();
            $table->timestamps();
            
            
            
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};