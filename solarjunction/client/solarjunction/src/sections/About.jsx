import { motion } from 'framer-motion'
import { useState, useEffect, useCallback } from 'react'

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000'

// ─── Star picker (interactive) ────────────────────────────────────────────────
function StarPicker({ value, onChange }) {
  const [hover, setHover] = useState(0)
  return (
    <div className="flex gap-1" role="group" aria-label="Star rating">
      {[1, 2, 3, 4, 5].map(n => (
        <button
          key={n}
          type="button"
          aria-label={`${n} star${n > 1 ? 's' : ''}`}
          onClick={() => onChange(n)}
          onMouseEnter={() => setHover(n)}
          onMouseLeave={() => setHover(0)}
          className={`text-2xl transition-transform hover:scale-110 ${
            n <= (hover || value) ? 'text-[#E88A1A]' : 'text-[#22382B]/20'
          }`}
        >
          ★
        </button>
      ))}
    </div>
  )
}

// ─── Review Skeleton ──────────────────────────────────────────────────────────
function ReviewSkeleton() {
  return (
    <div className="bg-[#E1E6E1] border border-[#1E5939]/10 p-6 rounded-xl animate-pulse space-y-3">
      <div className="flex gap-1">
        {[1,2,3,4,5].map(i => <span key={i} className="text-[#E88A1A]/30">★</span>)}
      </div>
      <div className="h-3 bg-[#1E5939]/10 rounded w-full" />
      <div className="h-3 bg-[#1E5939]/10 rounded w-4/5" />
      <div className="border-t border-[#1E5939]/10 pt-3 space-y-1">
        <div className="h-3 bg-[#1E5939]/10 rounded w-1/3" />
        <div className="h-2 bg-[#E88A1A]/10 rounded w-1/4" />
      </div>
    </div>
  )
}

