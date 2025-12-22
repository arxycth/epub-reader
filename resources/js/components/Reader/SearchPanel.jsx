import React from 'react';
import { useTranslation } from 'react-i18next';

export default function SearchPanel({
    isOpen,
    onClose,
    results,
    onSearch,
    onSelect,
}) {
    const { t } = useTranslation();
    const [query, setQuery] = React.useState('');

    const submit = (e) => {
        e.preventDefault();
        onSearch(query);
    };

    return (
        <div
            className={`fixed top-0 right-0 z-50 h-full w-72 transform bg-white shadow-xl transition-transform duration-300 dark:bg-neutral-900 ${isOpen ? 'translate-x-0' : 'translate-x-full'} `}
        >
            <div className="flex items-center justify-between border-b p-4">
                <h2 className="text-lg font-semibold">{t('reader.search')}</h2>
                <button onClick={onClose} className="text-sm">
                    {t('common.close')}
                </button>
            </div>

            <form onSubmit={submit} className="border-b p-4">
                <input
                    type="text"
                    placeholder={t('common.search_placeholder')}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full rounded border p-2 dark:border-neutral-700 dark:bg-neutral-800"
                />
                <button className="mt-2 w-full rounded bg-blue-500 p-2 text-white transition-colors hover:bg-blue-600">
                    {t('reader.search')}
                </button>
            </form>

            <div className="h-[calc(100%-140px)] space-y-3 overflow-y-auto p-4">
                {results.length === 0 && (
                    <p className="text-sm text-neutral-500">
                        {t('index.not_found')}
                    </p>
                )}

                {results.map((res, idx) => (
                    <button
                        key={idx}
                        className="w-full rounded bg-neutral-100 p-2 text-left hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700"
                        onClick={() => onSelect(res.cfi)}
                    >
                        <p className="mb-1 text-xs text-neutral-500">
                            {res.chapter}
                        </p>
                        <p className="line-clamp-2 text-sm">{res.excerpt}</p>
                    </button>
                ))}
            </div>
        </div>
    );
}
