import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Mail, ArrowUpRight, Copy, CheckCheck,
  Clock, MapPin, Sparkles, ChevronUp, Radio
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

export default function Deploy() {
  const [copied, setCopied] = useState(false)

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

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('kishorgogoi403@gmail.com')
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  const handleCardAction = (action) => {
    if (action === 'copy-email') {
      handleCopyEmail()
    } else if (action === 'linkedin') {
      window.open('https://linkedin.com/in/kishorgogoi/', '_blank')
    } else if (action === 'github') {
      window.open('https://github.com/KISHOR403', '_blank')
    }
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
        {/* ─── Header ─── */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55 }}
          style={{ marginBottom: '1.8rem', textAlign: 'center' }}
        >
          {/* Eyebrow Status Badge */}
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
              Open for Senior QA Roles & Contracts · 2026
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
              maxWidth: '750px',
            }}
          >
            Connect with{' '}
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
            Interactive 3D ID Badge hanging on a dynamic woven lanyard band. Move your mouse to swing the badge, or tap to flip.
          </p>
        </motion.div>

        {/* ─── Seamless 3D ID Badge & Moving Lanyard Band (Unboxed & Borderless) ─── */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: 'clamp(360px, 50vh, 570px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Contact3DCanvas onCardAction={handleCardAction} />
        </div>

        {/* ─── Direct Channel Action Strip ─── */}
        <div
          style={{
            maxWidth: '780px',
            margin: '1.2rem auto 0',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))',
            gap: '0.85rem',
          }}
        >
          {/* Copy Email Button */}
          <button
            onClick={handleCopyEmail}
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
              minWidth: 0,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0, overflow: 'hidden' }}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  background: 'rgba(74, 222, 154, 0.12)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <Mail size={16} color="#4ADE9A" />
              </div>
              <div style={{ textAlign: 'left', minWidth: 0 }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: '#9EABB8' }}>DIRECT EMAIL</div>
                <div style={{ fontSize: '0.78rem', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{copied ? 'Copied to Clipboard!' : 'kishorgogoi403@gmail.com'}</div>
              </div>
            </div>
            {copied ? <CheckCheck size={14} color="#4ADE9A" style={{ flexShrink: 0 }} /> : <Copy size={13} color="#9EABB8" style={{ flexShrink: 0 }} />}
          </button>

          {/* LinkedIn Button */}
          <a
            href="https://linkedin.com/in/kishorgogoi/"
            target="_blank"
            rel="noopener noreferrer"
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
              textDecoration: 'none',
              transition: 'all 0.2s ease',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  background: 'rgba(56, 189, 248, 0.12)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <LinkedinIcon size={16} style={{ color: '#38BDF8' }} />
              </div>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: '#9EABB8' }}>PROFESSIONAL NETWORK</div>
                <div style={{ fontSize: '0.78rem', fontWeight: 600 }}>LinkedIn Profile</div>
              </div>
            </div>
            <ArrowUpRight size={14} color="#9EABB8" />
          </a>

          {/* GitHub Button */}
          <a
            href="https://github.com/KISHOR403"
            target="_blank"
            rel="noopener noreferrer"
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
              textDecoration: 'none',
              transition: 'all 0.2s ease',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  background: 'rgba(255, 255, 255, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <GithubIcon size={16} style={{ color: '#E8EAED' }} />
              </div>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: '#9EABB8' }}>AUTOMATION REPOS</div>
                <div style={{ fontSize: '0.78rem', fontWeight: 600 }}>GitHub Source</div>
              </div>
            </div>
            <ArrowUpRight size={14} color="#9EABB8" />
          </a>
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
