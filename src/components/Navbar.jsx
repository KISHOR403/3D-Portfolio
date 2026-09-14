import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Download, Menu, X, User } from 'lucide-react'

const NAV_LINKS = [
  { label: 'EXPERIENCE', href: '#experience' },
  { label: 'PROJECTS', href: '#pipeline-runs' },
  { label: 'QA LAB', href: '#qa-lab' },
  { label: 'SKILLS', href: '#coverage-report' },
  { label: 'CERTIFICATIONS', href: '#quality-gates' },
  { label: 'CONTACT', href: '#deploy' },
]

const SECTION_IDS = ['hero', 'experience', 'pipeline-runs', 'qa-lab', 'coverage-report', 'quality-gates', 'deploy']

export default function Navbar({ onOpenResume, onOpenRecruiterView }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40)

      // Determine active section
      let current = ''
      for (const id of SECTION_IDS) {
        const el = document.getElementById(id)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= 200) {
            current = id
          }
        }
      }
      setActiveSection(current)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      id="navbar"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: '0 1.5rem',
        height: '64px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: scrolled ? 'rgba(15, 20, 25, 0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px) saturate(180%)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(35, 44, 53, 0.5)' : '1px solid transparent',
        transition: 'background 0.3s ease, backdrop-filter 0.3s ease, border-color 0.3s ease',
      }}
    >
      {/* Logo / Name */}
      <a
        href="#"
        id="nav-logo"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          textDecoration: 'none',
          color: 'var(--color-text-primary)',
          fontFamily: 'var(--font-display)',
          fontWeight: 600,
          fontSize: '1.1rem',
          letterSpacing: '-0.02em',
        }}
      >
        <span style={{
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          background: 'var(--color-accent-pass)',
          boxShadow: '0 0 8px rgba(74, 222, 154, 0.4)',
          flexShrink: 0,
        }} />
        Kishor Gogoi
      </a>

      {/* Desktop nav links */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '1.75rem',
      }} className="desktop-nav">
        {NAV_LINKS.map(link => {
          const sectionId = link.href.slice(1)
          const isActive = activeSection === sectionId
          return (
            <a
              key={link.href}
              href={link.href}
              id={`nav-${sectionId}`}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.68rem',
                fontWeight: 500,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: isActive ? 'var(--color-text-primary)' : 'var(--color-text-muted)',
                textDecoration: 'none',
                transition: 'color 0.2s ease',
                padding: '4px 0',
                borderBottom: isActive ? '1px solid var(--color-accent-pass)' : '1px solid transparent',
              }}
              onMouseEnter={e => {
                if (!isActive) {
                  e.target.style.color = 'var(--color-text-primary)'
                }
              }}
              onMouseLeave={e => {
                if (!isActive) {
                  e.target.style.color = 'var(--color-text-muted)'
                }
              }}
            >
              {link.label}
            </a>
          )
        })}
      </div>

      {/* Right side actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }} className="desktop-actions">
        {/* Recruiter View button */}
        <button
          onClick={onOpenRecruiterView}
          id="nav-recruiter-btn"
          title="Recruiter Summary"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.68rem',
            fontWeight: 500,
            letterSpacing: '0.06em',
            color: 'var(--color-text-muted)',
            textDecoration: 'none',
            padding: '7px 12px',
            borderRadius: '8px',
            border: '1px solid var(--color-border-hairline)',
            background: 'transparent',
            transition: 'all 0.25s ease',
            cursor: 'pointer',
            whiteSpace: 'nowrap',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = 'rgba(74, 222, 154, 0.3)'
            e.currentTarget.style.color = 'var(--color-text-primary)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = 'var(--color-border-hairline)'
            e.currentTarget.style.color = 'var(--color-text-muted)'
          }}
        >
          <User size={12} />
          Recruiter
        </button>

        {/* Resume button */}
        <button
          onClick={onOpenResume}
          id="nav-resume-btn"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.68rem',
            fontWeight: 600,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'var(--color-accent-pending)',
            textDecoration: 'none',
            padding: '7px 14px',
            borderRadius: '999px',
            border: '1px solid var(--color-accent-pending)',
            background: 'transparent',
            transition: 'all 0.25s ease',
            cursor: 'pointer',
            whiteSpace: 'nowrap',
          }}
          className="resume-btn-desktop"
          onMouseEnter={e => {
            e.currentTarget.style.background = 'rgba(242, 169, 59, 0.12)'
            e.currentTarget.style.boxShadow = '0 0 20px rgba(242, 169, 59, 0.15)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'transparent'
            e.currentTarget.style.boxShadow = 'none'
          }}
        >
          <Download size={12} />
          Resume
        </button>
      </div>

      {/* Mobile hamburger */}
      <button
        id="nav-mobile-toggle"
        className="mobile-menu-btn"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Toggle navigation menu"
        style={{
          display: 'none',
          background: 'none',
          border: 'none',
          color: 'var(--color-text-primary)',
          cursor: 'pointer',
          padding: '8px',
        }}
      >
        {mobileOpen ? <X size={22} /> : <Menu size={22} />}
      </button>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            id="nav-mobile-drawer"
            style={{
              position: 'absolute',
              top: '64px',
              left: 0,
              right: 0,
              background: 'rgba(15, 20, 25, 0.97)',
              backdropFilter: 'blur(20px)',
              borderBottom: '1px solid var(--color-border-hairline)',
              padding: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.25rem',
            }}
          >
            {NAV_LINKS.map(link => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.8rem',
                  fontWeight: 500,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--color-text-muted)',
                  textDecoration: 'none',
                  padding: '6px 0',
                }}
              >
                {link.label}
              </a>
            ))}

            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <button
                onClick={() => {
                  setMobileOpen(false)
                  onOpenRecruiterView()
                }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  fontWeight: 500,
                  color: 'var(--color-text-muted)',
                  background: 'transparent',
                  padding: '10px 16px',
                  borderRadius: '8px',
                  border: '1px solid var(--color-border-hairline)',
                  cursor: 'pointer',
                }}
              >
                <User size={12} />
                Recruiter View
              </button>
              <button
                onClick={() => {
                  setMobileOpen(false)
                  onOpenResume()
                }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: 'var(--color-accent-pending)',
                  background: 'transparent',
                  padding: '10px 20px',
                  borderRadius: '999px',
                  border: '1px solid var(--color-accent-pending)',
                  cursor: 'pointer',
                }}
              >
                <Download size={12} />
                Resume
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 1024px) {
          .desktop-nav {
            display: none !important;
          }
        }
        @media (max-width: 768px) {
          .desktop-nav,
          .resume-btn-desktop,
          .desktop-actions {
            display: none !important;
          }
          .mobile-menu-btn {
            display: block !important;
          }
        }
      `}</style>
    </motion.nav>
  )
}
