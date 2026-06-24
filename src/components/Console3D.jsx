import React, { useRef, useState, useEffect, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { RoundedBox, Html, Environment, Float } from '@react-three/drei'
import * as THREE from 'three'
import ConsoleFallback from './ConsoleFallback'

const TERMINAL_LINES = [
  '$ npm run test:prod',
  '> Running suite...',
  '✓ 95% functional coverage',
  '✓ CI/CD: GitHub Actions',
  '✓ 4 projects passed',
  '✓ 3 quality gates verified',
  '0 failed tests.',
  'Deployment ready.',
]

/* ─── Typing simulation hook ─── */
function useTerminalTyping() {
  const [lines, setLines] = useState([])
  const [currentLine, setCurrentLine] = useState(0)
  const [currentChar, setCurrentChar] = useState(0)
  const [isTyping, setIsTyping] = useState(true)

  // Check for reduced motion preference
  const prefersReducedMotion = useMemo(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }, [])

  useEffect(() => {
    if (prefersReducedMotion) {
      setLines(TERMINAL_LINES)
      setIsTyping(false)
      return
    }

    if (!isTyping) return

    if (currentLine >= TERMINAL_LINES.length) {
      // Pause then restart
      const timeout = setTimeout(() => {
        setLines([])
        setCurrentLine(0)
        setCurrentChar(0)
      }, 3000)
      return () => clearTimeout(timeout)
    }

    const line = TERMINAL_LINES[currentLine]
    if (currentChar <= line.length) {
      const speed = currentChar === 0 ? 400 : (line.startsWith('$') ? 60 : 30)
      const timeout = setTimeout(() => {
        setLines(prev => {
          const newLines = [...prev]
          newLines[currentLine] = line.substring(0, currentChar)
          return newLines
        })
        setCurrentChar(c => c + 1)
      }, speed)
      return () => clearTimeout(timeout)
    } else {
      const timeout = setTimeout(() => {
        setCurrentLine(l => l + 1)
        setCurrentChar(0)
      }, 200)
      return () => clearTimeout(timeout)
    }
  }, [currentLine, currentChar, isTyping, prefersReducedMotion])

  return { lines, isComplete: currentLine >= TERMINAL_LINES.length, isTyping: isTyping && !prefersReducedMotion }
}

/* ─── Terminal Screen HTML overlay ─── */
function TerminalScreen() {
  const { lines, isTyping } = useTerminalTyping()

  return (
    <Html
      transform
      position={[0, 0.02, 0.49]}
      scale={0.18}
      style={{
        width: '380px',
        height: '240px',
        background: 'rgba(15, 20, 25, 0.95)',
        borderRadius: '4px',
        padding: '16px 20px',
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: '11px',
        lineHeight: '1.7',
        color: '#E8EAED',
        overflow: 'hidden',
        pointerEvents: 'none',
        userSelect: 'none',
      }}
    >
      {/* Terminal header bar */}
      <div style={{
        display: 'flex',
        gap: '6px',
        marginBottom: '12px',
        paddingBottom: '8px',
        borderBottom: '1px solid #232C35'
      }}>
        <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#E8615C' }} />
        <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#F2A93B' }} />
        <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#4ADE9A' }} />
        <span style={{ marginLeft: '8px', color: '#8B97A3', fontSize: '9px' }}>test-runner</span>
      </div>

      {/* Terminal lines */}
      {lines.map((line, i) => (
        <div key={i} style={{
          color: line?.startsWith('✓') ? '#4ADE9A' :
                 line?.startsWith('$') ? '#F2A93B' :
                 line?.includes('0 failed') ? '#4ADE9A' :
                 line?.includes('Deployment') ? '#4ADE9A' :
                 '#E8EAED',
          opacity: line ? 1 : 0.5,
          minHeight: '18px',
        }}>
          {line || ''}
          {i === lines.length - 1 && isTyping && (
            <span style={{
              display: 'inline-block',
              width: '7px',
              height: '13px',
              background: '#4ADE9A',
              marginLeft: '2px',
              verticalAlign: 'text-bottom',
              animation: 'blink 1s step-end infinite',
            }} />
          )}
        </div>
      ))}
    </Html>
  )
}

