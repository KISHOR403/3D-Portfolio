import { useState, useRef, useEffect } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  useMotionValue,
  useSpring,
  useMotionValueEvent,
} from 'motion/react'
import {
  Globe,
  Grid,
  Sparkle,
  SlidersHorizontal
} from 'lucide-react'
import EarthSkillsCanvas, { SmartSkillIcon, RAW_SKILLS } from './EarthSkillsCanvas'

/* ═══════════════════════════════════════════════════════════════
   SKILL DATA
   ═══════════════════════════════════════════════════════════════ */

const ACCENT_COLORS = ['var(--color-accent-pass)', 'var(--color-accent-pending)', 'var(--color-accent-fail)']
const ACCENT_RGBS = ['74, 222, 154', '242, 169, 59', '232, 97, 92']

const SKILL_CATEGORIES = [
  { title: 'Languages & Querying', skills: ['Java', 'JavaScript', 'SQL', 'PostgreSQL', 'HTML', 'CSS'] },
  { title: 'Full Stack Development', skills: ['Spring Boot', 'Next.js', 'React', 'Node.js', 'Express.js', 'MongoDB', 'Redux', 'Tailwind CSS', 'REST APIs'] },
  { title: 'Automation Tools & Frameworks', skills: ['Selenium WebDriver', 'Appium', 'TestNG', 'JUnit', 'REST Assured', 'Postman'] },
  { title: 'Testing Skills & Methodologies', skills: ['Manual Testing', 'Agile (Scrum)', 'SDLC', 'STLC', 'API Testing & Automation', 'Mobile Testing', 'Test Case Design', 'Bug Tracking & Debugging', 'Defect Life Cycle', 'Regression Testing'] },
  { title: 'Content Creation & Design', skills: ['Technical Writing', 'Video Editing', 'Canva', 'Figma', 'Social Media Content'] },
  { title: 'Developer Tools', skills: ['Git', 'GitHub', 'Jira', 'TestRail', 'Jenkins', 'GitHub Actions'] },
  { title: 'Design Patterns', skills: ['Page Object Model (POM)', 'Data-Driven Testing', 'CI/CD Integration'] },
]

const CATEGORY_FILTERS = [
  'All', 'Languages & Querying', 'Full Stack Development',
  'Automation Tools & Frameworks', 'Testing Skills & Methodologies',
  'Developer Tools', 'Content Creation & Design'
]

const FEATURED_SKILLS = RAW_SKILLS.filter((s) => s.featured)

/* ═══════════════════════════════════════════════════════════════
/* ═══════════════════════════════════════════════════════════════
   SCATTER LAYOUTS — 20 non-overlapping constellation positions
   carefully framing the center headline on Desktop & Mobile
   ═══════════════════════════════════════════════════════════════ */

const DESKTOP_CONSTELLATION = [
  // Top arc (above center headline)
  { id: 'java',         x: -30, y: -34, rot: -3 },
  { id: 'springboot',   x: -15, y: -37, rot:  2 },
  { id: 'nextjs',       x:   0, y: -39, rot: -1 },
  { id: 'js',           x:  15, y: -37, rot:  3 },
  { id: 'react',        x:  30, y: -34, rot: -2 },

  // Right flank (right of headline)
  { id: 'node',         x:  32, y: -20, rot:  2 },
  { id: 'sql',          x:  38, y:  -8, rot: -3 },
  { id: 'mongo',        x:  34, y:   5, rot:  2 },
  { id: 'tailwind',     x:  39, y:  17, rot: -2 },
  { id: 'restapi',      x:  30, y:  27, rot:  3 },

  // Bottom arc (below center headline)
  { id: 'selenium',     x:  15, y:  37, rot: -2 },
  { id: 'appium',       x:   0, y:  39, rot:  1 },
  { id: 'testng',       x: -15, y:  37, rot: -3 },
  { id: 'restassured',  x: -30, y:  34, rot:  2 },

  // Left flank (left of headline)
  { id: 'manual',       x: -30, y:  27, rot: -2 },
  { id: 'agile',        x: -39, y:  17, rot:  3 },
  { id: 'git',          x: -34, y:   5, rot: -2 },
  { id: 'jira',         x: -38, y:  -8, rot:  2 },
  { id: 'jenkins',      x: -32, y: -20, rot: -3 },
  { id: 'cicd',         x: -42, y:   0, rot:  1 },
]

