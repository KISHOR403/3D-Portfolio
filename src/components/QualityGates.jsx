import { useRef, useEffect, useState, useCallback, useMemo } from 'react'
import { createPortal } from 'react-dom'
import SectionHeader from './SectionHeader'

/* ─────────────────────────────────────────────
   CERTIFICATION DATA
   ───────────────────────────────────────────── */
const CERTIFICATIONS = [
  {
    title: 'SAP Certified Project Manager – SAP Activate & Agile',
    issuer: 'SAP',
    year: '2026',
    pdf: '/certificates/sap-project-manager.pdf',
  },
  {
    title: 'Oracle Cloud Infrastructure 2025 Certified DevOps Professional',
    issuer: 'Oracle',
    year: '2025',
    pdf: '/certificates/oracle-devops-professional.pdf',
  },
  {
    title: 'Oracle Cloud Infrastructure 2025 AI Foundations Associate',
    issuer: 'Oracle',
    year: '2025',
    pdf: '/certificates/oracle-ai-foundations.pdf',
  },
  {
    title: 'Oracle Data Platform 2025 Certified Foundations Associate',
    issuer: 'Oracle',
    year: '2025',
    pdf: '/certificates/oracle-data-platform.pdf',
  },
  {
    title: 'Software Testing and Automation Specialization',
    issuer: 'Coursera',
    year: '2025',
    pdf: null,
  },
  {
    title: 'Web and Mobile Testing with Selenium',
    issuer: 'Coursera',
    year: '2025',
    pdf: null,
  },
  {
    title: 'IBM DevOps and Software Engineering',
    issuer: 'IBM',
    year: '2025',
    pdf: '/certificates/ibm-devops-engineering.pdf',
  },
  {
    title: 'Claude 101 — Certificate of Completion',
    issuer: 'Anthropic',
    year: '2025',
    pdf: '/certificates/anthropic-claude-101.pdf',
  },
  {
    title: 'Claude Code 101 — Certificate of Completion',
    issuer: 'Anthropic',
    year: '2026',
    pdf: '/certificates/anthropic-claude-code-101.pdf',
  },
]

/* ─────────────────────────────────────────────
   ISSUER ACCENT COLOURS (muted, editorial)
   ───────────────────────────────────────────── */
const ISSUER_ACCENT = {
  SAP: '#496EA5',
  Oracle: '#C74634',
  Coursera: '#0056D2',
  IBM: '#3D5A80',
  Anthropic: '#D4A15E',
}

/* ─────────────────────────────────────────────
   CERTIFICATE PDF MODAL (unchanged from prior)
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
    return () => { document.body.style.overflow = 'unset' }
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
          <button onClick={onClose} aria-label="Close modal" className="cert-modal-close-btn">&times;</button>
          <div className="cert-modal-issuer-tag" style={{ color: ISSUER_ACCENT[certIssuer] || '#9EABB8' }}>
            {certIssuer}
          </div>
          <h3 className="cert-modal-title">{certName}</h3>
          <div className="cert-modal-details">
            <div className="cert-modal-row"><span>ISSUER</span><span style={{ color: '#E8EAED' }}>{certIssuer}</span></div>
            <div className="cert-modal-row"><span>YEAR</span><span style={{ color: '#F2A93B' }}>{certYear}</span></div>
          </div>
          <a href={pdfUrl} target="_blank" rel="noopener noreferrer" onClick={onClose} className="cert-modal-open-btn">
            Open Document (PDF)
          </a>
          <button onClick={onClose} className="cert-modal-secondary-btn">Close</button>
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
          <button onClick={onClose} aria-label="Close modal">&times;</button>
        </div>
        <div className="cert-modal-desktop-body">
          <iframe
            src={`${pdfUrl}#toolbar=0&navpanes=0`}
            width="100%"
            height="100%"
            style={{ border: 'none', display: 'block' }}
            title={certName}
          />
        </div>
      </div>
    </div>,
    document.body
  )
}

/* ─────────────────────────────────────────────
   BOOK PAGE COMPONENT
   ───────────────────────────────────────────── */
