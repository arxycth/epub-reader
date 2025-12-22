import BookCard from '@/components/Books/BookCard';
import AppLayout from '@/layouts/app-layout';
import { PageProps as InertiaPageProps } from '@inertiajs/core';
import { Link, router, usePage } from '@inertiajs/react';
import { FormEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';

// Interfaces tetap sama...
interface Book {
    id: number;
    title: string;
    authors: string;
    cover: string | null;
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
    meta?: PaginationMeta;
    links?: PaginationLink[];
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
interface IndexPageProps extends InertiaPageProps {
    books: PaginationData;
    programStudies: ProgramStudyOption[];
    filters: FilterProps;
}

export default function Index() {
    const { t } = useTranslation();
    const { books, programStudies, filters } = usePage<IndexPageProps>().props;

    const booksList: Book[] = books.data || [];
    const meta = books.meta || books;

    const [search, setSearch] = useState(filters.q || '');
    const [selectedProdi, setSelectedProdi] = useState(
        filters.program_study || '',
    );
    const [isLoading, setIsLoading] = useState(false);

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
            },
        );
    };

    return (
        <AppLayout>
            <div className="min-h-screen bg-neutral-50 p-6 md:p-12 dark:bg-neutral-950">
                <div className="mx-auto max-w-7xl">
                    <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-white">
                                {t('index.title')}
                            </h1>
                            <p className="mt-1 text-neutral-500 dark:text-neutral-400">
                                {t('index.subtitle')}
                            </p>
                        </div>
                        <Link
                            href={route('books.upload')}
                            className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow-md transition-all hover:bg-blue-700 active:scale-95"
                        >
                            <svg
                                className="mr-2 -ml-1 h-5 w-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                                />
                            </svg>
                            {t('index.upload_btn')}
                        </Link>
                    </div>

                    <div className="mb-10 rounded-xl border border-neutral-200 bg-white p-4 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
                        <form
                            onSubmit={handleSearch}
                            className="flex flex-col gap-4 md:flex-row"
                        >
                            <div className="relative flex-1">
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                    <svg
                                        className="h-5 w-5 text-neutral-400"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                        />
                                    </svg>
                                </div>
                                <input
                                    type="text"
                                    placeholder={t('common.search_placeholder')}
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="block w-full rounded-lg border border-neutral-300 bg-neutral-50 p-2.5 pl-10 text-sm text-neutral-900 focus:border-blue-500 focus:ring-blue-500 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
                                />
                            </div>
                            <div className="md:w-1/4">
                                <select
                                    value={selectedProdi}
                                    onChange={(e) =>
                                        setSelectedProdi(e.target.value)
                                    }
                                    className="block w-full rounded-lg border border-neutral-300 bg-neutral-50 p-2.5 text-sm text-neutral-900 focus:border-blue-500 focus:ring-blue-500 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
                                >
                                    {programStudies.map((p) => (
                                        <option key={p.key} value={p.key}>
                                            {p.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="rounded-lg bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-neutral-800 disabled:opacity-50 dark:bg-white dark:text-black"
                            >
                                {isLoading
                                    ? t('common.loading')
                                    : t('common.apply_filter')}
                            </button>
                        </form>
                    </div>

                    {booksList.length > 0 ? (
                        <>
                            <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                                {booksList.map((book) => (
                                    <BookCard
                                        key={book.id}
                                        book={{
                                            ...book,
                                            cover:
                                                book.cover ||
                                                '/images/default-cover.png',
                                        }}
                                    />
                                ))}
                            </div>
                            <div className="mt-12 flex justify-center">
                                <div className="flex items-center gap-2">
                                    {(meta.current_page || 1) > 1 && (
                                        <Link
                                            href={route('books.index', {
                                                page:
                                                    (meta.current_page || 1) -
                                                    1,
                                                q: search,
                                                program_study: selectedProdi,
                                            })}
                                            className="flex items-center justify-center rounded-lg border border-neutral-300 bg-white px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50"
                                        >
                                            {t('common.prev')}
                                        </Link>
                                    )}
                                    <span className="text-sm text-neutral-500">
                                        {t('common.page')} {meta.current_page}
                                    </span>
                                    {(meta.current_page || 1) <
                                        (meta.last_page || 1) && (
                                        <Link
                                            href={route('books.index', {
                                                page:
                                                    (meta.current_page || 1) +
                                                    1,
                                                q: search,
                                                program_study: selectedProdi,
                                            })}
                                            className="flex items-center justify-center rounded-lg border border-neutral-300 bg-white px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50"
                                        >
                                            {t('common.next')}
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="flex min-h-[400px] flex-col items-center justify-center rounded-xl border-2 border-dashed border-neutral-200 bg-neutral-50 text-center dark:border-neutral-800">
                            <h3 className="text-lg font-medium text-neutral-900 dark:text-white">
                                {t('index.not_found')}
                            </h3>
                            <p className="mt-1 max-w-sm text-sm text-neutral-500">
                                {t('index.not_found_sub')}
                            </p>
                            <button
                                onClick={() => {
                                    setSearch('');
                                    setSelectedProdi('');
                                    router.get(route('books.index'));
                                }}
                                className="mt-4 text-sm font-medium text-blue-600"
                            >
                                {t('index.clear_filter')}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