const MOBILE_CONSTELLATION = [
  // Row 1 (top-most arc, above headline)
  { id: 'nextjs',       x:   0, y: -37, rot: 0 },
  { id: 'springboot',   x: -24, y: -33, rot: -2 },
  { id: 'js',           x:  24, y: -33, rot:  2 },

  // Row 2 (upper flank, above headline)
  { id: 'java',         x: -28, y: -22, rot: -2 },
  { id: 'jenkins',      x: -10, y: -16, rot:  1 },
  { id: 'node',         x:  10, y: -16, rot: -1 },
  { id: 'react',        x:  28, y: -22, rot:  2 },

  // Side flanks (strictly outside center headline)
  { id: 'jira',         x: -34, y:  -6, rot: -2 },
  { id: 'git',          x: -35, y:   5, rot:  1 },
  { id: 'agile',        x: -34, y:  15, rot: -2 },

  { id: 'sql',          x:  34, y:  -6, rot:  2 },
  { id: 'mongo',        x:  35, y:   5, rot: -1 },
  { id: 'tailwind',     x:  34, y:  15, rot:  2 },

  // Row 3 (lower flank, below headline)
  { id: 'cicd',         x: -28, y:  24, rot:  2 },
  { id: 'manual',       x: -10, y:  28, rot: -1 },
  { id: 'selenium',     x:  10, y:  28, rot:  1 },
  { id: 'restapi',      x:  28, y:  24, rot: -2 },

  // Row 4 (bottom-most arc, below headline)
  { id: 'restassured',  x: -24, y:  36, rot: -2 },
  { id: 'appium',       x:   0, y:  38, rot:  0 },
  { id: 'testng',       x:  24, y:  36, rot:  2 },
]

function generateScatterCards(skills) {
  return skills.map((skill, i) => {
    const dLayout = DESKTOP_CONSTELLATION.find((l) => l.id === skill.id) || {
      x: (i % 2 === 0 ? -1 : 1) * (26 + (i % 5) * 3),
      y: -30 + (i * 3.5),
      rot: (i % 2 === 0 ? 2 : -2),
    }

    const mLayout = MOBILE_CONSTELLATION.find((l) => l.id === skill.id) || dLayout

    return {
      skill,
      target: { x: dLayout.x, y: dLayout.y, rot: dLayout.rot, scale: 0.95 },
      mobileTarget: { x: mLayout.x, y: mLayout.y, rot: mLayout.rot, scale: 0.78 },
      z: 2 + i,
    }
  })
}

const SCATTER_CARDS = generateScatterCards(FEATURED_SKILLS)

/* ═══════════════════════════════════════════════════════════════
   SCROLL SCATTER MECHANICS
   ═══════════════════════════════════════════════════════════════ */

const SCATTER_START = 0.08
const SCATTER_END = 0.85

const PARALLAX_X = 2.0
const PARALLAX_Y = 1.6
const PARALLAX_SPRING = { stiffness: 90, damping: 22, mass: 0.6 }
const parallaxDepth = (i, total) =>
  total <= 1 ? 1 : 0.5 + (i / (total - 1)) * 0.8

function useResponsive() {
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth
      setIsMobile(w < 768)
      setIsTablet(w >= 768 && w < 1024)
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  return { isMobile, isTablet, small: isMobile }
}

function usePointerParallax(active, enabled) {
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const x = useSpring(rawX, PARALLAX_SPRING)
  const y = useSpring(rawY, PARALLAX_SPRING)

  useEffect(() => {
    if (!enabled) return
    if (!active) { rawX.set(0); rawY.set(0); return }
    const onMove = (e) => {
      rawX.set((e.clientX / window.innerWidth) * 2 - 1)
      rawY.set((e.clientY / window.innerHeight) * 2 - 1)
    }
    const onLeave = () => { rawX.set(0); rawY.set(0) }
    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('pointerleave', onLeave)
    return () => {
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerleave', onLeave)
    }
  }, [active, enabled, rawX, rawY])

  return { x, y }
}

/* ═══════════════════════════════════════════════════════════════
   SKILL CHIP — glassmorphic badge with icon and glowing hover
   ═══════════════════════════════════════════════════════════════ */

