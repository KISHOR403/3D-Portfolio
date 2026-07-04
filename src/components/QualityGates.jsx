import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Check, ExternalLink } from 'lucide-react'

const ACCENT_COLOR = 'var(--color-accent-pass)'
const ACCENT_RGB = '74, 222, 154'

const CERTIFICATIONS = [
  {
    name: 'SAP Certified Project Manager – SAP Activate & Agile Implementation',
    issuer: 'SAP',
    year: '2026',
    pdf: '/certificates/sap-project-manager.pdf',
  },
  {
    name: 'Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate',
    issuer: 'Oracle',
    year: '2025',
    pdf: '/certificates/oracle-ai-foundations.pdf',
  },
  {
    name: 'Oracle Data Platform 2025 Certified Foundations Associate',
    issuer: 'Oracle',
    year: '2025',
    pdf: '/certificates/oracle-data-platform.pdf',
  },
  {
    name: 'Oracle Cloud Infrastructure 2025 Certified DevOps Professional',
    issuer: 'Oracle',
    year: '2025',
    pdf: '/certificates/oracle-devops-professional.pdf',
  },
  {
    name: 'Software Testing and Automation Specialization',
    issuer: 'Coursera',
    year: '2025',
  },
  {
    name: 'Web and Mobile Testing with Selenium',
    issuer: 'Coursera',
    year: '2025',
  },
  {
    name: 'IBM DevOps and Software Engineering',
    issuer: 'Coursera / IBM',
    year: '2025',
    pdf: '/certificates/ibm-devops-engineering.pdf',
  },
  {
    name: 'Claude 101 — Certificate of Completion',
    issuer: 'Anthropic',
    year: '2025',
    pdf: '/certificates/anthropic-claude-101.pdf',
  },
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
}

