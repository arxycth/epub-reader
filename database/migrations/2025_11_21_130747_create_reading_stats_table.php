<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
// database/migrations/xxxx_xx_xx_create_reading_stats_table.php
    public function up(): void
    {
        Schema::create('reading_stats', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('book_id')->constrained()->cascadeOnDelete();
            $table->integer('total_seconds')->default(0);
            $table->float('progress', 5)->default(0); // Tambahan: Menyimpan 0.00 - 100.00%
            $table->string('last_cfi')->nullable();
            $table->timestamp('last_read_at')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reading_stats');
    }
};
