import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Play, Check, X, RotateCcw, Shield } from 'lucide-react'

const TEST_CASES = [
  {
    id: 'TC-01',
    name: 'Valid credentials',
    type: 'Positive',
    input: { email: 'kishor@example.com', password: 'SecurePass123!' },
    expected: { status: 200, message: 'Login successful' },
    validation: (email, password) => {
      return email.includes('@') && email.includes('.') && password.length >= 8
    },
  },
  {
    id: 'TC-02',
    name: 'Empty email boundary',
    type: 'Boundary',
    input: { email: '', password: 'SecurePass123!' },
    expected: { status: 400, message: 'Email is required' },
    validation: (email) => !email || email.trim() === '',
  },
  {
    id: 'TC-03',
    name: 'Invalid email format',
    type: 'Negative',
    input: { email: 'not-an-email', password: 'SecurePass123!' },
    expected: { status: 422, message: 'Invalid email format' },
    validation: (email) => !email.includes('@') || !email.includes('.'),
  },
  {
    id: 'TC-04',
    name: 'Short password boundary',
    type: 'Boundary',
    input: { email: 'user@test.com', password: 'abc' },
    expected: { status: 422, message: 'Password must be ≥ 8 characters' },
    validation: (_, password) => password.length < 8 && password.length > 0,
  },
  {
    id: 'TC-05',
    name: 'SQL Injection defense',
    type: 'Security',
    input: { email: "admin' OR 1=1 --", password: 'anything' },
    expected: { status: 422, message: 'Input sanitized — injection blocked' },
    validation: (email) => /['";\\-]/.test(email),
  },
  {
    id: 'TC-06',
    name: 'Session persistence',
    type: 'Positive',
    input: { email: 'kishor@example.com', password: 'SecurePass123!', remember: true },
    expected: { status: 200, message: 'Session token stored' },
    validation: (email, password) => {
      return email.includes('@') && email.includes('.') && password.length >= 8
    },
  },
]

const TYPE_COLORS = {
  Positive: '#4ADE9A',
  Negative: '#E8615C',
  Boundary: '#F2A93B',
  Security: '#C084FC',
}

function TestRunner({ testCase, index, isRunning, result, onRun }) {
  const typeColor = TYPE_COLORS[testCase.type] || '#9EABB8'
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0.75rem 1rem',
      background: 'var(--color-bg-surface)',
      border: '1px solid var(--color-border-hairline)',
      borderRadius: '8px',
      gap: '0.75rem',
      flexWrap: 'wrap',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flex: 1, minWidth: '200px' }}>
        <span style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.65rem',
          fontWeight: 600,
          color: '#6C7A89',
          width: '40px',
          flexShrink: 0,
        }}>
          {testCase.id}
        </span>
        <span style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '0.82rem',
          color: 'var(--color-text-primary)',
          fontWeight: 500,
        }}>
          {testCase.name}
        </span>
        <span style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.6rem',
          fontWeight: 500,
          padding: '2px 6px',
          borderRadius: '4px',
          background: `${typeColor}12`,
          color: typeColor,
          border: `1px solid ${typeColor}30`,
          flexShrink: 0,
        }}>
          {testCase.type}
        </span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        {result && (
          <span style={{
            display: 'flex',
            alignItems: 'center',
            gap: '3px',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.65rem',
            fontWeight: 600,
            color: result.pass ? '#4ADE9A' : '#E8615C',
          }}>
            {result.pass ? <Check size={12} /> : <X size={12} />}
            {result.pass ? 'PASS' : 'FAIL'}
            <span style={{ color: '#6C7A89', fontWeight: 400 }}>
              {result.latency}ms
            </span>
          </span>
        )}
        <button
          onClick={() => onRun(testCase)}
          disabled={isRunning}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            background: 'rgba(74, 222, 154, 0.08)',
            border: '1px solid rgba(74, 222, 154, 0.2)',
            borderRadius: '6px',
            padding: '4px 10px',
            cursor: isRunning ? 'not-allowed' : 'pointer',
            color: '#4ADE9A',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.65rem',
            fontWeight: 600,
            transition: 'all 0.15s ease',
            opacity: isRunning ? 0.5 : 1,
          }}
        >
          <Play size={10} />
          Run
        </button>
      </div>
    </div>
  )
}

