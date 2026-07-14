# Implementation Tasks

- [x] 1. Implement Route-level Code Splitting
  - Modify `src/routes/Route.tsx` to use `React.lazy` for importing `Home`, `Login`, `ListOrder`, `CreateOrder`, and `DetailOrder`.
  - Import `Suspense` from React and `LoadingSpinner` from `src/components/ui/LoadingSpinner`.
  - Wrap the `element` values in `Route.tsx` with `<Suspense fallback={<LoadingSpinner centered />}>`.
  - Requirements: 1

- [x] 2. Implement Image Lazy Loading
  - Modify `src/components/pages/CreateOrder/CreateOrder.tsx` to add `loading="lazy"` to the `<img>` tag in the menu list.
  - Modify `src/components/pages/DetailOrder/DetailOrder.tsx` to add `loading="lazy"` to the `<img>` tag in the cart list.
  - Requirements: 2

- [x] 3. Install SWR and Setup Fetcher
  - Run `npm install swr`
  - Update `src/utils/fetch.ts` or create `fetcher.ts` to expose a generic fetcher function suitable for SWR.
  - Requirements: 3

- [x] 4. Create Skeleton UI Component
  - Create `src/components/ui/Skeleton/Skeleton.tsx` and its CSS module.
  - Add basic pulsing animation and layout options (e.g. card layout, list layout).
  - Requirements: 4

- [x] 5. Integrate SWR and Skeleton in `CreateOrder`
  - Refactor `CreateOrder.tsx` to replace `useEffect` menu fetching with `useSWR`.
  - Show `<Skeleton />` cards when `isLoading` is true instead of `<LoadingSpinner />`.
  - Requirements: 3, 4

- [x] 6. Integrate SWR and Skeleton in `ListOrder` and `DetailOrder`
  - Refactor `ListOrder.tsx` to use `useSWR` for fetching the orders list and display skeleton cards when loading.
  - Refactor `DetailOrder.tsx` to use `useSWR` for fetching single order details and display skeleton layout.
  - Requirements: 3, 4
