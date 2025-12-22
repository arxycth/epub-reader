import { useAppearance } from '@/hooks/use-appearance'; // Pastikan hook ini tersedia
import { dashboard, login, register } from '@/routes';
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import {
    BookOpen,
    ChevronRight,
    Code2,
    Database,
    Github,
    Globe,
    Languages,
    Layout,
    Linkedin,
    Moon,
    Search,
    Sun,
    Twitter,
    Zap,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Welcome({
    canRegister = true,
}: {
    canRegister?: boolean;
}) {
    const { t, i18n } = useTranslation();
    const { auth } = usePage<SharedData>().props;
    const { appearance, updateAppearance } = useAppearance();

    // Fungsi ganti bahasa cepat
    const toggleLanguage = () => {
        const nextLang = i18n.language === 'id' ? 'en' : 'id';
        i18n.changeLanguage(nextLang);
    };

    // Fungsi ganti tema cepat
    const toggleAppearance = () => {
        const nextAppearance = appearance === 'dark' ? 'light' : 'dark';
        updateAppearance(nextAppearance);
    };

    const teamMembers = [
        {
            name: 'Dimas Adiluhur',
            nim: '11230910000054',
            role: 'Fullstack Developer',
            color: 'from-blue-500 to-cyan-500',
        },
        {
            name: 'Syafiq Setiadji',
            nim: '11230910000046',
            role: 'Frontend Engineer',
            color: 'from-purple-500 to-pink-500',
        },
        {
            name: 'Daffa Hakim',
            nim: '11230910000047',
            role: 'UI/UX Designer',
            color: 'from-orange-500 to-red-500',
        },
        {
            name: 'Akhsan Thufail',
            nim: '11230910000060',
            role: 'Backend Engineer',
            color: 'from-emerald-500 to-green-500',
        },
    ];

    return (
        <>
            <Head title={t('welcome.meta_title')} />

            <div className="min-h-screen bg-neutral-50 text-neutral-900 transition-colors duration-300 selection:bg-indigo-500 selection:text-white dark:bg-[#050505] dark:text-white">
                {/* --- BACKGROUND PATTERNS --- */}
                <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px] opacity-70 dark:hidden"></div>
                    <div className="absolute inset-0 hidden bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay brightness-100 contrast-150 dark:block"></div>
                    <div className="absolute top-[-10%] right-[-10%] h-[500px] w-[500px] rounded-full bg-indigo-600/20 mix-blend-multiply blur-[120px] dark:mix-blend-normal" />
                    <div className="absolute bottom-[-10%] left-[-10%] h-[500px] w-[500px] rounded-full bg-blue-600/20 mix-blend-multiply blur-[120px] dark:mix-blend-normal" />
                </div>

                {/* --- NAVBAR --- */}
                <nav className="fixed top-0 z-50 w-full border-b border-neutral-200/50 bg-white/70 backdrop-blur-xl dark:border-white/5 dark:bg-[#050505]/80">
                    <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
                        <div className="flex items-center gap-2 text-xl font-bold tracking-tighter">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white shadow-lg shadow-indigo-500/30">
                                <BookOpen className="h-4 w-4" />
                            </div>
                            <span className="text-neutral-900 dark:text-white">
                                FST
                                <span className="text-indigo-600 dark:text-indigo-400">
                                    {' '}
                                    Reader
                                </span>
                                .
                            </span>
                        </div>

                        {/* ACTIONS SECTION */}
                        <div className="flex items-center gap-2 sm:gap-4">
                            {/* Language Switcher Button */}
                            <button
                                onClick={toggleLanguage}
                                className="relative flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-600 transition hover:bg-neutral-50 dark:border-white/10 dark:bg-white/5 dark:text-neutral-400 dark:hover:bg-white/10"
                                title="Switch Language"
                            >
                                <Languages className="h-4 w-4" />
                                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full border-2 border-white bg-indigo-600 text-[8px] font-bold text-white uppercase dark:border-[#050505]">
                                    {i18n.language}
                                </span>
                            </button>

                            {/* Theme Switcher Button */}
                            <button
                                onClick={toggleAppearance}
                                className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-600 transition hover:bg-neutral-50 dark:border-white/10 dark:bg-white/5 dark:text-neutral-400 dark:hover:bg-white/10"
                                title="Toggle Theme"
                            >
                                {appearance === 'dark' ? (
                                    <Sun className="h-4 w-4" />
                                ) : (
                                    <Moon className="h-4 w-4" />
                                )}
                            </button>

                            <div className="mx-1 h-6 w-px bg-neutral-200 dark:bg-white/10" />

                            <div className="flex gap-4 text-sm font-medium">
                                {auth.user ? (
                                    <Link
                                        href={dashboard()}
                                        className="rounded-full bg-neutral-900 px-5 py-2 text-white transition hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200"
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href={login()}
                                            className="hidden px-3 py-2 text-neutral-600 transition hover:text-neutral-900 sm:block dark:text-gray-400 dark:hover:text-white"
                                        >
                                            {t('user_menu.login') || 'Log in'}
                                        </Link>
                                        {canRegister && (
                                            <Link
                                                href={register()}
                                                className="rounded-full bg-indigo-600 px-5 py-2 text-white shadow-lg shadow-indigo-500/25 transition hover:bg-indigo-700"
                                            >
                                                {t('user_menu.register') ||
                                                    'Get Started'}
                                            </Link>
                                        )}
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </nav>

                <main className="relative z-10 pt-24 pb-0 lg:pt-32">
                    {/* --- HERO SECTION --- */}
                    <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-2 lg:gap-20">
                        <div className="text-center lg:text-left">
                            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-xs font-medium text-indigo-600 backdrop-blur-md dark:text-indigo-300">
                                <span className="relative flex h-2 w-2">
                                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo-400 opacity-75"></span>
                                    <span className="relative inline-flex h-2 w-2 rounded-full bg-indigo-500"></span>
                                </span>
                                {t('welcome.hero.badge')}
                            </div>

                            <h1 className="mb-6 text-5xl font-extrabold tracking-tight text-neutral-900 sm:text-6xl xl:text-7xl dark:text-white">
                                {t('welcome.hero.title_top')} <br />
                                <span className="animate-gradient bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent dark:from-indigo-400 dark:via-purple-400 dark:to-indigo-400">
                                    {t('welcome.hero.title_gradient')}
                                </span>
                            </h1>

                            <p className="mx-auto mb-8 max-w-lg text-lg text-neutral-600 lg:mx-0 dark:text-gray-400">
                                {t('welcome.hero.description')}
                            </p>

                            <div className="flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">
                                <Link
                                    href={auth.user ? dashboard() : login()}
                                    className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-full bg-neutral-900 px-8 font-medium text-white shadow-xl transition-all hover:scale-105 dark:bg-white dark:text-black"
                                >
                                    <span className="mr-2">
                                        {t('welcome.hero.btn_read')}
                                    </span>
                                    <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </Link>
                                <a
                                    href="#makers"
                                    className="inline-flex h-12 items-center justify-center rounded-full border border-neutral-200 bg-white px-8 font-medium text-neutral-900 backdrop-blur-sm transition hover:bg-neutral-50 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
                                >
                                    {t('welcome.hero.btn_team')}
                                </a>
                            </div>

                            <div className="mt-10 border-t border-neutral-200 pt-8 dark:border-white/10">
                                <p className="mb-4 text-xs font-semibold tracking-widest text-neutral-400 uppercase">
                                    Powered By
                                </p>
                                <div className="flex justify-center gap-6 opacity-60 grayscale transition-all duration-500 hover:grayscale-0 lg:justify-start">
                                    <div className="flex items-center gap-2 text-sm font-bold dark:text-white">
                                        <div className="h-2 w-2 rounded-full bg-red-500"></div>{' '}
                                        Laravel
                                    </div>
                                    <div className="flex items-center gap-2 text-sm font-bold dark:text-white">
                                        <div className="h-2 w-2 rounded-full bg-cyan-400"></div>{' '}
                                        React
                                    </div>
                                    <div className="flex items-center gap-2 text-sm font-bold dark:text-white">
                                        <div className="h-2 w-2 rounded-full bg-purple-500"></div>{' '}
                                        Inertia
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right: THE LARGE 3D BOOK */}
                        <div className="relative flex min-h-[400px] items-center justify-center perspective-[2000px] lg:min-h-[500px]">
                            <div className="transform-style-3d group relative h-[380px] w-[280px] rotate-x-[10deg] rotate-y-[-25deg] cursor-pointer transition-transform duration-700 ease-out hover:rotate-x-[5deg] hover:rotate-y-[-10deg] sm:h-[450px] sm:w-[320px]">
                                <div className="transform-style-3d absolute inset-0 z-20 overflow-hidden rounded-r-xl border-l-[12px] border-neutral-800 bg-[#0F0F0F] shadow-2xl dark:border-neutral-700 dark:bg-neutral-800">
                                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/50 to-purple-900/50 dark:from-indigo-500/20 dark:to-purple-500/20"></div>
                                    <div className="relative flex h-full flex-col justify-between p-8 text-white">
                                        <div className="flex items-start justify-between">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-md">
                                                <BookOpen className="h-5 w-5" />
                                            </div>
                                            <div className="rounded-full border border-white/20 bg-black/20 px-3 py-1 text-[10px] font-bold tracking-widest uppercase backdrop-blur-sm">
                                                FST Edition
                                            </div>
                                        </div>
                                        <div className="space-y-4">
                                            <h1 className="relative z-10 text-4xl leading-none font-black tracking-tighter">
                                                DIGITAL <br />
                                                <span className="text-indigo-400">
                                                    READER
                                                </span>
                                            </h1>
                                            <p className="relative z-10 font-mono text-sm text-white/60">
                                                Final Project 2025
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="h-1 flex-1 overflow-hidden rounded-full bg-white/20">
                                                <div className="h-full w-2/3 rounded-full bg-indigo-500"></div>
                                            </div>
                                            <span className="font-mono text-xs text-indigo-300">
                                                v1.0
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="absolute inset-0 z-10 translate-x-[15px] translate-y-[15px] rounded-r-xl border border-neutral-200 bg-white shadow-md dark:bg-neutral-300"></div>
                                <div className="absolute inset-0 -z-10 translate-x-[40px] translate-y-[40px] rounded-xl bg-black/40 blur-2xl transition-all duration-700 group-hover:bg-indigo-600/30"></div>
                            </div>
                        </div>
                    </div>

                    {/* --- FEATURES GRID --- */}
                    <div id="features" className="mx-auto mt-32 max-w-7xl px-6">
                        <div className="mb-16 md:text-center">
                            <h2 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl dark:text-white">
                                {t('welcome.features.badge')}
                            </h2>
                            <p className="mt-4 text-neutral-600 dark:text-gray-400">
                                {t('welcome.features.subtitle')}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                            <div className="group col-span-1 row-span-2 overflow-hidden rounded-3xl border border-neutral-200 bg-white p-8 transition hover:border-indigo-500/50 hover:shadow-xl md:col-span-2 dark:border-white/10 dark:bg-neutral-900/50">
                                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400">
                                    <Layout className="h-5 w-5" />
                                </div>
                                <h3 className="text-xl font-bold text-neutral-900 transition group-hover:text-indigo-600 dark:text-white dark:group-hover:text-indigo-400">
                                    {t('welcome.features.ui_title')}
                                </h3>
                                <p className="mt-2 text-neutral-600 dark:text-gray-400">
                                    {t('welcome.features.ui_desc')}
                                </p>
                                <div className="relative mt-8 h-64 w-full overflow-hidden rounded-xl border border-neutral-200 bg-neutral-50 dark:border-white/5 dark:bg-black">
                                    <div className="bg-grid-black/[0.05] dark:bg-grid-white/[0.05] absolute inset-0"></div>
                                </div>
                            </div>

                            <div className="group rounded-3xl border border-neutral-200 bg-white p-8 transition hover:border-blue-500/50 hover:shadow-lg dark:border-white/10 dark:bg-neutral-900/50">
                                <Search className="mb-4 h-8 w-8 text-blue-500 transition dark:text-blue-400" />
                                <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
                                    {t('welcome.features.search_title')}
                                </h3>
                                <p className="mt-2 text-sm text-neutral-600 dark:text-gray-400">
                                    {t('welcome.features.search_desc')}
                                </p>
                            </div>

                            <div className="group rounded-3xl border border-neutral-200 bg-white p-8 transition hover:border-purple-500/50 hover:shadow-lg dark:border-white/10 dark:bg-neutral-900/50">
                                <Moon className="mb-4 h-8 w-8 text-purple-500 transition dark:text-purple-400" />
                                <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
                                    {t('welcome.features.dark_title')}
                                </h3>
                                <p className="mt-2 text-sm text-neutral-600 dark:text-gray-400">
                                    {t('welcome.features.dark_desc')}
                                </p>
                            </div>

                            <div className="col-span-1 flex flex-col items-center gap-8 rounded-3xl border border-neutral-200 bg-white p-8 transition hover:border-green-500/50 md:col-span-3 md:flex-row dark:border-white/10 dark:bg-neutral-900/50">
                                <div className="flex-1">
                                    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-green-500/30 bg-green-50 px-3 py-1 text-xs text-green-600 dark:bg-green-500/10 dark:text-green-400">
                                        <Zap className="h-3 w-3" />{' '}
                                        {t('welcome.features.perform_badge')}
                                    </div>
                                    <h3 className="text-xl font-bold text-neutral-900 dark:text-white">
                                        {t('welcome.features.perform_title')}
                                    </h3>
                                    <p className="mt-2 text-neutral-600 dark:text-gray-400">
                                        {t('welcome.features.perform_desc')}
                                    </p>
                                </div>
                                <div className="flex gap-4 opacity-50">
                                    <Code2 className="h-10 w-10 text-neutral-400" />
                                    <Database className="h-10 w-10 text-neutral-400" />
                                    <Globe className="h-10 w-10 text-neutral-400" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* --- MEET THE MAKERS --- */}
                    <div
                        id="makers"
                        className="mx-auto mt-32 max-w-7xl px-6 pb-20"
                    >
                        <div className="mb-16 text-center">
                            <h2 className="text-3xl font-bold text-neutral-900 dark:text-white">
                                {t('welcome.team.title')}
                            </h2>
                            <p className="mt-2 text-neutral-600 dark:text-neutral-400">
                                {t('welcome.team.subtitle')}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                            {teamMembers.map((member, i) => (
                                <div
                                    key={i}
                                    className="group relative h-[300px] perspective-[1000px]"
                                >
                                    <div className="absolute inset-0 overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-xl transition-all duration-500 group-hover:-translate-y-2 dark:border-white/10 dark:bg-neutral-900">
                                        <div
                                            className={`h-24 w-full bg-gradient-to-r ${member.color} opacity-80 transition-opacity group-hover:opacity-100`}
                                        ></div>
                                        <div className="absolute top-12 left-1/2 -translate-x-1/2">
                                            <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-white bg-neutral-100 text-3xl font-bold text-neutral-700 dark:border-neutral-900 dark:bg-neutral-800 dark:text-white">
                                                {member.name.charAt(0)}
                                            </div>
                                        </div>
                                        <div className="mt-14 p-6 text-center">
                                            <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
                                                {member.name}
                                            </h3>
                                            <p className="mb-2 font-mono text-xs text-neutral-500">
                                                {member.nim}
                                            </p>
                                            <span className="inline-block rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-600 dark:bg-white/10 dark:text-neutral-300">
                                                {member.role}
                                            </span>
                                            <div className="mt-6 flex translate-y-4 transform justify-center gap-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                                                <Github className="h-5 w-5 cursor-pointer text-neutral-400 hover:text-neutral-900 dark:hover:text-white" />
                                                <Linkedin className="h-5 w-5 cursor-pointer text-neutral-400 hover:text-blue-600" />
                                                <Twitter className="h-5 w-5 cursor-pointer text-neutral-400 hover:text-sky-500" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* --- FOOTER --- */}
                    <footer className="border-t border-neutral-200 bg-white py-12 dark:border-white/10 dark:bg-[#050505]">
                        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 md:flex-row">
                            <div className="flex items-center gap-2 font-bold text-neutral-900 dark:text-white">
                                <div className="h-6 w-6 rounded bg-indigo-600"></div>
                                <span>FST Reader.</span>
                            </div>
                            <p className="text-sm text-neutral-500 dark:text-gray-600">
                                &copy; 2025 {t('welcome.footer.copy')}
                            </p>
                        </div>
                    </footer>
                </main>
            </div>
        </>
    );
}
