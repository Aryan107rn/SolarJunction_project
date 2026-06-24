import { Router } from 'express'
import jwt from 'jsonwebtoken'

const router = Router()

/**
 * Load admin accounts from environment.
 *
 * Supports two formats:
 *
 * 1) Multiple admins via ADMIN_ACCOUNTS (JSON array):
 *    ADMIN_ACCOUNTS=[{"username":"Aryan","password":"Aryan107A@"},{"username":"owner","password":"Pass2@"}]
 *
 * 2) Single admin via ADMIN_USERNAME + ADMIN_PASSWORD (legacy / simple):
 *    ADMIN_USERNAME=Aryan
 *    ADMIN_PASSWORD=Aryan107A@
 *
 * If both are set, ADMIN_ACCOUNTS takes priority.
 */
function getAdmins() {
  if (process.env.ADMIN_ACCOUNTS) {
    try {
      const accounts = JSON.parse(process.env.ADMIN_ACCOUNTS)
      if (Array.isArray(accounts) && accounts.length > 0) return accounts
    } catch {
      console.error('ADMIN_ACCOUNTS is not valid JSON — falling back to ADMIN_USERNAME/ADMIN_PASSWORD')
    }
  }
  // Fallback to single admin env vars
  return [
    {
      username: process.env.ADMIN_USERNAME || 'admin',
      password: process.env.ADMIN_PASSWORD,
    },
  ]
}

// POST /api/auth/login
router.post('/login', (req, res) => {
  const { username, password } = req.body ?? {}

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password required' })
  }

  const admins = getAdmins()

  if (admins.some(a => !a.password)) {
    console.error('One or more admin accounts have no password set in environment')
    return res.status(500).json({ error: 'Server configuration error' })
  }

  const match = admins.find(
    a => a.username === username && a.password === password
  )

  if (!match) {
    return res.status(401).json({ error: 'Invalid credentials' })
  }

  const token = jwt.sign(
    { role: 'admin', username: match.username },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  )

  res.json({ token, expiresIn: '24h' })
})

export default router
