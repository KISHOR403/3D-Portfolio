import { useState, useEffect, useRef } from 'react'
import {
  Terminal as TerminalIcon,
  Play,
  CheckCircle2,
  Activity,
  Code2,
  Copy,
  Check,
  RotateCcw,
  ShieldCheck,
  Cpu,
  Zap,
  Sparkles,
  Maximize2,
  Minimize2
} from 'lucide-react'

const INITIAL_LOGS = [
  { type: 'command', text: '$ npm run test:prod' },
  { type: 'info', text: '> Running automated test suite v4.2...' },
  { type: 'success', text: '✓ 95.4% functional coverage achieved' },
  { type: 'success', text: '✓ CI/CD: GitHub Actions Pipeline #309 PASSED' },
  { type: 'success', text: '✓ 8/8 quality gates verified' },
  { type: 'accent', text: '⚡ 0 failed tests. Deployment ready.' }
]

const TEST_SUITES = [
  { id: 1, name: 'auth.spec.js', duration: '14ms', passes: 12, status: 'passed' },
  { id: 2, name: 'pipeline.test.ts', duration: '28ms', passes: 8, status: 'passed' },
  { id: 3, name: 'fullstack-api.test.js', duration: '35ms', passes: 19, status: 'passed' },
  { id: 4, name: 'ui-render.spec.jsx', duration: '19ms', passes: 15, status: 'passed' },
]

