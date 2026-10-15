import { useRef, useState, useEffect, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Html, Float } from '@react-three/drei'
import * as THREE from 'three'

/* ─── Wax / QA Quality Seal Mesh ─── */
function WaxSeal({ isStamped, onClick }) {
  const sealRef = useRef()

  useFrame((_, delta) => {
    if (sealRef.current) {
      sealRef.current.rotation.z += delta * 0.2
    }
  })

  return (
    <group position={[0.75, -1.2, 0.02]} onClick={onClick}>
      {/* Outer scalloped wax edge */}
      <mesh ref={sealRef}>
        <cylinderGeometry args={[0.34, 0.36, 0.04, 24]} />
        <meshStandardMaterial
          color="#9E2A2B"
          roughness={0.35}
          metalness={0.2}
        />
      </mesh>

      {/* Inner embossed gold core */}
      <mesh position={[0, 0, 0.025]}>
        <cylinderGeometry args={[0.26, 0.26, 0.02, 32]} />
        <meshStandardMaterial
          color="#D4AF37"
          roughness={0.25}
          metalness={0.85}
        />
      </mesh>

      {/* Seal HTML Stamp Text */}
      <Html
        transform
        distanceFactor={3.6}
        position={[0, 0, 0.04]}
        style={{
          pointerEvents: 'none',
          userSelect: 'none',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '70px',
          height: '70px',
        }}
      >
        <div
          style={{
            fontFamily: 'var(--font-mono, monospace)',
            fontSize: '7px',
            fontWeight: 800,
            color: '#3B0909',
            letterSpacing: '0.08em',
            textAlign: 'center',
            lineHeight: 1.1,
          }}
        >
          {isStamped ? 'SEALED' : 'QA PASS'}
          <div style={{ fontSize: '9px', marginTop: '1px' }}>✔</div>
        </div>
      </Html>
    </group>
  )
}

