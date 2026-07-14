# Implementation Plan: Cafe UI Styling

## Overview

Implementasi design token system berbasis CSS custom properties dan peningkatan styling semua komponen WPU Cafe. Semua perubahan terbatas pada file `*.module.css` dan modifikasi minimal pada tiga file `.tsx` (Home, ListOrder, DetailOrder) untuk menambah elemen DOM yang diperlukan. Urutan pengerjaan: globals.css terlebih dahulu sebagai fondasi, dilanjutkan komponen UI primitif, lalu halaman-halaman.

## Tasks

- [x] 1. Setup test framework dan buat file globals.css dengan design tokens
  - Install Vitest, @testing-library/react, @testing-library/jest-dom, jsdom, dan fast-check sebagai devDependencies
  - Tambah konfigurasi `test` di `vite.config.ts` (atau buat file baru) dengan `environment: "jsdom"` dan `setupFiles`
  - Buat `src/test/setup.ts` yang mengimport `@testing-library/jest-dom`
  - Buat direktori `src/styles/` dan file `src/styles/globals.css`
  - Deklarasikan semua CSS custom properties di selector `:root`: 5 token warna (`--color-primary`, `--color-text-primary`, `--color-bg-default`, `--color-surface`, `--color-border`), 2 token warna status (`--color-status-processing`, `--color-status-completed`), 4 token tipografi (`--font-size-base`, `--font-size-lg`, `--font-size-xl`, `--font-weight-bold`), 9 token spasi/radius (`--spacing-xs` s.d. `--spacing-xl`, `--radius-sm`, `--radius-md`, `--radius-lg`), dan 1 token shadow (`--shadow-card`)
  - Import `src/styles/globals.css` di `src/main.tsx`
  - _Requirements: 1.1, 1.2, 1.3_

- [x] 2. Update Button component styling
  - [x] 2.1 Rewrite `Button.module.css` untuk menggunakan design tokens
    - Ganti `border-radius: 0.5rem` → `var(--radius-sm)` pada kelas `.button`
    - Ganti `padding: 12px 16px` → `var(--spacing-sm) var(--spacing-md)` pada kelas `.button`
    - Ganti `font-weight: 700` → `var(--font-weight-bold)` pada kelas `.button`
    - Tambah `transition: opacity 150ms ease-in-out, background-color 150ms ease-in-out` pada `.button`
    - Update `.button-primary`: ganti semua hex values → `var(--color-primary)`, `var(--color-bg-default)`
    - Update `.button-secondary`: ganti semua hex values → `var(--color-bg-default)`, `var(--color-primary)`, `var(--color-border)`
    - Tambah selector `:hover:not([disabled])` dengan `opacity: 0.85`
    - Tambah selector `:focus-visible` dengan `outline: 2px solid var(--color-primary); outline-offset: 2px`
    - Tambah selector `:disabled, [disabled]` dengan `opacity: 0.5; cursor: not-allowed`
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5_

  - [ ]* 2.2 Tulis unit tests untuk Button states
    - Test bahwa kelas `.button-primary` hadir saat prop `color` tidak diberikan
    - Test bahwa kelas `.button-secondary` hadir saat prop `color="secondary"`
    - Test bahwa atribut `disabled` ter-render di DOM saat prop `disabled` diberikan
    - _Requirements: 2.1, 2.4_

- [x] 3. Update Input component styling
  - [x] 3.1 Rewrite `Input.module.css` untuk menggunakan design tokens
    - Update `.label`: ganti `gap: 8px` → `var(--spacing-sm)`, `font-weight: bold` → `var(--font-weight-bold)`, tambah `font-size: var(--font-size-base)`
    - Update `.input`: ganti `padding: 12px 16px` → `var(--spacing-sm) var(--spacing-md)`, `border-radius: 8px` → `var(--radius-sm)`, `border: 1px solid #1c1c1c` → `border: 1px solid var(--color-border)`
    - Tambah `transition: border-color 150ms ease-in-out, box-shadow 150ms ease-in-out` pada `.input`
    - Tambah selector `.input:focus` dengan `border-color: var(--color-primary)` dan `box-shadow: 0 0 0 3px rgba(28, 28, 28, 0.15)` dan `outline: none`
    - Tambah selector `.input::placeholder` dengan `opacity: 0.5`
    - Tambah selector `.input:disabled` dengan `background-color: var(--color-surface); cursor: not-allowed`
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5_

  - [ ]* 3.2 Tulis unit tests untuk Input states
    - Test label merender dengan teks yang diberikan via prop `label`
    - Test elemen `<input>` merender dengan atribut `disabled` saat prop `disabled` diberikan
    - _Requirements: 3.1, 3.4_

