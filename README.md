# 📚 Interactive e-Pub Reader Web App

Aplikasi pembaca e-Pub berbasis web yang interaktif, dibangun dengan teknologi modern untuk pengalaman membaca yang lancar dan responsif.

## 🛠 Tech Stack

* **Backend:** Laravel 12 (PHP)
* **Frontend:** React.js + Inertia.js
* **Styling:** Tailwind CSS
* **Language:** TypeScript
* **Database:** MySQL / SQLite

---

## 🚀 Cara Install & Menjalankan Project

Pilih metode instalasi sesuai kebutuhan Anda:

### 🅰️ Metode 1: Mode Developer (Branch `main`)

*Gunakan cara ini jika Anda ingin mengedit kode (frontend/backend).*

**Prerequisites:**

* PHP >= 8.2
* Composer
* Node.js & NPM

**Langkah-langkah:**

1. **Clone Repository:**
```bash
git clone https://github.com/arxycth/epub-reader/
cd epub-reader

```


2. **Install Dependencies:**
```bash
composer install
npm install

```


3. **Setup Environment:**
* Copy file `.env.example` menjadi `.env`.
* Atur koneksi database di `.env`.


4. **Generate Key & Migrate:**
```bash
php artisan key:generate
php artisan migrate
php artisan storage:link

```


5. **Jalankan Aplikasi:**
Buka 2 terminal terpisah:
* Terminal 1: `php artisan serve`
* Terminal 2: `npm run dev`



---

### 🅱️ Metode 2: Mode Siap Pakai (Branch `release`)

*Gunakan cara ini jika Anda hanya ingin menjalankan aplikasi **tanpa menginstall Node.js**.*

**Prerequisites:**

* PHP >= 8.2
* Composer
* **TIDAK PERLU** Node.js/NPM

**Langkah-langkah:**

1. **Clone Branch Release:**
Pastikan Anda mengambil branch yang sudah memiliki aset build.
```bash
git clone -b release https://github.com/username/repo-anda.git
cd repo-anda

```


2. **Install PHP Dependencies:**
```bash
composer install --no-dev

```


*(Note: Kita tetap butuh composer untuk mengunduh library PHP, tapi tidak perlu `npm install`)*.
3. **Setup Environment:**
* Copy file `.env.example` menjadi `.env`.
* (Opsional) Ubah `APP_ENV=local` menjadi `APP_ENV=production`.
* Atur database (bisa gunakan SQLite agar portable).


4. **Setup Aplikasi:**
```bash
php artisan key:generate
php artisan migrate
php artisan storage:link

```


5. **Jalankan Aplikasi:**
Cukup jalankan satu perintah:
```bash
php artisan serve

```


Buka browser di `http://localhost:8000`.

---

## 📝 Catatan Penting

* Jika menggunakan **Metode 2**, jangan menjalankan `npm run dev` atau `npm run build` karena source code frontend mungkin tidak disertakan secara lengkap atau sudah dalam bentuk file jadi (compiled assets) di folder `public/build`.
* Pastikan folder `storage/` dan `bootstrap/cache/` memiliki izin tulis (writable permission).

---

