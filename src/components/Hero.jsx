import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowDown, Download } from 'lucide-react'
import ConsoleFallback from './ConsoleFallback'

// Synchronous mobile check to avoid layout flash on refresh
const getIsMobile = () => typeof window !== 'undefined' && window.innerWidth < 768

export default function Hero() {
  const [isMobile, setIsMobile] = useState(getIsMobile)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <section
      id="hero"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '100px 1.5rem 3rem',
        position: 'relative',
        overflow: 'visible',
      }}
    >
      {/* Subtle background gradient */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse 60% 50% at 70% 40%, rgba(74, 222, 154, 0.04), transparent)',
        pointerEvents: 'none',
      }} />

      <div style={{
        maxWidth: '1200px',
        width: '100%',
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
        gap: isMobile ? '3rem' : '3rem',
        alignItems: 'center',
      }}>
        {/* Left — Text content */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{ order: isMobile ? 1 : 0 }}
        >
          {/* Status chip */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.7rem',
            fontWeight: 500,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'var(--color-accent-pass)',
            background: 'rgba(74, 222, 154, 0.08)',
            border: '1px solid rgba(74, 222, 154, 0.2)',
            borderRadius: '999px',
            padding: '6px 14px',
            marginBottom: '1.5rem',
          }}>
            <span style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: 'var(--color-accent-pass)',
              boxShadow: '0 0 6px rgba(74, 222, 154, 0.5)',
            }} />
            Open to opportunities
          </div>

          <p className="section-eyebrow" style={{ marginBottom: '0.75rem', fontSize: '0.75rem' }}>
            QA / Software Test Engineer
          </p>

          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: isMobile ? '2.2rem' : '3.2rem',
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: '-0.03em',
            color: 'var(--color-text-primary)',
            marginBottom: '1rem',
          }}>
            Kishor Gogoi
          </h1>

          <p style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.85rem',
            fontWeight: 500,
            letterSpacing: '0.04em',
            color: 'var(--color-text-muted)',
            marginBottom: '1.25rem',
          }}>
            QA Engineer — Manual & Automation Testing
          </p>

          <p style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '1rem',
            lineHeight: 1.7,
            color: 'var(--color-text-muted)',
            marginBottom: '2rem',
            maxWidth: '480px',
          }}>
            Building reliable software through systematic testing, automation frameworks, and CI/CD pipeline integration. Based in Bengaluru.
          </p>

          {/* CTAs */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1rem',
            alignItems: 'center',
          }}>
            <a
              href="#pipeline-runs"
              id="hero-cta-projects"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                fontWeight: 600,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                color: 'var(--color-bg-base)',
                background: 'var(--color-accent-pass)',
                textDecoration: 'none',
                padding: '12px 24px',
                borderRadius: '999px',
                transition: 'all 0.25s ease',
                boxShadow: '0 0 20px rgba(74, 222, 154, 0.2)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.boxShadow = '0 0 30px rgba(74, 222, 154, 0.35)'
                e.currentTarget.style.transform = 'translateY(-1px)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.boxShadow = '0 0 20px rgba(74, 222, 154, 0.2)'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              <ArrowDown size={13} />
              View Pipeline Runs
            </a>

            <a
              href="/Kishor_Gogoi_Resume.pdf"
              download
              id="hero-cta-resume"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                fontWeight: 600,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                color: 'var(--color-text-primary)',
                background: 'transparent',
                textDecoration: 'none',
                padding: '12px 24px',
                borderRadius: '999px',
                border: '1px solid var(--color-border-hairline)',
                transition: 'all 0.25s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'var(--color-text-muted)'
                e.currentTarget.style.transform = 'translateY(-1px)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'var(--color-border-hairline)'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              <Download size={13} />
              Download Resume
            </a>
          </div>
        </motion.div>

        {/* Right — Console Fallback */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          style={{
            height: isMobile ? '400px' : '560px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            order: isMobile ? 2 : 1,
            overflow: 'visible',
          }}
        >
          <ConsoleFallback />
        </motion.div>
      </div>
    </section>
  )
}
