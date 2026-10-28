import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, Copy, Check, ChevronUp } from 'lucide-react'
import profileImg from '../assets/profile.jpg'

const CONTACT_ROWS = [
  {
    index: '01',
    category: 'EMAIL',
    title: 'Start a conversation',
    detail: 'kishorgogoi403@gmail.com',
    href: 'mailto:kishorgogoi403@gmail.com',
    isEmail: true,
  },
  {
    index: '02',
    category: 'LINKEDIN',
    title: 'Professional network',
    detail: 'linkedin.com/in/kishorgogoi',
    href: 'https://linkedin.com/in/kishorgogoi/',
    isEmail: false,
  },
  {
    index: '03',
    category: 'GITHUB',
    title: 'Explore my work',
    detail: 'github.com/KISHOR403',
    href: 'https://github.com/KISHOR403',
    isEmail: false,
  },
]

export default function Deploy() {
  const [copied, setCopied] = useState(false)
  const [currentTime, setCurrentTime] = useState('')

  // Real-time IST Digital Clock in crisp Swiss editorial format
  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const options = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      }
      setCurrentTime(new Intl.DateTimeFormat('en-US', options).format(now))
    }
    updateTime()
    const timer = setInterval(updateTime, 1000)
    return () => clearInterval(timer)
  }, [])

  const handleCopyEmail = (e) => {
    e.preventDefault()
    e.stopPropagation()
    navigator.clipboard.writeText('kishorgogoi403@gmail.com')
    setCopied(true)
    setTimeout(() => setCopied(false), 2400)
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <section
      id="deploy"
      className="swiss-contact-root"
      aria-labelledby="contact-heading"
    >
      {/* Anchor target for #contact links */}
      <div id="contact" style={{ position: 'relative', top: '-70px', visibility: 'hidden' }} />

      <div className="swiss-contact-inner">
        <div className="swiss-contact-main">
          {/* ─── Architectural Top Colophon Header ─── */}
          <div className="swiss-colophon-header" aria-hidden="true">
            <div>SWISS EDITORIAL ARCHIVE / QA ENGINEERING PORTFOLIO</div>
            <div>COLOPHON &amp; DIRECT INQUIRY — EDITION 2026</div>
          </div>

        {/* ─── Asymmetrical Editorial Grid ─── */}
        <div className="swiss-editorial-grid">
          {/* Left Column: Dominant Editorial Headline */}
          <div className="swiss-headline-group">
            <div className="swiss-eyebrow">
              <span className="swiss-eyebrow-index">CONTACT / 07</span>
              <span className="swiss-eyebrow-dash" aria-hidden="true">/</span>
              <span>DIRECT INQUIRY</span>
            </div>

            <h2 id="contact-heading" className="swiss-heading">
              <span className="swiss-heading-primary">LET'S MAKE</span>
              <span className="swiss-heading-primary">SOFTWARE</span>
              <span className="swiss-heading-secondary">WORK BETTER.</span>
            </h2>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: '#64748B',
                paddingTop: '1.25rem',
                borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                maxWidth: '420px',
              }}
              aria-hidden="true"
            >
              <span>12.97°N 77.59°E</span>
              <span>—</span>
              <span>RELIABILITY &amp; AUTOMATION</span>
            </div>
          </div>

          {/* Right Column: Understated Portrait, Supporting Copy & Metadata */}
          <div className="swiss-right-column">
            {/* Carefully Cropped Understated Portrait */}
            <div className="swiss-portrait-card">
              <div className="swiss-portrait-frame">
                <img
                  src={profileImg}
                  alt="Kishor Gogoi, QA Automation Engineer"
                  className="swiss-portrait-img"
                  loading="lazy"
                  width="108"
                  height="108"
                />
              </div>
              <div className="swiss-portrait-meta">
                <span className="swiss-figure-label">[ FIG. 01 — KISHOR GOGOI ]</span>
                <span className="swiss-portrait-name">Kishor Gogoi</span>
                <span className="swiss-portrait-role">QA Engineer &amp; SDET · Automation Lead</span>
              </div>
            </div>

            {/* Verbatim Supporting Copy */}
            <p className="swiss-supporting-copy">
              I'm interested in building reliable products, improving software quality, and creating better digital experiences through thoughtful testing and automation. If you're hiring for QA engineering or exploring a collaboration, let's connect.
            </p>

            {/* Editorial Metadata Specification Table */}
            <div className="swiss-specs-table" role="list" aria-label="Professional specifications">
              <div className="swiss-spec-row" role="listitem">
                <span className="swiss-spec-label">AVAILABILITY</span>
                <span className="swiss-spec-val">Open for Full-Time Roles &amp; Consulting</span>
              </div>
              <div className="swiss-spec-row" role="listitem">
                <span className="swiss-spec-label">LOCATION</span>
                <span className="swiss-spec-val">Bangalore, India · Remote &amp; Relocation</span>
              </div>
              <div className="swiss-spec-row" role="listitem">
                <span className="swiss-spec-label">TIMEZONE</span>
                <span className="swiss-spec-val">IST (UTC +5:30) · Flexible Worldwide</span>
              </div>
            </div>
          </div>
        </div>

        {/* ─── Thin Divider & Channels Bar ─── */}
        <div className="swiss-channels-header" aria-hidden="true">
          <span>INDEX / 03 DIRECT ENTRY POINTS</span>
          <span>SELECT A CHANNEL BELOW</span>
        </div>

        {/* ─── Contact Information as Editorial Rows ─── */}
        <nav className="swiss-rows-list" aria-label="Contact channels">
          {CONTACT_ROWS.map((row) => (
            <a
              key={row.index}
              href={row.href}
              target={row.isEmail ? undefined : '_blank'}
              rel={row.isEmail ? undefined : 'noopener noreferrer'}
              className="swiss-row-link"
              aria-label={`${row.category}: ${row.title}. Address: ${row.detail}`}
            >
              <div className="swiss-row-meta">
                <span className="swiss-row-index">{row.index}</span>
                <span className="swiss-row-dash" aria-hidden="true">—</span>
                <span className="swiss-row-category">{row.category}</span>
              </div>

              <div className="swiss-row-center">
                <span className="swiss-row-title">{row.title}</span>
                <span className="swiss-row-detail">{row.detail}</span>
              </div>

              <div className="swiss-row-right">
                {row.isEmail && (
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className={`swiss-copy-btn${copied ? ' is-copied' : ''}`}
                    aria-label="Copy email address to clipboard"
                    title="Copy kishorgogoi403@gmail.com"
                  >
                    {copied ? (
                      <>
                        <Check size={12} strokeWidth={2.5} />
                        <span>COPIED</span>
                      </>
                    ) : (
                      <>
                        <Copy size={12} strokeWidth={2} />
                        <span>COPY</span>
                      </>
                    )}
                  </button>
                )}

                <div className="swiss-row-arrow" aria-hidden="true">
                  <ArrowUpRight size={22} strokeWidth={1.75} />
                </div>
              </div>
            </a>
          ))}
        </nav>
      </div>

        {/* Screen Reader Status Announcement for Copy Action */}
        <div role="status" aria-live="polite" className="sr-only" style={{ position: 'absolute', width: '1px', height: '1px', padding: 0, margin: '-1px', overflow: 'hidden', clip: 'rect(0,0,0,0)', border: 0 }}>
          {copied ? 'Email address kishorgogoi403@gmail.com copied to clipboard.' : ''}
        </div>

        {/* ─── Minimalist Editorial Footer Colophon ─── */}
        <footer className="swiss-colophon-footer">
          <div className="swiss-colophon-col">
            <span style={{ color: '#FFFFFF', fontWeight: 600 }}>© {new Date().getFullYear()} KISHOR GOGOI</span>
            <span>ENGINEERED WITH RIGOROUS AUTOMATION &amp; PRECISION</span>
            <span>TYPESET IN SPACE GROTESK &amp; INTER</span>
          </div>

          <div className="swiss-colophon-col">
            <span>LOCAL TIME — {currentTime ? `${currentTime} IST` : 'IST (UTC+5:30)'}</span>
            <span>BANGALORE, KARNATAKA, INDIA (12.97°N 77.59°E)</span>
            <span>ALL QUALITY GATES OPERATIONAL</span>
          </div>

          <div className="swiss-colophon-col" style={{ alignItems: 'flex-end' }}>
            <button
              type="button"
              onClick={scrollToTop}
              className="swiss-back-top-btn"
              aria-label="Scroll back to top of page"
            >
              <span>Back to top</span>
              <ChevronUp size={13} strokeWidth={2} />
            </button>
          </div>
        </footer>
      </div>
    </section>
  )
}
