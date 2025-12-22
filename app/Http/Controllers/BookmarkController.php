<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Book;
use App\Models\Bookmark;

class BookmarkController extends Controller
{
    public function index(Book $book)
    {
        // if (auth()->id() !== $book->user_id) {
        //     abort(403, 'Unauthorized');
        // }
        
        $bookmarks = Bookmark::where('book_id', $book->id)
            ->where('user_id', auth()->id())
            ->orderBy('created_at', 'desc')->get();

        return response()->json($bookmarks);
    }

    public function store(Request $request, Book $book)
    {
        // if (auth()->id() !== $book->user_id) {
        //     abort(403, 'Unauthorized');
        // }
        
        $data = $request->validate([
            'cfi' => 'required|string',
            'label' => 'nullable|string|max:255',
        ]);

        $bm = Bookmark::create([
            'user_id' => auth()->id(),
            'book_id' => $book->id,
            'cfi' => $data['cfi'],
            'label' => $data['label'] ?? null,
        ]);

        return response()->json($bm);
    }

    public function destroy(Book $book, Bookmark $bookmark)
    {
        // if ($bookmark->user_id !== auth()->id()) {
        //     abort(403);
        // }

        $bookmark->delete();

        return response()->json(['success' => true]);
    }
}

