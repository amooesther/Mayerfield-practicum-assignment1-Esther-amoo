// Authentication check middleware for protected endpoints

export function requireAuth(req, res, next) {
  if (req.session && req.session.userId) {
    return next();
  }

  return res.status(401).json({
    status: 'error',
    message: 'Authentication required. Please log in.',
  });
}

