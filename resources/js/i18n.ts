import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

i18n.use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: {
            id: {
                translation: {
                    dashboard: {
                        title: 'Dasbor',
                    },
                    settings_layout: {
                        title: 'Pengaturan',
                        description: 'Kelola profil dan pengaturan akun Anda',
                        nav: {
                            profile: 'Profil',
                            password: 'Kata Sandi',
                            two_factor: 'Otentikasi Dua Faktor',
                            appearance: 'Tampilan',
                        },
                    },
                    sidebar: {
                        dashboard: 'Dasbor',
                        library: 'Perpustakaan',
                        upload: 'Upload Buku',
                        application_group: 'Aplikasi',
                        front_page: 'Halaman Depan',
                    },

                    common: {
                        search_placeholder: 'Cari judul buku atau penulis...',
                        apply_filter: 'Terapkan Filter',
                        loading: 'Memuat...',
                        prev: 'Sebelumnya',
                        next: 'Selanjutnya',
                        page: 'Hal',
                        delete: 'Hapus',
                        cancel: 'Batal',
                        save: 'Simpan',
                        close: 'Tutup',
                        back: 'Kembali',
                    },
                    index: {
                        title: 'Perpustakaan Digital',
                        subtitle:
                            'Jelajahi koleksi ePub karya mahasiswa dan dosen FST.',
                        upload_btn: 'Upload Buku',
                        not_found: 'Tidak ada buku ditemukan',
                        not_found_sub:
                            'Coba ubah kata kunci pencarian atau kategori program studi Anda.',
                        clear_filter: 'Hapus semua filter',
                    },
                    reader: {
                        read_progress: 'Dibaca',
                        toc: 'Daftar Isi',
                        search: 'Pencarian', // Update dari 'Cari' agar lebih formal
                        bookmarks: 'Bookmark',
                        highlights: 'Highlight',
                        no_bookmarks: 'Belum ada bookmark',
                        no_highlights: 'Belum ada highlight',
                        save_highlight: 'Simpan Highlight',
                        text_label: 'Teks',
                        note_label: 'Catatan (opsional)',
                        note_placeholder: 'Tambahkan catatan...',
                        color_yellow: 'Warna Kuning',
                    },
                    welcome: {
                        meta_title: 'Selamat Datang di FST Reader',
                        hero: {
                            badge: 'Proyek Akhir Pemrograman Platform',
                            title_top: 'Baca Buku Digital',
                            title_gradient: 'Tanpa Batas.',
                            description:
                                'Platform ePub reader modern untuk mahasiswa FST. Akses ribuan referensi akademik dengan pengalaman membaca yang nyaman dan responsif.',
                            btn_read: 'Mulai Membaca',
                            btn_team: 'Lihat Tim',
                        },
                        features: {
                            badge: 'Didesain untuk Akademisi.',
                            subtitle:
                                'Fitur lengkap untuk mendukung kegiatan belajar mengajar di FST.',
                            ui_title: 'Antarmuka Modern',
                            ui_desc:
                                'Tampilan dashboard yang bersih, bebas gangguan, dan responsif di semua perangkat.',
                            search_title: 'Pencarian Cepat',
                            search_desc:
                                'Algoritma pencarian canggih untuk menemukan judul buku.',
                            dark_title: 'Mode Gelap',
                            dark_desc:
                                'Otomatis menyesuaikan dengan preferensi sistem Anda.',
                            perform_badge: 'Performa Tinggi',
                            perform_title: 'Dibangun dengan Laravel & React',
                            perform_desc:
                                'Kombinasi backend PHP yang solid dan frontend React yang interaktif melalui Inertia.js.',
                        },
                        team: {
                            title: 'Tim Pengembang',
                            subtitle:
                                'Mahasiswa Teknik Informatika UIN Jakarta',
                        },
                        footer: {
                            copy: 'Kelompok Pemrograman Platform. UIN Jakarta.',
                        },
                    },
                    upload: {
                        title: 'Upload Buku Baru',
                        subtitle:
                            'Lengkapi data buku dan unggah file ePub Anda ke perpustakaan FST.',
                        label_title: 'Judul Buku',
                        label_author: 'Penulis',
                        label_prodi: 'Program Studi',
                        label_cover: 'Cover Buku',
                        label_epub: 'File ePub',
                        placeholder_title: 'Contoh: Pemrograman Web Modern',
                        placeholder_author: 'Nama Penulis atau Dosen',
                        select_prodi: 'Pilih Program Studi',
                        preview_empty: 'Pratinjau cover akan muncul di sini',
                        submit: 'Simpan & Publikasikan',
                        uploading: 'Mengunggah...',
                        prodi: {
                            ti: 'Teknik Informatika',
                            si: 'Sistem Informasi',
                            kim: 'Kimia',
                            fis: 'Fisika',
                            algi: 'Algikultur',
                            mat: 'Matematika',
                            bio: 'Biologi',
                        },
                    },
                    card: {
                        unknown_author: 'Penulis tidak diketahui',
                        progress: 'Progress',
                        pages_read: 'Halaman terbaca',
                        not_started: 'Belum dibaca',
                        continue_read: 'Lanjut Baca',
                        start_read: 'Mulai Baca',
                        confirm_delete: 'Hapus buku "{{title}}"?',
                    },

                    user_menu: {
                        login: 'Masuk',
                        register: 'Daftar',
                        settings: 'Pengaturan',
                        logout: 'Keluar',
                    },
                    auth: {
                        login: {
                            title: 'Selamat Datang Kembali',
                            subtitle:
                                'Masukkan kredensial Anda untuk mengakses perpustakaan digital FST.',
                            label_email: 'Email',
                            placeholder_email: 'nama@uinjkt.ac.id',
                            label_password: 'Password',
                            forgot_password: 'Lupa password?',
                            label_remember: 'Ingat saya',
                            button_submit: 'Masuk',
                            no_account: 'Belum punya akun?',
                            link_register: 'Daftar sekarang',
                        },
                        visual_login: {
                            title_top: 'Perpustakaan dalam',
                            title_gradient: 'Genggaman Anda',
                            description:
                                'Akses ribuan buku dan jurnal akademik dari mana saja, kapan saja. Dibangun untuk mahasiswa UIN Jakarta.',
                        },
                        register: {
                            title: 'Buat Akun Baru',
                            subtitle:
                                'Bergabunglah untuk mengakses referensi akademik lengkap.',
                            label_name: 'Nama Lengkap',
                            placeholder_name: 'Masukkan nama Anda',
                            label_email: 'Email',
                            placeholder_email: 'nama@uinjkt.ac.id',
                            label_password: 'Password',
                            placeholder_password: 'Minimal 8 karakter',
                            label_confirm_password: 'Konfirmasi Password',
                            placeholder_confirm_password: 'Ulangi password',
                            button_submit: 'Daftar Sekarang',
                            has_account: 'Sudah punya akun?',
                            link_login: 'Masuk disini',
                        },
                        visual: {
                            title_top: 'Mulai Perjalanan',
                            title_gradient: 'Akademik Anda',
                            description:
                                'Dapatkan akses ke koleksi digital, simpan buku favorit, dan sinkronisasi progress membaca antar perangkat.',
                            feature_free: 'Akun Gratis',
                            feature_access: 'Akses 24/7',
                        },
                    },

                    settings: {
                        appearance_title: 'Pengaturan Tampilan',
                        appearance_desc:
                            'Perbarui pengaturan tampilan akun Anda',
                        language_title: 'Bahasa Antarmuka',
                        language_desc:
                            'Pilih bahasa antarmuka yang ingin Anda gunakan',
                    },
                },
            },
            en: {
                translation: {
                    auth: {
                        login: {
                            title: 'Welcome Back',
                            subtitle:
                                'Enter your credentials to access the FST digital library.',
                            label_email: 'Email',
                            placeholder_email: 'name@uinjkt.ac.id',
                            label_password: 'Password',
                            forgot_password: 'Forgot password?',
                            label_remember: 'Remember me',
                            button_submit: 'Log in',
                            no_account: "Don't have an account?",
                            link_register: 'Register now',
                        },
                        visual_login: {
                            title_top: 'Library in',
                            title_gradient: 'Your Hand',
                            description:
                                'Access thousands of books and academic journals from anywhere, anytime. Built for UIN Jakarta students.',
                        },
                        register: {
                            title: 'Create New Account',
                            subtitle:
                                'Join us to access complete academic references.',
                            label_name: 'Full Name',
                            placeholder_name: 'Enter your name',
                            label_email: 'Email',
                            placeholder_email: 'name@uinjkt.ac.id',
                            label_password: 'Password',
                            placeholder_password: 'Minimum 8 characters',
                            label_confirm_password: 'Confirm Password',
                            placeholder_confirm_password: 'Repeat password',
                            button_submit: 'Register Now',
                            has_account: 'Already have an account?',
                            link_login: 'Login here',
                        },
                        visual: {
                            title_top: 'Start Your',
                            title_gradient: 'Academic Journey',
                            description:
                                'Get access to digital collections, save favorite books, and sync reading progress across devices.',
                            feature_free: 'Free Account',
                            feature_access: '24/7 Access',
                        },
                    },
                    welcome: {
                        meta_title: 'Welcome to FST Reader',
                        hero: {
                            badge: 'Platform Programming Final Project',
                            title_top: 'Read Digital Books',
                            title_gradient: 'Without Limits.',
                            description:
                                'A modern ePub reader platform for FST students. Access thousands of academic references with a comfortable and responsive reading experience.',
                            btn_read: 'Start Reading',
                            btn_team: 'Meet the Team',
                        },
                        features: {
                            badge: 'Designed for Academics.',
                            subtitle:
                                'Complete features to support teaching and learning activities at FST.',
                            ui_title: 'Modern Interface',
                            ui_desc:
                                'Clean, distraction-free dashboard layout, responsive on all devices.',
                            search_title: 'Fast Search',
                            search_desc:
                                'Advanced search algorithm to find book titles easily.',
                            dark_title: 'Dark Mode',
                            dark_desc:
                                'Automatically adjusts to your system preferences.',
                            perform_badge: 'High Performance',
                            perform_title: 'Built with Laravel & React',
                            perform_desc:
                                'A combination of solid PHP backend and interactive React frontend via Inertia.js.',
                        },
                        team: {
                            title: 'Meet the Makers',
                            subtitle:
                                'Informatics Engineering Students at UIN Jakarta',
                        },
                        footer: {
                            copy: 'Platform Programming Group. UIN Jakarta.',
                        },
                    },
                    dashboard: {
                        title: 'Dashboard',
                    },
                    user_menu: {
                        login: 'Login',
                        register: 'Get Started',
                        settings: 'Settings',
                        logout: 'Log out',
                    },
                    settings_layout: {
                        title: 'Settings',
                        description: 'Manage your profile and account settings',
                        nav: {
                            profile: 'Profile',
                            password: 'Password',
                            two_factor: 'Two-Factor Auth',
                            appearance: 'Appearance',
                        },
                    },
                    sidebar: {
                        dashboard: 'Dashboard',
                        library: 'Library',
                        upload: 'Upload Book',
                        application_group: 'Application',
                        front_page: 'Front Page',
                    },
                    common: {
                        search_placeholder: 'Search book title or author...',
                        apply_filter: 'Apply Filter',
                        loading: 'Loading...',
                        prev: 'Previous',
                        next: 'Next',
                        page: 'Page',
                        delete: 'Delete',
                        cancel: 'Cancel',
                        save: 'Save',
                        close: 'Close',
                        back: 'Back',
                    },
                    index: {
                        title: 'Digital Library',
                        subtitle:
                            'Explore ePub collections by FST students and lecturers.',
                        upload_btn: 'Upload Book',
                        not_found: 'No books found',
                        not_found_sub:
                            'Try changing your search keywords or program study category.',
                        clear_filter: 'Clear all filters',
                    },
                    reader: {
                        read_progress: 'Read',
                        toc: 'Table of Contents',
                        search: 'Search',
                        bookmarks: 'Bookmarks',
                        highlights: 'Highlights',
                        no_bookmarks: 'No bookmarks yet',
                        no_highlights: 'No highlights yet',
                        save_highlight: 'Save Highlight',
                        text_label: 'Text',
                        note_label: 'Note (optional)',
                        note_placeholder: 'Add a note...',
                        color_yellow: 'Yellow Color',
                    },
                    upload: {
                        title: 'Upload New Book',
                        subtitle:
                            'Complete the book data and upload your ePub file to the FST library.',
                        label_title: 'Book Title',
                        label_author: 'Author',
                        label_prodi: 'Program Study',
                        label_cover: 'Book Cover',
                        label_epub: 'ePub File',
                        placeholder_title: 'Ex: Modern Web Programming',
                        placeholder_author: 'Author or Lecturer Name',
                        select_prodi: 'Select Program Study',
                        preview_empty: 'Cover preview will appear here',
                        submit: 'Save & Publish',
                        uploading: 'Uploading...',
                        prodi: {
                            ti: 'Informatics Engineering',
                            si: 'Information Systems',
                            kim: 'Chemistry',
                            fis: 'Physics',
                            algi: 'Algiculture',
                            mat: 'Mathematics',
                            bio: 'Biology',
                        },
                    },
                    card: {
                        unknown_author: 'Unknown Author',
                        progress: 'Progress',
                        pages_read: 'Pages read',
                        not_started: 'Not started',
                        continue_read: 'Continue Reading',
                        start_read: 'Start Reading',
                        confirm_delete: 'Delete book "{{title}}"?',
                    },
                    settings: {
                        appearance_title: 'Appearance Settings',
                        appearance_desc:
                            "Update your account's appearance settings",
                        language_title: 'Interface Language',
                        language_desc:
                            'Select the interface language you want to use',
                    },
                },
            },
        },
        fallbackLng: 'id',
        interpolation: { escapeValue: false },
    });

export default i18n;
