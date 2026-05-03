import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const stateData = {
  'Maharashtra': 5.5, 'Rajasthan': 6.0, 'Gujarat': 5.8,
  'Madhya Pradesh': 5.4, 'Uttar Pradesh': 5.2, 'Delhi': 5.0,
  'Karnataka': 5.3, 'Tamil Nadu': 5.6, 'Telangana': 5.5, 'Andhra Pradesh': 5.4,
}

const propertyMultiplier = { 'Home': 1, 'Office': 1.2, 'Farm': 0.9 }

export default function CalcButton() {
  const [open, setOpen] = useState(false)
  const [bill, setBill] = useState('')
  const [state, setState] = useState('Maharashtra')
  const [property, setProperty] = useState('Home')
  const [result, setResult] = useState(null)

  const calculate = () => {
    if (!bill || bill < 500) { alert('Enter a valid bill (min ₹500)'); return }
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
    setResult({ monthlySaving, yearlySaving, systemSize, panels, systemCost, payback, co2 })
  }

  const reset = () => { setResult(null); setBill(''); setProperty('Home'); setState('Maharashtra') }

  return (
    <>
      {/* Floating Button */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        onClick={() => setOpen(true)}
        className="fixed bottom-8 left-8 z-50 bg-[#E88A1A] text-white font-bold text-xs tracking-widest uppercase px-5 py-3 rounded-full shadow-lg hover:bg-[#1E5939] transition-colors flex items-center gap-2">
        ⚡ Calculate Savings
      </motion.button>

      {/* Modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => { setOpen(false); reset() }}
            className="fixed inset-0 z-[9990] bg-black/60 backdrop-blur-sm flex items-center justify-center px-4">

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={e => e.stopPropagation()}
              className="bg-[#F4F7F4] rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-8 relative">

              {/* Close */}
              <button onClick={() => { setOpen(false); reset() }}
                className="absolute top-4 right-4 text-[#22382B]/40 hover:text-[#22382B] text-2xl font-black">✕</button>

              <p className="text-xs font-bold tracking-[.25em] uppercase text-[#E88A1A] mb-2">Free Tool</p>
              <h2 className="text-3xl font-black uppercase text-[#22382B] mb-6 leading-none">
                Solar Savings <span className="text-[#1E5939]">Calculator</span>
              </h2>

              <AnimatePresence mode="wait">
                {!result ? (
                  <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="flex flex-col gap-5">

                    <div>
                      <label className="text-xs font-bold tracking-widest uppercase text-[#22382B]/50 mb-2 block">Monthly Bill (₹)</label>
                      <input type="number" value={bill} onChange={e => setBill(e.target.value)}
                        placeholder="e.g. 3000"
                        className="w-full bg-white border border-[#1E5939]/20 rounded-lg px-4 py-3 text-[#22382B] text-sm outline-none focus:border-[#1E5939] transition-colors placeholder:text-[#22382B]/30" />
                    </div>

                    <div>
                      <label className="text-xs font-bold tracking-widest uppercase text-[#22382B]/50 mb-2 block">Your State</label>
                      <select value={state} onChange={e => setState(e.target.value)}
                        className="w-full bg-white border border-[#1E5939]/20 rounded-lg px-4 py-3 text-[#22382B] text-sm outline-none focus:border-[#1E5939] transition-colors">
                        {Object.keys(stateData).map(s => <option key={s}>{s}</option>)}
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-bold tracking-widest uppercase text-[#22382B]/50 mb-2 block">Property Type</label>
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
                      className="w-full bg-[#1E5939] text-white font-bold text-sm tracking-widest uppercase py-4 rounded-full hover:bg-[#E88A1A] transition-colors">
                      Calculate ⚡
                    </button>

                  </motion.div>
                ) : (
                  <motion.div key="result" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col gap-4">

                    <div className="bg-[#1E5939] rounded-xl p-6 text-center">
                      <p className="text-white/50 text-xs tracking-widest uppercase mb-1">You Could Save</p>
                      <p className="text-[#E88A1A] font-black text-5xl">₹{result.yearlySaving.toLocaleString()}</p>
                      <p className="text-white/50 text-xs mt-1">per year</p>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { label: 'Monthly Saving', val: `₹${result.monthlySaving.toLocaleString()}` },
                        { label: 'System Size', val: `${result.systemSize} kW` },
                        { label: 'Panels Needed', val: `${result.panels} panels` },
                        { label: 'Estimated Cost', val: `₹${result.systemCost.toLocaleString()}` },
                        { label: 'Payback Period', val: `${result.payback} years` },
                        { label: 'CO2 Saved/Year', val: `${result.co2} tons` },
                      ].map(({ label, val }) => (
                        <div key={label} className="bg-[#E1E6E1] rounded-xl p-4">
                          <p className="text-[#22382B]/40 text-xs tracking-widest uppercase mb-1">{label}</p>
                          <p className="text-[#22382B] font-black text-lg">{val}</p>
                        </div>
                      ))}
                    </div>

                    <div className="flex gap-3">
                      <button onClick={reset}
                        className="flex-1 border border-[#1E5939] text-[#1E5939] font-bold text-xs tracking-widest uppercase py-3 rounded-full hover:bg-[#1E5939]/10 transition-colors">
                        Recalculate
                      </button>
                      <a href="#contact" onClick={() => setOpen(false)}
                        className="flex-1 bg-[#E88A1A] text-white font-bold text-xs tracking-widest uppercase py-3 rounded-full hover:opacity-80 transition-opacity text-center">
                        Get Free Quote →
                      </a>
                    </div>

                  </motion.div>
                )}
              </AnimatePresence>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}