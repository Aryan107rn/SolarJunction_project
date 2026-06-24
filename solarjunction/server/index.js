import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import rateLimit from 'express-rate-limit'
import mongoose from 'mongoose'
import { v2 as cloudinary } from 'cloudinary'
import { sendMail } from './mailer.js'

// Routes
import authRouter from './routes/auth.js'
import projectsRouter from './routes/projects.js'
import reviewsRouter from './routes/reviews.js'

dotenv.config()

// ─── Cloudinary config ───────────────────────────────────────────────────────
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

// ─── MongoDB connect ──────────────────────────────────────────────────────────
if (process.env.MONGODB_URI) {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log('✅ MongoDB connected'))
    .catch(err => console.error('❌ MongoDB connection error:', err.message))
} else {
  console.warn('⚠️  MONGODB_URI not set — database features disabled')
}

const app = express()

// ─── CORS ────────────────────────────────────────────────────────────────────
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',')
  : ['http://localhost:5173', 'http://localhost:4173']

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}))

app.use(express.json({ limit: '10kb' }))

// ─── Rate limiters ───────────────────────────────────────────────────────────
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { error: 'Too many requests. Please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
})

// ─── Sanitize helper ─────────────────────────────────────────────────────────
function sanitize(str) {
  if (typeof str !== 'string') return ''
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
    .trim()
}

// ─── Routes ──────────────────────────────────────────────────────────────────
app.use('/api/auth', authRouter)
app.use('/api/projects', projectsRouter)
app.use('/api/reviews', reviewsRouter)

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    db: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
  })
})

// Contact form (unchanged)
app.post('/api/contact', contactLimiter, async (req, res) => {
  const name = sanitize(req.body.name)
  const phone = sanitize(req.body.phone)
  const email = sanitize(req.body.email)
  const message = sanitize(req.body.message)

  if (!name || !phone || !email || !message) {
    return res.status(400).json({ error: 'All fields are required' })
  }

  if (name.length > 100 || phone.length > 20 || email.length > 100 || message.length > 2000) {
    return res.status(400).json({ error: 'Input too long' })
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(req.body.email)) {
    return res.status(400).json({ error: 'Invalid email format' })
  }

  try {
    await sendMail({
      to: req.body.email,
      subject: '☀️ Welcome to SolarJunction — Let\'s Go Green Together!',
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:auto;background:#F4F7F4;border-radius:12px;overflow:hidden;">
          
          <!-- Header -->
          <div style="background:#1E5939;padding:32px;text-align:center;">
            <h1 style="color:#E88A1A;margin:0;font-size:2rem;letter-spacing:.1em;">
              SOLAR<span style="color:white;">JUNCTION</span>
            </h1>
            <p style="color:white;margin:8px 0 0;font-size:.85rem;letter-spacing:.2em;text-transform:uppercase;">
              Powering the Green Revolution
            </p>
          </div>

          <!-- Body -->
          <div style="padding:32px;">
            <h2 style="color:#1E5939;">Hello ${name}! 👋</h2>

            <p style="color:#22382B;line-height:1.7;">
              Thank you for reaching out to <strong>SolarJunction</strong>. 
              We have received your enquiry and our team will contact you within <strong>24 hours</strong>.
            </p>

            <!-- About -->
            <div style="background:#E1E6E1;padding:24px;border-radius:8px;margin:24px 0;">
              <h3 style="color:#1E5939;margin-bottom:12px;">Who Are We?</h3>
              <p style="margin:0;color:#22382B;">
                SolarJunction is a local solar installation firm specializing in residential and commercial solar solutions.
                We focus on affordability, transparency, and high-quality installations.
              </p>
            </div>

            <!-- Services -->
            <h3 style="color:#1E5939;">What We Offer:</h3>

            <table style="width:100%;border-collapse:collapse;">
              ${[
                ['🏠', 'Home Installation', 'Complete rooftop solar setup. Save up to 90% on bills.'],
                ['🏭', 'Business Installation', 'Large scale solar for offices &amp; factories.'],
                ['🔧', 'Maintenance &amp; Repair', 'Regular servicing of existing solar systems.'],
                ['📊', 'Free Site Survey', 'We visit &amp; assess your site completely free.'],
              ].map(([icon, title, desc]) => `
                <tr>
                  <td style="padding:10px;background:white;width:40px;">${icon}</td>
                  <td style="padding:10px;">
                    <strong>${title}</strong>
                    <p style="margin:2px 0 0;font-size:.85rem;opacity:.7;">${desc}</p>
                  </td>
                </tr>
              `).join('')}
            </table>

            <!-- Why Us -->
            <div style="background:#1E5939;padding:24px;border-radius:8px;margin:24px 0;">
              <h3 style="color:#E88A1A;">Why Choose SolarJunction?</h3>
              ${[
                'MNRE Approved installer',
                'PM Surya Ghar Scheme Registered',
                'ISO certified panels',
                'Fast installation (1–2 days)',
                '25-year warranty',
              ].map(item => `
                <p style="color:white;margin:6px 0;">✅ ${item}</p>
              `).join('')}
            </div>

            <!-- User Details -->
            <div style="border:1px solid #E1E6E1;padding:20px;border-radius:8px;margin:24px 0;">
              <h3 style="color:#1E5939;">Your Enquiry Details:</h3>
              <p>📞 ${phone}</p>
              <p>✉️ ${email}</p>
              <p>💬 ${message}</p>
            </div>

            <!-- CTA -->
            <p>Need faster response?</p>

            <a href="https://wa.me/918483889064"
              style="display:inline-block;background:#25D366;color:white;padding:12px 28px;border-radius:999px;text-decoration:none;font-weight:bold;">
              💬 Chat on WhatsApp
            </a>

            <!-- Footer -->
            <hr style="margin:32px 0;" />

            <p style="font-size:12px;text-align:center;">
              SolarJunction LLP<br/>
              📧 solarjunctionllp@gmail.com<br/>
              📍 Nagpur, Maharashtra
            </p>
          </div>
        </div>
      `
    })

    await sendMail({
      to: process.env.OWNER_EMAIL,
      subject: `New Enquiry from ${name}`,
      html: `
        <div style="font-family:sans-serif;padding:24px;">
          <h2>New Lead Received 🚀</h2>

          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong> ${message}</p>
        </div>
      `
    })

    return res.json({ success: true })

  } catch (err) {
    console.error('EMAIL ERROR:', err)
    return res.status(500).json({ error: 'Failed to send email' })
  }
})

// ─── Start ───────────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`)
})