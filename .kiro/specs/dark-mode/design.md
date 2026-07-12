# Design Specification: Dark Mode

## 1. Current Architecture Impact
Fitur Dark Mode akan diimplementasikan menggunakan React Context (`ThemeContext`) untuk state management global. Ini tidak akan merombak struktur komponen yang ada secara besar-besaran, tetapi hanya akan membungkus aplikasi di level teratas.

## 2. Component Changes
- **New Component `ThemeProvider`**: Mengelola state tema (light/dark) dan menginjeksi attribute `data-theme` ke elemen HTML.
- **New Component `ThemeToggle`**: Tombol UI sederhana dengan icon (matahari/bulan) untuk mengubah state di context.
- **Header / Layout Component**: Perlu ditambahkan komponen `ThemeToggle` agar selalu dapat diakses.

## 3. File Structure Changes
- Menambah file `src/contexts/ThemeContext.tsx`.
- Menambah file `src/components/ui/ThemeToggle/ThemeToggle.tsx` dan `src/components/ui/ThemeToggle/ThemeToggle.module.css`.
- Update `src/main.tsx` atau `src/App.tsx` untuk membungkus aplikasi dengan `ThemeProvider`.
- Update `src/styles/globals.css`.

## 4. Data Flow
1. `ThemeProvider` membaca `localStorage` saat *mount*.
2. Jika ada nilai `'dark'`, state menjadi `'dark'`. Jika tidak, `'light'`.
3. State tersebut di-set ke tag `html` menggunakan `document.documentElement.setAttribute('data-theme', theme)`.
4. Jika tombol di `ThemeToggle` ditekan, fungsi `toggleTheme` dari Context akan memperbarui state dan `localStorage`.
5. CSS otomatis menyesuaikan karena perubahan nilai variabel dalam scope `[data-theme="dark"]`.

## 5. UI Layout Specification
- Tombol `ThemeToggle` akan menggunakan ikon (misalnya bulan sabit / matahari).
- Posisinya idealnya di pojok kanan atas aplikasi atau sejajar dengan judul halaman.

## 6. Styling Decisions
Kita akan menggunakan palet *Dark Bakery* (misalnya warna kopi pekat):
- Background: Coklat sangat gelap / hampir hitam (`#2C1E16`).
- Text Primary: Kuning krim terang / off-white (`#F5EAE0`).
- Text Secondary: Coklat susu (`#D7CCC8`).
- Glass Background: Hitam semi-transparan (`rgba(20, 15, 10, 0.65)`).
- Borders: Coklat redup (`rgba(246, 224, 181, 0.15)`).

## 7. Responsive Behavior
- Tombol `ThemeToggle` harus memiliki *touch target* yang memadai (min. 44x44px untuk aksesibilitas) di perangkat seluler.

## 8. Technical Constraints
- Semua warna dalam aplikasi *wajib* menggunakan CSS variabel dari `globals.css`. Warna *hardcoded* akan merusak dark mode.
