import { Router } from 'express'
import rateLimit from 'express-rate-limit'
import { requireAdmin } from '../middleware/auth.js'
import Review from '../models/Review.js'

const router = Router()

const reviewLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3,
  message: { error: 'Too many reviews submitted. Please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
})

// GET /api/reviews — public: only approved reviews
router.get('/', async (req, res) => {
  try {
    const reviews = await Review.find({ approved: true }).sort({ createdAt: -1 })
    res.json(reviews)
  } catch (err) {
    console.error('GET /api/reviews error:', err)
    res.status(500).json({ error: 'Failed to load reviews' })
  }
})

// GET /api/reviews/pending — admin only
router.get('/pending', requireAdmin, async (req, res) => {
  try {
    const reviews = await Review.find({ approved: false }).sort({ createdAt: -1 })
    res.json(reviews)
  } catch (err) {
    console.error('GET /api/reviews/pending error:', err)
    res.status(500).json({ error: 'Failed to load pending reviews' })
  }
})

// POST /api/reviews — public, rate limited
router.post('/', reviewLimiter, async (req, res) => {
  const { name, location, rating, review } = req.body ?? {}

  if (!name || !rating || !review) {
    return res.status(400).json({ error: 'Name, rating and review are required' })
  }

  if (typeof name !== 'string' || name.length > 100) {
    return res.status(400).json({ error: 'Invalid name' })
  }
  if (typeof review !== 'string' || review.length > 1000) {
    return res.status(400).json({ error: 'Review text too long (max 1000 characters)' })
  }
  const ratingNum = Number(rating)
  if (!Number.isInteger(ratingNum) || ratingNum < 1 || ratingNum > 5) {
    return res.status(400).json({ error: 'Rating must be between 1 and 5' })
  }

  try {
    await Review.create({
      name: name.trim().slice(0, 100),
      location: (location ?? '').trim().slice(0, 100),
      rating: ratingNum,
      review: review.trim().slice(0, 1000),
      approved: false,
    })
    res.status(201).json({ success: true, message: 'Review submitted — pending approval' })
  } catch (err) {
    console.error('POST /api/reviews error:', err)
    res.status(500).json({ error: 'Failed to submit review' })
  }
})

// PATCH /api/reviews/:id/approve — admin only
router.patch('/:id/approve', requireAdmin, async (req, res) => {
  try {
    const rev = await Review.findByIdAndUpdate(
      req.params.id,
      { approved: true },
      { new: true }
    )
    if (!rev) return res.status(404).json({ error: 'Review not found' })
    res.json(rev)
  } catch (err) {
    console.error('PATCH /api/reviews/:id/approve error:', err)
    res.status(500).json({ error: 'Failed to approve review' })
  }
})

// DELETE /api/reviews/:id — admin only (reject)
router.delete('/:id', requireAdmin, async (req, res) => {
  try {
    const rev = await Review.findByIdAndDelete(req.params.id)
    if (!rev) return res.status(404).json({ error: 'Review not found' })
    res.json({ success: true })
  } catch (err) {
    console.error('DELETE /api/reviews/:id error:', err)
    res.status(500).json({ error: 'Failed to delete review' })
  }
})

export default router
