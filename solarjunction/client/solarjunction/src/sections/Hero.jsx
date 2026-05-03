import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay }
})

function useCounter(target, duration = 2000) {
  const [count, setCount] = useState(0)
  const ref = useRef(false)

  useEffect(() => {
    if (ref.current) return
    ref.current = true

    const steps = 60
    const increment = target / steps
    let current = 0

    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [target, duration])

  return count
}

const heroBg = 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1600&q=80'

export default function Hero() {
  const c1 = useCounter(50)
  const c2 = useCounter(500)
  const c3 = useCounter(100)

  return (
    <section 
      className="min-h-screen flex flex-col items-center justify-center text-center px-6 pt-24 relative overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: `url(${heroBg})` }}
    >

      {/* Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#1E5939]/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-5xl">

        {/* Badge */}
        <motion.div
          {...fade(0)}
          className="flex items-center justify-center gap-2 border border-white/30 text-white text-xs font-bold tracking-[.2em] uppercase px-4 py-2 mb-8 rounded-full backdrop-blur-sm"
        >
          <span className="w-2 h-2 rounded-full bg-[#E88A1A] animate-pulse" />
          Next-Generation Solar
        </motion.div>

        {/* Heading */}
        <motion.h1
          {...fade(0.15)}
          className="font-black text-[clamp(3.5rem,12vw,9rem)] leading-none tracking-tight uppercase text-white drop-shadow-2xl"
        >
          Clean Solar <br />
          <span className="text-[#c5f135]">Energy</span>{' '}
          <span className="text-[#E88A1A] italic font-light drop-shadow-md">Solutions</span>
        </motion.h1>

        {/* Description */}
        <motion.p
          {...fade(0.3)}
          className="mt-6 text-white/90 max-w-lg mx-auto text-lg leading-relaxed drop-shadow-lg font-medium"
        >
          Reliable, eco-friendly solar solutions designed to reduce energy costs while maximising environmental impact.
        </motion.p>

        {/* Buttons */}
        <motion.div {...fade(0.45)} className="mt-8 flex gap-4 flex-wrap justify-center">
          <a
            href="#contact"
            className="bg-[#E88A1A] text-white font-bold text-sm tracking-widest uppercase px-8 py-3 rounded-full hover:bg-white hover:text-[#22382B] transition-all shadow-xl"
          >
            Explore Now ↓
          </a>
          <a
            href="#projects"
            className="border border-white/50 text-white font-bold text-sm tracking-widest uppercase px-8 py-3 rounded-full hover:bg-white/10 transition-all backdrop-blur-sm shadow-xl"
          >
            Our Work
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          {...fade(0.6)}
          className="mt-16 grid grid-cols-3 gap-12 border-t border-[#1E5939]/20 pt-10"
        >
          {[
            { val: c1, suffix: '+', label: 'Installations' },
            { val: c2, suffix: 'kW', label: 'Power Generated' },
            { val: c3, suffix: '%', label: 'Satisfaction' },
          ].map(({ val, suffix, label }) => (
            <div key={label}>
              <div className="text-3xl font-black text-[#E88A1A]">
                {val}{suffix}
              </div>
              <div className="text-xs text-white/70 tracking-widest uppercase mt-1 drop-shadow-sm">
                {label}
              </div>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}