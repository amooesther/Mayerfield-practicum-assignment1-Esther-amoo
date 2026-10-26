import bcrypt from 'bcrypt';
import { query } from '../config/db.js';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// POST /api/auth/signup
export async function signup(req, res, next) {
  try {
    const { name, email, password } = req.body;

    // 1. Validate inputs
    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      return res.status(400).json({ status: 'error', message: 'Name is required' });
    }

    if (!email || !EMAIL_REGEX.test(email.trim())) {
      return res.status(400).json({ status: 'error', message: 'A valid email address is required' });
    }

    if (!password || typeof password !== 'string' || password.length < 6) {
      return res.status(400).json({
        status: 'error',
        message: 'Password must be at least 6 characters long',
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    // 2. Check if email already registered
    const existing = await query('SELECT id FROM users WHERE email = $1', [normalizedEmail]);
    if (existing.rows.length > 0) {
      return res.status(409).json({
        status: 'error',
        message: 'An account with this email already exists',
      });
    }

    // 3. Hash password
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // 4. Insert new user
    const insertResult = await query(
      'INSERT INTO users (name, email, password_hash) VALUES ($1, $2, $3) RETURNING id, name, email, created_at',
      [name.trim(), normalizedEmail, passwordHash]
    );

    const newUser = insertResult.rows[0];

    // Return successful creation (user can proceed to log in)
    return res.status(201).json({
      status: 'success',
      message: 'Account created successfully. You can now log in.',
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        createdAt: newUser.created_at,
      },
    });
  } catch (error) {
    next(error);
  }
}

// POST /api/auth/login
export async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        status: 'error',
        message: 'Please provide both email and password',
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Find user by email
    const userResult = await query(
      'SELECT id, name, email, password_hash FROM users WHERE email = $1',
      [normalizedEmail]
    );

    if (userResult.rows.length === 0) {
      // Use generic error message to avoid enumeration
      return res.status(401).json({
        status: 'error',
        message: 'Invalid email or password',
      });
    }

    const user = userResult.rows[0];

    // Compare password hash
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({
        status: 'error',
        message: 'Invalid email or password',
      });
    }

    // Regenerate session to eliminate session fixation
    req.session.regenerate((err) => {
      if (err) {
        return next(err);
      }

      req.session.userId = user.id;
      req.session.userName = user.name;
      req.session.userEmail = user.email;

      return res.json({
        status: 'success',
        message: 'Logged in successfully',
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      });
    });
  } catch (error) {
    next(error);
  }
}

// GET /api/auth/me
export async function getMe(req, res, next) {
  try {
    if (!req.session || !req.session.userId) {
      return res.json({ user: null });
    }

    // Verify user still exists in database
    const userResult = await query(
      'SELECT id, name, email FROM users WHERE id = $1',
      [req.session.userId]
    );

    if (userResult.rows.length === 0) {
      req.session.destroy(() => {});
      return res.json({ user: null });
    }

    const user = userResult.rows[0];
    return res.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    next(error);
  }
}

// POST /api/auth/logout
export async function logout(req, res, next) {
  try {
    if (!req.session) {
      return res.json({ status: 'success', message: 'Logged out successfully' });
    }

    req.session.destroy((err) => {
      if (err) {
        return next(err);
      }

      res.clearCookie('connect.sid', { path: '/' });
      return res.json({
        status: 'success',
        message: 'Logged out successfully',
      });
    });
  } catch (error) {
    next(error);
  }
}

