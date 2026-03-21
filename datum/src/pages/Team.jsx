import { useState, useEffect } from 'react'
import { Linkedin, Github, Crown, Users, Clapperboard, Palette, Megaphone, Wrench, Loader2, ChevronDown, Briefcase } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import { getTeamMembers } from '../utils/supabase'

const TEAM_NAMES = ['Leadership', 'Tech Team', 'Event Management', 'Media & Video', 'Design Team', 'PR Team', 'Datum Alumni Corporate Connect']

const TEAM_META = {
  'Leadership':                      { color: 'from-violet-600 to-indigo-600',  icon: Crown },
  'Tech Team':                       { color: 'from-cyan-600 to-blue-600',      icon: Wrench },
  'Event Management':                { color: 'from-pink-600 to-rose-600',      icon: Users },
  'Media & Video':                   { color: 'from-orange-600 to-amber-600',   icon: Clapperboard },
  'Design Team':                     { color: 'from-emerald-600 to-teal-600',   icon: Palette },
  'PR Team':                         { color: 'from-violet-600 to-fuchsia-600', icon: Megaphone },
  'Datum Alumni Corporate Connect':  { color: 'from-amber-600 to-yellow-500',   icon: Briefcase },
}

const DEFAULT_COLORS = [
  'from-violet-500 to-purple-600', 'from-indigo-500 to-blue-600',
  'from-cyan-500 to-blue-600',     'from-emerald-500 to-teal-600',
  'from-pink-500 to-rose-600',     'from-amber-500 to-orange-600',
  'from-fuchsia-500 to-violet-600','from-blue-500 to-cyan-600',
]

function getInitials(name = '') {
  return name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
}

const SKILL_COLORS = {
  'Web Development':      'bg-blue-500/15 text-blue-400 border-blue-500/25',
  'Backend Development':  'bg-emerald-500/15 text-emerald-400 border-emerald-500/25',
  'Frontend Development': 'bg-violet-500/15 text-violet-400 border-violet-500/25',
  'UI/UX Design':         'bg-pink-500/15 text-pink-400 border-pink-500/25',
  'Graphic Design':       'bg-orange-500/15 text-orange-400 border-orange-500/25',
  'Video Editing':        'bg-red-500/15 text-red-400 border-red-500/25',
  'Content Writing':      'bg-lime-500/15 text-lime-400 border-lime-500/25',
  'Public Speaking':      'bg-yellow-500/15 text-yellow-400 border-yellow-500/25',
  'AI / Machine Learning':'bg-indigo-500/15 text-indigo-400 border-indigo-500/25',
  'App Development':      'bg-cyan-500/15 text-cyan-400 border-cyan-500/25',
  'Marketing':            'bg-fuchsia-500/15 text-fuchsia-400 border-fuchsia-500/25',
  'Other':                'bg-gray-500/15 text-gray-400 border-gray-500/25',
}

