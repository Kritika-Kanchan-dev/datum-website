import { Link } from 'react-router-dom'
import { Database, Twitter, Instagram, Linkedin, Github, Youtube, Mail } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'

const LINKS = {
  Club: [
    { label: 'About', path: '/about' },
    { label: 'Team', path: '/team' },
    { label: 'Events', path: '/events' },
    { label: 'Gallery', path: '/gallery' },
  ],
  Community: [
    { label: 'Join Datum', path: '/events' },
    { label: 'Workshops', path: '/events' },
    { label: 'DataThon', path: '/events' },
    { label: 'Blog', path: '#' },
  ],
  Contact: [
    { label: 'datum@college.edu', path: 'mailto:datum@college.edu' },
    { label: 'Instagram', path: '#' },
    { label: 'LinkedIn', path: '#' },
    { label: 'GitHub', path: '#' },
  ],
}

const SOCIALS = [
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Github, href: '#', label: 'GitHub' },
  { icon: Youtube, href: '#', label: 'YouTube' },
  { icon: Mail, href: 'mailto:datum@college.edu', label: 'Email' },
]

export default function Footer() {
  const { isDark } = useTheme()

  return (
    <footer className={`relative overflow-hidden border-t ${isDark ? 'bg-dark-800 border-white/5' : 'bg-slate-900 border-slate-700'}`}>
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="orb w-96 h-96 bg-primary-500/10 -top-48 left-1/4" />
        <div className="orb w-64 h-64 bg-accent-violet/10 -bottom-32 right-1/4" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">

          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <img
                src="/logo.png"
                alt="Datum Logo"
                className="h-9 w-auto object-contain"
              />
              <span className="font-display font-bold text-xl text-white">Datum</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs mb-6">
              The Data Science Club — empowering students to harness the power of data, AI, and technology to build the future.
            </p>
            <div className="flex items-center gap-3">
              {SOCIALS.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-white/5 hover:bg-primary-500/20 hover:text-primary-400 flex items-center justify-center text-gray-400 transition-all duration-200"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(LINKS).map(([section, items]) => (
            <div key={section}>
              <h4 className="font-display font-semibold text-white mb-4 text-sm">{section}</h4>
              <ul className="space-y-2.5">
                {items.map(item => (
                  <li key={item.label}>
                    <Link
                      to={item.path}
                      className="text-gray-400 hover:text-primary-400 text-sm transition-colors duration-200"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Datum — Data Science Club. All rights reserved.
          </p>
          <p className="text-gray-600 text-xs font-mono">
            Built with ❤️ by the Datum Tech Team
          </p>
        </div>
      </div>
    </footer>
  )
}