export default function About() {
  // Reviews
  const [reviews, setReviews] = useState([])
  const [revLoading, setRevLoading] = useState(true)

  // Review form
  const [form, setForm] = useState({ name: '', location: '', rating: 0, review: '' })
  const [submitting, setSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null) // 'success' | 'error'
  const [submitMsg, setSubmitMsg] = useState('')

  const loadReviews = useCallback(async () => {
    setRevLoading(true)
    try {
      const res = await fetch(`${API}/api/reviews`)
      const data = await res.json()
      setReviews(Array.isArray(data) ? data : [])
    } catch {
      setReviews([])
    } finally {
      setRevLoading(false)
    }
  }, [])

  useEffect(() => {
    let cancelled = false
    async function run() { if (!cancelled) await loadReviews() }
    run()
    return () => { cancelled = true }
  }, [loadReviews])

  async function handleSubmitReview(e) {
    e.preventDefault()
    if (form.rating === 0) {
      setSubmitStatus('error')
      setSubmitMsg('Please select a star rating')
      return
    }
    setSubmitting(true)
    setSubmitStatus(null)
    try {
      const res = await fetch(`${API}/api/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Submission failed')
      setSubmitStatus('success')
      setSubmitMsg('Thank you! Your review has been submitted and will appear after approval.')
      setForm({ name: '', location: '', rating: 0, review: '' })
    } catch (err) {
      setSubmitStatus('error')
      setSubmitMsg(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section id="about" className="py-28 px-8 md:px-16 bg-[#EDF4ED]">
      <div className="max-w-5xl mx-auto">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start mb-20">

          {/* Left - About */}
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <p className="text-xs font-bold tracking-[.25em] uppercase text-[#E88A1A] mb-3">
              Who We Are
            </p>

            <h2 className="text-5xl font-black uppercase text-[#22382B] leading-none mb-6">
              Local. <span className="text-[#1E5939]">Trusted.</span> Green.
            </h2>

            <p className="text-[#22382B]/50 leading-relaxed mb-4">
              SolarJunction is a local solar installation firm run by a passionate solar fitter with hands-on experience in residential and commercial setups.
            </p>

            <p className="text-[#22382B]/50 leading-relaxed mb-8">
              No middlemen, no hidden costs — just honest work and quality installations.
            </p>

            <a
              href="#contact"
              className="bg-[#1E5939] text-white font-bold text-sm tracking-widest uppercase px-8 py-3 rounded-full hover:bg-[#E88A1A] transition-colors inline-block"
            >
              Work With Us
            </a>
          </motion.div>

          {/* Right - Values */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-3"
          >
            {[
              { icon: '🌿', title: 'Eco First', desc: 'Every install reduces carbon footprint.' },
              { icon: '💸', title: 'Affordable', desc: 'Competitive pricing with flexible payment options.' },
              { icon: '🤝', title: 'Honest Work', desc: 'No upselling. We recommend only what you truly need.' },
              { icon: '⚡', title: 'Fast Install', desc: 'Most setups completed within 10-15 days' },
            ].map(({ icon, title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-4 items-start bg-[#E1E6E1] border border-[#1E5939]/10 p-4 rounded-xl"
              >
                <span className="text-2xl">{icon}</span>
                <div>
                  <h4 className="font-black uppercase text-[#22382B] mb-0.5">
                    {title}
                  </h4>
                  <p className="text-sm text-[#22382B]/50">
                    {desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* ─── Reviews Section ──────────────────────────────────────────────── */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-xs font-bold tracking-[.25em] uppercase text-[#E88A1A] mb-3"
        >
          What People Say
        </motion.p>

        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-black uppercase text-[#22382B] mb-10 leading-none"
        >
          Customer <span className="text-[#1E5939]">Reviews</span>
        </motion.h3>

        {/* Reviews grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
          {revLoading ? (
            [1, 2, 3].map(i => <ReviewSkeleton key={i} />)
          ) : reviews.length === 0 ? (
            <div className="md:col-span-3 text-center py-8 text-[#22382B]/40">
              <p>No reviews yet — be the first to share your experience!</p>
            </div>
          ) : (
            reviews.map(({ _id, name, location, rating, review }, i) => (
              <motion.div
                key={_id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-[#E1E6E1] border border-[#1E5939]/10 p-6 rounded-xl"
              >
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: 5 }).map((_, starIdx) => (
                    <span key={starIdx} className={starIdx < rating ? 'text-[#E88A1A]' : 'text-[#22382B]/20'}>★</span>
                  ))}
                </div>

                <p className="text-[#22382B]/50 text-sm leading-relaxed mb-4">
                  "{review}"
                </p>

                <div className="border-t border-[#1E5939]/10 pt-3">
                  <p className="font-black uppercase text-[#22382B] text-sm">
                    {name}
                  </p>
                  {location && (
                    <p className="text-xs text-[#E88A1A] tracking-widest uppercase mt-1">
                      📍 {location}
                    </p>
                  )}
                </div>
              </motion.div>
            ))
          )}
        </div>

        {/* ─── Submit Review Form ───────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-[#E1E6E1] border border-[#1E5939]/10 rounded-2xl p-8"
        >
          <h4 className="text-2xl font-black uppercase text-[#22382B] mb-1">
            Share Your Experience
          </h4>
          <p className="text-[#22382B]/50 text-sm mb-6">
            Your review will be published after a quick approval — usually within 24 hours.
          </p>

          {submitStatus === 'success' ? (
            <div className="bg-[#1E5939]/10 border border-[#1E5939]/20 rounded-xl p-6 text-center">
              <p className="text-3xl mb-3">🎉</p>
              <p className="font-black uppercase text-[#1E5939] text-lg mb-1">Review Submitted!</p>
              <p className="text-[#22382B]/50 text-sm">{submitMsg}</p>
              <button
                onClick={() => setSubmitStatus(null)}
                className="mt-4 text-xs font-bold tracking-widest uppercase px-6 py-2 rounded-full bg-[#1E5939] text-white hover:bg-[#E88A1A] transition-colors"
              >
                Write Another
              </button>
            </div>
          ) : (
            <form id="review-form" onSubmit={handleSubmitReview} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-[#22382B]/70 text-xs font-bold tracking-widest uppercase block mb-1.5">
                    Your Name *
                  </label>
                  <input
                    id="review-name"
                    type="text"
                    required
                    value={form.name}
                    onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                    placeholder="Rajesh Sharma"
                    maxLength={100}
                    className="w-full bg-white border border-[#1E5939]/20 rounded-xl px-4 py-3 text-[#22382B] placeholder-[#22382B]/30 outline-none focus:border-[#1E5939] transition-colors text-sm"
                  />
                </div>
                <div>
                  <label className="text-[#22382B]/70 text-xs font-bold tracking-widest uppercase block mb-1.5">
                    Location (optional)
                  </label>
                  <input
                    id="review-location"
                    type="text"
                    value={form.location}
                    onChange={e => setForm(p => ({ ...p, location: e.target.value }))}
                    placeholder="Nagpur, MH"
                    maxLength={100}
                    className="w-full bg-white border border-[#1E5939]/20 rounded-xl px-4 py-3 text-[#22382B] placeholder-[#22382B]/30 outline-none focus:border-[#1E5939] transition-colors text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="text-[#22382B]/70 text-xs font-bold tracking-widest uppercase block mb-2">
                  Your Rating *
                </label>
                <StarPicker value={form.rating} onChange={r => setForm(p => ({ ...p, rating: r }))} />
              </div>

              <div>
                <label className="text-[#22382B]/70 text-xs font-bold tracking-widest uppercase block mb-1.5">
                  Your Review *
                </label>
                <textarea
                  id="review-text"
                  required
                  value={form.review}
                  onChange={e => setForm(p => ({ ...p, review: e.target.value }))}
                  placeholder="Share your experience with SolarJunction..."
                  maxLength={1000}
                  rows={4}
                  className="w-full bg-white border border-[#1E5939]/20 rounded-xl px-4 py-3 text-[#22382B] placeholder-[#22382B]/30 outline-none focus:border-[#1E5939] transition-colors text-sm resize-none"
                />
                <p className="text-right text-xs text-[#22382B]/30 mt-1">{form.review.length}/1000</p>
              </div>

              {submitStatus === 'error' && (
                <div className="bg-red-100 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl">
                  ❌ {submitMsg}
                </div>
              )}

              <button
                id="review-submit-btn"
                type="submit"
                disabled={submitting}
                className="bg-[#1E5939] hover:bg-[#E88A1A] text-white font-black uppercase tracking-widest text-sm px-8 py-3 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? 'Submitting…' : '⭐ Submit Review'}
              </button>
            </form>
          )}
        </motion.div>

      </div>
    </section>
  )
}