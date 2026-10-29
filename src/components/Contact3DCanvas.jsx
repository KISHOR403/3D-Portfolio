import { useRef, useState, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { RoundedBox, Html } from '@react-three/drei'
import * as THREE from 'three'
import profileImg from '../assets/profile.jpg'

/* ─── Moving Woven Lanyard Band (Ribbon Straps) ─── */
function LanyardBand({ clipPos }) {
  const leftStrapRef = useRef()
  const rightStrapRef = useRef()

  // Top anchor points (hanging from neck/top of screen)
  const topAnchorLeft = useMemo(() => new THREE.Vector3(-0.95, 3.4, -0.2), [])
  const topAnchorRight = useMemo(() => new THREE.Vector3(0.95, 3.4, -0.2), [])

  useFrame(() => {
    if (!leftStrapRef.current || !rightStrapRef.current) return

    const bottomClip = new THREE.Vector3(clipPos.current.x, clipPos.current.y, clipPos.current.z)

    // Left woven band curve
    const leftCurve = new THREE.QuadraticBezierCurve3(
      topAnchorLeft,
      new THREE.Vector3(
        (topAnchorLeft.x + bottomClip.x) * 0.5 - 0.15,
        (topAnchorLeft.y + bottomClip.y) * 0.5,
        (topAnchorLeft.z + bottomClip.z) * 0.5 + 0.1
      ),
      bottomClip
    )
    leftStrapRef.current.geometry.dispose()
    leftStrapRef.current.geometry = new THREE.TubeGeometry(leftCurve, 24, 0.07, 8, false)

    // Right woven band curve
    const rightCurve = new THREE.QuadraticBezierCurve3(
      topAnchorRight,
      new THREE.Vector3(
        (topAnchorRight.x + bottomClip.x) * 0.5 + 0.15,
        (topAnchorRight.y + bottomClip.y) * 0.5,
        (topAnchorRight.z + bottomClip.z) * 0.5 + 0.1
      ),
      bottomClip
    )
    rightStrapRef.current.geometry.dispose()
    rightStrapRef.current.geometry = new THREE.TubeGeometry(rightCurve, 24, 0.07, 8, false)
  })

  return (
    <group>
      {/* Left Woven Strap */}
      <mesh ref={leftStrapRef}>
        <tubeGeometry args={[new THREE.LineCurve3(topAnchorLeft, new THREE.Vector3(0, 1.3, 0)), 24, 0.07, 8, false]} />
        <meshStandardMaterial
          color="#303437"
          emissive="#A8AA9F"
          emissiveIntensity={0.08}
          roughness={0.6}
          metalness={0.25}
        />
      </mesh>

      {/* Right Woven Strap */}
      <mesh ref={rightStrapRef}>
        <tubeGeometry args={[new THREE.LineCurve3(topAnchorRight, new THREE.Vector3(0, 1.3, 0)), 24, 0.07, 8, false]} />
        <meshStandardMaterial
          color="#303437"
          emissive="#A8AA9F"
          emissiveIntensity={0.08}
          roughness={0.6}
          metalness={0.25}
        />
      </mesh>
    </group>
  )
}

/* ─── Hanging 3D ID Card with Physics Pendulum ─── */
function HangingIDCard({ isFlipped, onToggleFlip, clipPosRef, onCardAction }) {
  const badgeRef = useRef()
  const [hovered, setHovered] = useState(false)
  const lastPointer = useRef({ x: 0, y: 0 })

  useFrame((state, delta) => {
    if (!badgeRef.current) return

    const t = state.clock.getElapsedTime()
    const pX = state.pointer.x
    const pY = state.pointer.y

    // Pointer velocity calculation for realistic swing momentum
    const velX = (pX - lastPointer.current.x) / (delta || 0.016)
    lastPointer.current = { x: pX, y: pY }

    // Natural pendulum breathing swing
    const idleSwingX = Math.sin(t * 1.5) * 0.05
    const idleSwingZ = Math.cos(t * 1.2) * 0.03

    // Target positions with spring physics
    const targetX = pX * 0.85 + idleSwingX
    const targetY = -0.25 + pY * 0.35
    const targetRotZ = -velX * 0.035 + Math.sin(t * 2) * 0.025
    const targetRotY = pX * 0.4 + (isFlipped ? Math.PI : 0)
    const targetRotX = -pY * 0.3 + 0.06

    // Smooth damp towards targets
    badgeRef.current.position.x = THREE.MathUtils.damp(badgeRef.current.position.x, targetX, 5, delta)
    badgeRef.current.position.y = THREE.MathUtils.damp(badgeRef.current.position.y, targetY, 5, delta)

    badgeRef.current.rotation.x = THREE.MathUtils.damp(badgeRef.current.rotation.x, targetRotX, 6, delta)
    badgeRef.current.rotation.y = THREE.MathUtils.damp(badgeRef.current.rotation.y, targetRotY, 6, delta)
    badgeRef.current.rotation.z = THREE.MathUtils.damp(badgeRef.current.rotation.z, targetRotZ, 5, delta)

    // Update clip position for the lanyard band connection
    clipPosRef.current = {
      x: badgeRef.current.position.x,
      y: badgeRef.current.position.y + 2.15,
      z: badgeRef.current.position.z,
    }
  })

  return (
    <group ref={badgeRef} position={[0, -0.25, 0]}>
      {/* ─── Titanium Swivel Clip Hardware ─── */}
      <group position={[0, 2.15, 0]}>
        {/* Metal ring connecting to lanyard band */}
        <mesh position={[0, 0.22, 0]}>
          <torusGeometry args={[0.2, 0.045, 16, 32]} />
          <meshStandardMaterial color="#CBD5E1" metalness={0.95} roughness={0.15} />
        </mesh>
        {/* Swivel cylinder */}
        <mesh position={[0, 0.06, 0]}>
          <cylinderGeometry args={[0.11, 0.11, 0.2, 16]} />
          <meshStandardMaterial color="#64748B" metalness={0.9} roughness={0.2} />
        </mesh>
        {/* Lobster claw clip through card punch hole */}
        <mesh position={[0, -0.16, 0]}>
          <torusGeometry args={[0.15, 0.035, 16, 32]} />
          <meshStandardMaterial color="#CBD5E1" metalness={0.95} roughness={0.15} />
        </mesh>
      </group>

      {/* ─── Solid Card Slab (Matte Obsidian) ─── */}
      <RoundedBox
        args={[3.3, 4.3, 0.08]}
        radius={0.16}
        smoothness={6}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={onToggleFlip}
      >
        <meshStandardMaterial
          color="#17191B"
          roughness={0.25}
          metalness={0.8}
        />
      </RoundedBox>

      {/* Card Top Punch Hole */}
      <mesh position={[0, 1.9, 0]}>
        <cylinderGeometry args={[0.16, 0.16, 0.1, 24]} rotation={[Math.PI / 2, 0, 0]} />
        <meshBasicMaterial color="#303437" />
      </mesh>

      {/* Subtle Chamfer Highlight */}
      <mesh position={[0, 0, 0]}>
        <planeGeometry args={[3.32, 4.32]} />
        <meshBasicMaterial
          color={hovered ? '#657D6B' : '#303437'}
          wireframe
          transparent
          opacity={hovered ? 0.35 : 0.15}
        />
      </mesh>

      {/* ─── FRONT FACE CONTENT (Only visible when NOT flipped) ─── */}
      {!isFlipped && (
        <group position={[0, 0, 0.045]}>
          <Html
            transform
            distanceFactor={3.6}
            position={[0, 0, 0.01]}
            style={{
              width: '310px',
              height: '400px',
              pointerEvents: 'auto',
              userSelect: 'none',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: '20px 18px',
              boxSizing: 'border-box',
              fontFamily: 'var(--font-sans, sans-serif)',
            }}
          >
            {/* Header Status */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#91A797', boxShadow: '0 0 8px #91A797', display: 'inline-block' }} />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '8.5px', fontWeight: 700, color: '#91A797', letterSpacing: '0.12em' }}>
                  VERIFIED QA ENGINEER
                </span>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onToggleFlip()
                }}
                style={{
                  background: 'var(--color-surface-hover)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '6px',
                  padding: '3px 8px',
                  color: 'var(--color-text-primary)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '8px',
                  cursor: 'pointer',
                }}
              >
                FLIP ↷
              </button>
            </div>

            {/* Profile Photo & Name Section */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', margin: 'auto 0 10px 0' }}>
              <div
                style={{
                  width: '68px',
                  height: '68px',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  border: '2px solid rgba(145, 167, 151, 0.5)',
                  boxShadow: '0 0 14px rgba(145, 167, 151, 0.25)',
                  flexShrink: 0,
                  background: 'var(--color-surface)',
                }}
              >
                <img
                  src={profileImg}
                  alt="Kishor Gogoi"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>

              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '19px', fontWeight: 800, color: 'var(--color-text-primary)', lineHeight: 1.1 }}>
                  Kishor Gogoi
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: '#38BDF8', fontWeight: 600, marginTop: '3px' }}>
                  SDET & Full-Stack QA
                </div>
                <div style={{ fontSize: '8.5px', color: 'var(--color-text-secondary)', marginTop: '2px' }}>
                  Automation Architect · CI/CD
                </div>
              </div>
            </div>

            {/* Skill Tags */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '8px' }}>
              {['Selenium', 'Java', 'Playwright', 'React', 'CI/CD'].map((s) => (
                <span
                  key={s}
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '7.5px',
                    padding: '2px 6px',
                    borderRadius: '4px',
                    background: 'var(--color-surface-hover)',
                    border: '1px solid var(--color-border)',
                    color: 'var(--color-text-primary)',
                  }}
                >
                  {s}
                </span>
              ))}
            </div>

            {/* Bottom ID Barcode */}
            <div
              style={{
                background: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                borderRadius: '8px',
                padding: '7px 10px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '7px', color: 'var(--color-text-secondary)' }}>ID: KG-403-2026</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '7.5px', color: '#91A797', fontWeight: 600 }}>
                  Bangalore · IST Online
                </div>
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '7.5px', color: 'var(--color-text-secondary)' }}>
                TAP TO FLIP ↷
              </div>
            </div>
          </Html>
        </group>
      )}

      {/* ─── BACK FACE CONTENT (Only visible when flipped) ─── */}
      {isFlipped && (
        <group position={[0, 0, -0.045]} rotation={[0, Math.PI, 0]}>
          <Html
            transform
            distanceFactor={3.6}
            position={[0, 0, 0.01]}
            style={{
              width: '310px',
              height: '400px',
              pointerEvents: 'auto',
              userSelect: 'none',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: '20px 18px',
              boxSizing: 'border-box',
              fontFamily: 'var(--font-sans, sans-serif)',
            }}
          >
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '8.5px', fontWeight: 700, color: '#38BDF8', letterSpacing: '0.1em' }}>
                DIRECT CHANNELS
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onToggleFlip()
                }}
                style={{
                  background: 'var(--color-surface-hover)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '6px',
                  padding: '3px 8px',
                  color: 'var(--color-text-primary)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '8px',
                  cursor: 'pointer',
                }}
              >
                FRONT ↶
              </button>
            </div>

            {/* Direct Contact Cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', margin: 'auto 0' }}>
              <div
                onClick={(e) => {
                  e.stopPropagation()
                  onCardAction('copy-email')
                }}
                style={{
                background: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                  borderRadius: '8px',
                  padding: '8px 10px',
                  cursor: 'pointer',
                }}
              >
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '7px', color: 'var(--color-text-secondary)' }}>PRIMARY EMAIL</div>
                <div style={{ fontSize: '10.5px', fontWeight: 600, color: 'var(--color-text-primary)', marginTop: '2px' }}>
                  kishorgogoi403@gmail.com
                </div>
              </div>

              <div
                onClick={(e) => {
                  e.stopPropagation()
                  onCardAction('linkedin')
                }}
                style={{
                background: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                  borderRadius: '8px',
                  padding: '8px 10px',
                  cursor: 'pointer',
                }}
              >
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '7px', color: 'var(--color-text-secondary)' }}>LINKEDIN PROFILE</div>
                <div style={{ fontSize: '10.5px', fontWeight: 600, color: 'var(--color-text-primary)', marginTop: '2px' }}>
                  linkedin.com/in/kishorgogoi
                </div>
              </div>

              <div
                onClick={(e) => {
                  e.stopPropagation()
                  onCardAction('github')
                }}
                style={{
                background: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                  borderRadius: '8px',
                  padding: '8px 10px',
                  cursor: 'pointer',
                }}
              >
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '7px', color: 'var(--color-text-secondary)' }}>GITHUB REPOSITORIES</div>
                <div style={{ fontSize: '10.5px', fontWeight: 600, color: 'var(--color-text-primary)', marginTop: '2px' }}>
                  github.com/KISHOR403
                </div>
              </div>
            </div>

            {/* Bottom Certification */}
            <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: '7px', color: 'var(--color-text-secondary)' }}>
              <span>PASSPORT: #KG-8842</span>
              <span style={{ color: '#91A797' }}>100% QUALITY GATES PASS</span>
            </div>
          </Html>
        </group>
      )}
    </group>
  )
}

/* ─── Canvas Wrapper with Studio Lighting ─── */
export default function Contact3DCanvas({ onCardAction }) {
  const [isFlipped, setIsFlipped] = useState(false)
  const clipPosRef = useRef({ x: 0, y: 1.45, z: 0 })

  const toggleFlip = () => setIsFlipped((prev) => !prev)

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', minHeight: '560px' }}>
      <Canvas
        camera={{ position: [0, 0.45, 6.4], fov: 44 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        {/* Studio Lighting */}
        <ambientLight intensity={0.8} />
        <directionalLight position={[4, 6, 4]} intensity={1.5} color="#FFFFFF" />
        <pointLight position={[-4, -3, 2]} intensity={0.8} color="#38BDF8" />
        <pointLight position={[0, -4, 2]} intensity={0.6} color="#91A797" />

        {/* Dynamic Moving Lanyard Band (Ribbon Straps) */}
        <LanyardBand clipPos={clipPosRef} />

        {/* 3D Hanging ID Card with Physics Pendulum Motion */}
        <HangingIDCard
          isFlipped={isFlipped}
          onToggleFlip={toggleFlip}
          clipPosRef={clipPosRef}
          onCardAction={onCardAction}
        />
      </Canvas>
    </div>
  )
}
