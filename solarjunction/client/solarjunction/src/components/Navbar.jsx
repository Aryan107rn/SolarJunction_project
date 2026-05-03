export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 backdrop-blur-md bg-[#E1E6E1]/80 border-b border-[#1E5939]/10">
      
      <a href="#" className="font-black text-2xl tracking-widest text-[#1E5939]">
        SOLAR<span className="text-[#E88A1A]">JUNCTION</span>
      </a>

      <ul className="hidden md:flex gap-2 text-xs font-semibold tracking-widest uppercase">
        {['Services', 'Projects', 'About', 'Contact'].map(link => (
          <li key={link}>
            <a
              href={`#${link.toLowerCase()}`}
              className="px-4 py-2 rounded-full text-[#22382B]/60 hover:bg-[#1E5939] hover:text-white transition-all duration-300"
            >
              {link}
            </a>
          </li>
        ))}
      </ul>

      {/* UPDATED RIGHT SIDE */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => document.dispatchEvent(new CustomEvent('openCalc'))}
          className="text-xs font-bold tracking-widest uppercase border border-[#1E5939] text-[#1E5939] px-5 py-2 rounded-full hover:bg-[#1E5939] hover:text-white transition-colors"
        >
          ⚡ Savings
        </button>

        <a
          href="#contact"
          className="text-xs font-bold tracking-widest uppercase bg-[#1E5939] text-white px-5 py-2 rounded-full hover:bg-[#E88A1A] transition-colors"
        >
          Get Quote
        </a>
      </div>

    </nav>
  );
}