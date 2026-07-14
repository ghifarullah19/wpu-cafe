# Requirements Document: Order Search

## Introduction

WPU Cafe is a React point-of-sale application for authenticated cafe staff. This feature adds an order-search control to the protected List Order page (`/orders`) so staff can quickly locate an order in the currently loaded list without navigating away or making another API request.

Scope is limited to client-side filtering of the orders already returned by the existing list request. It does not change the backend API, pagination, authentication, order status actions, or routing.

## Glossary

- **ListOrder_Page**: The protected `/orders` page that renders order cards.
- **Search_Query**: Text entered by the staff member in the order-search field.
- **Loaded_Orders**: Orders returned by the existing SWR request on ListOrder_Page.
- **Filtered_Orders**: Loaded_Orders that match Search_Query.
- **Normalized_Value**: A value converted to a string, trimmed, and compared without regard to letter case.

## Requirements

### Requirement 1: Search control

**User Story:** As a cafe staff member, I want to enter a search term on the order list so that I can find a relevant order quickly.

#### Acceptance Criteria

1. THE ListOrder_Page SHALL render a text input with a visible label or accessible name of `Search orders` above the order-card list.
2. THE search input SHALL be available only on the protected `/orders` route and SHALL NOT alter the public Home_Page (`/`).
3. THE search input SHALL use local component state and SHALL NOT create an additional API request while the user types.
4. THE search input SHALL include a placeholder that indicates the supported search fields: order ID, customer name, table number, or status.

### Requirement 2: Filtering behavior

**User Story:** As a cafe staff member, I want the displayed orders to update as I search so that I can identify the intended order without manually scanning every card.

#### Acceptance Criteria

1. WHEN Search_Query is empty or contains only whitespace, THE ListOrder_Page SHALL display every Loaded_Order.
2. WHEN Search_Query has a value, THE ListOrder_Page SHALL display an order when its id, customer_name, table_number, or status contains the Search_Query after both values are Normalized_Value.
3. THE matching behavior SHALL be case-insensitive for text fields.
4. THE matching behavior for table_number SHALL compare its string representation, so a query such as `2` matches table number `2`.
5. WHEN Search_Query changes, THE displayed Filtered_Orders SHALL update in the same render cycle without requiring submit, refresh, or navigation.
6. THE existing Detail and Completed actions SHALL remain available and function normally for every displayed matching order.

### Requirement 3: Empty and loading states

**User Story:** As a cafe staff member, I want clear feedback when a search has no match so that I know the list was filtered successfully.

#### Acceptance Criteria

1. WHEN Loaded_Orders is empty and Search_Query is empty, THE ListOrder_Page SHALL retain the existing `No orders found.` empty-state message.
2. WHEN Loaded_Orders contains one or more orders but Filtered_Orders is empty, THE ListOrder_Page SHALL display `No matching orders found.`.
3. WHILE the existing orders request is loading, THE ListOrder_Page SHALL continue to render its existing loading skeleton instead of either empty-state message.
4. THE no-match message SHALL be visually distinguishable and use the existing scoped CSS Module styling conventions.

### Requirement 4: Accessibility and responsive layout

**User Story:** As a staff member using a keyboard or a narrow-screen device, I want the search control to remain usable so that filtering is accessible in my working environment.

#### Acceptance Criteria

1. THE search field SHALL be associated with a visible `<label>` or an equivalent `aria-label`.
2. THE search field SHALL be focusable by keyboard and use the existing Input component styling where it supports the needed behavior.
3. AT viewport widths of 600px or below, THE search control SHALL fit within the page width without horizontal scrolling.
4. THE feature SHALL not introduce a new runtime dependency or global state store.
