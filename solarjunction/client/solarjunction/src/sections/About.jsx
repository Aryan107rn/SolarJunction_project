import { motion } from 'framer-motion'

const reviews = [
  { name: 'Rajesh Sharma', location: 'Nagpur', rating: 5, review: 'My electricity bill dropped from ₹4,500 to just ₹400 per month. Team was professional and finished in one day.' },
  { name: 'Priya Deshmukh', location: 'Wardha', rating: 5, review: 'Very honest people. They told me exactly what I needed and did not try to oversell.' },
  { name: 'Suresh Patil', location: 'Amravati', rating: 5, review: 'Got the government subsidy with their help. Saved a lot on upfront cost. Highly recommend!' },
]

export default function About() {
  return (
    <section id="about" className="py-28 px-8 md:px-16 bg-[#F4F7F4]">
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
              { icon: '⚡', title: 'Fast Install', desc: 'Most setups completed within 1-2 days.' },
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

        {/* Testimonials */}
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {reviews.map(({ name, location, rating, review }, i) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-[#E1E6E1] border border-[#1E5939]/10 p-6 rounded-xl"
            >
              <div className="flex gap-1 mb-3">
                {Array.from({ length: rating }).map((_, i) => (
                  <span key={i} className="text-[#E88A1A]">★</span>
                ))}
              </div>

              <p className="text-[#22382B]/50 text-sm leading-relaxed mb-4">
                "{review}"
              </p>

              <div className="border-t border-[#1E5939]/10 pt-3">
                <p className="font-black uppercase text-[#22382B] text-sm">
                  {name}
                </p>
                <p className="text-xs text-[#E88A1A] tracking-widest uppercase mt-1">
                  📍 {location}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}