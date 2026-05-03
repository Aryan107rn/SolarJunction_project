import { useState } from 'react'
import { motion } from 'framer-motion'

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  })

  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  const handle = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async () => {
    if (!form.name || !form.phone || !form.email || !form.message) {
      alert('Please fill all fields!')
      return
    }

    setLoading(true)

    try {
      const res = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })

      const data = await res.json()

      if (data.success) {
        setSent(true)
        setForm({ name: '', phone: '', email: '', message: '' }) // reset form
      } else {
        alert('Something went wrong. Try again.')
      }
    } catch {
      alert('Server not reachable. Make sure backend is running.')
    }

    setLoading(false)
  }

  return (
    <section id="contact" className="py-28 px-8 md:px-16 bg-[#F4F7F4]">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-start">

        {/* Left */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-xs font-bold tracking-[.25em] uppercase text-[#E88A1A] mb-3">
            Get In Touch
          </p>

          <h2 className="text-5xl font-black uppercase text-[#22382B] leading-none mb-6">
            Let's Go <span className="text-[#1E5939]">Solar</span>
          </h2>

          <p className="text-[#22382B]/50 leading-relaxed mb-10">
            Get a free site survey and quote. We'll visit your home or business and recommend the best system for your needs.
          </p>

          <div className="flex flex-col gap-5">
            {[
              { icon: '📞', label: 'Phone', value: '+91 98765 43210' },
              { icon: '💬', label: 'WhatsApp', value: '+91 98765 43210' },
              { icon: '📧', label: 'Email', value: 'solarjunctionllp@gmail.com' },
              { icon: '📍', label: 'Location', value: 'Nagpur, Maharashtra' },
            ].map(({ icon, label, value }) => (
              <div key={label} className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#E1E6E1] rounded-full flex items-center justify-center text-xl shrink-0">
                  {icon}
                </div>
                <div>
                  <p className="text-xs text-[#22382B]/50 tracking-widest uppercase">
                    {label}
                  </p>
                  <p className="font-bold text-[#22382B]">
                    {value}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* WhatsApp CTA */}
          <a
            href="https://wa.me/919876543210"
            target="_blank"
            rel="noreferrer"
            className="mt-10 inline-flex items-center gap-3 bg-[#25D366] text-white font-bold text-sm tracking-widest uppercase px-8 py-3 rounded-full hover:opacity-80 transition-opacity"
          >
            <span>💬</span> Chat on WhatsApp
          </a>
        </motion.div>

        {/* Right - Form */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="bg-white border border-[#1E5939]/10 rounded-2xl p-8"
        >
          <h3 className="font-black uppercase text-[#22382B] text-xl mb-6">
            Request Free Quote
          </h3>

          <div className="flex flex-col gap-4">

            {[
              { name: 'name', label: 'Your Name', type: 'text', placeholder: 'Rajesh Sharma' },
              { name: 'phone', label: 'Phone Number', type: 'tel', placeholder: '+91 98765 43210' },
              { name: 'email', label: 'Email Address', type: 'email', placeholder: 'you@email.com' },
            ].map(({ name, label, type, placeholder }) => (
              <div key={name}>
                <label className="text-xs font-bold tracking-widest uppercase text-[#22382B]/50 mb-2 block">
                  {label}
                </label>

                <input
                  type={type}
                  name={name}
                  value={form[name]}
                  onChange={handle}
                  placeholder={placeholder}
                  className="w-full bg-[#E1E6E1] border border-[#1E5939]/20 rounded-lg px-4 py-3 text-[#22382B] text-sm outline-none focus:border-[#1E5939] transition-colors placeholder:text-[#22382B]/30"
                />
              </div>
            ))}

            <div>
              <label className="text-xs font-bold tracking-widest uppercase text-[#22382B]/50 mb-2 block">
                Message
              </label>

              <textarea
                name="message"
                value={form.message}
                onChange={handle}
                placeholder="Tell us about your property and energy needs..."
                rows={4}
                className="w-full bg-[#E1E6E1] border border-[#1E5939]/20 rounded-lg px-4 py-3 text-[#22382B] text-sm outline-none focus:border-[#1E5939] transition-colors placeholder:text-[#22382B]/30 resize-none"
              />
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading || sent}
              className="w-full bg-[#1E5939] text-white font-bold text-sm tracking-widest uppercase py-4 rounded-full hover:bg-[#E88A1A] transition-colors mt-2 disabled:opacity-60"
            >
              {sent ? '✅ Request Sent!' : loading ? 'Sending...' : 'Send Request →'}
            </button>

          </div>
        </motion.div>

      </div>
    </section>
  )
}