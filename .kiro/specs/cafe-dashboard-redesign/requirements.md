# Requirements Document

## Introduction
Proyek ini bertujuan untuk merombak tampilan UI (User Interface) pada dashboard aplikasi WPU Cafe (POS frontend). Karena fokus bisnis condong ke arah "Bakery", desain akan mengadopsi tema *Glassmorphism* dengan palet warna hangat (krim, cokelat panggang, kuning mentega) untuk menciptakan nuansa premium, bersih, dan modern yang selaras dengan identitas toko roti.

## Glossary
- **Glassmorphism**: Gaya desain UI yang mengandalkan efek kaca buram (translucent blur) di atas latar belakang bertekstur atau memiliki gradasi warna.
- **Design Tokens**: Variabel CSS yang menyimpan nilai desain seperti warna, spasi, dan font.
- **POS**: Point of Sale, antarmuka kasir.

## Requirements

### Requirement 1: Penerapan Design Tokens Bakery-Glassmorphism
User Story:
"As a developer, I want a centralized set of design tokens so that the bakery-glassmorphism theme is consistent across the app."

Acceptance Criteria:
1. THE `src/styles/globals.css` SHALL declare CSS variables for warm bakery colors (e.g., `--color-cream`, `--color-crust-brown`).
2. THE `src/styles/globals.css` SHALL declare utility classes or variables for glassmorphism effects (e.g., `--glass-bg`, `--glass-border`, `--glass-shadow`).
3. THE typography SHALL use a modern, readable font defined in global CSS.

### Requirement 2: Perombakan Komponen Primitive UI
User Story:
"As a user, I want buttons, inputs, and selects to look premium and consistent with the glass theme."

Acceptance Criteria:
1. THE `Button` component SHALL use glassmorphism styling (translucent background, subtle blur, light border) for its variants.
2. THE `Input` and `Select` components SHALL have a soft translucent background and clear focus states.
3. THE components SHALL include smooth micro-animations on hover and active states.

### Requirement 3: Redesign Halaman ListOrder (Dashboard Utama)
User Story:
"As a staff member, I want the order list to be visually pleasing and easy to read using the new theme."

Acceptance Criteria:
1. THE `ListOrder` page SHALL display orders using glassmorphism cards.
2. WHEN an order status is "PROCESSING" or "COMPLETED", THE badge color SHALL match the warm bakery palette (e.g., warm amber for processing, soft green/matcha for completed).
3. THE page layout SHALL use a soft gradient or image background that enhances the glass effect.

### Requirement 4: Redesign Halaman CreateOrder (POS)
User Story:
"As a staff member, I want a clean, organized point-of-sale interface to create new bakery orders quickly."

Acceptance Criteria:
1. THE `CreateOrder` page SHALL organize the menu selection and cart into distinct glass panels.
2. THE menu items SHALL be displayed as attractive cards.
3. THE layout SHALL be responsive and usable on tablet-sized screens (common for POS).

### Requirement 5: Redesign Halaman DetailOrder
User Story:
"As a staff member, I want the order details to be clearly structured and aesthetically pleasing."

Acceptance Criteria:
1. THE `DetailOrder` page SHALL present order information within a centered glass card.
2. THE status update button ("Selesaikan Pesanan") SHALL have clear visual prominence.

### Requirement 6: Redesign Halaman Home (Landing Page)
User Story:
"As a visitor, I want the home page to look inviting and premium, so that I get a good first impression of the Bakery POS system."

Acceptance Criteria:
1. THE `Home` page SHALL NOT use a plain minimalist layout.
2. THE `Home` page SHALL display a welcoming message and description inside a prominent glassmorphism panel.
3. THE page SHALL utilize the global bakery typography and color tokens for its content.
