import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, ArrowUpRight, Send, Check } from 'lucide-react'

/* ─── Inline brand SVG icons ─── */
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

const CONTACT_LINKS = [
  {
    label: 'kishorgogoi403@gmail.com',
    href: 'mailto:kishorgogoi403@gmail.com',
    icon: Mail,
    id: 'contact-email',
    cta: 'Send email',
  },
  {
    label: 'linkedin.com/in/kishorgogoi',
    href: 'https://linkedin.com/in/kishorgogoi/',
    icon: LinkedinIcon,
    id: 'contact-linkedin',
    cta: 'Connect',
  },
  {
    label: 'github.com/KISHOR403',
    href: 'https://github.com/KISHOR403',
    icon: GithubIcon,
    id: 'contact-github',
    cta: 'Follow',
  },
]

/* ─── Contact Form ─── */
function ContactForm() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | sending | sent | error

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.message) return

    setStatus('sending')

    // Simulate send (portfolio demo — no backend)
    setTimeout(() => {
      setStatus('sent')
      setTimeout(() => {
        setStatus('idle')
        setFormData({ name: '', email: '', message: '' })
      }, 3000)
    }, 1200)
  }

  const inputStyle = {
    width: '100%',
    padding: '10px 12px',
    fontFamily: 'var(--font-mono)',
    fontSize: '0.8rem',
    background: 'var(--color-bg-base)',
    border: '1px solid var(--color-border-hairline)',
    borderRadius: '8px',
    color: 'var(--color-text-primary)',
    outline: 'none',
    transition: 'border-color 0.2s ease',
  }

  return (
    <form onSubmit={handleSubmit} style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '0.75rem',
    }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: '0.75rem',
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
            Name
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
            placeholder="Your name"
            required
            style={inputStyle}
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
            Email
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
            placeholder="you@example.com"
            required
            style={inputStyle}
            onFocus={e => e.target.style.borderColor = 'rgba(74, 222, 154, 0.4)'}
            onBlur={e => e.target.style.borderColor = 'var(--color-border-hairline)'}
          />
        </div>
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
          Message
        </label>
        <textarea
          value={formData.message}
          onChange={e => setFormData(prev => ({ ...prev, message: e.target.value }))}
          placeholder="Your message..."
          required
          rows={4}
          style={{
            ...inputStyle,
            resize: 'vertical',
            minHeight: '100px',
          }}
          onFocus={e => e.target.style.borderColor = 'rgba(74, 222, 154, 0.4)'}
          onBlur={e => e.target.style.borderColor = 'var(--color-border-hairline)'}
        />
      </div>
      <button
        type="submit"
        disabled={status === 'sending' || status === 'sent'}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.75rem',
          fontWeight: 600,
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          color: status === 'sent' ? '#4ADE9A' : 'var(--color-bg-base)',
          background: status === 'sent' ? 'rgba(74, 222, 154, 0.12)' : 'var(--color-accent-pass)',
          border: status === 'sent' ? '1px solid rgba(74, 222, 154, 0.3)' : 'none',
          padding: '12px 24px',
          borderRadius: '10px',
          cursor: status === 'sending' || status === 'sent' ? 'default' : 'pointer',
          transition: 'all 0.25s ease',
          width: 'fit-content',
          opacity: status === 'sending' ? 0.7 : 1,
        }}
      >
        {status === 'sent' ? (
          <>
            <Check size={14} />
            Message Sent
          </>
        ) : status === 'sending' ? (
          'Sending...'
        ) : (
          <>
            <Send size={13} />
            Send Message
          </>
        )}
      </button>
    </form>
  )
}

/* ─── Main Deploy Component ─── */
export default function Deploy() {
  const [hoveredLink, setHoveredLink] = useState(null)

  return (
    <section id="deploy" style={{ background: 'transparent' }}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
        >
          <p className="section-eyebrow">Contact</p>
          <h2
            className="section-headline-editorial"
            style={{ marginBottom: '1rem' }}
          >
            <span className="shading-word">Let's</span>
            <span className="shading-word">connect</span>
          </h2>
          <p style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.95rem',
            color: 'var(--color-text-muted)',
            marginBottom: '2.5rem',
            maxWidth: '500px',
            lineHeight: 1.7,
          }}>
            Ready to discuss opportunities, collaborate on projects, or chat about QA automation strategy.
          </p>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem',
          maxWidth: '800px',
        }}>
          {/* Direct Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{
              background: 'var(--color-bg-surface)',
              border: '1px solid var(--color-border-hairline)',
              borderRadius: '14px',
              padding: '1.5rem',
            }}
          >
            <h3 style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.72rem',
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: '#6C7A89',
              marginBottom: '1rem',
            }}>
              Direct Links
            </h3>

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
            }}>
              {CONTACT_LINKS.map((link, i) => {
                const Icon = link.icon
                const isHovered = hoveredLink === i
                return (
                  <motion.a
                    key={i}
                    href={link.href}
                    target={link.href.startsWith('mailto') ? undefined : '_blank'}
                    rel={link.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                    id={link.id}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    onHoverStart={() => setHoveredLink(i)}
                    onHoverEnd={() => setHoveredLink(null)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      padding: '0.75rem 1rem',
                      borderRadius: '10px',
                      background: 'var(--color-bg-base)',
                      border: `1px solid ${isHovered ? 'rgba(74, 222, 154, 0.3)' : 'var(--color-border-hairline)'}`,
                      textDecoration: 'none',
                      cursor: 'pointer',
                      transition: 'border-color 0.2s ease',
                    }}
                  >
                    <Icon
                      size={16}
                      style={{ color: 'var(--color-accent-pass)', flexShrink: 0 }}
                    />
                    <span style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.78rem',
                      fontWeight: 500,
                      color: 'var(--color-text-primary)',
                      flex: 1,
                    }}>
                      {link.label}
                    </span>
                    <ArrowUpRight
                      size={13}
                      style={{
                        color: isHovered ? 'var(--color-accent-pass)' : 'var(--color-text-muted)',
                        flexShrink: 0,
                        transition: 'color 0.2s ease',
                      }}
                    />
                  </motion.a>
                )
              })}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{
              background: 'var(--color-bg-surface)',
              border: '1px solid var(--color-border-hairline)',
              borderRadius: '14px',
              padding: '1.5rem',
            }}
          >
            <h3 style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.72rem',
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: '#6C7A89',
              marginBottom: '1rem',
            }}>
              Send a Message
            </h3>
            <ContactForm />
          </motion.div>
        </div>

        {/* Footer */}
        <div style={{
          marginTop: '4rem',
          paddingTop: '2rem',
          borderTop: '1px solid var(--color-border-hairline)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
        }}>
          <p style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.7rem',
            color: 'var(--color-text-muted)',
            letterSpacing: '0.04em',
          }}>
            © {new Date().getFullYear()} Kishor Gogoi. All tests passing.
          </p>
          <p style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.65rem',
            color: 'var(--color-text-muted)',
            letterSpacing: '0.04em',
            opacity: 0.6,
          }}>
            Built with React + Vite
          </p>
        </div>
      </div>
    </section>
  )
}
