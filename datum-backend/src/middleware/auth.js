import 'dotenv/config'

/**
 * Simple password-based admin auth middleware.
 * Expects: Authorization: Bearer <ADMIN_PASSWORD>
 */
export function adminAuth(req, res, next) {
  const auth = req.headers.authorization || ''
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : ''

  if (!token || token !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Unauthorized — invalid admin credentials' })
  }
  next()
}
