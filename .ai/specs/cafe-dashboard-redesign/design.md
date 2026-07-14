# Design Document: Bakery Glassmorphism Redesign

## 1. Current Architecture Impact
Perubahan ini murni pada lapisan presentasi (UI). Tidak ada perubahan pada arsitektur data, *routing*, atau integrasi API backend. Semua pemanggilan `fetch` dan manajemen *state* lokal akan tetap dipertahankan.

## 2. Component Changes
- `src/styles/globals.css`: Akan menjadi pusat variabel CSS untuk warna, font, dan utilitas *glassmorphism*.
- `src/components/ui/*`: `Button`, `Input`, `Select`, `Badge` akan direvisi CSS-nya.
- `src/components/pages/*`: Struktur HTML/JSX pada `Home`, `ListOrder`, `CreateOrder`, dan `DetailOrder` akan diubah untuk membungkus konten dalam kontainer kaca (*glass containers*).

## 3. Data Flow
Tidak ada perubahan. Alur data dari API ke *state* komponen tetap sama.

## 4. UI Layout Specification
- **Background**: Menggunakan gradasi linear/radial halus dengan perpaduan warna *cream*, *soft peach*, dan *warm wheat* untuk mensimulasikan kehangatan sebuah toko roti.
- **Containers**: Panel utama akan menggunakan efek *backdrop-filter: blur(16px)*, *background-color* putih transparan (rgba), dan *border* putih tipis.
- **Typography**: Penggunaan warna font *espresso brown* atau abu-abu tua agar sangat kontras dan mudah dibaca di atas *background* terang.
- **Spacing**: *Padding* dan *margin* yang lega (*breathable*) menggunakan skala yang seragam (8px, 16px, 24px, 32px).

## 5. Styling Decisions
- **Teknologi**: CSS Modules eksklusif. Tidak menggunakan Tailwind.
- **Glassmorphism CSS Pattern**:
  ```css
  .glass-panel {
    background: rgba(255, 255, 255, 0.6);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.5);
    box-shadow: 0 8px 32px 0 rgba(139, 69, 19, 0.1);
    border-radius: 16px;
  }
  ```
- **Warna Aksen**: 
  - Primary: *Crust Brown* (`#8B5A2B`)
  - Secondary/Accent: *Butter Yellow* (`#F6E0B5`)
  - Background: *Creamy White* (`#FAF6F0`)
  - Success/Done: *Matcha Green* (`#A3B18A`)

## 6. Responsive Behavior
Antarmuka didesain secara *mobile-first* dan dioptimalkan secara maksimal untuk ukuran layar *tablet* (lebar ~768px hingga 1024px) yang merupakan perangkat target utama untuk operasional POS kasir di toko roti.

## 7. Technical Constraints
- Dilarang menambahkan dependensi UI library eksternal (MUI, Chakra, Tailwind).
- Dilarang mengubah struktur `utils/fetch.ts` atau `services/*`.
