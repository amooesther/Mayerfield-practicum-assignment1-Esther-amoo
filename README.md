# FitZone Fitness Studio — Full-Stack Application

A modern, responsive, database-driven full-stack web application for **FitZone Fitness Studio**. Built with **React 19**, **Vite**, **Tailwind CSS**, **Node.js**, **Express**, **PostgreSQL (Neon)**, and persistent session-based authentication.

---

## 📑 Table of Contents
1. [Project Overview](#-project-overview)
2. [Technologies Used](#-technologies-used)
3. [Folder Structure](#-folder-structure)
4. [Environment Variables](#-environment-variables)
5. [Local Development Setup](#-local-development-setup)
6. [Database Setup & Seeding](#-database-setup--seeding)
7. [API Endpoints](#-api-endpoints)
8. [Authentication Workflow & Session Persistence](#-authentication-workflow--session-persistence)
9. [Automated Testing](#-automated-testing)
10. [Deployment Guide (Render & Vercel)](#-deployment-guide-render--vercel)
11. [Troubleshooting](#-troubleshooting)

---

## 🏋️ Project Overview

FitZone Fitness Studio allows members to discover classes, explore trainer bios, book weekly training sessions, rate instructors, and choose membership tiers.

During Week 3, the application was upgraded from a static frontend into a robust full-stack system featuring:
- **Client-Server Architecture**: Dedicated `client/` and `server/` modules.
- **PostgreSQL Database (Neon)**: Persistent storage for users, trainers/products, and user sessions.
- **Session-Based Authentication**: Secure authentication using `bcrypt`, `express-session`, and `connect-pg-simple`.
- **Dynamic Main Grid**: Trainer cards, filtering, ratings, and stepper controls populated directly via PostgreSQL REST APIs.

---

## 🛠️ Technologies Used

### Frontend (`client/`)
- **React 19**
- **Vite 8**
- **Tailwind CSS v3** (Custom theme: `#101010`, `#1c1c1c`, `#c8ff00`)
- **Native Fetch API** (with credentials)

### Backend (`server/`)
- **Node.js** (v18+)
- **Express.js** (REST API framework)
- **PostgreSQL (`pg` Pool)** with SSL support for Neon
- **express-session & connect-pg-simple** (PostgreSQL session store)
- **bcrypt** (Salted password hashing)
- **cors** (Credentialed cross-origin resource sharing)
- **express-rate-limit** (Brute-force protection on auth endpoints)

---

## 📁 Folder Structure

```text
Assignment-Esther/
├── client/                     # Frontend Vite + React application
│   ├── public/
│   │   ├── favicon.svg
│   │   └── images/             # Trainer photography
│   │       ├── daniel-brooks.png
│   │       ├── james-carter.png
│   │       └── sarah-mitchell.png
│   ├── src/
│   │   ├── assets/
│   │   ├── components/         # Reusable UI components
│   │   │   ├── About.jsx
│   │   │   ├── AuthModal.jsx   # Sign In & Sign Up dialog
│   │   │   ├── ClassSchedule.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Header.jsx      # Navigation with auth status
│   │   │   ├── Hero.jsx
│   │   │   ├── MembershipPlans.jsx
│   │   │   ├── QuantityStepper.jsx # Controlled session stepper
│   │   │   ├── StarRating.jsx      # Controlled 5-star rating
│   │   │   └── TrainerBio.jsx      # Live database-driven card grid
│   │   ├── context/
│   │   │   └── AuthContext.jsx # React Context for global auth state
│   │   ├── services/
│   │   │   └── api.js          # Centralized fetch wrapper
│   │   ├── data.js             # Fallback data
│   │   ├── index.css           # Tailwind base & utilities
│   │   ├── main.jsx            # React root
│   │   └── App.jsx             # Top-level layout
│   ├── .env.example
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.js
│   ├── vercel.json             # Vercel deployment config
│   └── vite.config.js
│
├── server/                     # Backend Node.js + Express application
│   ├── database/
│   │   ├── schema.sql          # PostgreSQL DDL tables & indexes
│   │   └── seed.js             # Idempotent database seeder
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js           # pg.Pool connection & Neon SSL setup
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   └── productController.js
│   │   ├── middleware/
│   │   │   ├── authMiddleware.js
│   │   │   └── errorMiddleware.js
│   │   ├── routes/
│   │   │   ├── authRoutes.js
│   │   │   └── productRoutes.js
│   │   ├── app.js              # Express app setup, CORS, session, routes
│   │   └── server.js           # Server listen entry point
│   ├── test/
│   │   └── api.test.js         # Automated backend test suite
│   ├── .env.example
│   ├── package.json
│   └── render.yaml             # Render deployment blueprint
│
├── .gitignore
├── ASSESSMENT_GUIDE.md         # Plain-language explanation for instructor defense
└── README.md
```

---

## 🔑 Environment Variables

### Client (`client/.env`)
Create `client/.env` based on `client/.env.example`:
```env
VITE_API_URL=http://localhost:5000
```

### Server (`server/.env`)
Create `server/.env` based on `server/.env.example`:
```env
DATABASE_URL=postgresql://neondb_owner:YOUR_PASSWORD@ep-sample-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require
SESSION_SECRET=your_super_secret_session_key_fitzone_2026
PORT=5000
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

---

## 🚀 Local Development Setup

### 1. Install Dependencies
Open two terminal windows or tabs:

**Terminal 1 (Backend):**
```bash
cd server
npm install
```

**Terminal 2 (Frontend):**
```bash
cd client
npm install
```

---

## 🗄️ Database Setup & Seeding

1. Create a free PostgreSQL database on [Neon](https://neon.tech).
2. Copy your Neon connection string (`postgresql://...`) into `server/.env` as `DATABASE_URL`.
3. Run the database seed script:
```bash
cd server
npm run seed
```
This script automatically:
- Executes `server/database/schema.sql` to verify/create `users`, `products`, and `session` tables.
- Seeds all trainer records with conflict resolution (`ON CONFLICT (id) DO UPDATE`), making it 100% safe to run repeatedly.

### Database Tables:
- **`users`**: Stores registered user accounts (`id`, `name`, `email`, `password_hash`, `created_at`).
- **`products`**: Stores the trainer profiles & fitness programs (`id`, `name`, `role`, `category`, `bio`, `email`, `image`, `price`, `created_at`).
- **`session`**: Managed automatically by `connect-pg-simple` to persist authenticated browser sessions.

---

## 🌐 API Endpoints

All responses return standard JSON format.

| Method | Endpoint | Description | Auth Required |
|---|---|---|:---:|
| `GET` | `/api/health` | Health check verification | No |
| `GET` | `/api/products` | Retrieve all trainers/products (supports `?category=...`) | No |
| `GET` | `/api/products/:id` | Retrieve single trainer/product by ID | No |
| `POST` | `/api/auth/signup` | Register a new user (`name`, `email`, `password`) | No |
| `POST` | `/api/auth/login` | Authenticate user and create session | No |
| `GET` | `/api/auth/me` | Return currently logged-in user or `null` | No |
| `POST` | `/api/auth/logout` | Destroy active session and clear cookie | Yes |

---

## 🔐 Authentication Workflow & Session Persistence

1. **Registration (`/api/auth/signup`)**:
   - Validates input format (valid email, password >= 6 characters).
   - Verifies email uniqueness in PostgreSQL.
   - Hashes password using `bcrypt` with 10 salt rounds before saving.
2. **Login (`/api/auth/login`)**:
   - Queries user by email.
   - Compares candidate password against stored hash using `bcrypt.compare()`.
   - On success, regenerates the session ID to protect against session fixation attacks.
   - Sets user ID in the session store (`connect-pg-simple` writes to the PostgreSQL `session` table).
   - Issues an `httpOnly`, `sameSite` session cookie to the browser.
3. **Session Persistence**:
   - When the user refreshes the page, `AuthContext` calls `GET /api/auth/me`.
   - The browser automatically attaches the session cookie (`credentials: 'include'`).
   - Express retrieves the session from PostgreSQL and confirms authentication without relying on insecure `localStorage`.
4. **Logout (`/api/auth/logout`)**:
   - Destroys the session record in PostgreSQL.
   - Clears the browser session cookie.

---

## 🧪 Automated Testing

The backend includes an automated test suite powered by Node.js's native test runner (`node:test`):

```bash
cd server
npm test
```

### Verified Scenarios:
- Health check returns `200` with `status: ok`.
- Non-existent routes return `404`.
- Signup validates required fields, email format, and password length.
- Login rejects missing fields with `400`.
- Unauthenticated `/api/auth/me` safely returns `{ user: null }`.

---

## 🚢 Deployment Guide (Render & Vercel)

### 1. Backend on Render
1. Push your repository to GitHub.
2. In Render, select **New Web Service** and connect your GitHub repository.
3. Configure:
   - **Root Directory**: `server`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
4. In **Environment Variables**, add:
   - `DATABASE_URL`: Your Neon PostgreSQL connection string.
   - `SESSION_SECRET`: A secure random string.
   - `NODE_ENV`: `production`
   - `CLIENT_URL`: Your live Vercel frontend URL (e.g., `https://your-app.vercel.app`).

### 2. Frontend on Vercel
1. In Vercel, select **Add New Project** and import the repository.
2. Configure:
   - **Root Directory**: Click edit and choose `client`.
   - **Framework Preset**: `Vite`.
3. In **Environment Variables**, add:
   - `VITE_API_URL`: Your live Render backend URL (e.g., `https://your-backend.onrender.com`).
4. Click **Deploy**.

---

## ❓ Troubleshooting

- **CORS Errors**: Ensure `CLIENT_URL` in `server/.env` exactly matches your frontend URL (including protocol and port, with no trailing slash).
- **Session not persisting across domains in production**: Ensure `NODE_ENV=production` on Render so that `cookie.secure = true` and `cookie.sameSite = 'none'` are active for cross-site cookies.
- **Database Connection Issues**: Ensure your Neon connection string contains `?sslmode=require`.
