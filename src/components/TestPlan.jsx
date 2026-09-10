import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Download, ArrowDownRight, Compass } from 'lucide-react'
import profileImg from '../assets/profile.jpg'

/* ═══════════════════════════════════════════════════════════════
   ABOUT — Swiss Creative Technology Dossier
   ═══════════════════════════════════════════════════════════════
   Asymmetric editorial  ·  Typographic statement  ·  Precision grid
   ─────────────────────────────────────────────────────────────── */

const DOSSIER_ENTRIES = [
  {
    index: '01',
    label: 'DISPONIBILITY',
    primary: 'AVAILABLE FOR HIRE',
    secondary: 'Immediate start · Full-time',
    isAccent: true,
  },
  {
    index: '02',
    label: 'OPERATIONAL BASE',
    primary: 'BENGALURU, INDIA',
    secondary: 'Relocation: Pune · Hyderabad · NCR · Mumbai',
  },
  {
    index: '03',
    label: 'PRIMARY STACK',
    primary: 'SELENIUM · APPIUM · REST ASSURED',
    secondary: 'Java · Python · Postman · SQL · TestNG',
  },
  {
    index: '04',
    label: 'ACTIVE INITIATIVES',
    primary: 'TESTNEXA AI & REPOWIKI AI',
    secondary: 'AI-assisted test generation & documentation',
  },
]

