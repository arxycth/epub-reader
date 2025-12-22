import { dashboard, login, register } from '@/routes';
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { 
    BookOpen, 
    Zap, 
    Layout, 
    Code2, 
    Database, 
    Globe, 
    ChevronRight,
    Search,
    Moon,
    Github,
    Linkedin,
    Twitter
} from 'lucide-react';

export default function Welcome({ canRegister = true }: { canRegister?: boolean }) {
    const { auth } = usePage<SharedData>().props;

    const teamMembers = [
        { name: 'Dimas Adiluhur', nim: '11230910000054', role: 'Fullstack Developer', color: 'from-blue-500 to-cyan-500' },
        { name: 'Syafiq Setiadji', nim: '11230910000046', role: 'Frontend Engineer', color: 'from-purple-500 to-pink-500' },
        { name: 'Daffa Hakim', nim: '11230910000047', role: 'UI/UX Designer', color: 'from-orange-500 to-red-500' },
        { name: 'Akhsan Thufail', nim: '11230910000060', role: 'Backend Engineer', color: 'from-emerald-500 to-green-500' },
    ];

    return (
        <>
            <Head title="Welcome to FST Reader" />
            
            {/* Main Wrapper with Adaptive Background */}
            <div className="min-h-screen bg-neutral-50 text-neutral-900 selection:bg-indigo-500 selection:text-white dark:bg-[#050505] dark:text-white transition-colors duration-300">
                
                {/* --- BACKGROUND PATTERNS --- */}
                <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                    {/* Light Mode Pattern */}
                    <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px] dark:hidden opacity-70"></div>
                    
                    {/* Dark Mode Noise & Glow */}
                    <div className="hidden dark:block absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
                    <div className="absolute top-[-10%] right-[-10%] h-[500px] w-[500px] rounded-full bg-indigo-600/20 blur-[120px] mix-blend-multiply dark:mix-blend-normal" />
                    <div className="absolute bottom-[-10%] left-[-10%] h-[500px] w-[500px] rounded-full bg-blue-600/20 blur-[120px] mix-blend-multiply dark:mix-blend-normal" />
                </div>

                {/* --- NAVBAR --- */}
                <nav className="fixed top-0 z-50 w-full border-b border-neutral-200/50 bg-white/70 backdrop-blur-xl dark:border-white/5 dark:bg-[#050505]/80">
                    <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
                        <div className="flex items-center gap-2 font-bold text-xl tracking-tighter">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 shadow-lg shadow-indigo-500/30 text-white">
                                <BookOpen className="h-4 w-4" />
                            </div>
                            <span className="dark:text-white text-neutral-900">FST<span className="text-indigo-600 dark:text-indigo-400">Reader</span>.</span>
                        </div>
                        <div className="flex gap-4 text-sm font-medium">
                            {auth.user ? (
                                <Link href={dashboard()} className="rounded-full bg-neutral-900 px-5 py-2 text-white transition hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200">
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link href={login()} className="hidden sm:block px-3 py-2 text-neutral-600 hover:text-neutral-900 transition dark:text-gray-400 dark:hover:text-white">Log in</Link>
                                    {canRegister && (
                                        <Link href={register()} className="rounded-full bg-indigo-600 px-5 py-2 text-white hover:bg-indigo-700 transition shadow-lg shadow-indigo-500/25">
                                            Get Started
                                        </Link>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </nav>

                <main className="relative z-10 pt-24 lg:pt-32 pb-0">
                    
                    {/* --- HERO SECTION (SPLIT LAYOUT) --- */}
                    <div className="mx-auto max-w-7xl px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                        
                        {/* Left: Typography */}
                        <div className="text-center lg:text-left">
                            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-xs font-medium text-indigo-600 dark:text-indigo-300 mb-6 backdrop-blur-md">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                                </span>
                                Proyek Akhir Pemrograman Platform
                            </div>
                            
                            <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl xl:text-7xl mb-6 text-neutral-900 dark:text-white">
                                Baca Buku Digital <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 dark:from-indigo-400 dark:via-purple-400 dark:to-indigo-400 animate-gradient">
                                    Tanpa Batas.
                                </span>
                            </h1>
                            
                            <p className="mx-auto lg:mx-0 max-w-lg text-lg text-neutral-600 dark:text-gray-400 mb-8">
                                Platform ePub reader modern untuk mahasiswa FST. Akses ribuan referensi akademik dengan pengalaman membaca yang nyaman dan responsif.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                                <Link href={auth.user ? dashboard() : login()} className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-full bg-neutral-900 dark:bg-white px-8 font-medium text-white dark:text-black transition-all hover:scale-105 shadow-xl">
                                    <span className="mr-2">Mulai Membaca</span>
                                    <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </Link>
                                <a href="#makers" className="inline-flex h-12 items-center justify-center rounded-full border border-neutral-200 dark:border-white/10 bg-white dark:bg-white/5 px-8 font-medium text-neutral-900 dark:text-white backdrop-blur-sm transition hover:bg-neutral-50 dark:hover:bg-white/10">
                                    Lihat Tim
                                </a>
                            </div>

                            {/* Tech Stack Mini */}
                            <div className="mt-10 pt-8 border-t border-neutral-200 dark:border-white/10">
                                <p className="text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-4">Powered By</p>
                                <div className="flex gap-6 justify-center lg:justify-start opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                                    <div className="flex items-center gap-2 text-sm font-bold dark:text-white"><div className="h-2 w-2 rounded-full bg-red-500"></div>Laravel</div>
                                    <div className="flex items-center gap-2 text-sm font-bold dark:text-white"><div className="h-2 w-2 rounded-full bg-cyan-400"></div>React</div>
                                    <div className="flex items-center gap-2 text-sm font-bold dark:text-white"><div className="h-2 w-2 rounded-full bg-purple-500"></div>Inertia</div>
                                </div>
                            </div>
                        </div>

                        {/* Right: THE LARGE 3D BOOK (CSS Only) */}
                        <div className="relative flex items-center justify-center min-h-[400px] lg:min-h-[500px] perspective-[2000px]">
                            {/* Abstract Book Shape */}
                            <div className="relative h-[380px] w-[280px] sm:h-[450px] sm:w-[320px] rotate-y-[-25deg] rotate-x-[10deg] transform-style-3d transition-transform hover:rotate-y-[-10deg] hover:rotate-x-[5deg] duration-700 ease-out group cursor-pointer">
                                
                                {/* Front Cover */}
                                <div className="absolute inset-0 z-20 rounded-r-xl bg-[#0F0F0F] border-l-[12px] border-neutral-800 shadow-2xl overflow-hidden transform-style-3d dark:border-neutral-700 dark:bg-neutral-800">
                                    {/* Cover Gradient Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/50 to-purple-900/50 dark:from-indigo-500/20 dark:to-purple-500/20"></div>
                                    
                                    {/* Cover Content */}
                                    <div className="relative h-full flex flex-col justify-between p-8 text-white">
                                        <div className="flex justify-between items-start">
                                            <div className="h-10 w-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                                                <BookOpen className="h-5 w-5" />
                                            </div>
                                            <div className="px-3 py-1 rounded-full border border-white/20 text-[10px] font-bold tracking-widest uppercase bg-black/20 backdrop-blur-sm">
                                                FST Edition
                                            </div>
                                        </div>
                                        
                                        <div className="space-y-4">
                                            <div className="h-20 w-20 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 blur-xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-60 animate-pulse"></div>
                                            <h1 className="text-4xl font-black leading-none tracking-tighter relative z-10">
                                                DIGITAL<br />
                                                <span className="text-indigo-400">READER</span>
                                            </h1>
                                            <p className="text-sm text-white/60 font-mono relative z-10">
                                                Platform Programming <br />
                                                Final Project 2025
                                            </p>
                                        </div>

                                        <div className="flex gap-2 items-center">
                                             <div className="h-1 flex-1 bg-white/20 rounded-full overflow-hidden">
                                                <div className="h-full w-2/3 bg-indigo-500 rounded-full"></div>
                                             </div>
                                             <span className="text-xs font-mono text-indigo-300">v1.0</span>
                                        </div>
                                    </div>

                                    {/* Gloss/Shine Effect */}
                                    <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                                </div>

                                {/* Book Pages (Thickness) */}
                                <div className="absolute inset-0 z-10 translate-z-[-20px] rounded-r-xl bg-white border border-neutral-200 shadow-md translate-x-[15px] translate-y-[15px] dark:bg-neutral-300 dark:border-neutral-600"></div>
                                <div className="absolute inset-0 z-0 translate-z-[-40px] rounded-r-xl bg-white border border-neutral-200 shadow-sm translate-x-[30px] translate-y-[30px] dark:bg-neutral-300 dark:border-neutral-600"></div>
                                
                                {/* Back Cover (Shadow) */}
                                <div className="absolute inset-0 -z-10 bg-black/40 blur-2xl transform translate-z-[-50px] translate-x-[40px] translate-y-[40px] rounded-xl transition-all duration-700 group-hover:bg-indigo-600/30 group-hover:blur-3xl"></div>
                            </div>
                        </div>

                    </div>

                    {/* --- FEATURES BENTO GRID (Adaptive) --- */}
                    <div id="features" className="mx-auto mt-32 max-w-7xl px-6">
                        <div className="mb-16 md:text-center">
                            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-neutral-900 dark:text-white">Didesain untuk Akademisi.</h2>
                            <p className="mt-4 text-neutral-600 dark:text-gray-400">Fitur lengkap untuk mendukung kegiatan belajar mengajar di FST.</p>
                        </div>
                        
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                            <div className="col-span-1 row-span-2 overflow-hidden rounded-3xl border border-neutral-200 bg-white p-8 transition hover:border-indigo-500/50 hover:shadow-xl dark:border-white/10 dark:bg-neutral-900/50 dark:hover:shadow-indigo-500/10 md:col-span-2 group">
                                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400">
                                    <Layout className="h-5 w-5" />
                                </div>
                                <h3 className="text-xl font-bold text-neutral-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition">Antarmuka Modern</h3>
                                <p className="mt-2 text-neutral-600 dark:text-gray-400">Tampilan dashboard yang bersih, bebas gangguan, dan responsif di semua perangkat.</p>
                                <div className="mt-8 h-64 w-full rounded-xl border border-neutral-200 dark:border-white/5 bg-neutral-50 dark:bg-black relative overflow-hidden">
                                     <div className="absolute inset-0 bg-grid-black/[0.05] dark:bg-grid-white/[0.05] [mask-image:linear-gradient(0deg,transparent,black)]"></div>
                                </div>
                            </div>

                            <div className="rounded-3xl border border-neutral-200 bg-white p-8 transition hover:border-blue-500/50 hover:shadow-lg dark:border-white/10 dark:bg-neutral-900/50 group">
                                <Search className="mb-4 h-8 w-8 text-blue-500 dark:text-blue-400 group-hover:scale-110 transition" />
                                <h3 className="text-lg font-bold text-neutral-900 dark:text-white">Pencarian Cepat</h3>
                                <p className="mt-2 text-sm text-neutral-600 dark:text-gray-400">Algoritma pencarian canggih untuk menemukan judul buku.</p>
                            </div>

                            <div className="rounded-3xl border border-neutral-200 bg-white p-8 transition hover:border-purple-500/50 hover:shadow-lg dark:border-white/10 dark:bg-neutral-900/50 group">
                                <Moon className="mb-4 h-8 w-8 text-purple-500 dark:text-purple-400 group-hover:rotate-12 transition" />
                                <h3 className="text-lg font-bold text-neutral-900 dark:text-white">Dark Mode</h3>
                                <p className="mt-2 text-sm text-neutral-600 dark:text-gray-400">Otomatis menyesuaikan dengan preferensi sistem Anda.</p>
                            </div>

                            <div className="col-span-1 md:col-span-3 rounded-3xl border border-neutral-200 bg-white p-8 flex flex-col md:flex-row items-center gap-8 transition hover:border-green-500/50 hover:shadow-lg dark:border-white/10 dark:bg-neutral-900/50">
                                <div className="flex-1">
                                    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-green-500/30 bg-green-50 px-3 py-1 text-xs text-green-600 dark:bg-green-500/10 dark:text-green-400">
                                        <Zap className="h-3 w-3" /> Performa Tinggi
                                    </div>
                                    <h3 className="text-xl font-bold text-neutral-900 dark:text-white">Built with Laravel & React</h3>
                                    <p className="mt-2 text-neutral-600 dark:text-gray-400">Kombinasi backend PHP yang solid dan frontend React yang interaktif melalui Inertia.js.</p>
                                </div>
                                <div className="flex gap-4 opacity-50">
                                    <Code2 className="h-10 w-10 text-neutral-400 dark:text-gray-500" />
                                    <Database className="h-10 w-10 text-neutral-400 dark:text-gray-500" />
                                    <Globe className="h-10 w-10 text-neutral-400 dark:text-gray-500" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* --- MEET THE MAKERS (New & Cooler) --- */}
                    <div id="makers" className="mx-auto mt-32 max-w-7xl px-6 pb-20">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl font-bold text-neutral-900 dark:text-white">Meet the Makers</h2>
                            <p className="text-neutral-600 dark:text-neutral-400 mt-2">Mahasiswa Teknik Informatika UIN Jakarta</p>
                        </div>
                        
                        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                            {teamMembers.map((member, i) => (
                                <div key={i} className="group relative h-[300px] perspective-[1000px]">
                                    <div className="absolute inset-0 rounded-2xl bg-white border border-neutral-200 shadow-xl transition-all duration-500 ease-out group-hover:-translate-y-2 group-hover:shadow-2xl dark:bg-neutral-900 dark:border-white/10 dark:group-hover:shadow-indigo-500/20 overflow-hidden">
                                        
                                        {/* Gradient Background Header */}
                                        <div className={`h-24 w-full bg-gradient-to-r ${member.color} opacity-80 group-hover:opacity-100 transition-opacity`}></div>
                                        
                                        {/* Avatar */}
                                        <div className="absolute top-12 left-1/2 -translate-x-1/2">
                                            <div className="h-24 w-24 rounded-full border-4 border-white bg-neutral-100 shadow-md flex items-center justify-center text-3xl font-bold text-neutral-700 dark:border-neutral-900 dark:bg-neutral-800 dark:text-white">
                                                {member.name.charAt(0)}
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="mt-14 p-6 text-center">
                                            <h3 className="font-bold text-lg text-neutral-900 dark:text-white">{member.name}</h3>
                                            <p className="text-xs font-mono text-neutral-500 dark:text-neutral-400 mb-2">{member.nim}</p>
                                            <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium bg-neutral-100 text-neutral-600 dark:bg-white/10 dark:text-neutral-300`}>
                                                {member.role}
                                            </span>
                                            
                                            {/* Social Mockups (Hidden by default, show on hover) */}
                                            <div className="mt-6 flex justify-center gap-4 opacity-0 transform translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                                                <Github className="h-5 w-5 text-neutral-400 hover:text-neutral-900 dark:hover:text-white cursor-pointer" />
                                                <Linkedin className="h-5 w-5 text-neutral-400 hover:text-blue-600 cursor-pointer" />
                                                <Twitter className="h-5 w-5 text-neutral-400 hover:text-sky-500 cursor-pointer" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* --- FOOTER --- */}
                    <footer className="border-t border-neutral-200 bg-white py-12 dark:border-white/10 dark:bg-[#050505]">
                        <div className="mx-auto max-w-7xl px-6 flex flex-col md:flex-row justify-between items-center gap-4">
                            <div className="flex items-center gap-2 font-bold text-neutral-900 dark:text-white">
                                <div className="h-6 w-6 rounded bg-indigo-600"></div>
                                <span>FST Reader.</span>
                            </div>
                            <p className="text-sm text-neutral-500 dark:text-gray-600">&copy; 2025 Kelompok Pemrograman Platform. UIN Jakarta.</p>
                        </div>
                    </footer>
                </main>
            </div>
        </>
    );
}