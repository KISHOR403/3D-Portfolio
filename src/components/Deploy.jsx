import { motion } from 'framer-motion'
import { Mail, ArrowUpRight } from 'lucide-react'

/* Inline brand SVG icons — lucide-react doesn't include brand logos */
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
  },
  {
    label: 'linkedin.com/in/kishorgogoi',
    href: 'https://linkedin.com/in/kishorgogoi/',
    icon: LinkedinIcon,
    id: 'contact-linkedin',
  },
  {
    label: 'github.com/KISHOR403',
    href: 'https://github.com/KISHOR403',
    icon: GithubIcon,
    id: 'contact-github',
  },
]

export default function Deploy() {
  return (
    <section id="deploy" style={{ background: 'var(--color-bg-base)' }}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
        >
          <p className="section-eyebrow">Deploy</p>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '2rem',
            fontWeight: 600,
            letterSpacing: '-0.02em',
            color: 'var(--color-text-primary)',
            marginBottom: '1rem',
          }}>
            Let's connect
          </h2>
          <p style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.8rem',
            color: 'var(--color-text-muted)',
            marginBottom: '3rem',
            maxWidth: '500px',
            lineHeight: 1.7,
            letterSpacing: '0.02em',
          }}>
            Initiating deployment pipeline... Ready to discuss opportunities, collaborate on QA projects, or talk testing strategy.
          </p>
        </motion.div>

        {/* Contact card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, delay: 0.15 }}
          style={{
            background: 'var(--color-bg-surface)',
            border: '1px solid var(--color-border-hairline)',
            borderRadius: '16px',
            padding: '2.5rem',
            maxWidth: '600px',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Subtle corner glow */}
          <div style={{
            position: 'absolute',
            top: '-60px',
            right: '-60px',
            width: '200px',
            height: '200px',
            background: 'radial-gradient(circle, rgba(74, 222, 154, 0.06), transparent)',
            pointerEvents: 'none',
          }} />

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem',
            position: 'relative',
            zIndex: 1,
          }}>
            {CONTACT_LINKS.map((link, i) => {
              const Icon = link.icon
              return (
                <a
                  key={i}
                  href={link.href}
                  target={link.href.startsWith('mailto') ? undefined : '_blank'}
                  rel={link.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                  id={link.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    padding: '1rem 1.25rem',
                    borderRadius: '10px',
                    background: 'var(--color-bg-base)',
                    border: '1px solid var(--color-border-hairline)',
                    textDecoration: 'none',
                    transition: 'all 0.25s ease',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = 'rgba(74, 222, 154, 0.3)'
                    e.currentTarget.style.transform = 'translateX(4px)'
                    e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.2)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'var(--color-border-hairline)'
                    e.currentTarget.style.transform = 'translateX(0)'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                >
                  <Icon
                    size={18}
                    style={{ color: 'var(--color-accent-pass)', flexShrink: 0 }}
                  />
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.85rem',
                    fontWeight: 500,
                    color: 'var(--color-text-primary)',
                    flex: 1,
                    letterSpacing: '0.02em',
                  }}>
                    {link.label}
                  </span>
                  <ArrowUpRight
                    size={14}
                    style={{ color: 'var(--color-text-muted)', flexShrink: 0 }}
                  />
                </a>
              )
            })}
          </div>
        </motion.div>

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
            Built with React + Three.js
          </p>
        </div>
      </div>
    </section>
  )
}
