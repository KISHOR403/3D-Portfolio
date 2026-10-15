import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Mail, ArrowUpRight, Send, Check, Copy, CheckCheck,
  Clock, MapPin, Feather, Sparkles, ChevronUp, RotateCcw
} from 'lucide-react'
import Contact3DCanvas from './Contact3DCanvas'

/* ─── Inline Brand SVG Icons ─── */
function LinkedinIcon({ size = 18, style }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

function GithubIcon({ size = 18, style }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  )
}

function XIcon({ size = 17, style }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" style={style}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  )
}

/* ─── Direct Communication Channels ─── */
const CHANNELS = [
  {
    name: 'Direct Email',
    label: 'kishorgogoi403@gmail.com',
    href: 'mailto:kishorgogoi403@gmail.com',
    icon: Mail,
    color: '#D4AF37',
    isCopyable: true,
  },
  {
    name: 'LinkedIn',
    label: 'linkedin.com/in/kishorgogoi',
    href: 'https://linkedin.com/in/kishorgogoi/',
    icon: LinkedinIcon,
    color: '#38BDF8',
    isExternal: true,
  },
  {
    name: 'GitHub',
    label: 'github.com/KISHOR403',
    href: 'https://github.com/KISHOR403',
    icon: GithubIcon,
    color: '#E8EAED',
    isExternal: true,
  },
  {
    name: 'X (Twitter)',
    label: '@kishor_gogoi8',
    href: 'https://x.com/kishor_gogoi8',
    icon: XIcon,
    color: '#A78BFA',
    isExternal: true,
  },
]

/* ─── Topic Selector Stamps ─── */
const TOPIC_PRESETS = [
  { id: 'qa', label: 'QA Automation & SDET' },
  { id: 'fullstack', label: 'Full-Stack Engineering' },
  { id: 'cicd', label: 'CI/CD & Testing Strategy' },
  { id: 'chat', label: 'Coffee & Technical Chat' },
]

