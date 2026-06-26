import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = ['Services', 'About', 'FAQ', 'Contact']

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Track scroll for navbar background intensity
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 backdrop-blur-md border-b border-[#1E5939]/10 transition-colors duration-300 ${
          scrolled ? 'bg-[#E1E6E1]/95 shadow-sm' : 'bg-[#E1E6E1]/80'
        }`}
      >

        <a href="#home" className="font-black text-2xl tracking-widest text-[#1E5939]">
          SOLAR<span className="text-[#E88A1A]">JUNCTION</span>
        </a>

        {/* Desktop Links */}
        <ul className="hidden md:flex gap-2 text-xs font-semibold tracking-widest uppercase">
          {navLinks.map(link => (
            <li key={link}>
              <a href={`#${link.toLowerCase()}`}
                className="px-4 py-2 rounded-full text-[#22382B]/60 hover:bg-[#1E5939] hover:text-white transition-all duration-300">
                {link}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop Buttons — unified style */}
        <div className="hidden md:flex items-center gap-3">
          {/* Secondary outlined CTA */}
          <button
            onClick={() => document.dispatchEvent(new CustomEvent('openCalc'))}
            className="text-xs font-bold tracking-widest uppercase border border-[#1E5939] text-[#1E5939] px-5 py-2 rounded-full hover:bg-[#1E5939] hover:text-white transition-all duration-300">
            ⚡ Savings
          </button>
          {/* Primary solid CTA */}
          <a href="#contact" className="text-xs font-bold tracking-widest uppercase bg-[#1E5939] text-white px-5 py-2 rounded-full hover:bg-[#E88A1A] transition-all duration-300">
            Get Quote
          </a>
          {/* Admin — same outlined style as Savings */}
          <a
            id="admin-login-nav-btn"
            href="/admin/login"
            title="Admin Portal"
            className="text-xs font-bold tracking-widest uppercase border border-[#1E5939] text-[#1E5939] px-5 py-2 rounded-full hover:bg-[#1E5939] hover:text-white transition-all duration-300 flex items-center gap-1.5"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="8" r="4"/>
              <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
            </svg>
            Admin
          </a>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          className="md:hidden flex flex-col gap-1.5 p-2"
        >
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
            className="fixed top-[65px] left-0 right-0 bottom-0 z-40 bg-[#E1E6E1] px-8 py-6 flex flex-col gap-4 md:hidden overflow-y-auto">

            {navLinks.map(link => (
              <a key={link} href={`#${link.toLowerCase()}`}
                onClick={() => setMenuOpen(false)}
                className="text-sm font-bold tracking-widest uppercase text-[#22382B]/70 hover:text-[#1E5939] transition-colors py-2 border-b border-[#1E5939]/10">
                {link}
              </a>
            ))}

            {/* Mobile — Secondary outlined */}
            <button
              onClick={() => { document.dispatchEvent(new CustomEvent('openCalc')); setMenuOpen(false) }}
              className="w-full border border-[#1E5939] text-[#1E5939] font-bold text-sm tracking-widest uppercase py-3 rounded-full hover:bg-[#1E5939] hover:text-white transition-all duration-300">
              ⚡ Calculate Savings
            </button>

            {/* Mobile — Primary solid */}
            <a href="#contact" onClick={() => setMenuOpen(false)}
              className="w-full bg-[#1E5939] text-white font-bold text-sm tracking-widest uppercase py-3 rounded-full hover:bg-[#E88A1A] transition-all duration-300 text-center">
              Get Quote
            </a>

            {/* Mobile Admin — same outlined style as Savings */}
            <a
              href="/admin/login"
              onClick={() => setMenuOpen(false)}
              className="w-full border border-[#1E5939] text-[#1E5939] font-bold text-sm tracking-widest uppercase py-3 rounded-full hover:bg-[#1E5939] hover:text-white transition-all duration-300 text-center flex items-center justify-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="8" r="4"/>
                <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
              </svg>
              Admin Portal
            </a>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}