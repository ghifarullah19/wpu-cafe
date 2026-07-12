# Implementation Tasks

- [ ] 1. Create `LoadingSpinner` UI component
  - Create `src/components/ui/LoadingSpinner/LoadingSpinner.tsx`
  - Create `src/components/ui/LoadingSpinner/LoadingSpinner.module.css` with `@keyframes spin` animation
  - Create `src/components/ui/LoadingSpinner/index.tsx`
  - Requirements: 1

- [ ] 2. Update `Button` UI component for inline loading
  - Modify `src/components/ui/Button/Button.tsx` to accept an `isLoading` boolean prop
  - Update `Button.module.css` to handle disabled/loading visual state
  - Modify Button content to show "Loading..." when `isLoading` is true
  - Requirements: 2, 4

- [ ] 3. Implement Loading State in `Login` Page
  - Add `isLoading` state to `src/components/pages/Login/Login.tsx`
  - Wrap API call in `try/finally` block to toggle state
  - Pass `isLoading` prop to the submit `Button`
  - Requirements: 2

- [ ] 4. Implement Loading State in `ListOrder` Page
  - Add `isLoading` state to `src/components/pages/ListOrder/ListOrder.tsx`
  - Show `LoadingSpinner` while fetching orders list
  - Wrap `getOrders` and `updateOrder` (completed action) API calls in `try/finally` blocks
  - Disable "Completed" button while updating
  - Requirements: 3, 4

- [ ] 5. Implement Loading State in `DetailOrder` Page
  - Add `isLoading` state to `src/components/pages/DetailOrder/DetailOrder.tsx`
  - Show `LoadingSpinner` instead of content while fetching single order details
  - Requirements: 3

- [ ] 6. Implement Loading State in `CreateOrder` Page
  - Add `isSubmitting` state to `src/components/pages/CreateOrder/CreateOrder.tsx`
  - Pass `isSubmitting` as `isLoading` to the submit `Button`
  - Wrap `createOrder` API call in `try/finally` block
  - Requirements: 4