/* ─── Interactive Origami Sheet / Paper Airplane ─── */
function OrigamiLetter({
  senderName,
  senderEmail,
  message,
  topic,
  flightPhase, // 'draft' | 'folding' | 'flying' | 'delivered'
  onFlightComplete,
  isStamped,
  onStamp,
}) {
  const rootGroupRef = useRef()
  const leftWingRef = useRef()
  const rightWingRef = useRef()
  const leftNoseRef = useRef()
  const rightNoseRef = useRef()

  // Flight trajectory & folding progress states
  const foldProgress = useRef(0)
  const flightProgress = useRef(0)
  const [trailPoints, setTrailPoints] = useState([])

  // Reset or run animations
  useEffect(() => {
    if (flightPhase === 'draft') {
      foldProgress.current = 0
      flightProgress.current = 0
    }
  }, [flightPhase])

  useFrame((state, delta) => {
    if (!rootGroupRef.current) return

    // ─── 1. DRAFT PHASE: Gentle cursor parallax tilt ───
    if (flightPhase === 'draft') {
      const targetTiltX = -state.pointer.y * 0.28
      const targetTiltY = state.pointer.x * 0.35

      rootGroupRef.current.rotation.x = THREE.MathUtils.damp(
        rootGroupRef.current.rotation.x,
        targetTiltX,
        5,
        delta
      )
      rootGroupRef.current.rotation.y = THREE.MathUtils.damp(
        rootGroupRef.current.rotation.y,
        targetTiltY,
        5,
        delta
      )
      rootGroupRef.current.rotation.z = 0
      rootGroupRef.current.position.set(0, 0, 0)

      // Keep wings flat
      if (leftWingRef.current) leftWingRef.current.rotation.y = 0
      if (rightWingRef.current) rightWingRef.current.rotation.y = 0
      if (leftNoseRef.current) leftNoseRef.current.rotation.z = 0
      if (rightNoseRef.current) rightNoseRef.current.rotation.z = 0
    }

    // ─── 2. FOLDING PHASE: Crease paper into glider ───
    if (flightPhase === 'folding') {
      foldProgress.current = Math.min(1, foldProgress.current + delta * 1.6)
      const p = foldProgress.current

      // Nose corners fold in
      if (leftNoseRef.current) {
        leftNoseRef.current.rotation.z = -p * (Math.PI * 0.75)
      }
      if (rightNoseRef.current) {
        rightNoseRef.current.rotation.z = p * (Math.PI * 0.75)
      }

      // Wings fold down to form dihedral wings
      if (leftWingRef.current) {
        leftWingRef.current.rotation.y = p * 1.75
        leftWingRef.current.rotation.z = -p * 0.35
      }
      if (rightWingRef.current) {
        rightWingRef.current.rotation.y = -p * 1.75
        rightWingRef.current.rotation.z = p * 0.35
      }

      // Lift slightly and center
      rootGroupRef.current.rotation.x = THREE.MathUtils.lerp(0, 0.4, p)
      rootGroupRef.current.rotation.y = THREE.MathUtils.lerp(0, 0, p)
    }

    // ─── 3. FLYING PHASE: Swoop, loop & launch into distance ───
    if (flightPhase === 'flying') {
      flightProgress.current += delta * 0.75
      const t = flightProgress.current

      // Flight curve: take off, bank to right, loop upwards and disappear
      const x = Math.sin(t * Math.PI) * 4.5
      const y = Math.sin(t * Math.PI * 1.5) * 2.2 + t * 4
      const z = -t * 12.0

      rootGroupRef.current.position.set(x, y, z)

      // Aerodynamic banking & pitch
      rootGroupRef.current.rotation.z = -Math.cos(t * Math.PI) * 0.8
      rootGroupRef.current.rotation.x = 0.5 - t * 0.4
      rootGroupRef.current.rotation.y = Math.sin(t * Math.PI) * 0.6

      // Scale down slightly as it reaches horizon
      const scale = Math.max(0.01, 1 - t * 0.6)
      rootGroupRef.current.scale.set(scale, scale, scale)

      if (t >= 1.4 && onFlightComplete) {
        onFlightComplete()
      }
    }
  })

  // Display snippet of message
  const previewMessage = message.trim()
    ? (message.length > 130 ? message.slice(0, 130) + '...' : message)
    : 'Waiting for sender to pen thoughts into the dispatch log...'

  return (
    <group ref={rootGroupRef}>
      {/* ─── CENTRAL KEEL / FUSELAGE ─── */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.5, 3.8, 0.02]} />
        <meshStandardMaterial
          color="#F9F6EE"
          roughness={0.4}
          metalness={0.05}
        />
      </mesh>

      {/* Gold Foil Top/Bottom Trim Line */}
      <mesh position={[0, 1.88, 0.012]}>
        <planeGeometry args={[2.8, 0.04]} />
        <meshBasicMaterial color="#D4AF37" />
      </mesh>
      <mesh position={[0, -1.88, 0.012]}>
        <planeGeometry args={[2.8, 0.04]} />
        <meshBasicMaterial color="#D4AF37" />
      </mesh>

      {/* ─── LEFT WING (Pivoting panel) ─── */}
      <group position={[-0.25, 0, 0]} ref={leftWingRef}>
        <mesh position={[-0.6, 0, 0]}>
          <boxGeometry args={[1.2, 3.8, 0.018]} />
          <meshStandardMaterial
            color="#FCFBF7"
            roughness={0.45}
            metalness={0.02}
          />
        </mesh>

        {/* Left Folding Nose Flap */}
        <group position={[-1.2, 1.9, 0]} ref={leftNoseRef}>
          <mesh position={[0.4, -0.4, 0.005]}>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                args={[
                  new Float32Array([
                    0, 0, 0,
                    0.8, 0, 0,
                    0, -0.8, 0,
                  ]),
                  3,
                ]}
              />
            </bufferGeometry>
            <meshStandardMaterial color="#EFECE3" roughness={0.5} side={THREE.DoubleSide} />
          </mesh>
        </group>
      </group>

      {/* ─── RIGHT WING (Pivoting panel) ─── */}
      <group position={[0.25, 0, 0]} ref={rightWingRef}>
        <mesh position={[0.6, 0, 0]}>
          <boxGeometry args={[1.2, 3.8, 0.018]} />
          <meshStandardMaterial
            color="#FCFBF7"
            roughness={0.45}
            metalness={0.02}
          />
        </mesh>

        {/* Right Folding Nose Flap */}
        <group position={[1.2, 1.9, 0]} ref={rightNoseRef}>
          <mesh position={[-0.4, -0.4, 0.005]}>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                args={[
                  new Float32Array([
                    0, 0, 0,
                    -0.8, 0, 0,
                    0, -0.8, 0,
                  ]),
                  3,
                ]}
              />
            </bufferGeometry>
            <meshStandardMaterial color="#EFECE3" roughness={0.5} side={THREE.DoubleSide} />
          </mesh>
        </group>
      </group>

      {/* ─── PHYSICAL WAX / QA QUALITY SEAL ─── */}
      <WaxSeal isStamped={isStamped} onClick={onStamp} />

      {/* ─── CRISP WRITTEN TEXT ON STATIONERY (Visible in draft) ─── */}
      {flightPhase === 'draft' && (
        <Html
          transform
          distanceFactor={3.6}
          position={[0, 0, 0.02]}
          style={{
            width: '290px',
            height: '400px',
            pointerEvents: 'none',
            userSelect: 'none',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '24px 20px',
            boxSizing: 'border-box',
            fontFamily: 'Georgia, serif',
            color: '#1C242B',
          }}
        >
          {/* Letterhead */}
          <div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline',
                borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
                paddingBottom: '8px',
                marginBottom: '14px',
              }}
            >
              <div>
                <div style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: '8px', letterSpacing: '0.12em', color: '#6A7885' }}>
                  DISPATCH TO: KISHOR GOGOI
                </div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#111827', letterSpacing: '-0.01em' }}>
                  Letter of Intent
                </div>
              </div>
              <div style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: '7.5px', color: '#6A7885' }}>
                AIR-MAIL // 2026
              </div>
            </div>

            {/* Field Rows */}
            <div style={{ fontSize: '10px', lineHeight: 1.5, color: '#374151' }}>
              <div>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '8px', color: '#8291A0' }}>FROM: </span>
                <strong>{senderName || 'Anonymous Sender'}</strong>
              </div>
              {senderEmail && (
                <div>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '8px', color: '#8291A0' }}>RETURN: </span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px' }}>{senderEmail}</span>
                </div>
              )}
              <div>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '8px', color: '#8291A0' }}>REGARDING: </span>
                <span style={{ color: '#0284C7', fontWeight: 600 }}>{topic}</span>
              </div>
            </div>
          </div>

          {/* Letter Body: Handwritten ink feeling */}
          <div
            style={{
              fontStyle: 'italic',
              fontSize: '11px',
              lineHeight: 1.6,
              color: '#1F2937',
              margin: 'auto 0',
              padding: '6px 0',
              borderLeft: '2px solid rgba(74, 222, 154, 0.4)',
              paddingLeft: '10px',
            }}
          >
            “{previewMessage}”
          </div>

          {/* Stamp Prompt at bottom */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '7.5px', color: '#8291A0' }}>
              {isStamped ? '✔ QUALITY SEAL APPLIED' : 'CLICK WAX TO STAMP'}
            </div>
          </div>
        </Html>
      )}
    </group>
  )
}

