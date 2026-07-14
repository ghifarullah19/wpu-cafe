# Implementation Tasks

- [x] 1. Setup Global Bakery Theme and Tokens
  - Modify `src/styles/globals.css`
  - Add CSS variables for bakery colors (cream, crust brown, butter yellow).
  - Add utility variables/classes for glassmorphism.
  - Setup global background gradient on `body`.
  - Requirements: 1

- [x] 2. Refactor Primitive UI Components
  - Modify `src/components/ui/Button/Button.module.css` to use glassmorphism & bakery colors.
  - Modify `src/components/ui/Input/Input.module.css` for translucent background and borders.
  - Modify `src/components/ui/Select/Select.module.css` for translucent styling.
  - Add smooth hover/active transitions.
  - Requirements: 2

- [x] 3. Redesign Login Page
  - Modify `src/components/pages/Login/Login.tsx` and `Login.module.css`.
  - Wrap the login form in a glass panel.
  - Adjust layout to look premium.
  - Requirements: 2

- [x] 4. Redesign ListOrder (Dashboard) Page
  - Modify `src/components/pages/ListOrder/ListOrder.tsx` and `ListOrder.module.css`.
  - Implement a glass panel container for the header and order list.
  - Style individual order cards as glass elements.
  - Update status badge colors to match the bakery theme.
  - Requirements: 3

- [x] 5. Redesign CreateOrder (POS) Page
  - Modify `src/components/pages/CreateOrder/CreateOrder.tsx` and `CreateOrder.module.css`.
  - Split the layout into two main glass panels: Menu Selection and Order Form/Cart.
  - Style menu items as attractive clickable glass cards.
  - Ensure layout is responsive for tablets.
  - Requirements: 4

- [x] 6. Redesign DetailOrder Page
  - Modify `src/components/pages/DetailOrder/DetailOrder.tsx` and `DetailOrder.module.css`.
  - Display order summary in a clean glass card.
  - Update layout for the "Selesaikan Pesanan" button to be prominent.
  - Requirements: 5

- [x] 7. Redesign Home Page
  - Modify `src/components/pages/Home/Home.tsx` and `Home.module.css`.
  - Wrap the landing page content in a glass panel.
  - Enhance typography to make it look premium.
  - Requirements: 6
