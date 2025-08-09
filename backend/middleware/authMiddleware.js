const jwt = require('jsonwebtoken')

function requireAuth(req, res, next) {
  // ambil token dari cookie httpOnly atau Authorization
  const token = req.cookies?.token || (req.headers.authorization?.split(' ')[1])
  if (!token) return res.sendStatus(401)
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET)
    next()
  } catch {
    return res.sendStatus(401)
  }
}

function requireAnyRole(allowed = []) {
  return (req, res, next) => {
    if (!req.user) return res.sendStatus(401)
    const ok = req.user.roles?.some(r => allowed.includes(r))
    return ok ? next() : res.sendStatus(403)
  }
}

module.exports = { requireAuth, requireAnyRole }