function BookPage({ cert, pageIndex, totalPages, isActive }) {
  const accent = ISSUER_ACCENT[cert.issuer] || '#9EABB8'

  return (
    <div className="book-page-content" role="article" aria-label={`Credential ${pageIndex + 1} of ${totalPages}`}>
      {/* Page number */}
      <div className="book-page-number" aria-hidden="true">
        {String(pageIndex + 1).padStart(2, '0')}
      </div>

      {/* Issuer badge */}
      <div className="book-page-issuer" style={{ borderColor: accent }}>
        <span className="book-page-issuer-text" style={{ color: accent }}>{cert.issuer}</span>
        <span className="book-page-issuer-year">{cert.year}</span>
      </div>

      {/* Certificate title */}
      <h3 className="book-page-title">{cert.title}</h3>

      {/* Decorative divider */}
      <div className="book-page-divider" aria-hidden="true">
        <div className="book-page-divider-line" />
        <div className="book-page-divider-diamond" />
        <div className="book-page-divider-line" />
      </div>

      {/* Credential details block */}
      <div className="book-page-details">
        <div className="book-page-detail-row">
          <span className="book-page-detail-label">Issuing Authority</span>
          <span className="book-page-detail-value">{cert.issuer}</span>
        </div>
        <div className="book-page-detail-row">
          <span className="book-page-detail-label">Date Conferred</span>
          <span className="book-page-detail-value">{cert.year}</span>
        </div>
        <div className="book-page-detail-row">
          <span className="book-page-detail-label">Document</span>
          <span className="book-page-detail-value">{cert.pdf ? 'Verified PDF' : 'Digital Credential'}</span>
        </div>
      </div>

      {/* Footer with view link */}
      <div className="book-page-footer">
        {cert.pdf && (
          <span className="book-page-view-link" tabIndex={isActive ? 0 : -1}>
            View credential →
          </span>
        )}
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   MAIN COMPONENT
   ───────────────────────────────────────────── */
export default function QualityGates() {
  const sectionRef = useRef(null)
  const stageRef = useRef(null)
  const scrollContainerRef = useRef(null)
  const totalPages = CERTIFICATIONS.length

  const [currentPage, setCurrentPage] = useState(0)
  const [turnProgress, setTurnProgress] = useState(0) // 0–1 progress of current page turn
  const [prefersReduced, setPrefersReduced] = useState(false)

  // Modal state
  const [activePdf, setActivePdf] = useState(null)
  const [activeName, setActiveName] = useState(null)
  const [activeIssuer, setActiveIssuer] = useState(null)
  const [activeYear, setActiveYear] = useState(null)

  // Detect reduced motion
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReduced(mq.matches)
    const handler = (e) => setPrefersReduced(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  // Scroll-driven page turn logic
  useEffect(() => {
    const section = scrollContainerRef.current
    if (!section) return

    const handleScroll = () => {
      const rect = section.getBoundingClientRect()
      const sectionHeight = section.offsetHeight
      const viewportH = window.innerHeight

      // How far into the scroll container we are
      const scrolled = -rect.top
      const scrollableDistance = sectionHeight - viewportH

      if (scrollableDistance <= 0) return

      const rawProgress = scrolled / scrollableDistance
      const clampedProgress = Math.max(0, Math.min(1, rawProgress))

      // Map progress to pages
      const totalTurns = totalPages - 1
      const progressPerPage = 1 / totalTurns
      const pageFloat = clampedProgress / progressPerPage
      const pageIdx = Math.min(Math.floor(pageFloat), totalTurns - 1)
      const pageFrac = pageFloat - pageIdx

      if (clampedProgress >= 1) {
        setCurrentPage(totalPages - 1)
        setTurnProgress(0)
      } else {
        setCurrentPage(Math.max(0, pageIdx))
        setTurnProgress(Math.max(0, Math.min(1, pageFrac)))
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [totalPages])

  // Navigate via buttons
  const goToPage = useCallback((targetPage) => {
    const section = scrollContainerRef.current
    if (!section) return
    const clamped = Math.max(0, Math.min(totalPages - 1, targetPage))
    const sectionTop = section.offsetTop
    const sectionHeight = section.offsetHeight
    const viewportH = window.innerHeight
    const scrollableDistance = sectionHeight - viewportH
    const totalTurns = totalPages - 1
    const targetProgress = clamped / totalTurns
    const targetScroll = sectionTop + (targetProgress * scrollableDistance)
    window.scrollTo({ top: targetScroll, behavior: 'smooth' })
  }, [totalPages])

  const handlePrev = useCallback(() => goToPage(currentPage - 1), [currentPage, goToPage])
  const handleNext = useCallback(() => goToPage(currentPage + 1), [currentPage, goToPage])

  const handleViewCredential = useCallback((cert) => {
    if (cert.pdf) {
      setActivePdf(cert.pdf)
      setActiveName(cert.title)
      setActiveIssuer(cert.issuer)
      setActiveYear(cert.year)
    }
  }, [])

  // Keyboard navigation
  useEffect(() => {
    const handler = (e) => {
      const stage = stageRef.current
      if (!stage) return
      const rect = stage.getBoundingClientRect()
      const isVisible = rect.top >= -100 && rect.top <= window.innerHeight
      if (!isVisible) return

      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault()
        goToPage(currentPage + 1)
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault()
        goToPage(currentPage - 1)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [currentPage, goToPage])

  // Build page layers for the 3D book
  const pageElements = useMemo(() => {
    return CERTIFICATIONS.map((cert, i) => {
      const isCurrentPage = i === currentPage
      const isPastPage = i < currentPage
      const isNextPage = i === currentPage + 1

      let rotateY = 0
      let zIndex = totalPages - i
      let opacity = 1
      let shadowIntensity = 0

      if (isPastPage) {
        rotateY = -180
        zIndex = i
        opacity = 0
      } else if (isCurrentPage) {
        if (prefersReduced) {
          rotateY = 0
        } else {
          rotateY = -(turnProgress * 180)
          shadowIntensity = Math.sin(turnProgress * Math.PI)
        }
        zIndex = totalPages + 1
        opacity = turnProgress > 0.5 ? 0 : 1
      } else if (isNextPage) {
        zIndex = totalPages
        opacity = turnProgress > 0.5 ? 1 : 1
      }

      const isActive = isCurrentPage && turnProgress < 0.5 || (isNextPage && turnProgress >= 0.5)

      return (
        <div
          key={i}
          className={`book-page-leaf ${isActive ? 'is-active' : ''}`}
          style={{
            '--rotate-y': `${rotateY}deg`,
            '--z-index': zIndex,
            '--shadow-intensity': shadowIntensity,
            opacity: isPastPage ? 0 : 1,
            pointerEvents: isActive ? 'auto' : 'none',
          }}
          onClick={() => isActive && handleViewCredential(cert)}
        >
          {/* Front face */}
          <div className="book-page-face book-page-front">
            <BookPage
              cert={cert}
              pageIndex={i}
              totalPages={totalPages}
              isActive={isActive}
            />
          </div>
          {/* Back face */}
          <div className="book-page-face book-page-back">
            <div className="book-page-back-pattern" aria-hidden="true">
              <div className="book-page-back-lines" />
            </div>
          </div>
        </div>
      )
    })
  }, [currentPage, turnProgress, totalPages, prefersReduced, handleViewCredential])

  // Scroll height = enough for all page turns + viewport padding
  const scrollHeight = `${100 + (totalPages - 1) * 100}vh`

  // Current active cert for the View link
  const activeCert = CERTIFICATIONS[
    turnProgress >= 0.5 && currentPage + 1 < totalPages
      ? currentPage + 1
      : currentPage
  ]

  return (
    <section id="quality-gates" ref={sectionRef} className="cert-book-section">
      <div className="section-container">
        <SectionHeader
          number="06"
          category="CERTIFICATIONS"
          title="Certifications & Credentials"
          description="A curated collection of professional certifications — scroll to browse each credential."
          style={{ marginBottom: '1.5rem' }}
        />
      </div>

      {/* Scroll-driven container */}
      <div
        ref={scrollContainerRef}
        className="cert-book-scroll-container"
        style={{ height: scrollHeight }}
      >
        {/* Sticky stage */}
        <div ref={stageRef} className="cert-book-stage">
          {/* Book wrapper */}
          <div className="cert-book-wrapper">
            {/* Book structure */}
            <div className="cert-book">
              {/* Spine */}
              <div className="cert-book-spine" aria-hidden="true" />

              {/* Page stack edges */}
              <div className="cert-book-page-edges" aria-hidden="true">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="cert-book-edge-line" style={{ '--edge-offset': `${i * 2}px` }} />
                ))}
              </div>

              {/* Pages */}
              <div className="cert-book-pages" aria-live="polite">
                {pageElements}
              </div>
            </div>
          </div>

          {/* Controls overlay */}
          <div className="cert-book-controls">
            <button
              className="cert-book-nav-btn"
              onClick={handlePrev}
              disabled={currentPage === 0 && turnProgress === 0}
              aria-label="Previous credential"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
            </button>

            <div className="cert-book-page-indicator" aria-label={`Page ${(turnProgress >= 0.5 ? currentPage + 2 : currentPage + 1)} of ${totalPages}`}>
              <span className="cert-book-page-current">
                {String(turnProgress >= 0.5 && currentPage + 1 < totalPages ? currentPage + 2 : currentPage + 1).padStart(2, '0')}
              </span>
              <span className="cert-book-page-sep">/</span>
              <span className="cert-book-page-total">{String(totalPages).padStart(2, '0')}</span>
            </div>

            <button
              className="cert-book-nav-btn"
              onClick={handleNext}
              disabled={currentPage >= totalPages - 1}
              aria-label="Next credential"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
            </button>
          </div>

          {/* Scroll hint */}
          {currentPage === 0 && turnProgress === 0 && (
            <div className="cert-book-scroll-hint" aria-hidden="true">
              <span>Scroll to browse</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M19 12l-7 7-7-7"/></svg>
            </div>
          )}

          {/* Active credential quick-view link */}
          {activeCert?.pdf && (
            <button
              className="cert-book-view-btn"
              onClick={() => handleViewCredential(activeCert)}
              aria-label={`View certificate: ${activeCert.title}`}
            >
              View credential
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7M17 7H7M17 7v10"/></svg>
            </button>
          )}
        </div>
      </div>

      {/* Certificate Modal */}
      <CertificateModal
        isOpen={activePdf !== null}
        onClose={() => {
          setActivePdf(null)
          setActiveName(null)
          setActiveIssuer(null)
          setActiveYear(null)
        }}
        pdfUrl={activePdf}
        certName={activeName}
        certIssuer={activeIssuer}
        certYear={activeYear}
      />
    </section>
  )
}