function CertCard({ cert, index }) {
  const cardRef = useRef(null)
  const highlightRef = useRef(null)
  const rAFRef = useRef(null)

  useEffect(() => {
    const card = cardRef.current
    const highlight = highlightRef.current
    if (!card) return

    // Check prefers-reduced-motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    let prefersReducedMotion = mediaQuery.matches
    const handleMediaChange = (e) => {
      prefersReducedMotion = e.matches
    }
    mediaQuery.addEventListener('change', handleMediaChange)

    // Check touch device
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0

    if (prefersReducedMotion || isTouch) {
      return () => {
        mediaQuery.removeEventListener('change', handleMediaChange)
      }
    }

    const handleMouseMove = (e) => {
      if (rAFRef.current) cancelAnimationFrame(rAFRef.current)

      rAFRef.current = requestAnimationFrame(() => {
        const rect = card.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top

        const centerX = rect.width / 2
        const centerY = rect.height / 2

        // Cursor-reactive tilt: clamped to max of ~5.5 degrees
        const tiltX = ((centerY - y) / centerY) * 5.5
        const tiltY = ((x - centerX) / centerX) * 5.5

        card.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-4px)`

        if (highlight) {
          const pctX = (x / rect.width) * 100
          const pctY = (y / rect.height) * 100
          highlight.style.background = `radial-gradient(circle at ${pctX}% ${pctY}%, rgba(255, 255, 255, 0.06) 0%, transparent 40%)`
        }
      })
    }

    const handleMouseLeave = () => {
      if (rAFRef.current) cancelAnimationFrame(rAFRef.current)

      rAFRef.current = requestAnimationFrame(() => {
        card.style.transform = 'rotateX(0deg) rotateY(0deg) translateY(0px)'
        if (highlight) {
          highlight.style.background = 'transparent'
        }
      })
    }

    card.addEventListener('mousemove', handleMouseMove)
    card.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      if (rAFRef.current) cancelAnimationFrame(rAFRef.current)
      mediaQuery.removeEventListener('change', handleMediaChange)
      card.removeEventListener('mousemove', handleMouseMove)
      card.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [index])

  return (
    <div
      style={{
        position: 'relative',
        perspective: '1000px',
        paddingBottom: '12px',
        paddingRight: '12px',
      }}
    >
      {/* Ghost Layer 2 (12px offset) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          transform: 'translate(12px, 12px)',
          background: 'var(--color-bg-base)',
          border: '1px solid var(--color-border-hairline)',
          borderRadius: '12px',
          borderTop: `2px solid color-mix(in srgb, ${ACCENT_COLOR} 12%, transparent)`,
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />

      {/* Ghost Layer 1 (6px offset) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          transform: 'translate(6px, 6px)',
          background: 'var(--color-bg-base)',
          border: '1px solid var(--color-border-hairline)',
          borderRadius: '12px',
          borderTop: `2px solid color-mix(in srgb, ${ACCENT_COLOR} 25%, transparent)`,
          zIndex: 2,
          pointerEvents: 'none',
        }}
      />

      {/* Front-facing card */}
      <motion.div
        ref={cardRef}
        variants={cardVariants}
        style={{
          background: 'var(--color-bg-base)',
          border: '1px solid var(--color-border-hairline)',
          borderRadius: '12px',
          padding: '1.5rem',
          borderTop: `2px solid ${ACCENT_COLOR}`,
          boxShadow: `0 -8px 24px rgba(${ACCENT_RGB}, 0.12), 0 4px 20px rgba(0, 0, 0, 0.3)`,
          position: 'relative',
          zIndex: 3,
          transformStyle: 'preserve-3d',
          willChange: 'transform',
          transition: 'transform 0.15s ease-out, border-color 0.3s ease, box-shadow 0.3s ease',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          minHeight: '160px',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.borderColor = ACCENT_COLOR
          e.currentTarget.style.boxShadow = `0 -8px 30px rgba(${ACCENT_RGB}, 0.25), 0 8px 32px rgba(0, 0, 0, 0.45)`
        }}
        onMouseLeave={e => {
          e.currentTarget.style.borderColor = 'var(--color-border-hairline)'
          e.currentTarget.style.boxShadow = `0 -8px 24px rgba(${ACCENT_RGB}, 0.12), 0 4px 20px rgba(0, 0, 0, 0.3)`
        }}
      >
        {/* Light-catch surface highlight */}
        <div
          ref={highlightRef}
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '12px',
            pointerEvents: 'none',
            zIndex: 5,
            transition: 'background 0.15s ease-out',
          }}
        />

        {/* Card content */}
        <div>
          {/* Cert name */}
          <h3
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '0.95rem',
              fontWeight: 500,
              color: 'var(--color-text-primary)',
              lineHeight: 1.45,
              marginBottom: '0.625rem',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {cert.name}
          </h3>

          {/* Issuer + year */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              flexWrap: 'wrap',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.7rem',
                color: 'var(--color-text-muted)',
                letterSpacing: '0.04em',
              }}
            >
              {cert.issuer}
            </span>
            <span
              style={{
                width: '3px',
                height: '3px',
                borderRadius: '50%',
                background: 'var(--color-text-muted)',
                opacity: 0.4,
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.7rem',
                color: 'var(--color-text-muted)',
                letterSpacing: '0.04em',
              }}
            >
              {cert.year}
            </span>
          </div>
        </div>

        {/* Bottom row: View link + Passed badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: '1.25rem',
          }}
        >
          {/* View certificate link */}
          {cert.pdf ? (
            <a
              href={cert.pdf}
              target="_blank"
              rel="noopener noreferrer"
              id={`cert-view-${index}`}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.6rem',
                fontWeight: 500,
                color: ACCENT_COLOR,
                textDecoration: 'none',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                transition: 'opacity 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.opacity = '0.7'}
              onMouseLeave={e => e.currentTarget.style.opacity = '1'}
              onClick={e => e.stopPropagation()}
            >
              <ExternalLink size={9} />
              View Certificate
            </a>
          ) : (
            <span />
          )}

          {/* Passed badge */}
          <span className="status-badge status-badge--passed" style={{
            padding: '0.25rem 0.625rem',
            fontSize: '0.6rem',
          }}>
            <Check size={10} strokeWidth={3} />
            Passed
          </span>
        </div>
      </motion.div>
    </div>
  )
}

export default function QualityGates() {
  return (
    <section id="quality-gates" style={{ background: 'rgba(22, 29, 36, 0.75)', backdropFilter: 'blur(10px)' }}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
        >
          <p className="section-eyebrow">Quality Gates Passed</p>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '2rem',
            fontWeight: 600,
            letterSpacing: '-0.02em',
            color: 'var(--color-text-primary)',
            marginBottom: '3rem',
          }}>
            Certifications
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))',
            gap: '1.75rem',
          }}
        >
          {CERTIFICATIONS.map((cert, i) => (
            <CertCard key={i} cert={cert} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
