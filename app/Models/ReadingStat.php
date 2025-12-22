<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ReadingStat extends Model
{
    protected $guarded = []; // boleh semua

    public function book(): BelongsTo
    {
        return $this->belongsTo(Book::class);
    }

    // Relasi: Statistik ini milik satu User
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
