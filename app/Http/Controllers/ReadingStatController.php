<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Book;
use App\Models\ReadingStat;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class ReadingStatController extends Controller
{
// App/Http/Controllers/ReadingStatController.php
// App/Http/Controllers/ReadingStatController.php
public function update(Request $request, Book $book)
    {
        $data = $request->validate([
            'seconds' => 'required|integer|min:0',
            'last_cfi' => 'nullable|string',
            'progress' => 'nullable|numeric',
            'pages_read' => 'nullable|integer', // <--- Pastikan ini divalidasi
        ]);

        $stat = ReadingStat::firstOrCreate(
            ['user_id' => auth()->id(), 'book_id' => $book->id],
            ['total_seconds' => 0, 'progress' => 0, 'pages_read' => 0]
        );

        $stat->increment('total_seconds', $data['seconds']);

        if (!empty($data['last_cfi'])) {
            $stat->last_cfi = $data['last_cfi'];
            $stat->last_read_at = now();
            
            if (isset($data['progress'])) {
                $stat->progress = $data['progress'];
            }
            
            // --- SIMPAN PAGES READ ---
            if (isset($data['pages_read'])) {
                $stat->pages_read = $data['pages_read'];
            }
            
            $stat->save();
        } else {
            $stat->touch();
        }

        return response()->json($stat);
    }
}