function SkillChip({ skill, isMobile }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: isMobile ? '0.35rem' : '0.5rem',
        padding: isMobile ? '0.28rem 0.60rem' : '0.45rem 0.95rem',
        borderRadius: '999px',
        background: hovered
          ? `color-mix(in srgb, ${skill.color} 18%, rgba(18, 24, 32, 0.95))`
          : 'linear-gradient(135deg, rgba(22, 29, 36, 0.94), rgba(15, 20, 25, 0.90))',
        backdropFilter: 'blur(12px)',
        border: `1px solid ${hovered ? skill.color : `${skill.color}45`}`,
        boxShadow: hovered
          ? `0 6px 28px rgba(0,0,0,0.6), 0 0 22px ${skill.color}55, inset 0 1px 0 rgba(255,255,255,0.12)`
          : `0 4px 16px rgba(0,0,0,0.45), 0 0 10px ${skill.color}15, inset 0 1px 0 rgba(255,255,255,0.06)`,
        color: hovered ? '#FFFFFF' : '#E8EAED',
        fontFamily: 'var(--font-mono)',
        fontSize: isMobile ? '0.68rem' : '0.80rem',
        fontWeight: 600,
        whiteSpace: 'nowrap',
        userSelect: 'none',
        cursor: 'default',
        transform: hovered ? 'scale(1.08) translateY(-2px)' : 'scale(1)',
        transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      <SmartSkillIcon name={skill.name} size={isMobile ? 12 : 15} />
      <span style={{ letterSpacing: '0.02em' }}>{skill.name}</span>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════
   SCATTER CARD — bursts from shrinking Earth into constellation
   ═══════════════════════════════════════════════════════════════ */

function ScatterCard({ card, progress, reduce, isMobile, pointer, depth }) {
  const { skill, target, mobileTarget } = card
  const flat = reduce === true

  const activeTarget = isMobile ? mobileTarget : target
  const endX = activeTarget.x
  const endY = activeTarget.y
  const endRotate = flat || isMobile ? 0 : activeTarget.rot
  const restScale = isMobile ? 0.78 : 0.95

  // Timing:
  // p < 0.12: Earth is full size, chips completely hidden (opacity 0, scale 0.1)
  // p: 0.12 -> 0.72: Earth shrinks and fades away, chips blossom outward into place
  // p > 0.72: Settled in constellation with subtle parallax
  const opacity = useTransform(progress, [0, 0.12, 0.38, 1], [0, 0, 1, 1])
  const scale = useTransform(progress, [0, 0.12, 0.52, 1], [0.1, 0.1, restScale, restScale])
  const rotate = useTransform(progress, [0, 0.12, 0.75, 1], [0, 0, endRotate, endRotate])

  const translate = useTransform(
    [progress, pointer.x, pointer.y],
    ([p, px, py]) => {
      // normalized burst progress: 0 at p <= 0.12, 1 at p >= 0.75
      const sp = Math.max(0, Math.min(1, (p - 0.12) / 0.63))
      // ease-out-cubic for smooth explosive deceleration
      const ease = 1 - Math.pow(1 - sp, 3)
      const tx = endX * ease
      const ty = endY * ease
      const drift = isMobile ? 0 : depth * ease
      const dx = tx - px * PARALLAX_X * drift
      const dy = ty - py * PARALLAX_Y * drift
      return `calc(-50% + ${dx}vw) calc(-50% + ${dy}vh)`
    }
  )

  return (
    <motion.div
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        translate,
        rotate,
        scale,
        opacity,
        zIndex: card.z ?? 1,
        pointerEvents: 'auto',
        willChange: 'transform, opacity',
      }}
    >
      <SkillChip skill={skill} isMobile={isMobile} />
    </motion.div>
  )
}

/* ═══════════════════════════════════════════════════════════════
   SPHERE SCATTER VIEW — 3D Earth runs, shrinks on scroll, skills scatter
   ═══════════════════════════════════════════════════════════════ */

