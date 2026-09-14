import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, FileText, Eye, Download, ArrowLeft, ExternalLink } from 'lucide-react'

// CV Data list with human-crafted descriptions and focus areas
const CV_LIST = [
  {
    id: 'qa',
    title: 'QA Engineer',
    subtitle: 'Quality Assurance & Test Automation Specialist',
    isRecommended: true,
    recommendationText: 'Recommended for QA roles',
    description: 'Manual QA, API testing and test automation experience.',
    focusAreas: 'Manual QA · API Testing · Automation · CI/CD',
    fileName: 'Kishor_Gogoi_QA.pdf',
    filePath: '/cv/Kishor_Gogoi_QA.pdf',
    metadata: 'PDF · 1 page · Updated Sep 2026',
  },
  {
    id: 'sdet',
    title: 'SDET',
    subtitle: 'Software Development Engineer in Test',
    isRecommended: false,
    description: 'Automation frameworks, API testing and CI/CD.',
    focusAreas: 'POM Architecture · Java / JS · Jenkins · Appium · CI/CD',
    fileName: 'Kishor_Gogoi_SDET.pdf',
    filePath: '/cv/Kishor_Gogoi_SDET.pdf',
    metadata: 'PDF · 1 page · Updated Sep 2026',
  },
  {
    id: 'software-testing',
    title: 'Software Testing Engineer',
    subtitle: 'Full-Cycle Web & System Testing',
    isRecommended: false,
    description: 'Core testing, defect management and quality processes.',
    focusAreas: 'Functional Testing · Regression · Jira · Defect Tracking',
    fileName: 'Kishor_Gogoi_Software_Testing.pdf',
    filePath: '/cv/Kishor_Gogoi_Software_Testing.pdf',
    metadata: 'PDF · 1 page · Updated Sep 2026',
  },
  {
    id: 'manual-testing',
    title: 'Manual Testing Specialist',
    subtitle: 'Exploratory, Usability & Test Case Execution',
    isRecommended: false,
    description: 'Exploratory testing, test planning and QA documentation.',
    focusAreas: 'Exploratory Testing · Test Planning · UI/UX Verification · SDLC',
    fileName: 'Kishor_Gogoi_Manual_Testing.pdf',
    filePath: '/cv/Kishor_Gogoi_Manual_Testing.pdf',
    metadata: 'PDF · 1 page · Updated Sep 2026',
  },
  {
    id: 'game-tester',
    title: 'Game Tester / QA',
    subtitle: 'Gaming Mechanics, Performance & Compliance',
    isRecommended: false,
    description: 'Gameplay mechanics, performance testing and bug logging.',
    focusAreas: 'Gameplay QA · Mechanics Testing · Performance · Bug Logging',
    fileName: 'Kishor_Gogoi_Game_Tester.pdf',
    filePath: '/cv/Kishor_Gogoi_Game_Tester.pdf',
    metadata: 'PDF · 1 page · Updated Sep 2026',
  },
]

