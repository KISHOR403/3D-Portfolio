import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { Check } from 'lucide-react'

function EducationCard({ title, institution, period, status, details, isMobile }) {
  const cardRef = useRef(null)
  const highlightRef = useRef(null)
  const rAFRef = useRef(null)

  const accentColor = 'var(--color-accent-pass)'
  const accentRGB = '74, 222, 154' // signal green

  useEffect(() => {
    const card = cardRef.current
    const highlight = highlightRef.current
    if (!card || isMobile) return

    // Check prefers-reduced-motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    let prefersReducedMotion = mediaQuery.matches
    const handleMediaChange = (e) => {
      prefersReducedMotion = e.matches
    }
    mediaQuery.addEventListener('change', handleMediaChange)

    if (prefersReducedMotion) {
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

        card.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`

        if (highlight) {
          const pctX = (x / rect.width) * 100
          const pctY = (y / rect.height) * 100
          // Light-catch surface highlight
          highlight.style.background = `radial-gradient(circle at ${pctX}% ${pctY}%, rgba(255, 255, 255, 0.06) 0%, transparent 40%)`
        }
      })
    }

    const handleMouseLeave = () => {
      if (rAFRef.current) cancelAnimationFrame(rAFRef.current)

      rAFRef.current = requestAnimationFrame(() => {
        card.style.transform = 'rotateX(0deg) rotateY(0deg)'
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
  }, [isMobile])

  return (
    <div
      style={{
        position: 'relative',
        perspective: '1000px',
        paddingBottom: '12px',
        paddingRight: '12px',
        width: '100%',
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
          borderTop: `2px solid color-mix(in srgb, ${accentColor} 12%, transparent)`,
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
          borderTop: `2px solid color-mix(in srgb, ${accentColor} 25%, transparent)`,
          zIndex: 2,
          pointerEvents: 'none',
        }}
      />

      {/* Front-facing card */}
      <div
        ref={cardRef}
        style={{
          background: 'var(--color-bg-base)',
          border: '1px solid var(--color-border-hairline)',
          borderRadius: '12px',
          padding: '1.5rem',
          borderTop: `2px solid ${accentColor}`,
          boxShadow: `0 -8px 24px rgba(${accentRGB}, 0.12), 0 4px 20px rgba(0, 0, 0, 0.3)`,
          position: 'relative',
          zIndex: 3,
          transformStyle: 'preserve-3d',
          willChange: 'transform',
          transition: 'transform 0.15s ease-out, border-color 0.3s ease, box-shadow 0.3s ease',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.borderColor = accentColor
          e.currentTarget.style.boxShadow = `0 -8px 30px rgba(${accentRGB}, 0.25), 0 8px 32px rgba(0, 0, 0, 0.45)`
        }}
        onMouseLeave={e => {
          e.currentTarget.style.borderColor = 'var(--color-border-hairline)'
          e.currentTarget.style.boxShadow = `0 -8px 24px rgba(${accentRGB}, 0.12), 0 4px 20px rgba(0, 0, 0, 0.3)`
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

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '0.75rem' }}>
          <div>
            <h4 style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.82rem',
              fontWeight: 500,
              color: 'var(--color-text-muted)',
              marginBottom: '0.25rem'
            }}>
              {institution}
            </h4>
            <h3 style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.15rem',
              fontWeight: 600,
              color: 'var(--color-text-primary)'
            }}>
              {title}
            </h3>
          </div>
          <span className="status-badge status-badge--passed" style={{ flexShrink: 0 }}>
            <Check size={10} strokeWidth={3} />
            {status}
          </span>
        </div>

        <p style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.75rem',
          color: 'var(--color-accent-pass)',
          fontWeight: 500,
          marginBottom: details ? '0.75rem' : '0'
        }}>
          {period}
        </p>

        {details && (
          <p style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.875rem',
            lineHeight: 1.6,
            color: 'var(--color-text-muted)',
            borderLeft: '2px solid rgba(74, 222, 154, 0.3)',
            paddingLeft: '0.75rem',
            marginTop: '0.5rem'
          }}>
            {details}
          </p>
        )}
      </div>
    </div>
  )
}

export default function Education() {
  const containerRef = useRef(null)
  const [isMobile, setIsMobile] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    handleResize()
    window.addEventListener('resize', handleResize)

    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(media.matches)
    const listener = (e) => setPrefersReducedMotion(e.matches)
    media.addEventListener('change', listener)

    return () => {
      window.removeEventListener('resize', handleResize)
      media.removeEventListener('change', listener)
    }
  }, [])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center']
  })

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  const activeProgress = prefersReducedMotion ? 1 : smoothProgress

  // Scroll animations for nodes (3 nodes)
  const node1Bg = useTransform(
    activeProgress,
    [0.0, 0.12],
    ['rgba(35, 44, 53, 0.6)', 'var(--color-accent-pass)']
  )
  const node1Shadow = useTransform(
    activeProgress,
    [0.0, 0.12],
    ['0 0 0px rgba(74, 222, 154, 0)', '0 0 10px rgba(74, 222, 154, 0.5)']
  )

  const node2Bg = useTransform(
    activeProgress,
    [0.35, 0.47],
    ['rgba(35, 44, 53, 0.6)', 'var(--color-accent-pass)']
  )
  const node2Shadow = useTransform(
    activeProgress,
    [0.35, 0.47],
    ['0 0 0px rgba(74, 222, 154, 0)', '0 0 10px rgba(74, 222, 154, 0.5)']
  )

  const node3Bg = useTransform(
    activeProgress,
    [0.7, 0.82],
    ['rgba(35, 44, 53, 0.6)', 'var(--color-accent-pass)']
  )
  const node3Shadow = useTransform(
    activeProgress,
    [0.7, 0.82],
    ['0 0 0px rgba(74, 222, 154, 0)', '0 0 10px rgba(74, 222, 154, 0.5)']
  )

  const badgeOpacity = useTransform(activeProgress, [0.88, 0.98], [0, 1])
  const badgeScale = useTransform(activeProgress, [0.88, 0.98], [0.85, 1])
  const badgeY = useTransform(activeProgress, [0.88, 0.98], [10, 0])

  return (
    <section id="environment-setup" style={{ background: 'transparent' }}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
        >
          <p className="section-eyebrow">ENVIRONMENT SETUP</p>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '2rem',
            fontWeight: 600,
            letterSpacing: '-0.02em',
            color: 'var(--color-text-primary)',
            marginBottom: '3.5rem',
          }}>
            Education
          </h2>
        </motion.div>

        <div ref={containerRef} style={{ position: 'relative', maxWidth: '800px', margin: '0 auto' }}>
          {/* Vertical Connecting Line Background */}
          <div style={{
            position: 'absolute',
            left: isMobile ? '20px' : '40px',
            top: '40px',
            bottom: '80px',
            width: '2px',
            background: 'var(--color-border-hairline)',
            zIndex: 1,
          }} />

          {/* Animated Connecting Line Overlay */}
          <motion.div
            style={{
              position: 'absolute',
              left: isMobile ? '20px' : '40px',
              top: '40px',
              bottom: '80px',
              width: '2px',
              background: 'var(--color-accent-pass)',
              scaleY: prefersReducedMotion ? 1 : smoothProgress,
              transformOrigin: 'top center',
              zIndex: 2,
            }}
          />

          {/* Milestone 1 */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '40px 1fr' : '80px 1fr',
            gap: isMobile ? '1rem' : '1.5rem',
            marginBottom: '3.5rem',
            position: 'relative'
          }}>
            {/* Left Node */}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '36px', position: 'relative', zIndex: 3 }}>
              <motion.div
                style={{
                  width: '16px',
                  height: '16px',
                  borderRadius: '50%',
                  background: node1Bg,
                  border: '3px solid var(--color-bg-base)',
                  boxShadow: node1Shadow,
                }}
              />
              {!isMobile && (
                <div style={{
                  position: 'absolute',
                  left: '48px',
                  right: 0,
                  top: '43px',
                  height: '2px',
                  background: 'var(--color-border-hairline)',
                  zIndex: 1,
                }} />
              )}
            </div>
            {/* Right Card */}
            <div>
              <EducationCard
                title="Class 10 (Secondary)"
                institution="Jatiya Vidyalaya — Gogamukh, Assam"
                period="2019 – 2020"
                status="COMPLETED"
                isMobile={isMobile}
              />
            </div>
          </div>

          {/* Milestone 2 */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '40px 1fr' : '80px 1fr',
            gap: isMobile ? '1rem' : '1.5rem',
            marginBottom: '3.5rem',
            position: 'relative'
          }}>
            {/* Left Node */}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '36px', position: 'relative', zIndex: 3 }}>
              <motion.div
                style={{
                  width: '16px',
                  height: '16px',
                  borderRadius: '50%',
                  background: node2Bg,
                  border: '3px solid var(--color-bg-base)',
                  boxShadow: node2Shadow,
                }}
              />
              {!isMobile && (
                <div style={{
                  position: 'absolute',
                  left: '48px',
                  right: 0,
                  top: '43px',
                  height: '2px',
                  background: 'var(--color-border-hairline)',
                  zIndex: 1,
                }} />
              )}
            </div>
            {/* Right Card */}
            <div>
              <EducationCard
                title="Senior Secondary (Science)"
                institution="Resolution Academy — Dhemaji, Assam"
                period="2021 – 2022"
                status="COMPLETED"
                isMobile={isMobile}
              />
            </div>
          </div>

          {/* Milestone 3 */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '40px 1fr' : '80px 1fr',
            gap: isMobile ? '1rem' : '1.5rem',
            marginBottom: '3.5rem',
            position: 'relative'
          }}>
            {/* Left Node */}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '36px', position: 'relative', zIndex: 3 }}>
              <motion.div
                style={{
                  width: '16px',
                  height: '16px',
                  borderRadius: '50%',
                  background: node3Bg,
                  border: '3px solid var(--color-bg-base)',
                  boxShadow: node3Shadow,
                }}
              />
              {!isMobile && (
                <div style={{
                  position: 'absolute',
                  left: '48px',
                  right: 0,
                  top: '43px',
                  height: '2px',
                  background: 'var(--color-border-hairline)',
                  zIndex: 1,
                }} />
              )}
            </div>
            {/* Right Card */}
            <div>
              <EducationCard
                title="B.Tech, Computer Science & Engineering"
                institution="Lovely Professional University — Jalandhar, Punjab"
                period="2022 – 2026"
                status="GRADUATED"
                details="Recently graduated — actively seeking QA/Software Testing roles"
                isMobile={isMobile}
              />
            </div>
          </div>

          {/* Final Stamp: GRADUATED badge */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '40px 1fr' : '80px 1fr',
            gap: isMobile ? '1rem' : '1.5rem',
            position: 'relative'
          }}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative', zIndex: 3 }}>
              {/* Spacer to align with line */}
            </div>
            <div>
              <motion.span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  padding: '0.5rem 1rem',
                  borderRadius: '999px',
                  background: 'rgba(74, 222, 154, 0.12)',
                  color: 'var(--color-accent-pass)',
                  border: '1px solid rgba(74, 222, 154, 0.3)',
                  boxShadow: '0 0 16px rgba(74, 222, 154, 0.15)',
                  opacity: prefersReducedMotion ? 1 : badgeOpacity,
                  scale: prefersReducedMotion ? 1 : badgeScale,
                  y: prefersReducedMotion ? 0 : badgeY,
                  transformOrigin: 'left center',
                }}
              >
                GRADUATED ✓
              </motion.span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
