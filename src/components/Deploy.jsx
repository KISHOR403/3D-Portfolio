import { useEffect, useState } from 'react'
import { Check, Copy, ChevronUp } from 'lucide-react'

const CONTACT_ROWS = [
  {
    category: 'EMAIL',
    detail: 'kishorgogoi403@gmail.com',
    href: 'mailto:kishorgogoi403@gmail.com',
    isEmail: true,
  },
  {
    category: 'LINKEDIN',
    detail: 'linkedin.com/in/kishorgogoi',
    href: 'https://linkedin.com/in/kishorgogoi/',
    isEmail: false,
  },
  {
    category: 'GITHUB',
    detail: 'github.com/KISHOR403',
    href: 'https://github.com/KISHOR403',
    isEmail: false,
  },
]

export default function Deploy() {
  const [copied, setCopied] = useState(false)
  const [copyError, setCopyError] = useState(false)
  const [currentTime, setCurrentTime] = useState('')

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

  const handleCopyEmail = async (event) => {
    event.preventDefault()
    event.stopPropagation()

    try {
      await navigator.clipboard.writeText('kishorgogoi403@gmail.com')
      setCopied(true)
      setCopyError(false)
      setTimeout(() => setCopied(false), 2400)
    } catch {
      setCopyError(true)
      setTimeout(() => setCopyError(false), 2400)
    }
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <section id="deploy" className="swiss-contact-root" aria-labelledby="contact-heading">
      <div id="contact" className="contact-anchor" />

      <div className="swiss-contact-inner">
        <div className="swiss-colophon-header" aria-hidden="true">
          <span>QA ENGINEERING PORTFOLIO</span>
          <span>COLOPHON &amp; DIRECT INQUIRY — EDITION 2026</span>
        </div>

        <div className="swiss-editorial-grid">
          <div className="swiss-headline-group">
            <div className="swiss-eyebrow">
              <span className="swiss-eyebrow-index">CONTACT / 07</span>
              <span aria-hidden="true">/</span>
              <span>DIRECT INQUIRY</span>
            </div>

            <h2 id="contact-heading" className="swiss-heading">
              <span className="swiss-heading-primary">LET'S MAKE</span>
              <span className="swiss-heading-primary">SOFTWARE</span>
              <span className="swiss-heading-secondary">WORK BETTER.</span>
            </h2>

            <div className="swiss-headline-meta">
              <span>QA ENGINEERING</span>
              <span aria-hidden="true">·</span>
              <span>TEST AUTOMATION</span>
              <span aria-hidden="true">·</span>
              <span>SOFTWARE QUALITY</span>
            </div>
          </div>

          <div className="swiss-right-column">
            <p className="swiss-supporting-copy">
              I&apos;m open to QA engineering opportunities and thoughtful collaborations focused on building reliable products, improving software quality, and making digital experiences work better.
            </p>

            <a className="swiss-talk-link" href="mailto:kishorgogoi403@gmail.com">
              <span>LET&apos;S TALK</span>
              <span aria-hidden="true">↗</span>
            </a>

            <div className="swiss-specs-table" role="list" aria-label="Availability and location">
              <div className="swiss-spec-row" role="listitem">
                <span className="swiss-spec-label">AVAILABILITY</span>
                <span className="swiss-spec-val">Open to suitable full-time QA roles</span>
              </div>
              <div className="swiss-spec-row" role="listitem">
                <span className="swiss-spec-label">LOCATION</span>
                <span className="swiss-spec-val">Bangalore, India</span>
              </div>
            </div>
          </div>
        </div>

        <div className="swiss-channels-header">
          <span>DIRECT ENTRY POINTS / 03</span>
          <span>SELECT A CHANNEL</span>
        </div>

        <nav className="swiss-rows-list" aria-label="Contact channels">
          {CONTACT_ROWS.map((row, index) => (
            <a
              key={row.category}
              href={row.href}
              target={row.isEmail ? undefined : '_blank'}
              rel={row.isEmail ? undefined : 'noopener noreferrer'}
              className="swiss-row-link"
              aria-label={`${row.category}: ${row.detail}`}
            >
              <span className="swiss-row-meta">
                <span className="swiss-row-index">0{index + 1}</span>
                <span className="swiss-row-category">{row.category}</span>
              </span>
              <span className="swiss-row-detail">{row.detail}</span>
              <span className="swiss-row-right">
                {row.isEmail && (
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className={`swiss-copy-btn${copied ? ' is-copied' : ''}`}
                    aria-label="Copy email address to clipboard"
                  >
                    {copied ? <><Check size={12} /> COPIED</> : <><Copy size={12} /> COPY</>}
                  </button>
                )}
                <span className="swiss-row-arrow" aria-hidden="true">↗</span>
              </span>
            </a>
          ))}
        </nav>

        <div role="status" aria-live="polite" className="sr-only">
          {copied
            ? 'Email address kishorgogoi403@gmail.com copied to clipboard.'
            : copyError
              ? 'Unable to copy the email address. Please use the email link.'
              : ''}
        </div>

        <footer className="swiss-colophon-footer">
          <div className="swiss-colophon-col">
            <span className="swiss-footer-primary">© {new Date().getFullYear()} KISHOR GOGOI</span>
            <span>ENGINEERED WITH RIGOROUS AUTOMATION &amp; PRECISION</span>
          </div>
          <div className="swiss-colophon-col">
            <span>LOCAL TIME — {currentTime ? `${currentTime} IST` : 'IST (UTC+5:30)'}</span>
            <span>ALL QUALITY GATES OPERATIONAL</span>
          </div>
          <button type="button" onClick={scrollToTop} className="swiss-back-top-btn" aria-label="Scroll back to top of page">
            <span>Back to top</span>
            <ChevronUp size={13} />
          </button>
        </footer>
      </div>
    </section>
  )
}
