import { useRef, useEffect, useState } from 'react'

/* ═══════════════════════════════════════════════════════════════
   Beyond the Console — Swiss Typographic Strip
   ═══════════════════════════════════════════════════════════════
   Minimal horizontal data strip with numbered entries.
   ─────────────────────────────────────────────────────────────── */

const ENTRIES = [
  { num: 'A', label: 'Full-Stack Builder', value: 'Spring Boot, Next.js, React, Node.js' },
  { num: 'B', label: 'Content Creator', value: 'Technical writing, video editing & social media' },
  { num: 'C', label: 'Founder Mindset', value: 'LogiConnect, Testnexa AI, RepoWiki AI' },
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
      className="swiss-btc"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(8px)',
        transition: visible ? 'opacity 0.4s ease, transform 0.4s ease' : 'none',
      }}
    >
      <div className="swiss-btc__inner">
        {/* Label */}
        <span className="swiss-btc__label">BEYOND THE CONSOLE</span>

        {/* Divider */}
        <div className="swiss-btc__divider" />

        {/* Entries */}
        <div className="swiss-btc__entries">
          {ENTRIES.map((entry, i) => (
            <div key={i} className="swiss-btc__entry">
              <span className="swiss-btc__entry-num">{entry.num}</span>
              <span className="swiss-btc__entry-label">{entry.label}</span>
              <span className="swiss-btc__entry-sep">—</span>
              <span className="swiss-btc__entry-value">{entry.value}</span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .swiss-btc {
          width: 100%;
          border-top: 1px solid var(--color-border-hairline);
          border-bottom: 1px solid var(--color-border-hairline);
          padding: 0.875rem 1.5rem;
          position: relative;
          z-index: 10;
        }
        .swiss-btc__inner {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          gap: 1.25rem;
        }
        .swiss-btc__label {
          font-family: var(--font-mono);
          font-size: 0.58rem;
          font-weight: 700;
          letter-spacing: 0.2em;
          color: var(--color-accent-pending);
          white-space: nowrap;
          flex-shrink: 0;
        }
        .swiss-btc__divider {
          width: 1px;
          height: 20px;
          background: var(--color-border-hairline);
          flex-shrink: 0;
        }
        .swiss-btc__entries {
          display: flex;
          gap: 1.5rem;
          align-items: center;
          flex-wrap: nowrap;
          overflow-x: auto;
        }
        .swiss-btc__entry {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-family: var(--font-mono);
          font-size: 0.68rem;
          line-height: 1.4;
          white-space: nowrap;
          flex-shrink: 0;
          padding: 0.25rem 0;
          transition: opacity 0.2s ease;
        }
        .swiss-btc__entry:hover {
          opacity: 0.7;
        }
        .swiss-btc__entry-num {
          font-size: 0.55rem;
          font-weight: 700;
          color: var(--color-accent-pending);
          opacity: 0.6;
          letter-spacing: 0.1em;
        }
        .swiss-btc__entry-label {
          font-weight: 600;
          color: var(--color-text-primary);
        }
        .swiss-btc__entry-sep {
          color: rgba(35, 44, 53, 0.6);
          font-weight: 400;
        }
        .swiss-btc__entry-value {
          font-weight: 400;
          color: var(--color-text-muted);
        }

        /* ── Responsive ── */
        @media (max-width: 1024px) {
          .swiss-btc__entries {
            flex-wrap: wrap;
            gap: 0.75rem;
          }
          .swiss-btc__entry {
            white-space: normal;
          }
        }
        @media (max-width: 768px) {
          .swiss-btc {
            padding: 0.75rem 1rem;
          }
          .swiss-btc__inner {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.75rem;
          }
          .swiss-btc__divider {
            width: 100%;
            height: 1px;
          }
          .swiss-btc__entries {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.5rem;
            width: 100%;
          }
          .swiss-btc__entry {
            flex-wrap: wrap;
            gap: 0.375rem;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .swiss-btc__entry {
            transition: none !important;
          }
        }
      `}</style>
    </div>
  )
}
