import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Download } from 'lucide-react'
import profileImg from '../assets/profile.jpg'
import { Canvas, useFrame } from '@react-three/fiber'
import { Sphere, MeshDistortMaterial } from '@react-three/drei'

// 3D Morphing blob in WebGL
function ThreeDBlob() {
  const meshRef = useRef()
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.15
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.2
    }
  })

  return (
    <Sphere args={[1.3, 64, 64]} ref={meshRef}>
      <MeshDistortMaterial
        color="#4ade80"
        attach="material"
        distort={0.45}
        speed={1.8}
        roughness={0.1}
        metalness={0.9}
      />
    </Sphere>
  )
}

// 3D Space dust particles in WebGL
function ThreeDParticles() {
  const pointsRef = useRef()
  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.03
      pointsRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.02) * 0.1
    }
  })

  const count = 250
  const positions = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 6
    positions[i * 3 + 1] = (Math.random() - 0.5) * 6
    positions[i * 3 + 2] = (Math.random() - 0.5) * 6
  }

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#F2A93B"
        size={0.05}
        sizeAttenuation
        transparent
        opacity={0.7}
      />
    </points>
  )
}

const QUICK_FACTS = [
  {
    icon: '🎯',
    label: 'Open to relocation',
    value: 'Pune · Hyderabad · NCR · Mumbai',
  },
  {
    icon: '✓',
    label: 'Testing stack',
    value: 'Selenium · Appium · REST Assured',
  },
  {
    icon: '⚡',
    label: 'Currently building',
    value: 'Testnexa AI (testnexa-ai.vercel.app)',
  },
]

