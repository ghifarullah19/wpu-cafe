# Implementation Tasks: Order Sorting and Pagination

- [x] 1. Add Pagination UI and State
  - Modify `src/components/pages/ListOrder/ListOrder.tsx`.
  - Add `page` state and update the `useSWR` fetch URL to include `page=${page}`.
  - Extract `totalPages` from API response `metadata`.
  - Render pagination controls (Previous/Next buttons and page text) below the list.
  - Ensure buttons are disabled appropriately when at the boundaries.
  - Requirements: 1.1, 1.2, 1.3, 1.4, 1.5

- [x] 2. Add Sorting UI and State
  - Modify `src/components/pages/ListOrder/ListOrder.tsx`.
  - Add `sortOption` state.
  - Map sort options to API query parameters (e.g., `sortBy=total&sortOrder=desc`).
  - Update the `useSWR` fetch URL to include sorting parameters.
  - Render a `Select` primitive adjacent to the search input.
  - Requirements: 2.1, 2.2, 2.3, 2.4

- [x] 3. Update Styling and Responsive Layout
  - Modify `src/components/pages/ListOrder/ListOrder.module.css`.
  - Update the search/sort wrapper to use Flexbox (row on desktop, column on mobile `<= 600px`).
  - Add styles for the `.pagination` container (centered, spaced out).
  - Ensure existing features (like client-side search) still work seamlessly with the new layout.
  - Requirements: 2.4, 3.1, 3.2

- [x] 4. Run verification checkpoint
  - Run `npm run build` and `npm run lint`.
  - Verify visually in the dev server that sorting and pagination work.
  - Mark completed tasks only after successful verification.
