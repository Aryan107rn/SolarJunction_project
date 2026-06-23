import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const stateData = {
  Maharashtra: 11.0,
  Rajasthan: 12.0,
  Gujarat: 10.8,
  'Madhya Pradesh': 11.4,
  'Uttar Pradesh': 13.2,
  Delhi: 11.0,
  Karnataka: 12.3,
  'Tamil Nadu': 9.6,
  Telangana: 12.5,
  'Andhra Pradesh': 11.7,
}

const propertyMultiplier = {
  Home: 1,
  Office: 1.2,
  Farm: 0.9,
}

export default function CalcButton() {
  const [open, setOpen] = useState(false)
  const [bill, setBill] = useState('')
  const [state, setState] = useState('Maharashtra')
  const [property, setProperty] = useState('Home')
  const [result, setResult] = useState(null)
  const [validationError, setValidationError] = useState('')

  // Listen to Navbar button
  useEffect(() => {
    const handler = () => setOpen(true)
    document.addEventListener('openCalc', handler)
    return () => document.removeEventListener('openCalc', handler)
  }, [])

  // Lock body scroll when modal is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [open])

  const calculate = () => {
    const billNum = parseFloat(bill)
    if (!bill || isNaN(billNum) || billNum < 500) {
      setValidationError('Please enter a valid monthly bill (minimum ₹500)')
      return
    }
    setValidationError('')

    const sunHours = stateData[state]
    const multiplier = propertyMultiplier[property]

    const unitsPerMonth = (billNum / 8) * multiplier
    const systemSize = Math.ceil((unitsPerMonth / (sunHours * 30)) * 10) / 10
    const panels = Math.ceil((systemSize * 1000) / 400)

    const monthlySaving = Math.round(billNum * 0.85)
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

  const reset = () => {
    setResult(null)
    setBill('')
    setProperty('Home')
    setState('Maharashtra')
    setValidationError('')
  }

  const close = () => {
    setOpen(false)
    reset()
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={close}
          className="fixed inset-0 z-[9990] bg-black/60 backdrop-blur-sm flex items-center justify-center px-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-[#F4F7F4] rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-8 relative"
          >
            {/* Close */}
            <button
              onClick={close}
              aria-label="Close calculator"
              className="absolute top-4 right-4 text-[#22382B]/40 hover:text-[#22382B] text-2xl font-black transition-colors"
            >
              ✕
            </button>

            {/* Header */}
            <p className="text-xs font-bold tracking-[.25em] uppercase text-[#E88A1A] mb-2">
              Free Tool
            </p>

            <h2 className="text-3xl font-black uppercase text-[#22382B] mb-6 leading-none">
              Solar Savings <span className="text-[#1E5939]">Calculator</span>
            </h2>

            <AnimatePresence mode="wait">
              {!result ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col gap-5"
                >
                  {/* Bill */}
                  <div>
                    <label className="text-xs font-bold tracking-widest uppercase text-[#22382B]/50 mb-2 block">
                      Monthly Bill (₹)
                    </label>
                    <input
                      type="number"
                      value={bill}
                      onChange={(e) => { setBill(e.target.value); setValidationError('') }}
                      placeholder="e.g. 3000"
                      min="500"
                      className={`w-full bg-white border rounded-lg px-4 py-3 text-sm outline-none transition-colors ${
                        validationError ? 'border-red-400 focus:border-red-500' : 'border-[#1E5939]/20 focus:border-[#1E5939]'
                      }`}
                    />
                    {validationError && (
                      <p className="text-red-500 text-xs mt-1.5 font-medium">{validationError}</p>
                    )}
                  </div>

                  {/* State */}
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

                  {/* Property */}
                  <div>
                    <label className="text-xs font-bold tracking-widest uppercase text-[#22382B]/50 mb-2 block">
                      Property Type
                    </label>
                    <div className="flex gap-2">
                      {['Home', 'Office', 'Farm'].map((type) => (
                        <button
                          key={type}
                          onClick={() => setProperty(type)}
                          className={`flex-1 py-2 rounded-full text-xs font-bold tracking-widest uppercase transition-colors ${
                            property === type
                              ? 'bg-[#1E5939] text-white'
                              : 'bg-white text-[#22382B]/50 hover:bg-[#1E5939]/10'
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={calculate}
                    className="w-full bg-[#1E5939] text-white font-bold text-sm tracking-widest uppercase py-4 rounded-full hover:bg-[#E88A1A] transition-colors"
                  >
                    Calculate ⚡
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col gap-4"
                >
                  <div className="bg-[#1E5939] rounded-xl p-6 text-center">
                    <p className="text-white/50 text-xs uppercase">
                      You Could Save
                    </p>
                    <p className="text-[#E88A1A] font-black text-5xl">
                      ₹{result.yearlySaving.toLocaleString()}
                    </p>
                    <p className="text-white/50 text-xs">per year</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {[
                      ['Monthly Saving', `₹${result.monthlySaving}`],
                      ['System Size', `${result.systemSize} kW`],
                      ['Panels', result.panels],
                      ['Cost', `₹${result.systemCost.toLocaleString()}`],
                      ['Payback', `${result.payback} yrs`],
                      ['CO₂ Saved', `${result.co2} tons/yr`],
                    ].map(([l, v]) => (
                      <div key={l} className="bg-[#E1E6E1] p-3 rounded-xl">
                        <p className="text-[#22382B]/40 text-xs">{l}</p>
                        <p className="text-[#22382B] font-bold">{v}</p>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={reset}
                      className="flex-1 border border-[#1E5939] text-[#1E5939] text-xs font-bold py-3 rounded-full hover:bg-[#1E5939]/10 transition-colors"
                    >
                      Recalculate
                    </button>

                    <a
                      href="#contact"
                      onClick={close}
                      className="flex-1 bg-[#E88A1A] text-white text-xs font-bold py-3 rounded-full text-center hover:bg-[#d17a12] transition-colors"
                    >
                      Get Quote →
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}