import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Mail, ArrowUpRight, Send, Check, Copy, CheckCheck,
  Clock, MapPin, Sparkles, ChevronUp, Radio, Volume2, VolumeX
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

/* ─── Fast Preset Pings ─── */
const QUICK_PINGS = [
  { id: 'qa', label: '🎯 QA Automation & SDET Role', text: 'Hi Kishor! We are looking for an experienced QA Automation / SDET engineer for our team.' },
  { id: 'fullstack', label: '🚀 Full-Stack Engineering Project', text: 'Hi Kishor! I saw your portfolio and would like to discuss a full-stack development project.' },
  { id: 'hello', label: '☕ Say Hello & Network', text: 'Hey Kishor! Just wanted to connect and talk engineering & testing architectures.' },
]

export default function Deploy() {
  const [activeChannel, setActiveChannel] = useState('EMAIL')
  const [screenMessage, setScreenMessage] = useState('')
  const [copied, setCopied] = useState(false)
  const [showPingModal, setShowPingModal] = useState(false)
  const [pingSent, setPingSent] = useState(false)
  const [selectedPing, setSelectedPing] = useState(QUICK_PINGS[0])
  const [senderName, setSenderName] = useState('')
  const [senderEmail, setSenderEmail] = useState('')

  // Live IST Digital Clock
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

  // Handle Action Triggered from 3D Device or UI Buttons
  const handleDeviceAction = (actionKey) => {
    if (actionKey === 'copy-email') {
      navigator.clipboard.writeText('kishorgogoi403@gmail.com')
      setCopied(true)
      setActiveChannel('EMAIL')
      setScreenMessage('✔ COPIED: kishorgogoi403@gmail.com')
      setTimeout(() => {
        setCopied(false)
        setScreenMessage('')
      }, 3500)
    } else if (actionKey === 'linkedin') {
      setActiveChannel('LINKEDIN')
      setScreenMessage('OPENING: linkedin.com/in/kishorgogoi')
      setTimeout(() => {
        window.open('https://linkedin.com/in/kishorgogoi/', '_blank')
        setScreenMessage('')
      }, 500)
    } else if (actionKey === 'github') {
      setActiveChannel('GITHUB')
      setScreenMessage('OPENING: github.com/KISHOR403')
      setTimeout(() => {
        window.open('https://github.com/KISHOR403', '_blank')
        setScreenMessage('')
      }, 500)
    } else if (actionKey === 'quick-ping') {
      setActiveChannel('PING')
      setScreenMessage('TRANSMIT QUICK DISPATCH PING')
      setShowPingModal(true)
    }
  }

  const handleSendPing = (e) => {
    e.preventDefault()
    setPingSent(true)
    setScreenMessage(`✔ PING DISPATCHED FROM: ${senderName || 'Anonymous'}`)
    setTimeout(() => {
      setShowPingModal(false)
      setPingSent(false)
      setSenderName('')
      setSenderEmail('')
    }, 2200)
  }

  return (
    <section
      id="deploy"
      style={{
        position: 'relative',
        background: 'transparent',
        paddingTop: '6rem',
        paddingBottom: '4.5rem',
        overflow: 'hidden',
      }}
    >
      <div
        className="section-container"
        style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: '1180px',
          margin: '0 auto',
          padding: '0 1.5rem',
        }}
      >
        {/* ─── Modern Cyber Headline ─── */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55 }}
          style={{ marginBottom: '2.5rem', textAlign: 'center' }}
        >
          {/* Status Badge */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 14px',
              borderRadius: '9999px',
              background: 'rgba(74, 222, 154, 0.08)',
              border: '1px solid rgba(74, 222, 154, 0.22)',
              marginBottom: '1rem',
            }}
          >
            <Radio size={13} color="#4ADE9A" className="animate-pulse" />
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.74rem',
                fontWeight: 600,
                color: '#4ADE9A',
                letterSpacing: '0.04em',
              }}
            >
              Direct Line Available · IST (UTC+5:30) {currentTime || '5:00 PM'}
            </span>
          </div>

          <h2
            className="section-headline-editorial"
            style={{
              fontSize: 'clamp(2.4rem, 4.8vw, 3.8rem)',
              fontWeight: 800,
              letterSpacing: '-0.025em',
              lineHeight: 1.08,
              margin: '0 auto',
              color: '#FFFFFF',
              maxWidth: '700px',
            }}
          >
            Direct Line to{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #4ADE9A 0%, #38BDF8 60%, #F2A93B 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Kishor Gogoi.
            </span>
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.98rem',
              color: 'var(--color-text-muted)',
              marginTop: '0.8rem',
              maxWidth: '560px',
              margin: '0.8rem auto 0',
              lineHeight: 1.6,
            }}
          >
            Tap the physical 3D communicator keys below to copy direct email, view repositories, or dispatch an instant message.
          </p>
        </motion.div>

        {/* ─── 3D Tactile Communicator Stage (Borderless & Seamless) ─── */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '490px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Contact3DCanvas
            activeChannel={activeChannel}
            onSelectChannel={setActiveChannel}
            screenMessage={screenMessage}
            onAction={handleDeviceAction}
          />
        </div>

        {/* ─── Interactive Channel Action Strip ─── */}
        <div
          style={{
            maxWidth: '820px',
            margin: '1.5rem auto 0',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '0.85rem',
          }}
        >
          {/* Email Key Button */}
          <button
            onClick={() => handleDeviceAction('copy-email')}
            style={{
              background: copied ? 'rgba(74, 222, 154, 0.15)' : 'rgba(22, 29, 36, 0.65)',
              backdropFilter: 'blur(12px)',
              border: `1px solid ${copied ? '#4ADE9A' : 'var(--color-border-hairline)'}`,
              borderRadius: '12px',
              padding: '12px 16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              color: '#E8EAED',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Mail size={16} color="#4ADE9A" />
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: '#9EABB8' }}>DIRECT MAIL</div>
                <div style={{ fontSize: '0.78rem', fontWeight: 600 }}>{copied ? 'Copied to Clipboard!' : 'Copy Email'}</div>
              </div>
            </div>
            {copied ? <CheckCheck size={14} color="#4ADE9A" /> : <Copy size={13} color="#9EABB8" />}
          </button>

          {/* LinkedIn Key Button */}
          <button
            onClick={() => handleDeviceAction('linkedin')}
            style={{
              background: 'rgba(22, 29, 36, 0.65)',
              backdropFilter: 'blur(12px)',
              border: '1px solid var(--color-border-hairline)',
              borderRadius: '12px',
              padding: '12px 16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              color: '#E8EAED',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <LinkedinIcon size={16} style={{ color: '#38BDF8' }} />
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: '#9EABB8' }}>PROFESSIONAL</div>
                <div style={{ fontSize: '0.78rem', fontWeight: 600 }}>LinkedIn Profile</div>
              </div>
            </div>
            <ArrowUpRight size={13} color="#9EABB8" />
          </button>

          {/* GitHub Key Button */}
          <button
            onClick={() => handleDeviceAction('github')}
            style={{
              background: 'rgba(22, 29, 36, 0.65)',
              backdropFilter: 'blur(12px)',
              border: '1px solid var(--color-border-hairline)',
              borderRadius: '12px',
              padding: '12px 16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              color: '#E8EAED',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <GithubIcon size={16} style={{ color: '#E8EAED' }} />
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: '#9EABB8' }}>REPOSITORIES</div>
                <div style={{ fontSize: '0.78rem', fontWeight: 600 }}>GitHub Source</div>
              </div>
            </div>
            <ArrowUpRight size={13} color="#9EABB8" />
          </button>

          {/* Quick Ping Button */}
          <button
            onClick={() => handleDeviceAction('quick-ping')}
            style={{
              background: 'rgba(242, 169, 59, 0.1)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(242, 169, 59, 0.3)',
              borderRadius: '12px',
              padding: '12px 16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              color: '#F2A93B',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Send size={15} color="#F2A93B" />
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: '#F2A93B', opacity: 0.8 }}>INSTANT DISPATCH</div>
                <div style={{ fontSize: '0.78rem', fontWeight: 600, color: '#FFFFFF' }}>Quick Ping</div>
              </div>
            </div>
            <Sparkles size={13} color="#F2A93B" />
          </button>
        </div>

        {/* ─── Quick Dispatch Modal Overlay ─── */}
        <AnimatePresence>
          {showPingModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(7, 11, 16, 0.85)',
                backdropFilter: 'blur(12px)',
                zIndex: 200,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '1.5rem',
              }}
              onClick={() => setShowPingModal(false)}
            >
              <motion.div
                initial={{ scale: 0.94, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.94, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                style={{
                  width: '100%',
                  maxWidth: '480px',
                  background: 'rgba(22, 29, 36, 0.95)',
                  border: '1px solid var(--color-border-hairline)',
                  borderRadius: '18px',
                  padding: '1.8rem',
                  boxShadow: '0 20px 40px -15px rgba(0,0,0,0.8)',
                }}
              >
                {pingSent ? (
                  <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
                    <div
                      style={{
                        width: '52px',
                        height: '52px',
                        borderRadius: '50%',
                        background: 'rgba(74, 222, 154, 0.15)',
                        border: '1px solid #4ADE9A',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 1rem',
                        color: '#4ADE9A',
                      }}
                    >
                      <Check size={26} />
                    </div>
                    <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#E8EAED', marginBottom: '0.4rem' }}>
                      Ping Delivered
                    </h3>
                    <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)' }}>
                      Notification sent to Kishor’s receiver unit.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSendPing} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#E8EAED', margin: 0 }}>
                        Quick Dispatch Ping
                      </h3>
                      <button
                        type="button"
                        onClick={() => setShowPingModal(false)}
                        style={{
                          background: 'transparent',
                          border: 'none',
                          color: '#9EABB8',
                          cursor: 'pointer',
                          fontSize: '1.2rem',
                        }}
                      >
                        ✕
                      </button>
                    </div>

                    {/* Preset Buttons */}
                    <div>
                      <label style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#9EABB8', display: 'block', marginBottom: '6px' }}>
                        SELECT PING TOPIC
                      </label>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        {QUICK_PINGS.map((p) => {
                          const isSel = selectedPing.id === p.id
                          return (
                            <button
                              key={p.id}
                              type="button"
                              onClick={() => setSelectedPing(p)}
                              style={{
                                fontFamily: 'var(--font-sans)',
                                fontSize: '0.78rem',
                                padding: '8px 12px',
                                borderRadius: '8px',
                                border: isSel ? '1px solid #F2A93B' : '1px solid var(--color-border-hairline)',
                                background: isSel ? 'rgba(242, 169, 59, 0.12)' : 'rgba(15, 20, 25, 0.6)',
                                color: isSel ? '#F2A93B' : '#E8EAED',
                                textAlign: 'left',
                                cursor: 'pointer',
                              }}
                            >
                              {p.label}
                            </button>
                          )
                        })}
                      </div>
                    </div>

                    {/* Sender Identity */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                      <div>
                        <label style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#9EABB8', display: 'block', marginBottom: '4px' }}>
                          YOUR NAME
                        </label>
                        <input
                          type="text"
                          required
                          value={senderName}
                          onChange={(e) => setSenderName(e.target.value)}
                          placeholder="e.g. Maya"
                          style={{
                            width: '100%',
                            padding: '8px 10px',
                            background: 'rgba(15, 20, 25, 0.8)',
                            border: '1px solid var(--color-border-hairline)',
                            borderRadius: '8px',
                            color: '#E8EAED',
                            fontFamily: 'var(--font-sans)',
                            fontSize: '0.82rem',
                            outline: 'none',
                          }}
                        />
                      </div>
                      <div>
                        <label style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#9EABB8', display: 'block', marginBottom: '4px' }}>
                          YOUR EMAIL
                        </label>
                        <input
                          type="email"
                          required
                          value={senderEmail}
                          onChange={(e) => setSenderEmail(e.target.value)}
                          placeholder="maya@company.com"
                          style={{
                            width: '100%',
                            padding: '8px 10px',
                            background: 'rgba(15, 20, 25, 0.8)',
                            border: '1px solid var(--color-border-hairline)',
                            borderRadius: '8px',
                            color: '#E8EAED',
                            fontFamily: 'var(--font-sans)',
                            fontSize: '0.82rem',
                            outline: 'none',
                          }}
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      style={{
                        marginTop: '0.5rem',
                        padding: '12px',
                        borderRadius: '10px',
                        background: '#F2A93B',
                        color: '#0F1419',
                        fontWeight: 700,
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.86rem',
                        border: 'none',
                        cursor: 'pointer',
                      }}
                    >
                      Transmit Ping
                    </button>
                  </form>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

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
