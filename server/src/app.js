import express from 'express';
import cors from 'cors';
import session from 'express-session';
import connectPgSimple from 'connect-pg-simple';
import dotenv from 'dotenv';
import pool from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import authRoutes from './routes/authRoutes.js';
import { notFoundHandler, errorHandler } from './middleware/errorMiddleware.js';

dotenv.config();

const app = express();
const isProduction = process.env.NODE_ENV === 'production';

// In production behind proxies (Render, Heroku, etc.), trust the first proxy
if (isProduction) {
  app.set('trust proxy', 1);
}

// 1. CORS Configuration
const allowedOrigin = process.env.CLIENT_URL || 'http://localhost:5173';
app.use(
  cors({
    origin: allowedOrigin,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// 2. Body Parser
app.use(express.json());

// 3. PostgreSQL-backed Session Store
const PgSession = connectPgSimple(session);

app.use(
  session({
    store: new PgSession({
      pool,
      tableName: 'session',
      createTableIfMissing: true,
    }),
    secret: process.env.SESSION_SECRET || 'dev_session_secret_fitzone_2026',
    resave: false,
    saveUninitialized: false,
    proxy: isProduction,
    cookie: {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      secure: isProduction,
      sameSite: isProduction ? 'none' : 'lax',
    },
  })
);

// 4. Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'API is running',
  });
});

// 5. REST API Routes
app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);

// 6. Centralized Error Handlers
app.use(notFoundHandler);
app.use(errorHandler);

export default app;