- [x] 4. Update Select component styling
  - [x] 4.1 Rewrite `Select.module.css` untuk konsistensi dengan Input dan tambah ikon kustom
    - Update `.label`: ganti nilai hardcoded `gap: 8px` → `var(--spacing-sm)`, tambah `font-size: var(--font-size-base)`, `font-weight: var(--font-weight-bold)`
    - Update `.select`: ganti padding → `var(--spacing-sm) var(--spacing-md)`, `border-radius: 8px` → `var(--radius-sm)`, `border: 1px solid #1c1c1c` → `border: 1px solid var(--color-border)`, tambah `font-size: var(--font-size-base)`, `font-family: inherit`
    - Pastikan `appearance: none` tetap ada, tambah `background-image` dengan SVG data URI untuk ikon panah kustom (`▼`), `background-repeat: no-repeat`, `background-position: right var(--spacing-sm) center`, `padding-right: var(--spacing-xl)`
    - Tambah `transition: border-color 150ms ease-in-out, box-shadow 150ms ease-in-out`
    - Tambah selector `.select:focus` dengan nilai **identik** dengan `.input:focus` di `Input.module.css`: `border-color: var(--color-primary)`, `box-shadow: 0 0 0 3px rgba(28, 28, 28, 0.15)`, `outline: none`
    - Tambah selector `.select:disabled` dengan `opacity: 0.5; cursor: not-allowed`
    - _Requirements: 4.1, 4.2, 4.3, 4.4_

  - [ ]* 4.2 Tulis unit tests untuk Select
    - Test elemen `<select>` merender dengan options yang diberikan
    - Test elemen `<select>` merender dengan atribut `disabled` saat prop `disabled` diberikan
    - _Requirements: 4.1, 4.4_

- [x] 5. Checkpoint — pastikan semua tests UI primitif lulus
  - Pastikan semua tests lulus, tanyakan kepada user jika ada pertanyaan.

- [x] 6. Update Home page
  - [x] 6.1 Update `Home.module.css` dengan design tokens dan responsive layout
    - Update `.home`: ganti `height: 100vh` → `min-height: 100vh`, ganti `gap: 8px` → `var(--spacing-sm)`
    - Tambah `padding: var(--spacing-md)` di dalam media query `@media screen and (max-width: 600px)`
    - Tambah selector untuk `h1`: `font-size: var(--font-size-xl)`
    - _Requirements: 5.1, 5.2_

  - [x] 6.2 Modifikasi `Home.tsx` untuk menambah elemen deskripsi
    - Tambah elemen `<p>` dengan teks deskripsi singkat (contoh: "Kelola pesanan kafe Anda dengan mudah dan cepat.") di antara `<h1>` dan `<Link>` di dalam JSX
    - Tambah styling pada `.home p` atau kelas baru di `Home.module.css` untuk mengatur font-size (gunakan `var(--font-size-base)`) agar rasio `h1 : p` minimal 1.5×
    - _Requirements: 5.3, 5.4_

  - [ ]* 6.3 Tulis unit tests untuk Home page
    - Test `<h1>` merender dengan teks "Welcome To WPU Cafe"
    - Test elemen deskripsi `<p>` hadir di DOM dan berada antara `<h1>` dan tombol Login
    - _Requirements: 5.3_

- [ ] 7. Update Login page styling
  - [x] 7.1 Rewrite `Login.module.css` untuk menggunakan design tokens
    - Update `.card`: ganti `box-shadow: 0px 0px 5px rgba(0,0,0,0.2)` → `var(--shadow-card)`, `padding: 32px` → `var(--spacing-xl)`, `border-radius: 20px` → `var(--radius-lg)`, tambah `max-width: 400px`
    - Update media query `@media screen and (max-width: 768px)`: lebar `.card` tetap `100%`
    - Update `.title`: ganti `font-size: 32px` → `var(--font-size-xl)`, tambah `font-weight: var(--font-weight-bold)`
    - Update `.form`: ganti `gap: 24px` → `var(--spacing-md)` (AC 6.4 mensyaratkan `--spacing-md` minimum 16px)
    - _Requirements: 6.1, 6.2, 6.3, 6.4_

  - [ ]* 7.2 Tulis unit tests untuk Login page
    - Test elemen judul merender dengan teks "Login"
    - Test form merender dengan dua input field (email dan password)
    - _Requirements: 6.2_

