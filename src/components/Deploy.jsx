import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Mail, ArrowUpRight, Send, Check, Copy, CheckCheck,
  Clock, MapPin, Sparkles, ChevronUp, RotateCcw
} from 'lucide-react'
import Contact3DCanvas from './Contact3DCanvas'

/* ─── Inline Brand SVG Icons ─── */
function LinkedinIcon({ size = 17, style }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

function GithubIcon({ size = 17, style }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  )
}

function XIcon({ size = 16, style }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" style={style}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  )
}

/* ─── Direct Communication Channels ─── */
const CHANNELS = [
  {
    name: 'Email',
    label: 'kishorgogoi403@gmail.com',
    href: 'mailto:kishorgogoi403@gmail.com',
    icon: Mail,
    color: '#4ADE9A',
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
    name: 'X',
    label: '@kishor_gogoi8',
    href: 'https://x.com/kishor_gogoi8',
    icon: XIcon,
    color: '#A78BFA',
    isExternal: true,
  },
]

/* ─── Modern Topic Selector Pills ─── */
const TOPIC_PRESETS = [
  { id: 'qa', label: 'QA Automation & SDET' },
  { id: 'fullstack', label: 'Full-Stack Development' },
  { id: 'cicd', label: 'CI/CD Architecture' },
  { id: 'chat', label: 'Advisory / Say Hello' },
]

