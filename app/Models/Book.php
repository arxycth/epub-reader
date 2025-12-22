<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Book extends Model
{
    protected $guarded = []; // paling simpel, semua kolom boleh diisi

    public function readingStats(): HasMany
    {
        return $this->hasMany(ReadingStat::class);
    }
}
