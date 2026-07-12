# Requirements Document

## Introduction

Peningkatan visual dan pengalaman pengguna (UI/UX) pada aplikasi WPU Cafe — sebuah aplikasi POS frontend untuk staf kafe. Fokus pada pembaruan styling komponen-komponen yang sudah ada (Button, Input, Select, Home, Login, ListOrder, CreateOrder, DetailOrder) tanpa menambah komponen baru. Semua perubahan menggunakan CSS Modules (`*.module.css`) sesuai stack yang ada.

Tujuan utama:
- Tampilan yang lebih konsisten dan profesional
- Hierarki visual yang jelas (warna, tipografi, spasi)
- Interaksi yang responsif (hover, focus, disabled state)
- Pengalaman penggunaan yang nyaman di desktop maupun mobile

## Glossary

- **UI_System**: Keseluruhan sistem antarmuka visual WPU Cafe yang terdiri dari komponen halaman dan komponen UI primitif
- **Button**: Komponen tombol reusable di `src/components/ui/Button/`
- **Input**: Komponen input teks reusable di `src/components/ui/Input/`
- **Select**: Komponen dropdown reusable di `src/components/ui/Select/`
- **Home_Page**: Halaman landing publik di rute `/`
- **Login_Page**: Halaman autentikasi di rute `/login`
- **ListOrder_Page**: Halaman daftar pesanan terproteksi di rute `/orders`
- **CreateOrder_Page**: Halaman pembuatan pesanan terproteksi di rute `/create`
- **DetailOrder_Page**: Halaman detail pesanan terproteksi di rute `/orders/:id`
- **Design_Token**: Nilai CSS (warna, spasi, radius, bayangan) yang dideklarasikan sebagai CSS custom property di `:root` dan digunakan secara konsisten di seluruh komponen
- **Color_Palette**: Kumpulan warna utama yang mendefinisikan identitas visual aplikasi, dideklarasikan sebagai CSS_Variable di `globals.css`
- **Interactive_State**: Kondisi visual sebuah elemen saat di-hover (`:hover`), difokus via keyboard (`:focus-visible`), atau dinonaktifkan (`[disabled]` / `.disabled`)
- **Status_Badge**: Elemen `<span>` inline dengan CSS class tersendiri yang menampilkan status pesanan (PROCESSING / COMPLETED) dengan warna latar berbeda per status
- **CSS_Variable**: CSS custom property (`--nama-variabel`) yang dideklarasikan di selector `:root` pada `src/styles/globals.css` dan diakses via `var(--nama-variabel)` di file `*.module.css`
- **Hardcoded Value**: Nilai literal yang ditulis langsung di deklarasi properti CSS, seperti `#1c1c1c`, `rgba(0,0,0,0.2)`, `8px`, `16px` — berbeda dari nilai yang menggunakan `var(--token-name)`

---

## Requirements

### Requirement 1: Design Token dan CSS Variables Global

**User Story:** Sebagai developer, saya ingin nilai-nilai desain (warna, spasi, radius) didefinisikan sebagai CSS variables global, sehingga seluruh komponen dapat menggunakan nilai yang konsisten dan mudah diubah.

#### Acceptance Criteria

1. THE UI_System SHALL mendefinisikan tepat lima CSS_Variable warna berikut di selector `:root` pada file `src/styles/globals.css`, masing-masing dengan satu nilai warna konkret:
   - `--color-primary`: warna gelap utama (contoh nilai: `#1c1c1c`)
   - `--color-text-primary`: warna teks konten (contoh nilai: `#1c1c1c`)
   - `--color-bg-default`: warna latar belakang halaman (contoh nilai: `#ffffff`)
   - `--color-surface`: warna latar belakang surface/kartu (contoh nilai: `#ececec`)
   - `--color-border`: warna border default elemen (contoh nilai: `#1c1c1c`)

2. THE UI_System SHALL mendefinisikan tepat empat CSS_Variable tipografi berikut di selector `:root` pada file `src/styles/globals.css`:
   - `--font-size-base`: nilai antara `14px` dan `16px` inklusif
   - `--font-size-lg`: nilai antara `18px` dan `22px` inklusif
   - `--font-size-xl`: nilai minimum `28px`
   - `--font-weight-bold`: nilai `700`