/* ─── Laptop Model (procedural geometry) ─── */
function LaptopModel() {
  const groupRef = useRef()
  const mouseRef = useRef({ x: 0, y: 0 })
  const { viewport } = useThree()

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useFrame((state, delta) => {
    if (!groupRef.current) return

    const time = state.clock.elapsedTime

    // Idle bobbing
    groupRef.current.position.y = Math.sin(time * 0.8) * 0.08

    // Mouse-driven tilt (max ~8 degrees ≈ 0.14 radians)
    const targetRotX = mouseRef.current.y * 0.10
    const targetRotY = mouseRef.current.x * 0.14

    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      -0.15 + targetRotX,
      delta * 8
    )
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      targetRotY,
      delta * 8
    )
  })

  // Metallic Space Grey material
  const metalMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#282e3d',
    metalness: 0.85,
    roughness: 0.25,
  }), [])

  // Glass material
  const glassMaterial = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: '#1a2535',
    metalness: 0.1,
    roughness: 0.05,
    transmission: 0.3,
    thickness: 0.05,
    clearcoat: 1,
    clearcoatRoughness: 0.1,
  }), [])

  // Screen background material
  const screenMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#0a0f14',
    metalness: 0,
    roughness: 1,
  }), [])

  // Bezel rim glow
  const glowMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#4ADE9A',
    emissive: '#4ADE9A',
    emissiveIntensity: 0.3,
    metalness: 0.5,
    roughness: 0.3,
  }), [])

  return (
    <group ref={groupRef} rotation={[-0.15, 0, 0]}>
      {/* ─── LAPTOP SCREEN/LID ─── */}
      <group position={[0, 0.1, 0]}>
        {/* Screen lid — outer shell */}
        <RoundedBox args={[2.6, 1.7, 0.06]} radius={0.04} smoothness={4} position={[0, 0, 0]}>
          <primitive object={metalMaterial} attach="material" />
        </RoundedBox>

        {/* Screen face */}
        <mesh position={[0, 0.02, 0.026]}>
          <planeGeometry args={[2.3, 1.4]} />
          <primitive object={screenMaterial} attach="material" />
        </mesh>

        {/* Glass overlay */}
        <mesh position={[0, 0.02, 0.031]}>
          <planeGeometry args={[2.35, 1.45]} />
          <primitive object={glassMaterial} attach="material" />
        </mesh>

        {/* Bezel accent glow line */}
        <mesh position={[0, -0.72, 0.033]}>
          <boxGeometry args={[1.4, 0.015, 0.005]} />
          <primitive object={glowMaterial} attach="material" />
        </mesh>

        {/* Terminal text overlay */}
        <TerminalScreen />
      </group>

      {/* ─── HINGE ─── */}
      <mesh position={[0, -0.8, 0.02]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.04, 0.04, 2.3, 16]} />
        <meshStandardMaterial color="#121622" roughness={0.85} metalness={0.7} />
      </mesh>

      {/* ─── LAPTOP BASE ─── */}
      <group position={[0, -0.88, 0.78]} rotation={[1.43, 0, 0]}>
        {/* Main Base Body */}
        <RoundedBox args={[2.7, 0.06, 1.75]} radius={0.04} smoothness={4} position={[0, 0, 0]}>
          <primitive object={metalMaterial} attach="material" />
        </RoundedBox>

        {/* Keyboard recess area */}
        <mesh position={[0, 0.031, -0.15]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[2.42, 0.92]} />
          <meshStandardMaterial color="#161c28" roughness={0.9} />
        </mesh>

        {/* Simulated keyboard key rows */}
        {[-0.32, -0.16, 0, 0.16, 0.32].map((zOffset, i) => (
          <mesh key={i} position={[0, 0.036, -0.15 + zOffset]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[2.36, 0.09]} />
            <meshStandardMaterial color="#0c0e15" roughness={0.7} />
          </mesh>
        ))}

        {/* Trackpad */}
        <RoundedBox args={[0.7, 0.005, 0.42]} radius={0.015} smoothness={4} position={[0, 0.032, 0.48]}>
          <meshStandardMaterial color="#1a202d" roughness={0.4} metalness={0.8} />
        </RoundedBox>

        {/* Front edge lip notch */}
        <mesh position={[0, -0.01, 0.88]}>
          <boxGeometry args={[0.3, 0.02, 0.02]} />
          <meshStandardMaterial color="#0c0e15" roughness={0.9} />
        </mesh>
      </group>
    </group>
  )
}

/* ─── Main Canvas Scene ─── */
function ConsoleScene() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} />
      <directionalLight position={[-3, 2, 4]} intensity={0.3} color="#4ADE9A" />
      <pointLight position={[0, -1, 3]} intensity={0.4} color="#F2A93B" />
      <LaptopModel />
      <Environment preset="city" environmentIntensity={0.15} />
    </>
  )
}

/* ─── Error Boundary for WebGL failures ─── */
class Console3DErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }
  static getDerivedStateFromError() {
    return { hasError: true }
  }
  componentDidCatch() {
    if (this.props.onError) this.props.onError()
  }
  render() {
    if (this.state.hasError) return <ConsoleFallback />
    return this.props.children
  }
}

/* ─── Exported Component ─── */
export default function Console3D({ onError }) {
  const [shouldRender3D, setShouldRender3D] = useState(true)

  useEffect(() => {
    // Detect mobile or low-power: skip 3D on small screens
    const isMobile = window.innerWidth < 768
    if (isMobile) {
      setShouldRender3D(false)
      if (onError) onError()
    }

    // Test WebGL availability
    try {
      const testCanvas = document.createElement('canvas')
      const gl = testCanvas.getContext('webgl2') || testCanvas.getContext('webgl')
      if (!gl) {
        setShouldRender3D(false)
        if (onError) onError()
      }
    } catch {
      setShouldRender3D(false)
      if (onError) onError()
    }
  }, [onError])

  if (!shouldRender3D) return <ConsoleFallback />

  return (
    <Console3DErrorBoundary onError={onError}>
      <div style={{ width: '100%', height: '100%', minHeight: '100%' }}>
        <Canvas
          camera={{ position: [0, 0, 4], fov: 35 }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true }}
          style={{ background: 'transparent' }}
          onCreated={({ gl }) => {
            gl.domElement.addEventListener('webglcontextlost', () => {
              if (onError) onError()
            })
          }}
        >
          <ConsoleScene />
        </Canvas>
      </div>
    </Console3DErrorBoundary>
  )
}