function SphereScatterView({ isSectionVisible, activeCategory, hoveredSkillId, setHoveredSkillId, orbitDensity }) {
  const wrapRef = useRef(null)
  const reduce = useReducedMotion()
  const { isMobile } = useResponsive()

  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ['start start', 'end end'],
  })

  // hold → scatter → settle
  const progress = useTransform(
    scrollYProgress,
    [0, SCATTER_START, SCATTER_END, 1],
    [0, 0, 1, 1]
  )

  const [spread, setSpread] = useState(false)
  useMotionValueEvent(progress, 'change', (p) => {
    setSpread((was) => (was ? p > 0.98 : p >= 0.99))
  })
  const parallaxEnabled = reduce !== true && !isMobile
  const pointer = usePointerParallax(spread, parallaxEnabled)

  // Globe: runs full size, shrinks and disappears as user scrolls
  const globeScale = useTransform(progress, [0, 0.38], [1, 0.04])
  const globeOpacity = useTransform(progress, [0, 0.32], [1, 0])

  // Center headline: fades in as Earth shrinks
  const noScale = reduce === true
  const copyOpacity = useTransform(progress, [0.26, 0.56], [0, 1])
  const copyScale = useTransform(progress, [0.26, 0.70], [0.85, 1])

  // Scroll hint: visible initially, fades out immediately on scroll
  const hintOpacity = useTransform(progress, [0, 0.12], [1, 0])

  return (
    <div
      ref={wrapRef}
      style={{
        height: isMobile ? '260vh' : '350vh',
        position: 'relative',
        background: 'var(--color-bg-base, #0F1419)',
      }}
    >
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* ── 3D Earth circle — runs initially, shrinks on scroll ── */}
        <motion.div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: globeOpacity,
            scale: globeScale,
            zIndex: 5,
            pointerEvents: 'none',
          }}
        >
          {isSectionVisible ? (
            <EarthSkillsCanvas
              activeCategory={activeCategory}
              hoveredSkillId={hoveredSkillId}
              setHoveredSkillId={setHoveredSkillId}
              orbitDensity={orbitDensity}
              showLabels={false}
            />
          ) : (
            <div style={{ height: '580px' }} />
          )}
        </motion.div>

        {/* ── Centre headline — fades in as Earth shrinks ── */}
        <motion.div
          style={{
            opacity: copyOpacity,
            scale: noScale ? 1 : copyScale,
            position: 'relative',
            zIndex: 10,
            textAlign: 'center',
            color: 'var(--color-text-primary, #E8EAED)',
            pointerEvents: 'none',
            padding: isMobile ? '0 0.5rem' : '0 1rem',
            maxWidth: isMobile ? '250px' : '520px',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: isMobile ? '0.58rem' : '0.68rem',
              fontWeight: 600,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--color-accent-pass, #4ADE9A)',
              marginBottom: isMobile ? '0.35rem' : '0.75rem',
            }}
          >
            Coverage Report
          </p>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: isMobile ? 'clamp(1.75rem, 6.5vw, 2.5rem)' : 'clamp(2.5rem, 5.5vw, 5rem)',
              fontWeight: 700,
              lineHeight: 1.06,
              letterSpacing: '-0.04em',
              margin: 0,
            }}
          >
            Skills{' '}
            <span style={{ color: 'var(--color-text-muted, #9EABB8)', fontWeight: 600 }}>
              That
            </span>{' '}
            <span
              style={{
                background: 'linear-gradient(90deg, var(--color-accent-pass, #4ADE9A), #38BDF8)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Ship.
            </span>
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: isMobile ? '0.72rem' : 'clamp(0.85rem, 1.2vw, 1.05rem)',
              lineHeight: isMobile ? 1.4 : 1.65,
              color: 'var(--color-text-muted, #9EABB8)',
              maxWidth: isMobile ? '220px' : '440px',
              margin: isMobile ? '0.4rem auto 0' : '1.25rem auto 0',
              opacity: 0.8,
            }}
          >
            {isMobile
              ? 'Automation frameworks & quality engineering.'
              : 'Automation frameworks, full-stack tools, and quality engineering — precision-built for production.'}
          </p>
        </motion.div>

        {/* ── Scattering skill chips ── */}
        <div style={{ position: 'absolute', inset: 0 }}>
          {SCATTER_CARDS.map((card, i) => (
            <ScatterCard
              key={card.skill.id}
              card={card}
              progress={progress}
              reduce={reduce}
              isMobile={isMobile}
              pointer={pointer}
              depth={parallaxDepth(i, SCATTER_CARDS.length)}
            />
          ))}
        </div>

        {/* ── Scroll hint ── */}
        <motion.div
          style={{
            position: 'absolute',
            bottom: '2rem',
            opacity: hintOpacity,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.5rem',
            color: 'var(--color-text-primary, #E8EAED)',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.68rem',
            fontWeight: 500,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            pointerEvents: 'none',
            zIndex: 20,
          }}
        >
          <span style={{ opacity: 0.5 }}>Scroll</span>
          <svg width="16" height="28" viewBox="0 0 16 28" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0.4 }}>
            <rect x="1" y="1" width="14" height="26" rx="7" stroke="currentColor" strokeWidth="1.5" />
            <motion.circle cx="8" cy="9" r="2" fill="currentColor" animate={{ y: [0, 8, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }} />
          </svg>
        </motion.div>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════
   GRID VIEW — existing category cards (unchanged)
   ═══════════════════════════════════════════════════════════════ */

const containerVariants = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }
const cardVariants = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } } }
const chipVariants = { hidden: { opacity: 0, y: 12 }, visible: (j) => ({ opacity: 1, y: 0, transition: { duration: 0.25, delay: j * 0.04, ease: 'easeOut' } }) }