3. THE UI_System SHALL mendefinisikan CSS_Variable spasi, radius, dan bayangan berikut di selector `:root` pada file `src/styles/globals.css` dengan nilai tepat:
   - `--spacing-xs`: `4px`
   - `--spacing-sm`: `8px`
   - `--spacing-md`: `16px`
   - `--spacing-lg`: `24px`
   - `--spacing-xl`: `32px`
   - `--radius-sm`: `8px`
   - `--radius-md`: `16px`
   - `--radius-lg`: `24px`
   - `--shadow-card`: minimal satu layer `box-shadow` (contoh: `0px 0px 4px rgba(0, 0, 0, 0.1)`)

4. THE UI_System SHALL memastikan bahwa tidak ada deklarasi properti CSS untuk `color`, `background-color`, `border-color`, `border-radius`, `padding`, `gap`, `margin`, atau `box-shadow` di dalam file `*.module.css` manapun yang menggunakan Hardcoded Value — setiap deklarasi properti tersebut WAJIB menggunakan `var(--token-name)` yang merujuk ke CSS_Variable di `:root`.

   **Pengecualian yang diizinkan:**
   - Nilai `0`, `100%`, `auto`, `none`, `inherit`, `transparent` tidak dianggap Hardcoded Value dan boleh digunakan langsung
   - Nilai `1px solid` pada deklarasi `border` shorthand (bagian lebar dan gaya, bukan warna) boleh ditulis literal
   - Nilai `0.5` pada `opacity` untuk disabled state boleh ditulis literal

---

### Requirement 2: Peningkatan Komponen Button

**User Story:** Sebagai staf kafe, saya ingin tombol-tombol memiliki tampilan yang jelas dan memberikan umpan balik visual saat berinteraksi, sehingga saya tahu tindakan apa yang sedang saya lakukan.

#### Acceptance Criteria

1. THE Button SHALL menampilkan gaya visual yang berbeda antara dua varian berikut dalam file `Button.module.css`:
   - Kelas `.button-primary`: `background-color: var(--color-primary)`, `color: var(--color-bg-default)`, `border: 1px solid var(--color-primary)`
   - Kelas `.button-secondary`: `background-color: var(--color-bg-default)`, `color: var(--color-primary)`, `border: 1px solid var(--color-border)`

2. WHEN kursor diarahkan ke Button yang tidak dalam kondisi `disabled` (selector `:hover`), THE Button SHALL mengubah salah satu dari berikut yang dapat diverifikasi di DevTools:
   - `opacity` menjadi nilai antara `0.75` dan `0.90` inklusif, ATAU
   - `background-color` menjadi nilai warna yang berbeda dari kondisi default

3. WHEN Button mendapatkan fokus keyboard (selector `:focus-visible`), THE Button SHALL menampilkan `outline` dengan:
   - Lebar minimum `2px`
   - `outline-offset` minimum `2px`
   - Deklarasi ini WAJIB ada di `Button.module.css` untuk mengesampingkan `outline: none` dari `globals.css` — nilai yang diterima: `outline: revert` atau deklarasi outline eksplisit seperti `outline: 2px solid var(--color-primary)`

4. WHEN Button berada dalam kondisi `disabled` (atribut HTML `disabled` pada elemen `<button>`), THE Button SHALL menerapkan selector `[disabled]` atau `:disabled` dalam `Button.module.css` dengan:
   - `opacity: 0.5` atau lebih rendah
   - `cursor: not-allowed`
   - Tidak ada perubahan visual pada `:hover` saat `disabled` (selector `:hover:not([disabled])` atau ekuivalen)

5. THE Button SHALL mendeklarasikan `transition` pada kelas `.button` dalam `Button.module.css` yang mencakup properti `opacity` dan `background-color` dengan:
   - Durasi antara `100ms` dan `200ms` inklusif
   - Timing function `ease-in-out` atau `ease`

---

### Requirement 3: Peningkatan Komponen Input

**User Story:** Sebagai staf kafe, saya ingin field input memiliki tampilan yang jelas dengan umpan balik visual saat saya mengisinya, sehingga saya dapat mengisi form dengan nyaman.

#### Acceptance Criteria

1. THE Input SHALL menampilkan label teks dengan deklarasi berikut pada kelas `.label` di `Input.module.css`:
   - `font-size: var(--font-size-base)`
   - `font-weight: var(--font-weight-bold)`
   - Tidak menggunakan nilai hardcoded untuk kedua properti tersebut