/* ─── Ambient Flight Dust / Vapor Motifs ─── */
function AirStream({ flightPhase }) {
  const pointsRef = useRef()

  const particles = useMemo(() => {
    const pos = new Float32Array(60 * 3)
    for (let i = 0; i < 60; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 8
      pos[i * 3 + 1] = (Math.random() - 0.5) * 6
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8
    }
    return pos
  }, [])

  useFrame((_, delta) => {
    if (!pointsRef.current) return
    const speed = flightPhase === 'flying' ? 3.5 : 0.25
    pointsRef.current.rotation.y += delta * speed * 0.1
    pointsRef.current.position.z += delta * speed * 2
    if (pointsRef.current.position.z > 5) {
      pointsRef.current.position.z = -5
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[particles, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color={flightPhase === 'flying' ? '#38BDF8' : '#D4AF37'}
        transparent
        opacity={flightPhase === 'flying' ? 0.7 : 0.3}
      />
    </points>
  )
}

/* ─── Canvas Export ─── */
export default function Contact3DCanvas({
  senderName = '',
  senderEmail = '',
  message = '',
  topic = 'QA Automation & SDET',
  flightPhase = 'draft',
  onFlightComplete,
  isStamped = false,
  onStamp,
}) {
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', minHeight: '520px' }}>
      <Canvas
        camera={{ position: [0, 0, 4.25], fov: 44 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        {/* Soft Studio Desk Lighting */}
        <ambientLight intensity={0.8} />
        <directionalLight position={[4, 6, 4]} intensity={1.4} color="#FFF8EB" />
        <pointLight position={[-4, -3, 2]} intensity={0.6} color="#38BDF8" />
        <spotLight
          position={[0, 5, 3]}
          angle={0.6}
          penumbra={0.8}
          intensity={1.2}
          color="#FFFFFF"
        />

        <Float
          speed={flightPhase === 'draft' ? 1.5 : 0}
          rotationIntensity={flightPhase === 'draft' ? 0.15 : 0}
          floatIntensity={flightPhase === 'draft' ? 0.25 : 0}
        >
          <OrigamiLetter
            senderName={senderName}
            senderEmail={senderEmail}
            message={message}
            topic={topic}
            flightPhase={flightPhase}
            onFlightComplete={onFlightComplete}
            isStamped={isStamped}
            onStamp={onStamp}
          />
        </Float>

        <AirStream flightPhase={flightPhase} />
      </Canvas>
    </div>
  )
}
