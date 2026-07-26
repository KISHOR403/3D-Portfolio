import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, FileText, Eye, Download, Sparkles, CheckCircle2 } from 'lucide-react'

// CV Data list with titles, descriptions, badges, and paths
const CV_LIST = [
  {
    id: 'qa',
    title: 'QA Engineer',
    subtitle: 'Quality Assurance & Test Automation Specialist',
    badge: 'RECOMMENDED',
    badgeColor: 'rgba(74, 222, 154, 0.15)',
    badgeTextColor: '#4ade80',
    badgeBorder: 'rgba(74, 222, 154, 0.3)',
    description: 'Comprehensive QA resume highlighting manual STLC, test automation with Selenium, REST Assured, and CI/CD integration.',
    fileName: 'Kishor_Gogoi_QA.pdf',
    filePath: '/cv/Kishor_Gogoi_QA.pdf',
    size: '18 KB',
    updated: '2026',
    tags: ['Selenium', 'REST Assured', 'Postman', 'STLC', 'SQL'],
  },
  {
    id: 'sdet',
    title: 'SDET (Software Development Engineer in Test)',
    subtitle: 'Automation Architecture & Code-Driven Testing',
    badge: 'AUTOMATION',
    badgeColor: 'rgba(56, 189, 248, 0.15)',
    badgeTextColor: '#38bdf8',
    badgeBorder: 'rgba(56, 189, 248, 0.3)',
    description: 'Focused on test framework development, Page Object Model design, automated API testing, and continuous integration.',
    fileName: 'Kishor_Gogoi_SDET.pdf',
    filePath: '/cv/Kishor_Gogoi_SDET.pdf',
    size: '18 KB',
    updated: '2026',
    tags: ['POM Architecture', 'Java / JS', 'Jenkins', 'Appium', 'CI/CD'],
  },
  {
    id: 'software-testing',
    title: 'Software Testing Engineer',
    subtitle: 'Full-Cycle Web & System Testing',
    badge: 'CORE QA',
    badgeColor: 'rgba(242, 169, 59, 0.15)',
    badgeTextColor: '#F2A93B',
    badgeBorder: 'rgba(242, 169, 59, 0.3)',
    description: 'Covers end-to-end testing processes, defect tracking in Jira, regression testing, and functional/non-functional verification.',
    fileName: 'Kishor_Gogoi_Software_Testing.pdf',
    filePath: '/cv/Kishor_Gogoi_Software_Testing.pdf',
    size: '18 KB',
    updated: '2026',
    tags: ['Functional Testing', 'Regression', 'Jira', 'Bug Tracking', 'Test Cases'],
  },
  {
    id: 'manual-testing',
    title: 'Manual Testing Specialist',
    subtitle: 'Exploratory, Usability & Test Case Execution',
    badge: 'MANUAL QA',
    badgeColor: 'rgba(168, 85, 247, 0.15)',
    badgeTextColor: '#a855f7',
    badgeBorder: 'rgba(168, 85, 247, 0.3)',
    description: 'Detail-oriented manual testing resume emphasizing test planning, boundary value analysis, exploratory testing, and QA documentation.',
    fileName: 'Kishor_Gogoi_Manual_Testing.pdf',
    filePath: '/cv/Kishor_Gogoi_Manual_Testing.pdf',
    size: '18 KB',
    updated: '2026',
    tags: ['Exploratory', 'Test Documentation', 'UI/UX Verification', 'SDLC'],
  },
  {
    id: 'game-tester',
    title: 'Game Tester / QA',
    subtitle: 'Gaming Mechanics, Performance & Compliance',
    badge: 'GAMING',
    badgeColor: 'rgba(244, 63, 94, 0.15)',
    badgeTextColor: '#f43f5e',
    badgeBorder: 'rgba(244, 63, 94, 0.3)',
    description: 'Specialized for gaming quality assurance, mechanics testing, performance benchmarking, physics checks, and bug logging.',
    fileName: 'Kishor_Gogoi_Game_Tester.pdf',
    filePath: '/cv/Kishor_Gogoi_Game_Tester.pdf',
    size: '18 KB',
    updated: '2026',
    tags: ['Gameplay QA', 'Performance Testing', 'Cross-Platform', 'Physics Checks'],
  },
]

