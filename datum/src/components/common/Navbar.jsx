import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Sun, Moon, Database } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'

const NAV_LINKS = [
  { label: 'Home',    path: '/' },
  { label: 'About',  path: '/about' },
  { label: 'Team',   path: '/team' },
  { label: 'Events', path: '/events' },
  { label: 'Gallery',path: '/gallery' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { isDark, toggle } = useTheme()
  const location = useLocation()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    // Check immediately on mount so non-hero pages start with solid bg
    handler()
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  // Re-check scroll position whenever route changes
  useEffect(() => {
    setOpen(false)
    setScrolled(window.scrollY > 20)
  }, [location])

  // Both themes: transparent on hero, solid on scroll
  const navBg = isDark
    ? scrolled
      ? 'bg-dark-800/90 backdrop-blur-xl border-b border-white/5'
      : 'bg-transparent'
    : scrolled
      ? 'bg-white/95 backdrop-blur-xl border-b border-slate-200/80 shadow-sm'
      : 'bg-transparent'

  // In light mode, text should be white when over dark hero (not scrolled)
  const linkColor = (!isDark && !scrolled)
    ? 'text-white/90 hover:text-white'
    : isDark
      ? 'text-gray-400 hover:text-white'
      : 'text-slate-600 hover:text-slate-900'

  const logoColor = (!isDark && !scrolled) ? 'text-white' : isDark ? 'text-white' : 'text-slate-900'

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBg}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <img
              src="/logo.png"
              alt="Datum Logo"
              className="h-9 w-auto object-contain"
            />
            <span className={`font-display font-bold text-xl tracking-tight transition-colors duration-300 ${logoColor}`}>
              Datum
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(link => {
              const active = location.pathname === link.path
              const activeColor = (!isDark && !scrolled) ? 'text-white' : isDark ? 'text-primary-400' : 'text-primary-600'
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative px-4 py-2 rounded-lg font-body font-medium text-sm transition-all duration-200
                    ${active ? activeColor : linkColor}`}
                >
                  {active && (
                    <span className={`absolute inset-0 rounded-lg ${(!isDark && !scrolled) ? 'bg-white/15' : 'bg-primary-500/10'}`} />
                  )}
                  {link.label}
                  {active && (
                    <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full ${(!isDark && !scrolled) ? 'bg-white' : 'bg-primary-500'}`} />
                  )}
                </Link>
              )
            })}
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggle}
              className={`p-2 rounded-lg transition-colors ${(!isDark && !scrolled) ? 'text-white/80 hover:text-white hover:bg-white/10' : isDark ? 'text-gray-400 hover:text-white hover:bg-white/10' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'}`}
              aria-label="Toggle theme"
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <Link
              to="/admin"
              className="hidden md:flex btn-primary !py-2 !px-4 text-sm"
            >
              Admin
            </Link>
            <button
              onClick={() => setOpen(!open)}
              className={`md:hidden p-2 rounded-lg ${(!isDark && !scrolled) ? 'text-white hover:bg-white/10' : isDark ? 'text-gray-300 hover:bg-white/10' : 'text-slate-600 hover:bg-slate-100'}`}
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className={`md:hidden border-t ${isDark ? 'bg-dark-800/95 backdrop-blur-xl border-white/5' : 'bg-white/95 backdrop-blur-xl border-slate-200'}`}>
          <div className="px-4 py-4 flex flex-col gap-1">
            {NAV_LINKS.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-3 rounded-xl font-body font-medium transition-all
                  ${location.pathname === link.path
                    ? isDark ? 'bg-primary-500/15 text-primary-400' : 'bg-primary-50 text-primary-600'
                    : isDark ? 'text-gray-300 hover:bg-white/5' : 'text-slate-700 hover:bg-slate-50'
                  }`}
              >
                {link.label}
              </Link>
            ))}
            <Link to="/admin" className="btn-primary mt-2 justify-center">Admin Portal</Link>
          </div>
        </div>
      )}
    </nav>
  )
}