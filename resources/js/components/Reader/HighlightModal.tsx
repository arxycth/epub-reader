import React from 'react';
import { useTranslation } from 'react-i18next';

interface HighlightModalProps {
    open: boolean;
    onClose: () => void;
    onSave: (data: { note: string; color: string }) => void;
    selectedText: string;
}

export default function HighlightModal({
    open,
    onClose,
    onSave,
    selectedText,
}: HighlightModalProps) {
    const { t } = useTranslation();
    const [note, setNote] = React.useState<string>('');
    const [color, setColor] = React.useState<string>('yellow');

    React.useEffect(() => {
        if (!open) {
            setNote('');
            setColor('yellow');
        }
    }, [open]);

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/50" onClick={onClose} />
            <div className="relative z-70 w-full max-w-lg rounded-lg bg-white p-4 shadow-lg dark:bg-neutral-900">
                <h3 className="mb-2 text-lg font-semibold dark:text-white">
                    {t('reader.save_highlight')}
                </h3>

                <div className="mb-2">
                    <label className="mb-1 block text-sm text-neutral-600 dark:text-neutral-400">
                        {t('reader.text_label')}
                    </label>
                    <div className="rounded border bg-neutral-50 p-2 text-sm dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200">
                        {selectedText}
                    </div>
                </div>

                <div className="mb-2">
                    <label className="mb-1 block text-sm text-neutral-600 dark:text-neutral-400">
                        {t('reader.note_label')}
                    </label>
                    <textarea
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        className="h-24 w-full rounded border bg-white p-2 dark:border-neutral-700 dark:bg-neutral-900 dark:text-white"
                        placeholder={t('reader.note_placeholder')}
                    />
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <label className="text-sm dark:text-neutral-300">
                            {t('reader.color_yellow')}
                        </label>
                        <input type="text" hidden value="yellow" readOnly />
                    </div>

                    <div className="flex gap-2">
                        <button
                            onClick={onClose}
                            className="rounded border px-3 py-1 hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-800"
                        >
                            {t('common.cancel')}
                        </button>
                        <button
                            onClick={() => onSave({ note, color })}
                            className="rounded bg-blue-600 px-3 py-1 text-white hover:bg-blue-700"
                        >
                            {t('common.save')}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
