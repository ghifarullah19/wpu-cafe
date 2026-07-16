# Requirements Document: Reviews Management

## Introduction

WPU Cafe is a React point-of-sale application for authenticated cafe staff. This feature introduces protected review management so staff can view customer feedback and submit a review for a menu item.

The backend endpoint is `${VITE_API_URL}/reviews`. The feature uses `GET` to retrieve paginated reviews and `POST` to create one review. It includes server-side sorting, server-side menu/rating filters, local text search within the loaded page, and pagination.

Scope excludes editing, deleting, or moderating reviews. The API contract is limited to the request, query parameters, and response shape supplied for this feature.

## Glossary

- **Review_Page**: Protected page at `/reviews` that displays and creates reviews.
- **Review**: An API object containing `id`, `menu_item_id`, `reviewer_name`, `rating`, `comment`, and `created_at`.
- **Menu_Item**: Existing cafe menu object used to select the review target.
- **Loaded_Reviews**: The current API page returned by `GET /reviews`.
- **Search_Query**: Client-side text entered to narrow Loaded_Reviews by reviewer name or comment.
- **API_Metadata**: Pagination object with `total`, `page`, `pageSize`, and `totalPages`.

## Requirements

### Requirement 1: Protected route and navigation

**User Story:** As authenticated cafe staff, I want to access the review-management page from the order dashboard so that feedback management is part of my daily workflow.

#### Acceptance Criteria

1. THE App SHALL register `/reviews` as a ProtectedRoute and lazy-load the Review_Page with the existing Suspense loading fallback.
2. IF Auth_Token is absent, THEN navigating to `/reviews` SHALL redirect to `/login` using the existing ProtectedRoute behavior.
3. THE ListOrder_Page SHALL render a `Reviews` navigation action that routes to `/reviews`.
4. THE Review_Page SHALL render a `Back to Orders` action that routes to `/orders`.

### Requirement 2: List reviews

**User Story:** As cafe staff, I want to see submitted reviews so that I can understand customer feedback.

#### Acceptance Criteria

1. WHEN Review_Page first renders, THE App SHALL request `GET ${VITE_API_URL}/reviews?page=1&pageSize=10&sortBy=created_at&sortOrder=desc` with the Auth_Token as a Bearer token.
2. THE Review_Page SHALL render each returned Review with reviewer_name, rating, comment, created_at, and menu_item_id.
3. THE rating display SHALL communicate its numeric value, including an accessible text equivalent such as `5 out of 5 stars`.
4. WHILE the GET request is pending, THE Review_Page SHALL render the existing Skeleton or LoadingSpinner component rather than an empty-state message.
5. WHEN the request succeeds with an empty `data` array, THE Review_Page SHALL display `No reviews found.`.
6. IF the GET request fails, THEN THE Review_Page SHALL display `Reviews could not be loaded. Please try again.` and SHALL remain usable for a subsequent state change or page refresh.

### Requirement 3: Create a review

**User Story:** As cafe staff, I want to submit a customer review for a menu item so that feedback is recorded.

#### Acceptance Criteria

1. THE Review_Page SHALL render a form containing a menu-item selector, reviewer-name input, rating selector with integer values 1 through 5, comment input, and `Submit Review` button.
2. THE menu-item selector SHALL source its options from the existing menu API; each option value SHALL be the Menu_Item id and its label SHALL identify the menu item by name.
3. WHEN menuItemId, reviewerName, rating, and comment are present and valid, THE App SHALL POST this exact JSON body to `${VITE_API_URL}/reviews`:
   ```json
   {
     "menuItemId": "item-uuid",
     "reviewerName": "John Smith",
     "rating": 5,
     "comment": "Excellent coffee, would order again!"
   }
   ```
4. IF menuItemId, reviewerName, rating, or comment is empty, OR rating is not an integer from 1 to 5, THEN THE App SHALL prevent the POST request and show field-level or form-level validation feedback.
5. WHILE the POST request is pending, THE Submit Review button SHALL be disabled and show the existing Button loading state.
6. WHEN POST succeeds, THE App SHALL clear the form, show `Review submitted successfully.`, and revalidate the current reviews SWR key.
7. IF POST fails, THEN THE App SHALL retain submitted form values and display `Review could not be submitted. Please try again.`.

### Requirement 4: Search and filters

**User Story:** As cafe staff, I want to narrow displayed reviews so that I can find relevant feedback quickly.

#### Acceptance Criteria

1. THE Review_Page SHALL render a `Search reviews` input that filters only Loaded_Reviews by reviewer_name and comment using case-insensitive, trimmed substring matching.
2. WHEN Search_Query is empty or whitespace-only, THE Review_Page SHALL display all Loaded_Reviews.
3. WHEN Loaded_Reviews is non-empty and the Search_Query matches none, THE Review_Page SHALL display `No matching reviews found.` without issuing an additional request.
4. THE Review_Page SHALL render an optional menu-item filter and a minimum-rating filter with values `All ratings`, `1`, `2`, `3`, `4`, and `5`.
5. WHEN either API filter changes, THE App SHALL reset the page to 1 and request reviews with its corresponding `menuItemId` and/or `minRating` query parameter; unset filters SHALL be omitted from the URL.

### Requirement 5: Sorting and pagination

**User Story:** As cafe staff, I want to sort and page through reviews so that I can inspect the feedback most relevant to me.

#### Acceptance Criteria

1. THE Review_Page SHALL provide sort options `Newest` (default), `Oldest`, `Rating: High to Low`, and `Rating: Low to High`.
2. WHEN a sort option changes, THE App SHALL reset the page to 1 and request `GET /reviews` with the corresponding `sortBy` (`created_at` or `rating`) and `sortOrder` (`asc` or `desc`) parameters.
3. THE Review_Page SHALL display `Previous`, `Next`, and `Page {page} of {totalPages}` using API_Metadata.
4. THE Previous button SHALL be disabled at page 1; the Next button SHALL be disabled at the final page or when totalPages is 0 or absent.
5. WHEN a pagination button is activated, THE App SHALL request the selected page while preserving active sorting and API filters.
6. WHEN page, sort, or API filters change, THE local Search_Query SHALL remain unchanged and re-filter the newly returned Loaded_Reviews.

### Requirement 6: Styling and responsiveness

**User Story:** As cafe staff using desktop or mobile, I want review tools to be readable and usable at my available screen width.

#### Acceptance Criteria

1. THE Review_Page SHALL use CSS Modules and existing design tokens for colors, spacing, border radii, and typography.
2. AT viewport widths of 768px or below, the form, controls, review list, and pagination SHALL fit the viewport without horizontal scrolling.
3. THE search, filter, and sort controls SHALL stack or wrap at narrow widths while retaining their labels and keyboard accessibility.
4. THE feature SHALL not introduce a new runtime dependency, global state store, or unprotected API request.
