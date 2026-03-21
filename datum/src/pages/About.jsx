import { useTheme } from '../context/ThemeContext'
import { Target, Lightbulb, Users, Award, Globe2, Flame } from 'lucide-react'
import { STATS } from '../utils/data'

const VALUES = [
  { icon: Lightbulb, title: 'Curiosity First',       desc: 'We ask "why?" before "how?" — fostering deep understanding over surface-level knowledge.', color: 'from-amber-500 to-orange-500' },
  { icon: Users,     title: 'Community Driven',       desc: 'We grow together. Every member is a teacher and a learner at the same time.', color: 'from-blue-500 to-cyan-500' },
  { icon: Award,     title: 'Excellence in Craft',    desc: 'We pursue excellence in everything — from code quality to presentation to communication.', color: 'from-violet-500 to-purple-500' },
  { icon: Globe2,    title: 'Real-World Impact',      desc: 'We build things that matter. Our projects and events are designed to solve real problems.', color: 'from-emerald-500 to-teal-500' },
  { icon: Flame,     title: 'Passion for Data',       desc: 'Data is our superpower. We are obsessed with turning raw information into meaningful insight.', color: 'from-pink-500 to-rose-500' },
  { icon: Target,    title: 'Outcome Focused',        desc: 'Every initiative has a purpose — whether it\'s a new skill, a placement, or a published project.', color: 'from-indigo-500 to-blue-500' },
]