export default function Deploy() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    topic: 'QA Automation & SDET',
    message: '',
  })
  const [activeTopic, setActiveTopic] = useState('qa')
  const [isStamped, setIsStamped] = useState(false)
  const [flightPhase, setFlightPhase] = useState('draft') // 'draft' | 'folding' | 'flying' | 'delivered'
  const [copiedChannel, setCopiedChannel] = useState(null)

  // Real-time IST Digital Clock
  const [currentTime, setCurrentTime] = useState('')
  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const options = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      }
      setCurrentTime(new Intl.DateTimeFormat('en-US', options).format(now))
    }
    updateTime()
    const timer = setInterval(updateTime, 1000)
    return () => clearInterval(timer)
  }, [])

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text)
    setCopiedChannel(id)
    setTimeout(() => setCopiedChannel(null), 2500)
  }

  const handleSelectTopic = (preset) => {
    setActiveTopic(preset.id)
    setFormData((prev) => ({ ...prev, topic: preset.label }))
  }

  const handleStamp = () => {
    setIsStamped(true)
  }

  const handleFoldAndLaunch = (e) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.message) return

    // Auto stamp if not yet stamped
    setIsStamped(true)

    // Phase 1: Fold paper into airplane (1.2 seconds)
    setFlightPhase('folding')

    // Phase 2: Launch into flight
    setTimeout(() => {
      setFlightPhase('flying')
    }, 900)
  }

  const handleFlightComplete = () => {
    setFlightPhase('delivered')
  }

  const handleReset = () => {
    setFlightPhase('draft')
    setIsStamped(false)
    setFormData({
      name: '',
      email: '',
      topic: 'QA Automation & SDET',
      message: '',
    })
    setActiveTopic('qa')
  }

  return (
    <section
      id="deploy"
      style={{
        position: 'relative',
        background: 'transparent',
        paddingTop: '6.5rem',
        paddingBottom: '5rem',
        overflow: 'hidden',
      }}
    >
      <div
        className="section-container"
        style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: '1220px',
          margin: '0 auto',
          padding: '0 1.5rem',
        }}
      >
        {/* ─── Artisanal Header ─── */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55 }}
          style={{ marginBottom: '3.2rem' }}
        >
          {/* Eyebrow Status Badge */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 14px',
              borderRadius: '9999px',
              background: 'rgba(212, 175, 55, 0.08)',
              border: '1px solid rgba(212, 175, 55, 0.25)',
              marginBottom: '1.2rem',
            }}
          >
            <Feather size={13} color="#D4AF37" />
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.74rem',
                fontWeight: 600,
                color: '#D4AF37',
                letterSpacing: '0.04em',
              }}
            >
              Interactive 3D Stationery Dispatch · 2026
            </span>
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              flexWrap: 'wrap',
              gap: '1.5rem',
            }}
          >
            <div>
              <h2
                className="section-headline-editorial"
                style={{
                  fontSize: 'clamp(2.4rem, 4.8vw, 3.8rem)',
                  fontWeight: 800,
                  letterSpacing: '-0.025em',
                  lineHeight: 1.08,
                  margin: 0,
                  color: '#FFFFFF',
                }}
              >
                Send a letter across the{' '}
                <span
                  style={{
                    background: 'linear-gradient(135deg, #D4AF37 0%, #4ADE9A 50%, #38BDF8 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  wire.
                </span>
              </h2>
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '1rem',
                  color: 'var(--color-text-muted)',
                  marginTop: '0.9rem',
                  maxWidth: '560px',
                  lineHeight: 1.65,
                }}
              >
                Write your note on the stationery, apply the QA wax seal, and watch it fold into a 3D origami plane that flies directly to my inbox.
              </p>
            </div>

            {/* Quick Context Pill */}
            <div
              style={{
                background: 'rgba(22, 29, 36, 0.65)',
                backdropFilter: 'blur(16px)',
                border: '1px solid var(--color-border-hairline)',
                borderRadius: '12px',
                padding: '10px 16px',
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#9EABB8' }}>
                <Clock size={13} color="#38BDF8" />
                <span>IST {currentTime || '2:30 PM'}</span>
              </div>
              <div style={{ width: '1px', height: '14px', background: 'var(--color-border-hairline)' }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#9EABB8' }}>
                <MapPin size={13} color="#4ADE9A" />
                <span>Guwahati, India</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ─── Two-Column Interactive Stage ─── */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '2.5rem',
            alignItems: 'center',
          }}
        >
          {/* ══════════════════════════════════════════════
              LEFT: Interactive 3D Origami Letter Canvas & Direct Links
              ══════════════════════════════════════════════ */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.55 }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem',
            }}
          >
            {/* 3D Canvas - Completely Unboxed, Borderless & Natural */}
            <div
              style={{
                position: 'relative',
                width: '100%',
                height: '520px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Contact3DCanvas
                senderName={formData.name}
                senderEmail={formData.email}
                message={formData.message}
                topic={formData.topic}
                flightPhase={flightPhase}
                onFlightComplete={handleFlightComplete}
                isStamped={isStamped}
                onStamp={handleStamp}
              />
            </div>

            {/* Direct Connect Row */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '0.75rem',
              }}
            >
              {CHANNELS.map((ch) => {
                const Icon = ch.icon
                const isCopied = copiedChannel === ch.name

                return (
                  <div
                    key={ch.name}
                    style={{
                      background: 'rgba(22, 29, 36, 0.6)',
                      backdropFilter: 'blur(12px)',
                      border: '1px solid var(--color-border-hairline)',
                      borderRadius: '12px',
                      padding: '12px 14px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      transition: 'border-color 0.2s ease',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', overflow: 'hidden' }}>
                      <div
                        style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '8px',
                          background: `${ch.color}15`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                        }}
                      >
                        <Icon size={16} style={{ color: ch.color }} />
                      </div>
                      <div style={{ overflow: 'hidden' }}>
                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: '#9EABB8' }}>
                          {ch.name}
                        </div>
                        <div
                          style={{
                            fontFamily: 'var(--font-sans)',
                            fontSize: '0.78rem',
                            fontWeight: 500,
                            color: '#E8EAED',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                          }}
                        >
                          {ch.label}
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '4px', flexShrink: 0 }}>
                      {ch.isCopyable && (
                        <button
                          onClick={() => handleCopy(ch.label, ch.name)}
                          title="Copy Email"
                          style={{
                            background: isCopied ? 'rgba(74, 222, 154, 0.15)' : 'rgba(255, 255, 255, 0.05)',
                            border: `1px solid ${isCopied ? '#4ADE9A' : 'transparent'}`,
                            borderRadius: '6px',
                            padding: '6px',
                            color: isCopied ? '#4ADE9A' : '#9EABB8',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            transition: 'all 0.2s',
                          }}
                        >
                          {isCopied ? <CheckCheck size={13} /> : <Copy size={13} />}
                        </button>
                      )}

                      <a
                        href={ch.href}
                        target={ch.href.startsWith('mailto') ? undefined : '_blank'}
                        rel={ch.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                        title={`Open ${ch.name}`}
                        style={{
                          background: 'rgba(255, 255, 255, 0.05)',
                          borderRadius: '6px',
                          padding: '6px',
                          color: '#E8EAED',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          textDecoration: 'none',
                          transition: 'all 0.2s',
                        }}
                      >
                        <ArrowUpRight size={13} />
                      </a>
                    </div>
                  </div>
                )
              })}
            </div>
          </motion.div>

          {/* ══════════════════════════════════════════════
              RIGHT: Writer's Desk Message Form
              ══════════════════════════════════════════════ */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.55, delay: 0.1 }}
            style={{
              background: 'rgba(22, 29, 36, 0.65)',
              backdropFilter: 'blur(20px)',
              border: '1px solid var(--color-border-hairline)',
              borderRadius: '20px',
              padding: '2rem',
              boxShadow: '0 24px 48px -18px rgba(0, 0, 0, 0.5)',
            }}
          >
            <AnimatePresence mode="wait">
              {flightPhase === 'delivered' ? (
                /* ─── Delivered State ─── */
                <motion.div
                  key="delivered-state"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  style={{
                    textAlign: 'center',
                    padding: '2.5rem 1rem',
                  }}
                >
                  <div
                    style={{
                      width: '60px',
                      height: '60px',
                      borderRadius: '50%',
                      background: 'rgba(212, 175, 55, 0.12)',
                      border: '1px solid rgba(212, 175, 55, 0.4)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 1.2rem',
                      color: '#D4AF37',
                    }}
                  >
                    <Check size={30} />
                  </div>

                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.5rem',
                      fontWeight: 700,
                      color: '#E8EAED',
                      marginBottom: '0.5rem',
                    }}
                  >
                    Letter Delivered
                  </h3>
                  <p
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.92rem',
                      color: 'var(--color-text-muted)',
                      maxWidth: '380px',
                      margin: '0 auto 1.8rem',
                      lineHeight: 1.6,
                    }}
                  >
                    Your letter was dispatched across the wire to Kishor’s desk. Expect a thoughtful reply to <span style={{ color: '#38BDF8' }}>{formData.email}</span> within 24 hours.
                  </p>

                  <button
                    onClick={handleReset}
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.82rem',
                      fontWeight: 600,
                      padding: '10px 22px',
                      borderRadius: '8px',
                      background: 'rgba(255, 255, 255, 0.06)',
                      border: '1px solid var(--color-border-hairline)',
                      color: '#E8EAED',
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      transition: 'all 0.2s',
                    }}
                  >
                    <RotateCcw size={14} /> Write another letter
                  </button>
                </motion.div>
              ) : (
                /* ─── Pen Your Letter Form ─── */
                <form onSubmit={handleFoldAndLaunch} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  {/* Topic Selector */}
                  <div>
                    <label
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.76rem',
                        fontWeight: 600,
                        color: '#9EABB8',
                        display: 'block',
                        marginBottom: '8px',
                      }}
                    >
                      Subject Stamp
                    </label>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {TOPIC_PRESETS.map((t) => {
                        const isSelected = activeTopic === t.id
                        return (
                          <button
                            key={t.id}
                            type="button"
                            onClick={() => handleSelectTopic(t)}
                            style={{
                              fontFamily: 'var(--font-sans)',
                              fontSize: '0.74rem',
                              fontWeight: isSelected ? 600 : 500,
                              padding: '6px 12px',
                              borderRadius: '8px',
                              border: isSelected
                                ? '1px solid #D4AF37'
                                : '1px solid var(--color-border-hairline)',
                              background: isSelected
                                ? 'rgba(212, 175, 55, 0.12)'
                                : 'rgba(15, 20, 25, 0.5)',
                              color: isSelected ? '#D4AF37' : '#9EABB8',
                              cursor: 'pointer',
                              transition: 'all 0.2s ease',
                            }}
                          >
                            {t.label}
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  {/* Name & Email Fields */}
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
                      gap: '1rem',
                    }}
                  >
                    <div>
                      <label
                        style={{
                          fontFamily: 'var(--font-sans)',
                          fontSize: '0.74rem',
                          fontWeight: 500,
                          color: '#9EABB8',
                          display: 'block',
                          marginBottom: '6px',
                        }}
                      >
                        Your Name
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                        placeholder="e.g. Maya Lin"
                        required
                        disabled={flightPhase !== 'draft'}
                        style={{
                          width: '100%',
                          padding: '10px 14px',
                          fontFamily: 'var(--font-sans)',
                          fontSize: '0.84rem',
                          background: 'rgba(15, 20, 25, 0.85)',
                          border: '1px solid var(--color-border-hairline)',
                          borderRadius: '10px',
                          color: '#E8EAED',
                          outline: 'none',
                          transition: 'border-color 0.2s ease',
                        }}
                        onFocusCapture={(e) => (e.target.style.borderColor = '#D4AF37')}
                        onBlurCapture={(e) => (e.target.style.borderColor = 'var(--color-border-hairline)')}
                      />
                    </div>

                    <div>
                      <label
                        style={{
                          fontFamily: 'var(--font-sans)',
                          fontSize: '0.74rem',
                          fontWeight: 500,
                          color: '#9EABB8',
                          display: 'block',
                          marginBottom: '6px',
                        }}
                      >
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                        placeholder="maya@company.com"
                        required
                        disabled={flightPhase !== 'draft'}
                        style={{
                          width: '100%',
                          padding: '10px 14px',
                          fontFamily: 'var(--font-sans)',
                          fontSize: '0.84rem',
                          background: 'rgba(15, 20, 25, 0.85)',
                          border: '1px solid var(--color-border-hairline)',
                          borderRadius: '10px',
                          color: '#E8EAED',
                          outline: 'none',
                          transition: 'border-color 0.2s ease',
                        }}
                        onFocusCapture={(e) => (e.target.style.borderColor = '#D4AF37')}
                        onBlurCapture={(e) => (e.target.style.borderColor = 'var(--color-border-hairline)')}
                      />
                    </div>
                  </div>

                  {/* Message Field */}
                  <div>
                    <label
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.74rem',
                        fontWeight: 500,
                        color: '#9EABB8',
                        display: 'block',
                        marginBottom: '6px',
                      }}
                    >
                      Message Note
                    </label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))}
                      placeholder="Pen your message here... it will be inscribed onto the 3D paper sheet."
                      required
                      disabled={flightPhase !== 'draft'}
                      rows={4}
                      style={{
                        width: '100%',
                        padding: '10px 14px',
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.84rem',
                        lineHeight: 1.5,
                        background: 'rgba(15, 20, 25, 0.85)',
                        border: '1px solid var(--color-border-hairline)',
                        borderRadius: '10px',
                        color: '#E8EAED',
                        outline: 'none',
                        resize: 'vertical',
                        minHeight: '100px',
                        transition: 'border-color 0.2s ease',
                      }}
                      onFocusCapture={(e) => (e.target.style.borderColor = '#D4AF37')}
                      onBlurCapture={(e) => (e.target.style.borderColor = 'var(--color-border-hairline)')}
                    />
                  </div>

                  {/* Submit Button */}
                  <div style={{ marginTop: '0.4rem' }}>
                    <button
                      type="submit"
                      disabled={flightPhase !== 'draft'}
                      style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '10px',
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.88rem',
                        fontWeight: 600,
                        color: '#0F1419',
                        background:
                          flightPhase !== 'draft'
                            ? 'rgba(212, 175, 55, 0.5)'
                            : 'linear-gradient(135deg, #D4AF37 0%, #E6C265 100%)',
                        border: 'none',
                        padding: '14px 24px',
                        borderRadius: '10px',
                        cursor: flightPhase !== 'draft' ? 'not-allowed' : 'pointer',
                        transition: 'all 0.2s ease',
                        boxShadow: '0 4px 18px rgba(212, 175, 55, 0.3)',
                      }}
                    >
                      {flightPhase === 'folding' ? (
                        'Folding into origami airplane...'
                      ) : flightPhase === 'flying' ? (
                        'Flying to destination...'
                      ) : (
                        <>
                          Fold & Launch Origami Plane
                          <Send size={15} />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* ─── Minimalist Footer ─── */}
        <div
          style={{
            marginTop: '5rem',
            paddingTop: '2rem',
            borderTop: '1px solid var(--color-border-hairline)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.72rem',
              color: 'var(--color-text-muted)',
              letterSpacing: '0.02em',
              margin: 0,
            }}
          >
            © {new Date().getFullYear()} Kishor Gogoi · Crafted with React & Three.js
          </p>

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.68rem',
              color: 'var(--color-text-muted)',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: '4px 8px',
              transition: 'color 0.2s',
            }}
          >
            Back to top <ChevronUp size={13} />
          </button>
        </div>
      </div>
    </section>
  )
}
