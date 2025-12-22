<?php

namespace App\Http\Controllers;

use App\Models\book;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class BookController extends Controller
{
    public function index(Request $request)
    {
        // 1. Query dasar dengan Eager Loading (Ambil status baca user yg login saja)
        $query = Book::with(['readingStats' => function($q) {
            $q->where('user_id', auth()->id());
        }]);

        // 2. Filter Program Studi
        if ($request->filled('program_study')) {
            $query->where('program_study', $request->program_study);
        }

        // 3. Filter Pencarian (Judul / Penulis)
        if ($request->filled('q')) {
            $q = $request->q;
            $query->where(function($qbuilder) use ($q) {
                $qbuilder->where('title', 'like', "%{$q}%")
                         ->orWhere('authors', 'like', "%{$q}%");
            });
        }

        $perPage = 12;

        // 4. Paginate + Transformasi Data (Inject Progress & Pages Read)
        $books = $query->orderBy('created_at', 'desc')
            ->paginate($perPage)
            ->withQueryString()
            ->through(function ($book) {
                // Ambil statistik pertama (karena sudah difilter by user_id di atas)
                $stat = $book->readingStats->first();

                return [
                    'id' => $book->id,
                    'title' => $book->title,
                    'authors' => $book->authors,
                    'cover' => $book->cover, // Pastikan kolom ini ada di DB
                    'program_study' => $book->program_study,
                    'created_at' => $book->created_at,
                    
                    // --- DATA BARU UNTUK PROGRESS BAR ---
                    'progress' => $stat ? (int) $stat->progress : 0,
                    'pages_read' => $stat ? (int) $stat->pages_read : 0,
                ];
            });

        // Optional: Program Study List
        $programStudies = [
            ['key' => '', 'label' => 'Semua Program Studi'],
            ['key' => 'TI', 'label' => 'Teknik Informatika'],
            ['key' => 'SI', 'label' => 'Sistem Informasi'],
            ['key' => 'BIO', 'label' => 'Biologi'],
            ['key' => 'KIM', 'label' => 'Kimia'],
            ['key' => 'FIS', 'label' => 'Fisika'],
            ['key' => 'ALGI', 'label' => 'Agroteknologi'], // Typo fix: Algikultur -> Agroteknologi/Agrikultur?
            ['key' => 'MAT', 'label' => 'Matematika'],
        ];

        return Inertia::render('Books/Index', [
            'books' => $books,
            'filters' => [
                'program_study' => $request->program_study,
                'q' => $request->q,
            ],
            'programStudies' => $programStudies,
        ]);
    }


    public function upload()
    {
        return Inertia::render('Books/Upload');
    }

public function store(Request $request)
{
    $request->validate([
        'epub' => 'required|file|mimes:epub|max:30000',
        'cover' => 'nullable|image|mimes:jpeg,png,jpg|max:10000', // Validasi cover
        'program_study' => 'required',
        'title' => 'required',
        'authors' => 'required', // Tambahkan validasi author
    ]);

    // 1. Handle Upload ePub
    $epubFile = $request->file('epub');
    $epubFilename = time() . '-' . $epubFile->getClientOriginalName();
    $epubFile->move(storage_path('app/public/epubs'), $epubFilename);

    // 2. Handle Upload Cover (Jika ada)
    $coverFilename = null;
    if ($request->hasFile('cover')) {
        $coverFile = $request->file('cover');
        $coverFilename = time() . '-cover-' . $coverFile->getClientOriginalName();
        $coverFile->move(storage_path('app/public/covers'), $coverFilename);
    }

    // 3. Simpan ke Database
    Book::create([
        'user_id' => auth()->id(),
        'title' => $request->title,
        'authors' => $request->authors,
        'filename' => $epubFilename,
        'cover' => $coverFilename, // Simpan nama file cover
        'program_study' => $request->program_study,
    ]);

    return redirect()->route('books.index')
        ->with('success', 'Book and Cover uploaded successfully!');
}




    public function show(Book $book)
    {
        // if (auth()->id() !== $book->user_id) {
        //     abort(403, 'Unauthorized');
        // }
        // dd(url(Storage::url('epubs/' . $book->filename)));
        return Inertia::render('Books/Reader', [
            'book' => $book,
            'fileUrl' => url(Storage::url('epubs/' . $book->filename)),
        ]);
    }

public function file(Book $book)
{
    // Optional: akses publik bisa dihapus cek auth
    // if (auth()->id() !== $book->user_id) {
    //     abort(403, 'Unauthorized');
    // }

    $path = storage_path('app/public/epubs/' . $book->filename);
    dd($path);

    if (!file_exists($path)) {
        abort(404, 'File not found');
    }

    return response()->file($path, [
        'Content-Type' => 'application/epub+zip',
        'Content-Disposition' => 'inline; filename="' . $book->filename . '"'
    ]);
}


    public function destroy(Book $book)
    {
        if (auth()->id() !== $book->user_id) {
            abort(403, 'Unauthorized');
        }
        
        Storage::delete('public/epubs/' . $book->filename);
        $book->delete();
        return redirect()->route('books.index');
    }
}

