import { useState, useEffect, useRef } from 'react'
import {
  LayoutDashboard, Calendar, Users, Image, Plus, Trash2,
  Edit3, Check, X, Loader2, Eye, EyeOff, Lock, Database,
  ChevronDown, Upload, AlertCircle
} from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import {
  getEvents, createEvent, updateEvent, deleteEvent,
  getTeamMembers, createTeamMember, updateTeamMember, deleteTeamMember,
  getGalleryImages, addGalleryImage,
} from '../utils/supabase'

// ── Auth Gate ────────────────────────────────────────────────────────────────
function AuthGate({ onAuth }) {
  const { isDark } = useTheme()
  const [password, setPassword] = useState('')
  const [show, setShow] = useState(false)
  const [error, setError] = useState('')

  const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD

  const handleLogin = (e) => {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      onAuth(true)
      sessionStorage.setItem('datum_admin', '1')
    } else {
      setError('Incorrect password. Please try again.')
      setPassword('')
    }
  }

  return (
    <div className={`min-h-screen flex items-center justify-center ${isDark ? 'bg-dark-900' : 'bg-slate-50'}`}>
      <div className="w-full max-w-md px-4">
        <div className={`rounded-3xl p-8 md:p-10 ${isDark ? 'bg-dark-500/60 border border-white/5' : 'bg-white border border-slate-200 shadow-xl'}`}>
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-violet flex items-center justify-center shadow-lg shadow-primary-500/30">
              <Lock size={28} className="text-white" />
            </div>
          </div>
          <h1 className={`font-display font-bold text-2xl text-center mb-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>Admin Portal</h1>
          <p className={`text-sm text-center mb-8 ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>Datum Data Science Club</p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="relative">
              <input
                type={show ? 'text' : 'password'}
                value={password}
                onChange={e => { setPassword(e.target.value); setError('') }}
                placeholder="Enter admin password"
                className={`w-full px-4 py-3 rounded-xl font-body text-sm pr-12 outline-none transition-all ${isDark
                  ? 'bg-dark-700 border border-white/10 text-white placeholder-gray-600 focus:border-primary-500'
                  : 'bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:border-primary-400 focus:ring-2 focus:ring-primary-400/20'
                }`}
              />
              <button type="button" onClick={() => setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                {show ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            {error && (
              <div className="flex items-center gap-2 text-rose-400 text-xs px-1">
                <AlertCircle size={14} /> {error}
              </div>
            )}

            <button type="submit" className="w-full btn-primary justify-center py-3">
              Enter Portal
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

// ── Notification ─────────────────────────────────────────────────────────────
function Toast({ msg, type, onClose }) {
  useEffect(() => { const t = setTimeout(onClose, 3000); return () => clearTimeout(t) }, [])
  return (
    <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3 rounded-xl shadow-xl font-body text-sm font-medium transition-all ${type === 'success' ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white'}`}>
      {type === 'success' ? <Check size={16} /> : <AlertCircle size={16} />}
      {msg}
    </div>
  )
}

// ── Input / Select helpers ────────────────────────────────────────────────────
function Field({ label, children }) {
  return (
    <div>
      <label className="block text-xs font-mono text-gray-400 mb-1.5">{label}</label>
      {children}
    </div>
  )
}

function Input({ isDark, ...props }) {
  return (
    <input
      {...props}
      className={`w-full px-3 py-2.5 rounded-xl text-sm outline-none transition-all ${isDark
        ? 'bg-dark-700 border border-white/10 text-white placeholder-gray-600 focus:border-primary-500'
        : 'bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:border-primary-400'
      }`}
    />
  )
}

function Textarea({ isDark, ...props }) {
  return (
    <textarea
      {...props}
      className={`w-full px-3 py-2.5 rounded-xl text-sm outline-none transition-all resize-none ${isDark
        ? 'bg-dark-700 border border-white/10 text-white placeholder-gray-600 focus:border-primary-500'
        : 'bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:border-primary-400'
      }`}
    />
  )
}

function Select({ isDark, children, ...props }) {
  return (
    <select
      {...props}
      className={`w-full px-3 py-2.5 rounded-xl text-sm outline-none transition-all ${isDark
        ? 'bg-dark-700 border border-white/10 text-white focus:border-primary-500'
        : 'bg-slate-50 border border-slate-200 text-slate-900 focus:border-primary-400'
      }`}
    >
      {children}
    </select>
  )
}

// ── Cloudinary upload helper ──────────────────────────────────────────────────
const ACCEPTED = 'image/png,image/jpeg,image/jpg,image/webp,image/heic,image/heif,image/gif,image/avif'

async function uploadToCloudinary(file, folder = 'datum') {
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
  const preset    = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || 'datum_unsigned'
  if (!cloudName) throw new Error('VITE_CLOUDINARY_CLOUD_NAME not set in .env')

  const fd = new FormData()
  fd.append('file', file)
  fd.append('upload_preset', preset)
  fd.append('folder', folder)

  const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
    method: 'POST', body: fd,
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err?.error?.message || 'Cloudinary upload failed')
  }
  const data = await res.json()
  return data.secure_url
}

// ── Reusable image uploader ───────────────────────────────────────────────────
function ImageUploader({ isDark, value, onChange, folder = 'datum', label = 'Cover Image' }) {
  const [preview, setPreview] = useState(value || null)
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState('')
  const inputRef = useRef(null)

  // If parent passes an existing URL (edit mode), show it
  useEffect(() => { if (value && !preview) setPreview(value) }, [value])

  const handleFile = async (file) => {
    if (!file) return
    if (!file.type.startsWith('image/')) { setError('Please select an image file'); return }
    if (file.size > 15 * 1024 * 1024) { setError('File too large — max 15 MB'); return }
    setError('')
    setPreview(URL.createObjectURL(file))
    setUploading(true)
    setProgress(20)
    try {
      setProgress(50)
      const url = await uploadToCloudinary(file, folder)
      setProgress(100)
      onChange(url)
      setPreview(url)
    } catch (e) {
      setError(e.message)
      setPreview(null)
      onChange('')
    } finally {
      setUploading(false)
      setTimeout(() => setProgress(0), 600)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    handleFile(file)
  }

  return (
    <div>
      <label className="block text-xs font-mono text-gray-400 mb-1.5">{label}</label>

      <div
        onDrop={handleDrop}
        onDragOver={e => e.preventDefault()}
        onClick={() => !uploading && inputRef.current?.click()}
        className={`relative rounded-xl border-2 border-dashed cursor-pointer overflow-hidden transition-all duration-200
          ${preview ? 'border-transparent' : isDark ? 'border-white/15 hover:border-primary-500/50' : 'border-slate-300 hover:border-primary-400'}
          ${uploading ? 'cursor-wait' : ''}`}
      >
        <input
          ref={inputRef}
          type="file"
          accept={ACCEPTED}
          className="hidden"
          onChange={e => handleFile(e.target.files[0])}
        />

        {preview ? (
          /* Preview state */
          <div className="relative h-36">
            <img src={preview} alt="preview" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
              <Upload size={20} className="text-white" />
              <span className="text-white text-xs font-medium">Click to change image</span>
            </div>
            {uploading && (
              <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                <div className="text-center">
                  <Loader2 size={24} className="animate-spin text-primary-400 mx-auto mb-2" />
                  <span className="text-white text-xs">Uploading {progress}%…</span>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Empty state */
          <div className={`flex flex-col items-center justify-center gap-2 py-8 px-4 ${uploading ? 'opacity-60' : ''}`}>
            {uploading ? (
              <>
                <Loader2 size={28} className="animate-spin text-primary-400" />
                <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-slate-600'}`}>Uploading {progress}%…</span>
              </>
            ) : (
              <>
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${isDark ? 'bg-white/5' : 'bg-slate-100'}`}>
                  <Upload size={20} className="text-primary-400" />
                </div>
                <div className="text-center">
                  <p className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-slate-600'}`}>
                    Drop image here or <span className="text-primary-400">browse</span>
                  </p>
                  <p className={`text-xs mt-0.5 ${isDark ? 'text-gray-600' : 'text-slate-400'}`}>
                    PNG, JPG, JPEG, WEBP, HEIC, GIF · max 15 MB
                  </p>
                </div>
              </>
            )}
          </div>
        )}

        {/* Progress bar */}
        {uploading && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/20">
            <div className="h-full bg-primary-500 transition-all duration-300" style={{ width: `${progress}%` }} />
          </div>
        )}
      </div>

      {error && (
        <p className="flex items-center gap-1.5 text-rose-400 text-xs mt-1.5">
          <AlertCircle size={12} /> {error}
        </p>
      )}
    </div>
  )
}

// ── Events Tab ────────────────────────────────────────────────────────────────
function EventsTab({ isDark }) {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [saving, setSaving] = useState(false)
  const [editId, setEditId] = useState(null)
  const [toast, setToast] = useState(null)
  const [form, setForm] = useState({
    title: '', description: '', date: '', time: '', location: '',
    category: 'Workshop', image: '', register_link: '', is_upcoming: true,
    prize_pool: '', fee_gla: '', fee_other: '',
  })

  const loadEvents = async () => {
    setLoading(true)
    const { data } = await getEvents()
    setEvents(data || [])
    setLoading(false)
  }

  useEffect(() => { loadEvents() }, [])

  const resetForm = () => {
    setForm({ title: '', description: '', date: '', time: '', location: '', category: 'Workshop', image: '', register_link: '', is_upcoming: true, prize_pool: '', fee_gla: '', fee_other: '' })
    setEditId(null)
    setShowForm(false)
  }

  const handleEdit = (event) => {
    setForm({ ...event })
    setEditId(event.id)
    setShowForm(true)
  }

  const handleSubmit = async () => {
    if (!form.title || !form.date) return
    setSaving(true)
    const payload = { ...form }
    let error
    if (editId) {
      ({ error } = await updateEvent(editId, payload))
    } else {
      ({ error } = await createEvent(payload))
    }
    setSaving(false)
    if (error) {
      setToast({ msg: 'Error saving event: ' + error.message, type: 'error' })
    } else {
      setToast({ msg: editId ? 'Event updated!' : 'Event added!', type: 'success' })
      resetForm()
      loadEvents()
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this event?')) return
    const { error } = await deleteEvent(id)
    if (error) setToast({ msg: 'Error deleting event', type: 'error' })
    else { setToast({ msg: 'Event deleted', type: 'success' }); loadEvents() }
  }

  const card = isDark ? 'bg-dark-500/60 border border-white/5' : 'bg-white border border-slate-200'
  const text = isDark ? 'text-white' : 'text-slate-900'
  const sub = isDark ? 'text-gray-400' : 'text-slate-500'

  return (
    <div>
      {toast && <Toast msg={toast.msg} type={toast.type} onClose={() => setToast(null)} />}

      <div className="flex items-center justify-between mb-6">
        <h2 className={`font-display font-bold text-2xl ${text}`}>Manage Events</h2>
        <button onClick={() => { setShowForm(!showForm); setEditId(null) }} className="btn-primary gap-2">
          <Plus size={16} /> Add Event
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className={`rounded-2xl p-6 mb-8 ${card}`}>
          <h3 className={`font-display font-bold text-lg mb-5 ${text}`}>{editId ? 'Edit Event' : 'New Event'}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Title *">
              <Input isDark={isDark} value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="e.g. DataThon 3.0" />
            </Field>
            <Field label="Category">
              <Select isDark={isDark} value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
                {['Workshop', 'Competition', 'Talk', 'Series', 'Hackathon', 'Seminar', 'Other'].map(c => <option key={c}>{c}</option>)}
              </Select>
            </Field>
            <Field label="Date *">
              <Input isDark={isDark} type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} />
            </Field>
            <Field label="Time">
              <Input isDark={isDark} value={form.time} onChange={e => setForm({ ...form, time: e.target.value })} placeholder="e.g. 10:00 AM – 5:00 PM" />
            </Field>
            <Field label="Location">
              <Input isDark={isDark} value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} placeholder="e.g. Main Auditorium" />
            </Field>
            <Field label="Registration Link">
              <Input isDark={isDark} value={form.register_link} onChange={e => setForm({ ...form, register_link: e.target.value })} placeholder="https://forms.gle/..." />
            </Field>
            <ImageUploader
              isDark={isDark}
              value={form.image}
              onChange={url => setForm({ ...form, image: url })}
              folder="datum/events"
              label="Cover Image"
            />
            <Field label="Status">
              <Select isDark={isDark} value={form.is_upcoming ? 'upcoming' : 'past'} onChange={e => setForm({ ...form, is_upcoming: e.target.value === 'upcoming' })}>
                <option value="upcoming">Upcoming</option>
                <option value="past">Past</option>
              </Select>
            </Field>
            <div className="md:col-span-2">
              <Field label="Description">
                <Textarea isDark={isDark} rows={3} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Tell people what this event is about..." />
              </Field>
            </div>

            {/* Prize Pool & Fees */}
            <div className="md:col-span-2">
              <div className={`rounded-xl p-4 border ${isDark ? 'border-white/5 bg-dark-700/50' : 'border-slate-200 bg-slate-50'}`}>
                <p className={`text-xs font-mono uppercase tracking-wider mb-3 ${isDark ? 'text-gray-500' : 'text-slate-400'}`}>💰 Fees & Prize Pool</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Field label="Prize Pool">
                    <Input
                      isDark={isDark}
                      value={form.prize_pool}
                      onChange={e => setForm({ ...form, prize_pool: e.target.value })}
                      placeholder="e.g. ₹5,00,000"
                    />
                  </Field>
                  <Field label="Entry Fee — GLA Students">
                    <Input
                      isDark={isDark}
                      value={form.fee_gla}
                      onChange={e => setForm({ ...form, fee_gla: e.target.value })}
                      placeholder="e.g. ₹49 or Free"
                    />
                  </Field>
                  <Field label="Entry Fee — Other Institutions">
                    <Input
                      isDark={isDark}
                      value={form.fee_other}
                      onChange={e => setForm({ ...form, fee_other: e.target.value })}
                      placeholder="e.g. ₹99"
                    />
                  </Field>
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-3 mt-5">
            <button onClick={handleSubmit} disabled={saving} className="btn-primary">
              {saving ? <Loader2 size={16} className="animate-spin" /> : <Check size={16} />}
              {editId ? 'Update Event' : 'Save Event'}
            </button>
            <button onClick={resetForm} className="btn-outline">
              <X size={16} /> Cancel
            </button>
          </div>
        </div>
      )}

      {/* Events list */}
      {loading ? (
        <div className="flex justify-center py-12"><Loader2 size={28} className="animate-spin text-primary-400" /></div>
      ) : events.length === 0 ? (
        <div className={`rounded-2xl p-10 text-center ${card}`}>
          <p className={sub}>No events yet. Add your first event!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {events.map(event => (
            <div key={event.id} className={`flex items-center gap-4 p-4 rounded-2xl ${card}`}>
              {event.image && (
                <img src={event.image} alt={event.title} className="w-14 h-14 rounded-xl object-cover flex-shrink-0" />
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className={`font-display font-semibold text-sm ${text}`}>{event.title}</p>
                  <span className={`tag-chip text-xs px-2 py-0.5 ${new Date(event.date) >= new Date() ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' : 'bg-gray-500/10 text-gray-400 border border-gray-500/30'}`}>
                    {new Date(event.date) >= new Date() ? 'Upcoming' : 'Past'}
                  </span>
                  <span className="tag-chip text-xs px-2 py-0.5 bg-primary-500/10 text-primary-400 border border-primary-500/30">{event.category}</span>
                </div>
                <p className={`text-xs mt-0.5 ${sub}`}>{event.date} {event.location && `· ${event.location}`}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleEdit(event)} className={`p-2 rounded-lg transition-colors ${isDark ? 'hover:bg-white/10 text-gray-400 hover:text-white' : 'hover:bg-slate-100 text-slate-500'}`}>
                  <Edit3 size={16} />
                </button>
                <button onClick={() => handleDelete(event.id)} className="p-2 rounded-lg text-rose-400 hover:bg-rose-500/10 transition-colors">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ── Team Tab ──────────────────────────────────────────────────────────────────
function TeamTab({ isDark }) {
  const [members, setMembers] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [saving, setSaving] = useState(false)
  const [editId, setEditId] = useState(null)
  const [toast, setToast] = useState(null)
  const [form, setForm] = useState({
    name: '', role: '', year: '', team: 'Tech Team',
    avatar: '', color: 'from-violet-500 to-purple-600',
    linkedin: '', github: '', order_index: 0,
    bio: '', skills: [],
  })

  const loadMembers = async () => {
    setLoading(true)
    const { data } = await getTeamMembers()
    setMembers(data || [])
    setLoading(false)
  }

  useEffect(() => { loadMembers() }, [])

  const resetForm = () => {
    setForm({ name: '', role: '', year: '', team: 'Tech Team', avatar: '', color: 'from-violet-500 to-purple-600', linkedin: '', github: '', order_index: 0, bio: '', skills: [] })
    setEditId(null)
    setShowForm(false)
  }

  const handleEdit = (m) => {
    setForm({
      ...m,
      bio: m.bio || '',
      skills: Array.isArray(m.skills) ? m.skills : [],
    })
    setEditId(m.id)
    setShowForm(true)
  }

  const handleSubmit = async () => {
    if (!form.name || !form.role) return
    setSaving(true)
    let error
    if (editId) ({ error } = await updateTeamMember(editId, form))
    else ({ error } = await createTeamMember(form))
    setSaving(false)
    if (error) setToast({ msg: 'Error saving member: ' + error.message, type: 'error' })
    else { setToast({ msg: editId ? 'Member updated!' : 'Member added!', type: 'success' }); resetForm(); loadMembers() }
  }

  const handleDelete = async (id) => {
    if (!confirm('Remove this team member?')) return
    const { error } = await deleteTeamMember(id)
    if (error) setToast({ msg: 'Error deleting member', type: 'error' })
    else { setToast({ msg: 'Member removed', type: 'success' }); loadMembers() }
  }

  const card = isDark ? 'bg-dark-500/60 border border-white/5' : 'bg-white border border-slate-200'
  const text = isDark ? 'text-white' : 'text-slate-900'
  const sub = isDark ? 'text-gray-400' : 'text-slate-500'

  const TEAMS_LIST = ['Leadership', 'Tech Team', 'Event Management', 'Media & Video', 'Design Team', 'PR Team', 'Datum Alumni Corporate Connect']
  const COLORS = [
    'from-violet-500 to-purple-600', 'from-indigo-500 to-blue-600', 'from-cyan-500 to-blue-600',
    'from-emerald-500 to-teal-600', 'from-pink-500 to-rose-600', 'from-amber-500 to-orange-600',
    'from-fuchsia-500 to-violet-600',
  ]
  const SKILLS_LIST = [
    'Web Development', 'Backend Development', 'Frontend Development', 'UI/UX Design',
    'Graphic Design', 'Video Editing', 'Content Writing', 'Public Speaking',
    'AI / Machine Learning', 'App Development', 'Marketing', 'Other',
  ]

  const toggleSkill = (skill) => {
    setForm(f => ({
      ...f,
      skills: f.skills?.includes(skill)
        ? f.skills.filter(s => s !== skill)
        : [...(f.skills || []), skill],
    }))
  }

  // Group by team
  const grouped = TEAMS_LIST.reduce((acc, t) => {
    const m = members.filter(m => m.team === t)
    if (m.length) acc[t] = m
    return acc
  }, {})

  return (
    <div>
      {toast && <Toast msg={toast.msg} type={toast.type} onClose={() => setToast(null)} />}

      <div className="flex items-center justify-between mb-6">
        <h2 className={`font-display font-bold text-2xl ${text}`}>Manage Team</h2>
        <button onClick={() => setShowForm(!showForm)} className="btn-primary gap-2">
          <Plus size={16} /> Add Member
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className={`rounded-2xl p-6 mb-8 ${card}`}>
          <h3 className={`font-display font-bold text-lg mb-5 ${text}`}>{editId ? 'Edit Member' : 'New Member'}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Full Name *">
              <Input isDark={isDark} value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="e.g. Arjun Kapoor" />
            </Field>
            <Field label="Role *">
              <Input isDark={isDark} value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} placeholder="e.g. Tech Head" />
            </Field>
            <Field label="Year / Branch">
              <Input isDark={isDark} value={form.year} onChange={e => setForm({ ...form, year: e.target.value })} placeholder="e.g. 3rd Year, CSE" />
            </Field>
            <Field label="Team">
              <Select isDark={isDark} value={form.team} onChange={e => setForm({ ...form, team: e.target.value })}>
                {TEAMS_LIST.map(t => <option key={t}>{t}</option>)}
              </Select>
            </Field>
            <Field label="Avatar Initials">
              <Input isDark={isDark} value={form.avatar} onChange={e => setForm({ ...form, avatar: e.target.value })} placeholder="e.g. AK" maxLength={3} />
            </Field>
            <ImageUploader
              isDark={isDark}
              value={form.photo_url}
              onChange={url => setForm({ ...form, photo_url: url })}
              folder="datum/team"
              label="Photo"
            />
            <Field label="LinkedIn URL">
              <Input isDark={isDark} value={form.linkedin} onChange={e => setForm({ ...form, linkedin: e.target.value })} placeholder="https://linkedin.com/in/..." />
            </Field>
            <Field label="GitHub URL">
              <Input isDark={isDark} value={form.github} onChange={e => setForm({ ...form, github: e.target.value })} placeholder="https://github.com/..." />
            </Field>
            <Field label="Display Order">
              <Input isDark={isDark} type="number" value={form.order_index} onChange={e => setForm({ ...form, order_index: parseInt(e.target.value) })} />
            </Field>
            <Field label="Card Color">
              <Select isDark={isDark} value={form.color} onChange={e => setForm({ ...form, color: e.target.value })}>
                {COLORS.map(c => <option key={c} value={c}>{c}</option>)}
              </Select>
            </Field>
            <div className="md:col-span-2">
              <Field label="Short Bio">
                <Textarea
                  isDark={isDark}
                  rows={3}
                  value={form.bio || ''}
                  onChange={e => setForm({ ...form, bio: e.target.value })}
                  placeholder="A short sentence or two about this member — their passion, what they work on, fun fact…"
                />
              </Field>
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-mono text-gray-400 mb-2">Skills</label>
              <div className="flex flex-wrap gap-2">
                {SKILLS_LIST.map(skill => {
                  const selected = form.skills?.includes(skill)
                  return (
                    <button
                      key={skill}
                      type="button"
                      onClick={() => toggleSkill(skill)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-150 border
                        ${selected
                          ? 'bg-primary-500 text-white border-primary-500 shadow-sm shadow-primary-500/30'
                          : isDark
                            ? 'bg-dark-700 text-gray-400 border-white/10 hover:border-primary-500/50 hover:text-primary-400'
                            : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-primary-400 hover:text-primary-600'
                        }`}
                    >
                      {selected ? '✓ ' : ''}{skill}
                    </button>
                  )
                })}
              </div>
              {form.skills?.length > 0 && (
                <p className={`text-xs mt-2 ${isDark ? 'text-gray-500' : 'text-slate-400'}`}>
                  {form.skills.length} skill{form.skills.length !== 1 ? 's' : ''} selected
                </p>
              )}
            </div>
          </div>
          <div className="flex gap-3 mt-5">
            <button onClick={handleSubmit} disabled={saving} className="btn-primary">
              {saving ? <Loader2 size={16} className="animate-spin" /> : <Check size={16} />}
              {editId ? 'Update Member' : 'Save Member'}
            </button>
            <button onClick={resetForm} className="btn-outline"><X size={16} /> Cancel</button>
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center py-12"><Loader2 size={28} className="animate-spin text-primary-400" /></div>
      ) : members.length === 0 ? (
        <div className={`rounded-2xl p-10 text-center ${card}`}>
          <p className={sub}>No members yet. Add your first team member!</p>
        </div>
      ) : (
        <div className="space-y-8">
          {Object.entries(grouped).map(([teamName, teamMembers]) => (
            <div key={teamName}>
              <h3 className={`font-display font-semibold text-base mb-3 ${sub}`}>{teamName}</h3>
              <div className="space-y-2">
                {teamMembers.map(m => (
                  <div key={m.id} className={`flex items-center gap-4 p-4 rounded-xl ${card}`}>
                    <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${m.color} flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}>
                      {m.avatar || m.name?.[0]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`font-semibold text-sm ${text}`}>{m.name}</p>
                      <p className={`text-xs ${sub}`}>{m.role} · {m.year}</p>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => handleEdit(m)} className={`p-2 rounded-lg transition-colors ${isDark ? 'hover:bg-white/10 text-gray-400 hover:text-white' : 'hover:bg-slate-100 text-slate-500'}`}>
                        <Edit3 size={15} />
                      </button>
                      <button onClick={() => handleDelete(m.id)} className="p-2 rounded-lg text-rose-400 hover:bg-rose-500/10 transition-colors">
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ── Dashboard Stats ───────────────────────────────────────────────────────────
function DashboardTab({ isDark, setActiveTab }) {
  const text = isDark ? 'text-white' : 'text-slate-900'
  const sub = isDark ? 'text-gray-400' : 'text-slate-500'
  const card = isDark ? 'bg-dark-500/60 border border-white/5' : 'bg-white border border-slate-200'

  const quickActions = [
    { label: 'Add Event', icon: Calendar, tab: 'events', color: 'from-violet-500 to-purple-600' },
    { label: 'Add Member', icon: Users, tab: 'team', color: 'from-blue-500 to-cyan-600' },
    { label: 'Gallery', icon: Image, tab: 'gallery', color: 'from-pink-500 to-rose-600' },
  ]

  return (
    <div>
      <h2 className={`font-display font-bold text-2xl mb-8 ${text}`}>Dashboard Overview</h2>

      {/* Quick actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        {quickActions.map(a => {
          const Icon = a.icon
          return (
            <button
              key={a.label}
              onClick={() => setActiveTab(a.tab)}
              className={`p-6 rounded-2xl text-left transition-all hover:-translate-y-1 ${card} group`}
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${a.color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                <Icon size={22} className="text-white" />
              </div>
              <p className={`font-display font-bold text-base ${text}`}>{a.label}</p>
              <p className={`text-sm mt-1 ${sub}`}>Click to manage</p>
            </button>
          )
        })}
      </div>

    </div>
  )
}


// ── Gallery Tab ───────────────────────────────────────────────────────────────
function GalleryTab({ isDark }) {
  const [images, setImages]   = useState([])
  const [loading, setLoading] = useState(true)
  const [uploadedUrl, setUploadedUrl] = useState('')
  const [form, setForm]       = useState({ caption: '', tag: 'Event' })
  const [saving, setSaving]   = useState(false)
  const [toast, setToast]     = useState(null)

  const loadImages = async () => {
    setLoading(true)
    const { data } = await getGalleryImages()
    setImages(data || [])
    setLoading(false)
  }

  useEffect(() => { loadImages() }, [])

  const handleAdd = async () => {
    if (!uploadedUrl) { setToast({ msg: 'Please upload an image first', type: 'error' }); return }
    setSaving(true)
    const { error } = await addGalleryImage({ src: uploadedUrl, caption: form.caption, tag: form.tag })
    setSaving(false)
    if (error) { setToast({ msg: 'Error saving image: ' + error.message, type: 'error' }); return }
    setToast({ msg: 'Image added to gallery!', type: 'success' })
    setUploadedUrl('')
    setForm({ caption: '', tag: 'Event' })
    loadImages()
  }

  const card = isDark ? 'bg-dark-500/60 border border-white/5' : 'bg-white border border-slate-200'
  const text = isDark ? 'text-white' : 'text-slate-900'
  const sub  = isDark ? 'text-gray-400' : 'text-slate-500'

  return (
    <div>
      {toast && <Toast msg={toast.msg} type={toast.type} onClose={() => setToast(null)} />}

      <h2 className={`font-display font-bold text-2xl mb-6 ${text}`}>Manage Gallery</h2>

      <div className={`rounded-2xl p-6 mb-8 ${card}`}>
        <h3 className={`font-display font-semibold text-base mb-5 ${text}`}>Upload New Image</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Image uploader — uploads to Cloudinary on file select */}
          <ImageUploader
            isDark={isDark}
            value={uploadedUrl}
            onChange={url => setUploadedUrl(url)}
            folder="datum/gallery"
            label="Photo (PNG, JPG, JPEG, WEBP, HEIC, GIF)"
          />

          {/* Meta fields + save */}
          <div className="space-y-4">
            <Field label="Caption">
              <Textarea
                isDark={isDark}
                rows={3}
                value={form.caption}
                onChange={e => setForm({ ...form, caption: e.target.value })}
                placeholder="Describe the photo…"
              />
            </Field>
            <Field label="Tag">
              <Select
                isDark={isDark}
                value={form.tag}
                onChange={e => setForm({ ...form, tag: e.target.value })}
              >
                {['DataThon', 'Workshop', 'Talk', 'Team', 'Event'].map(t => (
                  <option key={t}>{t}</option>
                ))}
              </Select>
            </Field>
            <button
              onClick={handleAdd}
              disabled={saving || !uploadedUrl}
              className="btn-primary w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? <><Loader2 size={16} className="animate-spin" /> Saving…</> : <><Upload size={16} /> Add to Gallery</>}
            </button>
            {!uploadedUrl && (
              <p className={`text-xs text-center ${isDark ? 'text-gray-600' : 'text-slate-400'}`}>
                Upload an image above first, then click "Add to Gallery"
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Grid of existing images */}
      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 size={28} className="animate-spin text-primary-400" />
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map(img => (
            <div key={img.id} className="relative rounded-xl overflow-hidden group aspect-square">
              <img src={img.src} alt={img.caption} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                <p className="text-white text-xs line-clamp-2">{img.caption}</p>
              </div>
            </div>
          ))}
          {images.length === 0 && (
            <p className={`col-span-4 text-center py-10 ${sub}`}>No gallery images yet.</p>
          )}
        </div>
      )}
    </div>
  )
}

// ── Main Admin ────────────────────────────────────────────────────────────────
const TABS = [
  { id: 'dashboard', label: 'Dashboard',  icon: LayoutDashboard },
  { id: 'events',    label: 'Events',     icon: Calendar },
  { id: 'team',      label: 'Team',       icon: Users },
  { id: 'gallery',   label: 'Gallery',    icon: Image },
]

export default function Admin() {
  const { isDark } = useTheme()
  const [authed, setAuthed] = useState(() => sessionStorage.getItem('datum_admin') === '1')
  const [activeTab, setActiveTab] = useState('dashboard')

  if (!authed) return <AuthGate onAuth={setAuthed} />

  const bg = isDark ? 'bg-dark-900' : 'bg-light-50'
  const sidebar = isDark ? 'bg-dark-800 border-r border-white/5' : 'bg-white border-r border-slate-200'
  const text = isDark ? 'text-white' : 'text-slate-900'

  return (
    <div className={`min-h-screen flex ${bg}`}>
      {/* Sidebar */}
      <aside className={`w-60 fixed left-0 top-16 bottom-0 ${sidebar} flex flex-col`}>
        <div className="p-4 pt-6">
          <div className="flex items-center gap-2 px-3 py-2 mb-6">
            <Database size={16} className="text-primary-400" />
            <span className={`font-display font-bold text-sm ${text}`}>Admin Portal</span>
          </div>
          <nav className="space-y-1">
            {TABS.map(tab => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    activeTab === tab.id
                      ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/20'
                      : isDark ? 'text-gray-400 hover:text-white hover:bg-white/5' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <Icon size={16} />
                  {tab.label}
                </button>
              )
            })}
          </nav>
        </div>
        <div className="mt-auto p-4 border-t border-white/5">
          <button
            onClick={() => { sessionStorage.removeItem('datum_admin'); setAuthed(false) }}
            className="w-full text-xs text-gray-500 hover:text-rose-400 transition-colors py-2"
          >
            Sign out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 ml-60 pt-16">
        <div className="p-8 max-w-5xl">
          {activeTab === 'dashboard' && <DashboardTab isDark={isDark} setActiveTab={setActiveTab} />}
          {activeTab === 'events'    && <EventsTab    isDark={isDark} />}
          {activeTab === 'team'      && <TeamTab      isDark={isDark} />}
          {activeTab === 'gallery'   && <GalleryTab   isDark={isDark} />}
        </div>
      </main>
    </div>
  )
}