2. WHEN Input mendapatkan fokus (selector `.input:focus`), THE Input SHALL menerapkan perubahan berikut yang dapat diverifikasi di DevTools:
   - `border-color: var(--color-primary)` — berbeda dari kondisi default `var(--color-border)`
   - `box-shadow` dengan spread radius maksimal `4px` menggunakan warna `var(--color-primary)` (contoh: `0 0 0 3px rgba` dari warna primary dengan opacity rendah)

3. WHEN teks `::placeholder` dari Input ditampilkan, THE Input SHALL menerapkan selector `.input::placeholder` dengan:
   - `opacity` antara `0.4` dan `0.6` inklusif, ATAU
   - `color` yang berbeda dari `var(--color-text-primary)` — perbedaan harus dapat diverifikasi dari nilai computed style

4. WHEN Input berada dalam kondisi `disabled` (atribut HTML `disabled`), THE Input SHALL menerapkan selector `.input:disabled` dengan:
   - `background-color: var(--color-surface)` — tidak menggunakan nilai hex literal
   - `cursor: not-allowed`

5. THE Input SHALL mendeklarasikan `transition` pada kelas `.input` di `Input.module.css` yang mencakup:
   - Properti `border-color` dengan durasi antara `100ms` dan `200ms` inklusif
   - Properti `box-shadow` dengan durasi antara `100ms` dan `200ms` inklusif

---

### Requirement 4: Peningkatan Komponen Select

**User Story:** Sebagai staf kafe, saya ingin dropdown select memiliki tampilan yang konsisten dengan komponen Input, sehingga pengalaman mengisi form terasa seragam.

#### Acceptance Criteria

1. THE Select SHALL memiliki nilai yang identik dengan komponen Input untuk kelima properti berikut, keduanya mereferensikan CSS_Variable yang sama — tidak boleh ada perbedaan nilai antara `.select` dan `.input` untuk properti-properti ini:
   - `padding`: nilai sama (contoh: `var(--spacing-sm) var(--spacing-md)` atau ekuivalen `12px 16px` via token)
   - `border`: nilai same — `1px solid var(--color-border)`
   - `border-radius`: `var(--radius-sm)`
   - `font-size`: `var(--font-size-base)`
   - `font-family`: `inherit`

2. WHEN Select mendapatkan fokus (selector `.select:focus`), THE Select SHALL menampilkan perubahan `border-color` dan `box-shadow` yang identik dengan kondisi `:focus` komponen Input — kedua properti WAJIB mereferensikan CSS_Variable yang sama dengan yang digunakan di `Input.module.css`.

3. THE Select SHALL mendeklarasikan `appearance: none` pada kelas `.select` untuk menekan ikon panah native browser, DAN menampilkan ikon panah kustom melalui salah satu metode berikut yang dapat diverifikasi di DevTools:
   - `background-image` dengan nilai URL data SVG atau URL gambar, ATAU
   - Pseudo-element `::after` pada kontainer `.label` dengan konten karakter panah (`▼` atau ekuivalen)

   Ikon kustom WAJIB terlihat di sisi kanan elemen Select, dan seluruh area elemen Select WAJIB dapat diklik untuk membuka dropdown.

4. WHEN Select berada dalam kondisi `disabled` (atribut HTML `disabled`), THE Select SHALL menerapkan selector `.select:disabled` dengan:
   - `opacity: 0.5` — nilai yang sama persis dengan kondisi `disabled` komponen Button (AC 4.4) dan Input (AC 3.4)
   - `cursor: not-allowed`

---

### Requirement 5: Peningkatan Halaman Home

**User Story:** Sebagai staf kafe, saya ingin halaman awal aplikasi terlihat profesional dan menarik, sehingga memberikan kesan pertama yang baik saat membuka aplikasi.

#### Acceptance Criteria

1. THE Home_Page SHALL menampilkan elemen `<h1>` dengan deklarasi berikut di `Home.module.css`:
   - `font-size: var(--font-size-xl)` — nilai yang dikompute WAJIB minimum `28px`
   - Tidak menggunakan nilai hardcoded untuk properti `font-size`

2. THE Home_Page SHALL menampilkan layout dengan deklarasi berikut pada kelas `.home` di `Home.module.css`:
   - `min-height: 100vh`
   - `display: flex; align-items: center; justify-content: center; flex-direction: column`
   - Media query untuk viewport lebar ≤ `600px`: `padding` minimum `16px` di semua sisi (dapat menggunakan `var(--spacing-md)`)

