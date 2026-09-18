import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowDown, Download, ArrowUpRight } from 'lucide-react'
import ConsoleFallback from './ConsoleFallback'

const getIsMobile = () => typeof window !== 'undefined' && window.innerWidth < 1024

const heroContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
}

const heroChildVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
}

export default function Hero({ onOpenResume }) {
  const [isMobile, setIsMobile] = useState(getIsMobile)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <section
      id="hero"
      style={{
        minHeight: 'calc(100vh - 72px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: isMobile ? '120px 1.5rem 4rem' : '130px 2.5rem 5rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle atmospheric ambient glow */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          left: '10%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(74, 222, 154, 0.05) 0%, transparent 70%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          maxWidth: '1240px',
          width: '100%',
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1.15fr 0.85fr',
          gap: isMobile ? '3.5rem' : '3.5rem',
          alignItems: 'center',
        }}
      >
        {/* Left Column — Staggered Entrance on Mount */}
        <motion.div
          variants={heroContainerVariants}
          initial="hidden"
          animate="visible"
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}
        >
          {/* Exactly 2 Badges Above Headline */}
          <motion.div
            variants={heroChildVariants}
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '10px',
              alignItems: 'center',
              marginBottom: '1.75rem',
            }}
          >
            {/* Badge 1: Status */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--font-size-small)',
                fontWeight: 'var(--font-weight-small)',
                letterSpacing: 'var(--letter-spacing-small)',
                textTransform: 'uppercase',
                color: '#4ADE9A',
                background: 'rgba(74, 222, 154, 0.08)',
                border: '1px solid rgba(74, 222, 154, 0.22)',
                borderRadius: '999px',
                padding: '6px 14px',
              }}
            >
              <span
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: '#4ADE9A',
                  boxShadow: '0 0 8px rgba(74, 222, 154, 0.8)',
                }}
              />
              Available for Roles
            </div>

            {/* Badge 2: Location / Discipline */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--font-size-small)',
                fontWeight: 'var(--font-weight-small)',
                letterSpacing: '0.04em',
                color: 'var(--color-text-muted)',
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid var(--color-border-hairline)',
                borderRadius: '999px',
                padding: '6px 14px',
              }}
            >
              Bengaluru, IN · Full-Stack & QA
            </div>
          </motion.div>

          {/* Dominate H1 — Strict 96-120px Scale (48px mobile, line-height 0.95, weight 800) */}
          <motion.h1
            variants={heroChildVariants}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: isMobile ? '48px' : 'clamp(96px, 7.8vw, 118px)',
              fontWeight: 800,
              lineHeight: 0.95,
              letterSpacing: '-0.045em',
              color: '#F8FAFC',
              marginBottom: '1.25rem',
              textWrap: 'balance',
            }}
          >
            <span className="t-shimmer" data-text="Kishor Gogoi">
              Kishor Gogoi
            </span>
          </motion.h1>

          {/* Clean Subtitle Line */}
          <motion.p
            variants={heroChildVariants}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: isMobile ? '1rem' : '1.25rem',
              fontWeight: 500,
              letterSpacing: '0.02em',
              color: '#4ADE9A',
              marginBottom: '1.25rem',
            }}
          >
            Full Stack Developer &amp; QA Automation Engineer
          </motion.p>

          {/* Disciplined Editorial Body — Strict 16px, line-height 1.65 */}
          <motion.p
            variants={heroChildVariants}
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'var(--font-size-body)',
              lineHeight: 'var(--line-height-body)',
              letterSpacing: '0.01em',
              color: '#94A3B8',
              maxWidth: '520px',
              marginBottom: '2.5rem',
            }}
          >
            Designing resilient full-stack architectures and enterprise test frameworks — eliminating regression cycles and shipping bug-free web applications.
          </motion.p>

          {/* Action CTAs — Staggered & Micro-Interactions */}
          <motion.div
            variants={heroChildVariants}
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1rem',
              alignItems: 'center',
            }}
          >
            {/* Primary Action */}
            <motion.a
              href="#pipeline-runs"
              id="hero-cta-projects"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.78rem',
                fontWeight: 600,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                color: '#0A0E13',
                background: '#4ADE9A',
                textDecoration: 'none',
                padding: '14px 28px',
                borderRadius: '999px',
                boxShadow: '0 0 25px rgba(74, 222, 154, 0.25)',
              }}
            >
              <span>Explore Projects</span>
              <ArrowDown size={14} />
            </motion.a>

            {/* Secondary Action */}
            <motion.button
              onClick={onOpenResume}
              id="hero-cta-resume"
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.78rem',
                fontWeight: 600,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                color: 'var(--color-text-primary)',
                background: 'rgba(255, 255, 255, 0.03)',
                padding: '14px 26px',
                borderRadius: '999px',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                cursor: 'pointer',
              }}
            >
              <Download size={14} />
              <span>Resume Library</span>
            </motion.button>

            {/* Tertiary Link */}
            <motion.a
              href="#deploy"
              id="hero-cta-contact"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                fontWeight: 500,
                letterSpacing: '0.04em',
                color: 'var(--color-text-muted)',
                textDecoration: 'none',
                padding: '12px 14px',
              }}
            >
              <span>Get in touch</span>
              <ArrowUpRight size={13} />
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Right Column — Typewriter Terminal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: isMobile ? 'flex-start' : 'center',
            width: '100%',
          }}
        >
          <ConsoleFallback />
        </motion.div>
      </div>
    </section>
  )
}
