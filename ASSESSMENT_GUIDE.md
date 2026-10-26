# 🎓 FitZone Full-Stack Assessment Guide
*A plain-language guide to help you confidently explain your architecture, code, and decisions during your Week 3 assessment.*

---

## 1. How the Frontend Communicates with the Backend
- **Architecture**: The application uses a decoupled Client-Server model.
- **Mechanism**: The React client uses the native JavaScript `fetch()` API wrapped in [`client/src/services/api.js`](file:///Users/mac/Developer/Assignment-Esther/client/src/services/api.js).
- **Base URL**: It reads `import.meta.env.VITE_API_URL` (locally `http://localhost:5000`).
- **Credentials & Cookies**: Every request includes `credentials: 'include'`. This tells the browser to automatically attach the session cookie (`connect.sid`) to every request sent to the Express backend.

---

## 2. How Express Works
- Express is a lightweight web framework for Node.js.
- **Request Pipeline (Middleware)**: Every incoming HTTP request flows sequentially through middlewares:
  1. **CORS (`cors`)**: Verifies that the request originates from our allowed frontend (`CLIENT_URL`).
  2. **Body Parser (`express.json()`)**: Converts incoming JSON payload strings into usable JavaScript objects accessible at `req.body`.
  3. **Session Middleware (`express-session`)**: Reads the session cookie, queries PostgreSQL to find the session data, and attaches it to `req.session`.
  4. **Routers (`/api/products`, `/api/auth`)**: Direct the request to specific controller functions based on the HTTP method and path.
  5. **Centralized Error Handler**: Catches any errors passed with `next(error)` and returns a clean, safe JSON error response with an appropriate HTTP status code.

---

## 3. How the PostgreSQL Database is Connected
- **Connection Tool**: We use the official `pg` (node-postgres) library in [`server/src/config/db.js`](file:///Users/mac/Developer/Assignment-Esther/server/src/config/db.js).
- **Connection Pooling**: Instead of opening and closing an expensive connection for every query, we use a `Pool`. The pool manages a reusable set of connections.
- **Neon Cloud & SSL**: Neon requires secure encrypted connections. Our pool configuration checks if the database is on Neon or in production and enables `ssl: { rejectUnauthorized: false }`.
- **Parameterized Queries**: All SQL statements use parameters (`$1, $2, ...`) instead of string concatenation. This completely eliminates SQL Injection vulnerabilities.

---

## 4. What Each Database Table Stores
- **`users` Table**:
  - `id`: Auto-incrementing primary key.
  - `name`: User's display name.
  - `email`: User's email, marked `UNIQUE` to prevent duplicate accounts.
  - `password_hash`: The secure 60-character bcrypt hash (never plain-text passwords!).
  - `created_at`: Registration timestamp.
- **`products` Table**:
  - Stores the FitZone trainers and programs displayed on the main grid (`id`, `name`, `role`, `category`, `bio`, `email`, `image`, `price`, `created_at`).
- **`session` Table**:
  - Managed by `connect-pg-simple`. Stores the session ID (`sid`), session expiration date (`expire`), and serialized session data (`sess` JSON containing `userId`, `userName`).

---

## 5. How the Seed Script Works
- Located at [`server/database/seed.js`](file:///Users/mac/Developer/Assignment-Esther/server/database/seed.js), executed via `npm run seed`.
- **Two-Step Operation**:
  1. It reads [`schema.sql`](file:///Users/mac/Developer/Assignment-Esther/server/database/schema.sql) and executes it, ensuring all tables exist.
  2. It iterates through the initial trainer items and inserts them using parameterized queries with `ON CONFLICT (id) DO UPDATE`.
- **Idempotency**: "Idempotent" means running the script once or ten times produces the exact same result without duplicate rows or errors.

---

## 6. How Signup and Login Work

### Signup Flow
1. User enters their Name, Email, and Password in `AuthModal`.
2. Frontend calls `POST /api/auth/signup`.
3. Backend validates inputs (e.g., password length >= 6, valid email format).
4. Backend checks if the email already exists in PostgreSQL (`SELECT id FROM users WHERE email = $1`). If found, returns `409 Conflict`.
5. Backend hashes the password using `bcrypt.hash(password, 10)`.
6. User record is inserted into `users`. Returns `201 Created`.

### Login Flow
1. User enters registered Email and Password.
2. Frontend calls `POST /api/auth/login`.
3. Backend searches for the user by email.
4. If not found or if `bcrypt.compare(password, user.password_hash)` returns false, it returns `401 Unauthorized` with a generic message: `"Invalid email or password"` (prevents account enumeration attacks).
5. On success:
   - Backend calls `req.session.regenerate()` to assign a fresh session ID (protects against session fixation).
   - Stores `userId` and `userName` inside `req.session`.
   - Sends back an HTTP-only session cookie.
   - Returns `{ user: { id, name, email } }`.

---

## 7. How Passwords Are Protected
- **Rule #1**: Plain-text passwords are **never** logged, saved to disk, or stored in the database.
- **Bcrypt Hashing**: We use `bcrypt` with 10 salt rounds. A "salt" is a random string added before hashing to defeat precomputed "rainbow table" dictionaries.
- **One-Way Function**: Hashing is irreversible. When verifying a password, bcrypt hashes the incoming password with the same salt and compares the two hashes.

---

## 8. How Sessions Survive Page Refreshes
- **The Problem with `localStorage`**: Storing tokens or user data in `localStorage` makes them vulnerable to Cross-Site Scripting (XSS) attacks.
- **Our Solution (`httpOnly` Session Cookies)**:
  - When the user logs in, the server issues a cookie with the `httpOnly` flag. JavaScript running in the browser cannot read this cookie.
  - When the page refreshes, the browser automatically sends the cookie in the HTTP request headers.
  - In `AuthContext.jsx`, a `useEffect` runs once on startup and calls `GET /api/auth/me`.
  - Express checks the session store in PostgreSQL. If the session is active and valid, it returns the user's details, restoring the authenticated state instantly.

---

## 9. Why Environment Variables Are Used
- **Security & Portability**: Credentials such as database connection strings, passwords, and session secrets must **never** be committed to GitHub.
- **Implementation**:
  - Sensitive values are stored in `.env` files which are excluded from Git via `.gitignore`.
  - We provide `.env.example` files containing only placeholder templates so team members and evaluators know what keys are needed.
  - In production (Render/Vercel), environment variables are entered directly into the hosting provider's secure dashboard.

---

## 10. How Deployment Is Configured
- **Frontend (Vercel)**:
  - Root directory: `client`
  - Framework: Vite (`npm run build`, output `dist`).
  - Configured with `vercel.json` to route all page requests to `index.html` (SPA fallback).
  - Environment variable: `VITE_API_URL` pointing to the live Render backend.
- **Backend (Render)**:
  - Root directory: `server`
  - Start command: `npm start` (runs `node src/server.js`).
  - Render dynamically assigns a `PORT` environment variable.
  - Proxy settings (`app.set('trust proxy', 1)`) and SSL cookie options (`secure: true`, `sameSite: 'none'`) ensure session cookies work seamlessly across domains in production.

---

## 11. Role of Each Important Folder and File

| Folder / File | Role |
|---|---|
| `client/src/context/AuthContext.jsx` | React Context managing user authentication state across the entire frontend. |
| `client/src/services/api.js` | Central API service that makes credentialed requests to the Express server. |
| `client/src/components/TrainerBio.jsx` | The main product grid, fetching items from `/api/products` and providing category filtering, rating, and session booking. |
| `client/src/components/AuthModal.jsx` | Accessible modal dialog for user registration and login. |
| `server/src/app.js` | Configures Express, CORS, session storage, routes, and error handling. |
| `server/src/config/db.js` | Reusable PostgreSQL connection pool configured for Neon SSL. |
| `server/src/controllers/authController.js` | Handles signup, login, session check, and logout logic. |
| `server/src/controllers/productController.js` | Queries PostgreSQL to return trainers/products. |
| `server/database/schema.sql` | SQL definitions for `users`, `products`, and `session` tables. |
| `server/database/seed.js` | Seeds initial trainer data into PostgreSQL without duplicates. |
| `server/test/api.test.js` | Automated test suite verifying health check, input validation, and auth endpoints. |
