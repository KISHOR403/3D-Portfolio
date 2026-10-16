import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import aboutBg from '../assets/about-bg.jpg'
import kishorCutout from '../assets/profile-cutout.png'

/* ═══════════════════════════════════════════════════════════════
   CINEMATIC HERO-STYLE ABOUT SECTION — QA ENGINEER PORTFOLIO
   ═══════════════════════════════════════════════════════════════
   Directly matching reference design:
   - Full-bleed atmospheric tech background with dark vignette
   - Kishor's authentic portrait cutout prominently centered
   - Centered concise description layered over the torso
   - Luminous white pill CTA button ("EXPLORE MY WORK ↗")
   - Dramatically oversized editorial serif typography:
     "MORE THAN JUST TESTING."
   - Mirrored low-opacity vertical reflection fading into darkness
   - Preserves all navigation targets (#about, #experience, #test-plan)
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

      {/* ── 1. FULL-WIDTH ATMOSPHERIC BACKGROUND ── */}
      <div className="stage-bg-layer" aria-hidden="true">
        <motion.div
          className="stage-bg-image"
          style={{ backgroundImage: `url(${aboutBg})` }}
          initial={{ scale: 1.05, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : { scale: 1.05, opacity: 0 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        />
        {/* Layered moody gradients for high contrast */}
        <div className="stage-overlay stage-overlay--vertical" />
        <div className="stage-overlay stage-overlay--radial" />
        <div className="stage-overlay stage-overlay--vignette" />
      </div>

      {/* ── 2. KISHOR'S PROMINENT CENTERED PORTRAIT CUTOUT ── */}
      <div className="stage-figure-layer" aria-hidden="true">
        <motion.div
          className="stage-figure-wrapper"
          initial={{ opacity: 0, y: 35, scale: 0.96 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 35, scale: 0.96 }}
          transition={{ duration: 1.1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <img
            src={kishorCutout}
            alt="Kishor Gogoi — QA Engineer"
            className="stage-figure-img"
            loading="lazy"
          />
          {/* Subtle backlighting glow behind Kishor */}
          <div className="stage-figure-glow" />
        </motion.div>
      </div>

      {/* ── 3. FOREGROUND TEXT & INTERACTIVE CONTENT ── */}
      <div className="stage-content-container">
        {/* TOP BAR: Identity & Eyebrow */}
        <div className="stage-top-bar">
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
            <span className="identity-subtitle">QA ENGINEER · TEST AUTOMATION</span>
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
        </div>

        {/* CENTER OVERLAY: Concise Narrative + Pill CTA (over figure) */}
        <div className="stage-center-prose-zone">
          <motion.p
            className="stage-prose-text"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            I'm a <strong className="prose-accent">Computer Science graduate</strong> focused on{' '}
            <strong className="prose-accent">software quality</strong>,{' '}
            <strong className="prose-accent">test automation</strong>, and building{' '}
            <strong className="prose-accent">reliable digital experiences</strong>. I enjoy exploring edge cases,
            validating APIs, and creating maintainable automation workflows that help teams deliver software with
            confidence.
          </motion.p>

          {/* Luminous Pill Button (like reference "Book Now") */}
          <motion.div
            className="stage-cta-wrapper"
            initial={{ opacity: 0, y: 15 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
            transition={{ duration: 0.6, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            <a
              href="#pipeline-runs"
              id="stage-cta-projects"
              className="stage-pill-cta"
            >
              <span>EXPLORE MY WORK</span>
              <ArrowUpRight size={14} className="pill-cta-arrow" />
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
          </motion.div>
        </div>

        {/* BOTTOM SECTION: OVERSIZED EDITORIAL HEADLINE + REFLECTION */}
        <div className="stage-headline-zone">
          <motion.div
            className="stage-oversized-headline"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.85, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Primary Headline */}
            <h2 className="stage-title">
              <span className="stage-title-line stage-title-line--1">MORE THAN</span>
              <span className="stage-title-line stage-title-line--2">JUST TESTING.</span>
            </h2>

            {/* Mirrored Vertical Reflection (exact match to reference image) */}
            <div className="stage-title-reflection" aria-hidden="true">
              <span className="reflection-line reflection-line--1">MORE THAN</span>
              <span className="reflection-line reflection-line--2">JUST TESTING.</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════
          SCOPED STYLES — EXACT MATCH TO USER REFERENCE COMPOSITION
          ══════════════════════════════════════════════════════════ */}
      <style>{`
        .cinematic-stage-section {
          position: relative;
          min-height: 98svh;
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          overflow: hidden;
          background: #070A0E;
          scroll-margin-top: 80px;
        }

        .anchor-shim {
          position: absolute;
          top: -80px;
          left: 0;
          height: 0;
          width: 0;
          opacity: 0;
          pointer-events: none;
        }

        /* ── 1. BACKGROUND PHOTOGRAPH LAYER ── */
        .stage-bg-layer {
          position: absolute;
          inset: 0;
          z-index: 0;
          overflow: hidden;
          pointer-events: none;
        }

        .stage-bg-image {
          position: absolute;
          inset: -3%;
          background-size: cover;
          background-position: center 30%;
          background-repeat: no-repeat;
          filter: brightness(0.6) contrast(1.15) saturate(1.05);
          will-change: transform, opacity;
        }

        .stage-overlay {
          position: absolute;
          inset: 0;
        }

        /* Top & bottom gradient fading into site black */
        .stage-overlay--vertical {
          background: linear-gradient(
            to bottom,
            rgba(15, 20, 25, 0.95) 0%,
            rgba(15, 20, 25, 0.45) 20%,
            rgba(8, 12, 16, 0.35) 50%,
            rgba(10, 14, 18, 0.75) 80%,
            rgba(15, 20, 25, 1) 100%
          );
        }

        .stage-overlay--radial {
          background: radial-gradient(
            circle at 50% 45%,
            transparent 20%,
            rgba(8, 11, 15, 0.7) 70%,
            rgba(8, 11, 15, 0.98) 100%
          );
        }

        .stage-overlay--vignette {
          box-shadow: inset 0 0 100px rgba(0, 0, 0, 0.85);
        }

        /* ── 2. CENTERED KISHOR FIGURE CUTOUT LAYER ── */
        .stage-figure-layer {
          position: absolute;
          inset: 0;
          z-index: 1;
          display: flex;
          justify-content: center;
          align-items: flex-start;
          pointer-events: none;
        }

        .stage-figure-wrapper {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: flex-start;
          height: 100%;
          max-height: 850px;
          margin-top: 4svh;
        }

        .stage-figure-img {
          height: 82svh;
          max-height: 760px;
          width: auto;
          object-fit: contain;
          filter: drop-shadow(0 20px 45px rgba(0, 0, 0, 0.95));
          user-select: none;
          pointer-events: none;
        }

        /* Subtle atmospheric ambient glow behind Kishor */
        .stage-figure-glow {
          position: absolute;
          top: 25%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 480px;
          height: 480px;
          background: radial-gradient(
            circle,
            rgba(74, 222, 154, 0.12) 0%,
            rgba(56, 189, 248, 0.06) 40%,
            transparent 70%
          );
          filter: blur(60px);
          z-index: -1;
          pointer-events: none;
        }

        /* ── 3. FOREGROUND CONTENT CONTAINER ── */
        .stage-content-container {
          position: relative;
          z-index: 2;
          width: 100%;
          max-width: 1440px;
          margin: 0 auto;
          min-height: 98svh;
          padding: 5.5rem 3rem 2.25rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          box-sizing: border-box;
        }

        /* ── TOP BAR: IDENTITY & EYEBROW ── */
        .stage-top-bar {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 2rem;
          flex-wrap: wrap;
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
          gap: 0.5rem;
        }

        .identity-live-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--color-accent-pass, #4ADE9A);
          box-shadow: 0 0 8px rgba(74, 222, 154, 0.8);
        }

        .identity-title {
          font-family: var(--font-mono, monospace);
          font-size: 0.74rem;
          font-weight: 700;
          letter-spacing: 0.16em;
          color: #FAF7F2;
        }

        .identity-subtitle {
          font-family: var(--font-mono, monospace);
          font-size: 0.65rem;
          font-weight: 500;
          letter-spacing: 0.12em;
          color: #94A3B8;
          padding-left: 14px;
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
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.18em;
          text-transform: uppercase;
        }

        .eyebrow-num {
          color: var(--color-accent-pass, #4ADE9A);
          font-weight: 700;
        }

        .eyebrow-slash {
          color: rgba(255, 255, 255, 0.3);
        }

        .eyebrow-text {
          color: #CBD5E1;
        }

        .eyebrow-motto {
          font-family: var(--font-sans, sans-serif);
          font-size: 0.8rem;
          color: #8E9BAE;
          letter-spacing: 0.01em;
        }

        /* ── CENTER PROSE & PILL CTA (Directly over figure chest) ── */
        .stage-center-prose-zone {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          max-width: 660px;
          margin: 34svh auto 1.75rem;
          padding: 0 1rem;
          position: relative;
        }

        .stage-prose-text {
          margin: 0 0 1.5rem;
          font-family: var(--font-sans, sans-serif);
          font-size: clamp(0.95rem, 1.25vw, 1.08rem);
          line-height: 1.76;
          color: #E2E8F0;
          text-shadow: 
            0 2px 14px rgba(0, 0, 0, 0.98),
            0 4px 30px rgba(0, 0, 0, 0.95),
            0 0 8px rgba(0, 0, 0, 0.9);
          letter-spacing: -0.005em;
        }

        .prose-accent {
          color: #FFFFFF;
          font-weight: 600;
        }

        /* Luminous Pill Button (like reference "Book Now") */
        .stage-cta-wrapper {
          display: flex;
          align-items: center;
          gap: 1.25rem;
          justify-content: center;
          flex-wrap: wrap;
        }

        .stage-pill-cta {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-family: var(--font-mono, monospace);
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          text-decoration: none;
          color: #0A0E13;
          background: #FAF7F2;
          padding: 13px 30px;
          border-radius: 999px;
          box-shadow: 
            0 8px 30px rgba(0, 0, 0, 0.6),
            0 0 25px rgba(250, 247, 242, 0.25);
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .stage-pill-cta:hover {
          background: var(--color-accent-pass, #4ADE9A);
          color: #0A0E13;
          box-shadow: 
            0 8px 35px rgba(74, 222, 154, 0.45),
            0 0 30px rgba(74, 222, 154, 0.35);
          transform: translateY(-2px) scale(1.02);
        }

        .pill-cta-arrow {
          transition: transform 0.2s ease;
        }

        .stage-pill-cta:hover .pill-cta-arrow {
          transform: translate(2px, -2px);
        }

        .stage-secondary-btn {
          font-family: var(--font-mono, monospace);
          font-size: 0.74rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          color: #CBD5E1;
          background: rgba(15, 20, 25, 0.75);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          padding: 12px 24px;
          border-radius: 999px;
          cursor: pointer;
          transition: all 0.25s ease;
        }

        .stage-secondary-btn:hover {
          color: #FFFFFF;
          border-color: rgba(255, 255, 255, 0.45);
          background: rgba(255, 255, 255, 0.1);
          transform: translateY(-2px);
        }

        /* ── 4. OVERSIZED EDITORIAL SERIF HEADLINE + REFLECTION (Like "MUSIC EVENT") ── */
        .stage-headline-zone {
          width: 100%;
          position: relative;
          user-select: none;
          margin-top: auto;
          padding-bottom: 0.75rem;
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
          font-size: clamp(3.8rem, 11.2vw, 11rem);
          font-weight: 800;
          line-height: 0.88;
          letter-spacing: -0.035em;
          text-transform: uppercase;
          color: #FAF7F2;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-shadow: 
            0 8px 30px rgba(0, 0, 0, 0.95),
            0 2px 6px rgba(0, 0, 0, 0.9);
          width: 100%;
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

        /* Mirrored Vertical Reflection (exact match to reference image floor reflection) */
        .stage-title-reflection {
          position: absolute;
          top: 98%;
          left: 0;
          right: 0;
          margin: 0 auto;
          font-family: var(--font-serif, 'Playfair Display', Georgia, serif);
          font-size: clamp(3.8rem, 11.2vw, 11rem);
          font-weight: 800;
          line-height: 0.88;
          letter-spacing: -0.035em;
          text-transform: uppercase;
          color: #FAF7F2;
          opacity: 0.12;
          transform: scaleY(-1);
          transform-origin: top;
          mask-image: linear-gradient(to bottom, rgba(255, 255, 255, 0.9) 0%, transparent 65%);
          -webkit-mask-image: linear-gradient(to bottom, rgba(255, 255, 255, 0.9) 0%, transparent 65%);
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

        /* ── RESPONSIVE ADAPTATIONS (Tablet & Mobile) ── */
        @media (max-width: 1024px) {
          .stage-content-container {
            padding: 5rem 2rem 2rem;
          }

          .stage-figure-img {
            height: 70svh;
            max-height: 580px;
          }

          .stage-title,
          .stage-title-reflection {
            font-size: clamp(3.2rem, 11vw, 7.8rem);
          }
        }

        @media (max-width: 768px) {
          .cinematic-stage-section {
            min-height: auto;
          }

          .stage-content-container {
            padding: 5.5rem 1.5rem 2.5rem;
            min-height: auto;
          }

          .stage-top-bar {
            flex-direction: column;
            align-items: flex-start;
            gap: 1.25rem;
          }

          .stage-eyebrow {
            align-items: flex-start;
            text-align: left;
          }

          .stage-figure-layer {
            position: relative;
            height: 380px;
            margin-top: 1rem;
          }

          .stage-figure-wrapper {
            height: 100%;
            margin-top: 0;
          }

          .stage-figure-img {
            height: 380px;
            max-height: 380px;
          }

          .stage-center-prose-zone {
            margin: 1.5rem auto;
          }

          .stage-title,
          .stage-title-reflection {
            font-size: clamp(2.6rem, 11.5vw, 4.8rem);
            line-height: 0.92;
          }

          .stage-title-reflection {
            display: none; /* Hide reflection on mobile for maximum legibility */
          }
        }

        @media (max-width: 480px) {
          .stage-content-container {
            padding: 5rem 1.2rem 2rem;
          }

          .stage-figure-img {
            height: 320px;
            max-height: 320px;
          }

          .stage-title {
            font-size: clamp(2.3rem, 12vw, 3.6rem);
            letter-spacing: -0.025em;
          }

          .stage-prose-text {
            font-size: 0.93rem;
            line-height: 1.68;
          }

          .stage-pill-cta {
            font-size: 0.74rem;
            padding: 12px 24px;
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
