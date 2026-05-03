import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const services = [
  { icon: '🏠', title: 'Home Installation', desc: 'Complete rooftop solar setup for residential homes. Save up to 90% on electricity bills.' },
  { icon: '🏭', title: 'Business Installation', desc: 'Large scale solar solutions for offices, factories and commercial buildings.' },
  { icon: '🔧', title: 'Maintenance & Repair', desc: 'Regular servicing, cleaning and repair of existing solar panel systems.' },
  { icon: '📊', title: 'Free Site Survey', desc: 'We visit your site, assess your needs and give you a detailed cost estimate — for free.' },
]

const projects = [
  { title: 'Residential Home', location: 'Nagpur, MH', panels: 12, capacity: '4kW', saving: '₹3,200/month' },
  { title: 'Small Office', location: 'Wardha, MH', panels: 20, capacity: '7kW', saving: '₹5,800/month' },
  { title: 'Farm Setup', location: 'Amravati, MH', panels: 30, capacity: '10kW', saving: '₹8,500/month' },
]

export default function ServicesProjects() {
  const [tab, setTab] = useState('services')

  return (
    <section id="services" className="py-28 px-8 md:px-16 bg-[#E1E6E1]">
      <div className="max-w-5xl mx-auto">

        {/* Tag */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-xs font-bold tracking-[.25em] uppercase text-[#E88A1A] mb-3"
        >
          What We Offer
        </motion.p>

        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">

          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl font-black uppercase text-[#22382B] leading-none"
          >
            Services & <span className="text-[#1E5939]">Projects</span>
          </motion.h2>

          {/* Tabs */}
          <div className="flex gap-2">
            {['services', 'projects'].map(t => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`text-xs font-bold tracking-widest uppercase px-6 py-2 rounded-full transition-colors ${
                  tab === t
                    ? 'bg-[#22382B] text-white'
                    : 'bg-[#F4F7F4] text-[#22382B]/50 hover:bg-[#1E5939]/10'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

        </div>

        <AnimatePresence mode="wait">
          {tab === 'services' ? (
            <motion.div
              key="services"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              {services.map(({ icon, title, desc }) => (
                <div
                  key={title}
                  className="bg-[#F4F7F4] border border-[#1E5939]/10 p-8 rounded-xl hover:border-[#E88A1A]/40 transition-colors"
                >
                  <div className="text-4xl mb-4">{icon}</div>
                  <h3 className="text-xl font-black uppercase text-[#22382B] mb-2">
                    {title}
                  </h3>
                  <p className="text-[#22382B]/50 leading-relaxed">
                    {desc}
                  </p>
                </div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="projects"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
            >
              {projects.map(({ title, location, panels, capacity, saving }) => (
                <div
                  key={title}
                  className="bg-[#F4F7F4] border border-[#1E5939]/10 p-8 rounded-xl hover:border-[#E88A1A]/40 transition-colors"
                >
                  <div className="w-full h-32 bg-[#1E5939]/10 rounded-lg flex items-center justify-center mb-6 text-5xl">
                    ☀️
                  </div>

                  <h3 className="text-xl font-black uppercase text-[#22382B] mb-1">
                    {title}
                  </h3>

                  <p className="text-xs text-[#E88A1A] font-bold tracking-widest uppercase mb-4">
                    📍 {location}
                  </p>

                  <div className="flex flex-col gap-2 text-sm text-[#22382B]/50">
                    <span>🔲 {panels} Panels Installed</span>
                    <span>⚡ {capacity} Capacity</span>
                    <span>💰 Saving {saving}</span>
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  )
}