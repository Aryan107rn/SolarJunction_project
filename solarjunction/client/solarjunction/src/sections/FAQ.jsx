import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const faqs = [
  { q: 'How long does installation take?', a: 'It depends on the size of the system, but most residential installations are completed within a week. Commercial projects may take 3-5 days.' },
  { q: 'How much can I save on electricity?', a: 'On average customers save 60-90% on monthly bills depending on system size and usage.' },
  { q: 'Do you provide warranty?', a: 'Yes. Panels come with performance warranty. Also installation carries workmanship warranty.' },
  { q: 'Is my roof suitable for solar?', a: 'We do a free site survey to assess your roof before recommending any system.' },
  { q: 'What happens on cloudy days?', a: 'Panels still generate electricity on cloudy days at reduced efficiency. Battery storage is also available.' },
  { q: 'Do you help with subsidies?', a: 'Yes! We help you apply for PM Surya Ghar Muft Bijli Yojana and other state subsidies.' },
]

export default function FAQLegal() {
  const [open, setOpen] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <section id="faq" className="py-28 px-8 md:px-16 bg-[#E1E6E1]">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">

        {/* FAQ */}
        <div>
          <motion.p className="text-xs font-bold tracking-[.25em] uppercase text-[#E88A1A] mb-3">
            Got Questions?
          </motion.p>

          <motion.h2 className="text-4xl font-black uppercase text-[#22382B] mb-10 leading-none">
            FAQ
          </motion.h2>

          <div className="flex flex-col gap-3">
            {faqs.map(({ q, a }, i) => (
              <motion.div
                key={i}
                className="bg-[#F4F7F4] border border-[#1E5939]/10 rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left"
                >
                  <span className="font-bold text-[#22382B] text-sm">{q}</span>

                  <span
                    className={`text-[#1E5939] text-xl font-black transition-transform duration-300 ${
                      open === i ? 'rotate-45' : ''
                    }`}
                  >
                    +
                  </span>
                </button>

                <AnimatePresence>
                  {open === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                    >
                      <p className="px-5 pb-4 text-[#22382B]/50 text-sm leading-relaxed">
                        {a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Legal */}
        <div>
          <motion.p className="text-xs font-bold tracking-[.25em] uppercase text-[#E88A1A] mb-3">
            Legal & Technical
          </motion.p>

          <motion.h2 className="text-4xl font-black uppercase text-[#22382B] mb-10 leading-none">
            Trust & <span className="text-[#1E5939]">Compliance</span>
          </motion.h2>

          <div className="flex flex-col gap-4">
            {[
              { icon: '🔒', title: 'Privacy Policy', desc: 'We collect only what is needed — your name, contact and site address. Your data is never sold or shared.' },
              { icon: '📄', title: 'Terms of Service', desc: 'All installs are done after a signed agreement. Payments are milestone-based. Cancellations before install are fully refunded.' },
            ].map(({ icon, title, desc }) => (
              <div
                key={title}
                className="bg-[#F4F7F4] border border-[#1E5939]/10 rounded-xl p-6"
              >
                <div className="text-2xl mb-2">{icon}</div>
                <h3 className="font-black uppercase text-[#22382B] mb-2">
                  {title}
                </h3>
                <p className="text-[#22382B]/50 text-sm leading-relaxed">
                  {desc}
                </p>
              </div>
            ))}

            {/* Certifications */}
            <div className="bg-[#F4F7F4] border border-[#1E5939]/10 rounded-xl p-6">
              <div className="text-2xl mb-2">🏅</div>
              <h3 className="font-black uppercase text-[#22382B] mb-3">
                Certifications
              </h3>

              <div className="flex flex-col gap-2 mb-4">
                {[
                  { label: 'MNRE Approved', desc: 'Ministry of New & Renewable Energy recognised' },
                  { label: 'PM Surya Ghar', desc: 'Registered under government solar scheme' },
                  { label: 'ISO Panels', desc: 'Only ISO certified panels used' },
                ].map(({ label, desc }) => (
                  <div key={label} className="flex items-start gap-2">
                    <span className="text-[#1E5939] font-black">✓</span>
                    <div>
                      <p className="text-[#22382B] text-sm font-bold">{label}</p>
                      <p className="text-[#22382B]/50 text-xs">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setModalOpen(true)}
                className="w-full bg-[#1E5939]/10 border border-[#1E5939]/20 text-[#22382B] text-xs font-bold tracking-widest uppercase py-3 rounded-lg hover:bg-[#1E5939]/20 transition-colors"
              >
                View Certificate →
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm px-4"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="bg-[#F4F7F4] rounded-2xl p-8 max-w-lg w-full relative"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 text-[#22382B]/50 hover:text-[#22382B] text-2xl font-black"
            >
              ✕
            </button>

            <h3 className="font-black uppercase text-[#22382B] text-lg mb-6">
              Government Certificate
            </h3>

            <div className="w-full h-64 bg-[#E1E6E1] border-2 border-dashed border-[#1E5939]/20 rounded-xl flex flex-col items-center justify-center gap-3">
              <span className="text-5xl">📋</span>
              <p className="text-[#22382B]/50 text-sm">
                Certificate will be displayed here
              </p>
            </div>

            <p className="text-[#22382B]/50 text-xs text-center mt-4">
              Issued by Ministry of New & Renewable Energy, Govt. of India
            </p>
          </div>
        </div>
      )}
    </section>
  )
}