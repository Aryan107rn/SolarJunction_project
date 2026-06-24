import { Router } from 'express'
import jwt from 'jsonwebtoken'

const router = Router()

// POST /api/auth/login
router.post('/login', (req, res) => {
  const { username, password } = req.body ?? {}

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password required' })
  }

  const adminUsername = process.env.ADMIN_USERNAME || 'admin'
  const adminPassword = process.env.ADMIN_PASSWORD

  if (!adminPassword) {
    console.error('ADMIN_PASSWORD is not set in environment')
    return res.status(500).json({ error: 'Server configuration error' })
  }

  if (username !== adminUsername || password !== adminPassword) {
    return res.status(401).json({ error: 'Invalid credentials' })
  }

  const token = jwt.sign(
    { role: 'admin', username },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  )

  res.json({ token, expiresIn: '24h' })
})

export default router