3. WHEN halaman Home dirender, THE Home_Page SHALL menampilkan elemen teks deskripsi (tag `<p>` atau `<span>`) yang:
   - Diposisikan di antara elemen `<h1>` dan tombol Login dalam urutan DOM
   - Berisi teks antara `1` hingga `100` karakter inklusif
   - Ada di dalam DOM dan memiliki computed height > 0 (bukan `display: none` atau `visibility: hidden`)

4. THE Home_Page SHALL memastikan `font-size` elemen `<h1>` memiliki nilai computed yang minimum `1.5×` lebih besar dari `font-size` computed elemen teks deskripsi — rasio ini WAJIB dapat diverifikasi dari computed styles di browser DevTools.

---

### Requirement 6: Peningkatan Halaman Login

**User Story:** Sebagai staf kafe, saya ingin halaman login terlihat rapi dan profesional dengan kartu form yang terdefinisi dengan baik, sehingga proses masuk terasa aman dan nyaman.

#### Acceptance Criteria

1. THE Login_Page SHALL menampilkan form login di dalam elemen dengan kelas `.card` yang mendeklarasikan tiga properti berikut menggunakan CSS_Variable — tidak boleh menggunakan Hardcoded Value untuk ketiganya:
   - `border-radius: var(--radius-lg)` — nilai computed minimum `16px`
   - `box-shadow: var(--shadow-card)` — minimal satu layer box-shadow
   - `padding: var(--spacing-xl)` — nilai computed minimum `24px`

2. THE Login_Page SHALL menampilkan elemen judul dengan teks "Login" menggunakan deklarasi berikut di `Login.module.css`:
   - `font-size: var(--font-size-xl)` — nilai computed minimum `28px`
   - `font-weight: var(--font-weight-bold)` — nilai computed `700`
   - Tidak menggunakan nilai hardcoded untuk kedua properti tersebut

3. THE Login_Page SHALL memastikan elemen `.card` memiliki perilaku responsif berikut yang dapat diverifikasi dengan mengubah lebar viewport di browser:
   - Pada viewport lebar ≤ `768px`: lebar kartu `100%` dari kontainer
   - Pada viewport lebar > `768px`: lebar kartu `30%` dengan `max-width: 400px`

4. WHEN form Login ditampilkan, THE Login_Page SHALL menerapkan `gap: var(--spacing-md)` pada elemen `.form` di `Login.module.css` — nilai computed minimum `16px` — tidak menggunakan nilai hardcoded untuk properti `gap`.

---

### Requirement 7: Peningkatan Halaman List Order

**User Story:** Sebagai staf kafe, saya ingin daftar pesanan ditampilkan dalam tabel yang mudah dibaca dengan baris yang jelas, sehingga saya dapat dengan cepat menemukan dan memproses pesanan.

#### Acceptance Criteria

1. THE ListOrder_Page SHALL menampilkan elemen `<thead>` dengan deklarasi berikut di `ListOrder.module.css` pada selector yang menarget `thead` atau `thead tr`:
   - `background-color: var(--color-primary)`
   - `color: var(--color-bg-default)`
   - Perbedaan warna latar antara `<thead>` dan `<tbody>` WAJIB dapat diamati secara visual tanpa membaca konten sel

2. WHEN baris `<tbody>` di-hover (selector `tbody tr:hover`), THE ListOrder_Page SHALL mengubah `background-color` baris tersebut menjadi `var(--color-surface)` — perubahan ini:
   - WAJIB terlihat saat kursor berada di atas baris, tanpa memerlukan klik
   - TIDAK BOLEH mengubah nilai `color` teks yang sudah dideklarasikan pada kondisi default

3. THE ListOrder_Page SHALL menampilkan nilai kolom `Status` sebagai elemen Status_Badge dengan ketentuan berikut:
   - Untuk nilai `PROCESSING`: kelas CSS yang mendeklarasikan `background-color` bernilai warna kuning atau amber (contoh rentang hue HSL: 35–55)
   - Untuk nilai `COMPLETED`: kelas CSS yang mendeklarasikan `background-color` bernilai warna hijau (contoh rentang hue HSL: 100–160)
   - Kedua kelas WAJIB berbeda secara visual tanpa membaca teks label
   - IF nilai status dari API bukan `PROCESSING` dan bukan `COMPLETED`, THEN nilai tersebut ditampilkan sebagai teks biasa tanpa elemen Status_Badge

4. THE ListOrder_Page SHALL membungkus elemen `<table>` dalam elemen kontainer yang mendeklarasikan `overflow-x: auto` di `ListOrder.module.css` — sehingga tabel dapat di-scroll secara horizontal pada viewport yang lebih sempit dari lebar tabel.