- [ ] 8. Update ListOrder page — CSS dan JSX
  - [x] 8.1 Update `ListOrder.module.css` dengan thead styling, hover state, overflow wrapper, dan spacing tokens
    - Update `.order`: pastikan `padding: 16px` → `var(--spacing-md)`
    - Update `.header`: pastikan `margin-bottom: 20px` → `var(--spacing-lg)`
    - Update `.button`: ganti `gap: 20px` → `var(--spacing-lg)`
    - Tambah selector `thead tr` dengan `background-color: var(--color-primary); color: var(--color-bg-default)`
    - Tambah selector `tbody tr:hover` dengan `background-color: var(--color-surface)`
    - Tambah kelas `.table-wrapper` dengan `overflow-x: auto`
    - Tambah kelas `.badge` dengan padding `var(--spacing-xs) var(--spacing-sm)`, `border-radius: var(--radius-sm)`, `font-weight: var(--font-weight-bold)`, `font-size: var(--font-size-base)`
    - Tambah kelas `.badge-processing` dengan `background-color: var(--color-status-processing)`
    - Tambah kelas `.badge-completed` dengan `background-color: var(--color-status-completed)`
    - Update `.action`: ganti `gap: 10px` → `var(--spacing-sm)`
    - _Requirements: 7.1, 7.2, 7.4, 7.5, 10.2_

  - [x] 8.2 Modifikasi `ListOrder.tsx` untuk menambah Status Badge dan table wrapper
    - Tambah helper function `getStatusBadgeClass(status: string)` di dalam komponen yang mengembalikan `styles["badge-processing"]`, `styles["badge-completed"]`, atau `null`
    - Update cell kolom `Status` di `<tbody>`: jika `getStatusBadgeClass` mengembalikan nilai non-null, render `<span className={styles.badge + " " + getStatusBadgeClass(order.status)}>{order.status}</span>`; jika `null`, render teks biasa
    - Bungkus elemen `<table>` dengan `<div className={styles["table-wrapper"]}>`
    - _Requirements: 7.3, 7.4_

  - [ ]* 8.3 Tulis property test untuk Status Badge (Property 1)
    - **Property 1: Status Badge class assignment adalah fungsi dari nilai status**
    - **Validates: Requirements 7.3**
    - Gunakan `fc.array(fc.record({ id, customer_name, table_number, total, status }))` dengan `fc.oneof` untuk status (`"PROCESSING"`, `"COMPLETED"`, string acak)
    - Mock `getOrders` menggunakan `vi.mock` agar mengembalikan generated orders
    - Verifikasi setiap baris: status `"PROCESSING"` → elemen span dengan kelas yang mengandung `badge-processing`; `"COMPLETED"` → `badge-completed`; lainnya → tidak ada elemen span badge
    - Konfigurasi `numRuns: 100`
    - _Requirements: 7.3_

