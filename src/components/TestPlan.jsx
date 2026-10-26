import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import aboutBg from '../assets/about-cinematic-bg.jpg'

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
      aria-label="About Kishor Gogoi — QA Engineer"
    >
      {/* Route anchor compatibility to preserve all existing links */}
      <span id="experience" className="about-anchor-shim" aria-hidden="true" />
      <span id="test-plan" className="about-anchor-shim" aria-hidden="true" />

      {/* ── 1. BACKGROUND PHOTOGRAPHIC LAYER ── */}
      <div className="about-bg-layer" aria-hidden="true">
        <motion.div
          className="about-bg-image"
          style={{ backgroundImage: `url(${aboutBg})` }}
          initial={{ scale: 1.03, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : { scale: 1.03, opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        />
        {/* Layered charcoal scrims: solid read zone on left, natural reveal on right */}
        <div className="about-bg-scrim-left" />
        <div className="about-bg-scrim-top" />
        <div className="about-bg-scrim-bottom" />
        <div className="about-bg-vignette" />
      </div>

      {/* ── 2. FOREGROUND EDITORIAL CONTENT (1280px Container) ── */}
      <div className="about-container">
        {/* LEVEL 1: TOP — MINIMAL IDENTITY */}
        <motion.header
          className="about-identity"
          initial={{ opacity: 0, y: -12 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -12 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="about-identity-tag">
            <span className="about-live-dot" aria-hidden="true" />
            <span className="about-identity-name">KISHOR GOGOI</span>
          </div>
          <span className="about-identity-divider" aria-hidden="true">/</span>
          <span className="about-identity-role">QA ENGINEER · TEST AUTOMATION</span>
        </motion.header>

        {/* LEVEL 2 & 3: MAIN EDITORIAL INTRODUCTION */}
        <div className="about-editorial-flow">
          {/* Small Eyebrow */}
          <motion.div
            className="about-eyebrow section-eyebrow"
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="section-eyebrow-num">01</span>
            <span className="section-eyebrow-sep">//</span>
            <span className="section-eyebrow-text">ABOUT</span>
          </motion.div>

          {/* Main Heading — Editorial Headline */}
          <motion.h2
            className="about-headline section-headline-editorial is-serif"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.75, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="about-headline-line">The Engineer Behind</span>
            <span className="about-headline-line">the Quality.</span>
          </motion.h2>

          {/* Supporting Text */}
          <motion.p
            className="about-paragraph section-description"
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
            transition={{ duration: 0.7, delay: 0.38, ease: [0.16, 1, 0.3, 1] }}
          >
            Computer Science graduate focused on software quality, test automation,
            and building resilient digital experiences — exploring edge cases,
            validating APIs, and creating maintainable automation workflows that help teams ship with confidence.
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
      </div>

      {/* ══════════════════════════════════════════════════════════
          SCOPED STYLES — EDITORIAL CINEMATIC PORTFOLIO SYSTEM
          ══════════════════════════════════════════════════════════ */}
      <style>{`
        .about-cinematic-stage {
          position: relative;
          min-height: clamp(680px, 94vh, 980px);
          width: 100%;
          display: flex;
          align-items: center;
          overflow: hidden;
          background-color: #0A0D12;
          scroll-margin-top: 64px;
          padding-top: calc(64px + clamp(1.5rem, 3.5vh, 3.25rem));
          padding-bottom: clamp(3.5rem, 6vh, 5.5rem);
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

        /* ── BACKGROUND PHOTOGRAPHIC LAYER ── */
        .about-bg-layer {
          position: absolute;
          inset: 0;
          z-index: 0;
          overflow: hidden;
          pointer-events: none;
        }

        .about-bg-image {
          position: absolute;
          inset: -2%;
          background-size: cover;
          background-position: right 24% center;
          background-repeat: no-repeat;
          will-change: transform, opacity;
        }

        /* Charcoal Scrims: Preserve skin tones on right, guarantee 100% text contrast on left */
        .about-bg-scrim-left {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            90deg,
            #0A0D12 0%,
            #0A0D12 30%,
            rgba(10, 13, 18, 0.94) 48%,
            rgba(10, 13, 18, 0.5) 68%,
            rgba(10, 13, 18, 0.1) 85%,
            transparent 100%
          );
        }

        .about-bg-scrim-top {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 180px;
          background: linear-gradient(180deg, #0A0D12 0%, rgba(10, 13, 18, 0.6) 45%, transparent 100%);
        }

        .about-bg-scrim-bottom {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 220px;
          background: linear-gradient(0deg, #0A0D12 0%, rgba(10, 13, 18, 0.8) 45%, transparent 100%);
        }

        .about-bg-vignette {
          position: absolute;
          inset: 0;
          background: radial-gradient(
            ellipse at 78% 45%,
            transparent 40%,
            rgba(10, 13, 18, 0.45) 85%,
            rgba(10, 13, 18, 0.85) 100%
          );
        }

        /* ── FOREGROUND CONTAINER ── */
        .about-container {
          position: relative;
          z-index: 2;
          width: 100%;
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 clamp(16px, 4vw, 64px);
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          min-height: clamp(520px, 72vh, 720px);
        }

        /* ── LEVEL 1: MINIMAL IDENTITY ── */
        .about-identity {
          display: inline-flex;
          align-items: center;
          gap: 0.85rem;
          font-family: var(--font-mono, 'JetBrains Mono', monospace);
          font-size: clamp(0.72rem, 1.05vw, 0.82rem);
          letter-spacing: 0.14em;
          text-transform: uppercase;
          margin-bottom: clamp(2.5rem, 6vh, 4.5rem);
        }

        .about-identity-tag {
          display: inline-flex;
          align-items: center;
          gap: 0.55rem;
          color: #F5F5F7;
          font-weight: 600;
        }

        .about-live-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background-color: var(--color-accent-pass, #4ADE9A);
          box-shadow: 0 0 10px rgba(74, 222, 154, 0.7);
        }

        .about-identity-divider {
          color: rgba(158, 171, 184, 0.35);
          font-weight: 300;
        }

        .about-identity-role {
          color: var(--color-text-muted, #9EABB8);
          font-weight: 400;
          letter-spacing: 0.12em;
        }

        /* ── LEVEL 2: EDITORIAL INTRODUCTION FLOW ── */
        .about-editorial-flow {
          max-width: clamp(340px, 52vw, 640px);
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
          color: var(--color-accent-pass, #4ADE9A);
          margin-bottom: clamp(0.9rem, 1.8vh, 1.35rem);
          font-weight: 600;
        }

        .about-eyebrow-sep {
          color: rgba(74, 222, 154, 0.45);
        }

        .about-eyebrow-index {
          color: #F5F5F7;
        }

        /* Editorial Serif Headline */
        .about-headline {
          font-family: 'Playfair Display', 'Cormorant Garamond', Georgia, serif;
          font-size: clamp(30px, 4.2vw, 48px);
          font-weight: 700;
          line-height: 1.12;
          letter-spacing: -0.025em;
          color: #F8FAFC;
          margin: 0 0 clamp(1rem, 2vh, 1.5rem) 0;
          display: flex;
          flex-direction: column;
          text-shadow: 0 2px 24px rgba(0, 0, 0, 0.4);
        }

        .about-headline-line {
          display: block;
          white-space: nowrap;
        }

        /* Supporting Text — directly on background */
        .about-paragraph {
          font-family: var(--font-sans, 'Inter', sans-serif);
          font-size: clamp(0.95rem, 1.22vw, 1.06rem);
          line-height: 1.76;
          color: rgba(225, 230, 238, 0.82);
          margin: 0 0 clamp(2rem, 3.8vh, 2.85rem) 0;
          max-width: 46ch;
          text-shadow: 0 1px 12px rgba(0, 0, 0, 0.6);
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
          background-color: var(--color-accent-pass, #4ADE9A);
          color: #070A0E;
          font-family: var(--font-mono, 'JetBrains Mono', monospace);
          font-size: 0.82rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-decoration: none;
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 4px 18px rgba(74, 222, 154, 0.28);
        }

        .about-primary-cta:hover {
          background-color: #65f5af;
          transform: translateY(-2px);
          box-shadow: 0 8px 26px rgba(74, 222, 154, 0.45);
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
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(225, 230, 238, 0.22);
          border-radius: 9999px;
          color: #E8EAED;
          font-family: var(--font-mono, 'JetBrains Mono', monospace);
          font-size: 0.8rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .about-secondary-cta:hover {
          border-color: rgba(74, 222, 154, 0.6);
          color: var(--color-accent-pass, #4ADE9A);
          background-color: rgba(74, 222, 154, 0.06);
          transform: translateY(-1px);
        }

        /* ── RESPONSIVE ADAPTATIONS ── */
        @media (max-width: 1024px) {
          .about-cinematic-stage {
            min-height: 85vh;
            padding-top: calc(64px + 2rem);
            padding-bottom: 4rem;
          }
          .about-container {
            min-height: auto;
          }
          .about-editorial-flow {
            max-width: 540px;
          }
          .about-bg-image {
            background-position: right 18% center;
          }
          .about-bg-scrim-left {
            background: linear-gradient(
              90deg,
              #0A0D12 0%,
              #0A0D12 36%,
              rgba(10, 13, 18, 0.95) 55%,
              rgba(10, 13, 18, 0.65) 78%,
              transparent 100%
            );
          }
        }

        @media (max-width: 768px) {
          .about-cinematic-stage {
            min-height: auto;
            padding-top: calc(64px + 1.25rem);
            padding-bottom: 4.5rem;
          }
          .about-container {
            min-height: auto;
            padding: 0 clamp(16px, 4vw, 32px);
          }
          .about-bg-image {
            background-position: 78% 10px;
            background-size: 130% auto;
          }
          .about-bg-scrim-left {
            background: linear-gradient(
              180deg,
              rgba(10, 13, 18, 0.4) 0%,
              rgba(10, 13, 18, 0.1) 180px,
              rgba(10, 13, 18, 0.92) 280px,
              #0A0D12 340px,
              #0A0D12 100%
            );
          }
          .about-identity {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.35rem;
            margin-bottom: 1.5rem;
          }
          .about-identity-divider {
            display: none;
          }
          .about-editorial-flow {
            max-width: 100%;
            margin-top: clamp(140px, 24vh, 220px);
          }
          .about-headline {
            font-size: clamp(2.3rem, 8.5vw, 3.2rem);
            margin-bottom: 1.25rem;
          }
          .about-headline-line {
            white-space: normal;
          }
          .about-paragraph {
            font-size: 0.95rem;
            line-height: 1.7;
            margin-bottom: 2rem;
            max-width: 100%;
          }
          .about-action-row {
            width: 100%;
            gap: 0.75rem;
            flex-direction: column;
          }
          .about-primary-cta {
            width: 100%;
            justify-content: center;
            padding: 0.95rem 1.5rem;
          }
          .about-secondary-cta {
            width: 100%;
            justify-content: center;
            padding: 0.85rem 1.5rem;
          }
        }
      `}</style>
    </section>
  )
}