export default function About() {
  const { isDark } = useTheme()

  const bg = isDark ? 'bg-dark-900' : 'bg-light-50'
  const text = isDark ? 'text-white' : 'text-slate-900'
  const sub = isDark ? 'text-gray-400' : 'text-slate-500'
  const card = isDark ? 'bg-dark-500/60 border border-white/5 hover:border-primary-500/30' : 'bg-white border border-slate-200 hover:shadow-lg hover:border-primary-200'

  return (
    <div className={`${bg} min-h-screen`}>

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className={`relative pt-32 pb-20 overflow-hidden ${isDark ? 'bg-dark-800' : 'bg-slate-900'}`}>
        <div className="absolute inset-0 grid-bg opacity-40" />
        <div className="orb w-96 h-96 bg-primary-600/20 top-0 right-0" />
        <div className="orb w-64 h-64 bg-accent-violet/15 bottom-0 left-10" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-mono uppercase tracking-widest text-primary-400 mb-4">About Datum</p>
          <h1 className="font-display font-bold text-5xl md:text-6xl lg:text-7xl text-white mb-6">
            More Than a Club.
            <br />
            <span className="glow-text">A Movement.</span>
          </h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto">
            Datum was founded in 2022 to create a space where students passionate about data science, AI, and technology could learn, build, and grow together.
          </p>
        </div>
      </section>

      {/* ── Vision & Mission ─────────────────────────────────── */}
      <section className={`py-24 ${isDark ? 'bg-dark-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Vision */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary-500/30 bg-primary-500/10 text-primary-400 text-xs font-mono mb-6">
                Chapter I — Vision
              </div>
              <h2 className={`font-display font-bold text-4xl md:text-5xl mb-6 ${text}`}>
                Our <span className="glow-text">Vision</span>
              </h2>
              <p className={`text-lg leading-relaxed mb-6 ${sub}`}>
                To become the most impactful student-led data science community in India — a launchpad for the next generation of data scientists, ML engineers, and AI researchers who are ready to shape the world with data.
              </p>
              <p className={`text-base leading-relaxed ${sub}`}>
                We envision a campus where every student, regardless of their background or major, has access to world-class data science education, mentorship, and real-world project experience.
              </p>

              <div className="flex gap-8 mt-8">
                {[{ v: '300+', l: 'Members' }, { v: '3+', l: 'Years' }, { v: '25+', l: 'Events' }].map(s => (
                  <div key={s.l}>
                    <div className="font-display font-bold text-3xl glow-text">{s.v}</div>
                    <div className={`text-sm ${sub}`}>{s.l}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Vision visual */}
            <div className="relative">
              <div className={`relative rounded-3xl overflow-hidden ${isDark ? 'bg-dark-500/60 border border-white/5' : 'bg-slate-50 border border-slate-200'} p-8`}>
                <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-gradient-to-br from-primary-500/20 to-accent-violet/20 -translate-y-1/2 translate-x-1/2" />
                <div className="grid grid-cols-2 gap-4 relative z-10">
                  {[
                    { label: 'National Reach', icon: '🌍', color: 'from-blue-500/20 to-cyan-500/20 border-blue-500/20' },
                    { label: 'Research Papers', icon: '📄', color: 'from-violet-500/20 to-purple-500/20 border-violet-500/20' },
                    { label: 'Industry Ready', icon: '💼', color: 'from-emerald-500/20 to-teal-500/20 border-emerald-500/20' },
                    { label: 'AI Leadership', icon: '🤖', color: 'from-pink-500/20 to-rose-500/20 border-pink-500/20' },
                  ].map((item) => (
                    <div key={item.label} className={`p-5 rounded-2xl border bg-gradient-to-br ${item.color} text-center`}>
                      <div className="text-3xl mb-2">{item.icon}</div>
                      <p className={`text-sm font-medium ${isDark ? 'text-gray-200' : 'text-slate-700'}`}>{item.label}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 p-4 rounded-2xl bg-gradient-to-r from-primary-500/10 to-accent-violet/10 border border-primary-500/20 text-center">
                  <p className={`font-display font-bold text-lg ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    "Empowering every student with data superpowers"
                  </p>
                </div>
              </div>
              {/* Floating badges */}
              <div className="absolute -bottom-4 -left-4 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-sm font-bold shadow-lg shadow-emerald-500/30 animate-float">
                ✓ 50+ Placements
              </div>
              <div className="absolute -top-4 -right-4 px-4 py-2 rounded-xl bg-gradient-to-r from-violet-500 to-purple-500 text-white text-sm font-bold shadow-lg shadow-violet-500/30 animate-float-slow">
                🏆 Best Club Award
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className={`h-px mb-24 bg-gradient-to-r from-transparent ${isDark ? 'via-white/10' : 'via-slate-200'} to-transparent`} />

          {/* Mission */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Mission visual */}
            <div className="relative order-last lg:order-first">
              <div className={`rounded-3xl overflow-hidden ${isDark ? 'bg-dark-500/60 border border-white/5' : 'bg-slate-50 border border-slate-200'} p-8`}>
                <div className="space-y-3">
                  {[
                    { step: '01', title: 'Learn',   desc: 'Workshops, bootcamps, and reading groups', color: 'bg-blue-500' },
                    { step: '02', title: 'Build',   desc: 'Hackathons, datathons, and real projects', color: 'bg-violet-500' },
                    { step: '03', title: 'Connect', desc: 'Industry talks, mentorship, and networking', color: 'bg-pink-500' },
                    { step: '04', title: 'Lead',    desc: 'Take charge of teams and club initiatives', color: 'bg-emerald-500' },
                    { step: '05', title: 'Impact',  desc: 'Apply data to solve real campus & world problems', color: 'bg-amber-500' },
                  ].map((item) => (
                    <div key={item.step} className={`flex items-center gap-4 p-4 rounded-xl ${isDark ? 'bg-dark-400/60' : 'bg-white border border-slate-100'}`}>
                      <div className={`w-8 h-8 rounded-lg ${item.color} flex items-center justify-center text-white text-xs font-mono font-bold flex-shrink-0`}>
                        {item.step}
                      </div>
                      <div>
                        <p className={`font-display font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>{item.title}</p>
                        <p className={`text-xs ${sub}`}>{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-accent-cyan/30 bg-accent-cyan/10 text-accent-cyan text-xs font-mono mb-6">
                Chapter II — Mission
              </div>
              <h2 className={`font-display font-bold text-4xl md:text-5xl mb-6 ${text}`}>
                Our <span className="bg-gradient-to-r from-accent-cyan to-primary-400 bg-clip-text text-transparent">Mission</span>
              </h2>
              <p className={`text-lg leading-relaxed mb-6 ${sub}`}>
                Our mission is to build a structured pathway for students to go from zero to hero in data science — through hands-on workshops, competitive events, industry exposure, and an incredibly supportive peer community.
              </p>
              <p className={`text-base leading-relaxed ${sub}`}>
                We are committed to being inclusive, accessible, and impactful — ensuring that every student who walks through our doors leaves with more skills, more confidence, and more connections than they came with.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Values ───────────────────────────────────────────── */}
      <section className={`py-24 ${isDark ? 'bg-dark-800' : 'bg-slate-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className={`text-sm font-mono uppercase tracking-widest mb-3 ${isDark ? 'text-primary-400' : 'text-primary-600'}`}>What Drives Us</p>
            <h2 className={`section-title ${text}`}>Our <span className="glow-text">Values</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {VALUES.map((v) => {
              const Icon = v.icon
              return (
                <div key={v.title} className={`p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1 ${card}`}>
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${v.color} flex items-center justify-center mb-4 shadow-lg`}>
                    <Icon size={22} className="text-white" />
                  </div>
                  <h3 className={`font-display font-bold text-lg mb-2 ${text}`}>{v.title}</h3>
                  <p className={`text-sm leading-relaxed ${sub}`}>{v.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Stats Banner ─────────────────────────────────────── */}
      <section className={`py-16 ${isDark ? 'bg-dark-900' : 'bg-slate-900'} relative overflow-hidden`}>
        <div className="orb w-96 h-96 bg-primary-600/15 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((s) => (
              <div key={s.label} className="text-center">
                <div className="font-display font-bold text-4xl md:text-5xl glow-text mb-2">{s.value}</div>
                <div className="text-gray-400 text-sm">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
