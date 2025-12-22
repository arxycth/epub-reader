import BookmarkPanel from '@/components/Reader/BookmarkPanel';
import HighlightModal from '@/components/Reader/HighlightModal';
import HighlightsPanel from '@/components/Reader/HighlightsPanel';
import SearchPanel from '@/components/Reader/SearchPanel';
import TOCPanel from '@/components/Reader/TOCPanel';
import books from '@/routes/books';
import { router } from '@inertiajs/react';
import ePub, { Book as EpubBook, Rendition } from 'epubjs';
import { useEffect, useRef, useState } from 'react';

// --- 1. TYPES DEFINITION ---
interface BookModel {
    id: number;
    title: string;
    authors?: string[] | string;
    cover?: string | null;
    program_study?: string;
}

interface Highlight {
    id: number;
    cfi_range: string;
    text: string;
    note?: string;
    color?: string;
}

interface Bookmark {
    id: number;
    cfi: string;
    label: string;
    created_at?: string;
}

interface SearchResult {
    cfi: string;
    excerpt: string;
    chapter?: string;
}

// Helper Cookie
function getCookie(name: string) {
    if (typeof document === 'undefined') return null;
    return document.cookie
        .split('; ')
        .find((row) => row.startsWith(name + '='))
        ?.split('=')[1];
}

