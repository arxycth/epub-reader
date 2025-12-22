import { useTranslation } from 'react-i18next';

export default function TOCPanel({ toc, onSelect, isOpen, onClose }) {
    const { t } = useTranslation();

    return (
        <div
            className={`fixed top-0 left-0 z-50 h-full w-64 transform bg-white shadow-xl transition-transform duration-300 dark:bg-neutral-900 ${isOpen ? 'translate-x-0' : '-translate-x-full'} `}
        >
            <div className="flex items-center justify-between border-b p-4">
                <h2 className="text-lg font-semibold">{t('reader.toc')}</h2>
                <button onClick={onClose} className="text-sm">
                    {t('common.close')}
                </button>
            </div>

            <div className="h-[calc(100%-60px)] space-y-2 overflow-y-auto p-4">
                {toc.map((item) => (
                    <button
                        key={item.href}
                        onClick={() => onSelect(item.href)}
                        className="block w-full rounded p-2 text-left hover:bg-neutral-200 dark:hover:bg-neutral-800"
                    >
                        {item.label || item.title}
                    </button>
                ))}
            </div>
        </div>
    );
}
