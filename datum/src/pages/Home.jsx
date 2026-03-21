import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ChevronRight, Star, Zap, Brain, Code2, Palette, Video, Mic, Bot, Smartphone, Megaphone, PenLine, Globe } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import { SKILLS, ROADMAP, PAST_EVENTS, TESTIMONIALS, STATS } from '../utils/data'

// ── Skill icon mapping ───────────────────────────────────────────────────────
const SKILL_ICONS = [Globe, Code2, Code2, Palette, Palette, Video, PenLine, Mic, Bot, Smartphone, Megaphone]

// ── Hero Section ─────────────────────────────────────────────────────────────
function HeroSection({ isDark }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handler = (e) => setMousePos({ x: e.clientX, y: e.clientY })
    window.addEventListener('mousemove', handler)
    return () => window.removeEventListener('mousemove', handler)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className={`absolute inset-0 ${isDark ? 'bg-dark-900' : 'bg-gradient-to-br from-slate-900 via-dark-800 to-dark-900'}`}>
        <div className="grid-bg absolute inset-0 opacity-60" />
        {/* Animated orbs */}
        <div
          className="orb w-[600px] h-[600px] bg-primary-600/20 top-[-200px] right-[-100px] transition-transform duration-1000 ease-out"
          style={{ transform: `translate(${mousePos.x * 0.01}px, ${mousePos.y * 0.01}px)` }}
        />
        <div
          className="orb w-[400px] h-[400px] bg-accent-violet/15 bottom-[-100px] left-[-100px] transition-transform duration-1000 ease-out"
          style={{ transform: `translate(${-mousePos.x * 0.008}px, ${-mousePos.y * 0.008}px)` }}
        />
        <div className="orb w-[200px] h-[200px] bg-accent-cyan/10 top-1/2 left-1/2" />
      </div>

      {/* Floating data nodes */}
      <div className="absolute inset-0 pointer-events-none">
        {[
          { top: '15%', left: '8%', label: 'Python', delay: '0s' },
          { top: '25%', right: '10%', label: 'ML', delay: '1s' },
          { top: '65%', left: '6%', label: 'SQL', delay: '2s' },
          { top: '70%', right: '8%', label: 'AI', delay: '0.5s' },
          { top: '40%', right: '4%', label: 'Data', delay: '1.5s' },
          { top: '80%', left: '20%', label: 'API', delay: '2.5s' },
        ].map((node, i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{ top: node.top, left: node.left, right: node.right, animationDelay: node.delay }}
          >
            <div className="px-3 py-1.5 rounded-full glass-dark border border-primary-500/30 text-primary-400 text-xs font-mono font-medium">
              {node.label}
            </div>
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary-500/30 bg-primary-500/10 text-primary-400 text-sm font-mono mb-8 animate-fade-in">
            <Zap size={14} />
            Data Science Club of the Year — 2024
          </div>

          <h1 className="section-title text-white mb-6 animate-slide-up leading-tight">
            Turning Data Into
            <br />
            <span className="glow-text">Decisions.</span>
          </h1>

          <p className="text-gray-300 text-lg md:text-xl max-w-xl mb-10 leading-relaxed animate-slide-up" style={{ animationDelay: '0.1s' }}>
            Datum is where curiosity meets capability. We build data scientists, ML engineers, and tech leaders — one dataset at a time.
          </p>

          <div className="flex flex-wrap gap-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <Link to="/events" className="btn-primary text-base px-8 py-4 group">
              Explore Events
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/about" className="btn-outline text-base px-8 py-4">
              About Datum
            </Link>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-8 mt-16 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            {STATS.map((s) => (
              <div key={s.label}>
                <div className="font-display font-bold text-3xl text-white">{s.value}</div>
                <div className="text-gray-500 text-sm mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3D Data visualization orb - right side */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden xl:block pointer-events-none">
        <div className="relative w-80 h-80 animate-float-slow">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary-600/30 to-accent-violet/30 blur-3xl" />
          <div className="relative w-full h-full rounded-full border border-primary-500/20 flex items-center justify-center">
            <div className="w-48 h-48 rounded-full border border-accent-cyan/30 flex items-center justify-center animate-spin-slow">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary-500/40 to-accent-violet/40 flex items-center justify-center">
                <Brain size={40} className="text-primary-300" />
              </div>
            </div>
            {/* Orbit dots */}
            {[0, 72, 144, 216, 288].map((deg, i) => (
              <div
                key={i}
                className="absolute w-3 h-3 rounded-full bg-primary-400"
                style={{
                  top: `calc(50% + ${Math.sin(deg * Math.PI / 180) * 110}px)`,
                  left: `calc(50% + ${Math.cos(deg * Math.PI / 180) * 110}px)`,
                  transform: 'translate(-50%, -50%)',
                  boxShadow: '0 0 12px rgba(99,102,241,0.8)',
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ── Skills Marquee ─────────────────────────────────────────────────────────
function SkillsSection({ isDark }) {
  const doubled = [...SKILLS, ...SKILLS, ...SKILLS]

  return (
    <section className={`py-20 relative overflow-hidden ${isDark ? 'bg-dark-800' : 'bg-slate-50'}`}>
      <div className="max-w-7xl mx-auto px-4 mb-12 text-center">
        <p className={`text-sm font-mono uppercase tracking-widest mb-3 ${isDark ? 'text-primary-400' : 'text-primary-600'}`}>
          Skills We Build
        </p>
        <h2 className={`section-title ${isDark ? 'text-white' : 'text-slate-900'}`}>
          Learn. Build. <span className="glow-text">Grow.</span>
        </h2>
        <p className={`section-subtitle mt-4 mx-auto ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
          From AI to design — Datum covers every skill you need to thrive in the digital world.
        </p>
      </div>

      {/* Marquee row 1 */}
      <div className="marquee-container mb-4 relative">
        <div className="absolute left-0 top-0 bottom-0 w-24 z-10" style={{ background: isDark ? 'linear-gradient(to right, #0a0a1f, transparent)' : 'linear-gradient(to right, #f8fafc, transparent)' }} />
        <div className="absolute right-0 top-0 bottom-0 w-24 z-10" style={{ background: isDark ? 'linear-gradient(to left, #0a0a1f, transparent)' : 'linear-gradient(to left, #f8fafc, transparent)' }} />
        <div className="marquee-track animate-marquee gap-4" style={{ display: 'flex', gap: '16px' }}>
          {doubled.slice(0, 22).map((skill, i) => {
            const Icon = SKILL_ICONS[i % SKILL_ICONS.length]
            return (
              <div
                key={i}
                className={`flex items-center gap-3 px-5 py-3 rounded-2xl whitespace-nowrap flex-shrink-0 ${isDark ? 'bg-dark-500/80 border border-white/5' : 'bg-white border border-slate-200 shadow-sm'}`}
              >
                <span className="text-lg">{skill.icon}</span>
                <span className={`font-body font-medium text-sm ${isDark ? 'text-gray-200' : 'text-slate-700'}`}>{skill.label}</span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Marquee row 2 (reverse) */}
      <div className="marquee-container relative">
        <div className="absolute left-0 top-0 bottom-0 w-24 z-10" style={{ background: isDark ? 'linear-gradient(to right, #0a0a1f, transparent)' : 'linear-gradient(to right, #f8fafc, transparent)' }} />
        <div className="absolute right-0 top-0 bottom-0 w-24 z-10" style={{ background: isDark ? 'linear-gradient(to left, #0a0a1f, transparent)' : 'linear-gradient(to left, #f8fafc, transparent)' }} />
        <div className="marquee-track animate-marquee2 gap-4" style={{ display: 'flex', gap: '16px' }}>
          {[...doubled].reverse().slice(0, 22).map((skill, i) => {
            const Icon = SKILL_ICONS[i % SKILL_ICONS.length]
            return (
              <div
                key={i}
                className={`flex items-center gap-3 px-5 py-3 rounded-2xl whitespace-nowrap flex-shrink-0 border ${isDark ? 'bg-dark-600/80 border-primary-500/10' : 'bg-primary-50 border-primary-100'}`}
              >
                <span className="text-lg">{skill.icon}</span>
                <span className={`font-body font-medium text-sm ${isDark ? 'text-primary-300' : 'text-primary-700'}`}>{skill.label}</span>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ── Roadmap ────────────────────────────────────────────────────────────────
function RoadmapSection({ isDark }) {
  return (
    <section className={`py-24 relative overflow-hidden ${isDark ? 'bg-dark-900' : 'bg-white'}`}>
      {isDark && (
        <>
          <div className="orb w-96 h-96 bg-primary-600/10 top-0 left-1/4" />
          <div className="orb w-64 h-64 bg-accent-violet/10 bottom-0 right-1/4" />
        </>
      )}

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <p className={`text-sm font-mono uppercase tracking-widest mb-3 ${isDark ? 'text-primary-400' : 'text-primary-600'}`}>Our Journey</p>
          <h2 className={`section-title ${isDark ? 'text-white' : 'text-slate-900'}`}>
            The Datum <span className="glow-text">Roadmap</span>
          </h2>
        </div>

        {/* Vertical timeline */}
        <div className="relative">
          {/* Center spine line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 hidden md:block"
            style={{ background: isDark
              ? 'linear-gradient(to bottom, transparent, rgba(99,102,241,0.5) 10%, rgba(99,102,241,0.5) 90%, transparent)'
              : 'linear-gradient(to bottom, transparent, rgba(99,102,241,0.3) 10%, rgba(99,102,241,0.3) 90%, transparent)'
            }}
          />

          <div className="space-y-12">
            {ROADMAP.map((item, i) => {
              const isLeft = i % 2 === 0
              return (
                <div key={i} className={`relative flex items-center gap-0 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'} flex-col`}>

                  {/* Card */}
                  <div className={`w-full md:w-[calc(50%-32px)] group`}>
                    <div className={`p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1
                      ${item.upcoming
                        ? isDark ? 'bg-dark-500/40 border border-primary-500/20 hover:border-primary-500/40' : 'bg-primary-50/60 border border-primary-200 hover:border-primary-400'
                        : isDark ? 'bg-dark-500/60 border border-white/5 hover:border-primary-500/30' : 'bg-white border border-slate-200 hover:border-primary-300 hover:shadow-lg'
                      }`}
                    >
                      {/* Tag */}
                      <div className="flex items-center gap-2 mb-3">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium border
                          ${item.upcoming
                            ? 'bg-primary-500/15 text-primary-400 border-primary-500/30'
                            : isDark ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30' : 'bg-emerald-50 text-emerald-600 border-emerald-200'
                          }`}
                        >
                          {item.upcoming ? '🚀' : '✓'} {item.upcoming ? 'Upcoming' : 'Milestone'}
                        </span>
                      </div>
                      <p className={`text-xs font-mono mb-1.5 ${isDark ? 'text-gray-500' : 'text-slate-400'}`}>{item.date}</p>
                      <h3 className={`font-display font-bold text-lg mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>{item.title}</h3>
                      <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>{item.description}</p>
                    </div>
                  </div>

                  {/* Center dot — desktop only */}
                  <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center justify-center z-10">
                    <div className={`w-5 h-5 rounded-full bg-gradient-to-br ${item.color} shadow-lg flex items-center justify-center`}
                      style={{ boxShadow: isDark ? `0 0 16px rgba(99,102,241,0.6)` : `0 0 12px rgba(99,102,241,0.3)` }}
                    >
                      <div className="w-2 h-2 rounded-full bg-white" />
                    </div>
                  </div>

                  {/* Mobile left dot */}
                  <div className={`md:hidden absolute left-0 top-6 w-3 h-3 rounded-full bg-gradient-to-br ${item.color}`} />

                  {/* Spacer for opposite side */}
                  <div className="hidden md:block w-[calc(50%-32px)]" />
                </div>
              )
            })}
          </div>

          {/* Mobile spine */}
          <div className="absolute left-1.5 top-0 bottom-0 w-px md:hidden"
            style={{ background: isDark
              ? 'linear-gradient(to bottom, transparent, rgba(99,102,241,0.4) 5%, rgba(99,102,241,0.4) 95%, transparent)'
              : 'linear-gradient(to bottom, transparent, rgba(99,102,241,0.25) 5%, rgba(99,102,241,0.25) 95%, transparent)'
            }}
          />
        </div>
      </div>
    </section>
  )
}

// ── Past Events Preview ─────────────────────────────────────────────────────
function EventsPreview({ isDark }) {
  return (
    <section className={`py-24 ${isDark ? 'bg-dark-800' : 'bg-slate-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <p className={`text-sm font-mono uppercase tracking-widest mb-3 ${isDark ? 'text-primary-400' : 'text-primary-600'}`}>Past Events</p>
            <h2 className={`section-title ${isDark ? 'text-white' : 'text-slate-900'}`}>
              What We've <span className="glow-text">Built</span>
            </h2>
          </div>
          <Link to="/events" className="btn-outline group shrink-0">
            All Events <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PAST_EVENTS.slice(0, 3).map((event) => (
            <div
              key={event.id}
              className={`group rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 ${isDark ? 'bg-dark-500/60 border border-white/5 hover:border-primary-500/30' : 'bg-white border border-slate-200 hover:shadow-xl'}`}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <span className={`absolute top-3 left-3 tag-chip ${isDark ? 'bg-primary-500/20 text-primary-300 border border-primary-500/30' : 'bg-primary-600 text-white'}`}>
                  {event.tag}
                </span>
              </div>
              <div className="p-5">
                <p className={`text-xs font-mono mb-2 ${isDark ? 'text-gray-500' : 'text-slate-400'}`}>
                  {new Date(event.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                </p>
                <h3 className={`font-display font-bold text-base mb-2 line-clamp-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>{event.title}</h3>
                <p className={`text-sm line-clamp-2 ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>{event.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Testimonials ───────────────────────────────────────────────────────────
function TestimonialsSection({ isDark }) {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setActive(a => (a + 1) % TESTIMONIALS.length), 4000)
    return () => clearInterval(t)
  }, [])

  return (
    <section className={`py-24 relative overflow-hidden ${isDark ? 'bg-dark-900' : 'bg-white'}`}>
      {isDark && <div className="orb w-96 h-96 bg-accent-violet/10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className={`text-sm font-mono uppercase tracking-widest mb-3 ${isDark ? 'text-primary-400' : 'text-primary-600'}`}>Testimonials</p>
          <h2 className={`section-title ${isDark ? 'text-white' : 'text-slate-900'}`}>
            What Our <span className="glow-text">Members Say</span>
          </h2>
        </div>

        {/* Featured */}
        <div className="max-w-3xl mx-auto mb-12">
          <div className={`p-8 md:p-10 rounded-3xl text-center transition-all duration-500 ${isDark ? 'bg-dark-500/60 border border-white/5' : 'bg-slate-50 border border-slate-200'}`}>
            <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${TESTIMONIALS[active].color} flex items-center justify-center text-white font-display font-bold text-lg mx-auto mb-5`}>
              {TESTIMONIALS[active].avatar}
            </div>
            <div className="flex justify-center gap-1 mb-5">
              {[...Array(5)].map((_, i) => <Star key={i} size={16} className="fill-amber-400 text-amber-400" />)}
            </div>
            <p className={`text-lg md:text-xl leading-relaxed mb-6 italic ${isDark ? 'text-gray-200' : 'text-slate-700'}`}>
              "{TESTIMONIALS[active].quote}"
            </p>
            <div>
              <p className={`font-display font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{TESTIMONIALS[active].name}</p>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>{TESTIMONIALS[active].role}</p>
            </div>
          </div>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`rounded-full transition-all duration-300 ${i === active ? 'w-8 h-2 bg-primary-500' : `w-2 h-2 ${isDark ? 'bg-white/20' : 'bg-slate-300'}`}`}
            />
          ))}
        </div>

        {/* All testimonial avatars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mt-10">
          {TESTIMONIALS.map((t, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`p-4 rounded-2xl text-left transition-all duration-300 ${i === active
                ? isDark ? 'bg-primary-500/20 border border-primary-500/40' : 'bg-primary-50 border border-primary-300'
                : isDark ? 'bg-dark-500/40 border border-white/5 hover:border-white/20' : 'bg-white border border-slate-200 hover:border-primary-200'
              }`}
            >
              <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center text-white font-bold text-sm mb-2`}>
                {t.avatar}
              </div>
              <p className={`font-medium text-sm ${isDark ? 'text-white' : 'text-slate-900'}`}>{t.name}</p>
              <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-slate-400'}`}>{t.role}</p>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── CTA Section ────────────────────────────────────────────────────────────
function CTASection({ isDark }) {
  return (
    <section className={`py-24 relative overflow-hidden ${isDark ? 'bg-dark-800' : 'bg-slate-900'}`}>
      <div className="orb w-[500px] h-[500px] bg-primary-600/20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      <div className="orb w-64 h-64 bg-accent-cyan/15 top-0 right-0" />
      <div className="orb w-48 h-48 bg-accent-violet/15 bottom-0 left-0" />

      <div className="relative max-w-4xl mx-auto px-4 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary-500/30 bg-primary-500/10 text-primary-400 text-sm font-mono mb-8">
          <Zap size={14} /> Open for Applications
        </div>
        <h2 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-white mb-6">
          Ready to Join
          <br />
          <span className="glow-text">Datum?</span>
        </h2>
        <p className="text-gray-300 text-lg mb-10 max-w-xl mx-auto">
          Be part of the most passionate data science community on campus. Build real projects, meet industry mentors, and launch your career.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link to="/events" className="btn-primary text-base px-8 py-4 group">
            Apply Now <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link to="/about" className="btn-outline !text-white !border-white/30 hover:!bg-white/10 text-base px-8 py-4">
            Learn More
          </Link>
        </div>
      </div>
    </section>
  )
}

// ── Home Page ─────────────────────────────────────────────────────────────
export default function Home() {
  const { isDark } = useTheme()

  return (
    <div>
      <HeroSection isDark={isDark} />
      <SkillsSection isDark={isDark} />
      <RoadmapSection isDark={isDark} />
      <EventsPreview isDark={isDark} />
      <TestimonialsSection isDark={isDark} />
      <CTASection isDark={isDark} />
    </div>
  )
}