- [ ] 9. Update CreateOrder page styling
  - [x] 9.1 Update `CreateOrder.module.css` dengan design tokens dan interactive states
    - Update `.create`: pastikan `gap: 32px` → `var(--spacing-xl)`, `padding: 16px` → `var(--spacing-md)`
    - Update `.filter`: ganti `gap: 16px` → `var(--spacing-md)`, `margin: 16px 0` → `var(--spacing-md) 0`
    - Update `.list`: ganti `gap: 16px` → `var(--spacing-md)`, `margin-top: 20px` → `var(--spacing-lg)`
    - Update `.list .item`: ganti `box-shadow` → `var(--shadow-card)`, `padding: 16px` → `var(--spacing-md)`, `border-radius: 24px` → `var(--radius-lg)`
    - Tambah selector `.list .item:hover` dengan `box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12); transform: translateY(-4px); transition: box-shadow 150ms ease-in-out, transform 150ms ease-in-out`
    - Update `.list .bottom`: ganti `margin-bottom: 10px` → `var(--spacing-sm)`
    - Update `.form`: ganti `box-shadow` → `var(--shadow-card)`, `padding: 16px` → `var(--spacing-md)`, `border-radius: 24px` → `var(--radius-lg)`, `top: 20px` boleh tetap literal
    - Update `.form .header`: ganti `margin-bottom: 16px` → `var(--spacing-md)`
    - Update `.form .input, .form .cart`: ganti `background-color: #f7f7f7` → `var(--color-surface)`, `border-radius: 16px` → `var(--radius-md)`, `gap: 16px` → `var(--spacing-md)`, `padding: 16px` → `var(--spacing-md)`
    - Update `.form .cart .item .quantity`: ganti `gap: 16px` → `var(--spacing-md)`
    - Tambah kelas `.empty-cart` dengan `font-size: var(--font-size-base); color: var(--color-border); text-align: center`
    - Tambah media query `@media screen and (max-width: 768px)` untuk `.list`: `grid-template-columns: 1fr`
    - _Requirements: 8.1, 8.2, 8.3, 8.5, 10.2_

  - [ ]* 9.2 Tulis unit tests untuk CreateOrder page
    - Test bahwa elemen teks "Your cart is empty" merender saat keranjang kosong
    - Test bahwa grid item menu merender saat ada data menu
    - _Requirements: 8.5_

- [ ] 10. Update DetailOrder page — CSS dan JSX
  - [x] 10.1 Update `DetailOrder.module.css` dengan design tokens dan responsive breakpoints
    - Update `.detail`: pastikan `padding: 16px` → `var(--spacing-md)`
    - Update `.header`: ganti `margin-bottom: 20px` → `var(--spacing-lg)`
    - Update `.info`: ganti `background-color: #ececec` → `var(--color-surface)`, `border-radius: 20px` → `var(--radius-lg)`, `padding: 20px` → `var(--spacing-md)`, `gap: 20px` → `var(--spacing-md)`
    - Update `.info .item`: ganti `gap: 8px` → `var(--spacing-sm)`
    - Update `.cart`: ganti `margin-top: 20px` → `var(--spacing-lg)`
    - Update `.list`: ganti `gap: 16px` → `var(--spacing-md)`, `margin-top: 16px` → `var(--spacing-md)` — **hapus** deklarasi `grid-template-columns` yang ada, diganti dengan tiga media query
    - Update `.list .item`: ganti `background-color: #ececec` → `var(--color-surface)`, `border-radius: 20px` → `var(--radius-lg)`, `padding: 16px` → `var(--spacing-md)`, `gap: 20px` → `var(--spacing-md)`
    - Update `.image`: padding sudah ok, pastikan ukuran tetap `60px × 60px`
    - Update `.name, .price`: ganti `font-size: 24px` → `var(--font-size-lg)`, `margin-bottom: 8px` → `var(--spacing-sm)`
    - Tambah kelas `.badge`, `.badge-processing`, `.badge-completed` dengan nilai **identik** (nama kelas dan nilai CSS_Variable sama) dengan yang ada di `ListOrder.module.css`
    - Tambah kelas `.error` dengan `padding: var(--spacing-md); color: var(--color-primary)`
    - Tambah tiga media query responsif untuk `.list`:
      - `@media screen and (max-width: 768px)`: `grid-template-columns: 1fr`
      - `@media screen and (min-width: 769px) and (max-width: 1024px)`: `grid-template-columns: repeat(2, 1fr)`
      - `@media screen and (min-width: 1025px)`: `grid-template-columns: repeat(3, 1fr)`
    - _Requirements: 9.1, 9.2, 9.3, 9.4, 10.2_

  - [x] 10.2 Modifikasi `DetailOrder.tsx` untuk error handling dan Status Badge
    - Tambah state `const [error, setError] = useState<string | null>(null)` di atas `order` state
    - Bungkus `fetchOrder` dengan `try/catch`: di blok `catch`, panggil `setError("Gagal memuat data pesanan")`
    - Tambah early return sebelum JSX utama: `if (error) return <p className={styles.error}>{error}</p>`
    - Tambah helper function `getStatusBadgeClass(status: string)` yang identik dengan di `ListOrder.tsx`
    - Update render field Status di dalam `.info`: ganti `<h4>{order?.status}</h4>` → `<h4>{order?.status ? (<span className={`${styles.badge} ${getStatusBadgeClass(order.status) ?? ""}`}>{order.status}</span>) : null}</h4>` (atau pola ekuivalen yang merender badge jika status adalah PROCESSING/COMPLETED)
    - Tambah `useEffect` dependency `[id]` (sudah seharusnya ada)
    - _Requirements: 9.3, 9.5_

  - [ ]* 10.3 Tulis property test untuk Status Badge konsistensi (Property 2)
    - **Property 2: Status Badge class konsisten antara ListOrder dan DetailOrder**
    - **Validates: Requirements 9.3**
    - Import fungsi `getStatusBadgeClass` dari kedua komponen (atau ekstrak ke helper yang bisa ditest)
    - Gunakan `fc.constantFrom("PROCESSING", "COMPLETED")` sebagai generator
    - Verifikasi bahwa nama kelas CSS lokal (sebelum CSS Modules hashing) yang dihasilkan oleh fungsi `getStatusBadgeClass` untuk nilai status yang sama menghasilkan string yang identik di kedua komponen
    - Konfigurasi `numRuns: 100`
    - _Requirements: 9.3_

  - [ ]* 10.4 Tulis unit tests untuk DetailOrder error state
    - Mock `getOrderById` agar throw error menggunakan `vi.mock`
    - Render komponen, tunggu dengan `waitFor`
    - Verifikasi elemen error dengan teks "Gagal memuat data pesanan" hadir di DOM
    - Verifikasi elemen `.info` tidak hadir di DOM
    - _Requirements: 9.5_

