import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Download, Menu, X } from 'lucide-react'

const NAV_LINKS = [
  { label: 'TEST PLAN', href: '#test-plan' },
  { label: 'ENVIRONMENT SETUP', href: '#environment-setup' },
  { label: 'COVERAGE REPORT', href: '#coverage-report' },
  { label: 'PIPELINE RUNS', href: '#pipeline-runs' },
  { label: 'QUALITY GATES', href: '#quality-gates' },
  { label: 'DEPLOY', href: '#deploy' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
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
        gap: '2rem',
      }} className="desktop-nav">
        {NAV_LINKS.map(link => (
          <a
            key={link.href}
            href={link.href}
            id={`nav-${link.href.slice(1)}`}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.7rem',
              fontWeight: 500,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--color-text-muted)',
              textDecoration: 'none',
              transition: 'color 0.2s ease',
              padding: '4px 0',
              borderBottom: '1px solid transparent',
            }}
            onMouseEnter={e => {
              e.target.style.color = 'var(--color-text-primary)'
              e.target.style.borderBottomColor = 'var(--color-accent-pass)'
            }}
            onMouseLeave={e => {
              e.target.style.color = 'var(--color-text-muted)'
              e.target.style.borderBottomColor = 'transparent'
            }}
          >
            {link.label}
          </a>
        ))}
      </div>

      {/* Resume button */}
      <a
        href="/Kishor_Gogoi_Resume.pdf"
        download
        id="nav-resume-btn"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.7rem',
          fontWeight: 600,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: 'var(--color-accent-pending)',
          textDecoration: 'none',
          padding: '8px 18px',
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
      </a>

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
            <a
              href="/Kishor_Gogoi_Resume.pdf"
              download
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
                textDecoration: 'none',
                padding: '10px 20px',
                borderRadius: '999px',
                border: '1px solid var(--color-accent-pending)',
                width: 'fit-content',
              }}
            >
              <Download size={12} />
              Resume
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav,
          .resume-btn-desktop {
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
