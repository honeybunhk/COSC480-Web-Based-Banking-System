# Global Invest Bank

A cute static banking demo website with login/signup flows, an interactive puzzle gate, and a mock savings dashboard.

## Project Overview

This project is a front-end prototype for a banking experience called **Global Invest Bank**. It includes:

- A landing page with a cute visual theme and navigation to login or sign-up.
- A login page that requires solving a drag-and-drop emoji puzzle before the login form is enabled.
- A signup page that also requires a drag-and-drop emoji puzzle to unlock the account creation form.
- A dashboard page that displays savings information and supports deposit/withdraw actions.
- MetaMask wallet connection flow to convert test Ethereum balance into account dollars.

## Files

- `index.html` - Main landing page with links to login and signup.
- `login.html` - Login page with an emoji puzzle gating the login form.
- `signup.html` - Signup page with a puzzle gating the registration form and optional profile picture preview.
- `user.html` - Dashboard page for account actions and MetaMask integration.
- `bankScript.js` - Dashboard logic for fetching session data, updating savings, and MetaMask wallet connection.
- `loginScript.js` - Login form submission logic to `/loginUser`.
- `signupScript.js` - Signup form submission logic to `/signupUser`.
- `style.css` - Shared styling for the site.
- `bowie.jpg` - Image asset used by the site.

## Features

- Cute pastel gradient UI and floating emoji animation.
- Drag-and-drop emoji puzzles that unlock login/signup input fields.
- Client-side form handling for login and signup requests.
- Account savings dashboard with deposit/withdraw controls.
- MetaMask connection support for Sepolia ETH balance conversion.

## How to Use

1. Open `index.html` in a browser.
2. Navigate to `Login` or `Create Account`.
3. Complete the emoji puzzle on the login/signup page to unlock the form.
4. Submit the login or signup form.
5. After login, access the dashboard at `user.html` and manage savings.

## Important Notes

- The frontend expects backend endpoints for authentication and session updates:
  - `POST /loginUser`
  - `POST /signupUser`
  - `GET http://localhost:3001/getSession`
  - `POST http://localhost:3001/updateSession`
- If you do not have a backend server running, login/signup and dashboard session updates will not work.
- MetaMask functionality requires an Ethereum browser wallet extension and access to a test network.

## Suggested Improvements

- Add a backend server for authentication, session storage, and account persistence.
- Secure user credentials and sessions with proper hashing and HTTPS.
- Improve form validation and error handling.
- Add mobile responsive design improvements.
