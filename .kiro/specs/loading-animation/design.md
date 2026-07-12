# Design Document

## 1. Current Architecture Impact
The loading state will be managed locally at the component level using React's `useState`. No global state management (like Redux or Context) will be introduced for this feature, maintaining consistency with the current architectural decisions.

## 2. Component Changes
- **New Component**: `src/components/ui/LoadingSpinner` (includes `index.tsx`, `LoadingSpinner.tsx`, and `LoadingSpinner.module.css`).
- **Modified Components**:
  - `src/components/pages/Login/Login.tsx`
  - `src/components/pages/ListOrder/ListOrder.tsx`
  - `src/components/pages/DetailOrder/DetailOrder.tsx`
  - `src/components/pages/CreateOrder/CreateOrder.tsx`
  - `src/components/ui/Button/Button.tsx` (add an `isLoading` prop to disable the button and show a loading text).

## 3. File Structure Changes
```
src/
└── components/
    └── ui/
        └── LoadingSpinner/
            ├── index.tsx
            ├── LoadingSpinner.tsx
            └── LoadingSpinner.module.css
```

## 4. Data Flow
1. Component initializes with `isLoading = false` (or `true` if fetching on mount).
2. User action (e.g., button click) or `useEffect` triggers async API call.
3. Component sets `isLoading = true` before the API call.
4. UI renders the `LoadingSpinner` or disabled Button state.
5. API call completes (resolve or reject).
6. Component sets `isLoading = false`.
7. UI updates with fetched data or normal button state.

## 5. UI Layout Specification
- **Page-level loading**: The `LoadingSpinner` will be centered horizontally and vertically within the main content area (e.g., using `display: flex; justify-content: center; align-items: center; min-height: 200px;`).
- **Button-level loading**: Integrated into buttons, the button text will change to "Loading..." and become visually disabled (e.g., cursor `not-allowed`).

## 6. Styling Decisions
- The `LoadingSpinner` will use a CSS-only `@keyframes spin` animation for performance.
- Colors will match the bakery theme (using existing CSS variables if available, such as `var(--primary-color)` or a warm orange/brown tint).

## 7. Responsive Behavior
The `LoadingSpinner` will be sized using relative units (e.g., `rem` or `em`) to scale appropriately on mobile and desktop screens.

## 8. Technical Constraints
- Must handle loading states safely to prevent setting state on unmounted components (though React 18+ handles this well gracefully), the logic should be placed carefully within `try/finally` blocks.
