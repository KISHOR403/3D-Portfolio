import { useState, useEffect, useMemo } from 'react'

const TERMINAL_LINES = [
  '$ npm run test:prod',
  '> Running suite...',
  '✓ 95% functional coverage',
  '✓ CI/CD: GitHub Actions',
  '✓ 4 projects passed',
  '✓ 3 quality gates verified',
  '0 failed tests.',
  'Deployment ready.',
]

export default function ConsoleFallback() {
  const [lines, setLines] = useState([])
  const [currentLine, setCurrentLine] = useState(0)
  const [currentChar, setCurrentChar] = useState(0)

  const prefersReducedMotion = useMemo(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }, [])

  useEffect(() => {
    if (prefersReducedMotion) {
      setLines(TERMINAL_LINES)
      return
    }

    if (currentLine >= TERMINAL_LINES.length) {
      const timeout = setTimeout(() => {
        setLines([])
        setCurrentLine(0)
        setCurrentChar(0)
      }, 3000)
      return () => clearTimeout(timeout)
    }

    const line = TERMINAL_LINES[currentLine]
    if (currentChar <= line.length) {
      const speed = currentChar === 0 ? 400 : (line.startsWith('$') ? 60 : 30)
      const timeout = setTimeout(() => {
        setLines(prev => {
          const newLines = [...prev]
          newLines[currentLine] = line.substring(0, currentChar)
          return newLines
        })
        setCurrentChar(c => c + 1)
      }, speed)
      return () => clearTimeout(timeout)
    } else {
      const timeout = setTimeout(() => {
        setCurrentLine(l => l + 1)
        setCurrentChar(0)
      }, 200)
      return () => clearTimeout(timeout)
    }
  }, [currentLine, currentChar, prefersReducedMotion])

  const isTyping = currentLine < TERMINAL_LINES.length && !prefersReducedMotion

  return (
    <div className="console-fallback" style={{
      width: '100%',
      maxWidth: '440px',
      margin: '0 auto',
      perspective: '800px',
    }}>
      {/* Monitor frame */}
      <div style={{
        background: 'linear-gradient(145deg, #1a2030, #141c28)',
        borderRadius: '14px',
        padding: '3px',
        boxShadow: '0 25px 60px rgba(0,0,0,0.5), 0 0 40px rgba(74, 222, 154, 0.05)',
        transform: 'rotateX(-4deg) rotateY(2deg)',
        transition: 'transform 0.5s ease',
      }}>
        {/* Screen area */}
        <div style={{
          background: '#0a0f14',
          borderRadius: '11px',
          padding: '16px 20px',
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '11px',
          lineHeight: '1.7',
          minHeight: '260px',
        }}>
          {/* Terminal header */}
          <div style={{
            display: 'flex',
            gap: '6px',
            marginBottom: '12px',
            paddingBottom: '8px',
            borderBottom: '1px solid #232C35',
            alignItems: 'center',
          }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#E8615C' }} />
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#F2A93B' }} />
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#4ADE9A' }} />
            <span style={{ marginLeft: '8px', color: '#8B97A3', fontSize: '9px' }}>test-runner</span>
          </div>

          {/* Terminal lines */}
          {lines.map((line, i) => (
            <div key={i} style={{
              color: line?.startsWith('✓') ? '#4ADE9A' :
                     line?.startsWith('$') ? '#F2A93B' :
                     line?.includes('0 failed') ? '#4ADE9A' :
                     line?.includes('Deployment') ? '#4ADE9A' :
                     '#E8EAED',
              minHeight: '18px',
            }}>
              {line || ''}
              {i === lines.length - 1 && isTyping && (
                <span className="terminal-cursor" />
              )}
            </div>
          ))}
        </div>

        {/* Bottom bezel accent */}
        <div style={{
          height: '2px',
          background: 'linear-gradient(90deg, transparent, #4ADE9A, transparent)',
          margin: '0 30%',
          borderRadius: '1px',
          marginTop: '2px',
          marginBottom: '8px',
        }} />
      </div>

      {/* Stand */}
      <div style={{
        width: '4px',
        height: '32px',
        background: '#1a2030',
        margin: '0 auto',
      }} />
      <div style={{
        width: '60px',
        height: '4px',
        background: 'linear-gradient(90deg, transparent, #1a2030, transparent)',
        margin: '0 auto',
        borderRadius: '2px',
      }} />
    </div>
  )
}
