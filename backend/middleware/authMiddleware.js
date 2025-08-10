// middleware/authMiddleware.js 
import jwt from 'jsonwebtoken';

export function requireAuth(req, res, next) {
  // ambil token dari cookie httpOnly atau Authorization: Bearer <token>
  const bearer = req.headers.authorization?.startsWith('Bearer ')
    ? req.headers.authorization.slice(7)
    : null;
  const token = req.cookies?.token || bearer;

  if (!token) return res.status(401).json({ msg: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; 
    next();
  } catch (e) {
    return res.status(401).json({ msg: 'Invalid or expired token' });
  }
}

export function requireAnyRole(allowed = []) {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ msg: 'Unauthorized' });
    const roles = Array.isArray(req.user.roles) ? req.user.roles : [];
    const ok = roles.some((r) => allowed.includes(r));
    return ok ? next() : res.status(403).json({ msg: 'Forbidden' });
  };
}
