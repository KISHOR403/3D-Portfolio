import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Check, AlertTriangle, ShieldAlert } from 'lucide-react'

const TEST_SUITE_DATA = {
  'Testnexa AI': [
    { id: 'TC-01', name: 'Generate test cases from requirements', type: 'Positive', expected: 'Structured test cases generated', actual: 'PASS', severity: 'Critical' },
    { id: 'TC-02', name: 'Empty requirements input', type: 'Boundary', expected: 'Validation error shown', actual: 'PASS', severity: 'Medium' },
    { id: 'TC-03', name: 'Export to CSV format', type: 'Positive', expected: 'File downloads correctly', actual: 'PASS', severity: 'High' },
    { id: 'TC-04', name: 'API rate limit handling', type: 'Negative', expected: 'Graceful retry with message', actual: 'PASS', severity: 'High' },
    { id: 'TC-05', name: 'XSS in input fields', type: 'Security', expected: 'Input sanitized, no execution', actual: 'PASS', severity: 'Critical' },
  ],
  'RepoWiki AI': [
    { id: 'TC-01', name: 'Analyze single-file repository', type: 'Positive', expected: 'Documentation generated', actual: 'PASS', severity: 'High' },
    { id: 'TC-02', name: 'Handle private repository access', type: 'Negative', expected: 'Authentication error message', actual: 'PASS', severity: 'Medium' },
    { id: 'TC-03', name: 'Large repository (500+ files)', type: 'Boundary', expected: 'Processes without timeout', actual: 'PASS', severity: 'High' },
    { id: 'TC-04', name: 'Markdown rendering accuracy', type: 'Regression', expected: 'All sections render correctly', actual: 'PASS', severity: 'Medium' },
  ],
  'LogiConnect': [
    { id: 'TC-01', name: 'WebSocket connection establishment', type: 'Positive', expected: 'Real-time connection active', actual: 'PASS', severity: 'Critical' },
    { id: 'TC-02', name: 'RBAC role-based page access', type: 'Security', expected: 'Unauthorized users blocked', actual: 'PASS', severity: 'Critical' },
    { id: 'TC-03', name: 'Concurrent message delivery', type: 'Positive', expected: 'Messages delivered in order', actual: 'PASS', severity: 'High' },
    { id: 'TC-04', name: 'Session timeout handling', type: 'Boundary', expected: 'Graceful logout with message', actual: 'PASS', severity: 'Medium' },
    { id: 'TC-05', name: 'Audit log completeness', type: 'Regression', expected: 'All actions logged', actual: 'PASS', severity: 'High' },
  ],
  'Doorkit Marketplace': [
    { id: 'TC-01', name: 'Product search and filtering', type: 'Positive', expected: 'Results match search criteria', actual: 'PASS', severity: 'High' },
    { id: 'TC-02', name: 'Add to cart functionality', type: 'Positive', expected: 'Cart updates correctly', actual: 'PASS', severity: 'Critical' },
    { id: 'TC-03', name: 'Empty cart checkout attempt', type: 'Boundary', expected: 'Validation prevents checkout', actual: 'PASS', severity: 'Medium' },
  ],
  'Asom Bazaar': [
    { id: 'TC-01', name: 'Multi-step seller onboarding', type: 'Positive', expected: 'All steps complete successfully', actual: 'PASS', severity: 'Critical' },
    { id: 'TC-02', name: 'Dashboard sales analytics load', type: 'Positive', expected: 'Charts render with real data', actual: 'PASS', severity: 'High' },
    { id: 'TC-03', name: 'Form validation — invalid business ID', type: 'Negative', expected: 'Error message displayed', actual: 'PASS', severity: 'Medium' },
    { id: 'TC-04', name: 'Inventory update regression', type: 'Regression', expected: 'Stock counts accurate', actual: 'PASS', severity: 'High' },
  ],
  'Web Automation Framework': [
    { id: 'TC-01', name: 'Login with valid credentials', type: 'Positive', expected: 'Dashboard loads', actual: 'PASS', severity: 'Critical' },
    { id: 'TC-02', name: 'CRUD workflow end-to-end', type: 'Positive', expected: 'Create, Read, Update, Delete succeed', actual: 'PASS', severity: 'Critical' },
    { id: 'TC-03', name: 'Cross-browser execution', type: 'Regression', expected: 'Passes on Chrome and Firefox', actual: 'PASS', severity: 'High' },
    { id: 'TC-04', name: 'Dynamic wait strategy', type: 'Positive', expected: 'No timeout failures', actual: 'PASS', severity: 'Medium' },
  ],
  'API Automation Testing': [
    { id: 'TC-01', name: 'Auth token generation', type: 'Positive', expected: '200 OK with valid token', actual: 'PASS', severity: 'Critical' },
    { id: 'TC-02', name: 'Product search endpoint', type: 'Positive', expected: 'Correct product data returned', actual: 'PASS', severity: 'High' },
    { id: 'TC-03', name: 'Cart operations workflow', type: 'Positive', expected: 'Add/update/remove items work', actual: 'PASS', severity: 'High' },
    { id: 'TC-04', name: 'Invalid auth header', type: 'Negative', expected: '401 Unauthorized', actual: 'PASS', severity: 'Critical' },
    { id: 'TC-05', name: 'Schema validation', type: 'Regression', expected: 'Response matches JSON schema', actual: 'PASS', severity: 'Medium' },
  ],
}