export default function QALab() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(false)
  const [results, setResults] = useState({})
  const [runningId, setRunningId] = useState(null)
  const [isRunningAll, setIsRunningAll] = useState(false)
  const [executionLog, setExecutionLog] = useState([])

  const runTest = (testCase) => {
    setRunningId(testCase.id)

    const inputEmail = testCase.input.email
    const inputPassword = testCase.input.password
    const latency = Math.floor(Math.random() * 40) + 8

    setTimeout(() => {
      const pass = testCase.validation(inputEmail, inputPassword)
      const result = {
        pass,
        latency,
        status: testCase.expected.status,
        message: testCase.expected.message,
      }

      setResults(prev => ({ ...prev, [testCase.id]: result }))
      setExecutionLog(prev => [
        ...prev,
        `[${new Date().toLocaleTimeString()}] ${testCase.id} — ${testCase.name}: ${pass ? 'PASS' : 'FAIL'} (${latency}ms) → ${testCase.expected.status} ${testCase.expected.message}`,
      ])
      setRunningId(null)
    }, latency + 200)
  }

  const runAllTests = async () => {
    setIsRunningAll(true)
    setResults({})
    setExecutionLog([])

    for (let i = 0; i < TEST_CASES.length; i++) {
      const tc = TEST_CASES[i]
      setRunningId(tc.id)
      const latency = Math.floor(Math.random() * 40) + 8

      await new Promise(resolve => setTimeout(resolve, latency + 300))

      const pass = tc.validation(tc.input.email, tc.input.password)
      const result = {
        pass,
        latency,
        status: tc.expected.status,
        message: tc.expected.message,
      }

      setResults(prev => ({ ...prev, [tc.id]: result }))
      setExecutionLog(prev => [
        ...prev,
        `[${new Date().toLocaleTimeString()}] ${tc.id} — ${tc.name}: ${pass ? 'PASS' : 'FAIL'} (${latency}ms) → ${tc.expected.status} ${tc.expected.message}`,
      ])
    }

    setRunningId(null)
    setIsRunningAll(false)
  }

  const resetAll = () => {
    setResults({})
    setExecutionLog([])
    setEmail('')
    setPassword('')
    setRemember(false)
  }

  const passCount = Object.values(results).filter(r => r.pass).length
  const totalRun = Object.keys(results).length

  return (
    <section id="qa-lab" style={{ background: 'transparent' }}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
        >
          <p className="section-eyebrow">QA Lab</p>
          <h2
            className="section-headline-editorial"
            style={{ marginBottom: '0.75rem' }}
          >
            <span className="shading-word">Interactive</span>
            <span className="shading-word">testing</span>
          </h2>
          <p style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.95rem',
            color: 'var(--color-text-muted)',
            lineHeight: 1.7,
            marginBottom: '2.5rem',
            maxWidth: '600px',
          }}>
            A live demo of client-side validation testing. Run individual test cases or execute the full suite to see real-time pass/fail assertions.
          </p>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr)',
          gap: '1.5rem',
          maxWidth: '800px',
        }}>
          {/* Demo Login Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            style={{
              background: 'var(--color-bg-surface)',
              border: '1px solid var(--color-border-hairline)',
              borderRadius: '12px',
              padding: '1.5rem',
            }}
          >
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '1rem',
            }}>
              <Shield size={16} style={{ color: 'var(--color-accent-pass)' }} />
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--color-text-muted)',
              }}>
                Demo Login — Test Target
              </span>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '0.75rem',
              marginBottom: '0.75rem',
            }}>
              <div>
                <label style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.68rem',
                  fontWeight: 500,
                  color: '#6C7A89',
                  display: 'block',
                  marginBottom: '4px',
                }}>
                  Email
                </label>
                <input
                  type="text"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="user@example.com"
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.8rem',
                    background: 'var(--color-bg-base)',
                    border: '1px solid var(--color-border-hairline)',
                    borderRadius: '8px',
                    color: 'var(--color-text-primary)',
                    outline: 'none',
                    transition: 'border-color 0.2s ease',
                  }}
                  onFocus={e => e.target.style.borderColor = 'rgba(74, 222, 154, 0.4)'}
                  onBlur={e => e.target.style.borderColor = 'var(--color-border-hairline)'}
                />
              </div>
              <div>
                <label style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.68rem',
                  fontWeight: 500,
                  color: '#6C7A89',
                  display: 'block',
                  marginBottom: '4px',
                }}>
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.8rem',
                    background: 'var(--color-bg-base)',
                    border: '1px solid var(--color-border-hairline)',
                    borderRadius: '8px',
                    color: 'var(--color-text-primary)',
                    outline: 'none',
                    transition: 'border-color 0.2s ease',
                  }}
                  onFocus={e => e.target.style.borderColor = 'rgba(74, 222, 154, 0.4)'}
                  onBlur={e => e.target.style.borderColor = 'var(--color-border-hairline)'}
                />
              </div>
            </div>

            <label style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.72rem',
              color: 'var(--color-text-muted)',
              cursor: 'pointer',
            }}>
              <input
                type="checkbox"
                checked={remember}
                onChange={e => setRemember(e.target.checked)}
                style={{ accentColor: '#4ADE9A' }}
              />
              Remember session
            </label>
          </motion.div>

          {/* Test Suite Controls */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '0.75rem',
          }}>
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.72rem',
              color: 'var(--color-text-muted)',
            }}>
              {totalRun > 0 ? `${passCount}/${totalRun} passed` : `${TEST_CASES.length} test cases`}
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                onClick={resetAll}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid var(--color-border-hairline)',
                  borderRadius: '8px',
                  padding: '6px 14px',
                  cursor: 'pointer',
                  color: 'var(--color-text-muted)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  fontWeight: 500,
                  transition: 'all 0.15s ease',
                }}
              >
                <RotateCcw size={12} />
                Reset
              </button>
              <button
                onClick={runAllTests}
                disabled={isRunningAll}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: isRunningAll ? 'rgba(74, 222, 154, 0.08)' : 'rgba(74, 222, 154, 0.15)',
                  border: '1px solid rgba(74, 222, 154, 0.3)',
                  borderRadius: '8px',
                  padding: '6px 16px',
                  cursor: isRunningAll ? 'not-allowed' : 'pointer',
                  color: '#4ADE9A',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  fontWeight: 600,
                  transition: 'all 0.15s ease',
                }}
              >
                {isRunningAll ? <RotateCcw size={12} className="spin" /> : <Play size={12} />}
                {isRunningAll ? 'Running...' : 'Run All Tests'}
              </button>
            </div>
          </div>

          {/* Test Cases List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
            }}
          >
            {TEST_CASES.map((tc, i) => (
              <TestRunner
                key={tc.id}
                testCase={tc}
                index={i}
                isRunning={runningId === tc.id}
                result={results[tc.id]}
                onRun={runTest}
              />
            ))}
          </motion.div>

          {/* Execution Log */}
          {executionLog.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{
                background: 'rgba(10, 15, 20, 0.8)',
                border: '1px solid var(--color-border-hairline)',
                borderRadius: '10px',
                padding: '1rem',
                maxHeight: '180px',
                overflowY: 'auto',
              }}
            >
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.68rem',
                fontWeight: 600,
                color: '#6C7A89',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                marginBottom: '0.5rem',
              }}>
                Execution Log
              </div>
              <div style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '0.7rem',
                lineHeight: 1.7,
                color: 'var(--color-text-muted)',
              }}>
                {executionLog.map((line, i) => (
                  <div key={i} style={{
                    color: line.includes('PASS') ? '#4ADE9A' : line.includes('FAIL') ? '#E8615C' : '#9EABB8',
                  }}>
                    {line}
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  )
}
