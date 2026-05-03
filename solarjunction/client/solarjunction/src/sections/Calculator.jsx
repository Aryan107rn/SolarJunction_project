import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const stateData = {
  'Maharashtra': 5.5,
  'Rajasthan': 6.0,
  'Gujarat': 5.8,
  'Madhya Pradesh': 5.4,
  'Uttar Pradesh': 5.2,
  'Delhi': 5.0,
  'Karnataka': 5.3,
  'Tamil Nadu': 5.6,
  'Telangana': 5.5,
  'Andhra Pradesh': 5.4,
}

const propertyMultiplier = {
  'Home': 1,
  'Office': 1.2,
  'Farm': 0.9,
}

export default function Calculator() {
  const [bill, setBill] = useState('')
  const [state, setState] = useState('Maharashtra')
  const [property, setProperty] = useState('Home')
  const [result, setResult] = useState(null)

  const calculate = () => {
    if (!bill || bill < 500) {
      alert('Please enter a valid monthly bill (min ₹500)')
      return
    }

    const sunHours = stateData[state]
    const multiplier = propertyMultiplier[property]

    // Units consumed per month
    const unitsPerMonth = (bill / 8) * multiplier

    // System size in kW
    const systemSize = Math.ceil((unitsPerMonth / (sunHours * 30)) * 10) / 10

    // Panels needed (each panel ~400W)
    const panels = Math.ceil((systemSize * 1000) / 400)

    // Savings (solar covers ~85% of bill)
    const monthlySaving = Math.round(bill * 0.85)
    const yearlySaving = monthlySaving * 12

    // System cost (~₹60,000 per kW)
    const systemCost = Math.round(systemSize * 60000)

    // Payback period
    const payback = (systemCost / yearlySaving).toFixed(1)

    // CO2 saved (1kWh = 0.82kg CO2, avg 30 units/day)
    const co2 = ((unitsPerMonth * 12 * 0.82) / 1000).toFixed(1)

    setResult({ monthlySaving, yearlySaving, systemSize, panels, systemCost, payback, co2 })
  }

  return (
    <section id="calculator" className="py-28 px-8 md:px-16 bg-[#F4F7F4]">
      <div className="max-w-5xl mx-auto">

        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          className="text-xs font-bold tracking-[.25em] uppercase text-[#E88A1A] mb-3">
          Find Out Your Savings
        </motion.p>

        <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-5xl font-black uppercase text-[#22382B] mb-4 leading-none">
          Solar Savings <span className="text-[#1E5939]">Calculator</span>
        </motion.h2>

        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          className="text-[#22382B]/50 mb-16 max-w-lg">
          Enter your monthly electricity bill and see exactly how much you could save by switching to solar.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

          {/* Input Side */}
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="bg-[#E1E6E1] rounded-2xl p-8 flex flex-col gap-6">

            {/* Bill Input */}
            <div>
              <label className="text-xs font-bold tracking-widest uppercase text-[#22382B]/50 mb-2 block">
                Monthly Electricity Bill (₹)
              </label>
              <input
                type="number"
                value={bill}
                onChange={e => setBill(e.target.value)}
                placeholder="e.g. 3000"
                className="w-full bg-white border border-[#1E5939]/20 rounded-lg px-4 py-3 text-[#22382B] text-sm outline-none focus:border-[#1E5939] transition-colors placeholder:text-[#22382B]/30"
              />
            </div>

            {/* State */}
            <div>
              <label className="text-xs font-bold tracking-widest uppercase text-[#22382B]/50 mb-2 block">
                Your State
              </label>
              <select
                value={state}
                onChange={e => setState(e.target.value)}
                className="w-full bg-white border border-[#1E5939]/20 rounded-lg px-4 py-3 text-[#22382B] text-sm outline-none focus:border-[#1E5939] transition-colors">
                {Object.keys(stateData).map(s => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </div>

            {/* Property Type */}
            <div>
              <label className="text-xs font-bold tracking-widest uppercase text-[#22382B]/50 mb-2 block">
                Property Type
              </label>
              <div className="flex gap-2">
                {['Home', 'Office', 'Farm'].map(type => (
                  <button key={type} onClick={() => setProperty(type)}
                    className={`flex-1 py-2 rounded-full text-xs font-bold tracking-widest uppercase transition-colors ${property === type ? 'bg-[#1E5939] text-white' : 'bg-white text-[#22382B]/50 hover:bg-[#1E5939]/10'}`}>
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <button onClick={calculate}
              className="w-full bg-[#1E5939] text-white font-bold text-sm tracking-widest uppercase py-4 rounded-full hover:bg-[#E88A1A] transition-colors mt-2">
              Calculate My Savings ⚡
            </button>

          </motion.div>

          {/* Result Side */}
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <AnimatePresence mode="wait">
              {!result ? (
                <motion.div key="empty"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="h-full bg-[#E1E6E1] rounded-2xl flex flex-col items-center justify-center p-8 text-center gap-4">
                  <span className="text-6xl">☀️</span>
                  <p className="text-[#22382B]/50 text-sm">Enter your details and click Calculate to see your personalized solar savings report.</p>
                </motion.div>
              ) : (
                <motion.div key="result"
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  className="bg-[#1E5939] rounded-2xl p-8 flex flex-col gap-4">

                  <h3 className="text-white font-black uppercase text-lg mb-2">Your Solar Report ☀️</h3>

                  {/* Big savings */}
                  <div className="bg-[#22382B] rounded-xl p-6 text-center">
                    <p className="text-white/50 text-xs tracking-widest uppercase mb-1">You Could Save</p>
                    <p className="text-[#E88A1A] font-black text-5xl">₹{result.yearlySaving.toLocaleString()}</p>
                    <p className="text-white/50 text-xs mt-1">per year</p>
                  </div>

                  {/* Stats grid */}
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { label: 'Monthly Saving', val: `₹${result.monthlySaving.toLocaleString()}` },
                      { label: 'System Size', val: `${result.systemSize} kW` },
                      { label: 'Panels Needed', val: `${result.panels} panels` },
                      { label: 'Estimated Cost', val: `₹${result.systemCost.toLocaleString()}` },
                      { label: 'Payback Period', val: `${result.payback} years` },
                      { label: 'CO2 Saved/Year', val: `${result.co2} tons` },
                    ].map(({ label, val }) => (
                      <div key={label} className="bg-[#22382B]/40 rounded-xl p-4">
                        <p className="text-white/40 text-xs tracking-widest uppercase mb-1">{label}</p>
                        <p className="text-white font-black text-lg">{val}</p>
                      </div>
                    ))}
                  </div>

                  <a href="#contact"
                    className="w-full bg-[#E88A1A] text-white font-bold text-sm tracking-widest uppercase py-4 rounded-full hover:opacity-80 transition-opacity text-center mt-2">
                    Get Free Quote Now →
                  </a>

                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

        </div>
      </div>
    </section>
  )
}