export default function ResumeModal({ isOpen, onClose }) {
  const [previewCv, setPreviewCv] = useState(null)
  const [hoveredCardId, setHoveredCardId] = useState(null)

  // Reset preview when modal closes
  useEffect(() => {
    if (!isOpen) {
      setPreviewCv(null)
    }
  }, [isOpen])

  // Listen for Escape key to go back from preview or close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (previewCv) {
          setPreviewCv(null)
        } else {
          onClose()
        }
      }
    }
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    }
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, previewCv, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem',
          }}
        >
          {/* Backdrop Blur Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => {
              if (previewCv) setPreviewCv(null)
              onClose()
            }}
            style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(0, 0, 0, 0.68)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
            }}
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: previewCv ? '920px' : '760px',
              maxHeight: '86vh',
              display: 'flex',
              flexDirection: 'column',
              background: '#0D1117',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '16px',
              boxShadow: '0 20px 50px -10px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(255, 255, 255, 0.04)',
              overflow: 'hidden',
              zIndex: 1001,
              transition: 'max-width 0.25s ease',
            }}
          >
            {/* VIEW 1: PDF PREVIEW INTERFACE */}
            {previewCv ? (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  height: '84vh',
                  maxHeight: '84vh',
                  background: '#0D1117',
                }}
              >
                {/* Top Navigation / Action Bar */}
                <div
                  style={{
                    padding: '0.85rem 1.25rem',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '1rem',
                    background: 'rgba(15, 20, 25, 0.95)',
                    flexShrink: 0,
                  }}
                >
                  {/* Back Button & Title */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0 }}>
                    <button
                      onClick={() => setPreviewCv(null)}
                      aria-label="Back to resume list"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '8px',
                        padding: '6px 12px',
                        color: 'var(--color-text-primary)',
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.8rem',
                        fontWeight: 500,
                        cursor: 'pointer',
                        transition: 'background 0.15s ease, border-color 0.15s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'
                        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'
                        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'
                      }}
                    >
                      <ArrowLeft size={15} />
                      <span>Back</span>
                    </button>

                    <div style={{ minWidth: 0 }}>
                      <div
                        style={{
                          fontFamily: 'var(--font-sans)',
                          fontSize: '0.9rem',
                          fontWeight: 600,
                          color: 'var(--color-text-primary)',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        Resume Preview
                      </div>
                      <div
                        style={{
                          fontFamily: 'var(--font-sans)',
                          fontSize: '0.75rem',
                          color: 'var(--color-text-muted)',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {previewCv.title} · Kishor Gogoi
                      </div>
                    </div>
                  </div>

                  {/* Actions: Download, Open in New Tab, Close */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
                    {/* Open in New Tab */}
                    <a
                      href={previewCv.filePath}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Open in new tab"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.78rem',
                        fontWeight: 500,
                        color: 'var(--color-text-muted)',
                        background: 'transparent',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '8px',
                        padding: '6px 12px',
                        textDecoration: 'none',
                        transition: 'color 0.15s ease, border-color 0.15s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = 'var(--color-text-primary)'
                        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.22)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = 'var(--color-text-muted)'
                        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'
                      }}
                    >
                      <ExternalLink size={13} />
                      <span className="hidden sm:inline">Open in New Tab</span>
                    </a>

                    {/* Download PDF button */}
                    <a
                      href={previewCv.filePath}
                      download={previewCv.fileName}
                      id={`btn-download-preview-${previewCv.id}`}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.78rem',
                        fontWeight: 600,
                        color: '#0F1419',
                        background: 'var(--color-accent-pass)',
                        borderRadius: '8px',
                        padding: '6px 14px',
                        textDecoration: 'none',
                        transition: 'opacity 0.15s ease',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.9')}
                      onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
                    >
                      <Download size={13} />
                      <span className="hidden sm:inline">Download PDF</span>
                      <span className="sm:hidden">PDF</span>
                    </a>

                    {/* Close button */}
                    <button
                      onClick={onClose}
                      aria-label="Close modal"
                      style={{
                        background: 'transparent',
                        border: 'none',
                        width: '32px',
                        height: '32px',
                        borderRadius: '6px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--color-text-muted)',
                        cursor: 'pointer',
                        transition: 'color 0.15s ease, background 0.15s ease',
                        marginLeft: '4px',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = '#FFFFFF'
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = 'var(--color-text-muted)'
                        e.currentTarget.style.background = 'transparent'
                      }}
                    >
                      <X size={18} />
                    </button>
                  </div>
                </div>

                {/* PDF Viewer Canvas */}
                <div
                  style={{
                    flex: 1,
                    minHeight: 0,
                    background: '#11161D',
                    position: 'relative',
                  }}
                >
                  <iframe
                    src={`${previewCv.filePath}#toolbar=0&navpanes=0`}
                    title={`Resume Preview - ${previewCv.title}`}
                    style={{
                      width: '100%',
                      height: '100%',
                      border: 'none',
                      display: 'block',
                      background: '#11161D',
                    }}
                  />
                </div>
              </div>
            ) : (
              /* VIEW 2: RESUME LIBRARY LIST VIEW */
              <>
                {/* Clean Editorial Header */}
                <div
                  style={{
                    padding: '1.5rem 1.75rem 1.15rem',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.07)',
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    gap: '1rem',
                    background: '#0D1117',
                    flexShrink: 0,
                  }}
                >
                  <div>
                    <h3
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '1.25rem',
                        fontWeight: 600,
                        color: 'var(--color-text-primary)',
                        letterSpacing: '-0.02em',
                        margin: 0,
                      }}
                    >
                      Resume Library
                    </h3>
                    <p
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.85rem',
                        color: 'var(--color-text-muted)',
                        margin: '0.3rem 0 0',
                        lineHeight: 1.45,
                      }}
                    >
                      Choose the version that best matches the role you&apos;re applying for.
                    </p>
                    <div
                      style={{
                        marginTop: '0.35rem',
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.75rem',
                        color: '#8492A6',
                        lineHeight: 1.4,
                      }}
                    >
                      {CV_LIST.length} tailored versions · All resume versions are ATS-friendly PDF formats.
                    </div>
                  </div>

                  {/* Close Button */}
                  <button
                    onClick={onClose}
                    aria-label="Close modal"
                    style={{
                      background: 'transparent',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: '8px',
                      width: '32px',
                      height: '32px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--color-text-muted)',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                      flexShrink: 0,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)'
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.18)'
                      e.currentTarget.style.color = '#FFFFFF'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'transparent'
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)'
                      e.currentTarget.style.color = 'var(--color-text-muted)'
                    }}
                  >
                    <X size={16} />
                  </button>
                </div>

                {/* Resume Cards Container with Internal Scrolling */}
                <div
                  style={{
                    padding: '1.25rem 1.75rem',
                    overflowY: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.85rem',
                    flex: 1,
                  }}
                >
                  {CV_LIST.map((cv) => {
                    const isHovered = hoveredCardId === cv.id

                    return (
                      <div
                        key={cv.id}
                        onMouseEnter={() => setHoveredCardId(cv.id)}
                        onMouseLeave={() => setHoveredCardId(null)}
                        style={{
                          background: isHovered
                            ? 'rgba(255, 255, 255, 0.04)'
                            : 'rgba(255, 255, 255, 0.02)',
                          border: isHovered
                            ? '1px solid rgba(255, 255, 255, 0.16)'
                            : '1px solid rgba(255, 255, 255, 0.07)',
                          borderRadius: '14px',
                          padding: '1.15rem 1.35rem',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '0.7rem',
                          transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
                          transition:
                            'transform 0.18s ease, background 0.18s ease, border-color 0.18s ease',
                        }}
                      >
                        {/* Top: Minimal Document Icon + Title + Role + Subtle Recommendation */}
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: '12px',
                          }}
                        >
                          {/* Consistent Minimal Document Icon */}
                          <div
                            style={{
                              width: '34px',
                              height: '34px',
                              borderRadius: '8px',
                              background: 'rgba(255, 255, 255, 0.035)',
                              border: '1px solid rgba(255, 255, 255, 0.08)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: 'var(--color-accent-pass)',
                              flexShrink: 0,
                              marginTop: '2px',
                            }}
                          >
                            <FileText size={17} />
                          </div>

                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                flexWrap: 'wrap',
                              }}
                            >
                              <h4
                                style={{
                                  fontFamily: 'var(--font-sans)',
                                  fontSize: '1rem',
                                  fontWeight: 600,
                                  color: 'var(--color-text-primary)',
                                  letterSpacing: '-0.01em',
                                  margin: 0,
                                }}
                              >
                                {cv.title}
                              </h4>

                              {/* Subtle Understated Recommendation */}
                              {cv.isRecommended && (
                                <span
                                  style={{
                                    fontFamily: 'var(--font-sans)',
                                    fontSize: '0.725rem',
                                    fontWeight: 500,
                                    color: 'var(--color-accent-pass)',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '4px',
                                    opacity: 0.9,
                                  }}
                                >
                                  <span>●</span> {cv.recommendationText}
                                </span>
                              )}
                            </div>

                            {/* Subtitle */}
                            <span
                              style={{
                                fontFamily: 'var(--font-sans)',
                                fontSize: '0.8rem',
                                color: 'var(--color-text-muted)',
                                display: 'block',
                                marginTop: '2px',
                              }}
                            >
                              {cv.subtitle}
                            </span>
                          </div>
                        </div>

                        {/* Short Natural Description */}
                        <p
                          style={{
                            fontFamily: 'var(--font-sans)',
                            fontSize: '0.825rem',
                            color: '#CBD5E1',
                            margin: 0,
                            lineHeight: 1.5,
                          }}
                        >
                          {cv.description}
                        </p>

                        {/* Focus Areas as Normal Typography */}
                        <div
                          style={{
                            fontFamily: 'var(--font-sans)',
                            fontSize: '0.76rem',
                            color: '#94A3B8',
                            letterSpacing: '0.01em',
                          }}
                        >
                          {cv.focusAreas}
                        </div>

                        {/* Bottom Row: Clean Metadata + Action Buttons */}
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: '1rem',
                            paddingTop: '0.45rem',
                            borderTop: '1px solid rgba(255, 255, 255, 0.05)',
                            flexWrap: 'wrap',
                          }}
                        >
                          {/* Understated Metadata */}
                          <div
                            style={{
                              fontFamily: 'var(--font-sans)',
                              fontSize: '0.75rem',
                              color: '#7E8B9B',
                            }}
                          >
                            {cv.metadata}
                          </div>

                          {/* Action Buttons: Preview + Download PDF */}
                          <div
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '8px',
                            }}
                          >
                            {/* Preview Button (Secondary) */}
                            <button
                              type="button"
                              onClick={() => setPreviewCv(cv)}
                              id={`btn-view-cv-${cv.id}`}
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '6px',
                                fontFamily: 'var(--font-sans)',
                                fontSize: '0.75rem',
                                fontWeight: 500,
                                color: '#E2E8F0',
                                background: 'rgba(255, 255, 255, 0.04)',
                                border: '1px solid rgba(255, 255, 255, 0.12)',
                                borderRadius: '8px',
                                padding: '6px 13px',
                                cursor: 'pointer',
                                transition: 'background 0.15s ease, border-color 0.15s ease',
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.09)'
                                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.22)'
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)'
                                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)'
                              }}
                            >
                              <Eye size={13} />
                              <span>Preview</span>
                            </button>

                            {/* Download PDF Button (Primary) */}
                            <a
                              href={cv.filePath}
                              download={cv.fileName}
                              id={`btn-download-cv-${cv.id}`}
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '6px',
                                fontFamily: 'var(--font-sans)',
                                fontSize: '0.75rem',
                                fontWeight: 600,
                                color: '#0F1419',
                                background: 'var(--color-accent-pass)',
                                border: '1px solid var(--color-accent-pass)',
                                borderRadius: '8px',
                                padding: '6px 14px',
                                textDecoration: 'none',
                                cursor: 'pointer',
                                transition: 'opacity 0.15s ease',
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.opacity = '0.9'
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.opacity = '1'
                              }}
                            >
                              <Download size={13} />
                              <span>Download PDF</span>
                            </a>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