export default function Reader({
    book,
    fileUrl,
}: {
    book: BookModel;
    fileUrl: string;
}) {
    // Refs
    const viewerRef = useRef<HTMLDivElement>(null);
    const renditionRef = useRef<Rendition | null>(null);
    const bookRef = useRef<EpubBook | null>(null);

    // UI States
    const [toc, setToc] = useState<any[]>([]);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

    // Bookmark & Highlight States
    const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
    const [bookmarkPanelOpen, setBookmarkPanelOpen] = useState(false);
    const [highlights, setHighlights] = useState<Highlight[]>([]);
    const [highlightModalOpen, setHighlightModalOpen] = useState(false);
    const [selectedCfiRange, setSelectedCfiRange] = useState<string | null>(
        null,
    );
    const [selectedText, setSelectedText] = useState('');
    const [highlightsPanelOpen, setHighlightsPanelOpen] = useState(false);

    // 🔥 NEW: Progress UI State
    const [currentProgress, setCurrentProgress] = useState(0);

    // Stats Logic
    const sessionSecondsRef = useRef(0);
    const activityTimerRef = useRef<NodeJS.Timeout | null>(null);
    const csrfToken =
        document
            .querySelector('meta[name="csrf-token"]')
            ?.getAttribute('content') || '';

    // --- 2. INITIALIZATION ---
    useEffect(() => {
        const instance = ePub(encodeURI(fileUrl));
        bookRef.current = instance;

        instance.loaded.navigation.then((nav: any) => setToc(nav.toc || []));

        if (viewerRef.current) {
            const rend = instance.renderTo(viewerRef.current, {
                manager: 'default',
                flow: 'paginated',
                width: '100%',
                height: '100%',
                allowScriptedContent: true,
            });
            renditionRef.current = rend;
            rend.display();

            // Generate Locations (Wajib untuk progress bar)
            instance.ready
                .then(() => {
                    return instance.locations.generate(1000);
                })
                .then(() => {
                    console.log('Locations generated');
                    // Update progress awal jika ada
                    updateProgressUI();
                });

            fetchUserData();
            setupRenditionEvents(rend);
        }

        startActivityTimer();
        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            stopActivityTimer();
            document.removeEventListener(
                'visibilitychange',
                handleVisibilityChange,
            );
            if (bookRef.current) bookRef.current.destroy();
            renditionRef.current = null;
        };
    }, [fileUrl, book.id]);

    useEffect(() => {
        if (renditionRef.current && highlights.length > 0) injectHighlights();
    }, [highlights]);

    // --- 3. HELPERS ---

    // 🔥 Fungsi Update Progress UI (Dipisah agar reusable)
    const updateProgressUI = () => {
        const rend = renditionRef.current;
        const bookInst = bookRef.current;
        if (!rend || !bookInst) return;

        // @ts-ignore
        const location = rend.currentLocation
            ? rend.currentLocation()
            : rend.location;
        if (location && location.start && bookInst.locations.length() > 0) {
            const pct = bookInst.locations.percentageFromCfi(
                location.start.cfi,
            );
            setCurrentProgress(Math.round(pct * 100));
        }
    };

    const fetchUserData = () => {
        fetch(books.bookmark.index.get({ book: book.id }).url, {
            credentials: 'include',
        })
            .then((r) => r.json())
            .then(setBookmarks)
            .catch(console.error);
        fetch(books.highlight.index.get({ book: book.id }).url, {
            credentials: 'include',
        })
            .then((r) => r.json())
            .then(setHighlights)
            .catch(console.error);
    };

    const setupRenditionEvents = (rend: Rendition) => {
        rend.on('relocated', () => {
            if (highlights.length > 0) injectHighlights();
            sessionSecondsRef.current += 1;

            // 🔥 Update UI Navbar setiap halaman berubah
            updateProgressUI();
        });

        rend.on('selected', (cfiRange: string, contents: any) => {
            const sel = contents.window.getSelection().toString().trim();
            if (!sel) {
                // @ts-ignore
                rend.clearSelection && rend.clearSelection();
                return;
            }
            setSelectedCfiRange(cfiRange);
            setSelectedText(sel);
            setHighlightModalOpen(true);
            // @ts-ignore
            rend.clearSelection && rend.clearSelection();
        });

        rend.hooks.content.register((contents: any) => {
            const iframe = contents.document.defaultView?.frameElement;
            if (iframe) {
                iframe.removeAttribute('sandbox');
                iframe.setAttribute(
                    'sandbox',
                    'allow-same-origin allow-scripts allow-forms allow-popups allow-pointer-lock',
                );
            }
            rend.themes.default({
                '.hl-yellow': {
                    background: 'yellow',
                    opacity: 0.45,
                    'mix-blend-mode': 'multiply',
                },
                '.hl-blue': {
                    background: '#4fa3ff',
                    opacity: 0.45,
                    'mix-blend-mode': 'multiply',
                },
                '.hl-green': {
                    background: '#7cf77c',
                    opacity: 0.45,
                    'mix-blend-mode': 'multiply',
                },
                '.hl-pink': {
                    background: '#ff7cc8',
                    opacity: 0.45,
                    'mix-blend-mode': 'multiply',
                },
            });
        });
    };

    // --- 4. CORE LOGIC (Bookmark, Highlight, Stats) ---
    // (Logic Bookmark & Highlight sama seperti sebelumnya, disingkat agar muat)
    const addBookmark = async () => {
        const rend = renditionRef.current;
        if (!rend) return;
        // @ts-ignore
        const location = rend.currentLocation
            ? rend.currentLocation()
            : rend.location;
        const cfi = location?.start?.cfi;
        if (!cfi) return;
        const xsrfToken = decodeURIComponent(getCookie('XSRF-TOKEN') || '');

        try {
            const res = await fetch(
                books.bookmark.store.post({ book: book.id }).url,
                {
                    method: 'POST',
                    credentials: 'same-origin',
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                        'X-XSRF-TOKEN': xsrfToken,
                        'X-Requested-With': 'XMLHttpRequest',
                    },
                    body: JSON.stringify({
                        cfi,
                        label: `Page ${location.start.displayed.page}`,
                    }),
                },
            );
            if (!res.ok) throw new Error();
            const data = await res.json();
            setBookmarks((prev) => [data, ...prev]);
        } catch (e) {
            console.error(e);
        }
    };

    const deleteBookmark = async (id: number) => {
        await fetch(
            books.bookmark.destroy.delete({ book: book.id, bookmark: id }).url,
            {
                method: 'DELETE',
                headers: { 'X-CSRF-TOKEN': csrfToken },
                credentials: 'include',
            },
        );
        setBookmarks((prev) => prev.filter((b) => b.id !== id));
    };

    const injectHighlights = () => {
        const rend = renditionRef.current;
        if (!rend) return;
        try {
            // @ts-ignore
            Object.values(
                rend.annotations._annotations?.highlight || {},
            ).forEach((h: any) =>
                rend.annotations.remove(h.cfiRange, 'highlight'),
            );
        } catch {}
        highlights.forEach((h) => {
            try {
                rend.annotations.add(
                    'highlight',
                    h.cfi_range,
                    {},
                    null,
                    `hl-${h.color || 'yellow'}`,
                );
            } catch {}
        });
    };

    const saveHighlight = ({
        note,
        color,
    }: {
        note?: string;
        color?: string;
    }) => {
        if (!selectedCfiRange || !selectedText) return;
        router.post(
            books.highlight.store.post({ book: book.id }).url,
            { cfi_range: selectedCfiRange, text: selectedText, note, color },
            {
                preserveScroll: true,
                onSuccess: (page) => {
                    // @ts-ignore
                    const newData = page.props.flash?.highlight;
                    if (newData) setHighlights((prev) => [...prev, newData]);
                    setHighlightModalOpen(false);
                    setSelectedCfiRange(null);
                    setSelectedText('');
                },
            },
        );
    };

    const deleteHighlight = async (id: number) => {
        await fetch(
            books.highlight.destroy.delete({ book: book.id, highlight: id })
                .url,
            {
                method: 'DELETE',
                headers: { 'X-CSRF-TOKEN': csrfToken },
                credentials: 'include',
            },
        );
        setHighlights((prev) => prev.filter((h) => h.id !== id));
        if (renditionRef.current) {
            // @ts-ignore
            renditionRef.current.annotations.remove(
                highlights.find((h) => h.id === id)?.cfi_range,
                'highlight',
            );
        }
    };

    function startActivityTimer() {
        stopActivityTimer();
        activityTimerRef.current = setInterval(() => {
            sessionSecondsRef.current += 1;
            if (sessionSecondsRef.current % 10 === 0) sendStats(10);
        }, 1000);
    }
    function stopActivityTimer() {
        if (activityTimerRef.current) clearInterval(activityTimerRef.current);
    }
    function handleVisibilityChange() {
        if (document.hidden) {
            stopActivityTimer();
            if (sessionSecondsRef.current > 0) {
                sendStats(sessionSecondsRef.current);
                sessionSecondsRef.current = 0;
            }
        } else startActivityTimer();
    }

    async function sendStats(seconds: number) {
        const rend = renditionRef.current;
        const bookInst = bookRef.current;
        if (!rend || !bookInst) return;

        // @ts-ignore
        const location = rend.currentLocation
            ? rend.currentLocation()
            : rend.location;

        let currentCfi = null;
        let progressPercent = 0;
        let currentPage = 0; // Variabel baru untuk halaman

        if (location && location.start) {
            currentCfi = location.start.cfi;

            // Pastikan locations sudah digenerate
            if (bookInst.locations.length() > 0) {
                // 1. Hitung Persentase
                progressPercent =
                    bookInst.locations.percentageFromCfi(currentCfi);
                progressPercent = parseFloat(
                    (progressPercent * 100).toFixed(2),
                );

                // 2. Hitung Halaman (Index Lokasi + 1)
                // locationFromCfi mengembalikan urutan potongan text (chunk) saat ini
                currentPage =
                    bookInst.locations.locationFromCfi(currentCfi) + 1;
            }
        }

        // Sync state UI
        setCurrentProgress(Math.round(progressPercent));

        // Ambil token CSRF (Gunakan axios jika bisa, tapi ini cara manual fetch)
        const token = document
            .querySelector('meta[name="csrf-token"]')
            ?.getAttribute('content');

        try {
            await fetch(books.stats.update.post({ book: book.id }).url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    'X-CSRF-TOKEN': token || '',
                },
                credentials: 'include',
                body: JSON.stringify({
                    seconds,
                    last_cfi: currentCfi,
                    progress: progressPercent,
                    pages_read: currentPage, // <--- KIRIM DATA INI
                }),
            });
        } catch (e) {
            console.error('Gagal update stats', e);
        }
    }

    const performSearch = async (query: string) => {
        if (!query.trim() || !bookRef.current) {
            setSearchResults([]);
            return;
        }
        const results: SearchResult[] = [];
        const bookInst = bookRef.current;
        for (let i = 0; i < bookInst.spine.length; i++) {
            const item = bookInst.spine.get(i);
            // @ts-ignore
            const found = await item.find(query);
            found.forEach((f: any) =>
                results.push({
                    cfi: f.cfi,
                    excerpt: f.excerpt,
                    chapter: item.href,
                }),
            );
        }
        setSearchResults(results);
    };

    // --- 5. RENDER UI ---
    return (
        <div className="flex h-screen flex-col bg-neutral-50 dark:bg-neutral-900">
            <header className="sticky top-0 z-20 flex items-center justify-between gap-2 border-b border-neutral-200 bg-white/90 px-4 py-2 backdrop-blur dark:border-neutral-700 dark:bg-neutral-900/90">
                {/* LEFT: Back & Title */}
                <div className="flex min-w-0 items-center gap-3 md:w-1/3">
                    <button
                        onClick={() => router.visit('/books')}
                        className="rounded-md bg-neutral-100 px-3 py-1.5 text-sm transition hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700"
                    >
                        ←
                    </button>
                    <span
                        className="max-w-[220px] truncate text-sm font-semibold"
                        title={book.title}
                    >
                        {book.title}
                    </span>
                </div>

                {/* CENTER: Progress Bar & Controls */}
                <div className="flex flex-1 items-center justify-center gap-2">
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="rounded-md p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                        title="TOC"
                    >
                        📑
                    </button>

                    {/* 🔥 NEW: Progress Indicator */}
                    <div className="mx-2 hidden w-32 flex-col items-center sm:flex md:w-48">
                        <div className="mb-1 flex w-full justify-between text-[10px] font-medium text-neutral-500">
                            <span>{currentProgress}% Read</span>
                        </div>
                        <div className="h-1.5 w-full overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-700">
                            <div
                                className="h-full rounded-full bg-blue-600 transition-all duration-300 ease-out"
                                style={{ width: `${currentProgress}%` }}
                            />
                        </div>
                    </div>

                    <button
                        onClick={() => setSearchOpen(true)}
                        className="rounded-md p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                        title="Search"
                    >
                        🔍
                    </button>
                </div>

                {/* RIGHT: Nav & Actions */}
                <div className="flex justify-end gap-1 md:w-1/3">
                    <button
                        onClick={() => renditionRef.current?.prev()}
                        className="rounded-md bg-neutral-100 px-3 py-1.5 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700"
                    >
                        ◀
                    </button>
                    <button
                        onClick={() => renditionRef.current?.next()}
                        className="rounded-md bg-neutral-100 px-3 py-1.5 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700"
                    >
                        ▶
                    </button>

                    <div className="mx-1 h-6 w-px self-center bg-neutral-300 dark:bg-neutral-700" />

                    <button
                        onClick={addBookmark}
                        className="rounded-md bg-neutral-100 px-3 py-1.5 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700"
                    >
                        ⭐
                    </button>
                    <button
                        onClick={() => setBookmarkPanelOpen(true)}
                        className="relative rounded-md bg-neutral-100 px-3 py-1.5 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700"
                    >
                        📌{' '}
                        {bookmarks.length > 0 && (
                            <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-red-500" />
                        )}
                    </button>
                    <button
                        onClick={() => setHighlightsPanelOpen(true)}
                        className="relative rounded-md bg-neutral-100 px-3 py-1.5 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700"
                    >
                        💡{' '}
                        {highlights.length > 0 && (
                            <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-yellow-500" />
                        )}
                    </button>
                </div>
            </header>

            {/* READER AREA */}
            <div
                ref={viewerRef}
                className="relative flex-1 overflow-hidden bg-white shadow-inner dark:bg-neutral-900"
            />

            {/* MODALS */}
            <TOCPanel
                toc={toc}
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
                onSelect={(href: string) => {
                    renditionRef.current?.display(href);
                    setSidebarOpen(false);
                }}
            />
            <SearchPanel
                isOpen={searchOpen}
                onClose={() => setSearchOpen(false)}
                results={searchResults}
                onSearch={performSearch}
                onSelect={(cfi: string) => {
                    renditionRef.current?.display(cfi);
                    setSearchOpen(false);
                }}
            />
            <HighlightModal
                open={highlightModalOpen}
                onClose={() => setHighlightModalOpen(false)}
                onSave={saveHighlight}
                selectedText={selectedText}
            />
            <HighlightsPanel
                isOpen={highlightsPanelOpen}
                onClose={() => setHighlightsPanelOpen(false)}
                highlights={highlights}
                onJump={(cfi: string) => {
                    renditionRef.current?.display(cfi);
                    setHighlightsPanelOpen(false);
                }}
                onDelete={deleteHighlight}
            />
            <BookmarkPanel
                isOpen={bookmarkPanelOpen}
                onClose={() => setBookmarkPanelOpen(false)}
                bookmarks={bookmarks}
                onJump={(cfi: string) => {
                    renditionRef.current?.display(cfi);
                    setBookmarkPanelOpen(false);
                }}
                onDelete={deleteBookmark}
            />
        </div>
    );
}
