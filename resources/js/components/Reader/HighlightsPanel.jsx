import { useTranslation } from 'react-i18next';

export default function HighlightsPanel({
    isOpen,
    onClose,
    highlights,
    onJump,
    onDelete,
}) {
    const { t } = useTranslation();

    return (
        <div
            className={`fixed top-0 right-0 z-50 h-full w-80 transform bg-white shadow-xl transition-transform duration-300 dark:bg-neutral-900 ${isOpen ? 'translate-x-0' : 'translate-x-full'} `}
        >
            <div className="flex items-center justify-between border-b p-4">
                <h2 className="text-lg font-semibold">
                    {t('reader.highlights')}
                </h2>
                <button onClick={onClose} className="text-sm">
                    {t('common.close')}
                </button>
            </div>

            <div className="h-[calc(100%-60px)] space-y-3 overflow-y-auto p-3">
                {highlights.length === 0 && (
                    <p className="text-sm text-neutral-500">
                        {t('reader.no_highlights')}
                    </p>
                )}

                {highlights.map((h) => (
                    <div
                        key={h.id}
                        className="rounded border bg-neutral-50 p-2 dark:border-neutral-700 dark:bg-neutral-800"
                    >
                        <div className="flex items-start justify-between">
                            <div className="flex-1">
                                <p className="mb-1 text-xs text-neutral-500">
                                    #{h.id} •{' '}
                                    {new Date(h.created_at).toLocaleString()}
                                </p>
                                <p className="mb-1 line-clamp-3 text-sm">
                                    {h.text}
                                </p>
                                {h.note && (
                                    <p className="text-sm text-neutral-500 italic">
                                        “{h.note}”
                                    </p>
                                )}
                            </div>

                            <div className="ml-2 flex flex-col gap-1">
                                <button
                                    onClick={() => onJump(h.cfi_range)}
                                    className="rounded border px-2 py-1 text-xs hover:bg-neutral-200 dark:hover:bg-neutral-700"
                                >
                                    Go
                                </button>
                                <button
                                    onClick={() => onDelete(h.id)}
                                    className="rounded border px-2 py-1 text-xs text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                                >
                                    {t('common.delete')}
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