5. THE ListOrder_Page SHALL menampilkan elemen header halaman dengan kelas `.header` yang mendeklarasikan:
   - `display: flex`
   - `justify-content: space-between`
   - `align-items: center`
   — sehingga judul halaman berada di sisi kiri dan tombol aksi berada di sisi kanan dalam satu baris yang sejajar secara vertikal.

---

### Requirement 8: Peningkatan Halaman Create Order

**User Story:** Sebagai staf kafe, saya ingin halaman pembuatan pesanan memiliki tata letak yang jelas antara daftar menu dan form pesanan, sehingga saya dapat memilih menu dan mengisi data pelanggan tanpa kebingungan.

#### Acceptance Criteria

1. THE CreateOrder_Page SHALL menampilkan kartu menu item dalam grid yang memenuhi ketentuan berikut di `CreateOrder.module.css`:
   - Pada viewport > `768px`: `grid-template-columns: repeat(3, 1fr)`
   - Setiap kartu memuat empat elemen yang semuanya terlihat tanpa terpotong: gambar dengan `height: 200px` dan `object-fit: cover`, nama menu, harga, dan tombol "Add to Cart"

2. WHEN kartu menu item di-hover (selector `.item:hover`), THE CreateOrder_Page SHALL menampilkan perubahan visual yang dapat diamati melalui salah satu dari berikut:
   - `box-shadow` dengan spread radius minimum `8px` (lebih besar dari nilai default), ATAU
   - `transform: translateY(-4px)`

   Perubahan ini WAJIB diimplementasikan dengan `transition` berdurasi antara `100ms` dan `200ms` inklusif.

3. THE CreateOrder_Page SHALL menampilkan panel form sebagai elemen dengan deklarasi berikut di `CreateOrder.module.css`:
   - `position: sticky`
   - `top: 20px`
   - `box-shadow: var(--shadow-card)` — tidak menggunakan Hardcoded Value
   - `border-radius: var(--radius-lg)` — tidak menggunakan Hardcoded Value

4. THE CreateOrder_Page SHALL memastikan tombol filter kategori aktif menggunakan kelas Button `primary` dan tombol filter tidak aktif menggunakan kelas Button `secondary` — perbedaan antara state aktif dan tidak aktif WAJIB dapat dibedakan secara visual tanpa membaca label tombol (mengacu pada perbedaan visual yang didefinisikan di AC 2.1).

5. WHEN keranjang belanja kosong, THE CreateOrder_Page SHALL menampilkan elemen teks "Your cart is empty" dengan deklarasi berikut di `CreateOrder.module.css`:
   - `font-size: var(--font-size-base)` — tidak menggunakan Hardcoded Value
   - `color: var(--color-border)` atau nilai warna yang lebih redup dari `var(--color-text-primary)` — tidak menggunakan Hardcoded Value
   - `text-align: center`

---

### Requirement 9: Peningkatan Halaman Detail Order

**User Story:** Sebagai staf kafe, saya ingin halaman detail pesanan menampilkan informasi pesanan secara terstruktur dan mudah dibaca, sehingga saya dapat memeriksa detail pesanan dengan cepat.

#### Acceptance Criteria

1. THE DetailOrder_Page SHALL menampilkan panel informasi pesanan yang memuat tepat lima field (Order ID, Customer Name, Table Number, Status, Total) dengan deklarasi berikut di `DetailOrder.module.css` pada elemen `.info`:
   - `background-color: var(--color-surface)` — tidak menggunakan Hardcoded Value
   - `border-radius: var(--radius-lg)` — nilai computed minimum `16px`, tidak menggunakan Hardcoded Value
   - `padding: var(--spacing-md)` — nilai computed minimum `16px`, tidak menggunakan Hardcoded Value

2. THE DetailOrder_Page SHALL menampilkan setiap item pesanan dalam kartu yang memuat tiga elemen berikut, semuanya terlihat tanpa terpotong dalam satu kartu:
   - Gambar thumbnail dengan ukuran tepat `60px × 60px` dan `object-fit: cover`
   - Nama item pesanan
   - Harga item pesanan

3. WHEN data detail pesanan berhasil dimuat dan nilai field Status tersedia, THE DetailOrder_Page SHALL menampilkan Status menggunakan elemen Status_Badge dengan:
   - Kelas CSS yang sama persis (nama kelas identik) dengan yang digunakan di `ListOrder.module.css`
   - Warna latar yang identik: kuning/amber untuk `PROCESSING`, hijau untuk `COMPLETED` — mengacu pada AC 7.3

