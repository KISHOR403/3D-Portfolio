import { useRef, useEffect, useState, useCallback } from 'react'
import { createPortal } from 'react-dom'
import SectionHeader from './SectionHeader'
import CertBookCanvas from './CertBookCanvas'

/* ─────────────────────────────────────────────
   AUTHENTIC CERTIFICATION DATA (9 CREDENTIALS)
   ───────────────────────────────────────────── */
const CERTIFICATIONS = [
  {
    title: 'SAP Certified Project Manager – SAP Activate & Agile',
    issuer: 'SAP',
    year: '2026',
    pdf: '/certificates/sap-project-manager.pdf',
    category: 'Project Governance & Agile Quality Gates',
  },
  {
    title: 'Oracle Cloud Infrastructure 2025 Certified DevOps Professional',
    issuer: 'Oracle',
    year: '2025',
    pdf: '/certificates/oracle-devops-professional.pdf',
    category: 'CI/CD Pipelines & Cloud Quality Engineering',
  },
  {
    title: 'Oracle Cloud Infrastructure 2025 AI Foundations Associate',
    issuer: 'Oracle',
    year: '2025',
    pdf: '/certificates/oracle-ai-foundations.pdf',
    category: 'Generative AI & LLM Evaluation',
  },
  {
    title: 'Oracle Data Platform 2025 Certified Foundations Associate',
    issuer: 'Oracle',
    year: '2025',
    pdf: '/certificates/oracle-data-platform.pdf',
    category: 'Data Lakehouse & Schema Validation',
  },
  {
    title: 'Software Testing and Automation Specialization',
    issuer: 'Coursera',
    year: '2025',
    pdf: '/certificates/coursera-testing-specialization.pdf',
    category: 'Automated Test Architectures & TestNG',
  },
  {
    title: 'Web and Mobile Testing with Selenium',
    issuer: 'Coursera',
    year: '2025',
    pdf: null,
    category: 'Cross-Browser Automation & Appium',
  },
  {
    title: 'IBM DevOps and Software Engineering',
    issuer: 'IBM',
    year: '2025',
    pdf: '/certificates/ibm-devops-engineering.pdf',
    category: 'Enterprise Microservices & Chaos Testing',
  },
  {
    title: 'Claude 101 — Certificate of Completion',
    issuer: 'Anthropic',
    year: '2025',
    pdf: '/certificates/anthropic-claude-101.pdf',
    category: 'AI Safety & Prompt Optimization',
  },
  {
    title: 'Claude Code 101 — Certificate of Completion',
    issuer: 'Anthropic',
    year: '2026',
    pdf: '/certificates/anthropic-claude-code-101.pdf',
    category: 'Autonomous Agent Testing Workflows',
  },
]

const ISSUER_ACCENT = {
  SAP: '#496EA5',
  Oracle: '#C74634',
  Coursera: '#0056D2',
  IBM: '#3D5A80',
  Anthropic: '#D4A15E',
}

/* ─────────────────────────────────────────────
   CERTIFICATE PDF MODAL
   ───────────────────────────────────────────── */
