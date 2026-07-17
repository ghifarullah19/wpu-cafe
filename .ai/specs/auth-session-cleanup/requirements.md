# Requirements Document: Auth Session Cleanup

## Introduction

WPU Cafe is a React point-of-sale application for authenticated cafe staff. When a staff member's session expires or is invalidated (resulting in a `401 Unauthorized` response from the backend), the current client-side state keeps them logged in because the expired JWT token remains in `localStorage`. This prevents the staff member from accessing the web app and causes a broken UI.

This feature introduces global detection of `401 Unauthorized` responses in the HTTP request layer. When an unauthorized response is received, the application automatically clears the invalid token from local storage and redirects the user to the login page. It also ensures that failed login attempts do not set invalid tokens in local storage.

## Glossary

- **Authorization_Token**: The JWT stored in `localStorage` under the key `"auth"`.
- **Unauthorized_Response**: An HTTP response from the API with status `401 Unauthorized`.
- **Session_Cleanup**: The action of deleting the Authorization_Token from `localStorage`.
- **HTTP_Wrapper**: The client-side utility functions (`fetchAPI` and `fetcher`) used to perform fetch requests to the backend API.
- **Login_Endpoint**: The REST API endpoint used for user login, specifically `https://wpu-cafe.vercel.app/api/auth/login`.

## Requirements

### Requirement 1: Global 401 Unauthorized Interception

**User Story:** As a cafe staff member, I want the web application to automatically sign me out if my session expires so that I don't get stuck on a broken page and can log back in.

#### Acceptance Criteria

1. THE HTTP_Wrapper (`fetchAPI` and `fetcher` in `src/utils/fetch.ts`) SHALL inspect the HTTP status code of every network response.
2. WHEN the response status code is `401` (Unauthorized) AND the requested URL does NOT contain `/auth/login`, THE application SHALL trigger a Session_Cleanup.
3. THE Session_Cleanup SHALL call `removeLocalStorage("auth")` to delete the stored JWT token.
4. AFTER the Session_Cleanup is performed, THE HTTP_Wrapper SHALL redirect the browser to the `/login` route using `window.location.href = "/login"`.
5. THE redirect to `/login` SHALL clear any active React states and memory by performing a clean page load.

### Requirement 2: Safe Login Response Handling

**User Story:** As a cafe staff member, I want to be notified if my credentials are wrong and not be logged in with a broken session.

#### Acceptance Criteria

1. WHEN a user submits the login form with incorrect credentials, THE login attempt SHALL fail.
2. IF the login API call fails or returns an error response, THEN the application SHALL NOT write `undefined`, `null`, or invalid values to `localStorage["auth"]`.
3. IF the login API call fails, THEN the application SHALL NOT navigate the user to `/orders` and SHALL instead remain on `/login` and display an error message.
