# Requirements Document

## Introduction
The goal of this feature is to optimize the performance of the WPU Cafe POS application, focusing on reducing the initial load time and improving rendering efficiency. This involves implementing route-level code splitting and lazy loading for heavy assets like images.

## Glossary
- **Code Splitting**: Splitting the JavaScript bundle into smaller chunks that are loaded only when needed.
- **Lazy Loading (React)**: Loading React components asynchronously when they are rendered for the first time.
- **Image Lazy Loading**: Delaying the download of images until they are about to enter the viewport.

## Requirements

### Requirement 1: Route-level Code Splitting
User Story:
"As a user, I want the initial page load to be fast so that I can start using the application without waiting for unnecessary code to download."

Acceptance Criteria:
1. THE routing configuration in `src/routes/Route.tsx` SHALL load all page components (`Home`, `Login`, `ListOrder`, `CreateOrder`, `DetailOrder`) using `React.lazy`.
2. WHEN navigating to a new page, THE application SHALL display a `<Suspense>` fallback (using the `LoadingSpinner` component) while the chunk is downloading.
3. THE production build SHALL output separate JavaScript chunks for each page component.

### Requirement 2: Image Lazy Loading
User Story:
"As a staff member browsing the menu, I want images to load only when visible so that the page doesn't freeze downloading all menu images at once."

Acceptance Criteria:
1. THE menu item images in `CreateOrder` page SHALL use the `loading="lazy"` native HTML attribute.
2. THE cart item images in `DetailOrder` page SHALL use the `loading="lazy"` native HTML attribute.

### Requirement 3: Data Fetching and Caching (SWR)
User Story:
"As a staff member filtering menus, I want the data to load instantly from cache instead of waiting for the API every time I switch categories."

Acceptance Criteria:
1. THE application SHALL use `swr` for data fetching instead of plain `useEffect` and `useState` for GET requests.
2. WHEN navigating back to previously fetched data (like order lists or specific menu categories), THE application SHALL render data instantly from cache.
3. THE `ListOrder`, `CreateOrder`, and `DetailOrder` pages SHALL be refactored to use `useSWR` hooks.

### Requirement 4: Skeleton UI Loaders
User Story:
"As a user waiting for new data, I want to see a placeholder structure (skeleton) instead of a blocking circular spinner, so the UI feels more responsive and less jarring."

Acceptance Criteria:
1. THE application SHALL include a `Skeleton` UI component in `src/components/ui/Skeleton`.
2. WHEN the `useSWR` hook is fetching data for the first time (`isLoading` is true), THE pages SHALL display the `Skeleton` cards instead of `<LoadingSpinner centered />`.