function CertificateModal({ isOpen, onClose, pdfUrl, certName, certIssuer, certYear }) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const media = window.matchMedia('(max-width: 768px)')
    const listener = (e) => setIsMobile(e.matches)
    setIsMobile(media.matches)
    media.addEventListener('change', listener)
    return () => media.removeEventListener('change', listener)
  }, [])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isOpen) return null

  if (isMobile) {
    return createPortal(
      <div className="cert-modal-overlay" onClick={onClose}>
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Certificate Details — ${certName}`}
          className="cert-modal-mobile"
          onClick={(e) => e.stopPropagation()}
        >
          <button onClick={onClose} aria-label="Close modal" className="cert-modal-close-btn">
            &times;
          </button>
          <div className="cert-modal-issuer-tag" style={{ color: ISSUER_ACCENT[certIssuer] || '#9EABB8' }}>
            {certIssuer}
          </div>
          <h3 className="cert-modal-title">{certName}</h3>
          <div className="cert-modal-details">
            <div className="cert-modal-row">
              <span>ISSUER</span>
              <span style={{ color: '#E8EAED' }}>{certIssuer}</span>
            </div>
            <div className="cert-modal-row">
              <span>YEAR</span>
              <span style={{ color: '#F2A93B' }}>{certYear}</span>
            </div>
          </div>
          {pdfUrl ? (
            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onClose}
              className="cert-modal-open-btn"
            >
              Open Document (PDF)
            </a>
          ) : (
            <div className="cert-modal-notice">Verified through official issuer records</div>
          )}
          <button onClick={onClose} className="cert-modal-secondary-btn">
            Close
          </button>
        </div>
      </div>,
      document.body
    )
  }

  return createPortal(
    <div className="cert-modal-overlay" onClick={onClose}>
      <div className="cert-modal-desktop" onClick={(e) => e.stopPropagation()}>
        <div className="cert-modal-desktop-header">
          <h3>{certName}</h3>
          <button onClick={onClose} aria-label="Close modal">
            &times;
          </button>
        </div>
        <div className="cert-modal-desktop-body">
          {pdfUrl ? (
            <iframe
              src={`${pdfUrl}#toolbar=0&navpanes=0`}
              width="100%"
              height="100%"
              style={{ border: 'none', display: 'block' }}
              title={certName}
            />
          ) : (
            <div className="cert-modal-desktop-empty">
              <p>Official verified completion record through Coursera.</p>
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  )
}

/* ─────────────────────────────────────────────
   MAIN COMPONENT: 3D REALISTIC BOOK SECTION
   ───────────────────────────────────────────── */
