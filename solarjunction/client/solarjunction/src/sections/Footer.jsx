import { motion } from 'framer-motion'
import { FaFacebookF, FaInstagram, FaYoutube } from 'react-icons/fa'

export default function Footer() {
  return (
    <footer className="bg-[#22382B] text-white px-8 md:px-16 pt-20 pb-8">
      <div className="max-w-5xl mx-auto">

        {/* Top */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pb-16 border-b border-white/10">

          {/* Brand */}
          <div className="md:col-span-2">
            <a href="#" className="font-black text-3xl tracking-widest text-[#E88A1A]">
              SOLAR<span className="text-white">JUNCTION</span>
            </a>

            <p className="text-white/40 text-sm leading-relaxed mt-4 max-w-xs">
              Local solar installation experts. Making clean energy affordable for every home and business.
            </p>

            {/* Socials */}
            <div className="flex gap-3 mt-6">
              {[
                { icon: <FaFacebookF />, href: '#' },
                { icon: <FaInstagram />, href: '#' },
                { icon: <FaYoutube />, href: '#' },
              ].map(({ icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:border-[#E88A1A] hover:text-[#E88A1A] hover:bg-[#E88A1A]/10 transition-all duration-300"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <p className="text-xs font-bold tracking-[.2em] uppercase text-[#E88A1A] mb-6">
              Quick Links
            </p>

            <ul className="flex flex-col gap-3">
              {['Services', 'Projects', 'About', 'FAQ', 'Contact'].map(link => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    className="text-white/40 text-sm hover:text-white transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-xs font-bold tracking-[.2em] uppercase text-[#E88A1A] mb-6">
              Contact
            </p>

            <ul className="flex flex-col gap-3 text-sm text-white/40">
              <li>📞 +91 98765 43210</li>
              <li>📧 solarjunctionllp@gmail.com</li>
              <li>📍 Nagpur, Maharashtra</li>
            </ul>

            <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center gap-2 bg-[#25D366] text-white text-xs font-bold tracking-widest uppercase px-5 py-2 rounded-full hover:opacity-80 transition-opacity"
            >
              💬 WhatsApp Us
            </a>
          </div>

        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 text-xs text-white/20">
          <p>© 2025 SolarJunction. All rights reserved.</p>

          <div className="flex gap-6">
            <a href="#legal" className="hover:text-white/60 transition-colors">
              Privacy Policy
            </a>
            <a href="#legal" className="hover:text-white/60 transition-colors">
              Terms of Service
            </a>
            <a href="#legal" className="hover:text-white/60 transition-colors">
              Certifications
            </a>
          </div>
        </div>

      </div>
    </footer>
  )
}