import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const stateData = {
  Maharashtra: 5.5,
  Rajasthan: 6.0,
  Gujarat: 5.8,
  'Madhya Pradesh': 5.4,
  'Uttar Pradesh': 5.2,
  Delhi: 5.0,
  Karnataka: 5.3,
  'Tamil Nadu': 5.6,
  Telangana: 5.5,
  'Andhra Pradesh': 5.4,
}

const propertyMultiplier = {
  Home: 1,
  Office: 1.2,
  Farm: 0.9,
}

export default function Calculator() {
  const [open, setOpen] = useState(false)

  const [bill, setBill] = useState('')
  const [state, setState] = useState('Maharashtra')
  const [property, setProperty] = useState('Home')
  const [result, setResult] = useState(null)

  // 🔥 Listen for Navbar button click
  useEffect(() => {
    const handler = () => setOpen(true)
    document.addEventListener('openCalc', handler)
    return () => document.removeEventListener('openCalc', handler)
  }, [])

  const calculate = () => {
    if (!bill || bill < 500) {
      alert('Please enter a valid monthly bill (min ₹500)')
      return
    }

    const sunHours = stateData[state]
    const multiplier = propertyMultiplier[property]

    const unitsPerMonth = (bill / 8) * multiplier
    const systemSize = Math.ceil((unitsPerMonth / (sunHours * 30)) * 10) / 10
    const panels = Math.ceil((systemSize * 1000) / 400)

    const monthlySaving = Math.round(bill * 0.85)
    const yearlySaving = monthlySaving * 12

    const systemCost = Math.round(systemSize * 60000)
    const payback = (systemCost / yearlySaving).toFixed(1)

    const co2 = ((unitsPerMonth * 12 * 0.82) / 1000).toFixed(1)

    setResult({
      monthlySaving,
      yearlySaving,
      systemSize,
      panels,
      systemCost,
      payback,
      co2,
    })
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center px-4"
        >
          {/* Modal Box */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-[#F4F7F4] w-full max-w-5xl rounded-2xl p-6 md:p-10 relative overflow-y-auto max-h-[90vh]"
          >
            {/* Close Button */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 text-xl font-bold text-[#22382B]/60 hover:text-black"
            >
              ✕
            </button>

            {/* Header */}
            <p className="text-xs font-bold tracking-[.25em] uppercase text-[#E88A1A] mb-3">
              Find Out Your Savings
            </p>

            <h2 className="text-4xl md:text-5xl font-black uppercase text-[#22382B] mb-4 leading-none">
              Solar Savings <span className="text-[#1E5939]">Calculator</span>
            </h2>

            <p className="text-[#22382B]/50 mb-10 max-w-lg">
              Enter your monthly electricity bill and see exactly how much you
              could save by switching to solar.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Input */}
              <div className="bg-[#E1E6E1] rounded-2xl p-6 flex flex-col gap-5">
                <div>
                  <label className="text-xs font-bold tracking-widest uppercase text-[#22382B]/50 mb-2 block">
                    Monthly Electricity Bill (₹)
                  </label>
                  <input
                    type="number"
                    value={bill}
                    onChange={(e) => setBill(e.target.value)}
                    placeholder="e.g. 3000"
                    className="w-full bg-white border border-[#1E5939]/20 rounded-lg px-4 py-3 text-sm outline-none focus:border-[#1E5939]"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold tracking-widest uppercase text-[#22382B]/50 mb-2 block">
                    Your State
                  </label>
                  <select
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full bg-white border border-[#1E5939]/20 rounded-lg px-4 py-3 text-sm"
                  >
                    {Object.keys(stateData).map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold tracking-widest uppercase text-[#22382B]/50 mb-2 block">
                    Property Type
                  </label>
                  <div className="flex gap-2">
                    {['Home', 'Office', 'Farm'].map((type) => (
                      <button
                        key={type}
                        onClick={() => setProperty(type)}
                        className={`flex-1 py-2 rounded-full text-xs font-bold tracking-widest uppercase ${
                          property === type
                            ? 'bg-[#1E5939] text-white'
                            : 'bg-white text-[#22382B]/50'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={calculate}
                  className="w-full bg-[#1E5939] text-white font-bold text-sm tracking-widest uppercase py-4 rounded-full hover:bg-[#E88A1A]"
                >
                  Calculate My Savings ⚡
                </button>
              </div>

              {/* Result */}
              <div>
                <AnimatePresence mode="wait">
                  {!result ? (
                    <motion.div
                      key="empty"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="h-full bg-[#E1E6E1] rounded-2xl flex flex-col items-center justify-center p-6 text-center"
                    >
                      <span className="text-5xl">☀️</span>
                      <p className="text-[#22382B]/50 text-sm mt-3">
                        Enter details and click Calculate.
                      </p>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="result"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="bg-[#1E5939] rounded-2xl p-6 flex flex-col gap-4"
                    >
                      <h3 className="text-white font-black uppercase text-lg">
                        Your Solar Report ☀️
                      </h3>

                      <div className="bg-[#22382B] rounded-xl p-6 text-center">
                        <p className="text-white/50 text-xs uppercase">
                          You Could Save
                        </p>
                        <p className="text-[#E88A1A] font-black text-4xl">
                          ₹{result.yearlySaving.toLocaleString()}
                        </p>
                        <p className="text-white/50 text-xs">
                          per year
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        {[
                          ['Monthly', `₹${result.monthlySaving}`],
                          ['System', `${result.systemSize} kW`],
                          ['Panels', result.panels],
                          ['Cost', `₹${result.systemCost}`],
                          ['Payback', `${result.payback} yrs`],
                          ['CO2', `${result.co2} tons`],
                        ].map(([l, v]) => (
                          <div key={l} className="bg-[#22382B]/40 p-3 rounded-xl">
                            <p className="text-white/40 text-xs">{l}</p>
                            <p className="text-white font-bold">{v}</p>
                          </div>
                        ))}
                      </div>

                      <a
                        href="#contact"
                        className="w-full bg-[#E88A1A] text-white text-center py-3 rounded-full font-bold"
                      >
                        Get Free Quote →
                      </a>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}