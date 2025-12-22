<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('reading_stats', function (Blueprint $table) {
            $table->integer('pages_read')->default(0)->after('progress');
        });
    }

    public function down(): void
    {
        Schema::table('reading_stats', function (Blueprint $table) {
            $table->dropColumn('pages_read');
        });
    }
};
