<?php

use App\Http\Controllers\BookController;
use App\Http\Controllers\BookmarkController;
use App\Http\Controllers\HighlightController;
use App\Http\Controllers\ReadingStatController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
    
    Route::get('/books', [BookController::class, 'index'])->name('books.index');
    Route::get('/books/upload', [BookController::class, 'upload'])->name('books.upload');
    Route::post('/books/upload', [BookController::class, 'store'])->name('books.store');
    Route::get('/books/{book}', [BookController::class, 'show'])->name('books.show');
    Route::get('/books/{book}/file', [BookController::class, 'file'])->name('books.file');
    Route::delete('/books/{book}', [BookController::class, 'destroy'])->name('books.delete');

        // Bookmark
    Route::post('/books/{book}/bookmark', [BookmarkController::class, 'store'])->name('books.bookmark.store');
    Route::get('/books/{book}/bookmarks', [BookmarkController::class, 'index'])->name('books.bookmark.index');
    Route::delete('/books/{book}/bookmark/{bookmark}',[BookmarkController::class, 'destroy'])->name('books.bookmark.destroy');


    // Highlight
    Route::post('/books/{book}/highlight', [HighlightController::class, 'store'])->name('books.highlight.store');
    Route::get('/books/{book}/highlights', [HighlightController::class, 'index'])->name('books.highlight.index');
    Route::delete('/books/{book}/highlight/{highlight}', [HighlightController::class, 'destroy'])->name('books.highlight.destroy');

    // Reading stats
    Route::post('/books/{book}/stats', [ReadingStatController::class, 'update'])->name('books.stats.update');
});

require __DIR__.'/settings.php';