export default function QualityGates() {
  const sectionRef = useRef(null)
  const scrollContainerRef = useRef(null)

  const [pageProgress, setPageProgress] = useState(0)
  const [activePdf, setActivePdf] = useState(null)
  const [isReducedMotion, setIsReducedMotion] = useState(false)

  const totalPages = CERTIFICATIONS.length

  // Check reduced motion preference
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    setIsReducedMotion(media.matches)
    const listener = (e) => setIsReducedMotion(e.matches)
    media.addEventListener('change', listener)
    return () => media.removeEventListener('change', listener)
  }, [])

  // Map scroll progress to page progress
  useEffect(() => {
    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (!scrollContainerRef.current) return
          const rect = scrollContainerRef.current.getBoundingClientRect()
          const totalScrollable = rect.height - window.innerHeight

          if (totalScrollable <= 0) return

          // How far we have scrolled inside the sticky container:
          const scrolled = -rect.top
          const progress = Math.max(0, Math.min(1, scrolled / totalScrollable))

          // Map progress across total pages
          const target = progress * (totalPages - 0.05)
          setPageProgress(target)
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [totalPages])

  // Scroll smoothly to a specific page
  const scrollToPage = useCallback(
    (pageIndex) => {
      if (!scrollContainerRef.current) return
      const rect = scrollContainerRef.current.getBoundingClientRect()
      const totalScrollable = rect.height - window.innerHeight
      const containerTop = window.scrollY + rect.top
      const targetProgress = Math.max(0, Math.min(1, pageIndex / (totalPages - 0.05)))
      const targetScroll = containerTop + targetProgress * totalScrollable

      window.scrollTo({
        top: targetScroll,
        behavior: isReducedMotion ? 'auto' : 'smooth',
      })
    },
    [totalPages, isReducedMotion]
  )

  const handlePrev = useCallback(() => {
    const currentIdx = Math.floor(pageProgress)
    const target = Math.max(0, currentIdx - 1)
    scrollToPage(target)
  }, [pageProgress, scrollToPage])

  const handleNext = useCallback(() => {
    const currentIdx = Math.floor(pageProgress)
    const target = Math.min(totalPages - 1, currentIdx + 1)
    scrollToPage(target)
  }, [pageProgress, totalPages, scrollToPage])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!sectionRef.current) return
      const rect = sectionRef.current.getBoundingClientRect()
      const inView = rect.top < window.innerHeight * 0.7 && rect.bottom > window.innerHeight * 0.3
      if (!inView) return

      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
          handleNext()
        }
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
          handlePrev()
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleNext, handlePrev])

  // Active certification in focus
  const activeIndex = Math.min(
    totalPages - 1,
    pageProgress % 1 > 0.5 ? Math.floor(pageProgress) + 1 : Math.floor(pageProgress)
  )
  const activeCert = CERTIFICATIONS[activeIndex] || CERTIFICATIONS[0]

  return (
    <section id="quality-gates" ref={sectionRef} className="cert-book-section">
      <div className="section-container">
        <SectionHeader
          number="06"
          category="CERTIFICATIONS & QUALITY GATES"
          title="Verified Professional Credentials"
          description="A persistent 3D physical registry — scroll to turn each page and inspect verified automated testing credentials."
          style={{ marginBottom: '1rem' }}
        />
      </div>

      {/* Sticky scroll container */}
      <div
        ref={scrollContainerRef}
        className="cert-book-scroll-container"
        style={{ height: `${(totalPages + 1) * 60}vh` }}
      >
        {/* Sticky viewport stage */}
        <div className="cert-book-stage">
          {/* 3D WebGL Canvas Rendering the Persistent Folding Book */}
          <div className="cert-book-webgl-wrapper">
            <CertBookCanvas
              pageProgress={pageProgress}
              certifications={CERTIFICATIONS}
              onSelectCert={(cert) => {
                if (cert && cert.pdf) setActivePdf(cert)
              }}
            />
          </div>

          {/* Interactive UI Overlay Controls */}
          <div className="cert-book-controls-bar">
            {/* Prev Page Button */}
            <button
              className="cert-book-nav-btn"
              onClick={handlePrev}
              disabled={pageProgress <= 0.05}
              aria-label="Previous certificate page"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>

            {/* Page Counter & Title Badge */}
            <div className="cert-book-status-badge">
              <span className="cert-book-page-num">
                {String(activeIndex + 1).padStart(2, '0')} / {String(totalPages).padStart(2, '0')}
              </span>
              <span className="cert-book-status-sep">|</span>
              <span className="cert-book-current-title">{activeCert.title}</span>
              <span
                className="cert-book-issuer-pill"
                style={{ backgroundColor: `${ISSUER_ACCENT[activeCert.issuer] || '#4A5568'}33`, color: ISSUER_ACCENT[activeCert.issuer] || '#CBD5E1' }}
              >
                {activeCert.issuer} • {activeCert.year}
              </span>
            </div>

            {/* Next Page Button */}
            <button
              className="cert-book-nav-btn"
              onClick={handleNext}
              disabled={pageProgress >= totalPages - 0.1}
              aria-label="Next certificate page"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>

          {/* Document PDF Quick-Action Button */}
          {activeCert?.pdf && (
            <button
              className="cert-book-view-doc-btn"
              onClick={() => setActivePdf(activeCert)}
              aria-label={`View official certificate PDF for ${activeCert.title}`}
            >
              <span>View Official Document (PDF)</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </button>
          )}

          {/* Scroll instruction cue on first page */}
          {pageProgress < 0.15 && (
            <div className="cert-book-scroll-cue" aria-hidden="true">
              <div className="cert-cue-mouse">
                <div className="cert-cue-wheel" />
              </div>
              <span>Scroll to bend and turn pages</span>
            </div>
          )}
        </div>
      </div>

      {/* Certificate Modal */}
      <CertificateModal
        isOpen={activePdf !== null}
        onClose={() => setActivePdf(null)}
        pdfUrl={activePdf?.pdf}
        certName={activePdf?.title}
        certIssuer={activePdf?.issuer}
        certYear={activePdf?.year}
      />
    </section>
  )
}