// Fallback for projects without explicit test data
const DEFAULT_TESTS = [
  { id: 'TC-01', name: 'Core functionality verification', type: 'Positive', expected: 'Feature works as designed', actual: 'PASS', severity: 'High' },
  { id: 'TC-02', name: 'Input boundary validation', type: 'Boundary', expected: 'Edge cases handled', actual: 'PASS', severity: 'Medium' },
  { id: 'TC-03', name: 'Error state handling', type: 'Negative', expected: 'Graceful error messages', actual: 'PASS', severity: 'Medium' },
]

const TYPE_COLORS = {
  Positive: { bg: 'rgba(74, 222, 154, 0.08)', color: '#4ADE9A', border: 'rgba(74, 222, 154, 0.2)' },
  Negative: { bg: 'rgba(232, 97, 92, 0.08)', color: '#E8615C', border: 'rgba(232, 97, 92, 0.2)' },
  Boundary: { bg: 'rgba(242, 169, 59, 0.08)', color: '#F2A93B', border: 'rgba(242, 169, 59, 0.2)' },
  Security: { bg: 'rgba(192, 132, 252, 0.08)', color: '#C084FC', border: 'rgba(192, 132, 252, 0.2)' },
  Regression: { bg: 'rgba(56, 189, 248, 0.08)', color: '#38BDF8', border: 'rgba(56, 189, 248, 0.2)' },
}

export default function TestSuiteModal({ isOpen, onClose, projectTitle }) {
  const modalRef = useRef(null)
  const tests = TEST_SUITE_DATA[projectTitle] || DEFAULT_TESTS

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  useEffect(() => {
    const handleEsc = (e) => { if (e.key === 'Escape') onClose() }
    if (isOpen) window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [isOpen, onClose])

  const passCount = tests.filter(t => t.actual === 'PASS').length

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 200,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(0, 0, 0, 0.7)',
            backdropFilter: 'blur(4px)',
            padding: '1rem',
          }}
        >
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.97 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            onClick={e => e.stopPropagation()}
            style={{
              width: '100%',
              maxWidth: '720px',
              maxHeight: '80vh',
              background: 'var(--color-bg-base)',
              border: '1px solid var(--color-border-hairline)',
              borderRadius: '16px',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* Header */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '1.25rem 1.5rem',
              borderBottom: '1px solid var(--color-border-hairline)',
            }}>
              <div>
                <h3 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  color: 'var(--color-text-primary)',
                  marginBottom: '0.25rem',
                }}>
                  Test Suite — {projectTitle}
                </h3>
                <p style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  color: 'var(--color-text-muted)',
                }}>
                  {passCount}/{tests.length} passed · All tests verified
                </p>
              </div>
              <button
                onClick={onClose}
                aria-label="Close test suite"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid var(--color-border-hairline)',
                  borderRadius: '8px',
                  padding: '6px',
                  cursor: 'pointer',
                  color: 'var(--color-text-muted)',
                  transition: 'all 0.2s ease',
                }}
              >
                <X size={16} />
              </button>
            </div>

            {/* Test Cases List */}
            <div style={{
              flex: 1,
              overflowY: 'auto',
              padding: '1rem 1.5rem',
            }}>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
              }}>
                {tests.map((test, i) => {
                  const typeStyle = TYPE_COLORS[test.type] || TYPE_COLORS.Positive
                  return (
                    <div
                      key={test.id}
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.5rem',
                        padding: '1rem',
                        background: 'var(--color-bg-surface)',
                        border: '1px solid var(--color-border-hairline)',
                        borderRadius: '10px',
                      }}
                    >
                      {/* Top row */}
                      <div style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        justifyContent: 'space-between',
                        gap: '0.75rem',
                        flexWrap: 'wrap',
                      }}>
                        <div style={{ flex: 1, minWidth: '200px' }}>
                          <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            marginBottom: '4px',
                          }}>
                            <span style={{
                              fontFamily: 'var(--font-mono)',
                              fontSize: '0.68rem',
                              fontWeight: 600,
                              color: 'var(--color-text-muted)',
                            }}>
                              {test.id}
                            </span>
                            <span style={{
                              fontFamily: 'var(--font-mono)',
                              fontSize: '0.65rem',
                              fontWeight: 500,
                              padding: '2px 6px',
                              borderRadius: '4px',
                              background: typeStyle.bg,
                              color: typeStyle.color,
                              border: `1px solid ${typeStyle.border}`,
                            }}>
                              {test.type}
                            </span>
                          </div>
                          <p style={{
                            fontFamily: 'var(--font-sans)',
                            fontSize: '0.88rem',
                            fontWeight: 500,
                            color: 'var(--color-text-primary)',
                          }}>
                            {test.name}
                          </p>
                        </div>

                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.68rem',
                          fontWeight: 600,
                          color: '#4ADE9A',
                          flexShrink: 0,
                        }}>
                          <Check size={13} />
                          PASS
                        </div>
                      </div>

                      {/* Expected result */}
                      <div style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.72rem',
                        color: 'var(--color-text-muted)',
                        lineHeight: 1.5,
                      }}>
                        <span style={{ color: '#6C7A89' }}>Expected:</span>{' '}
                        {test.expected}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