export default function ConsoleFallback() {
  const [activeTab, setActiveTab] = useState('terminal') // 'terminal' | 'tests' | 'metrics' | 'code'
  const [logs, setLogs] = useState(INITIAL_LOGS)
  const [inputValue, setInputValue] = useState('')
  const [isRunningTests, setIsRunningTests] = useState(false)
  const [testProgress, setTestProgress] = useState(100)
  const [copiedCode, setCopiedCode] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  
  // Parallax tilt effect
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const containerRef = useRef(null)
  const tabContentRef = useRef(null)

  // Auto-scroll terminal log internally without jumping the outer browser page
  useEffect(() => {
    if (activeTab === 'terminal' && tabContentRef.current) {
      tabContentRef.current.scrollTop = tabContentRef.current.scrollHeight
    }
  }, [logs, activeTab])

  const handleMouseMove = (e) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    setTilt({
      x: -(y / rect.height) * 8,
      y: (x / rect.width) * 8,
    })
  }

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 })
  }

  const executeCommand = (cmdStr) => {
    const cmd = cmdStr.trim().toLowerCase()
    if (!cmd) return

    const newLogs = [...logs, { type: 'command', text: `$ ${cmdStr}` }]

    if (cmd === 'clear') {
      setLogs([])
      setInputValue('')
      return
    }

    if (cmd === 'help') {
      newLogs.push(
        { type: 'info', text: 'Available interactive commands:' },
        { type: 'text', text: '  test      - Execute production test suite' },
        { type: 'text', text: '  skills    - Display technical skills breakdown' },
        { type: 'text', text: '  projects  - View active pipeline projects' },
        { type: 'text', text: '  hire      - Run candidate validation check' },
        { type: 'text', text: '  clear     - Clear output buffer' }
      )
    } else if (cmd === 'test' || cmd === 'npm test' || cmd === 'npm run test:prod') {
      runTestSuiteSimulation(newLogs)
      setInputValue('')
      return
    } else if (cmd === 'skills' || cmd === 'cat skills') {
      newLogs.push(
        { type: 'accent', text: '=== TECHNICAL SKILLS STACK ===' },
        { type: 'info', text: 'Frontend : React.js, Next.js, HTML5, CSS3, Tailwind CSS, JavaScript (ES6+)' },
        { type: 'info', text: 'Backend  : Node.js, Express.js, REST APIs, MongoDB, PostgreSQL' },
        { type: 'info', text: 'QA & Test: Playwright, Cypress, CI/CD Workflows, Automation Testing' },
        { type: 'info', text: 'Tools    : Git, GitHub, Docker, Postman, Vercel' }
      )
    } else if (cmd === 'projects') {
      newLogs.push(
        { type: 'accent', text: '=== RECENT PIPELINE PROJECTS ===' },
        { type: 'success', text: '✓ 3D Portfolio      [Vite + React + Three.js]' },
        { type: 'success', text: '✓ EduVerse Admin    [Next.js + Tailwind + Fullstack]' },
        { type: 'success', text: '✓ Repowiki AI       [FastAPI + Next.js + Redis]' },
        { type: 'success', text: '✓ Asom Bazaar       [E-Commerce Modern UI]' }
      )
    } else if (cmd.includes('hire') || cmd.includes('sudo hire')) {
      newLogs.push(
        { type: 'accent', text: '🚀 [AUTH OVERRIDE] ACCESS GRANTED!' },
        { type: 'success', text: 'Candidate: Kishor Gogoi' },
        { type: 'success', text: 'Role     : Full Stack Developer / Content Creator / QA Automation' },
        { type: 'success', text: 'Status   : Open to full-time & high-impact engineering roles' },
        { type: 'info', text: 'Action   : Click "Download Resume" to start interview process.' }
      )
    } else {
      newLogs.push({
        type: 'error',
        text: `Command not found: "${cmdStr}". Type "help" for a list of valid commands.`
      })
    }

    setLogs(newLogs)
    setInputValue('')
  }

  const runTestSuiteSimulation = (existingLogs = logs) => {
    setIsRunningTests(true)
    setTestProgress(0)
    
    const baseLogs = [...existingLogs, { type: 'info', text: '> Initializing test runner...' }]
    setLogs(baseLogs)

    let progress = 0
    const interval = setInterval(() => {
      progress += 25
      setTestProgress(progress)

      if (progress === 25) {
        setLogs(prev => [...prev, { type: 'success', text: '  ✓ auth.spec.js (14ms)' }])
      } else if (progress === 50) {
        setLogs(prev => [...prev, { type: 'success', text: '  ✓ pipeline.test.ts (28ms)' }])
      } else if (progress === 75) {
        setLogs(prev => [...prev, { type: 'success', text: '  ✓ fullstack-api.test.js (35ms)' }])
      } else if (progress === 100) {
        clearInterval(interval)
        setIsRunningTests(false)
        setLogs(prev => [
          ...prev,
          { type: 'success', text: '  ✓ ui-render.spec.jsx (19ms)' },
          { type: 'accent', text: '🎉 4/4 Test Suites Passed (100% SUCCESS)' }
        ])
      }
    }, 350)
  }

  const copyConfigCode = () => {
    const code = `// dev.config.json\n{\n  "developer": "Kishor Gogoi",\n  "title": "Full Stack Developer & QA Engineer",\n  "status": "Available for Hire",\n  "skills": ["React", "Node.js", "Next.js", "Automation", "CI/CD"],\n  "location": "Bengaluru, India"\n}`
    navigator.clipboard.writeText(code)
    setCopiedCode(true)
    setTimeout(() => setCopiedCode(false), 2000)
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        width: '100%',
        maxWidth: isExpanded ? '640px' : '540px',
        margin: '0 auto',
        perspective: '1200px',
        transition: 'max-width 0.3s ease',
      }}
    >
      {/* Glow aura backdrop */}
      <div style={{
        position: 'relative',
        transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transformStyle: 'preserve-3d',
        transition: 'transform 0.15s ease-out',
      }}>
        <div style={{
          position: 'absolute',
          inset: '-2px',
          background: 'linear-gradient(135deg, rgba(74, 222, 154, 0.4), rgba(56, 189, 248, 0.2), rgba(192, 132, 252, 0.3))',
          borderRadius: '16px',
          filter: 'blur(16px)',
          opacity: 0.4,
          pointerEvents: 'none',
        }} />

        {/* Main IDE Window Shell */}
        <div style={{
          position: 'relative',
          background: 'rgba(15, 20, 25, 0.92)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '14px',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6), 0 0 30px rgba(74, 222, 154, 0.08)',
          overflow: 'hidden',
        }}>

          {/* Window Header Bar */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '10px 14px',
            background: 'rgba(22, 29, 36, 0.8)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
            userSelect: 'none',
          }}>
            {/* Traffic lights */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
              <button
                onClick={() => setLogs(INITIAL_LOGS)}
                title="Reset Console"
                style={{
                  width: '11px',
                  height: '11px',
                  borderRadius: '50%',
                  background: '#FF5F56',
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 0 6px rgba(255, 95, 86, 0.5)'
                }}
              />
              <button
                onClick={() => setLogs([])}
                title="Clear Output"
                style={{
                  width: '11px',
                  height: '11px',
                  borderRadius: '50%',
                  background: '#FFBD2E',
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 0 6px rgba(255, 189, 46, 0.5)'
                }}
              />
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                title="Toggle Expand"
                style={{
                  width: '11px',
                  height: '11px',
                  borderRadius: '50%',
                  background: '#27C93F',
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 0 6px rgba(39, 201, 63, 0.5)'
                }}
              />
            </div>

            {/* Interactive Tabs */}
            <div style={{
              display: 'flex',
              gap: '4px',
              background: 'rgba(10, 15, 20, 0.6)',
              padding: '3px',
              borderRadius: '8px',
              border: '1px solid rgba(255, 255, 255, 0.05)',
            }}>
              <button
                onClick={() => setActiveTab('terminal')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  padding: '4px 10px',
                  borderRadius: '6px',
                  fontSize: '11px',
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 500,
                  border: 'none',
                  cursor: 'pointer',
                  background: activeTab === 'terminal' ? 'rgba(74, 222, 154, 0.15)' : 'transparent',
                  color: activeTab === 'terminal' ? '#4ADE9A' : '#9EABB8',
                  transition: 'all 0.2s ease',
                }}
              >
                <TerminalIcon size={12} />
                Terminal
              </button>

              <button
                onClick={() => setActiveTab('tests')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  padding: '4px 10px',
                  borderRadius: '6px',
                  fontSize: '11px',
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 500,
                  border: 'none',
                  cursor: 'pointer',
                  background: activeTab === 'tests' ? 'rgba(56, 189, 248, 0.15)' : 'transparent',
                  color: activeTab === 'tests' ? '#38BDF8' : '#9EABB8',
                  transition: 'all 0.2s ease',
                }}
              >
                <Play size={12} />
                Tests
              </button>

              <button
                onClick={() => setActiveTab('metrics')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  padding: '4px 10px',
                  borderRadius: '6px',
                  fontSize: '11px',
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 500,
                  border: 'none',
                  cursor: 'pointer',
                  background: activeTab === 'metrics' ? 'rgba(192, 132, 252, 0.15)' : 'transparent',
                  color: activeTab === 'metrics' ? '#C084FC' : '#9EABB8',
                  transition: 'all 0.2s ease',
                }}
              >
                <Activity size={12} />
                Metrics
              </button>

              <button
                onClick={() => setActiveTab('code')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  padding: '4px 10px',
                  borderRadius: '6px',
                  fontSize: '11px',
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 500,
                  border: 'none',
                  cursor: 'pointer',
                  background: activeTab === 'code' ? 'rgba(242, 169, 59, 0.15)' : 'transparent',
                  color: activeTab === 'code' ? '#F2A93B' : '#9EABB8',
                  transition: 'all 0.2s ease',
                }}
              >
                <Code2 size={12} />
                Config
              </button>
            </div>

            {/* Live Indicator */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span className="pulse-dot" style={{ background: '#4ADE9A' }} />
              <span style={{
                fontSize: '10px',
                fontFamily: 'var(--font-mono)',
                color: '#4ADE9A',
                letterSpacing: '0.05em',
                fontWeight: 600
              }}>
                LIVE
              </span>
            </div>
          </div>

          {/* TAB CONTENT AREA */}
          <div
            ref={tabContentRef}
            style={{
              padding: '16px',
              minHeight: '300px',
              maxHeight: '340px',
              overflowY: 'auto',
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '12px',
              lineHeight: '1.7',
            }}
          >

            {/* TAB 1: TERMINAL INTERACTIVE */}
            {activeTab === 'terminal' && (
              <div>
                {/* Shortcut Command Chips */}
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '6px',
                  marginBottom: '12px',
                  paddingBottom: '10px',
                  borderBottom: '1px dashed rgba(255, 255, 255, 0.08)',
                }}>
                  <span style={{ fontSize: '10px', color: '#6C7A89', alignSelf: 'center', marginRight: '4px' }}>
                    Quick Commands:
                  </span>
                  {[
                    { label: 'npm test', cmd: 'test' },
                    { label: 'cat skills', cmd: 'skills' },
                    { label: 'projects', cmd: 'projects' },
                    { label: 'sudo hire', cmd: 'hire' },
                    { label: 'clear', cmd: 'clear' },
                  ].map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => executeCommand(item.cmd)}
                      style={{
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '4px',
                        color: '#4ADE9A',
                        padding: '2px 8px',
                        fontSize: '10px',
                        cursor: 'pointer',
                        fontFamily: 'var(--font-mono)',
                        transition: 'all 0.15s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(74, 222, 154, 0.2)'
                        e.currentTarget.style.borderColor = '#4ADE9A'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'
                        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'
                      }}
                    >
                      $ {item.label}
                    </button>
                  ))}
                </div>

                {/* Output Logs */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  {logs.map((log, idx) => (
                    <div
                      key={idx}
                      style={{
                        color: log.type === 'command' ? '#F2A93B' :
                               log.type === 'success' ? '#4ADE9A' :
                               log.type === 'accent' ? '#38BDF8' :
                               log.type === 'error' ? '#E8615C' :
                               log.type === 'info' ? '#9EABB8' :
                               '#E8EAED',
                        fontWeight: log.type === 'command' ? 600 : 400,
                      }}
                    >
                      {log.text}
                    </div>
                  ))}
                </div>

                {/* Interactive CLI Input Line */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    executeCommand(inputValue)
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginTop: '12px',
                    paddingTop: '8px',
                    borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                  }}
                >
                  <span style={{ color: '#4ADE9A', fontWeight: 'bold' }}>$</span>
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="type 'test', 'skills', 'projects', 'hire', or 'help'..."
                    style={{
                      flex: 1,
                      background: 'transparent',
                      border: 'none',
                      outline: 'none',
                      color: '#E8EAED',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '12px',
                    }}
                  />
                  <span className="terminal-cursor" />
                </form>
              </div>
            )}

            {/* TAB 2: INTERACTIVE TEST RUNNER */}
            {activeTab === 'tests' && (
              <div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '14px',
                }}>
                  <div>
                    <h4 style={{ fontSize: '13px', color: '#E8EAED', marginBottom: '2px' }}>
                      Jest / Playwright Suite
                    </h4>
                    <p style={{ fontSize: '11px', color: '#9EABB8' }}>
                      Automated end-to-end and unit test execution
                    </p>
                  </div>
                  <button
                    onClick={() => runTestSuiteSimulation()}
                    disabled={isRunningTests}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      background: isRunningTests ? 'rgba(255, 255, 255, 0.1)' : 'rgba(74, 222, 154, 0.15)',
                      border: '1px solid rgba(74, 222, 154, 0.3)',
                      color: '#4ADE9A',
                      padding: '6px 12px',
                      borderRadius: '6px',
                      fontSize: '11px',
                      fontFamily: 'var(--font-mono)',
                      fontWeight: 600,
                      cursor: isRunningTests ? 'not-allowed' : 'pointer',
                    }}
                  >
                    {isRunningTests ? <RotateCcw size={12} className="spin" /> : <Play size={12} />}
                    {isRunningTests ? 'Running...' : 'Run Test Suite'}
                  </button>
                </div>

                {/* Progress bar */}
                {isRunningTests && (
                  <div style={{
                    width: '100%',
                    height: '4px',
                    background: 'rgba(255, 255, 255, 0.08)',
                    borderRadius: '2px',
                    marginBottom: '14px',
                    overflow: 'hidden',
                  }}>
                    <div style={{
                      width: `${testProgress}%`,
                      height: '100%',
                      background: 'linear-gradient(90deg, #4ADE9A, #38BDF8)',
                      transition: 'width 0.3s ease',
                    }} />
                  </div>
                )}

                {/* Test Suites List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {TEST_SUITES.map((suite) => (
                    <div
                      key={suite.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '10px 12px',
                        background: 'rgba(22, 29, 36, 0.6)',
                        border: '1px solid rgba(255, 255, 255, 0.05)',
                        borderRadius: '8px',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <CheckCircle2 size={14} color="#4ADE9A" />
                        <span style={{ color: '#E8EAED', fontWeight: 500 }}>{suite.name}</span>
                        <span style={{ fontSize: '10px', color: '#9EABB8' }}>
                          ({suite.passes} checks)
                        </span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ fontSize: '10px', color: '#6C7A89' }}>{suite.duration}</span>
                        <span style={{
                          fontSize: '10px',
                          color: '#4ADE9A',
                          background: 'rgba(74, 222, 154, 0.1)',
                          padding: '2px 6px',
                          borderRadius: '4px',
                          border: '1px solid rgba(74, 222, 154, 0.2)',
                        }}>
                          PASSED
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 3: QUALITY METRICS */}
            {activeTab === 'metrics' && (
              <div>
                <div style={{ marginBottom: '14px' }}>
                  <h4 style={{ fontSize: '13px', color: '#E8EAED', marginBottom: '2px' }}>
                    CI/CD Pipeline Quality Gates
                  </h4>
                  <p style={{ fontSize: '11px', color: '#9EABB8' }}>
                    Real-time performance and code health verification
                  </p>
                </div>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '10px',
                }}>
                  <div style={{
                    background: 'rgba(22, 29, 36, 0.6)',
                    border: '1px solid rgba(74, 222, 154, 0.2)',
                    borderRadius: '10px',
                    padding: '12px',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#4ADE9A', fontSize: '11px', marginBottom: '4px' }}>
                      <ShieldCheck size={14} />
                      Code Coverage
                    </div>
                    <div style={{ fontSize: '22px', fontWeight: 700, color: '#E8EAED' }}>
                      95.4%
                    </div>
                    <div style={{ fontSize: '10px', color: '#4ADE9A', marginTop: '2px' }}>
                      ↑ +2.1% above target threshold
                    </div>
                  </div>

                  <div style={{
                    background: 'rgba(22, 29, 36, 0.6)',
                    border: '1px solid rgba(56, 189, 248, 0.2)',
                    borderRadius: '10px',
                    padding: '12px',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#38BDF8', fontSize: '11px', marginBottom: '4px' }}>
                      <Zap size={14} />
                      Quality Gates
                    </div>
                    <div style={{ fontSize: '22px', fontWeight: 700, color: '#E8EAED' }}>
                      8 / 8
                    </div>
                    <div style={{ fontSize: '10px', color: '#38BDF8', marginTop: '2px' }}>
                      100% Policy Compliant
                    </div>
                  </div>

                  <div style={{
                    background: 'rgba(22, 29, 36, 0.6)',
                    border: '1px solid rgba(192, 132, 252, 0.2)',
                    borderRadius: '10px',
                    padding: '12px',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#C084FC', fontSize: '11px', marginBottom: '4px' }}>
                      <Cpu size={14} />
                      Build Speed
                    </div>
                    <div style={{ fontSize: '22px', fontWeight: 700, color: '#E8EAED' }}>
                      1.18s
                    </div>
                    <div style={{ fontSize: '10px', color: '#C084FC', marginTop: '2px' }}>
                      Vite Instant HMR Enabled
                    </div>
                  </div>

                  <div style={{
                    background: 'rgba(22, 29, 36, 0.6)',
                    border: '1px solid rgba(242, 169, 59, 0.2)',
                    borderRadius: '10px',
                    padding: '12px',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#F2A93B', fontSize: '11px', marginBottom: '4px' }}>
                      <Sparkles size={14} />
                      Vulnerabilities
                    </div>
                    <div style={{ fontSize: '22px', fontWeight: 700, color: '#E8EAED' }}>
                      0
                    </div>
                    <div style={{ fontSize: '10px', color: '#4ADE9A', marginTop: '2px' }}>
                      Audit Passed Clean
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: CONFIG CODE VIEW */}
            {activeTab === 'code' && (
              <div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '10px',
                }}>
                  <span style={{ fontSize: '11px', color: '#9EABB8' }}>dev.profile.json</span>
                  <button
                    onClick={copyConfigCode}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      background: 'rgba(255, 255, 255, 0.06)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      color: copiedCode ? '#4ADE9A' : '#9EABB8',
                      padding: '3px 8px',
                      borderRadius: '4px',
                      fontSize: '10px',
                      cursor: 'pointer',
                    }}
                  >
                    {copiedCode ? <Check size={10} /> : <Copy size={10} />}
                    {copiedCode ? 'Copied!' : 'Copy'}
                  </button>
                </div>

                <pre style={{
                  color: '#E8EAED',
                  background: 'rgba(10, 15, 20, 0.6)',
                  padding: '12px',
                  borderRadius: '8px',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  fontSize: '11px',
                  overflowX: 'auto',
                }}>
                  <code>
{`{
  `}<span style={{ color: '#F2A93B' }}>"developer"</span>{`: `}<span style={{ color: '#4ADE9A' }}>"Kishor Gogoi"</span>{`,
  `}<span style={{ color: '#F2A93B' }}>"roles"</span>{`: [
    `}<span style={{ color: '#38BDF8' }}>"Full Stack Developer"</span>{`,
    `}<span style={{ color: '#38BDF8' }}>"Content Creator"</span>{`,
    `}<span style={{ color: '#38BDF8' }}>"QA Automation Specialist"</span>{`
  ],
  `}<span style={{ color: '#F2A93B' }}>"location"</span>{`: `}<span style={{ color: '#4ADE9A' }}>"Bengaluru, India"</span>{`,
  `}<span style={{ color: '#F2A93B' }}>"openToHire"</span>{`: `}<span style={{ color: '#C084FC' }}>true</span>{`
}`}
                  </code>
                </pre>
              </div>
            )}

          </div>

          {/* Footer Bar */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '8px 14px',
            background: 'rgba(10, 15, 20, 0.8)',
            borderTop: '1px solid rgba(255, 255, 255, 0.05)',
            fontSize: '10px',
            color: '#6C7A89',
            fontFamily: 'var(--font-mono)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ color: '#4ADE9A' }}>●</span>
              <span>v4.2.0-release</span>
            </div>
            <div>Interactive 2D Dev Studio</div>
          </div>

        </div>
      </div>
    </div>
  )
}
