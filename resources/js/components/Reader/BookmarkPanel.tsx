import { useTranslation } from 'react-i18next';

interface Bookmark {
    id: number;
    cfi: string;
    label: string;
    created_at?: string;
}

interface Props {
    isOpen: boolean;
    onClose: () => void;
    bookmarks: Bookmark[];
    onJump: (cfi: string) => void;
    onDelete: (id: number) => void;
}

export default function BookmarkPanel({
    isOpen,
    onClose,
    bookmarks,
    onJump,
    onDelete,
}: Props) {
    const { t } = useTranslation();

    return (
        <div
            className={`fixed top-0 left-0 z-50 h-full w-72 transform bg-white shadow-xl transition-transform duration-300 dark:bg-neutral-900 ${isOpen ? 'translate-x-0' : '-translate-x-full'} `}
        >
            <div className="flex items-center justify-between border-b p-4">
                <h2 className="text-lg font-semibold">
                    ⭐ {t('reader.bookmarks')}
                </h2>
                <button onClick={onClose} className="text-sm">
                    {t('common.close')}
                </button>
            </div>

            <div className="h-[calc(100%-64px)] space-y-2 overflow-y-auto p-4">
                {bookmarks.length === 0 && (
                    <p className="text-sm text-neutral-500">
                        {t('reader.no_bookmarks')}
                    </p>
                )}

                {bookmarks.map((b) => (
                    <div
                        key={b.id}
                        className="flex items-start gap-2 rounded bg-neutral-100 p-2 dark:border dark:border-neutral-700 dark:bg-neutral-800"
                    >
                        <button
                            className="flex-1 text-left"
                            onClick={() => onJump(b.cfi)}
                        >
                            <p className="line-clamp-1 text-sm font-medium dark:text-white">
                                {b.label}
                            </p>
                            <p className="truncate text-xs text-neutral-500">
                                {b.cfi}
                            </p>
                        </button>

                        <button
                            onClick={() => onDelete(b.id)}
                            className="text-xs text-red-500 hover:underline"
                            title={t('common.delete')}
                        >
                            ✕
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
