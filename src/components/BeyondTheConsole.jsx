import { useRef, useEffect, useState } from 'react'

const CHIPS = [
  { icon: '⬡', label: 'Full-Stack Builder', detail: 'MERN, React, Node.js, MongoDB' },
  { icon: '⬡', label: 'Content Creator', detail: 'Technical writing, video editing & social media' },
  { icon: '⬡', label: 'Founder Mindset', detail: 'Testnexa AI, Asom Bazaar' },
]

export default function BeyondTheConsole() {
  const stripRef = useRef(null)
  const [visible, setVisible] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  })

  useEffect(() => {
    const el = stripRef.current
    if (!el || visible) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.unobserve(el)
        }
      },
      { threshold: 0.15 }
    )

    observer.observe(el)
    return () => { if (el) observer.unobserve(el) }
  }, [visible])

  return (
    <div
      ref={stripRef}
      style={{
        width: '100%',
        background: '#161D24',
        borderTop: '1px solid #232C35',
        borderBottom: '1px solid #232C35',
        padding: '1rem 1.5rem',
        opacity: visible ? 1 : 0,
        transition: visible ? 'opacity 0.3s ease' : 'none',
        position: 'relative',
        zIndex: 10, // Ensure borders/strip sit above any background elements if needed
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          gap: '1.5rem',
          flexWrap: 'nowrap',
        }}
        className="btc-inner"
      >
        {/* Eyebrow label */}
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.625rem',
            fontWeight: 600,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: '#F2A93B',
            whiteSpace: 'nowrap',
            flexShrink: 0,
          }}
        >
          Beyond the Console
        </span>

        {/* Chips row */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'nowrap',
            gap: '0.625rem',
            alignItems: 'center',
          }}
          className="btc-chips"
        >
          {CHIPS.map((chip, i) => (
            <span
              key={i}
              className="btc-chip"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.7rem',
                fontWeight: 500,
                lineHeight: 1.4,
                color: 'var(--color-text-muted)',
                background: '#0F1419',
                border: '1px solid rgba(242, 169, 59, 0.3)',
                borderRadius: '999px',
                padding: '0.375rem 0.75rem',
                transition: 'border-color 0.2s ease, color 0.2s ease',
                cursor: 'default',
                whiteSpace: 'nowrap',
                flexShrink: 0,
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'rgba(242, 169, 59, 0.8)'
                e.currentTarget.style.color = 'var(--color-text-primary)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(242, 169, 59, 0.3)'
                e.currentTarget.style.color = 'var(--color-text-muted)'
              }}
            >
              <span style={{ color: '#F2A93B', fontSize: '0.75rem', flexShrink: 0 }}>
                {chip.icon}
              </span>
              <span>
                <strong style={{ color: 'var(--color-text-primary)', fontWeight: 600 }}>
                  {chip.label}
                </strong>
                {' — '}
                {chip.detail}
              </span>
            </span>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .btc-inner {
            flex-wrap: wrap !important;
            gap: 0.875rem !important;
          }
          .btc-chips {
            flex-wrap: wrap !important;
          }
          .btc-chip {
            flex-shrink: 1 !important;
            white-space: normal !important;
          }
        }
        @media (max-width: 768px) {
          .btc-inner {
            flex-direction: column !important;
            align-items: flex-start !important;
          }
          .btc-chips {
            flex-direction: column !important;
            align-items: stretch !important;
            width: 100% !important;
          }
        }
      `}</style>
    </div>
  )
}
