<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Book;
use App\Models\Highlight;

class HighlightController extends Controller
{
    public function index(Book $book)
    {
        if (auth()->id() !== $book->user_id) {
            abort(403, 'Unauthorized');
        }
        
        $highlights = Highlight::where('book_id', $book->id)
            ->where('user_id', auth()->id())
            ->orderBy('created_at', 'asc')->get();

        return response()->json($highlights);
    }

    public function store(Request $request, Book $book)
    {
        if (auth()->id() !== $book->user_id) {
            abort(403, 'Unauthorized');
        }
        
        $data = $request->validate([
            'cfi_range' => 'required|string',
            'text' => 'required|string',
            'note' => 'nullable|string',
            'color' => 'nullable|string',
        ]);

        $h = Highlight::create([
            'user_id' => auth()->id(),
            'book_id' => $book->id,
            'cfi_range' => $data['cfi_range'],
            'text' => $data['text'],
            'note' => $data['note'] ?? null,
            'color' => $data['color'] ?? 'yellow',
        ]);

        return redirect()->back()->with('success', 'Highlight saved');
    }

    public function destroy(Book $book, Highlight $highlight)
    {
        if (auth()->id() !== $book->user_id) {
            abort(403, 'Unauthorized');
        }
        
        $highlight->delete();
        return response()->json(['deleted' => true]);
    }
}

