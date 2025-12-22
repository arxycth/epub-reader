import React, { useState, FormEvent } from 'react';
import AppLayout from '@/layouts/app-layout';
import BookCard from '@/components/Books/BookCard'; // Pastikan komponen ini ada
import { Link, usePage, router } from '@inertiajs/react';
import { PageProps as InertiaPageProps } from '@inertiajs/core';

// ---------------- 1. Strict Types Definition ---------------- //

interface Book {
    id: number;
    title: string;
    authors: string; // Sesuai database (bisa string nama penulis)
    cover: string | null; // URL lengkap dari backend
    program_study: string;
    [key: string]: unknown;
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginationMeta {
    current_page: number;
    last_page: number;
    from: number;
    to: number;
    total: number;
    links: PaginationLink[];
}

interface PaginationData {
    data: Book[];
    meta?: PaginationMeta; // Laravel Resource standard
    links?: PaginationLink[]; // Laravel Simple Paginate standard
    // Fallback untuk standard pagination object
    current_page?: number;
    last_page?: number;
    [key: string]: unknown;
}

interface FilterProps {
    q?: string;
    program_study?: string;
}

interface ProgramStudyOption {
    key: string;
    label: string;
}

// Menggabungkan props bawaan Inertia dengan props halaman kita
interface IndexPageProps extends InertiaPageProps {
    books: PaginationData;
    programStudies: ProgramStudyOption[];
    filters: FilterProps;
}

// ---------------- 2. Component Implementation ---------------- //

export default function Index() {
    // Casting props ke tipe yang sudah kita buat
    const { books, programStudies, filters } = usePage<IndexPageProps>().props;

    // Normalisasi data pagination (menangani variasi output Laravel)
    const booksList: Book[] = books.data || [];
    const meta = books.meta || books; // Handle jika pakai API Resource atau Pagination biasa

    // State untuk filter
    const [search, setSearch] = useState(filters.q || '');
    const [selectedProdi, setSelectedProdi] = useState(filters.program_study || '');
    const [isLoading, setIsLoading] = useState(false);

    // Handle Search menggunakan Inertia Router (Tanpa Reload Halaman)
    const handleSearch = (e: FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        router.get(
            route('books.index'),
            { q: search, program_study: selectedProdi },
            {
                preserveState: true,
                preserveScroll: true,
                onFinish: () => setIsLoading(false),
            }
        );
    };

    return (
        <AppLayout>
            <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 p-6 md:p-12">
                
                {/* Header Section */}
                <div className="mx-auto max-w-7xl">
                    <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-white">
                                Perpustakaan Digital
                            </h1>
                            <p className="mt-1 text-neutral-500 dark:text-neutral-400">
                                Jelajahi koleksi ePub karya mahasiswa dan dosen FST.
                            </p>
                        </div>

                        <Link
                            href={route('books.upload')} // Pastikan route name sesuai (books.create atau books.upload)
                            className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all shadow-md active:scale-95"
                        >
                            <svg className="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                            </svg>
                            Upload Buku
                        </Link>
                    </div>

                    {/* Filter Bar */}
                    <div className="mb-10 rounded-xl bg-white p-4 shadow-sm border border-neutral-200 dark:bg-neutral-900 dark:border-neutral-800">
                        <form onSubmit={handleSearch} className="flex flex-col gap-4 md:flex-row">
                            {/* Search Input */}
                            <div className="relative flex-1">
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                    <svg className="h-5 w-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </div>
                                <input
                                    type="text"
                                    placeholder="Cari judul buku atau penulis..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="block w-full rounded-lg border border-neutral-300 bg-neutral-50 p-2.5 pl-10 text-sm text-neutral-900 focus:border-blue-500 focus:ring-blue-500 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white dark:placeholder-neutral-400"
                                />
                            </div>

                            {/* Dropdown Prodi */}
                            <div className="md:w-1/4">
                                <select
                                    value={selectedProdi}
                                    onChange={(e) => setSelectedProdi(e.target.value)}
                                    className="block w-full rounded-lg border border-neutral-300 bg-neutral-50 p-2.5 text-sm text-neutral-900 focus:border-blue-500 focus:ring-blue-500 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
                                >
                                    {programStudies.map((p) => (
                                        <option key={p.key} value={p.key}>
                                            {p.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="rounded-lg bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-neutral-800 focus:outline-none focus:ring-4 focus:ring-neutral-300 disabled:opacity-50 dark:bg-white dark:text-black dark:hover:bg-neutral-200"
                            >
                                {isLoading ? 'Memuat...' : 'Terapkan Filter'}
                            </button>
                        </form>
                    </div>

                    {/* Content Grid */}
                    {booksList.length > 0 ? (
                        <>
                            <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                                {booksList.map((book) => (
                                    <BookCard
                                        key={book.id}
                                        book={{
                                            ...book,
                                            // Fallback image jika cover_url null
                                            cover: book.cover || '/images/default-cover.png' 
                                        }}
                                    />
                                ))}
                            </div>

                            {/* Pagination */}
                            <div className="mt-12 flex justify-center">
                                {/* Komponen Pagination Sederhana */}
                                <div className="flex items-center gap-2">
                                    {(meta.current_page || 1) > 1 && (
                                        <Link
                                            href={route('books.index', { page: (meta.current_page || 1) - 1, q: search, program_study: selectedProdi })}
                                            className="flex items-center justify-center rounded-lg border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-700"
                                        >
                                            Sebelumnya
                                        </Link>
                                    )}
                                    
                                    <span className="text-sm text-neutral-500">
                                        Hal {meta.current_page}
                                    </span>

                                    {(meta.current_page || 1) < (meta.last_page || 1) && (
                                        <Link
                                            href={route('books.index', { page: (meta.current_page || 1) + 1, q: search, program_study: selectedProdi })}
                                            className="flex items-center justify-center rounded-lg border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-700"
                                        >
                                            Selanjutnya
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </>
                    ) : (
                        // Empty State Design
                        <div className="flex min-h-[400px] flex-col items-center justify-center rounded-xl border-2 border-dashed border-neutral-200 bg-neutral-50 text-center dark:border-neutral-800 dark:bg-neutral-900/50">
                            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-800">
                                <svg className="h-8 w-8 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-medium text-neutral-900 dark:text-white">Tidak ada buku ditemukan</h3>
                            <p className="mt-1 max-w-sm text-sm text-neutral-500">
                                Coba ubah kata kunci pencarian atau kategori program studi Anda.
                            </p>
                            <button 
                                onClick={() => { setSearch(''); setSelectedProdi(''); router.get(route('books.index')); }}
                                className="mt-4 text-sm font-medium text-blue-600 hover:text-blue-500"
                            >
                                Hapus semua filter
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}