export default function Deploy() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    topic: 'QA Automation & SDET',
    message: '',
  })
  const [activeTopic, setActiveTopic] = useState('qa')
  const [status, setStatus] = useState('idle') // idle | sending | sent
  const [copiedChannel, setCopiedChannel] = useState(null)
  const [orbMood, setOrbMood] = useState('emerald') // 'emerald' | 'azure' | 'lavender'
  const [formFocused, setFormFocused] = useState(false)

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

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.message) return

    setStatus('sending')
    setTimeout(() => {
      setStatus('sent')
    }, 1200)
  }

  const handleReset = () => {
    setStatus('idle')
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
        paddingBottom: '4.5rem',
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
        {/* ─── Apple / Linear Style Header ─── */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55 }}
          style={{ marginBottom: '3.2rem' }}
        >
          {/* Subtle status tag */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 14px',
              borderRadius: '9999px',
              background: 'rgba(74, 222, 154, 0.08)',
              border: '1px solid rgba(74, 222, 154, 0.22)',
              marginBottom: '1.2rem',
            }}
          >
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: '#4ADE9A',
                boxShadow: '0 0 8px #4ADE9A',
                display: 'inline-block',
              }}
            />
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.74rem',
                fontWeight: 600,
                color: '#4ADE9A',
                letterSpacing: '0.04em',
              }}
            >
              Available for Contracts & Engineering Roles · 2026
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
                Let’s create something{' '}
                <span
                  style={{
                    background: 'linear-gradient(135deg, #4ADE9A 0%, #38BDF8 60%, #A78BFA 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  exceptional.
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
                Senior QA Automation & Full-Stack Engineer. Scaling high-velocity test architectures, robust quality gates, and resilient web applications.
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

        {/* ─── Two-Column Seamless Layout (No heavy enclosing boxes) ─── */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '2.5rem',
            alignItems: 'center',
          }}
        >
          {/* ══════════════════════════════════════════════
              LEFT: Fluid 3D Glass Orb Stage & Direct Channels
              ══════════════════════════════════════════════ */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.55 }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1.25rem',
            }}
          >
            {/* 3D Fluid Glass Orb - Completely unboxed & borderless */}
            <div
              style={{
                position: 'relative',
                width: '100%',
                height: '420px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Contact3DCanvas
                mood={orbMood}
                formActive={formFocused}
                isSending={status === 'sending'}
              />
            </div>

            {/* Interactive Color Mood Selector */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.68rem',
                  color: 'var(--color-text-muted)',
                  marginRight: '6px',
                }}
              >
                Aura:
              </span>
              {[
                { id: 'emerald', label: 'Emerald', color: '#4ADE9A' },
                { id: 'azure', label: 'Azure', color: '#38BDF8' },
                { id: 'lavender', label: 'Lavender', color: '#A78BFA' },
              ].map((m) => (
                <button
                  key={m.id}
                  onClick={() => setOrbMood(m.id)}
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.72rem',
                    fontWeight: orbMood === m.id ? 600 : 500,
                    padding: '4px 10px',
                    borderRadius: '6px',
                    border: orbMood === m.id ? `1px solid ${m.color}` : '1px solid rgba(255, 255, 255, 0.08)',
                    background: orbMood === m.id ? `${m.color}15` : 'rgba(255, 255, 255, 0.03)',
                    color: orbMood === m.id ? m.color : '#9EABB8',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {m.label}
                </button>
              ))}
            </div>

            {/* Direct Connect Chips */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '0.75rem',
                marginTop: '0.5rem',
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
              RIGHT: Clean Modern Glass Form (Linear Style)
              ══════════════════════════════════════════════ */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.55, delay: 0.1 }}
            style={{
              background: 'rgba(22, 29, 36, 0.6)',
              backdropFilter: 'blur(20px)',
              border: '1px solid var(--color-border-hairline)',
              borderRadius: '20px',
              padding: '2.2rem',
              boxShadow: '0 24px 48px -20px rgba(0, 0, 0, 0.5)',
            }}
          >
            <AnimatePresence mode="wait">
              {status === 'sent' ? (
                /* ─── Clean Sent Confirmation ─── */
                <motion.div
                  key="sent-state"
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
                      width: '56px',
                      height: '56px',
                      borderRadius: '50%',
                      background: 'rgba(74, 222, 154, 0.12)',
                      border: '1px solid rgba(74, 222, 154, 0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 1.2rem',
                      color: '#4ADE9A',
                    }}
                  >
                    <Check size={28} />
                  </div>

                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.4rem',
                      fontWeight: 700,
                      color: '#E8EAED',
                      marginBottom: '0.5rem',
                    }}
                  >
                    Message Received
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
                    Thank you, <strong style={{ color: '#E8EAED' }}>{formData.name}</strong>. Your note has landed in my inbox. I will reply directly to <span style={{ color: '#38BDF8' }}>{formData.email}</span> within 24 hours.
                  </p>

                  <button
                    onClick={handleReset}
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.82rem',
                      fontWeight: 600,
                      padding: '10px 20px',
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
                    <RotateCcw size={14} /> Send another note
                  </button>
                </motion.div>
              ) : (
                /* ─── Clean Form ─── */
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
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
                      Project Focus
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
                                ? '1px solid #4ADE9A'
                                : '1px solid var(--color-border-hairline)',
                              background: isSelected
                                ? 'rgba(74, 222, 154, 0.12)'
                                : 'rgba(15, 20, 25, 0.5)',
                              color: isSelected ? '#4ADE9A' : '#9EABB8',
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
                        onFocus={() => setFormFocused(true)}
                        onBlur={() => setFormFocused(false)}
                        placeholder="e.g. Alex Morgan"
                        required
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
                        onFocusCapture={(e) => (e.target.style.borderColor = '#4ADE9A')}
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
                        onFocus={() => setFormFocused(true)}
                        onBlur={() => setFormFocused(false)}
                        placeholder="alex@company.com"
                        required
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
                        onFocusCapture={(e) => (e.target.style.borderColor = '#4ADE9A')}
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
                      onFocus={() => setFormFocused(true)}
                      onBlur={() => setFormFocused(false)}
                      placeholder="Share a bit about your project scope, tech stack, or team role..."
                      required
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
                      onFocusCapture={(e) => (e.target.style.borderColor = '#4ADE9A')}
                      onBlurCapture={(e) => (e.target.style.borderColor = 'var(--color-border-hairline)')}
                    />
                  </div>

                  {/* Submit Button */}
                  <div style={{ marginTop: '0.4rem' }}>
                    <button
                      type="submit"
                      disabled={status === 'sending'}
                      style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.86rem',
                        fontWeight: 600,
                        color: '#0F1419',
                        background:
                          status === 'sending'
                            ? 'rgba(74, 222, 154, 0.6)'
                            : 'var(--color-accent-pass)',
                        border: 'none',
                        padding: '13px 24px',
                        borderRadius: '10px',
                        cursor: status === 'sending' ? 'not-allowed' : 'pointer',
                        transition: 'all 0.2s ease',
                        boxShadow: '0 4px 16px rgba(74, 222, 154, 0.25)',
                      }}
                    >
                      {status === 'sending' ? (
                        'Sending note...'
                      ) : (
                        <>
                          Send Message
                          <Send size={14} />
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
            © {new Date().getFullYear()} Kishor Gogoi · Engineered with precision
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