export default function TestPlan({ onOpenResume }) {
  const [imgError, setImgError] = useState(false)
  const sectionRef = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.unobserve(el)
        }
      },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => { if (el) observer.unobserve(el) }
  }, [])

  return (
    <section
      id="test-plan"
      ref={sectionRef}
      className="swiss-dossier"
    >
      <div className="dossier-inner">
        {/* ── TOP EDITORIAL HEADER BAR ── */}
        <motion.div
          className="dossier-header-bar"
          initial={{ opacity: 0, y: -10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="dossier-header-left">
            <span className="dossier-header-index">01</span>
            <span className="dossier-header-sep">—</span>
            <h3 className="dossier-header-title">ABOUT</h3>
          </div>

          <div className="dossier-header-line" aria-hidden="true" />

          <div className="dossier-header-meta">
            <span className="dossier-meta-coord">12°58′N 77°35′E</span>
            <span className="dossier-meta-dot" />
            <span className="dossier-meta-tag">DOSSIER // ARCHIVE 2026</span>
          </div>
        </motion.div>

        {/* ── STATEMENT + DECORATIVE TRACK BANNER ── */}
        <div className="dossier-statement-row">
          <motion.div
            className="dossier-statement-col"
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="dossier-eyebrow">
              <span className="dossier-eyebrow-bullet">■</span>
              <span>PHILOSOPHY & DISCIPLINE</span>
            </div>
            <h2 className="dossier-headline section-headline-editorial">
              <span className="shading-word">I</span>
              <span className="shading-word">build</span>
              <span className="shading-word">quality</span><br />
              <span className="shading-word">into</span>
              <span className="shading-word">software.</span>
            </h2>
          </motion.div>

          {/* Decorative Swiss Typography Banner */}
          <motion.div
            className="dossier-badge-col"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.25 }}
            aria-hidden="true"
          >
            <div className="dossier-badge">
              <span className="dossier-badge-cross">+</span>
              <span className="dossier-badge-text">ENGINEER / TEST / BUILD</span>
              <span className="dossier-badge-version">REV.04</span>
            </div>
            <div className="dossier-badge-sub">
              QUALITY ASSURANCE & TEST ARCHITECTURE
            </div>
          </motion.div>
        </div>

        {/* ── EDITORIAL ASYMMETRICAL BODY ── */}
        <div className="dossier-body-grid">
          {/* ── LEFT / FOCAL POINT: RECTANGULAR PROFILE WITH OFFSET FRAME ── */}
          <motion.div
            className="dossier-photo-zone"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="dossier-photo-frame">
              {/* Offset geometric background layer */}
              <div className="dossier-photo-offset" aria-hidden="true">
                <span className="offset-label-tl">[ REF. KG-26 ]</span>
                <span className="offset-label-br">QA // 1.0</span>
              </div>

              {/* Main image container */}
              <div className="dossier-photo-box">
                {!imgError ? (
                  <img
                    src={profileImg}
                    alt="Kishor Gogoi — QA Engineer"
                    onError={() => setImgError(true)}
                    className="dossier-photo-img"
                  />
                ) : (
                  <div className="dossier-photo-monogram">
                    <span>KG</span>
                  </div>
                )}

                {/* Corner hairline brackets */}
                <div className="photo-bracket photo-bracket--tl" aria-hidden="true" />
                <div className="photo-bracket photo-bracket--tr" aria-hidden="true" />
                <div className="photo-bracket photo-bracket--bl" aria-hidden="true" />
                <div className="photo-bracket photo-bracket--br" aria-hidden="true" />

                {/* Overlaid status badge */}
                <div className="photo-status-badge">
                  <span className="photo-status-indicator" />
                  <span>ACTIVE / READY</span>
                </div>
              </div>

              {/* Editorial caption strip under image */}
              <div className="dossier-photo-caption">
                <div className="caption-main">
                  <span className="caption-fig">FIG. 01</span>
                  <span className="caption-name">KISHOR GOGOI</span>
                </div>
                <div className="caption-role">
                  BENGALURU, KARNATAKA
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── RIGHT: EDITORIAL INTRO + DOSSIER ENTRIES + ACTIONS ── */}
          <div className="dossier-content-zone">
            {/* Editorial Bio Intro Block — Senior Editorial Typography (3-Level Hierarchy) */}
            <motion.div
              className="dossier-narrative"
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Level 1 & 2: Primary Statement & Core Technical Authority */}
              <div className="editorial-lead-section">
                <p className="editorial-lead-para">
                  <span className="editorial-lead-lede">
                    Results-driven <span className="editorial-emphasis-primary">QA Engineer</span>
                  </span>{' '}
                  <span className="editorial-lead-connect">with hands-on experience in</span>{' '}
                  <span className="editorial-emphasis-role">manual and automation testing</span>{' '}
                  <span className="editorial-lead-connect">using</span>{' '}
                  <span className="editorial-tool-group">
                    <span className="editorial-emphasis-tool">Selenium</span>
                    <span className="editorial-tool-punct">,</span>{' '}
                    <span className="editorial-emphasis-tool">Appium</span>
                    <span className="editorial-tool-punct">, and</span>{' '}
                    <span className="editorial-emphasis-tool">REST Assured</span>
                  </span>
                  <span className="editorial-lead-connect">.</span>
                </p>

                <p className="editorial-support-para">
                  <span className="editorial-support-text">Skilled in</span>{' '}
                  <span className="editorial-emphasis-spec">SDLC/STLC</span>
                  <span className="editorial-support-text">, test case design, defect lifecycle management,</span>{' '}
                  <span className="editorial-emphasis-spec">SQL validation</span>
                  <span className="editorial-support-text">, and</span>{' '}
                  <span className="editorial-emphasis-spec">API testing</span>{' '}
                  <span className="editorial-support-text">with Postman.</span>
                </p>
              </div>

              {/* Level 3: Secondary Supporting Narrative (Restrained) */}
              <div className="editorial-secondary-section">
                <p className="editorial-secondary-para">
                  <span className="editorial-secondary-quiet">
                    As a recently graduated Computer Science Engineer, I've built
                  </span>{' '}
                  <span className="editorial-emphasis-arch">data-driven frameworks</span>{' '}
                  <span className="editorial-secondary-quiet">with</span>{' '}
                  <span className="editorial-emphasis-arch">Page Object Model</span>{' '}
                  <span className="editorial-secondary-quiet">patterns, integrated</span>{' '}
                  <span className="editorial-emphasis-pipeline">CI/CD</span>{' '}
                  <span className="editorial-secondary-quiet">pipelines via</span>{' '}
                  <span className="editorial-emphasis-tech">GitHub Actions</span>{' '}
                  <span className="editorial-secondary-quiet">and</span>{' '}
                  <span className="editorial-emphasis-tech">Jenkins</span>
                  <span className="editorial-secondary-quiet">
                    , and delivered stable, high-quality releases across web and mobile platforms.
                  </span>
                </p>
              </div>
            </motion.div>

            {/* Thin structural dividing hairline */}
            <div className="dossier-hairline" />

            {/* Editorial Metadata / Dossier Notes */}
            <motion.div
              className="dossier-notes-grid"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              {DOSSIER_ENTRIES.map((item, idx) => (
                <div key={idx} className="dossier-entry">
                  <div className="dossier-entry-header">
                    <span className="entry-index">{item.index}</span>
                    <span className="entry-label">{item.label}</span>
                  </div>
                  <div className={`entry-primary ${item.isAccent ? 'entry-primary--accent' : ''}`}>
                    {item.isAccent && <span className="entry-dot" />}
                    {item.primary}
                  </div>
                  <div className="entry-secondary">
                    {item.secondary}
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Actions / CTA Row */}
            <motion.div
              className="dossier-actions"
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <a href="#pipeline-runs" className="dossier-cta dossier-cta--primary">
                <span>VIEW PROJECTS</span>
                <ArrowDownRight size={14} className="dossier-cta-arrow" />
              </a>

              <button
                onClick={onOpenResume}
                className="dossier-cta dossier-cta--secondary"
                type="button"
              >
                <Download size={13} strokeWidth={2.2} />
                <span>DOWNLOAD RESUME</span>
              </button>

              <div className="dossier-cta-ref">
                <span>VER. 2026.04 // QA</span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* ── FOOTER SUBTLE BASELINE ── */}
        <div className="dossier-footer-rule" />
      </div>

      {/* ══════════════════════════════════════════════════════════
          SCOPED STYLES — Swiss Editorial Creative Technology Dossier
          ══════════════════════════════════════════════════════════ */}
      <style>{`
        .swiss-dossier {
          position: relative;
          background: transparent;
          padding: 5rem 1.5rem 3.5rem;
          color: var(--color-text-primary);
          overflow: hidden;
        }

        .dossier-inner {
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
        }

        /* ── HEADER BAR ── */
        .dossier-header-bar {
          display: flex;
          align-items: center;
          gap: 1.25rem;
          margin-bottom: 3.5rem;
        }

        .dossier-header-left {
          display: flex;
          align-items: baseline;
          gap: 0.5rem;
          flex-shrink: 0;
        }

        .dossier-header-index {
          font-family: var(--font-mono);
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--color-accent-pass);
          letter-spacing: 0.1em;
        }

        .dossier-header-sep {
          font-family: var(--font-mono);
          color: var(--color-border-hairline);
          font-size: 0.8rem;
        }

        .dossier-header-title {
          font-family: var(--font-mono);
          font-size: 0.8rem;
          font-weight: 600;
          letter-spacing: 0.22em;
          color: var(--color-text-primary);
          margin: 0;
        }

        .dossier-header-line {
          flex: 1;
          height: 1px;
          background: var(--color-border-hairline);
          min-width: 20px;
        }

        .dossier-header-meta {
          display: flex;
          align-items: center;
          gap: 0.625rem;
          font-family: var(--font-mono);
          font-size: 0.65rem;
          color: var(--color-text-muted);
          letter-spacing: 0.12em;
          flex-shrink: 0;
        }

        .dossier-meta-coord {
          color: var(--color-text-muted);
          opacity: 0.7;
        }

        .dossier-meta-dot {
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background: var(--color-border-hairline);
        }

        .dossier-meta-tag {
          font-weight: 500;
          color: var(--color-text-muted);
        }

        /* ── STATEMENT ROW ── */
        .dossier-statement-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          gap: 2.5rem;
          margin-bottom: 3.5rem;
        }

        .dossier-eyebrow {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-family: var(--font-mono);
          font-size: 0.65rem;
          font-weight: 600;
          letter-spacing: 0.2em;
          color: var(--color-accent-pass);
          margin-bottom: 0.75rem;
        }

        .dossier-eyebrow-bullet {
          font-size: 0.5rem;
          color: var(--color-accent-pass);
        }

        .dossier-headline {
          font-family: var(--font-display);
          font-size: clamp(2.4rem, 4.8vw, 4.2rem);
          font-weight: 700;
          line-height: 1.05;
          letter-spacing: -0.035em;
          color: var(--color-text-primary);
          margin: 0;
        }

        .dossier-headline-muted {
          color: var(--color-text-muted);
          font-weight: 600;
        }

        .dossier-badge-col {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 0.5rem;
          flex-shrink: 0;
          padding-bottom: 0.5rem;
        }

        .dossier-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.45rem 0.85rem;
          background: var(--color-bg-surface);
          border: 1px solid var(--color-border-hairline);
          font-family: var(--font-mono);
          font-size: 0.68rem;
          letter-spacing: 0.16em;
          color: var(--color-text-primary);
        }

        .dossier-badge-cross {
          color: var(--color-accent-pending);
          font-weight: 700;
        }

        .dossier-badge-text {
          font-weight: 600;
        }

        .dossier-badge-version {
          font-size: 0.58rem;
          color: var(--color-text-muted);
          border-left: 1px solid var(--color-border-hairline);
          padding-left: 0.5rem;
        }

        .dossier-badge-sub {
          font-family: var(--font-mono);
          font-size: 0.58rem;
          letter-spacing: 0.18em;
          color: var(--color-text-muted);
          opacity: 0.7;
        }

        /* ── BODY GRID ── */
        .dossier-body-grid {
          display: grid;
          grid-template-columns: 360px 1fr;
          gap: 4rem;
          align-items: start;
        }

        /* ── PHOTO ZONE ── */
        .dossier-photo-zone {
          position: relative;
        }

        .dossier-photo-frame {
          position: relative;
          width: 100%;
          max-width: 360px;
        }

        /* Offset background geometry */
        .dossier-photo-offset {
          position: absolute;
          inset: -12px 12px 12px -12px;
          border: 1px solid var(--color-border-hairline);
          background: rgba(22, 29, 36, 0.25);
          pointer-events: none;
          z-index: 1;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          padding: 6px 8px;
        }

        .offset-label-tl,
        .offset-label-br {
          font-family: var(--font-mono);
          font-size: 0.52rem;
          letter-spacing: 0.14em;
          color: var(--color-text-muted);
          opacity: 0.45;
        }

        .offset-label-br {
          align-self: flex-end;
        }

        .dossier-photo-box {
          position: relative;
          z-index: 2;
          width: 100%;
          aspect-ratio: 4 / 5;
          overflow: hidden;
          background: var(--color-bg-surface);
          border: 1px solid var(--color-border-hairline);
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
        }

        .dossier-photo-frame:hover .dossier-photo-box {
          border-color: rgba(74, 222, 154, 0.4);
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.4);
        }

        .dossier-photo-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          filter: grayscale(12%) contrast(1.04);
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), filter 0.4s ease;
        }

        .dossier-photo-frame:hover .dossier-photo-img {
          transform: scale(1.03);
          filter: grayscale(0%) contrast(1.02);
        }

        .dossier-photo-monogram {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-display);
          font-size: 4.5rem;
          font-weight: 800;
          color: rgba(232, 234, 237, 0.1);
        }

        /* Bracket corners */
        .photo-bracket {
          position: absolute;
          width: 8px;
          height: 8px;
          pointer-events: none;
          z-index: 4;
        }
        .photo-bracket--tl {
          top: 6px;
          left: 6px;
          border-top: 1.5px solid var(--color-accent-pass);
          border-left: 1.5px solid var(--color-accent-pass);
        }
        .photo-bracket--tr {
          top: 6px;
          right: 6px;
          border-top: 1.5px solid var(--color-accent-pass);
          border-right: 1.5px solid var(--color-accent-pass);
        }
        .photo-bracket--bl {
          bottom: 6px;
          left: 6px;
          border-bottom: 1.5px solid var(--color-accent-pass);
          border-left: 1.5px solid var(--color-accent-pass);
        }
        .photo-bracket--br {
          bottom: 6px;
          right: 6px;
          border-bottom: 1.5px solid var(--color-accent-pass);
          border-right: 1.5px solid var(--color-accent-pass);
        }

        /* Photo status badge */
        .photo-status-badge {
          position: absolute;
          bottom: 12px;
          left: 12px;
          z-index: 5;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 4px 8px;
          background: rgba(15, 20, 25, 0.85);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(74, 222, 154, 0.25);
          font-family: var(--font-mono);
          font-size: 0.58rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          color: var(--color-accent-pass);
        }

        .photo-status-indicator {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: var(--color-accent-pass);
          box-shadow: 0 0 6px var(--color-accent-pass);
        }

        /* Photo caption */
        .dossier-photo-caption {
          margin-top: 0.85rem;
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          padding-left: 2px;
          font-family: var(--font-mono);
          font-size: 0.6rem;
          color: var(--color-text-muted);
        }

        .caption-main {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .caption-fig {
          color: var(--color-accent-pending);
          font-weight: 600;
          letter-spacing: 0.1em;
        }

        .caption-name {
          color: var(--color-text-primary);
          font-weight: 600;
          letter-spacing: 0.12em;
        }

        .caption-role {
          letter-spacing: 0.08em;
          opacity: 0.6;
        }

        /* ── CONTENT ZONE ── */
        .dossier-content-zone {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        /* ══════════════════════════════════════════════════════════
           SENIOR EDITORIAL TYPOGRAPHY NARRATIVE (3-LEVEL HIERARCHY)
           ══════════════════════════════════════════════════════════ */
        .dossier-narrative {
          display: flex;
          flex-direction: column;
          gap: 1.85rem;
          max-width: 650px;
        }

        /* ── Level 1: Opening Statement & Primary Section ── */
        .editorial-lead-section {
          display: flex;
          flex-direction: column;
          gap: 0.95rem;
        }

        .editorial-lead-para {
          margin: 0;
          font-family: var(--font-sans);
          font-size: 1.0625rem;
          line-height: 1.85;
          color: rgba(232, 234, 237, 0.74);
          letter-spacing: -0.012em;
        }

        /* Opening lede: slightly larger, authoritative weight */
        .editorial-lead-lede {
          font-family: var(--font-display);
          font-size: clamp(1.2rem, 1.8vw, 1.32rem);
          font-weight: 600;
          line-height: 1.35;
          letter-spacing: -0.022em;
          color: #FFFFFF;
          display: inline;
        }

        .editorial-lead-connect {
          color: rgba(158, 171, 184, 0.82);
          font-weight: 400;
        }

        /* ── Level 2: Subtly Emphasized Technical Phrases (Paragraph 1) ── */
        .editorial-emphasis-primary {
          color: #FFFFFF;
          font-weight: 600;
          letter-spacing: -0.015em;
        }

        .editorial-emphasis-role {
          color: #FFFFFF;
          font-weight: 500;
          letter-spacing: -0.005em;
        }

        .editorial-tool-group {
          display: inline;
        }

        .editorial-emphasis-tool {
          font-family: var(--font-mono);
          font-size: 0.92em;
          font-weight: 500;
          color: #FFFFFF;
          letter-spacing: 0.02em;
        }

        .editorial-tool-punct {
          color: rgba(158, 171, 184, 0.65);
          font-weight: 400;
        }

        /* ── Level 3 (Part A): Supporting Specification Sentence ── */
        .editorial-support-para {
          margin: 0;
          font-family: var(--font-sans);
          font-size: 0.965rem;
          line-height: 1.78;
          color: rgba(158, 171, 184, 0.72);
          letter-spacing: -0.008em;
          max-width: 580px;
        }

        .editorial-support-text {
          color: rgba(158, 171, 184, 0.72);
          font-weight: 400;
        }

        .editorial-emphasis-spec {
          color: #FFFFFF;
          font-weight: 500;
          letter-spacing: 0.01em;
        }

        /* ── Level 3 (Part B): Secondary Context Narrative (Restrained) ── */
        .editorial-secondary-section {
          padding-top: 0.15rem;
          max-width: 610px;
        }

        .editorial-secondary-para {
          margin: 0;
          font-family: var(--font-sans);
          font-size: 0.915rem;
          line-height: 1.82;
          color: rgba(158, 171, 184, 0.62);
          letter-spacing: -0.005em;
        }

        .editorial-secondary-quiet {
          color: rgba(158, 171, 184, 0.62);
          font-weight: 400;
        }

        .editorial-emphasis-arch {
          color: #E8EAED;
          font-weight: 500;
          letter-spacing: -0.005em;
        }

        .editorial-emphasis-pipeline {
          font-family: var(--font-mono);
          font-size: 0.9em;
          font-weight: 600;
          color: var(--color-accent-pending);
          letter-spacing: 0.04em;
        }

        .editorial-emphasis-tech {
          font-family: var(--font-mono);
          font-size: 0.9em;
          font-weight: 500;
          color: #E8EAED;
          letter-spacing: 0.02em;
        }

        /* Hairline divider */
        .dossier-hairline {
          width: 100%;
          height: 1px;
          background: var(--color-border-hairline);
        }

        /* Notes grid */
        .dossier-notes-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem 2.25rem;
        }

        .dossier-entry {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
          padding-bottom: 0.75rem;
          border-bottom: 1px solid rgba(35, 44, 53, 0.45);
          transition: border-color 0.2s ease;
        }

        .dossier-entry:hover {
          border-bottom-color: rgba(74, 222, 154, 0.3);
        }

        .dossier-entry-header {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .entry-index {
          font-family: var(--font-mono);
          font-size: 0.55rem;
          font-weight: 700;
          color: var(--color-accent-pass);
          letter-spacing: 0.1em;
        }

        .entry-label {
          font-family: var(--font-mono);
          font-size: 0.58rem;
          font-weight: 600;
          letter-spacing: 0.18em;
          color: var(--color-text-muted);
          opacity: 0.75;
        }

        .entry-primary {
          font-family: var(--font-mono);
          font-size: 0.74rem;
          font-weight: 600;
          color: var(--color-text-primary);
          letter-spacing: 0.05em;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .entry-primary--accent {
          color: var(--color-accent-pass);
        }

        .entry-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: var(--color-accent-pass);
          box-shadow: 0 0 5px var(--color-accent-pass);
          flex-shrink: 0;
        }

        .entry-secondary {
          font-family: var(--font-sans);
          font-size: 0.72rem;
          color: var(--color-text-muted);
          line-height: 1.4;
        }

        /* ── ACTIONS ROW ── */
        .dossier-actions {
          display: flex;
          align-items: center;
          gap: 1rem;
          flex-wrap: wrap;
          padding-top: 0.5rem;
        }

        .dossier-cta {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-family: var(--font-mono);
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-decoration: none;
          padding: 0.75rem 1.4rem;
          border-radius: 0px;
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .dossier-cta--primary {
          background: var(--color-accent-pass);
          color: var(--color-bg-base);
          border: 1px solid var(--color-accent-pass);
        }

        .dossier-cta--primary:hover {
          background: #5CE8A0;
          box-shadow: 0 4px 20px rgba(74, 222, 154, 0.3);
          transform: translateY(-1px);
        }

        .dossier-cta-arrow {
          transition: transform 0.2s ease;
        }

        .dossier-cta--primary:hover .dossier-cta-arrow {
          transform: translate(2px, 2px);
        }

        .dossier-cta--secondary {
          background: transparent;
          color: var(--color-accent-pending);
          border: 1px solid rgba(242, 169, 59, 0.4);
        }

        .dossier-cta--secondary:hover {
          border-color: rgba(242, 169, 59, 0.8);
          color: #F5BD5D;
          background: rgba(242, 169, 59, 0.05);
          transform: translateY(-1px);
        }

        .dossier-cta-ref {
          margin-left: auto;
          font-family: var(--font-mono);
          font-size: 0.6rem;
          letter-spacing: 0.12em;
          color: var(--color-text-muted);
          opacity: 0.45;
        }

        .dossier-footer-rule {
          width: 100%;
          height: 1px;
          background: var(--color-border-hairline);
          margin-top: 4.5rem;
        }

        /* ══════════════════════════════════════════════════════════
            RESPONSIVE ADAPTATIONS (Mobile & Tablet)
            ══════════════════════════════════════════════════════════ */
        @media (max-width: 1024px) {
          .dossier-body-grid {
            grid-template-columns: 300px 1fr;
            gap: 2.5rem;
          }
          .dossier-statement-row {
            flex-direction: column;
            align-items: flex-start;
            gap: 1.5rem;
          }
          .dossier-badge-col {
            align-items: flex-start;
          }
        }

        @media (max-width: 768px) {
          .swiss-dossier {
            padding: 3.5rem 1rem 2.5rem;
          }

          .dossier-header-bar {
            margin-bottom: 2.5rem;
          }

          .dossier-header-meta {
            display: none;
          }

          .dossier-statement-row {
            margin-bottom: 2.5rem;
          }

          .dossier-headline {
            font-size: clamp(2rem, 8vw, 3rem);
          }

          .dossier-body-grid {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }

          .dossier-photo-frame {
            max-width: 280px;
            margin: 0 auto;
          }

          .dossier-photo-offset {
            inset: -8px 8px 8px -8px;
          }

          .dossier-notes-grid {
            grid-template-columns: 1fr;
            gap: 1.25rem;
          }

          .dossier-actions {
            flex-direction: column;
            align-items: stretch;
          }

          .dossier-cta {
            justify-content: center;
          }

          .dossier-cta-ref {
            margin-left: 0;
            text-align: center;
            margin-top: 0.5rem;
          }

          .dossier-footer-rule {
            margin-top: 3rem;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .dossier-photo-img,
          .dossier-cta {
            transition: none !important;
          }
        }
      `}</style>
    </section>
  )
}
