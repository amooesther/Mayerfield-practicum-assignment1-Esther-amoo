import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { signup, login, getMe, logout } from '../controllers/authController.js';

const router = Router();

// Rate limiter for authentication endpoints (prevent brute-force attacks)
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 30, // Limit each IP to 30 requests per window
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    status: 'error',
    message: 'Too many authentication attempts. Please try again later.',
  },
});

router.post('/signup', authLimiter, signup);
router.post('/login', authLimiter, login);
router.get('/me', getMe);
router.post('/logout', logout);

export default router;
