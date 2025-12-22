import { BookOpen } from 'lucide-react';

export default function AppLogo() {
    return (
        <>
            {/* Menggunakan warna statis (High Contrast) agar konsisten dengan Login/Register:
               - Light Mode: Background Hitam (neutral-900), Icon Putih
               - Dark Mode: Background Putih (white), Icon Hitam
            */}
            <div className="flex aspect-square size-8 items-center justify-center rounded-md bg-neutral-900 text-white dark:bg-white dark:text-black">
                <BookOpen className="size-5 fill-current" />
            </div>

            <div className="ml-1 grid flex-1 text-left text-sm">
                <span className="mb-0.5 truncate leading-tight font-semibold">
                    FST Reader
                </span>
            </div>
        </>
    );
}
