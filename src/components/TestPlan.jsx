import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import aboutBg from '../assets/about-bg.jpg'
import kishorCutout from '../assets/profile-cutout.png'

/* ═══════════════════════════════════════════════════════════════
   CINEMATIC EDITORIAL ABOUT SECTION — QA ENGINEER PORTFOLIO
   ═══════════════════════════════════════════════════════════════
   1. Cohesive vertical composition fitting comfortably in desktop viewports
   2. Clear, high-contrast typography across eyebrow, identity, prose, and buttons
   3. Repositioned oversized serif headline visible without bottom clipping
   4. Preserved technology photograph with layered gradients showing workspace detail
   5. Natural scale, lighting, and integration of Kishor's portrait cutout
   6. Unified editorial group uniting narrative, actions, and headline
   7. Generous touch targets and readable CTA labels
   8. Fully responsive at 1440x900, 1366x768, 1024x768, 768x1024, and 390x844
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
      { threshold: 0.05, rootMargin: '100px 0px 0px 0px' }
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
      className="cinematic-stage-section"
      aria-label="About Kishor Gogoi — QA Engineer"
    >
      {/* Route anchor compatibility to preserve all existing links */}
      <span id="test-plan" className="anchor-shim" aria-hidden="true" />
      <span id="experience" className="anchor-shim" aria-hidden="true" />

      {/* ── 1. FULL-WIDTH ATMOSPHERIC TECHNOLOGY BACKGROUND ── */}
      <div className="stage-bg-layer" aria-hidden="true">
        <motion.div
          className="stage-bg-image"
          style={{ backgroundImage: `url(${aboutBg})` }}
          initial={{ scale: 1.04, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : { scale: 1.04, opacity: 0 }}
          transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
        />
        {/* Layered gradients to retain monitor & workspace details */}
        <div className="stage-overlay stage-overlay--top" />
        <div className="stage-overlay stage-overlay--bottom" />
        <div className="stage-overlay stage-overlay--sides" />
        <div className="stage-overlay stage-overlay--vignette" />
      </div>

      {/* ── 2. FOREGROUND CONTENT CONTAINER ── */}
      <div className="stage-content-container">
        {/* TOP BAR: Identity & Eyebrow */}
        <header className="stage-top-bar">
          {/* Left: Identity */}
          <motion.div
            className="stage-identity"
            initial={{ opacity: 0, y: -10 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="identity-pill">
              <span className="identity-live-dot" />
              <span className="identity-title">KISHOR GOGOI</span>
            </div>
            <span className="identity-subtitle">QA ENGINEER · TEST AUTOMATION & QUALITY SYSTEMS</span>
          </motion.div>

          {/* Right: Eyebrow */}
          <motion.div
            className="stage-eyebrow"
            initial={{ opacity: 0, y: -10 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
            transition={{ duration: 0.5, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="eyebrow-index-group">
              <span className="eyebrow-num">01</span>
              <span className="eyebrow-slash">/</span>
              <span className="eyebrow-text">ABOUT THE ENGINEER</span>
            </div>
            <span className="eyebrow-motto">
              Precision, curiosity, and dependable software.
            </span>
          </motion.div>
        </header>

        {/* KISHOR'S AUTHENTIC PORTRAIT CUTOUT */}
        <div className="stage-figure-wrapper" aria-hidden="true">
          <motion.div
            className="stage-figure-motion"
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={inView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.9, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
          >
            <img
              src={kishorCutout}
              alt="Kishor Gogoi — QA Engineer"
              className="stage-figure-img"
              loading="lazy"
            />
            {/* Ambient backlight glow */}
            <div className="stage-figure-glow" />
          </motion.div>
        </div>

        {/* ── 3. UNIFIED EDITORIAL HERO GROUP (Prose + CTAs + Oversized Headline) ── */}
        <div className="stage-editorial-group">
          {/* Narrative Glass Card + Action Targets */}
          <motion.div
            className="stage-prose-card"
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.65, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="stage-prose-text">
              I'm a <strong className="prose-accent">Computer Science graduate</strong> focused on{' '}
              <strong className="prose-accent">software quality</strong>,{' '}
              <strong className="prose-accent">test automation</strong>, and building{' '}
              <strong className="prose-accent">reliable digital experiences</strong>. I enjoy exploring edge cases,
              validating APIs, and creating maintainable automation workflows that help teams deliver software with
              confidence.
            </p>

            {/* Action Buttons grouped directly with the narrative */}
            <div className="stage-cta-wrapper">
              <a
                href="#pipeline-runs"
                id="stage-cta-projects"
                className="stage-pill-cta"
              >
                <span>EXPLORE MY WORK</span>
                <ArrowUpRight size={16} className="pill-cta-arrow" />
              </a>

              {onOpenResume && (
                <button
                  type="button"
                  onClick={onOpenResume}
                  className="stage-secondary-btn"
                >
                  <span>RESUME</span>
                </button>
              )}
            </div>
          </motion.div>

          {/* OVERSIZED EDITORIAL HEADLINE + REFLECTION */}
          <div className="stage-headline-zone">
            <motion.div
              className="stage-oversized-headline"
              initial={{ opacity: 0, y: 18 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
              transition={{ duration: 0.75, delay: 0.38, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Primary Headline: "MORE THAN" and "JUST TESTING." on two distinct lines */}
              <h2 className="stage-title">
                <span className="stage-title-line stage-title-line--1">MORE THAN</span>
                <span className="stage-title-line stage-title-line--2">JUST TESTING.</span>
              </h2>

              {/* Mirrored Vertical Reflection */}
              <div className="stage-title-reflection" aria-hidden="true">
                <span className="reflection-line reflection-line--1">MORE THAN</span>
                <span className="reflection-line reflection-line--2">JUST TESTING.</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════
          SCOPED STYLES — POLISHED CINEMATIC EDITORIAL LAYOUT
          ══════════════════════════════════════════════════════════ */}
      <style>{`
        .cinematic-stage-section {
          position: relative;
          min-height: calc(100svh - 64px);
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          overflow: hidden;
          background: #070A0E;
          scroll-margin-top: 64px;
        }

        .anchor-shim {
          position: absolute;
          top: -64px;
          left: 0;
          height: 0;
          width: 0;
          opacity: 0;
          pointer-events: none;
        }

        /* ── 1. BACKGROUND PHOTOGRAPH & LAYERED GRADIENTS ── */
        .stage-bg-layer {
          position: absolute;
          inset: 0;
          z-index: 0;
          overflow: hidden;
          pointer-events: none;
        }

        .stage-bg-image {
          position: absolute;
          inset: -2%;
          background-size: cover;
          background-position: center 36%;
          background-repeat: no-repeat;
          filter: brightness(0.82) contrast(1.1) saturate(1.15);
          will-change: transform, opacity;
        }

        .stage-overlay {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        /* Gentle top transition preserving navbar separation */
        .stage-overlay--top {
          background: linear-gradient(
            to bottom,
            #070A0E 0%,
            rgba(7, 10, 14, 0.75) 8%,
            rgba(7, 10, 14, 0.2) 20%,
            transparent 35%
          );
        }

        /* Bottom transition fading into next section */
        .stage-overlay--bottom {
          background: linear-gradient(
            to top,
            #070A0E 0%,
            rgba(7, 10, 14, 0.8) 10%,
            rgba(7, 10, 14, 0.2) 24%,
            transparent 40%
          );
        }

        /* Lateral edge vignette - keeps central monitors & desk lit */
        .stage-overlay--sides {
          background: linear-gradient(
            to right,
            rgba(7, 10, 14, 0.6) 0%,
            transparent 18%,
            transparent 82%,
            rgba(7, 10, 14, 0.6) 100%
          );
        }

        /* Subtle radial depth */
        .stage-overlay--vignette {
          background: radial-gradient(
            ellipse 90% 75% at 50% 48%,
            transparent 42%,
            rgba(7, 10, 14, 0.4) 75%,
            rgba(7, 10, 14, 0.7) 100%
          );
        }

        /* ── 2. FOREGROUND CONTENT CONTAINER ── */
        .stage-content-container {
          position: relative;
          z-index: 2;
          width: 100%;
          max-width: 1360px;
          margin: 0 auto;
          height: 100%;
          min-height: calc(100svh - 64px);
          padding: 4.5rem clamp(1.25rem, 3.5vw, 3.5rem) 2rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          box-sizing: border-box;
        }

        /* ── TOP BAR: IDENTITY & EYEBROW ── */
        .stage-top-bar {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 1.5rem;
          width: 100%;
          flex-wrap: wrap;
          position: relative;
          z-index: 3;
          margin-bottom: 0;
        }

        /* Identity (Left) */
        .stage-identity {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }

        .identity-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.55rem;
        }

        .identity-live-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: var(--color-accent-pass, #4ADE9A);
          box-shadow: 0 0 10px rgba(74, 222, 154, 0.9);
        }

        .identity-title {
          font-family: var(--font-mono, monospace);
          font-size: clamp(0.8rem, 0.85vw, 0.88rem);
          font-weight: 700;
          letter-spacing: 0.18em;
          color: #FAF7F2;
        }

        .identity-subtitle {
          font-family: var(--font-mono, monospace);
          font-size: clamp(0.68rem, 0.74vw, 0.74rem);
          font-weight: 500;
          letter-spacing: 0.14em;
          color: #94A3B8;
          padding-left: 17px;
        }

        /* Eyebrow (Right) */
        .stage-eyebrow {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          text-align: right;
          gap: 0.35rem;
        }

        .eyebrow-index-group {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          font-family: var(--font-mono, monospace);
          font-size: clamp(0.76rem, 0.8vw, 0.84rem);
          font-weight: 600;
          letter-spacing: 0.18em;
          text-transform: uppercase;
        }

        .eyebrow-num {
          color: var(--color-accent-pass, #4ADE9A);
          font-weight: 800;
        }

        .eyebrow-slash {
          color: rgba(255, 255, 255, 0.35);
        }

        .eyebrow-text {
          color: #E2E8F0;
        }

        .eyebrow-motto {
          font-family: var(--font-sans, sans-serif);
          font-size: clamp(0.82rem, 0.86vw, 0.9rem);
          color: #94A3B8;
          letter-spacing: 0.01em;
        }

        /* ── 3. KISHOR'S PORTRAIT CUTOUT LAYER ── */
        .stage-figure-wrapper {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          top: clamp(3.2rem, 5vh, 4.5rem);
          height: clamp(320px, 44vh, 440px);
          display: flex;
          justify-content: center;
          align-items: flex-start;
          z-index: 1;
          pointer-events: none;
        }

        .stage-figure-motion {
          position: relative;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: flex-start;
        }

        .stage-figure-img {
          height: 100%;
          width: auto;
          max-height: 440px;
          object-fit: contain;
          mask-image: linear-gradient(to bottom, black 65%, rgba(0, 0, 0, 0.35) 85%, transparent 100%);
          -webkit-mask-image: linear-gradient(to bottom, black 65%, rgba(0, 0, 0, 0.35) 85%, transparent 100%);
          filter: drop-shadow(0 16px 36px rgba(0, 0, 0, 0.92)) drop-shadow(0 0 20px rgba(10, 15, 20, 0.5));
          user-select: none;
          pointer-events: none;
        }

        .stage-figure-glow {
          position: absolute;
          top: 32%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: clamp(280px, 32vw, 400px);
          height: clamp(280px, 32vw, 400px);
          background: radial-gradient(
            circle,
            rgba(74, 222, 154, 0.1) 0%,
            rgba(56, 189, 248, 0.05) 42%,
            transparent 70%
          );
          filter: blur(48px);
          z-index: -1;
          pointer-events: none;
        }

        /* ── 4. UNIFIED EDITORIAL HERO GROUP ── */
        .stage-editorial-group {
          position: relative;
          z-index: 2;
          width: 100%;
          max-width: 960px;
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-top: clamp(16.5rem, 26vh, 21rem);
          margin-bottom: 0;
        }

        /* Narrative Glass Card */
        .stage-prose-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          width: 100%;
          max-width: 650px;
          background: rgba(7, 10, 14, 0.74);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          padding: clamp(0.95rem, 1.6vw, 1.25rem) clamp(1.2rem, 2.2vw, 1.9rem);
          box-shadow: 
            0 20px 45px rgba(0, 0, 0, 0.75),
            0 0 1px rgba(255, 255, 255, 0.15);
          margin-bottom: clamp(1rem, 1.8vh, 1.5rem);
        }

        .stage-prose-text {
          margin: 0 0 1.1rem;
          font-family: var(--font-sans, sans-serif);
          font-size: clamp(0.95rem, 1.1vw, 1.05rem);
          line-height: 1.68;
          color: #E2E8F0;
          letter-spacing: -0.005em;
        }

        .prose-accent {
          color: #FFFFFF;
          font-weight: 600;
        }

        /* Action Buttons */
        .stage-cta-wrapper {
          display: flex;
          align-items: center;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
        }

        .stage-pill-cta {
          display: inline-flex;
          align-items: center;
          gap: 0.55rem;
          font-family: var(--font-mono, monospace);
          font-size: clamp(0.82rem, 0.9vw, 0.88rem);
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          text-decoration: none;
          color: #070A0E;
          background: #FAF7F2;
          padding: 13px 30px;
          min-height: 48px;
          box-sizing: border-box;
          border-radius: 999px;
          box-shadow: 
            0 8px 25px rgba(0, 0, 0, 0.6),
            0 0 20px rgba(250, 247, 242, 0.25);
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .stage-pill-cta:hover {
          background: var(--color-accent-pass, #4ADE9A);
          color: #070A0E;
          box-shadow: 
            0 8px 32px rgba(74, 222, 154, 0.45),
            0 0 25px rgba(74, 222, 154, 0.35);
          transform: translateY(-2px);
        }

        .pill-cta-arrow {
          transition: transform 0.2s ease;
        }

        .stage-pill-cta:hover .pill-cta-arrow {
          transform: translate(2px, -2px);
        }

        .stage-secondary-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-mono, monospace);
          font-size: clamp(0.8rem, 0.86vw, 0.85rem);
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #E2E8F0;
          background: rgba(15, 20, 25, 0.72);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.24);
          padding: 12px 26px;
          min-height: 48px;
          box-sizing: border-box;
          border-radius: 999px;
          cursor: pointer;
          transition: all 0.25s ease;
        }

        .stage-secondary-btn:hover {
          color: #FFFFFF;
          border-color: rgba(255, 255, 255, 0.5);
          background: rgba(255, 255, 255, 0.12);
          transform: translateY(-2px);
        }

        /* ── 5. OVERSIZED EDITORIAL SERIF HEADLINE + REFLECTION ── */
        .stage-headline-zone {
          width: 100%;
          position: relative;
          user-select: none;
          margin: 0;
          padding-bottom: 0.5rem;
        }

        .stage-oversized-headline {
          position: relative;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .stage-title {
          margin: 0;
          font-family: var(--font-serif, 'Playfair Display', Georgia, serif);
          font-size: clamp(2.3rem, 5vw, 4.6rem);
          font-weight: 800;
          line-height: 0.92;
          letter-spacing: -0.025em;
          text-transform: uppercase;
          color: #FAF7F2;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-shadow: 
            0 10px 35px rgba(0, 0, 0, 0.98),
            0 2px 8px rgba(0, 0, 0, 0.9);
          width: 100%;
          max-width: 100%;
          overflow-wrap: break-word;
        }

        .stage-title-line {
          display: block;
          white-space: nowrap;
          text-align: center;
        }

        .stage-title-line--1 {
          color: #FAF7F2;
        }

        .stage-title-line--2 {
          color: #FAF7F2;
          margin-top: 0.02em;
        }

        /* Mirrored Vertical Reflection */
        .stage-title-reflection {
          position: absolute;
          top: 96%;
          left: 0;
          right: 0;
          margin: 0 auto;
          font-family: var(--font-serif, 'Playfair Display', Georgia, serif);
          font-size: clamp(2.3rem, 5vw, 4.6rem);
          font-weight: 800;
          line-height: 0.92;
          letter-spacing: -0.025em;
          text-transform: uppercase;
          color: #FAF7F2;
          opacity: 0.08;
          transform: scaleY(-1);
          transform-origin: top;
          mask-image: linear-gradient(to bottom, rgba(255, 255, 255, 0.75) 0%, transparent 60%);
          -webkit-mask-image: linear-gradient(to bottom, rgba(255, 255, 255, 0.75) 0%, transparent 60%);
          pointer-events: none;
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
        }

        .reflection-line {
          display: block;
          white-space: nowrap;
          text-align: center;
        }

        /* ── COMPACT LAPTOPS & SHORT VIEWPORTS (e.g. 1366x768, 1024x768) ── */
        @media (max-height: 820px) and (min-width: 769px) {
          .stage-content-container {
            padding-top: 4rem;
            padding-bottom: 1rem;
          }

          .stage-figure-wrapper {
            top: 3rem;
            height: clamp(260px, 36vh, 320px);
          }

          .stage-figure-img {
            max-height: 320px;
          }

          .stage-editorial-group {
            margin-top: clamp(12rem, 21vh, 15rem);
          }

          .stage-prose-card {
            max-width: 580px;
            padding: 0.75rem 1.25rem;
            margin-bottom: 0.75rem;
          }

          .stage-prose-text {
            margin-bottom: 0.75rem;
            font-size: 0.92rem;
            line-height: 1.55;
          }

          .stage-pill-cta {
            padding: 10px 24px;
            min-height: 42px;
            font-size: 0.8rem;
          }

          .stage-secondary-btn {
            padding: 9px 20px;
            min-height: 42px;
            font-size: 0.78rem;
          }

          .stage-title,
          .stage-title-reflection {
            font-size: clamp(2rem, 4.2vw, 3.4rem);
          }
        }

        /* ── TABLET & INTERMEDIATE BREAKPOINTS ── */
        @media (max-width: 1024px) {
          .stage-content-container {
            padding: 4.5rem 1.75rem 1.5rem;
          }

          .stage-figure-wrapper {
            height: clamp(240px, 32vh, 300px);
          }

          .stage-title,
          .stage-title-reflection {
            font-size: clamp(2rem, 5.2vw, 4rem);
          }
        }

        /* ── TABLET PORTRAIT & MOBILE BREAKPOINTS ── */
        @media (max-width: 768px) {
          .cinematic-stage-section {
            min-height: auto;
          }

          .stage-content-container {
            padding: 5rem 1.25rem 2.5rem;
            min-height: auto;
          }

          .stage-top-bar {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
            margin-bottom: 1rem;
          }

          .stage-eyebrow {
            align-items: flex-start;
            text-align: left;
          }

          .stage-figure-wrapper {
            position: relative;
            left: auto;
            transform: none;
            top: auto;
            height: 280px;
            width: 100%;
            display: flex;
            justify-content: center;
            margin: 0.25rem auto 1rem;
          }

          .stage-figure-img {
            height: 280px;
            max-height: 280px;
          }

          .stage-editorial-group {
            margin-top: 0;
            margin-bottom: 0;
          }

          .stage-prose-card {
            margin-bottom: 1.25rem;
          }

          .stage-title {
            font-size: clamp(1.9rem, 7.8vw, 3.2rem);
            line-height: 0.94;
          }

          .stage-title-reflection {
            display: none;
          }
        }

        /* ── MOBILE (390px & SMALLER) ── */
        @media (max-width: 480px) {
          .stage-content-container {
            padding: 5rem 1rem 2.25rem;
          }

          .stage-figure-wrapper {
            height: 240px;
            margin-bottom: 0.75rem;
          }

          .stage-figure-img {
            height: 240px;
            max-height: 240px;
          }

          .stage-title {
            font-size: clamp(1.7rem, 7.6vw, 2.25rem);
            letter-spacing: -0.02em;
          }

          .stage-prose-card {
            padding: 0.95rem 1.1rem;
            border-radius: 16px;
            margin-bottom: 1.25rem;
          }

          .stage-prose-text {
            font-size: 0.92rem;
            line-height: 1.62;
          }

          .stage-pill-cta {
            font-size: 0.76rem;
            padding: 12px 24px;
            min-height: 44px;
          }

          .stage-secondary-btn {
            font-size: 0.76rem;
            padding: 11px 20px;
            min-height: 44px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .stage-bg-image,
          .stage-figure-wrapper,
          .cinematic-stage-section * {
            transition: none !important;
            animation: none !important;
            transform: none !important;
          }
        }
      `}</style>
    </section>
  )
}