function MemberCard({ member, isDark }) {
  const [expanded, setExpanded] = useState(false)
  const color    = member.color || DEFAULT_COLORS[0]
  const initials = member.avatar || getInitials(member.name)
  const skills   = Array.isArray(member.skills) ? member.skills : []
  const hasMeta  = member.bio || skills.length > 0

  return (
    <div
      className={`group relative rounded-2xl overflow-hidden transition-all duration-300
        ${expanded ? 'shadow-2xl shadow-primary-500/20 scale-[1.02]' : 'hover:-translate-y-1'}
        ${isDark
          ? `bg-dark-500/60 border ${expanded ? 'border-primary-500/40' : 'border-white/5 hover:border-primary-500/30'}`
          : `bg-white border ${expanded ? 'border-primary-300 shadow-xl' : 'border-slate-200 hover:shadow-xl hover:border-primary-200'}`
        }`}
    >
      {/* Photo / Avatar */}
      <div className="relative h-52 overflow-hidden">
        {member.photo_url ? (
          <img
            src={member.photo_url}
            alt={member.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className={`w-full h-full bg-gradient-to-br ${color} flex items-center justify-center`}>
            <span className="font-display font-bold text-5xl text-white/80">{initials}</span>
          </div>
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
          {member.linkedin && member.linkedin !== '#' && (
            <a href={member.linkedin} target="_blank" rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-primary-500 transition-colors"
            >
              <Linkedin size={16} />
            </a>
          )}
          {member.github && member.github !== '#' && (
            <a href={member.github} target="_blank" rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-primary-500 transition-colors"
            >
              <Github size={16} />
            </a>
          )}
        </div>

        {/* Role badge */}
        <div className="absolute bottom-3 left-3">
          <span className={`px-3 py-1 rounded-full text-xs font-mono font-medium backdrop-blur-sm
            ${isDark ? 'bg-black/40 text-primary-300 border border-primary-500/30' : 'bg-white/80 text-primary-700 border border-primary-200'}`}
          >
            {member.role}
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className={`font-display font-bold text-base truncate ${isDark ? 'text-white' : 'text-slate-900'}`}>{member.name}</h3>
            {member.year && (
              <p className={`text-xs mt-0.5 ${isDark ? 'text-gray-500' : 'text-slate-400'}`}>{member.year}</p>
            )}
          </div>
          {/* Expand toggle — only if there's bio or skills */}
          {hasMeta && (
            <button
              onClick={() => setExpanded(e => !e)}
              className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200
                ${expanded
                  ? 'bg-primary-500 text-white rotate-180'
                  : isDark ? 'bg-white/10 text-gray-400 hover:bg-primary-500/20 hover:text-primary-400' : 'bg-slate-100 text-slate-500 hover:bg-primary-50 hover:text-primary-500'
                }`}
              title={expanded ? 'Show less' : 'Show bio & skills'}
            >
              <ChevronDown size={14} />
            </button>
          )}
        </div>

        {/* Expanded bio + skills */}
        {expanded && hasMeta && (
          <div className="mt-3 space-y-3 animate-fade-in">
            {member.bio && (
              <p className={`text-xs leading-relaxed ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
                {member.bio}
              </p>
            )}
            {skills.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {skills.map(skill => (
                  <span
                    key={skill}
                    className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium border
                      ${SKILL_COLORS[skill] || SKILL_COLORS['Other']}`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default function Team() {
  const { isDark } = useTheme()
  const [activeTeam, setActiveTeam] = useState('All')
  const [members, setMembers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getTeamMembers()
      .then(({ data, error }) => {
        if (data && data.length > 0) setMembers(data)
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  // Group DB members by team
  const grouped = TEAM_NAMES.reduce((acc, teamName) => {
    const teamMembers = members.filter(m => m.team === teamName)
    if (teamMembers.length > 0) acc[teamName] = teamMembers
    return acc
  }, {})

  const teamsWithMembers = Object.keys(grouped)
  const allTabNames = ['All', ...teamsWithMembers]

  const visibleTeams = activeTeam === 'All'
    ? teamsWithMembers
    : teamsWithMembers.filter(t => t === activeTeam)

  return (
    <div className={`min-h-screen ${isDark ? 'bg-dark-900' : 'bg-light-50'}`}>

      {/* Hero */}
      <section className={`relative pt-32 pb-20 overflow-hidden ${isDark ? 'bg-dark-800' : 'bg-slate-900'}`}>
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="orb w-96 h-96 bg-primary-600/20 top-0 right-0" />
        <div className="orb w-64 h-64 bg-accent-violet/15 bottom-0 left-0" />

        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm font-mono uppercase tracking-widest text-primary-400 mb-4">The People</p>
          <h1 className="font-display font-bold text-5xl md:text-6xl lg:text-7xl text-white mb-6">
            Meet the <span className="glow-text">Datum Team</span>
          </h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto">
            We are a diverse group of passionate students united by our love for data, technology, and building things that matter.
          </p>

          {/* Live counts from DB */}
          {!loading && members.length > 0 && (
            <div className="flex flex-wrap justify-center gap-6 mt-10">
              {teamsWithMembers.map(teamName => {
                const meta = TEAM_META[teamName] || { icon: Users }
                const Icon = meta.icon
                return (
                  <div key={teamName} className="flex items-center gap-2 text-gray-300">
                    <Icon size={16} className="text-primary-400" />
                    <span className="text-sm">{teamName}</span>
                    <span className="text-xs text-gray-500">({grouped[teamName].length})</span>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </section>

      {/* Filter tabs — only show if there are members */}
      {!loading && teamsWithMembers.length > 0 && (
        <div className={`sticky top-16 z-30 py-4 border-b ${isDark ? 'bg-dark-800/90 backdrop-blur-xl border-white/5' : 'bg-white/90 backdrop-blur-xl border-slate-200'}`}>
          <div className="max-w-7xl mx-auto px-4 flex gap-2 overflow-x-auto pb-1">
            {allTabNames.map(name => (
              <button
                key={name}
                onClick={() => setActiveTeam(name)}
                className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-200 flex-shrink-0 ${
                  activeTeam === name
                    ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/30'
                    : isDark ? 'bg-dark-500/60 text-gray-300 hover:bg-dark-400/60' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* Loading */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-32 gap-4">
            <Loader2 size={36} className="animate-spin text-primary-400" />
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>Loading team…</p>
          </div>
        )}

        {/* No members yet */}
        {!loading && members.length === 0 && (
          <div className={`text-center py-24 rounded-2xl border ${isDark ? 'border-white/5 bg-dark-500/20' : 'border-slate-200 bg-white'}`}>
            <div className="text-4xl mb-4">👥</div>
            <p className={`text-lg font-display font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>No team members yet</p>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
              Add team members from the <a href="/admin" className="text-primary-400 hover:underline">Admin Portal</a>
            </p>
          </div>
        )}

        {/* Teams grid */}
        {!loading && visibleTeams.length > 0 && (
          <div className="space-y-24">
            {visibleTeams.map(teamName => {
              const meta = TEAM_META[teamName] || { color: 'from-primary-500 to-accent-violet', icon: Users }
              const Icon = meta.icon
              const teamMembers = grouped[teamName]
              const isLeadership = teamName === 'Leadership'

              // ── Leadership: President → VP → GS ──────────────────────
              const LEADERSHIP_ORDER = ['President', 'Vice President', 'General Secretary']

              // ── Other teams: Head → Co-Head → Members ────────────────
              const heads    = teamMembers.filter(m => m.role?.toLowerCase().includes('head') && !m.role?.toLowerCase().includes('co'))
              const coHeads  = teamMembers.filter(m => m.role?.toLowerCase().includes('co-head') || m.role?.toLowerCase().includes('co head'))
              const rest     = teamMembers.filter(m =>
                !m.role?.toLowerCase().includes('head') &&
                !m.role?.toLowerCase().includes('co-head') &&
                !m.role?.toLowerCase().includes('co head')
              )

              // Leadership sorted by defined order
              const sortedLeadership = [...teamMembers].sort((a, b) => {
                const ai = LEADERSHIP_ORDER.findIndex(r => a.role?.toLowerCase().includes(r.toLowerCase()))
                const bi = LEADERSHIP_ORDER.findIndex(r => b.role?.toLowerCase().includes(r.toLowerCase()))
                return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi)
              })

              return (
                <div key={teamName}>

                  {/* ── Centered team heading ─────────────────────────── */}
                  <div className="text-center mb-12">
                    <div className={`inline-flex w-16 h-16 rounded-2xl bg-gradient-to-br ${meta.color} items-center justify-center shadow-lg shadow-black/20 mb-4`}>
                      <Icon size={28} className="text-white" />
                    </div>
                    <h2 className={`font-display font-bold text-3xl md:text-4xl ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      {teamName}
                    </h2>
                    <p className={`text-sm mt-1 ${isDark ? 'text-gray-500' : 'text-slate-400'}`}>
                      {teamMembers.length} member{teamMembers.length !== 1 ? 's' : ''}
                    </p>
                    {/* Decorative line */}
                    <div className="flex items-center justify-center gap-3 mt-4">
                      <div className={`h-px w-16 bg-gradient-to-r from-transparent ${isDark ? 'to-white/20' : 'to-slate-300'}`} />
                      <div className={`w-2 h-2 rounded-full bg-gradient-to-br ${meta.color}`} />
                      <div className={`h-px w-16 bg-gradient-to-l from-transparent ${isDark ? 'to-white/20' : 'to-slate-300'}`} />
                    </div>
                  </div>

                  {/* ── Leadership layout ─────────────────────────────── */}
                  {isLeadership && (
                    <div className="space-y-6">
                      {/* President — centered, larger */}
                      {sortedLeadership.filter(m => m.role?.toLowerCase().includes('president') && !m.role?.toLowerCase().includes('vice')).map(m => (
                        <div key={m.id} className="flex justify-center">
                          <div className="w-56">
                            <MemberCard member={m} isDark={isDark} />
                          </div>
                        </div>
                      ))}
                      {/* VP + GS side by side */}
                      <div className="flex justify-center gap-4 flex-wrap">
                        {sortedLeadership.filter(m =>
                          m.role?.toLowerCase().includes('vice') ||
                          m.role?.toLowerCase().includes('secretary')
                        ).map(m => (
                          <div key={m.id} className="w-52">
                            <MemberCard member={m} isDark={isDark} />
                          </div>
                        ))}
                      </div>
                      {/* Any remaining leadership members */}
                      {sortedLeadership.filter(m =>
                        !m.role?.toLowerCase().includes('president') &&
                        !m.role?.toLowerCase().includes('vice') &&
                        !m.role?.toLowerCase().includes('secretary')
                      ).length > 0 && (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                          {sortedLeadership.filter(m =>
                            !m.role?.toLowerCase().includes('president') &&
                            !m.role?.toLowerCase().includes('vice') &&
                            !m.role?.toLowerCase().includes('secretary')
                          ).map(m => <MemberCard key={m.id} member={m} isDark={isDark} />)}
                        </div>
                      )}
                    </div>
                  )}

                  {/* ── Other teams layout ────────────────────────────── */}
                  {!isLeadership && (
                    <div className="space-y-8">

                      {/* Head + Co-Head — centered row */}
                      {(heads.length > 0 || coHeads.length > 0) && (
                        <div>
                          <p className={`text-center text-xs font-mono uppercase tracking-widest mb-4 ${isDark ? 'text-gray-500' : 'text-slate-400'}`}>
                            Leadership
                          </p>
                          <div className="flex justify-center gap-4 flex-wrap">
                            {[...heads, ...coHeads].map(m => (
                              <div key={m.id} className="w-52">
                                <MemberCard member={m} isDark={isDark} />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Divider between heads and members */}
                      {(heads.length > 0 || coHeads.length > 0) && rest.length > 0 && (
                        <div className="flex items-center gap-3">
                          <div className={`flex-1 h-px ${isDark ? 'bg-white/5' : 'bg-slate-200'}`} />
                          <p className={`text-xs font-mono uppercase tracking-widest ${isDark ? 'text-gray-600' : 'text-slate-400'}`}>Members</p>
                          <div className={`flex-1 h-px ${isDark ? 'bg-white/5' : 'bg-slate-200'}`} />
                        </div>
                      )}

                      {/* Regular members grid */}
                      {rest.length > 0 && (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                          {rest.map(m => <MemberCard key={m.id} member={m} isDark={isDark} />)}
                        </div>
                      )}

                      {/* Edge case: no heads at all, just show everyone */}
                      {heads.length === 0 && coHeads.length === 0 && (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                          {teamMembers.map(m => <MemberCard key={m.id} member={m} isDark={isDark} />)}
                        </div>
                      )}
                    </div>
                  )}

                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}