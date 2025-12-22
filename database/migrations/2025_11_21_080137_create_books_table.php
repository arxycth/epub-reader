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
        Schema::create('books', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id'); // uploader
            $table->string('title');
            $table->string('filename'); // nama file disimpan di storage
            $table->string('program_study'); // kategori FST
            $table->string('cover')->nullable(); // bisa ekstrak
            $table->string('authors');
            $table->json('metadata')->nullable(); 
            $table->json('toc')->nullable(); // table of content (opsional)
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users')->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('books');
    }
};
