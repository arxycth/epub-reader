import React, { useState, useEffect } from 'react';
import AppLayout from '@/layouts/app-layout';
import books from '@/routes/books';
import { useForm } from '@inertiajs/react';
// import { __ } from '@/Utils/lang'; 

interface UploadForm {
    title: string;
    authors: string;
    program_study: string;
    epub: File | null;
    cover: File | null;
}

export default function Upload() {
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
            <div className="max-w-xl mx-auto p-6">
                <h1 className="text-2xl font-semibold mb-2">Upload Buku Baru</h1>
                <p className="text-neutral-500 mb-6 text-sm">
                    Lengkapi data buku dan unggah file ePub Anda ke perpustakaan FST.
                </p>

                <form onSubmit={submit} className="space-y-5">
                    
                    {/* Preview Section - BOX PREVIEW */}
                    <div className="flex justify-center p-4 border-2 border-dashed rounded-xl border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50">
                        {preview ? (
                            <div className="relative group">
                                <img 
                                    src={preview} 
                                    alt="Cover Preview" 
                                    className="h-52 w-36 object-cover rounded-lg shadow-lg border border-white dark:border-neutral-700" 
                                />
                                <button
                                    type="button"
                                    onClick={() => setData('cover', null)}
                                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600 transition-colors"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </div>
                        ) : (
                            <div className="py-8 text-center">
                                <div className="mx-auto h-12 w-12 text-neutral-400 mb-2">
                                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <p className="text-xs text-neutral-500">Pratinjau cover akan muncul di sini</p>
                            </div>
                        )}
                    </div>

                    {/* Judul Buku */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Judul Buku</label>
                        <input
                            type="text"
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            className="w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700"
                            placeholder="Contoh: Pemrograman Web Modern"
                        />
                        {errors.title && <p className="text-red-600 text-xs mt-1">{errors.title}</p>}
                    </div>

                    {/* Penulis / Authors */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Penulis</label>
                        <input
                            type="text"
                            value={data.authors}
                            onChange={(e) => setData('authors', e.target.value)}
                            className="w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700"
                            placeholder="Nama Penulis atau Dosen"
                        />
                        {errors.authors && <p className="text-red-600 text-xs mt-1">{errors.authors}</p>}
                    </div>

                    {/* Program Studi */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Program Studi</label>
                        <select
                            value={data.program_study}
                            onChange={(e) => setData('program_study', e.target.value)}
                            className="w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700"
                        >
                            <option value="">Pilih Program Studi</option>
                            <option value="TI">Teknik Informatika</option>
                            <option value="SI">Sistem Informasi</option>
                            <option value="KIM">Kimia</option>
                            <option value="FIS">Fisika</option>
                            <option value="ALGI">Algikultur</option>
                            <option value="MAT">Matematika</option>
                            <option value="BIO">Biologi</option>
                        </select>
                        {errors.program_study && <p className="text-red-600 text-xs mt-1">{errors.program_study}</p>}
                    </div>

                    {/* Input Cover & Input EPUB (Sejajar) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Cover Buku</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setData('cover', e.target.files?.[0] ?? null)}
                                className="w-full text-xs file:mr-3 file:py-2 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:file:bg-blue-900/30 dark:file:text-blue-400"
                            />
                            {errors.cover && <p className="text-red-600 text-xs mt-1">{errors.cover}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">File ePub</label>
                            <input
                                type="file"
                                accept=".epub"
                                onChange={(e) => setData('epub', e.target.files?.[0] ?? null)}
                                className="w-full text-xs file:mr-3 file:py-2 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100 dark:file:bg-emerald-900/30 dark:file:text-emerald-400"
                            />
                            {errors.epub && <p className="text-red-600 text-xs mt-1">{errors.epub}</p>}
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 disabled:opacity-50 transition-all shadow-md active:scale-[0.98]"
                    >
                        {processing ? (
                            <span className="flex items-center justify-center">
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Mengunggah...
                            </span>
                        ) : 'Simpan & Publikasikan'}
                    </button>
                </form>
            </div>
        </AppLayout>
    );
}