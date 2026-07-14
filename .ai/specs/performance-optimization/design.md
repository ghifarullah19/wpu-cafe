# Design Document

## 1. Current Architecture Impact
The current architecture eagerly loads all page components in the main router, leading to a monolithic JavaScript bundle. We will introduce `React.lazy` and `Suspense` for code splitting at the route level. This aligns perfectly with React Router v7 and Vite's built-in chunking capabilities without adding external libraries.

## 2. Component Changes
- **New Component**: `src/components/ui/Skeleton/Skeleton.tsx` and its CSS module for placeholder animations.
- **Modified Components**:
  - `src/routes/Route.tsx`: Replace static imports with `React.lazy` imports. Wrap route elements in a `<Suspense>` boundary with a fallback.
  - `src/components/pages/CreateOrder/CreateOrder.tsx`: Add `loading="lazy"` to `<img>` tags. Replace `useEffect` fetching with `useSWR`.
  - `src/components/pages/DetailOrder/DetailOrder.tsx`: Add `loading="lazy"` to `<img>` tags. Replace `useEffect` fetching with `useSWR`.
  - `src/components/pages/ListOrder/ListOrder.tsx`: Replace `useEffect` fetching with `useSWR`.

## 3. File Structure Changes
```
src/
└── components/
    └── ui/
        └── Skeleton/
            ├── index.tsx
            ├── Skeleton.tsx
            └── Skeleton.module.css
```

## 4. Data Flow
1. User navigates to a new route. `<Suspense>` handles chunk loading.
2. Component mounts and calls `useSWR(url)`.
3. If data is in cache, SWR returns it instantly (UI renders data immediately).
4. SWR revalidates in the background. If new data arrives, UI is updated seamlessly.
5. If no data is in cache (`isLoading = true`), a `Skeleton` UI is rendered instead of a blocking spinner.

## 5. UI Layout Specification
- **Suspense Fallback**: A full-page centered `LoadingSpinner` will be displayed during JS chunk downloading.
- **Data Loading Fallback**: A `Skeleton` card layout mirroring the expected content structure will be displayed during API fetching.

## 6. Styling Decisions
No new styling required. The existing `LoadingSpinner` with the `centered` prop will be reused.

## 7. Responsive Behavior
Inherits current responsiveness.

## 8. Technical Constraints
- Vite handles the chunking automatically when it encounters dynamic `import()` via `React.lazy`.
- Care must be taken to wrap the lazy-loaded components cleanly inside `Route.tsx`.
