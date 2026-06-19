import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 backdrop-blur-md bg-[#E1E6E1]/80 border-b border-[#1E5939]/10">

        <a href="#" className="font-black text-2xl tracking-widest text-[#1E5939]">
          SOLAR<span className="text-[#E88A1A]">JUNCTION</span>
        </a>

        {/* Desktop Links */}
        <ul className="hidden md:flex gap-2 text-xs font-semibold tracking-widest uppercase">
          {['Services', 'Projects', 'About', 'Contact'].map(link => (
            <li key={link}>
              <a href={`#${link.toLowerCase()}`}
                className="px-4 py-2 rounded-full text-[#22382B]/60 hover:bg-[#1E5939] hover:text-white transition-all duration-300">
                {link}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={() => document.dispatchEvent(new CustomEvent('openCalc'))}
            className="text-xs font-bold tracking-widest uppercase border border-[#1E5939] text-[#1E5939] px-5 py-2 rounded-full hover:bg-[#1E5939] hover:text-white transition-colors">
            ⚡ Savings
          </button>
          <a href="#contact" className="text-xs font-bold tracking-widest uppercase bg-[#1E5939] text-white px-5 py-2 rounded-full hover:bg-[#E88A1A] transition-colors">
            Get Quote
          </a>
        </div>

        {/* Mobile Hamburger */}
        <button onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2">
          <motion.span animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 8 : 0 }}
            className="w-6 h-0.5 bg-[#1E5939] block transition-all" />
          <motion.span animate={{ opacity: menuOpen ? 0 : 1 }}
            className="w-6 h-0.5 bg-[#1E5939] block transition-all" />
          <motion.span animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -8 : 0 }}
            className="w-6 h-0.5 bg-[#1E5939] block transition-all" />
        </button>

      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-[65px] left-0 right-0 z-40 bg-[#E1E6E1] border-b border-[#1E5939]/10 px-8 py-6 flex flex-col gap-4 md:hidden">

            {['Services', 'Projects', 'About', 'Contact'].map(link => (
              <a key={link} href={`#${link.toLowerCase()}`}
                onClick={() => setMenuOpen(false)}
                className="text-sm font-bold tracking-widest uppercase text-[#22382B]/70 hover:text-[#1E5939] transition-colors py-2 border-b border-[#1E5939]/10">
                {link}
              </a>
            ))}

            <button
              onClick={() => { document.dispatchEvent(new CustomEvent('openCalc')); setMenuOpen(false) }}
              className="w-full border border-[#1E5939] text-[#1E5939] font-bold text-sm tracking-widest uppercase py-3 rounded-full hover:bg-[#1E5939] hover:text-white transition-colors">
              ⚡ Calculate Savings
            </button>

            <a href="#contact" onClick={() => setMenuOpen(false)}
              className="w-full bg-[#1E5939] text-white font-bold text-sm tracking-widest uppercase py-3 rounded-full hover:bg-[#E88A1A] transition-colors text-center">
              Get Quote
            </a>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}