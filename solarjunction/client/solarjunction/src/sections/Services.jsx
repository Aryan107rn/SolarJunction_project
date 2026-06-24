import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000'

const services = [
  { icon: '🏠', title: 'Home Installation', desc: 'Complete rooftop solar setup for residential homes. Save up to 90% on electricity bills.' },
  { icon: '🏭', title: 'Business Installation', desc: 'Large scale solar solutions for offices, factories and commercial buildings.' },
  { icon: '🔧', title: 'Maintenance & Repair', desc: 'Regular servicing, cleaning and repair of existing solar panel systems.' },
  { icon: '📊', title: 'Free Site Survey', desc: 'We visit your site, assess your needs and give you a detailed cost estimate — for free.' },
]

// Skeleton loader for a project card
function ProjectSkeleton() {
  return (
    <div className="bg-[#F0F7F0] border border-[#1E5939]/10 rounded-xl overflow-hidden animate-pulse">
      <div className="w-full h-40 bg-[#1E5939]/10" />
      <div className="p-6 space-y-3">
        <div className="h-4 bg-[#1E5939]/10 rounded w-3/4" />
        <div className="h-3 bg-[#E88A1A]/10 rounded w-1/2" />
        <div className="h-3 bg-[#1E5939]/10 rounded w-2/3" />
        <div className="h-3 bg-[#1E5939]/10 rounded w-1/2" />
      </div>
    </div>
  )
}

export default function ServicesProjects() {
  const [tab, setTab] = useState('services')
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    async function loadProjects() {
      try {
        const res = await fetch(`${API}/api/projects`)
        if (!res.ok) throw new Error('Failed to load')
        const data = await res.json()
        setProjects(data)
      } catch {
        setError(true)
      } finally {
        setLoading(false)
      }
    }
    loadProjects()
  }, [])

  return (
    <section id="services" className="py-28 px-8 md:px-16 bg-[#E8F0E8]">
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
                id={`tab-${t}`}
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
                  className="bg-[#F0F7F0] border border-[#1E5939]/10 p-8 rounded-xl hover:border-[#E88A1A]/40 transition-colors"
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
              {loading ? (
                // Skeleton loaders
                [1, 2, 3].map(i => <ProjectSkeleton key={i} />)
              ) : error ? (
                <div className="md:col-span-3 text-center py-12 text-[#22382B]/40">
                  <p className="text-4xl mb-3">⚠️</p>
                  <p>Could not load projects. Please try again later.</p>
                </div>
              ) : projects.length === 0 ? (
                <div className="md:col-span-3 text-center py-12 text-[#22382B]/40">
                  <p className="text-4xl mb-3">☀️</p>
                  <p>Projects coming soon — check back later!</p>
                </div>
              ) : (
                projects.map(({ _id, title, location, panels, capacity, saving, imageUrl }) => (
                  <motion.div
                    key={_id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-[#F0F7F0] border border-[#1E5939]/10 rounded-xl overflow-hidden hover:border-[#E88A1A]/40 transition-colors"
                  >
                    <div className="w-full h-40 overflow-hidden">
                      <img
                        src={imageUrl}
                        alt={title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>

                    <div className="p-6">
                      <h3 className="text-lg font-black uppercase text-[#22382B] mb-1">
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
                  </motion.div>
                ))
              )}
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  )
}