import { useState, useEffect } from 'react'
import { Calendar, MapPin, Clock, ExternalLink, Zap, Loader2 } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import { getEvents } from '../utils/supabase'

const CATEGORIES = ['All', 'Competition', 'Workshop', 'Talk', 'Hackathon']

const TAG_COLORS = {
  FLAGSHIP:  'bg-amber-500/20 text-amber-400 border-amber-500/30',
  WORKSHOP:  'bg-blue-500/20 text-blue-400 border-blue-500/30',
  TALK:      'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  SERIES:    'bg-violet-500/20 text-violet-400 border-violet-500/30',
  HACKATHON: 'bg-rose-500/20 text-rose-400 border-rose-500/30',
  DEFAULT:   'bg-primary-500/20 text-primary-400 border-primary-500/30',
}

function UpcomingCard({ event, isDark }) {
  const tagStyle = TAG_COLORS[event.tag] || TAG_COLORS.DEFAULT
  return (
    <div className={`group rounded-3xl overflow-hidden relative transition-all duration-300 hover:-translate-y-1 ${isDark ? 'bg-dark-500/60 border border-primary-500/20 hover:border-primary-500/50' : 'bg-white border border-primary-200 shadow-lg hover:shadow-2xl'}`}>
      <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary-500 text-white text-xs font-mono font-bold shadow-lg shadow-primary-500/40">
        <Zap size={11} /> UPCOMING
      </div>
      <div className="relative h-56 overflow-hidden">
        <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="absolute bottom-4 left-4 flex gap-2">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-mono font-medium border ${tagStyle}`}>{event.tag}</span>
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-mono font-medium border ${isDark ? 'bg-white/10 text-gray-300 border-white/20' : 'bg-white/80 text-slate-700 border-slate-200'}`}>{event.category}</span>
        </div>
      </div>
      <div className="p-6">
        <h3 className={`font-display font-bold text-xl mb-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>{event.title}</h3>
        <p className={`text-sm leading-relaxed mb-5 ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>{event.description}</p>
        <div className="space-y-2 mb-5">
          <div className="flex items-center gap-2">
            <Calendar size={14} className="text-primary-400 flex-shrink-0" />
            <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-slate-600'}`}>
              {new Date(event.date).toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
            </span>
          </div>
          {event.time && (
            <div className="flex items-center gap-2">
              <Clock size={14} className="text-primary-400 flex-shrink-0" />
              <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-slate-600'}`}>{event.time} onwards</span>
            </div>
          )}
          <div className="flex items-center gap-2">
            <MapPin size={14} className="text-primary-400 flex-shrink-0" />
            <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-slate-600'}`}>{event.location}</span>
          </div>
        </div>

        {/* Prize pool + fees */}
        {(event.prize_pool || event.fee_gla || event.fee_other) && (
          <div className={`rounded-xl p-3 mb-5 grid grid-cols-1 gap-2 ${isDark ? 'bg-dark-700/60 border border-white/5' : 'bg-slate-50 border border-slate-200'}`}>
            {event.prize_pool && (
              <div className="flex items-center justify-between">
                <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-slate-400'}`}>🏆 Prize Pool</span>
                <span className="text-xs font-mono font-bold text-amber-400">{event.prize_pool}</span>
              </div>
            )}
            {event.fee_gla && (
              <div className="flex items-center justify-between">
                <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-slate-400'}`}>🎓 GLA Students</span>
                <span className={`text-xs font-mono font-medium ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>{event.fee_gla}</span>
              </div>
            )}
            {event.fee_other && (
              <div className="flex items-center justify-between">
                <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-slate-400'}`}>🏫 Other Institutions</span>
                <span className={`text-xs font-mono font-medium ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>{event.fee_other}</span>
              </div>
            )}
          </div>
        )}

        <a href={event.registerLink || event.register_link || '#'} className="w-full btn-primary justify-center flex items-center gap-2">
          Register Now <ExternalLink size={15} />
        </a>
      </div>
    </div>
  )
}

function PastEventCard({ event, isDark }) {
  const tagStyle = TAG_COLORS[event.tag] || TAG_COLORS.DEFAULT
  return (
    <div className={`group rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 ${isDark ? 'bg-dark-500/60 border border-white/5 hover:border-white/15' : 'bg-white border border-slate-200 hover:shadow-lg'}`}>
      <div className="relative h-44 overflow-hidden">
        <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <span className={`absolute top-3 left-3 inline-flex items-center px-3 py-1 rounded-full text-xs font-mono font-medium border ${tagStyle}`}>{event.tag}</span>
      </div>
      <div className="p-5">
        <div className="flex items-center gap-2 mb-2">
          <Calendar size={12} className={isDark ? 'text-gray-500' : 'text-slate-400'} />
          <span className={`text-xs font-mono ${isDark ? 'text-gray-500' : 'text-slate-400'}`}>
            {new Date(event.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
          </span>
          {event.time && (
            <>
              <span className={`text-xs ${isDark ? 'text-gray-600' : 'text-slate-300'}`}>·</span>
              <Clock size={12} className={isDark ? 'text-gray-500' : 'text-slate-400'} />
              <span className={`text-xs font-mono ${isDark ? 'text-gray-500' : 'text-slate-400'}`}>{event.time}</span>
            </>
          )}
        </div>
        <h3 className={`font-display font-bold text-base mb-2 line-clamp-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>{event.title}</h3>
        <p className={`text-sm line-clamp-2 mb-3 ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>{event.description}</p>

        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-1.5 min-w-0">
            <MapPin size={12} className={`flex-shrink-0 ${isDark ? 'text-gray-600' : 'text-slate-400'}`} />
            <span className={`text-xs truncate max-w-[140px] ${isDark ? 'text-gray-500' : 'text-slate-400'}`}>{event.location}</span>
          </div>
          <div className="flex items-center gap-1.5 flex-wrap">
            {event.prize_pool && (
              <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                🏆 {event.prize_pool}
              </span>
            )}
            {(event.fee_gla || event.fee) && (
              <span className={`text-xs font-mono px-2 py-0.5 rounded-full ${isDark ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-emerald-50 text-emerald-600 border border-emerald-200'}`}>
                {event.fee_gla ? `₹GLA: ${event.fee_gla}` : event.fee}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Events() {
  const { isDark } = useTheme()
  const [filter, setFilter]     = useState('All')
  const [dbEvents, setDbEvents] = useState([])
  const [loading, setLoading]   = useState(true)

  useEffect(() => {
    getEvents()
      .then(({ data }) => { if (data?.length) setDbEvents(data) })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const upcoming     = dbEvents.filter(e => e.is_upcoming)
  const past         = dbEvents.filter(e => !e.is_upcoming)
  const filteredPast = filter === 'All' ? past : past.filter(e => e.category === filter)

  return (
    <div className={`min-h-screen ${isDark ? 'bg-dark-900' : 'bg-light-50'}`}>

      {/* Hero */}
      <section className={`relative pt-32 pb-20 overflow-hidden ${isDark ? 'bg-dark-800' : 'bg-slate-900'}`}>
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="orb w-96 h-96 bg-primary-600/20 top-0 right-0" />
        <div className="orb w-64 h-64 bg-pink-600/15 bottom-0 left-0" />
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm font-mono uppercase tracking-widest text-primary-400 mb-4">Events</p>
          <h1 className="font-display font-bold text-5xl md:text-6xl lg:text-7xl text-white mb-6">
            Workshops. Talks. <br /><span className="glow-text">Datathons.</span>
          </h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto">
            Every event at Datum is designed to push your boundaries, grow your skills, and connect you with the right people.
          </p>
        </div>
      </section>

      {/* Loading */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-32 gap-4">
          <Loader2 size={36} className="animate-spin text-primary-400" />
          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>Loading events…</p>
        </div>
      )}

      {/* Upcoming */}
      {!loading && upcoming.length > 0 && (
        <section className={`py-20 ${isDark ? 'bg-dark-900' : 'bg-white'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-10">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/20 border border-primary-500/40 text-primary-400 text-sm font-mono font-bold">
                <Zap size={14} /> Upcoming Events
              </div>
              <div className={`flex-1 h-px ${isDark ? 'bg-white/5' : 'bg-slate-200'}`} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {upcoming.map(event => <UpcomingCard key={event.id} event={event} isDark={isDark} />)}
            </div>
          </div>
        </section>
      )}

      {/* Past Events */}
      {!loading && (
        <section className={`py-20 ${isDark ? 'bg-dark-800' : 'bg-slate-50'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
              <div className="flex items-center gap-3">
                <h2 className={`font-display font-bold text-2xl ${isDark ? 'text-white' : 'text-slate-900'}`}>Past Events</h2>
                <span className={`text-sm font-mono ${isDark ? 'text-gray-500' : 'text-slate-400'}`}>({filteredPast.length})</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setFilter(cat)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                      filter === cat
                        ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/30'
                        : isDark ? 'bg-dark-500/60 text-gray-300 hover:bg-dark-400/60 border border-white/5' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {filteredPast.length === 0 ? (
              <div className={`text-center py-24 rounded-2xl border ${isDark ? 'border-white/5 bg-dark-500/20' : 'border-slate-200 bg-white'}`}>
                <div className="text-4xl mb-4">📅</div>
                <p className={`text-lg font-display font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {past.length === 0 ? 'No events yet' : 'No events in this category'}
                </p>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
                  {past.length === 0
                    ? <>Add events from the <a href="/admin" className="text-primary-400 hover:underline">Admin Portal</a></>
                    : 'Try selecting a different category filter'
                  }
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPast.map(event => <PastEventCard key={event.id} event={event} isDark={isDark} />)}
              </div>
            )}
          </div>
        </section>
      )}

      {/* No events at all */}
      {!loading && dbEvents.length === 0 && (
        <div className={`max-w-xl mx-auto text-center py-32 px-4`}>
          <div className="text-5xl mb-6">🗓️</div>
          <p className={`text-xl font-display font-bold mb-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>No events added yet</p>
          <p className={`text-sm mb-6 ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
            Add upcoming and past events from the Admin Portal — they'll appear here automatically.
          </p>
          <a href="/admin" className="btn-primary inline-flex">Go to Admin Portal</a>
        </div>
      )}
    </div>
  )
}