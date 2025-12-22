import { Link, router } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';

interface Book {
    id: number;
    title: string;
    authors: string | null;
    cover: string | null;
    program_study: string;
    progress?: number;
    pages_read?: number;
    [key: string]: any;
}

export default function BookCard({ book }: { book: Book }) {
    const { t } = useTranslation();

    const handleDelete = () => {
        if (!window.confirm(t('card.confirm_delete', { title: book.title })))
            return;
        router.delete(route('books.delete', book.id));
    };

    const imageUrl = book.cover ? `/storage/covers/${book.cover}` : null;
    const progress = book.progress || 0;
    const pagesRead = book.pages_read || 0;
    const isStarted = progress > 0;

    return (
        <div className="group relative flex flex-col overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900">
            <div className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-100 dark:bg-neutral-800">
                {imageUrl && (
                    <img
                        src={imageUrl}
                        alt={book.title}
                        className="h-full w-full object-cover transition-transform group-hover:scale-105"
                    />
                )}
                <div className="absolute top-2 left-2 rounded bg-black/60 px-2 py-0.5 text-[10px] font-bold text-white">
                    {book.program_study}
                </div>
            </div>

            <div className="flex flex-1 flex-col p-4">
                <h3 className="mb-1 line-clamp-2 text-sm font-bold text-neutral-900 dark:text-white">
                    {book.title}
                </h3>
                <p className="mb-3 text-xs text-neutral-500 dark:text-neutral-400">
                    {book.authors || t('card.unknown_author')}
                </p>

                {isStarted ? (
                    <div className="mb-4 rounded-lg border bg-neutral-50 p-2 dark:bg-neutral-800">
                        <div className="mb-1 flex items-center justify-between text-[10px] font-medium">
                            <span className="text-neutral-500">
                                {t('card.progress')}
                            </span>
                            <span className="font-bold text-blue-600">
                                {progress}%
                            </span>
                        </div>
                        <div className="h-1.5 w-full rounded-full bg-neutral-200 dark:bg-neutral-700">
                            <div
                                className="h-full rounded-full bg-blue-600"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                        <div className="mt-2 text-[10px] text-neutral-500">
                            <strong>{pagesRead}</strong> {t('card.pages_read')}
                        </div>
                    </div>
                ) : (
                    <div className="mb-4 flex h-[62px] items-center justify-center rounded-lg border border-dashed border-neutral-200 text-[10px] text-neutral-400">
                        {t('card.not_started')}
                    </div>
                )}

                <div className="mt-auto flex items-center justify-between gap-2 border-t pt-3">
                    <Link
                        href={route('books.show', book.id)}
                        className="inline-flex items-center rounded-md bg-neutral-900 px-3 py-1.5 text-xs font-medium text-white dark:bg-white dark:text-neutral-900"
                    >
                        {isStarted
                            ? t('card.continue_read')
                            : t('card.start_read')}
                    </Link>
                    <button
                        onClick={handleDelete}
                        className="text-neutral-400 hover:text-red-600"
                    >
                        ✕
                    </button>
                </div>
            </div>
        </div>
    );
}