- [ ] 11. Checkpoint — pastikan semua tests halaman lulus
  - Pastikan semua tests lulus, tanyakan kepada user jika ada pertanyaan.

- [x] 12. Audit dan koreksi zero hardcoded values
  - Lakukan grep pada semua file `*.module.css` di `src/` untuk pola: nilai hex (`#[0-9a-fA-F]{3,6}`), nilai `rgba(` dan `hsl(` literal, dan nilai px untuk spasi/radius yang bukan `0`
  - Untuk setiap temuan, ganti dengan referensi ke CSS_Variable yang sesuai dari `globals.css`
  - Verifikasi bahwa pengecualian yang diizinkan tetap valid: `0`, `100%`, `auto`, `none`, `inherit`, `transparent`, `1px solid`, dan `0.5` untuk opacity disabled
  - _Requirements: 1.4, 10.1_

  - [ ]* 12.1 Tulis CSS static analysis test untuk verifikasi zero hardcoded values
    - Gunakan `fs.readFileSync` di Vitest untuk membaca semua file `*.module.css`
    - Test bahwa tidak ada pola regex `/#[0-9a-fA-F]{3,8}/` di luar blok `:root`
    - Test bahwa tidak ada pola `rgba\(` atau `hsl\(` literal di file `*.module.css`
    - Test bahwa semua token yang didefinisikan di `globals.css` ada di `:root`
    - _Requirements: 1.4, 10.1_

- [ ] 13. Final checkpoint — pastikan semua tests lulus dan build sukses
  - Jalankan `npm run build` untuk memastikan tidak ada TypeScript error
  - Pastikan semua Vitest tests lulus dengan `npx vitest --run`
  - Tanyakan kepada user jika ada pertanyaan.

## Notes

- Tasks bertanda `*` bersifat opsional dan dapat dilewati untuk MVP yang lebih cepat
- Setiap task mereferensikan requirements spesifik untuk traceability
- Task 1 (globals.css dan test setup) **harus diselesaikan lebih dulu** — semua task lainnya bergantung pada token yang didefinisikan di sana
- Tiga file `.tsx` yang perlu dimodifikasi: `Home.tsx` (task 6.2), `ListOrder.tsx` (task 8.2), `DetailOrder.tsx` (task 10.2)
- Property tests menggunakan fast-check dengan `numRuns: 100` minimum
- CSS Modules meng-hash nama kelas saat build; property tests untuk konsistensi badge perlu membandingkan nama kelas lokal (sebelum hashing) bukan nama kelas hasil compile
