import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

/* ═══════════════════════════════════════════════════════════════
   PREMIUM CINEMATIC EDITORIAL ABOUT SECTION — KISHOR GOGOI
   ═══════════════════════════════════════════════════════════════
   • Visual Anchor: Kishor's authentic portrait integrated as full photographic layer
   • Zero artificial stock persons / zero disconnected floating cards
   • Three clear levels: Minimal Identity -> Personal Intro -> Primary Action
   • High-contrast editorial serif typography ('Playfair Display') + warm-white text
   • Balanced 1280px container alignment, responsive across all viewports
   ─────────────────────────────────────────────────────────────── */

export default function TestPlan({ onOpenResume }) {
  const sectionRef = useRef(null)
  const [inView, setInView] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  })

  useEffect(() => {
    const el = sectionRef.current
    if (!el || inView) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.unobserve(el)
        }
      },
      { threshold: 0.08, rootMargin: '60px 0px 0px 0px' }
    )

    observer.observe(el)
    return () => {
      if (el) observer.unobserve(el)
    }
  }, [inView])

  return (
    <section
      id="about"
      ref={sectionRef}
      className="about-cinematic-stage"
      aria-labelledby="about-heading"
    >
      {/* Route anchor compatibility to preserve all existing links */}
      <span id="experience" className="about-anchor-shim" aria-hidden="true" />
      <span id="test-plan" className="about-anchor-shim" aria-hidden="true" />

      {/* ── 1. BACKGROUND PHOTOGRAPHIC LAYER ── */}
      <div className="about-container">
        {/* Editorial introduction and core QA capabilities */}
        <div className="about-content-grid">
          <div className="about-editorial-flow">
          {/* Small Eyebrow */}
          <motion.div
            className="about-eyebrow section-eyebrow"
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="section-eyebrow-num">01</span>
            <span className="section-eyebrow-sep">/</span>
            <span className="section-eyebrow-text">ABOUT THE ENGINEER</span>
          </motion.div>

          {/* Main Heading — Editorial Headline */}
          <motion.h2
            id="about-heading"
            className="about-headline is-serif"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.75, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="about-headline-line">The Engineer Behind</span>
            <span className="about-headline-line">the Quality</span>
          </motion.h2>

          {/* Supporting Text */}
          <motion.p
            className="about-paragraph section-description"
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
            transition={{ duration: 0.7, delay: 0.38, ease: [0.16, 1, 0.3, 1] }}
          >
            I&apos;m a Computer Science graduate focused on software quality, test automation, and building reliable digital experiences. I enjoy exploring edge cases, validating APIs, and creating maintainable automation workflows that help teams deliver software with confidence.
          </motion.p>

          {/* LEVEL 3: BOTTOM — PRIMARY ACTION */}
          <motion.div
            className="about-action-row"
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
            transition={{ duration: 0.7, delay: 0.46, ease: [0.16, 1, 0.3, 1] }}
          >
            <a
              href="#pipeline-runs"
              id="about-cta-projects"
              className="about-primary-cta"
            >
              <span>EXPLORE MY PROJECTS</span>
              <ArrowUpRight size={17} className="about-cta-arrow" aria-hidden="true" />
            </a>

            {onOpenResume && (
              <button
                type="button"
                onClick={onOpenResume}
                className="about-secondary-cta"
              >
                <span>VIEW RESUME</span>
              </button>
            )}
          </motion.div>
          </div>
          <motion.aside
            className="about-capabilities"
            aria-labelledby="about-capabilities-heading"
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
            transition={{ duration: 0.7, delay: 0.38, ease: [0.16, 1, 0.3, 1] }}
          >
            <h3 id="about-capabilities-heading" className="about-capabilities-heading">CORE CAPABILITIES</h3>
            <ul className="about-capabilities-list">
              <li>Manual Testing</li>
              <li>Automation Testing</li>
              <li>API Testing</li>
              <li>Test Framework Design</li>
            </ul>
          </motion.aside>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════
          SCOPED STYLES — EDITORIAL CINEMATIC PORTFOLIO SYSTEM
          ══════════════════════════════════════════════════════════ */}
      <style>{`
        .about-cinematic-stage {
          position: relative;
          min-height: clamp(560px, 68vh, 760px);
          width: 100%;
          display: flex;
          align-items: center;
          overflow: visible;
          background-color: var(--color-bg-base);
          scroll-margin-top: 64px;
          padding-top: calc(64px + clamp(2.5rem, 5vh, 4rem));
          padding-bottom: clamp(3rem, 5vh, 4.5rem);
          box-sizing: border-box;
        }

        .about-anchor-shim {
          position: absolute;
          top: -64px;
          left: 0;
          height: 0;
          width: 0;
          opacity: 0;
          pointer-events: none;
        }

        .about-container {
          width: min(100%, 1280px);
          margin-inline: auto;
          padding-inline: clamp(24px, 6vw, 88px);
          box-sizing: border-box;
        }

        /* ── LEVEL 2: EDITORIAL INTRODUCTION FLOW ── */
        .about-content-grid {
          display: grid;
          grid-template-columns: minmax(0, 1.2fr) minmax(250px, 0.8fr);
          align-items: center;
          gap: clamp(2.5rem, 8vw, 7rem);
        }

        .about-editorial-flow {
          max-width: 680px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        /* Eyebrow */
        .about-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          font-family: var(--font-mono, 'JetBrains Mono', monospace);
          font-size: clamp(0.7rem, 0.95vw, 0.78rem);
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--color-accent-pass, #91A797);
          margin-bottom: clamp(0.9rem, 1.8vh, 1.35rem);
          font-weight: 600;
        }

        .about-eyebrow-sep {
          color: rgba(145, 167, 151, 0.45);
        }

        .about-eyebrow-index {
          color: var(--color-text-primary);
        }

        /* Editorial Serif Headline */
        .about-headline {
          font-family: 'Playfair Display', 'Cormorant Garamond', Georgia, serif;
          font-size: clamp(2.5rem, 4.2vw, 3.75rem);
          font-weight: 700;
          line-height: 1.12;
          letter-spacing: -0.025em;
          color: var(--color-text-primary);
          margin: 0 0 clamp(1rem, 2vh, 1.5rem) 0;
          display: flex;
          flex-direction: column;
        }

        .about-headline-line {
          display: block;
          white-space: normal;
        }

        /* Supporting Text — directly on background */
        .about-paragraph {
          font-family: var(--font-sans, 'Inter', sans-serif);
          font-size: clamp(1rem, 1.22vw, 1.125rem);
          line-height: 1.75;
          color: var(--color-text-secondary);
          margin: 0 0 clamp(2rem, 3.8vh, 2.85rem) 0;
          max-width: 46ch;
        }

        .about-capabilities {
          width: 100%;
          max-width: 420px;
          justify-self: end;
        }

        .about-capabilities-heading {
          margin: 0;
          padding-bottom: 0.9rem;
          border-bottom: 1px solid var(--color-border);
          color: var(--color-text-secondary);
          font-family: var(--font-mono, 'JetBrains Mono', monospace);
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.14em;
        }

        .about-capabilities-list {
          margin: 0;
          padding: 0;
          list-style: none;
        }

        .about-capabilities-list li {
          padding: 1rem 0;
          border-bottom: 1px solid var(--color-border);
          color: var(--color-text-primary);
          font-family: var(--font-sans, 'Inter', sans-serif);
          font-size: clamp(1rem, 1.3vw, 1.15rem);
          line-height: 1.4;
        }

        /* ── LEVEL 3: PRIMARY ACTION ── */
        .about-action-row {
          display: flex;
          align-items: center;
          gap: 1.15rem;
          flex-wrap: wrap;
        }

        .about-primary-cta {
          display: inline-flex;
          align-items: center;
          gap: 0.65rem;
          padding: 0.9rem 1.75rem;
          border-radius: 9999px;
          background-color: var(--color-button-primary);
          color: var(--color-button-primary-text);
          font-family: var(--font-mono, 'JetBrains Mono', monospace);
          font-size: 0.82rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-decoration: none;
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: none;
        }

        .about-primary-cta:hover {
          background-color: #343630;
          transform: translateY(-2px);
          box-shadow: none;
        }

        .about-cta-arrow {
          transition: transform 0.25s ease;
        }

        .about-primary-cta:hover .about-cta-arrow {
          transform: translate(2px, -2px);
        }

        .about-secondary-cta {
          display: inline-flex;
          align-items: center;
          padding: 0.88rem 1.45rem;
          background: transparent;
          border: 1px solid var(--color-border);
          border-radius: 9999px;
          color: var(--color-text-primary);
          font-family: var(--font-mono, 'JetBrains Mono', monospace);
          font-size: 0.8rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .about-secondary-cta:hover {
          border-color: var(--color-text-secondary);
          color: var(--color-text-primary);
          background-color: var(--color-surface);
          transform: translateY(-1px);
        }

        /* ── RESPONSIVE ADAPTATIONS ── */
        @media (max-width: 1024px) {
          .about-cinematic-stage {
            min-height: 0;
            padding-top: calc(64px + 3rem);
            padding-bottom: 3.5rem;
          }
          .about-content-grid {
            grid-template-columns: minmax(0, 1.1fr) minmax(220px, 0.9fr);
            gap: clamp(2rem, 5vw, 3rem);
          }
        }

        @media (max-width: 768px) {
          .about-cinematic-stage {
            min-height: auto;
            padding-top: calc(64px + 2rem);
            padding-bottom: 3.5rem;
          }
          .about-container {
            min-height: auto;
            padding: 0 clamp(16px, 4vw, 32px);
          }
          .about-content-grid {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }
          .about-editorial-flow { max-width: 100%; }
          .about-headline {
            font-size: clamp(2.35rem, 8vw, 3.25rem);
            margin-bottom: 1.25rem;
          }
          .about-paragraph {
            font-size: 1rem;
            line-height: 1.7;
            margin-bottom: 2rem;
            max-width: 100%;
          }
          .about-action-row {
            width: 100%;
            gap: 0.75rem;
          }
          .about-primary-cta {
            justify-content: center;
            padding: 0.85rem 1.25rem;
          }
          .about-secondary-cta {
            justify-content: center;
            padding: 0.85rem 1.25rem;
          }
        }

        @media (max-width: 440px) {
          .about-action-row {
            align-items: stretch;
            flex-direction: column;
          }
        }
      `}</style>
    </section>
  )
}
