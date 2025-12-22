import AppLayout from '@/layouts/app-layout';
import books from '@/routes/books';
import { useForm } from '@inertiajs/react';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next'; // 🔥 Tambahkan import ini

interface UploadForm {
    title: string;
    authors: string;
    program_study: string;
    epub: File | null;
    cover: File | null;
}

export default function Upload() {
    const { t } = useTranslation(); // 🔥 Inisialisasi hook i18n

    // State untuk menyimpan URL preview gambar
    const [preview, setPreview] = useState<string | null>(null);

    const { data, setData, post, processing, errors } = useForm<UploadForm>({
        title: '',
        authors: '',
        program_study: '',
        epub: null,
        cover: null,
    });

    // Otomatis membuat preview saat file cover dipilih
    useEffect(() => {
        if (!data.cover) {
            setPreview(null);
            return;
        }
        const objectUrl = URL.createObjectURL(data.cover);
        setPreview(objectUrl);

        // Free memory ketika komponen ditutup
        return () => URL.revokeObjectURL(objectUrl);
    }, [data.cover]);

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(books.store(), {
            forceFormData: true,
        });
    };

    return (
        <AppLayout>
            <div className="mx-auto max-w-xl p-6">
                <h1 className="mb-2 text-2xl font-semibold">
                    {t('upload.title')}
                </h1>
                <p className="mb-6 text-sm text-neutral-500">
                    {t('upload.subtitle')}
                </p>

                <form onSubmit={submit} className="space-y-5">
                    {/* Preview Section - BOX PREVIEW */}
                    <div className="flex justify-center rounded-xl border-2 border-dashed border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-800 dark:bg-neutral-900/50">
                        {preview ? (
                            <div className="group relative">
                                <img
                                    src={preview}
                                    alt="Cover Preview"
                                    className="h-52 w-36 rounded-lg border border-white object-cover shadow-lg dark:border-neutral-700"
                                />
                                <button
                                    type="button"
                                    onClick={() => setData('cover', null)}
                                    className="absolute -top-2 -right-2 rounded-full bg-red-500 p-1 text-white shadow-md transition-colors hover:bg-red-600"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </button>
                            </div>
                        ) : (
                            <div className="py-8 text-center">
                                <div className="mx-auto mb-2 h-12 w-12 text-neutral-400">
                                    <svg
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                        />
                                    </svg>
                                </div>
                                <p className="text-xs text-neutral-500">
                                    {t('upload.preview_empty')}
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Judul Buku */}
                    <div>
                        <label className="mb-1 block text-sm font-medium">
                            {t('upload.label_title')}
                        </label>
                        <input
                            type="text"
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            className="w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-blue-500 dark:border-neutral-700 dark:bg-neutral-900"
                            placeholder={t('upload.placeholder_title')}
                        />
                        {errors.title && (
                            <p className="mt-1 text-xs text-red-600">
                                {errors.title}
                            </p>
                        )}
                    </div>

                    {/* Penulis / Authors */}
                    <div>
                        <label className="mb-1 block text-sm font-medium">
                            {t('upload.label_author')}
                        </label>
                        <input
                            type="text"
                            value={data.authors}
                            onChange={(e) => setData('authors', e.target.value)}
                            className="w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-blue-500 dark:border-neutral-700 dark:bg-neutral-900"
                            placeholder={t('upload.placeholder_author')}
                        />
                        {errors.authors && (
                            <p className="mt-1 text-xs text-red-600">
                                {errors.authors}
                            </p>
                        )}
                    </div>

                    {/* Program Studi */}
                    <div>
                        <label className="mb-1 block text-sm font-medium">
                            {t('upload.label_prodi')}
                        </label>
                        <select
                            value={data.program_study}
                            onChange={(e) =>
                                setData('program_study', e.target.value)
                            }
                            className="w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-blue-500 dark:border-neutral-700 dark:bg-neutral-900"
                        >
                            <option value="">{t('upload.select_prodi')}</option>
                            <option value="TI">{t('upload.prodi.ti')}</option>
                            <option value="SI">{t('upload.prodi.si')}</option>
                            <option value="KIM">{t('upload.prodi.kim')}</option>
                            <option value="FIS">{t('upload.prodi.fis')}</option>
                            <option value="ALGI">
                                {t('upload.prodi.algi')}
                            </option>
                            <option value="MAT">{t('upload.prodi.mat')}</option>
                            <option value="BIO">{t('upload.prodi.bio')}</option>
                        </select>
                        {errors.program_study && (
                            <p className="mt-1 text-xs text-red-600">
                                {errors.program_study}
                            </p>
                        )}
                    </div>

                    {/* Input Cover & Input EPUB (Sejajar) */}
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div>
                            <label className="mb-1 block text-sm font-medium">
                                {t('upload.label_cover')}
                            </label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) =>
                                    setData(
                                        'cover',
                                        e.target.files?.[0] ?? null,
                                    )
                                }
                                className="w-full text-xs file:mr-3 file:rounded-md file:border-0 file:bg-blue-50 file:px-3 file:py-2 file:text-xs file:font-semibold file:text-blue-700 hover:file:bg-blue-100 dark:file:bg-blue-900/30 dark:file:text-blue-400"
                            />
                            {errors.cover && (
                                <p className="mt-1 text-xs text-red-600">
                                    {errors.cover}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="mb-1 block text-sm font-medium">
                                {t('upload.label_epub')}
                            </label>
                            <input
                                type="file"
                                accept=".epub"
                                onChange={(e) =>
                                    setData('epub', e.target.files?.[0] ?? null)
                                }
                                className="w-full text-xs file:mr-3 file:rounded-md file:border-0 file:bg-emerald-50 file:px-3 file:py-2 file:text-xs file:font-semibold file:text-emerald-700 hover:file:bg-emerald-100 dark:file:bg-emerald-900/30 dark:file:text-emerald-400"
                            />
                            {errors.epub && (
                                <p className="mt-1 text-xs text-red-600">
                                    {errors.epub}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full rounded-lg bg-blue-600 py-3 font-bold text-white shadow-md transition-all hover:bg-blue-700 active:scale-[0.98] disabled:opacity-50"
                    >
                        {processing ? (
                            <span className="flex items-center justify-center">
                                <svg
                                    className="mr-3 -ml-1 h-5 w-5 animate-spin text-white"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    ></circle>
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    ></path>
                                </svg>
                                {t('upload.uploading')}
                            </span>
                        ) : (
                            t('upload.submit')
                        )}
                    </button>
                </form>
            </div>
        </AppLayout>
    );
}
