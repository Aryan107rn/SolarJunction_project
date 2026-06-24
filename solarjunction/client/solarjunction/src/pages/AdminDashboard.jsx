import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000'

function authHeaders() {
  const token = localStorage.getItem('sj_admin_token')
  return { Authorization: `Bearer ${token}` }
}

// ─── Star Picker ──────────────────────────────────────────────────────────────
function Stars({ value, onChange }) {
  const [hover, setHover] = useState(0)
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map(n => (
        <button
          key={n}
          type="button"
          onClick={() => onChange(n)}
          onMouseEnter={() => setHover(n)}
          onMouseLeave={() => setHover(0)}
          className={`text-2xl transition-transform hover:scale-110 ${
            n <= (hover || value) ? 'text-[#E88A1A]' : 'text-white/20'
          }`}
        >
          ★
        </button>
      ))}
    </div>
  )
}

// ─── Toast ────────────────────────────────────────────────────────────────────
function Toast({ msg, type, onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 3500)
    return () => clearTimeout(t)
  }, [onClose])

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 px-5 py-3 rounded-xl font-bold text-sm shadow-2xl text-white transition-all ${
        type === 'success' ? 'bg-[#1E5939]' : 'bg-red-600'
      }`}
    >
      {type === 'success' ? '✅' : '❌'} {msg}
    </div>
  )
}

// ─── Main Dashboard ───────────────────────────────────────────────────────────
export default function AdminDashboard() {
  const navigate = useNavigate()
  const [tab, setTab] = useState('projects')
  const [toast, setToast] = useState(null)

  // Projects state
  const [projects, setProjects] = useState([])
  const [projLoading, setProjLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [projForm, setProjForm] = useState({
    title: '', location: '', panels: '', capacity: '', saving: '',
  })
  const [projImage, setProjImage] = useState(null)
  const [projImagePreview, setProjImagePreview] = useState(null)

  // Reviews state
  const [pending, setPending] = useState([])
  const [revLoading, setRevLoading] = useState(true)

  const showToast = (msg, type = 'success') => setToast({ msg, type })

  // ── Auth guard ─────────────────────────────────────────────────────────────
  useEffect(() => {
    const token = localStorage.getItem('sj_admin_token')
    if (!token) navigate('/admin/login')
  }, [navigate])

  // ── Load projects ──────────────────────────────────────────────────────────
  const loadProjects = useCallback(async () => {
    setProjLoading(true)
    try {
      const res = await fetch(`${API}/api/projects`)
      const data = await res.json()
      setProjects(Array.isArray(data) ? data : [])
    } catch {
      showToast('Failed to load projects', 'error')
    } finally {
      setProjLoading(false)
    }
  }, [])

  // ── Load pending reviews ────────────────────────────────────────────────────
  const loadPending = useCallback(async () => {
    setRevLoading(true)
    try {
      const res = await fetch(`${API}/api/reviews/pending`, { headers: authHeaders() })
      const data = await res.json()
      setPending(Array.isArray(data) ? data : [])
    } catch {
      showToast('Failed to load reviews', 'error')
    } finally {
      setRevLoading(false)
    }
  }, [])

  useEffect(() => {
    let cancelled = false
    async function run() { if (!cancelled) await loadProjects() }
    run()
    return () => { cancelled = true }
  }, [loadProjects])

  useEffect(() => {
    let cancelled = false
    async function run() { if (!cancelled && tab === 'reviews') await loadPending() }
    run()
    return () => { cancelled = true }
  }, [tab, loadPending])

  // ── Upload project ──────────────────────────────────────────────────────────
  async function handleUploadProject(e) {
    e.preventDefault()
    if (!projImage) return showToast('Please select an image', 'error')

    const fd = new FormData()
    fd.append('image', projImage)
    Object.entries(projForm).forEach(([k, v]) => fd.append(k, v))

    setUploading(true)
    try {
      const res = await fetch(`${API}/api/projects`, {
        method: 'POST',
        headers: authHeaders(),
        body: fd,
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Upload failed')
      showToast('Project uploaded successfully!')
      setProjForm({ title: '', location: '', panels: '', capacity: '', saving: '' })
      setProjImage(null)
      setProjImagePreview(null)
      loadProjects()
    } catch (err) {
      showToast(err.message, 'error')
    } finally {
      setUploading(false)
    }
  }

  // ── Delete project ──────────────────────────────────────────────────────────
  async function handleDeleteProject(id) {
    if (!confirm('Delete this project? This cannot be undone.')) return
    try {
      const res = await fetch(`${API}/api/projects/${id}`, {
        method: 'DELETE',
        headers: authHeaders(),
      })
      if (!res.ok) throw new Error('Delete failed')
      showToast('Project deleted')
      setProjects(p => p.filter(x => x._id !== id))
    } catch (err) {
      showToast(err.message, 'error')
    }
  }

  // ── Approve review ──────────────────────────────────────────────────────────
  async function handleApprove(id) {
    try {
      const res = await fetch(`${API}/api/reviews/${id}/approve`, {
        method: 'PATCH',
        headers: authHeaders(),
      })
      if (!res.ok) throw new Error('Approve failed')
      showToast('Review approved and published!')
      setPending(p => p.filter(r => r._id !== id))
    } catch (err) {
      showToast(err.message, 'error')
    }
  }

  // ── Reject/delete review ────────────────────────────────────────────────────
  async function handleReject(id) {
    if (!confirm('Delete this review permanently?')) return
    try {
      const res = await fetch(`${API}/api/reviews/${id}`, {
        method: 'DELETE',
        headers: authHeaders(),
      })
      if (!res.ok) throw new Error('Delete failed')
      showToast('Review rejected and deleted')
      setPending(p => p.filter(r => r._id !== id))
    } catch (err) {
      showToast(err.message, 'error')
    }
  }

  function handleLogout() {
    localStorage.removeItem('sj_admin_token')
    navigate('/admin/login')
  }

  function handleImageChange(e) {
    const file = e.target.files[0]
    if (!file) return
    setProjImage(file)
    setProjImagePreview(URL.createObjectURL(file))
  }

  // ─────────────────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-[#1A2E20] text-white">

      {/* Navbar */}
      <nav className="bg-[#1E5939]/80 backdrop-blur-md border-b border-white/10 px-6 py-4 flex items-center justify-between sticky top-0 z-40">
        <div>
          <h1 className="font-black uppercase tracking-[.15em] text-[#E88A1A] text-lg leading-none">
            SOLAR<span className="text-white">JUNCTION</span>
          </h1>
          <p className="text-white/40 text-xs tracking-widest uppercase">Admin Dashboard</p>
        </div>
        <div className="flex items-center gap-4">
          <a href="/" target="_blank" className="text-white/50 text-xs hover:text-white transition-colors">
            ↗ View Site
          </a>
          <button
            id="admin-logout-btn"
            onClick={handleLogout}
            className="text-xs font-bold tracking-widest uppercase px-4 py-2 rounded-full bg-white/10 hover:bg-red-500/30 transition-colors"
          >
            Logout
          </button>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-10">

        {/* Tabs */}
        <div className="flex gap-2 mb-10">
          {[
            { key: 'projects', label: '📸 Projects' },
            { key: 'reviews', label: '⭐ Reviews' },
          ].map(({ key, label }) => (
            <button
              key={key}
              id={`admin-tab-${key}`}
              onClick={() => setTab(key)}
              className={`text-sm font-black uppercase tracking-widest px-6 py-2.5 rounded-full transition-colors ${
                tab === key
                  ? 'bg-[#E88A1A] text-white'
                  : 'bg-white/10 text-white/50 hover:bg-white/20'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* ───── PROJECTS TAB ─────────────────────────────────────────────── */}
        {tab === 'projects' && (
          <div>
            {/* Upload Form */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-10">
              <h2 className="font-black uppercase tracking-wider text-[#E88A1A] text-lg mb-6">
                Upload New Project
              </h2>

              <form onSubmit={handleUploadProject} className="space-y-5">
                {/* Image upload */}
                <div>
                  <label className="text-white/60 text-xs font-bold tracking-widest uppercase block mb-2">
                    Project Photo *
                  </label>
                  <div
                    className="relative border-2 border-dashed border-white/20 rounded-xl p-6 flex flex-col items-center justify-center gap-3 cursor-pointer hover:border-[#E88A1A]/50 transition-colors"
                    onClick={() => document.getElementById('proj-image-input').click()}
                  >
                    {projImagePreview ? (
                      <img
                        src={projImagePreview}
                        alt="preview"
                        className="w-full max-h-48 object-cover rounded-lg"
                      />
                    ) : (
                      <>
                        <span className="text-4xl">📷</span>
                        <p className="text-white/40 text-sm">Click to select image (max 10MB)</p>
                      </>
                    )}
                    <input
                      id="proj-image-input"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageChange}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { key: 'title', label: 'Project Title *', placeholder: 'e.g. Residential Rooftop, Nagpur' },
                    { key: 'location', label: 'Location *', placeholder: 'e.g. Nagpur, Maharashtra' },
                    { key: 'panels', label: 'No. of Panels *', placeholder: 'e.g. 12', type: 'number' },
                    { key: 'capacity', label: 'Capacity *', placeholder: 'e.g. 4kW' },
                    { key: 'saving', label: 'Monthly Saving *', placeholder: 'e.g. ₹3,200/month' },
                  ].map(({ key, label, placeholder, type }) => (
                    <div key={key} className={key === 'title' || key === 'saving' ? 'md:col-span-1' : ''}>
                      <label className="text-white/60 text-xs font-bold tracking-widest uppercase block mb-1.5">
                        {label}
                      </label>
                      <input
                        id={`proj-${key}`}
                        type={type || 'text'}
                        value={projForm[key]}
                        onChange={e => setProjForm(p => ({ ...p, [key]: e.target.value }))}
                        required
                        placeholder={placeholder}
                        min={type === 'number' ? 1 : undefined}
                        className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/30 outline-none focus:border-[#E88A1A] transition-colors text-sm"
                      />
                    </div>
                  ))}
                </div>

                <button
                  id="proj-upload-btn"
                  type="submit"
                  disabled={uploading}
                  className="bg-[#E88A1A] hover:bg-[#d07a10] text-white font-black uppercase tracking-widest text-sm px-8 py-3 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {uploading ? 'Uploading…' : '☁️ Upload Project'}
                </button>
              </form>
            </div>

            {/* Existing Projects Grid */}
            <h2 className="font-black uppercase tracking-wider text-white/80 text-lg mb-6">
              Existing Projects ({projects.length})
            </h2>

            {projLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="bg-white/5 border border-white/10 rounded-xl h-64 animate-pulse" />
                ))}
              </div>
            ) : projects.length === 0 ? (
              <div className="text-center py-16 text-white/30">
                <div className="text-5xl mb-4">☀️</div>
                <p>No projects uploaded yet. Add your first one above!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {projects.map(proj => (
                  <div
                    key={proj._id}
                    className="bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-[#E88A1A]/30 transition-colors"
                  >
                    <img
                      src={proj.imageUrl}
                      alt={proj.title}
                      className="w-full h-40 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="font-black uppercase text-white text-sm mb-0.5">{proj.title}</h3>
                      <p className="text-[#E88A1A] text-xs font-bold tracking-widest uppercase mb-3">
                        📍 {proj.location}
                      </p>
                      <div className="flex flex-col gap-1 text-xs text-white/40 mb-4">
                        <span>🔲 {proj.panels} Panels</span>
                        <span>⚡ {proj.capacity}</span>
                        <span>💰 {proj.saving}</span>
                      </div>
                      <button
                        onClick={() => handleDeleteProject(proj._id)}
                        className="w-full text-xs font-bold uppercase tracking-widest bg-red-500/20 hover:bg-red-500/40 text-red-300 py-2 rounded-lg transition-colors"
                      >
                        🗑 Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ───── REVIEWS TAB ──────────────────────────────────────────────── */}
        {tab === 'reviews' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-black uppercase tracking-wider text-white/80 text-lg">
                Pending Reviews ({pending.length})
              </h2>
              <button
                onClick={loadPending}
                className="text-xs font-bold tracking-widest uppercase px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              >
                ↻ Refresh
              </button>
            </div>

            {revLoading ? (
              <div className="space-y-4">
                {[1, 2].map(i => (
                  <div key={i} className="bg-white/5 border border-white/10 rounded-xl h-36 animate-pulse" />
                ))}
              </div>
            ) : pending.length === 0 ? (
              <div className="text-center py-16 text-white/30">
                <div className="text-5xl mb-4">🎉</div>
                <p>No pending reviews — you're all caught up!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {pending.map(rev => (
                  <div
                    key={rev._id}
                    className="bg-white/5 border border-white/10 rounded-xl p-6"
                  >
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="flex gap-0.5">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <span key={i} className={i < rev.rating ? 'text-[#E88A1A]' : 'text-white/20'}>★</span>
                            ))}
                          </div>
                          <span className="text-white/40 text-xs">
                            {new Date(rev.createdAt).toLocaleDateString('en-IN')}
                          </span>
                        </div>
                        <p className="text-white/70 text-sm leading-relaxed mb-3">"{rev.review}"</p>
                        <div>
                          <p className="font-black uppercase text-white text-xs">{rev.name}</p>
                          {rev.location && (
                            <p className="text-[#E88A1A] text-xs tracking-widest uppercase">📍 {rev.location}</p>
                          )}
                        </div>
                      </div>

                      <div className="flex gap-2 shrink-0">
                        <button
                          onClick={() => handleApprove(rev._id)}
                          className="text-xs font-black uppercase tracking-widest bg-[#1E5939] hover:bg-[#1E5939]/80 text-white px-4 py-2 rounded-lg transition-colors"
                        >
                          ✅ Approve
                        </button>
                        <button
                          onClick={() => handleReject(rev._id)}
                          className="text-xs font-black uppercase tracking-widest bg-red-500/20 hover:bg-red-500/40 text-red-300 px-4 py-2 rounded-lg transition-colors"
                        >
                          🗑 Reject
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>

      {toast && (
        <Toast msg={toast.msg} type={toast.type} onClose={() => setToast(null)} />
      )}
    </div>
  )
}
