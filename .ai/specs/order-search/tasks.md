# Implementation Tasks: Order Search

- [x] 1. Extend the Input primitive for controlled use
  - Modify `src/components/ui/Input/Input.tsx`.
  - Add optional `value` and `onChange` props typed for a native HTML input event.
  - Forward the props without changing behavior for existing uncontrolled Input usages.
  - Requirements: 1.1, 4.2

- [x] 2. Add client-side search state and filtering to ListOrder
  - Modify `src/components/pages/ListOrder/ListOrder.tsx`.
  - Add the `searchQuery` state and render the `Search orders` Input control.
  - Derive filtered orders from id, customer name, table number, and status using trimmed, case-insensitive substring matching.
  - Keep the existing SWR key unchanged and render matching cards with the existing Detail and Completed actions.
  - Requirements: 1.1, 1.2, 1.3, 1.4, 2.1, 2.2, 2.3, 2.4, 2.5, 2.6

- [x] 3. Add filtered empty-state and responsive styling
  - Modify `src/components/pages/ListOrder/ListOrder.tsx` and `src/components/pages/ListOrder/ListOrder.module.css`.
  - Keep `No orders found.` for an empty loaded dataset and add `No matching orders found.` only for a non-empty dataset with no filtered match.
  - Add scoped token-based styles for the search control and a mobile layout at `max-width: 600px`.
  - Requirements: 3.1, 3.2, 3.3, 3.4, 4.3

- [ ] 4. Verify filtering behavior
  - Add or update a focused ListOrder test under `src/components/pages/ListOrder/` using Vitest and Testing Library.
  - Verify empty/whitespace query displays all mocked orders; text matching is case-insensitive; table number is searchable; and a non-matching query displays `No matching orders found.`.
  - Verify the test uses mocked data and does not expect an additional request on input changes.
  - Requirements: 1.3, 2.1, 2.2, 2.3, 2.4, 2.5, 3.2

- [ ] 5. Run verification checkpoint
  - Run the relevant Vitest test(s) and `npm run build`.
  - Record the result in the implementation handoff and mark completed tasks only after successful verification.
  - Requirements: 1-4