export default function ResumeModal({ isOpen, onClose }) {
  // Listen for Escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    }
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

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
            padding: '1.25rem',
          }}
        >
          {/* Backdrop Blur Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(10, 14, 18, 0.82)',
              backdropFilter: 'blur(12px) saturate(160%)',
              WebkitBackdropFilter: 'blur(12px) saturate(160%)',
            }}
          />

          {/* Modal Card Window */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 15 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '820px',
              maxHeight: '90vh',
              display: 'flex',
              flexDirection: 'column',
              background: '#0F1419',
              border: '1px solid #232C35',
              borderRadius: '20px',
              boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.8), 0 0 30px rgba(74, 222, 154, 0.12)',
              overflow: 'hidden',
              zIndex: 1001,
            }}
          >
            {/* Ambient Background Accent */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: '350px',
                height: '350px',
                background: 'radial-gradient(circle, rgba(74, 222, 154, 0.07) 0%, transparent 70%)',
                pointerEvents: 'none',
              }}
            />

            {/* Modal Header */}
            <div
              style={{
                padding: '1.5rem 1.75rem 1.25rem',
                borderBottom: '1px solid rgba(35, 44, 53, 0.7)',
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                gap: '1rem',
                background: 'rgba(15, 20, 25, 0.95)',
              }}
            >
              <div>
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.7rem',
                    fontWeight: 600,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: 'var(--color-accent-pass)',
                    background: 'rgba(74, 222, 154, 0.1)',
                    border: '1px solid rgba(74, 222, 154, 0.25)',
                    borderRadius: '999px',
                    padding: '4px 12px',
                    marginBottom: '0.5rem',
                  }}
                >
                  <Sparkles size={11} />
                  Kishor Gogoi · CV Repository
                </div>
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.4rem',
                    fontWeight: 700,
                    color: 'var(--color-text-primary)',
                    letterSpacing: '-0.02em',
                    margin: 0,
                  }}
                >
                  Select Resume Version
                </h3>
                <p
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.85rem',
                    color: 'var(--color-text-muted)',
                    margin: '0.25rem 0 0',
                  }}
                >
                  Choose a specialized CV tailored to your target engineering role to view or download.
                </p>
              </div>

              {/* Close Button */}
              <button
                onClick={onClose}
                aria-label="Close modal"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '50%',
                  width: '36px',
                  height: '36px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--color-text-muted)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  flexShrink: 0,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.12)'
                  e.currentTarget.style.color = '#fff'
                  e.currentTarget.style.transform = 'rotate(90deg)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'
                  e.currentTarget.style.color = 'var(--color-text-muted)'
                  e.currentTarget.style.transform = 'rotate(0deg)'
                }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body / Scrollable Content */}
            <div
              style={{
                padding: '1.25rem 1.75rem 1.75rem',
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
              }}
            >
              {CV_LIST.map((cv) => (
                <div
                  key={cv.id}
                  style={{
                    background: 'rgba(22, 29, 36, 0.65)',
                    border: '1px solid var(--color-border-hairline)',
                    borderRadius: '14px',
                    padding: '1.25rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.85rem',
                    transition: 'all 0.25s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = cv.badgeTextColor
                    e.currentTarget.style.background = 'rgba(22, 29, 36, 0.95)'
                    e.currentTarget.style.boxShadow = `0 4px 20px -4px ${cv.badgeColor}`
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--color-border-hairline)'
                    e.currentTarget.style.background = 'rgba(22, 29, 36, 0.65)'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                >
                  {/* Top Bar of CV Card */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      justifyContent: 'space-between',
                      gap: '0.75rem',
                      flexWrap: 'wrap',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div
                        style={{
                          width: '38px',
                          height: '38px',
                          borderRadius: '10px',
                          background: cv.badgeColor,
                          border: `1px solid ${cv.badgeBorder}`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: cv.badgeTextColor,
                          flexShrink: 0,
                        }}
                      >
                        <FileText size={20} />
                      </div>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <h4
                            style={{
                              fontFamily: 'var(--font-display)',
                              fontSize: '1.05rem',
                              fontWeight: 600,
                              color: 'var(--color-text-primary)',
                              margin: 0,
                            }}
                          >
                            {cv.title}
                          </h4>
                          <span
                            style={{
                              fontFamily: 'var(--font-mono)',
                              fontSize: '0.625rem',
                              fontWeight: 700,
                              letterSpacing: '0.08em',
                              padding: '2px 8px',
                              borderRadius: '4px',
                              background: cv.badgeColor,
                              color: cv.badgeTextColor,
                              border: `1px solid ${cv.badgeBorder}`,
                            }}
                          >
                            {cv.badge}
                          </span>
                        </div>
                        <span
                          style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.75rem',
                            color: 'var(--color-text-muted)',
                            display: 'block',
                            marginTop: '2px',
                          }}
                        >
                          {cv.subtitle}
                        </span>
                      </div>
                    </div>

                    <div
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.7rem',
                        color: 'var(--color-text-muted)',
                        background: 'rgba(15, 20, 25, 0.6)',
                        padding: '4px 10px',
                        borderRadius: '6px',
                        border: '1px solid rgba(255, 255, 255, 0.05)',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      PDF · {cv.size}
                    </div>
                  </div>

                  {/* Description */}
                  <p
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.85rem',
                      lineHeight: 1.5,
                      color: 'var(--color-text-muted)',
                      margin: 0,
                    }}
                  >
                    {cv.description}
                  </p>

                  {/* Tags & Action Buttons */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '1rem',
                      flexWrap: 'wrap',
                      paddingTop: '0.4rem',
                      borderTop: '1px dashed rgba(255, 255, 255, 0.06)',
                    }}
                  >
                    {/* Skill Tags */}
                    <div
                      style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '6px',
                      }}
                    >
                      {cv.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.65rem',
                            color: '#94a3b8',
                            background: 'rgba(255, 255, 255, 0.04)',
                            padding: '2px 8px',
                            borderRadius: '4px',
                            border: '1px solid rgba(255, 255, 255, 0.06)',
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Action Buttons: View & Download */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      {/* View PDF button */}
                      <a
                        href={cv.filePath}
                        target="_blank"
                        rel="noopener noreferrer"
                        id={`btn-view-cv-${cv.id}`}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.725rem',
                          fontWeight: 600,
                          color: 'var(--color-text-primary)',
                          background: 'rgba(255, 255, 255, 0.06)',
                          border: '1px solid rgba(255, 255, 255, 0.15)',
                          borderRadius: '8px',
                          padding: '7px 14px',
                          textDecoration: 'none',
                          transition: 'all 0.2s ease',
                          cursor: 'pointer',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.14)'
                          e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)'
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)'
                          e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)'
                        }}
                      >
                        <Eye size={13} />
                        View PDF
                      </a>

                      {/* Download PDF button */}
                      <a
                        href={cv.filePath}
                        download={cv.fileName}
                        id={`btn-download-cv-${cv.id}`}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.725rem',
                          fontWeight: 600,
                          color: 'var(--color-bg-base)',
                          background: cv.badgeTextColor,
                          border: `1px solid ${cv.badgeTextColor}`,
                          borderRadius: '8px',
                          padding: '7px 16px',
                          textDecoration: 'none',
                          transition: 'all 0.2s ease',
                          cursor: 'pointer',
                          boxShadow: `0 0 12px ${cv.badgeColor}`,
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.opacity = '0.9'
                          e.currentTarget.style.transform = 'translateY(-1px)'
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.opacity = '1'
                          e.currentTarget.style.transform = 'translateY(0)'
                        }}
                      >
                        <Download size={13} />
                        Download
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Modal Footer */}
            <div
              style={{
                padding: '1rem 1.75rem',
                borderTop: '1px solid rgba(35, 44, 53, 0.7)',
                background: 'rgba(12, 16, 20, 0.95)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.7rem',
                color: 'var(--color-text-muted)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CheckCircle2 size={13} color="var(--color-accent-pass)" />
                All resumes formatted & verified for ATS compatibility
              </div>
              <button
                onClick={onClose}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--color-text-muted)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  cursor: 'pointer',
                  textDecoration: 'underline',
                }}
              >
                Close Window
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
