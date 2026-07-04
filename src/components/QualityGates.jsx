import { useRef, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

const LOG_DATA = [
  {
    pass: '[PASS]',
    parts: {
      name: '  SAP Certified Project Manager – SAP Activate & Agile ',
      dots: '........ ',
      issuer: 'SAP        ',
      year: '2026'
    },
    pdf: '/certificates/sap-project-manager.pdf'
  },
  {
    pass: '[PASS]',
    parts: {
      name: '  Oracle Cloud Infrastructure 2025 Certified DevOps Prof ',
      dots: '....... ',
      issuer: 'Oracle     ',
      year: '2025'
    },
    pdf: '/certificates/oracle-devops-professional.pdf'
  },
  {
    pass: '[PASS]',
    parts: {
      name: '  Oracle Cloud Infrastructure 2025 AI Foundations Associate ',
      dots: '.... ',
      issuer: 'Oracle     ',
      year: '2025'
    },
    pdf: '/certificates/oracle-ai-foundations.pdf'
  },
  {
    pass: '[PASS]',
    parts: {
      name: '  Oracle Data Platform 2025 Certified Foundations Associate ',
      dots: '.... ',
      issuer: 'Oracle     ',
      year: '2025'
    },
    pdf: '/certificates/oracle-data-platform.pdf'
  },
  {
    pass: '[PASS]',
    parts: {
      name: '  Software Testing and Automation Specialization ',
      dots: '............... ',
      issuer: 'Coursera   ',
      year: '2025'
    }
  },
  {
    pass: '[PASS]',
    parts: {
      name: '  Web and Mobile Testing with Selenium ',
      dots: '......................... ',
      issuer: 'Coursera   ',
      year: '2025'
    }
  },
  {
    pass: '[PASS]',
    parts: {
      name: '  IBM DevOps and Software Engineering ',
      dots: '.......................... ',
      issuer: 'IBM        ',
      year: '2025'
    },
    pdf: '/certificates/ibm-devops-engineering.pdf'
  },
  {
    pass: '[PASS]',
    parts: {
      name: '  Claude 101 — Certificate of Completion ',
      dots: '....................... ',
      issuer: 'Anthropic  ',
      year: '2025'
    },
    pdf: '/certificates/anthropic-claude-101.pdf'
  }
]

function CertificateModal({ isOpen, onClose, pdfUrl, certName }) {
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

  return createPortal(
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(13, 17, 23, 0.85)',
        backdropFilter: 'blur(8px)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: 'min(95vw, 900px)',
          height: 'min(90vh, 700px)',
          backgroundColor: '#0D1117',
          border: '1px solid #232C35',
          borderRadius: '12px',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5)',
          overflow: 'hidden',
          position: 'relative',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '1rem 1.5rem',
            borderBottom: '1px solid #232C35',
            backgroundColor: 'rgba(35, 44, 53, 0.2)',
          }}
        >
          <h3
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1rem',
              fontWeight: 500,
              color: 'var(--color-text-primary)',
              margin: 0,
              maxWidth: '85%',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {certName}
          </h3>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--color-text-muted)',
              cursor: 'pointer',
              fontSize: '1.75rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '4px',
              transition: 'color 0.2s',
              lineHeight: 1,
            }}
            onMouseEnter={(e) => (e.target.style.color = '#FFFFFF')}
            onMouseLeave={(e) => (e.target.style.color = 'var(--color-text-muted)')}
          >
            &times;
          </button>
        </div>

        {/* Content - Embed PDF */}
        <div style={{ flex: 1, minHeight: 0, backgroundColor: '#161D24', position: 'relative' }}>
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

