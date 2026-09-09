import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/* ═══════════════════════════════════════════════════════════════
   Swiss International Typographic Style — Loading Screen
   ═══════════════════════════════════════════════════════════════
   Grid-based ·  High contrast ·  Geometric precision
   ─────────────────────────────────────────────────────────────── */

const DURATION_MS = 2400 // Total simulated load time
const TICK_MS = 20

// Eased progress so the bar decelerates naturally
function easeOutQuart(t) {
  return 1 - Math.pow(1 - t, 4)
}

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0)
  const [isExiting, setIsExiting] = useState(false)
  const startRef = useRef(null)
  const rafRef = useRef(null)

  // Smooth RAF-driven progress counter
  useEffect(() => {
    startRef.current = performance.now()

    const tick = () => {
      const elapsed = performance.now() - startRef.current
      const raw = Math.min(elapsed / DURATION_MS, 1)
      const eased = easeOutQuart(raw)
      setProgress(Math.min(100, Math.floor(eased * 100)))

      if (raw < 1) {
        rafRef.current = requestAnimationFrame(tick)
      } else {
        setProgress(100)
        // Brief pause at 100% then begin exit
        setTimeout(() => {
          setIsExiting(true)
          setTimeout(() => {
            if (onComplete) onComplete()
          }, 900)
        }, 350)
      }
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [onComplete])

  const progressFraction = progress / 100
  const displayNum = String(progress).padStart(3, '0')

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          key="swiss-preloader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.7, ease: [0.65, 0, 0.35, 1] },
          }}
          style={styles.overlay}
        >
          {/* ── Background grid lines ── */}
          <div style={styles.gridContainer} aria-hidden="true">
            {/* Vertical grid lines */}
            {[16.666, 33.333, 50, 66.666, 83.333].map((pos, i) => (
              <motion.div
                key={`v-${i}`}
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 0.6, delay: 0.05 * i, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  ...styles.gridLineV,
                  left: `${pos}%`,
                }}
              />
            ))}
            {/* Horizontal grid lines */}
            {[25, 50, 75].map((pos, i) => (
              <motion.div
                key={`h-${i}`}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.6, delay: 0.08 * i + 0.1, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  ...styles.gridLineH,
                  top: `${pos}%`,
                }}
              />
            ))}
          </div>

          {/* ── Geometric accents ── */}
          <div style={styles.geoContainer} aria-hidden="true">
            {/* Top-right rectangle block */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              style={styles.rectBlock}
            />

            {/* Diagonal accent line */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.6, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
              style={styles.diagonalLine}
            />
          </div>

          {/* ── Main content area ── */}
          <div style={styles.contentWrapper}>
            {/* Top row: brand + year */}
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              style={styles.topRow}
            >
              <span style={styles.brandName}>Kishor Gogoi</span>
              <span style={styles.yearLabel}>©2026</span>
            </motion.div>

            {/* Center: giant progress number */}
            <div style={styles.centerBlock}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                style={styles.bigNumberWrapper}
              >
                <span style={styles.bigNumber}>{displayNum}</span>
                <span style={styles.percentSign}>%</span>
              </motion.div>

              {/* Subtitle text */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
                style={styles.subtitleRow}
              >
                <div style={styles.subtitleDash} />
                <span style={styles.subtitleText}>
                  {progress < 100 ? 'LOADING PORTFOLIO' : 'READY'}
                </span>
              </motion.div>
            </div>

            {/* Bottom section: progress bar + labels */}
            <div style={styles.bottomSection}>
              {/* Progress bar */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.25 }}
                style={styles.progressTrack}
              >
                <motion.div
                  style={{
                    ...styles.progressFill,
                    width: `${progress}%`,
                  }}
                  transition={{ duration: 0.05, ease: 'linear' }}
                />

                {/* Running circle that travels left to right during loading */}
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1, left: `${progress}%` }}
                  transition={{
                    scale: { duration: 0.35, delay: 0.2, ease: [0.22, 1, 0.36, 1] },
                    opacity: { duration: 0.35, delay: 0.2 },
                    left: { duration: 0.05, ease: 'linear' },
                  }}
                  style={styles.runningCircle}
                />
                {/* Progress tick marks */}
                <div style={styles.tickContainer} aria-hidden="true">
                  {[0, 25, 50, 75, 100].map((tick) => (
                    <div
                      key={tick}
                      style={{
                        ...styles.tickMark,
                        left: `${tick}%`,
                        opacity: progress >= tick ? 1 : 0.25,
                      }}
                    />
                  ))}
                </div>
              </motion.div>

              {/* Bottom labels */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                style={styles.bottomLabels}
              >
                <span style={styles.labelMono}>PORTFOLIO</span>
                <span style={styles.labelMono}>FULL STACK DEVELOPER</span>
              </motion.div>
            </div>
          </div>

          {/* ── Responsive overrides via <style> tag ── */}
          <style>{responsiveCSS}</style>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/* ═══════════════════════════════════════════════════════════════
   STYLES — all inline for zero side-effects on the portfolio
   ═══════════════════════════════════════════════════════════════ */

const styles = {
  overlay: {
    position: 'fixed',
    inset: 0,
    zIndex: 9999,
    background: '#FAFAFA',
    color: '#0A0A0A',
    overflow: 'hidden',
    fontFamily: "'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif",
    userSelect: 'none',
    WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale',
  },

  /* Grid */
  gridContainer: {
    position: 'absolute',
    inset: 0,
    pointerEvents: 'none',
  },
  gridLineV: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: '1px',
    background: 'rgba(10, 10, 10, 0.06)',
    transformOrigin: 'top',
  },
  gridLineH: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: '1px',
    background: 'rgba(10, 10, 10, 0.06)',
    transformOrigin: 'left',
  },

  /* Geometric accents */
  geoContainer: {
    position: 'absolute',
    inset: 0,
    pointerEvents: 'none',
    overflow: 'hidden',
  },
  rectBlock: {
    position: 'absolute',
    top: '8%',
    right: '6%',
    width: 'clamp(60px, 8vw, 120px)',
    height: 'clamp(30px, 4vw, 60px)',
    background: '#0A0A0A',
    transformOrigin: 'left',
  },
  runningCircle: {
    position: 'absolute',
    bottom: '0px',
    width: 'clamp(36px, 4.5vw, 56px)',
    height: 'clamp(36px, 4.5vw, 56px)',
    borderRadius: '50%',
    border: '2px solid #0A0A0A',
    transform: 'translate(-50%, 0)',
    pointerEvents: 'none',
    zIndex: 5,
  },
  diagonalLine: {
    position: 'absolute',
    bottom: '28%',
    right: '12%',
    width: 'clamp(50px, 7vw, 110px)',
    height: '2px',
    background: '#0A0A0A',
    transform: 'rotate(-30deg)',
    transformOrigin: 'left center',
  },

  /* Content wrapper */
  contentWrapper: {
    position: 'relative',
    zIndex: 2,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
    padding: 'clamp(24px, 4vw, 56px) clamp(24px, 5vw, 72px)',
  },

  /* Top row */
  topRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  brandName: {
    fontFamily: "'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif",
    fontWeight: 700,
    fontSize: 'clamp(0.85rem, 1.2vw, 1.1rem)',
    letterSpacing: '-0.01em',
    textTransform: 'uppercase',
    color: '#0A0A0A',
  },
  yearLabel: {
    fontFamily: "'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif",
    fontWeight: 400,
    fontSize: 'clamp(0.7rem, 0.9vw, 0.85rem)',
    letterSpacing: '0.05em',
    color: 'rgba(10, 10, 10, 0.45)',
  },

  /* Center number */
  centerBlock: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 'clamp(8px, 1.5vw, 16px)',
  },
  bigNumberWrapper: {
    display: 'flex',
    alignItems: 'baseline',
    gap: 'clamp(2px, 0.5vw, 8px)',
    lineHeight: 1,
  },
  bigNumber: {
    fontFamily: "'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif",
    fontWeight: 800,
    fontSize: 'clamp(5rem, 16vw, 14rem)',
    letterSpacing: '-0.04em',
    color: '#0A0A0A',
    lineHeight: 0.85,
    fontVariantNumeric: 'tabular-nums',
  },
  percentSign: {
    fontFamily: "'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif",
    fontWeight: 300,
    fontSize: 'clamp(1.5rem, 4vw, 4rem)',
    color: 'rgba(10, 10, 10, 0.3)',
    lineHeight: 1,
    alignSelf: 'flex-start',
    marginTop: 'clamp(6px, 1.5vw, 18px)',
  },
  subtitleRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 'clamp(8px, 1vw, 14px)',
  },
  subtitleDash: {
    width: 'clamp(20px, 3vw, 40px)',
    height: '2px',
    background: '#0A0A0A',
  },
  subtitleText: {
    fontFamily: "'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif",
    fontWeight: 500,
    fontSize: 'clamp(0.65rem, 0.85vw, 0.8rem)',
    letterSpacing: '0.18em',
    textTransform: 'uppercase',
    color: 'rgba(10, 10, 10, 0.55)',
  },

  /* Bottom */
  bottomSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'clamp(10px, 1.5vw, 18px)',
  },
  progressTrack: {
    position: 'relative',
    width: '100%',
    height: '3px',
    background: 'rgba(10, 10, 10, 0.08)',
    overflow: 'visible',
  },
  progressFill: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    background: '#0A0A0A',
    willChange: 'width',
  },
  tickContainer: {
    position: 'absolute',
    top: '-3px',
    left: 0,
    right: 0,
    height: '9px',
  },
  tickMark: {
    position: 'absolute',
    top: 0,
    width: '1px',
    height: '9px',
    background: '#0A0A0A',
    transition: 'opacity 0.3s ease',
  },
  bottomLabels: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  labelMono: {
    fontFamily: "'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif",
    fontWeight: 400,
    fontSize: 'clamp(0.6rem, 0.75vw, 0.72rem)',
    letterSpacing: '0.14em',
    textTransform: 'uppercase',
    color: 'rgba(10, 10, 10, 0.4)',
  },
}

/* ─── Responsive CSS (injected once, removed on unmount) ─── */
const responsiveCSS = `
  @media (max-width: 640px) {
    /* The grid and geometric elements are already responsive via clamp().
       This block only fine-tunes spacing on very small screens. */
  }

  @media (prefers-reduced-motion: reduce) {
    [data-swiss-preloader] * {
      animation-duration: 0.01s !important;
      transition-duration: 0.01s !important;
    }
  }
`
