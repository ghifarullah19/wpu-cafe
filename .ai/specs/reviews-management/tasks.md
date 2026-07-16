# Implementation Tasks: Reviews Management

- [x] 1. Define review types and service contract
  - Create `src/types/review.ts` with `IReview`, `IReviewListResponse`, `ICreateReviewPayload`, and query types matching the supplied API contract.
  - Create `src/services/reviews.service.ts` with `getReviews(query)` and `createReview(payload)`.
  - Build query strings using only defined optional filters and attach the existing auth Bearer token to POST.
  - Requirements: 2.1, 3.3, 4.5, 5.2, 5.5, 6.4

- [x] 2. Create the protected Review page and route
  - Create `src/components/pages/Review/index.tsx`, `Review.tsx`, and `Review.module.css`.
  - Modify `src/routes/Route.tsx` to lazy-load Review_Page at protected route `/reviews` using the existing Suspense fallback.
  - Modify `src/components/pages/ListOrder/ListOrder.tsx` to add the `Reviews` action.
  - Add the Review_Page `Back to Orders` action.
  - Requirements: 1.1, 1.2, 1.3, 1.4

- [x] 3. Fetch and render paginated reviews
  - In `Review.tsx`, use SWR with page 1, pageSize 10, `created_at`, and descending sort as defaults.
  - Render review fields, accessible rating text, loading component, empty state, and GET error message.
  - Read `metadata` to render the current page and total pages.
  - Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6

- [x] 4. Add review creation form
  - Fetch menu options using the existing menu API and render controlled Input/Select controls for menuItemId, reviewerName, rating, and comment.
  - Validate all required values and rating range before calling `createReview`.
  - Add submit loading, success, and failure behavior; on success clear the form and revalidate reviews.
  - Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7

- [x] 5. Add search, API filters, sorting, and pagination controls
  - Add local `Search reviews` filtering by reviewer name and comment without changing the SWR key.
  - Add menu-item and minimum-rating API filters; reset page when either changes.
  - Add sort mapping for newest, oldest, rating descending, and rating ascending; reset page on sort changes.
  - Add Previous/Next buttons that preserve selected filters and sort state.
  - Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 5.1, 5.2, 5.3, 5.4, 5.5, 5.6

- [x] 6. Apply responsive scoped styling
  - Use `Review.module.css` and established design tokens for cards, form, controls, feedback, and pagination.
  - Add a breakpoint at 768px or below that stacks/wraps controls without horizontal overflow.
  - Requirements: 6.1, 6.2, 6.3

- [ ] 7. Add focused verification and run checkpoints
  - Create review page tests under `src/components/pages/Review/` using Vitest and Testing Library.
  - Cover GET rendering/states, local search, query changes for API filters/sort/pagination, validation, and POST success/failure.
  - Run the focused tests and `npm run build`; record results before marking tasks complete.
  - Requirements: 1-6
