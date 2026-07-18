import { useRef, useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, ArrowUpRight, Send, Check } from 'lucide-react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'

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

/* ─── 3D Paper Plane Model ─── */
function PaperPlane({ isFlying, onFlightEnd }) {
  const meshRef = useRef()
  const initialPosition = [0, -0.2, 0]
  const initialRotation = [0.4, 0, 0]

  useFrame((state) => {
    if (!meshRef.current) return
    const t = state.clock.getElapsedTime()

    if (isFlying) {
      // Fly up and away animation (pop up)
      meshRef.current.position.y += 0.12
      meshRef.current.position.z -= 0.18
      meshRef.current.position.x += Math.sin(t * 10) * 0.05
      meshRef.current.rotation.y += 0.2
      meshRef.current.rotation.x -= 0.02
      meshRef.current.scale.multiplyScalar(0.95)

      if (meshRef.current.position.z < -6) {
        onFlightEnd()
      }
    } else {
      // Gentle floating animation
      meshRef.current.position.set(
        initialPosition[0],
        initialPosition[1] + Math.sin(t * 2) * 0.15,
        initialPosition[2]
      )
      meshRef.current.rotation.set(
        initialRotation[0] + Math.sin(t * 1.5) * 0.1,
        t * 0.5,
        Math.cos(t * 1.5) * 0.05
      )
      meshRef.current.scale.setScalar(1.2)
    }
  })

  // Create custom geometry for a paper plane
  const planeGeometry = useMemo(() => {
    const geom = new THREE.BufferGeometry()
    
    // Vertices forming the folds of a classic paper plane
    const vertices = new Float32Array([
      // Left Wing
      0, 0, 0.6,
      -0.5, 0, -0.4,
      0, 0.12, -0.3,
      
      // Right Wing
      0, 0, 0.6,
      0, 0.12, -0.3,
      0.5, 0, -0.4,

      // Left Bottom fold (keel)
      0, 0, 0.6,
      0, -0.15, -0.3,
      -0.5, 0, -0.4,

      // Right Bottom fold (keel)
      0, 0, 0.6,
      0.5, 0, -0.4,
      0, -0.15, -0.3,
    ])

    geom.setAttribute('position', new THREE.BufferAttribute(vertices, 3))
    geom.computeVertexNormals()
    return geom
  }, [])

  return (
    <mesh ref={meshRef} geometry={planeGeometry}>
      <meshStandardMaterial
        color="#4ade80"
        roughness={0.2}
        metalness={0.8}
        side={THREE.DoubleSide}
        emissive="#1a6b3a"
        emissiveIntensity={0.2}
      />
    </mesh>
  )
}