function SkillCard({ category, index, activeCategory, hoveredSkillId, setHoveredSkillId }) {
  const cardRef = useRef(null)
  const highlightRef = useRef(null)
  const rAFRef = useRef(null)

  const accentColor = ACCENT_COLORS[index % ACCENT_COLORS.length]
  const accentRGB = ACCENT_RGBS[index % ACCENT_RGBS.length]

  const isCategoryMatch = !activeCategory || activeCategory === 'All' || category.title.toLowerCase().includes(activeCategory.toLowerCase()) || (activeCategory === 'Automation Tools & Frameworks' && category.title.includes('Automation')) || (activeCategory === 'Full Stack Development' && category.title.includes('Full Stack'))

  useEffect(() => {
    const card = cardRef.current
    const highlight = highlightRef.current
    if (!card) return

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    let prefersReducedMotion = mediaQuery.matches
    const handleMediaChange = (e) => { prefersReducedMotion = e.matches }
    mediaQuery.addEventListener('change', handleMediaChange)

    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    if (prefersReducedMotion || isTouch) {
      return () => mediaQuery.removeEventListener('change', handleMediaChange)
    }

    const handleMouseMove = (e) => {
      if (rAFRef.current) cancelAnimationFrame(rAFRef.current)
      rAFRef.current = requestAnimationFrame(() => {
        const rect = card.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        const centerX = rect.width / 2
        const centerY = rect.height / 2
        const tiltX = ((centerY - y) / centerY) * 5.5
        const tiltY = ((x - centerX) / centerX) * 5.5
        card.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`
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
        card.style.transform = 'rotateX(0deg) rotateY(0deg)'
        if (highlight) highlight.style.background = 'transparent'
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
    <div style={{ position: 'relative', perspective: '1000px', paddingBottom: '12px', paddingRight: '12px', opacity: isCategoryMatch ? 1 : 0.4, transition: 'opacity 0.3s ease' }}>
      <div style={{ position: 'absolute', inset: 0, transform: 'translate(12px, 12px)', background: 'var(--color-bg-base)', border: '1px solid var(--color-border-hairline)', borderRadius: '12px', borderTop: `2px solid color-mix(in srgb, ${accentColor} 12%, transparent)`, zIndex: 1, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', inset: 0, transform: 'translate(6px, 6px)', background: 'var(--color-bg-base)', border: '1px solid var(--color-border-hairline)', borderRadius: '12px', borderTop: `2px solid color-mix(in srgb, ${accentColor} 25%, transparent)`, zIndex: 2, pointerEvents: 'none' }} />

      <motion.div
        ref={cardRef}
        variants={cardVariants}
        style={{
          background: 'var(--color-bg-base)', border: '1px solid var(--color-border-hairline)', borderRadius: '12px', padding: '1.5rem',
          borderTop: `2px solid ${accentColor}`, boxShadow: `0 -8px 24px rgba(${accentRGB}, 0.12), 0 4px 20px rgba(0, 0, 0, 0.3)`,
          position: 'relative', zIndex: 3, transformStyle: 'preserve-3d', willChange: 'transform',
          transition: 'transform 0.15s ease-out, border-color 0.3s ease, box-shadow 0.3s ease',
        }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = accentColor; e.currentTarget.style.boxShadow = `0 -8px 30px rgba(${accentRGB}, 0.25), 0 8px 32px rgba(0, 0, 0, 0.45)` }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--color-border-hairline)'; e.currentTarget.style.boxShadow = `0 -8px 24px rgba(${accentRGB}, 0.12), 0 4px 20px rgba(0, 0, 0, 0.3)` }}
      >
        <div ref={highlightRef} style={{ position: 'absolute', inset: 0, borderRadius: '12px', pointerEvents: 'none', zIndex: 5, transition: 'background 0.15s ease-out' }} />

        <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: accentColor, marginBottom: '1rem' }}>
          {category.title}
        </h3>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {category.skills.map((skill, j) => {
            const isChipHovered = hoveredSkillId && skill.toLowerCase().includes(hoveredSkillId.toLowerCase())
            return (
              <motion.span
                key={j} custom={j} variants={chipVariants}
                onMouseEnter={() => setHoveredSkillId(skill)}
                onMouseLeave={() => setHoveredSkillId(null)}
                whileHover={{ y: -3, scale: 1.03, boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1), 0 6px 12px rgba(0,0,0,0.35)', borderColor: accentColor, backgroundColor: `color-mix(in srgb, ${accentColor} 12%, rgba(35, 44, 53, 0.4))` }}
                whileTap={{ scale: 0.95 }}
                className="skill-chip"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.45rem',
                  fontFamily: 'var(--font-mono)', fontSize: '0.72rem', fontWeight: 500,
                  padding: '0.375rem 0.75rem', borderRadius: '999px',
                  background: isChipHovered ? `color-mix(in srgb, ${accentColor} 16%, rgba(35, 44, 53, 0.6))` : 'rgba(35, 44, 53, 0.4)',
                  border: isChipHovered ? `1px solid ${accentColor}` : '1px solid var(--color-border-hairline)',
                  color: 'var(--color-text-primary)',
                  boxShadow: isChipHovered ? `0 0 12px rgba(${accentRGB}, 0.3)` : 'inset 0 1px 0 rgba(255,255,255,0.05), 0 2px 4px rgba(0,0,0,0.15)',
                  cursor: 'pointer', transition: 'all 0.2s ease',
                }}
              >
                <SmartSkillIcon name={skill} size={13} />
                <span>{skill}</span>
              </motion.span>
            )
          })}
        </div>
      </motion.div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════
   MAIN COMPONENT — CoverageReport with sphere-scatter + grid toggle
   ═══════════════════════════════════════════════════════════════ */

export default function CoverageReport() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [viewStyle, setViewStyle] = useState('sphere')
  const [orbitDensity, setOrbitDensity] = useState('core')
  const [hoveredSkillId, setHoveredSkillId] = useState(null)
  const sectionRef = useRef(null)
  const [isSectionVisible, setIsSectionVisible] = useState(false)
  const { isMobile } = useResponsive()

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsSectionVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin: '350px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} id="coverage-report">
      {viewStyle === 'sphere' ? (
        /* ── SPHERE SCATTER: full-viewport scroll-driven experience ── */
        <SphereScatterView
          isSectionVisible={isSectionVisible}
          activeCategory={activeCategory}
          hoveredSkillId={hoveredSkillId}
          setHoveredSkillId={setHoveredSkillId}
          orbitDensity={orbitDensity}
        />
      ) : (
        /* ── GRID VIEW: standard layout with category cards ── */
        <div style={{ background: 'rgba(22, 29, 36, 0.75)', backdropFilter: 'blur(10px)', padding: '5rem 0' }}>
          <div className="section-container">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5 }}
              style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}
            >
              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: '1rem' }}>
                <div>
                  <p className="section-eyebrow">Coverage Report</p>
                  <h2 className="section-headline-editorial" style={{ marginTop: '0.25rem' }}>
                    <span className="shading-word">Skills</span>
                    <span className="shading-word">&amp;</span>
                    <span className="shading-word">Technologies</span>
                  </h2>
                </div>

                <ViewToggle viewStyle={viewStyle} setViewStyle={setViewStyle} />
              </div>

              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.95rem', color: 'var(--color-text-muted)', maxWidth: '650px' }}>
                Interactive 3D visualization of full-stack engineering, QA automation frameworks, and developer toolchains.
              </p>
            </motion.div>

            {/* Filters */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              style={{ display: 'flex', flexWrap: 'nowrap', overflowX: 'auto', gap: '0.4rem', marginBottom: '1.5rem', paddingBottom: '0.5rem', alignItems: 'center', position: 'relative', zIndex: 20, WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)', marginRight: '0.25rem', flexShrink: 0 }}>
                <SlidersHorizontal size={13} /> Filter:
              </div>
              {CATEGORY_FILTERS.map((cat) => {
                const isActive = activeCategory === cat
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    style={{
                      fontFamily: 'var(--font-mono)', fontSize: '0.72rem', fontWeight: 500, padding: '0.35rem 0.85rem', borderRadius: '999px',
                      background: isActive ? 'rgba(74, 222, 154, 0.15)' : 'rgba(255, 255, 255, 0.04)',
                      border: isActive ? '1px solid var(--color-accent-pass)' : '1px solid var(--color-border-hairline)',
                      color: isActive ? 'var(--color-accent-pass)' : 'var(--color-text-muted)',
                      cursor: 'pointer', transition: 'all 0.2s ease',
                      boxShadow: isActive ? '0 0 12px rgba(74, 222, 154, 0.25)' : 'none',
                      whiteSpace: 'nowrap', flexShrink: 0,
                    }}
                  >
                    {cat}
                  </button>
                )
              })}
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 340px), 1fr))', gap: '1.75rem' }}
            >
              {SKILL_CATEGORIES.map((category, i) => (
                <SkillCard
                  key={i}
                  category={category}
                  index={i}
                  activeCategory={activeCategory}
                  hoveredSkillId={hoveredSkillId}
                  setHoveredSkillId={setHoveredSkillId}
                />
              ))}
            </motion.div>
          </div>
        </div>
      )}

      {/* ── Floating view toggle (visible in sphere mode) ── */}
      {viewStyle === 'sphere' && (
        <div
          style={{
            position: 'fixed',
            bottom: isMobile ? '1.25rem' : '2rem',
            right: isMobile ? 'auto' : '2rem',
            left: isMobile ? '50%' : 'auto',
            transform: isMobile ? 'translateX(-50%) scale(0.92)' : 'none',
            zIndex: 100,
          }}
        >
          <ViewToggle viewStyle={viewStyle} setViewStyle={setViewStyle} />
        </div>
      )}
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════
   VIEW TOGGLE — sphere / grid switcher
   ═══════════════════════════════════════════════════════════════ */

function ViewToggle({ viewStyle, setViewStyle }) {
  return (
    <div
      style={{
        display: 'inline-flex',
        background: 'rgba(13, 20, 30, 0.9)',
        border: '1px solid var(--color-border-hairline)',
        borderRadius: '999px',
        padding: '4px',
        gap: '4px',
        backdropFilter: 'blur(12px)',
      }}
    >
      <button
        onClick={() => setViewStyle('sphere')}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: '6px',
          fontFamily: 'var(--font-mono)', fontSize: '0.72rem', fontWeight: 600,
          padding: '6px 14px', borderRadius: '999px', border: 'none',
          background: viewStyle === 'sphere' ? 'var(--color-accent-pass)' : 'transparent',
          color: viewStyle === 'sphere' ? 'var(--color-bg-base)' : 'var(--color-text-muted)',
          cursor: 'pointer', transition: 'all 0.25s ease',
        }}
      >
        <Sparkle size={13} />
        3D Scatter
      </button>
      <button
        onClick={() => setViewStyle('grid')}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: '6px',
          fontFamily: 'var(--font-mono)', fontSize: '0.72rem', fontWeight: 600,
          padding: '6px 14px', borderRadius: '999px', border: 'none',
          background: viewStyle === 'grid' ? 'var(--color-accent-pass)' : 'transparent',
          color: viewStyle === 'grid' ? 'var(--color-bg-base)' : 'var(--color-text-muted)',
          cursor: 'pointer', transition: 'all 0.25s ease',
        }}
      >
        <Grid size={13} />
        Grid View
      </button>
    </div>
  )
}
