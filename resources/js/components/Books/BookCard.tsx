import React from 'react';
import { Link, router } from '@inertiajs/react';

interface Book {
    id: number;
    title: string;
    authors: string | null;
    cover: string | null;
    program_study: string;
    progress?: number;     // Persentase (0-100)
    pages_read?: number;   // Jumlah halaman (misal: 150)
    [key: string]: any;
}

interface Props {
    book: Book;
}

export default function BookCard({ book }: Props) {

    const handleDelete = () => {
        if (!window.confirm(`Hapus buku "${book.title}"?`)) return;
        router.delete(route('books.delete', book.id));
    };

    const imageUrl = book.cover ? `/storage/covers/${book.cover}` : null;
    
    // Default value 0 jika data null
    const progress = book.progress || 0;
    const pagesRead = book.pages_read || 0;
    const isStarted = progress > 0;

    return (
        <div className="group relative flex flex-col overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900">
            
            {/* --- BAGIAN GAMBAR --- */}
            <div className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-100 dark:bg-neutral-800">
                {imageUrl ? (
                    <img 
                        src={imageUrl} 
                        alt={book.title} 
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        onError={(e) => {
                            e.currentTarget.style.display = 'none'; 
                            e.currentTarget.nextElementSibling?.classList.remove('hidden');
                        }}
                    />
                ) : null}

                {/* Placeholder jika gambar error/kosong */}
                <div className={`absolute inset-0 flex flex-col items-center justify-center p-4 text-center text-neutral-400 ${imageUrl ? 'hidden' : ''}`}>
                    <span className="text-xs font-medium">No Cover</span>
                </div>

                <div className="absolute left-2 top-2 rounded bg-black/60 px-2 py-0.5 text-[10px] font-bold text-white backdrop-blur-sm">
                    {book.program_study}
                </div>
            </div>

            {/* --- BAGIAN INFO --- */}
            <div className="flex flex-1 flex-col p-4">
                <h3 className="mb-1 line-clamp-2 text-sm font-bold text-neutral-900 dark:text-white" title={book.title}>
                    {book.title}
                </h3>

                <p className="mb-3 text-xs text-neutral-500 line-clamp-1 dark:text-neutral-400">
                    {book.authors || 'Penulis tidak diketahui'}
                </p>

                {/* --- STATISTIK BACA (Progress & Halaman) --- */}
                {isStarted ? (
                    <div className="mb-4 rounded-lg bg-neutral-50 p-2 border border-neutral-100 dark:bg-neutral-800 dark:border-neutral-700">
                        {/* Bar Progress */}
                        <div className="mb-1 flex items-center justify-between text-[10px] font-medium">
                            <span className="text-neutral-500">Progress</span>
                            <span className="text-blue-600 font-bold">{progress}%</span>
                        </div>
                        <div className="h-1.5 w-full overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-700">
                            <div 
                                className="h-full rounded-full bg-blue-600" 
                                style={{ width: `${progress}%` }} 
                            />
                        </div>

                        {/* Info Halaman Terbaca */}
                        <div className="mt-2 flex items-center gap-1 text-[10px] text-neutral-500">
                            <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                            <span>
                                <strong>{pagesRead}</strong> Halaman terbaca
                            </span>
                        </div>
                    </div>
                ) : (
                    // Spacer jika belum pernah dibaca
                    <div className="mb-4 flex h-[62px] items-center justify-center rounded-lg border border-dashed border-neutral-200 bg-neutral-50 text-[10px] text-neutral-400 dark:border-neutral-800 dark:bg-neutral-900/50">
                        Belum dibaca
                    </div>
                )}

                {/* --- TOMBOL AKSI --- */}
                <div className="mt-auto flex items-center justify-between gap-2 border-t border-neutral-100 pt-3 dark:border-neutral-800">
                    <div className="flex gap-2">
                        <Link 
                            href={route('books.show', book.id)} 
                            className="inline-flex items-center rounded-md bg-neutral-900 px-3 py-1.5 text-xs font-medium text-white hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200"
                        >
                            {isStarted ? 'Lanjut Baca' : 'Mulai Baca'}
                        </Link>

                        <a
                            href={route('books.file', book.id)}
                            className="inline-flex items-center justify-center rounded-md border border-neutral-200 bg-white px-2 py-1.5 text-neutral-500 hover:bg-neutral-50 hover:text-neutral-900 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-400"
                            target="_blank"
                            title="Download File"
                        >
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4-4m0 0l-4 4m4-4v12" />
                            </svg>
                        </a>
                    </div>

                    <button
                        onClick={handleDelete}
                        className="rounded-md p-1.5 text-neutral-400 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20"
                        title="Hapus Buku"
                    >
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}