4. THE DetailOrder_Page SHALL menampilkan grid item pesanan dengan tiga breakpoint responsif berikut, ketiganya WAJIB dideklarasikan sebagai media query di dalam file `DetailOrder.module.css`:
   - Viewport ≤ `768px`: `grid-template-columns: 1fr`
   - Viewport `769px` – `1024px`: `grid-template-columns: repeat(2, 1fr)`
   - Viewport ≥ `1025px`: `grid-template-columns: repeat(3, 1fr)`

5. IF pengambilan data detail pesanan dari API mengembalikan error (non-2xx response atau network failure), THEN THE DetailOrder_Page SHALL:
   - Menampilkan pesan teks yang menginformasikan bahwa data tidak dapat dimuat (pesan dapat berupa teks bebas, contoh: "Gagal memuat data pesanan")
   - Tidak merender elemen `.info` (panel informasi) maupun daftar item pesanan
   - Pesan error WAJIB ada di dalam DOM dan memiliki computed height > 0

---

### Requirement 10: Konsistensi dan Responsivitas Global

**User Story:** Sebagai staf kafe, saya ingin semua halaman memiliki tampilan yang konsisten dan dapat digunakan dengan nyaman di berbagai perangkat, sehingga pengalaman penggunaan terasa terpadu.

#### Acceptance Criteria

1. THE UI_System SHALL memastikan tidak ada file `*.module.css` di dalam direktori `src/` yang mendeklarasikan Hardcoded Value untuk properti `color`, `background-color`, `border-color`, `border-radius`, `padding`, `gap`, `margin` (kecuali nilai `0`), atau `box-shadow` — setiap properti tersebut WAJIB menggunakan `var(--token-name)` yang merujuk ke CSS_Variable yang dideklarasikan di `:root` pada `src/styles/globals.css`.

   Cara verifikasi: lakukan pencarian teks pada seluruh file `*.module.css` untuk pola nilai hex (`#`), nilai rgba/hsl literal, dan nilai px untuk spasi/radius — tidak boleh ada hasil yang ditemukan di luar blok `:root`.

2. THE UI_System SHALL memastikan halaman ListOrder, CreateOrder, dan DetailOrder menggunakan nilai `padding` halaman yang identik dengan mereferensikan satu CSS_Variable yang sama:
   - Ketiga file (`ListOrder.module.css`, `CreateOrder.module.css`, `DetailOrder.module.css`) WAJIB mendeklarasikan `padding: var(--spacing-md)` (atau token spasi yang sama) pada kelas pembungkus halaman masing-masing
   - Nilai computed `padding` pada ketiga halaman WAJIB identik saat diverifikasi di DevTools

3. WHEN lebar viewport diubah ke ≤ `768px` di browser DevTools (atau perangkat fisik selebar itu), THE UI_System SHALL memastikan kelima halaman (Home, Login, ListOrder, CreateOrder, DetailOrder) tidak menampilkan scrollbar horizontal — dapat diverifikasi dengan mengecek `document.documentElement.scrollWidth <= window.innerWidth` di browser console.

4. THE UI_System SHALL memastikan semua elemen interaktif berikut memiliki Interactive_State yang didefinisikan secara eksplisit di file CSS masing-masing:
   - **Button**: `:hover` mengubah `opacity` atau `background-color`; `:focus-visible` menampilkan `outline` minimum `2px`
   - **Input**: `:focus` mengubah `border-color` ke `var(--color-primary)` dan menampilkan `box-shadow`
   - **Select**: `:focus` mengubah `border-color` dan `box-shadow` identik dengan Input
   - **Baris `<tbody>` tabel (ListOrder)**: `:hover` mengubah `background-color` ke `var(--color-surface)`
   - **Kartu menu (CreateOrder)**: `:hover` meningkatkan `box-shadow` atau menerapkan `transform: translateY`

   Setiap Interactive_State WAJIB dapat diverifikasi dengan menginspeksi computed styles di DevTools saat elemen berada pada state tersebut.

5. WHEN elemen interaktif menerima fokus via keyboard (Tab atau Shift+Tab), THE UI_System SHALL memastikan indikator fokus memiliki kontras yang cukup terhadap latar belakang elemen — dapat diverifikasi secara visual tanpa alat bantu dengan mengidentifikasi posisi fokus aktif hanya dengan melihat layar, tanpa menggunakan mouse.
