# Implementation Tasks: Auth Session Cleanup

- [x] 1. Update HTTP Wrapper to Intercept 401 Responses
  - Modify `src/utils/fetch.ts`.
  - Inspect response status in `fetchAPI` and `fetcher`.
  - If status is `401` and URL does not include `/auth/login`, remove `"auth"` from local storage and set `window.location.href = "/login"`.
  - Requirements: 1.1, 1.2, 1.3, 1.4, 1.5

- [x] 2. Update Login Page handling of failed attempts
  - Modify `src/components/pages/Login/Login.tsx`.
  - Add an `error` state using `useState`.
  - Verify that `result.token` is present and valid before saving it and navigating to `/orders`.
  - If `result.token` is missing or the response has an error, set the error state and prevent navigation.
  - Requirements: 2.1, 2.2, 2.3

- [x] 3. Style the Error Message on Login Page
  - Modify `src/components/pages/Login/Login.module.css` to add a scoped error message style.
  - Render the error message above the email field in `Login.tsx` when the `error` state is not null.
  - Requirements: 2.3

- [x] 4. Run verification checkpoint
  - Test using the browser/preview server.
  - Tamper with the token to make it invalid, verify redirect to `/login`.
  - Test logging in with invalid credentials to verify error feedback.
  - Run `npm run lint` and `npm run build` to verify correctness.
  - Requirements: 1-2
