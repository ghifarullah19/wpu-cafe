# Tasks

- [x] 1. Define Dark Mode CSS Variables
  - Modify `src/styles/globals.css`
  - Add `[data-theme='dark']` block and define dark variants for all color variables.
  - Modify background gradient for `body` in dark mode.
  - Requirements: 3

- [x] 2. Create ThemeContext
  - Create `src/contexts/ThemeContext.tsx`
  - Implement React Context with `theme` state and `toggleTheme` function.
  - Implement `useEffect` to read from/write to `localStorage` and set `data-theme` attribute on `documentElement`.
  - Requirements: 2

- [x] 3. Wrap App with ThemeProvider
  - Modify `src/main.tsx` (or `src/App.tsx` depending on current setup).
  - Import `ThemeProvider` and wrap the `<App />` component.
  - Requirements: 2

- [x] 4. Create ThemeToggle Component
  - Create `src/components/ui/ThemeToggle/ThemeToggle.tsx`
  - Create `src/components/ui/ThemeToggle/ThemeToggle.module.css`
  - Create a button that uses `ThemeContext` and displays Sun/Moon icon based on the current theme.
  - Requirements: 1

- [x] 5. Integrate ThemeToggle into Layout
  - Identify main layout or header (e.g., `src/App.tsx` or `src/components/pages/Home/Home.tsx`).
  - Add `<ThemeToggle />` to the UI so it's accessible to the user.
  - Requirements: 1