export default function TestPlan({ onOpenResume }) {
  const [imgError, setImgError] = useState(false)
  const frameRef = useRef(null)
  const highlightRef = useRef(null)
  const rAFRef = useRef(null)

  useEffect(() => {
    const frame = frameRef.current
    const highlight = highlightRef.current
    if (!frame) return

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const prefersReducedMotion = mediaQuery.matches

    // Only run 3D tilt on devices that aren't touch-based and support hover interaction
    if (prefersReducedMotion || window.innerWidth < 768) {
      return
    }

    const handleMouseMove = (e) => {
      if (rAFRef.current) cancelAnimationFrame(rAFRef.current)

      rAFRef.current = requestAnimationFrame(() => {
        const rect = frame.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top

        const centerX = rect.width / 2
        const centerY = rect.height / 2

        // Tilt effect: max ~7.5 degrees to look smooth and premium
        const tiltX = ((centerY - y) / centerY) * 7.5
        const tiltY = ((x - centerX) / centerX) * -7.5

        frame.style.transform = `rotate(-2.5deg) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.02)`
        frame.style.boxShadow = '-6px 6px 32px rgba(74, 222, 154, 0.25)'

        if (highlight) {
          const pctX = (x / rect.width) * 100
          const pctY = (y / rect.height) * 100
          highlight.style.background = `radial-gradient(circle at ${pctX}% ${pctY}%, rgba(255, 255, 255, 0.12) 0%, transparent 65%)`
        }
      })
    }

    const handleMouseLeave = () => {
      if (rAFRef.current) cancelAnimationFrame(rAFRef.current)

      rAFRef.current = requestAnimationFrame(() => {
        frame.style.transform = 'rotate(-2.5deg) rotateX(0deg) rotateY(0deg) scale(1)'
        frame.style.boxShadow = '-4px 4px 24px rgba(74, 222, 154, 0.12)'
        if (highlight) {
          highlight.style.background = 'transparent'
        }
      })
    }

    frame.addEventListener('mousemove', handleMouseMove)
    frame.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      if (rAFRef.current) cancelAnimationFrame(rAFRef.current)
      frame.removeEventListener('mousemove', handleMouseMove)
      frame.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <section id="test-plan" style={{ background: 'transparent' }}>
      <div className="section-container" style={{ paddingBottom: '1rem' }}>
        <div className="about-grid">
          {/* ───── LEFT COLUMN — Photo / Avatar ───── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5 }}
            className="about-left"
            style={{ perspective: '1000px' }}
          >
            {/* Image frame */}
            <div
              ref={frameRef}
              className="about-photo-frame"
              style={{
                borderRadius: '16px',
                border: '1px solid #232C35',
                overflow: 'hidden',
                transform: 'rotate(-2.5deg)',
                transformStyle: 'preserve-3d',
                boxShadow: '-4px 4px 24px rgba(74, 222, 154, 0.12)',
                transition: 'transform 0.15s ease-out, box-shadow 0.15s ease-out',
                position: 'relative',
                flexShrink: 0,
              }}
            >
              {/* Specular Highlight Overlay */}
              <div
                ref={highlightRef}
                style={{
                  position: 'absolute',
                  inset: 0,
                  zIndex: 3,
                  pointerEvents: 'none',
                  transition: 'background 0.15s ease-out',
                }}
              />

              {!imgError ? (
                <img
                  src={profileImg}
                  alt="Kishor Gogoi"
                  onError={() => setImgError(true)}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                    transform: 'translateZ(20px) scale(1.05)',
                  }}
                />
              ) : (
                /* Advanced Live 3D WebGL Render */
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    background: '#0F1419',
                    position: 'relative',
                    transform: 'translateZ(10px)',
                  }}
                >
                  <Canvas
                    camera={{ position: [0, 0, 3.5], fov: 60 }}
                    style={{ position: 'absolute', inset: 0 }}
                  >
                    <ambientLight intensity={1.2} />
                    <pointLight position={[10, 10, 10]} intensity={2.5} color="#4ade80" />
                    <pointLight position={[-10, -10, -10]} intensity={1.5} color="#F2A93B" />
                    <ThreeDBlob />
                    <ThreeDParticles />
                  </Canvas>

                  {/* Monogram overlay on top of 3D Canvas */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      pointerEvents: 'none',
                      zIndex: 2,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '6.5rem',
                        fontWeight: 800,
                        color: 'rgba(255, 255, 255, 0.9)',
                        textShadow: '0 0 30px rgba(74, 222, 154, 0.45), 0 0 60px rgba(242, 169, 59, 0.25)',
                        letterSpacing: '0.05em',
                        userSelect: 'none',
                      }}
                    >
                      KG
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Status chips below photo */}
            <div className="about-status-container">
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.7rem',
                  fontWeight: 600,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  color: 'var(--color-accent-pass)',
                  background: 'rgba(74, 222, 154, 0.08)',
                  border: '1px solid rgba(74, 222, 154, 0.2)',
                  borderRadius: '999px',
                  padding: '0.35rem 0.75rem',
                }}
              >
                <span style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: 'var(--color-accent-pass)',
                  boxShadow: '0 0 6px rgba(74, 222, 154, 0.5)',
                  flexShrink: 0,
                }} />
                Available for Hire
              </span>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.7rem',
                  fontWeight: 500,
                  color: 'var(--color-text-muted)',
                  background: 'rgba(22, 29, 36, 0.6)',
                  border: '1px solid var(--color-border-hairline)',
                  borderRadius: '999px',
                  padding: '0.35rem 0.75rem',
                }}
              >
                📍 Bengaluru, India
              </span>
            </div>
          </motion.div>

          {/* ───── RIGHT COLUMN — Content ───── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="about-right"
          >
            {/* Eyebrow */}
            <div>
              <p className="section-eyebrow">Test Plan</p>
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '2rem',
                  fontWeight: 600,
                  letterSpacing: '-0.02em',
                  color: 'var(--color-text-primary)',
                  marginTop: '0.5rem',
                }}
              >
                About me
              </h2>
            </div>

            {/* Bio */}
            <div>
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '1rem',
                  lineHeight: 1.8,
                  color: 'var(--color-text-muted)',
                }}
              >
                Results-driven QA Engineer with hands-on experience in manual and
                automation testing using Selenium, Appium, and REST Assured.
                Skilled in SDLC/STLC, test case design, defect lifecycle
                management, SQL validation, and API testing with Postman.
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '1rem',
                  lineHeight: 1.8,
                  color: 'var(--color-text-muted)',
                  marginTop: '1.25rem',
                }}
              >
                As a recently graduated Computer Science Engineer, I've built
                data-driven frameworks with Page Object Model patterns,
                integrated CI/CD pipelines via GitHub Actions and Jenkins, and
                delivered stable, high-quality releases across web and mobile
                platforms.
              </p>
            </div>

            {/* Quick facts — config-file style */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
              {QUICK_FACTS.map((fact, i) => (
                <div key={i} className="quick-fact-row">
                  <span style={{ fontSize: '0.9rem', flexShrink: 0 }}>
                    {fact.icon}
                  </span>
                  <span className="quick-fact-label">
                    {fact.label}
                  </span>
                  <span className="quick-fact-arrow">
                    →
                  </span>
                  <span className="quick-fact-value">
                    {fact.value}
                  </span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="about-ctas">
              <a
                href="#pipeline-runs"
                className="cta-primary"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  color: 'var(--color-bg-deep)',
                  background: 'var(--color-accent-pass)',
                  border: '1px solid var(--color-accent-pass)',
                  borderRadius: '999px',
                  padding: '0.7rem 1.5rem',
                  transition: 'background 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease',
                  boxShadow: '0 0 16px rgba(74, 222, 154, 0.2)',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = '#5CE8A0'
                  e.currentTarget.style.transform = 'translateY(-1px)'
                  e.currentTarget.style.boxShadow = '0 0 24px rgba(74, 222, 154, 0.35)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'var(--color-accent-pass)'
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 0 16px rgba(74, 222, 154, 0.2)'
                }}
              >
                ↓ View Projects
              </a>
              <button
                onClick={onOpenResume}
                className="cta-secondary"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  color: '#F2A93B',
                  background: 'transparent',
                  border: '1px solid rgba(242, 169, 59, 0.4)',
                  borderRadius: '999px',
                  padding: '0.7rem 1.5rem',
                  transition: 'border-color 0.2s ease, color 0.2s ease, transform 0.2s ease',
                  cursor: 'pointer',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'rgba(242, 169, 59, 0.8)'
                  e.currentTarget.style.color = '#F5BD5D'
                  e.currentTarget.style.transform = 'translateY(-1px)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(242, 169, 59, 0.4)'
                  e.currentTarget.style.color = '#F2A93B'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                <Download size={14} strokeWidth={2.5} />
                Download Resume
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        .about-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2.5rem;
          align-items: start;
        }
        .about-left {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.25rem;
          width: 100%;
        }
        .about-photo-frame {
          width: 280px;
          height: 340px;
        }
        .about-status-container {
          display: flex;
          gap: 0.625rem;
          flex-wrap: wrap;
          justify-content: center;
          transform: rotate(-2.5deg);
          padding-left: 0.25rem;
        }
        .about-right {
          display: flex;
          flex-direction: column;
          gap: 1.75rem;
        }
        .about-ctas {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
          margin-top: 0.5rem;
          justify-content: center;
        }

        .quick-fact-row {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-family: var(--font-mono);
          font-size: 0.8rem;
          line-height: 1.5;
        }
        .quick-fact-label {
          color: var(--color-text-muted);
          font-weight: 500;
          white-space: nowrap;
        }
        .quick-fact-arrow {
          color: #232C35;
          font-weight: 400;
          flex-shrink: 0;
        }
        .quick-fact-value {
          color: var(--color-text-primary);
          font-weight: 500;
        }

        @media (min-width: 768px) {
          .about-photo-frame {
            width: 320px;
            height: 390px;
          }
        }

        @media (min-width: 1024px) {
          .about-grid {
            grid-template-columns: 42% 58%;
            gap: 3.5rem;
          }
          .about-left {
            align-items: flex-start;
          }
          .about-photo-frame {
            width: 380px;
            height: 460px;
          }
          .about-status-container {
            justify-content: flex-start;
          }
          .about-ctas {
            justify-content: flex-start;
          }
        }

        @media (max-width: 640px) {
          .quick-fact-row {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 0.25rem !important;
          }
          .quick-fact-arrow {
            display: none !important;
          }
          .quick-fact-value {
            padding-left: 1.625rem;
          }
        }
      `}</style>
    </section>
  )
}