// Sparkles / Dust trail when flying
function ParticleTrail({ isFlying }) {
  const pointsRef = useRef()
  const count = 40

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 0.8
      pos[i * 3 + 1] = (Math.random() - 0.5) * 0.8
      pos[i * 3 + 2] = (Math.random() - 0.5) * 0.8
    }
    return pos
  }, [])

  useFrame((state) => {
    if (!pointsRef.current) return
    const t = state.clock.getElapsedTime()
    pointsRef.current.rotation.y = t * 0.5
    
    if (isFlying) {
      pointsRef.current.position.z -= 0.1
      pointsRef.current.scale.addScalar(0.02)
    } else {
      pointsRef.current.position.set(0, 0, 0)
      pointsRef.current.scale.setScalar(1)
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#F2A93B"
        size={0.05}
        sizeAttenuation
        transparent
        opacity={isFlying ? 0.9 : 0.4}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

/* ─── Main Deploy Component ─── */
export default function Deploy() {
  const [hoveredLink, setHoveredLink] = useState(null)
  const [isFlying, setIsFlying] = useState(false)
  const [sent, setSent] = useState(false)

  const handleSendPing = () => {
    if (isFlying || sent) return
    setIsFlying(true)
  }

  const handleFlightEnd = () => {
    setIsFlying(false)
    setSent(true)
    // Reset back after a few seconds
    setTimeout(() => {
      setSent(false)
    }, 4000)
  }

  return (
    <section id="deploy" style={{ background: 'transparent' }}>
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
            maxWidth: '600px',
            lineHeight: 1.7,
            letterSpacing: '0.02em',
          }}>
            Initiating deployment pipeline... Ready to discuss opportunities, collaborate on full-stack web apps, content projects, or QA automation strategy.
          </p>
        </motion.div>

        {/* Constrained layout for single contact box */}
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: 0.15 }}
            style={{
              background: 'var(--color-bg-surface)',
              border: '1px solid var(--color-border-hairline)',
              borderRadius: '16px',
              padding: '2.25rem',
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

            {/* Links row */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem',
              position: 'relative',
              zIndex: 1,
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
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
                    whileHover={{
                      x: 6,
                      borderColor: 'rgba(74, 222, 154, 0.4)',
                      boxShadow: '0 6px 24px rgba(0,0,0,0.25), inset 0 0 0 1px rgba(74, 222, 154, 0.15)',
                    }}
                    whileTap={{ scale: 0.98 }}
                    onHoverStart={() => setHoveredLink(i)}
                    onHoverEnd={() => setHoveredLink(null)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      padding: '1rem 1.25rem',
                      borderRadius: '12px',
                      background: 'var(--color-bg-base)',
                      border: '1px solid var(--color-border-hairline)',
                      textDecoration: 'none',
                      cursor: 'pointer',
                      position: 'relative',
                      overflow: 'hidden',
                    }}
                  >
                    {/* Hover shimmer effect */}
                    <AnimatePresence>
                      {isHovered && (
                        <motion.div
                          initial={{ x: '-100%', opacity: 0.5 }}
                          animate={{ x: '200%', opacity: 0 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.7, ease: 'easeOut' }}
                          style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '50%',
                            height: '100%',
                            background: 'linear-gradient(90deg, transparent, rgba(74, 222, 154, 0.08), transparent)',
                            pointerEvents: 'none',
                            zIndex: 0,
                          }}
                        />
                      )}
                    </AnimatePresence>

                    <motion.div
                      animate={{
                        rotate: isHovered ? [0, -10, 10, 0] : 0,
                        scale: isHovered ? 1.15 : 1,
                      }}
                      transition={{ duration: 0.4 }}
                      style={{ position: 'relative', zIndex: 1, flexShrink: 0 }}
                    >
                      <Icon
                        size={18}
                        style={{ color: 'var(--color-accent-pass)' }}
                      />
                    </motion.div>

                    <span style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.82rem',
                      fontWeight: 500,
                      color: 'var(--color-text-primary)',
                      flex: 1,
                      letterSpacing: '0.02em',
                      position: 'relative',
                      zIndex: 1,
                    }}>
                      {link.label}
                    </span>

                    <AnimatePresence mode="wait">
                      {isHovered ? (
                        <motion.span
                          key="cta"
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 8 }}
                          transition={{ duration: 0.2 }}
                          style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.65rem',
                            fontWeight: 600,
                            color: 'var(--color-accent-pass)',
                            letterSpacing: '0.08em',
                            textTransform: 'uppercase',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            flexShrink: 0,
                            position: 'relative',
                            zIndex: 1,
                          }}
                        >
                          {link.cta}
                          <Send size={10} />
                        </motion.span>
                      ) : (
                        <motion.div
                          key="arrow"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.15 }}
                          style={{ position: 'relative', zIndex: 1 }}
                        >
                          <ArrowUpRight
                            size={14}
                            style={{ color: 'var(--color-text-muted)', flexShrink: 0 }}
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.a>
                )
              })}
            </div>

            {/* Separator / Divider */}
            <div style={{
              margin: '2rem 0 1.5rem 0',
              borderTop: '1px solid var(--color-border-hairline)',
              opacity: 0.6,
            }} />

            {/* 3D Envelope / Ping popup Interactive Box */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              position: 'relative',
              zIndex: 1,
            }}>
              <p style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                color: 'var(--color-text-muted)',
                marginBottom: '0.75rem',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
              }}>
                Interactive 3D Ping
              </p>

              {/* 3D Canvas Box inside the card */}
              <div
                onClick={handleSendPing}
                style={{
                  width: '100%',
                  height: '140px',
                  background: 'rgba(35, 44, 53, 0.3)',
                  border: '1px solid var(--color-border-hairline)',
                  borderRadius: '10px',
                  position: 'relative',
                  overflow: 'hidden',
                  cursor: isFlying || sent ? 'default' : 'pointer',
                  transition: 'border-color 0.3s ease, background 0.3s ease',
                }}
                onMouseEnter={e => {
                  if (!isFlying && !sent) {
                    e.currentTarget.style.borderColor = 'rgba(74, 222, 154, 0.35)'
                    e.currentTarget.style.background = 'rgba(35, 44, 53, 0.5)'
                  }
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'var(--color-border-hairline)'
                  e.currentTarget.style.background = 'rgba(35, 44, 53, 0.3)'
                }}
              >
                {/* 3D Canvas */}
                <Canvas camera={{ position: [0, 0, 2.2], fov: 45 }}>
                  <ambientLight intensity={0.9} />
                  <directionalLight position={[2, 3, 4]} intensity={1.5} color="#fff" />
                  <pointLight position={[-2, -2, -2]} intensity={0.5} color="#4ade80" />
                  
                  <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.4}>
                    <PaperPlane isFlying={isFlying} onFlightEnd={handleFlightEnd} />
                  </Float>
                  <ParticleTrail isFlying={isFlying} />
                </Canvas>

                {/* Status Overlay */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  pointerEvents: 'none',
                  background: sent ? 'rgba(15, 20, 25, 0.8)' : 'transparent',
                  transition: 'background 0.3s ease',
                }}>
                  <AnimatePresence mode="wait">
                    {sent ? (
                      <motion.div
                        key="sent"
                        initial={{ opacity: 0, scale: 0.8, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: -10 }}
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          gap: '6px',
                        }}
                      >
                        <div style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '50%',
                          background: 'rgba(74, 222, 154, 0.1)',
                          border: '1px solid rgba(74, 222, 154, 0.4)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'var(--color-accent-pass)',
                        }}>
                          <Check size={16} strokeWidth={3} />
                        </div>
                        <span style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          color: 'var(--color-text-primary)',
                          letterSpacing: '0.04em',
                        }}>
                          Ping Dispatched! 🚀
                        </span>
                      </motion.div>
                    ) : isFlying ? (
                      <motion.span
                        key="flying"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.8 }}
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.7rem',
                          color: 'var(--color-text-muted)',
                          letterSpacing: '0.05em',
                        }}
                      >
                        LAUNCHING...
                      </motion.span>
                    ) : (
                      <motion.span
                        key="idle"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.7rem',
                          color: 'var(--color-text-muted)',
                          letterSpacing: '0.05em',
                          opacity: 0.6,
                        }}
                      >
                        CLICK HERE TO FLY A PING
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
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
            Built with React + Three.js
          </p>
        </div>
      </div>
    </section>
  )
}