export default function QualityGates() {
  const sectionRef = useRef(null)

  const [activePdf, setActivePdf] = useState(null)
  const [activeName, setActiveName] = useState(null)

  const [linesState, setLinesState] = useState(() => {
    const initialCompleted = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    return {
      isStarted: initialCompleted,
      isCompleted: initialCompleted,
      currentLineIndex: initialCompleted ? 8 : 0,
      charCount: initialCompleted ? 999 : 0,
      phase: initialCompleted ? 'complete' : 'typing_pass',
      summaryTypedLength: initialCompleted ? 999 : 0,
    }
  })

  useEffect(() => {
    const element = sectionRef.current
    if (!element) return

    if (linesState.isStarted) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLinesState(prev => {
            if (prev.isStarted) return prev
            return { ...prev, isStarted: true }
          })
          observer.unobserve(element)
        }
      },
      { threshold: 0.1 }
    )

    observer.observe(element)
    return () => {
      if (element) observer.unobserve(element)
    }
  }, [linesState.isStarted])

  useEffect(() => {
    if (!linesState.isStarted || linesState.isCompleted) return

    let timer

    const tick = () => {
      setLinesState(prev => {
        if (prev.phase === 'typing_pass') {
          const line = LOG_DATA[prev.currentLineIndex]
          const currentPassLength = prev.charCount
          if (currentPassLength < line.pass.length) {
            return {
              ...prev,
              charCount: currentPassLength + 1
            }
          } else {
            return {
              ...prev,
              phase: 'pulse_pass'
            }
          }
        }

        if (prev.phase === 'pulse_pass') {
          return prev
        }

        if (prev.phase === 'typing_rest') {
          const line = LOG_DATA[prev.currentLineIndex]
          const fullRestLength =
            line.parts.name.length +
            line.parts.dots.length +
            line.parts.issuer.length +
            line.parts.year.length

          const currentRestLength = prev.charCount
          if (currentRestLength < fullRestLength) {
            return {
              ...prev,
              charCount: currentRestLength + 1
            }
          } else {
            if (prev.currentLineIndex < LOG_DATA.length - 1) {
              return {
                ...prev,
                phase: 'pause_between_lines',
                charCount: 0
              }
            } else {
              return {
                ...prev,
                phase: 'typing_summary',
                charCount: 0
              }
            }
          }
        }

        if (prev.phase === 'typing_summary') {
          const summaryText = '  > 8 tests passed, 0 failed — Build Successful ✓'
          if (prev.summaryTypedLength < summaryText.length) {
            return {
              ...prev,
              summaryTypedLength: prev.summaryTypedLength + 1
            }
          } else {
            return {
              ...prev,
              isCompleted: true,
              currentLineIndex: 8
            }
          }
        }

        return prev
      })
    }

    let intervalMs = 20
    if (linesState.phase === 'pulse_pass') {
      intervalMs = 200
      timer = setTimeout(() => {
        setLinesState(prev => ({ ...prev, phase: 'typing_rest', charCount: 0 }))
      }, intervalMs)
    } else if (linesState.phase === 'pause_between_lines') {
      intervalMs = 150
      timer = setTimeout(() => {
        setLinesState(prev => ({
          ...prev,
          currentLineIndex: prev.currentLineIndex + 1,
          phase: 'typing_pass',
          charCount: 0
        }))
      }, intervalMs)
    } else {
      timer = setInterval(tick, intervalMs)
    }

    return () => {
      clearInterval(timer)
      clearTimeout(timer)
    }
  }, [linesState.isStarted, linesState.isCompleted, linesState.phase, linesState.currentLineIndex])

  const handleOpenCertificate = (pdf, name) => {
    if (pdf) {
      setActivePdf(pdf)
      setActiveName(name)
    }
  }

  const renderLineContent = (index) => {
    const line = LOG_DATA[index]
    const isCurrent = linesState.currentLineIndex === index
    const isPast = linesState.currentLineIndex > index

    if (!linesState.isStarted) return null

    let passText = ''
    let restLength = 0
    let showCursor = false
    let isPulse = false

    if (isPast) {
      passText = line.pass
      restLength =
        line.parts.name.length +
        line.parts.dots.length +
        line.parts.issuer.length +
        line.parts.year.length
    } else if (isCurrent) {
      if (linesState.phase === 'typing_pass') {
        passText = line.pass.substring(0, linesState.charCount)
        showCursor = true
      } else if (linesState.phase === 'pulse_pass') {
        passText = line.pass
        isPulse = true
        showCursor = true
      } else if (linesState.phase === 'typing_rest') {
        passText = line.pass
        restLength = linesState.charCount
        showCursor = true
      } else if (linesState.phase === 'pause_between_lines') {
        passText = line.pass
        restLength =
          line.parts.name.length +
          line.parts.dots.length +
          line.parts.issuer.length +
          line.parts.year.length
      }
    } else {
      return null
    }

    let remaining = restLength
    const getSegmentText = (text) => {
      if (remaining <= 0) return ''
      const sliceLen = Math.min(text.length, remaining)
      remaining -= sliceLen
      return text.substring(0, sliceLen)
    }

    const nameTyped = getSegmentText(line.parts.name)
    const dotsTyped = getSegmentText(line.parts.dots)
    const issuerTyped = getSegmentText(line.parts.issuer)
    const yearTyped = getSegmentText(line.parts.year)

    const isFullyTyped =
      restLength >=
      line.parts.name.length +
        line.parts.dots.length +
        line.parts.issuer.length +
        line.parts.year.length

    const cleanCertName = line.parts.name.trim()

    return (
      <div
        className="terminal-line"
        style={{
          display: 'flex',
          alignItems: 'center',
          minHeight: '24px',
          fontFamily: 'var(--font-mono)',
          transition: 'background-color 0.15s ease',
          padding: '2px 8px',
          borderRadius: '4px',
          cursor: line.pdf ? 'pointer' : 'default',
          whiteSpace: 'pre',
        }}
        onClick={() => handleOpenCertificate(line.pdf, cleanCertName)}
      >
        <span
          className="pass-tag"
          style={{
            color: isPulse ? '#FFFFFF' : 'var(--color-accent-pass)',
            fontWeight: 'bold',
            textShadow: isPulse
              ? '0 0 12px rgba(74, 222, 154, 1), 0 0 4px rgba(74, 222, 154, 1)'
              : 'none',
            transition: isPulse ? 'none' : 'color 0.15s ease, text-shadow 0.15s ease',
          }}
        >
          {passText}
        </span>

        <span style={{ color: 'var(--color-text-primary)' }}>{nameTyped}</span>
        <span style={{ color: '#8B97A3' }}>{dotsTyped}</span>
        <span
          style={{
            color: 'color-mix(in srgb, #8B97A3 85%, var(--color-text-primary))',
          }}
        >
          {issuerTyped}
        </span>
        <span style={{ color: 'var(--color-accent-pending)' }}>{yearTyped}</span>

        {line.pdf && isFullyTyped && (
          <button
            onClick={(e) => {
              e.stopPropagation()
              handleOpenCertificate(line.pdf, cleanCertName)
            }}
            style={{
              color: 'var(--color-accent-pass)',
              marginLeft: '12px',
              textDecoration: 'none',
              fontSize: '0.7rem',
              opacity: 0.5,
              transition: 'opacity 0.2s',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              fontFamily: 'var(--font-mono)',
            }}
            className="view-link"
          >
            [VIEW]
          </button>
        )}

        {showCursor && (
          <span
            style={{
              animation: 'blink 1s step-start infinite',
              color: 'var(--color-accent-pass)',
              marginLeft: '2px',
            }}
          >
            ▋
          </span>
        )}
      </div>
    )
  }

  const renderSummary = () => {
    const isCurrent = linesState.currentLineIndex === 8
    const isCompleted = linesState.isCompleted

    if (!linesState.isStarted) return null
    if (!isCurrent && !isCompleted) return null

    const summaryText1 = '  > 8 tests passed, 0 failed'
    const summaryText2 = ' — Build Successful ✓'

    const currentLen = linesState.summaryTypedLength
    const t1 = summaryText1.substring(0, currentLen)
    const t2 =
      currentLen > summaryText1.length
        ? summaryText2.substring(0, currentLen - summaryText1.length)
        : ''

    const isFullyTyped = currentLen >= summaryText1.length + summaryText2.length

    return (
      <div
        style={{
          fontFamily: 'var(--font-mono)',
          padding: '8px 8px 2px 8px',
          borderTop: '1px solid rgba(35, 44, 53, 0.4)',
          marginTop: '8px',
          minHeight: '24px',
        }}
      >
        <span style={{ color: 'var(--color-text-muted)' }}>{t1}</span>
        <span style={{ color: 'var(--color-accent-pass)', fontWeight: 'bold' }}>
          {t2}
        </span>
        {!isFullyTyped && (
          <span
            style={{
              animation: 'blink 1s step-start infinite',
              color: 'var(--color-accent-pass)',
              marginLeft: '2px',
            }}
          >
            ▋
          </span>
        )}
      </div>
    )
  }

  return (
    <section
      id="quality-gates"
      ref={sectionRef}
      style={{
        background: 'rgba(22, 29, 36, 0.75)',
        backdropFilter: 'blur(10px)',
      }}
    >
      <style>{`
        .terminal-line:hover {
          background-color: rgba(74, 222, 154, 0.06) !important;
        }
        .terminal-line:hover .pass-tag {
          color: #a7ffd1 !important;
          text-shadow: 0 0 8px rgba(74, 222, 154, 0.5);
        }
        .terminal-line:hover .view-link {
          opacity: 1 !important;
        }
        .terminal-body-text {
          font-size: 13.5px;
        }
        @media (max-width: 768px) {
          .terminal-body-text {
            font-size: 11.5px;
          }
        }
      `}</style>

      <div className="section-container">
        <div>
          <p className="section-eyebrow">Quality Gates Passed</p>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '2rem',
              fontWeight: 600,
              letterSpacing: '-0.02em',
              color: 'var(--color-text-primary)',
              marginBottom: '3rem',
            }}
          >
            Certifications
          </h2>
        </div>

        {/* Terminal Window Frame */}
        <div
          style={{
            backgroundColor: '#0D1117',
            backgroundImage:
              'linear-gradient(rgba(255, 255, 255, 0.03) 50%, transparent 50%)',
            backgroundSize: '100% 4px',
            borderRadius: '10px',
            border: '1px solid #232C35',
            boxShadow:
              'inset 0 4px 20px rgba(0, 0, 0, 0.5), 0 10px 30px rgba(0, 0, 0, 0.3)',
            overflow: 'hidden',
            width: '100%',
          }}
        >
          {/* Terminal Title Bar */}
          <div
            style={{
              height: '32px',
              background: 'rgba(35, 44, 53, 0.4)',
              borderBottom: '1px solid #232C35',
              display: 'flex',
              alignItems: 'center',
              padding: '0 1rem',
              position: 'relative',
            }}
          >
            {/* macOS window control buttons */}
            <div style={{ display: 'flex', gap: '6px' }}>
              <span
                style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  backgroundColor: '#E8615C',
                }}
              />
              <span
                style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  backgroundColor: '#F2A93B',
                }}
              />
              <span
                style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  backgroundColor: '#4ADE9A',
                }}
              />
            </div>
            {/* Centered label */}
            <div
              style={{
                position: 'absolute',
                left: '50%',
                transform: 'translateX(-50%)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                color: 'var(--color-text-muted)',
                whiteSpace: 'nowrap',
              }}
            >
              kishor@qa-portfolio: ~ test-suite --certs
            </div>
          </div>

          {/* Terminal Body */}
          <div
            className="terminal-body-text"
            style={{
              padding: '1.5rem',
              overflowX: 'auto',
              whiteSpace: 'nowrap',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.4rem',
              lineHeight: 1.6,
            }}
          >
            {LOG_DATA.map((_, i) => (
              <div key={i}>{renderLineContent(i)}</div>
            ))}
            {renderSummary()}
          </div>
        </div>
      </div>

      {/* Certificate Modal Popup */}
      <CertificateModal
        isOpen={activePdf !== null}
        onClose={() => {
          setActivePdf(null)
          setActiveName(null)
        }}
        pdfUrl={activePdf}
        certName={activeName}
      />
    </section>
  )
}
