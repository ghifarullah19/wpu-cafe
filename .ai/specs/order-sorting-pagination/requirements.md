# Requirements Document: Order Sorting and Pagination

## Introduction

WPU Cafe is a React point-of-sale application for authenticated cafe staff. This feature adds server-side pagination and sorting controls to the List Order page (`/orders`). The goal is to allow staff to navigate through large numbers of orders and sort them by relevant criteria (such as total price).

Scope is limited to adding pagination controls (Previous/Next buttons) and a sorting dropdown to the existing List Order page. 

Limitations: Because the existing search filter is implemented purely client-side, the search input will only filter the orders present on the currently active page. Global server-side search is out of scope for this feature.

## Glossary

- **ListOrder_Page**: The protected `/orders` page that renders order cards.
- **Pagination_Controls**: UI elements (Previous/Next buttons and page indicator) allowing navigation between pages.
- **Sorting_Control**: A dropdown select element to change the sort field and order.
- **API_Metadata**: The pagination metadata returned by the SWR request (`data.metadata.totalPages`, `data.metadata.page`).

## Requirements

### Requirement 1: Pagination Controls

User Story:
"As a cafe staff member, I want to navigate through multiple pages of orders so that I can view older or additional orders."

Acceptance Criteria:

1. THE ListOrder_Page SHALL render Pagination_Controls below the order card list.
2. THE Pagination_Controls SHALL include a "Previous" button, a "Next" button, and a text indicator of the current page (e.g., "Page 1 of 5").
3. WHEN the current page is 1, THE "Previous" button SHALL be disabled.
4. WHEN the current page is equal to or greater than the total pages returned by the API, THE "Next" button SHALL be disabled.
5. WHEN a pagination button is clicked, THE ListOrder_Page SHALL update the page state and fetch the corresponding page of data from the API.

### Requirement 2: Sorting Control

User Story:
"As a cafe staff member, I want to sort the orders list by total price or date so that I can easily find the most relevant orders."

Acceptance Criteria:

1. THE ListOrder_Page SHALL render a Sorting_Control (dropdown/select) above the order card list, adjacent to the search input.
2. THE Sorting_Control SHALL contain options such as "Newest" (default), "Total: High to Low", and "Total: Low to High".
3. WHEN an option is selected, THE ListOrder_Page SHALL update the sort state (`sortBy` and `sortOrder`) and fetch the sorted data from the API.
4. THE Sorting_Control SHALL use the existing primitive components (e.g., `Select`) or scoped CSS modules for styling.

### Requirement 3: Client-Side Search Interaction

User Story:
"As a cafe staff member, I want the client-side search to continue working on the currently viewed page so that I can quickly filter visible items."

Acceptance Criteria:

1. THE existing client-side search filter SHALL continue to filter the orders currently loaded on the active page.
2. WHEN the page or sorting state changes, THE client-side search filter SHALL re-evaluate against the newly fetched data.
