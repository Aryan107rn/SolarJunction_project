import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { sendMail } from './mailer.js'

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

app.post('/api/contact', async (req, res) => {
  const { name, phone, email, message } = req.body

  // Validation
  if (!name || !phone || !email || !message) {
    return res.status(400).json({ error: 'All fields are required' })
  }

  try {
    // =========================
    // 📩 Email to User
    // =========================
    await sendMail({
      to: email,
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
                ['🏭', 'Business Installation', 'Large scale solar for offices & factories.'],
                ['🔧', 'Maintenance & Repair', 'Regular servicing of existing solar systems.'],
                ['📊', 'Free Site Survey', 'We visit & assess your site completely free.'],
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

            <a href="https://wa.me/919876543210"
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

    // =========================
    // 📩 Email to Owner
    // =========================
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


const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})