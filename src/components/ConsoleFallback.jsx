import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Terminal as TerminalIcon } from 'lucide-react'

const SCENARIOS = [
  {
    cmd: 'npm test -- --coverage',
    output: [
      { text: '→ Running Selenium & API test suites...', color: 'var(--color-text-muted)' },
      { text: '✔ PASS src/e2e/logiconnect.spec.ts (2.8s)', color: '#4ADE9A' },
      { text: '✔ PASS src/api/testnexa-auth.spec.ts (1.1s)', color: '#4ADE9A' },
      { text: 'Tests: 18 passed, 18 total · 95.8% coverage', color: 'var(--color-text-primary)' },
    ],
  },
  {
    cmd: 'curl -s https://api.testnexa.ai/health',
    output: [
      { text: 'HTTP/2 200 OK · latency: 24ms', color: '#4ADE9A' },
      { text: '{"status":"operational","database":"connected"}', color: 'var(--color-text-muted)' },
      { text: '✔ All CI/CD quality gates verified green', color: 'var(--color-text-primary)' },
    ],
  },
  {
    cmd: 'git log -1 --oneline',
    output: [
      { text: '480203b feat(qa): automated regression suite complete', color: '#4ADE9A' },
      { text: 'Branch: main · Ready for continuous deployment', color: 'var(--color-text-muted)' },
    ],
  },
]

export default function ConsoleFallback() {
  const [scenarioIdx, setScenarioIdx] = useState(0)
  const [displayedCmd, setDisplayedCmd] = useState('')
  const [showOutput, setShowOutput] = useState(false)
  const [isTyping, setIsTyping] = useState(true)

  useEffect(() => {
    let timer
    const current = SCENARIOS[scenarioIdx]
    const fullCmd = current.cmd

    if (isTyping) {
      if (displayedCmd.length < fullCmd.length) {
        timer = setTimeout(() => {
          setDisplayedCmd(fullCmd.slice(0, displayedCmd.length + 1))
        }, 40 + Math.random() * 20)
      } else {
        timer = setTimeout(() => {
          setIsTyping(false)
          setShowOutput(true)
        }, 300)
      }
    } else {
      timer = setTimeout(() => {
        setShowOutput(false)
        setDisplayedCmd('')
        setIsTyping(true)
        setScenarioIdx((prev) => (prev + 1) % SCENARIOS.length)
      }, 3600)
    }

    return () => clearTimeout(timer)
  }, [displayedCmd, isTyping, scenarioIdx])

  const current = SCENARIOS[scenarioIdx]

  return (
    <div
      style={{
        width: '100%',
        maxWidth: '460px',
        background: 'rgba(15, 20, 25, 0.75)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 20px 50px -10px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.03)',
      }}
    >
      {/* Terminal Title Bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '10px 14px',
          background: 'rgba(255, 255, 255, 0.02)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ width: '9px', height: '9px', borderRadius: '50%', background: '#EF4444', opacity: 0.75 }} />
          <span style={{ width: '9px', height: '9px', borderRadius: '50%', background: '#F59E0B', opacity: 0.75 }} />
          <span style={{ width: '9px', height: '9px', borderRadius: '50%', background: '#10B981', opacity: 0.75 }} />
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.68rem',
            color: 'var(--color-text-muted)',
            letterSpacing: '0.04em',
          }}
        >
          <TerminalIcon size={11} style={{ opacity: 0.6 }} />
          <span>kishor@macbook: ~/qa-suite</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <span
            style={{
              width: '5px',
              height: '5px',
              borderRadius: '50%',
              background: '#4ADE9A',
              boxShadow: '0 0 6px #4ADE9A',
            }}
          />
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.6rem',
              color: '#4ADE9A',
              fontWeight: 600,
              letterSpacing: '0.06em',
            }}
          >
            ACTIVE
          </span>
        </div>
      </div>

      {/* Terminal Console Content */}
      <div
        style={{
          padding: '18px 20px',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.78rem',
          lineHeight: 1.65,
          minHeight: '185px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
        }}
      >
        {/* Environment line */}
        <div style={{ color: 'rgba(255, 255, 255, 0.35)', fontSize: '0.7rem', marginBottom: '8px' }}>
          node v20.12.0 · chromium headless · playwright v1.42
        </div>

        {/* Command line */}
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '10px' }}>
          <span style={{ color: '#4ADE9A', fontWeight: 600 }}>$</span>
          <span style={{ color: 'var(--color-text-primary)' }}>{displayedCmd}</span>
          {isTyping && (
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ repeat: Infinity, duration: 0.6 }}
              style={{
                display: 'inline-block',
                width: '7px',
                height: '14px',
                background: '#4ADE9A',
                verticalAlign: 'middle',
                marginLeft: '2px',
              }}
            />
          )}
        </div>

        {/* Output lines */}
        {showOutput && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}
          >
            {current.output.map((line, idx) => (
              <div key={idx} style={{ color: line.color, fontSize: '0.74rem' }}>
                {line.text}
              </div>
            ))}
          </motion.div>
        )}
      </div>

      {/* Terminal Footer Bar */}
      <div
        style={{
          padding: '6px 14px',
          background: 'rgba(0, 0, 0, 0.2)',
          borderTop: '1px solid rgba(255, 255, 255, 0.04)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '0.65rem',
          fontFamily: 'var(--font-mono)',
          color: 'rgba(255, 255, 255, 0.35)',
        }}
      >
        <span>UTF-8</span>
        <span>TEST AUTOMATION RUNNER</span>
      </div>
    </div>
  )
}
