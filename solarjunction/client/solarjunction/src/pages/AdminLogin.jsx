import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000'

export default function AdminLogin() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await fetch(`${API}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Login failed')
      localStorage.setItem('sj_admin_token', data.token)
      navigate('/admin/dashboard')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#1E5939] flex items-center justify-center px-4">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#E88A1A]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-black uppercase tracking-[.15em] text-[#E88A1A]">
            SOLAR<span className="text-white">JUNCTION</span>
          </h1>
          <p className="text-white/50 text-xs tracking-[.25em] uppercase mt-2">
            Admin Portal
          </p>
        </div>

        {/* Card */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 shadow-2xl">
          <h2 className="text-white font-black text-xl uppercase tracking-wider mb-6">
            Sign In
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="text-white/70 text-xs font-bold tracking-widest uppercase block mb-1.5">
                Username
              </label>
              <input
                id="admin-username"
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                required
                autoComplete="username"
                placeholder="admin"
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/30 outline-none focus:border-[#E88A1A] transition-colors text-sm"
              />
            </div>

            <div>
              <label className="text-white/70 text-xs font-bold tracking-widest uppercase block mb-1.5">
                Password
              </label>
              <input
                id="admin-password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                placeholder="••••••••"
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/30 outline-none focus:border-[#E88A1A] transition-colors text-sm"
              />
            </div>

            {error && (
              <div className="bg-red-500/20 border border-red-400/30 text-red-300 text-sm px-4 py-3 rounded-xl">
                ❌ {error}
              </div>
            )}

            <button
              id="admin-login-btn"
              type="submit"
              disabled={loading}
              className="mt-2 w-full bg-[#E88A1A] hover:bg-[#d07a10] text-white font-black uppercase tracking-widest text-sm py-3 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing in…' : 'Sign In →'}
            </button>
          </form>
        </div>

        <p className="text-center text-white/30 text-xs mt-6">
          <a href="/" className="hover:text-white/60 transition-colors">← Back to website</a>
        </p>
      </div>
    </div>
  )
}
