import { useRef, useState, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { RoundedBox, Html, Float } from '@react-three/drei'
import * as THREE from 'three'

/* ─── Web Audio Haptic Sound Synthesizer ─── */
function playHapticSound(type = 'click') {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext
    if (!AudioContext) return
    const ctx = new AudioContext()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    if (type === 'click') {
      osc.type = 'triangle'
      osc.frequency.setValueAtTime(900, ctx.currentTime)
      osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.04)
      gain.gain.setValueAtTime(0.15, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05)
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start()
      osc.stop(ctx.currentTime + 0.05)
    } else if (type === 'beep') {
      osc.type = 'sine'
      osc.frequency.setValueAtTime(1400, ctx.currentTime)
      gain.gain.setValueAtTime(0.12, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.09)
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start()
      osc.stop(ctx.currentTime + 0.09)
    } else if (type === 'dial') {
      osc.type = 'square'
      osc.frequency.setValueAtTime(500, ctx.currentTime)
      gain.gain.setValueAtTime(0.06, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.03)
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start()
      osc.stop(ctx.currentTime + 0.03)
    }
  } catch (e) {
    // Audio autoplay restrictions or silent mode
  }
}

/* ─── Mechanical Push Key ─── */
function MechanicalKey({ position, label, sub, color = '#38BDF8', onClick }) {
  const [pressed, setPressed] = useState(false)
  const keyMeshRef = useRef()

  useFrame((_, delta) => {
    if (!keyMeshRef.current) return
    const targetY = pressed ? position[1] - 0.06 : position[1]
    keyMeshRef.current.position.y = THREE.MathUtils.damp(
      keyMeshRef.current.position.y,
      targetY,
      12,
      delta
    )
  })

  const handleClick = (e) => {
    e.stopPropagation()
    playHapticSound('click')
    setPressed(true)
    setTimeout(() => setPressed(false), 140)
    if (onClick) onClick()
  }

  return (
    <group position={[position[0], position[1], position[2]]}>
      <mesh
        ref={keyMeshRef}
        onClick={handleClick}
        onPointerOver={() => (document.body.style.cursor = 'pointer')}
        onPointerOut={() => (document.body.style.cursor = 'auto')}
      >
        <boxGeometry args={[1.25, 0.55, 0.22]} />
        <meshStandardMaterial
          color="#182029"
          roughness={0.3}
          metalness={0.7}
          emissive={color}
          emissiveIntensity={pressed ? 0.8 : 0.15}
        />
      </mesh>

      {/* Key Cap Label */}
      <Html
        transform
        distanceFactor={3.6}
        position={[0, 0, 0.14]}
        style={{
          pointerEvents: 'none',
          userSelect: 'none',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100px',
        }}
      >
        <div
          style={{
            fontFamily: 'var(--font-mono, monospace)',
            fontSize: '8.5px',
            fontWeight: 700,
            color: '#FFFFFF',
            letterSpacing: '0.06em',
            textAlign: 'center',
            lineHeight: 1.1,
          }}
        >
          {label}
          {sub && (
            <div style={{ fontSize: '7px', color, marginTop: '2px', fontWeight: 500 }}>
              {sub}
            </div>
          )}
        </div>
      </Html>
    </group>
  )
}

/* ─── Rotary Selector Dial ─── */
function RotaryDial({ position, channelIndex, onRotate }) {
  const dialRef = useRef()

  useFrame((_, delta) => {
    if (!dialRef.current) return
    const targetRotation = channelIndex * (Math.PI / 2.5)
    dialRef.current.rotation.z = THREE.MathUtils.damp(
      dialRef.current.rotation.z,
      targetRotation,
      8,
      delta
    )
  })

  const handleClick = (e) => {
    e.stopPropagation()
    playHapticSound('dial')
    if (onRotate) onRotate()
  }

  return (
    <group position={position} onClick={handleClick}>
      <mesh
        ref={dialRef}
        onPointerOver={() => (document.body.style.cursor = 'pointer')}
        onPointerOut={() => (document.body.style.cursor = 'auto')}
      >
        <cylinderGeometry args={[0.38, 0.42, 0.2, 32]} />
        <meshStandardMaterial
          color="#2C3744"
          roughness={0.2}
          metalness={0.9}
        />
      </mesh>

      {/* Knurled Notch Marker */}
      <mesh position={[0, 0.28, 0.11]}>
        <boxGeometry args={[0.06, 0.18, 0.05]} />
        <meshBasicMaterial color="#4ADE9A" />
      </mesh>
    </group>
  )
}

/* ─── Main 3D Cyber Pager / Device ─── */
function CyberCommunicator({
  activeChannel,
  onSelectChannel,
  screenMessage,
  onAction,
}) {
  const deviceRef = useRef()

  // Gentle physical tilt tracking mouse
  useFrame((state, delta) => {
    if (!deviceRef.current) return
    const pX = state.pointer.x
    const pY = state.pointer.y

    deviceRef.current.rotation.x = THREE.MathUtils.damp(
      deviceRef.current.rotation.x,
      -pY * 0.35 + 0.15,
      5,
      delta
    )
    deviceRef.current.rotation.y = THREE.MathUtils.damp(
      deviceRef.current.rotation.y,
      pX * 0.45,
      5,
      delta
    )
  })

  const channels = ['EMAIL', 'LINKEDIN', 'GITHUB', 'PING']

  const handleNextChannel = () => {
    const nextIdx = (channels.indexOf(activeChannel) + 1) % channels.length
    onSelectChannel(channels[nextIdx])
  }

  return (
    <group ref={deviceRef}>
      {/* ─── Chassis Body (Matte Slate & Anodized Aluminum) ─── */}
      <RoundedBox args={[3.8, 5.4, 0.42]} radius={0.22} smoothness={8}>
        <meshStandardMaterial
          color="#11171E"
          roughness={0.35}
          metalness={0.8}
        />
      </RoundedBox>

      {/* Decorative Metallic Corner Accents */}
      <mesh position={[0, 2.58, 0]}>
        <boxGeometry args={[3.2, 0.05, 0.44]} />
        <meshStandardMaterial color="#222C38" metalness={0.95} roughness={0.2} />
      </mesh>
      <mesh position={[0, -2.58, 0]}>
        <boxGeometry args={[3.2, 0.05, 0.44]} />
        <meshStandardMaterial color="#222C38" metalness={0.95} roughness={0.2} />
      </mesh>

      {/* Antenna Stub (Top Right) */}
      <group position={[1.4, 2.8, 0]}>
        <mesh>
          <cylinderGeometry args={[0.08, 0.08, 0.5, 16]} />
          <meshStandardMaterial color="#2A3542" metalness={0.9} roughness={0.2} />
        </mesh>
        <mesh position={[0, 0.28, 0]}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial color="#E8615C" emissive="#E8615C" emissiveIntensity={0.6} />
        </mesh>
      </group>

      {/* ─── Rotary Channel Selector Dial (Top Left) ─── */}
      <RotaryDial
        position={[-1.25, 2.1, 0.22]}
        channelIndex={channels.indexOf(activeChannel)}
        onRotate={handleNextChannel}
      />

      {/* Status LED (Top Center) */}
      <mesh position={[0, 2.15, 0.22]}>
        <sphereGeometry args={[0.07, 16, 16]} />
        <meshBasicMaterial color="#4ADE9A" />
      </mesh>

      {/* ─── OLED Screen Frame ─── */}
      <mesh position={[0, 0.8, 0.21]}>
        <boxGeometry args={[3.2, 2.0, 0.04]} />
        <meshStandardMaterial color="#0A0E13" roughness={0.2} metalness={0.9} />
      </mesh>

      {/* OLED Screen Display (Embedded HTML with Scanlines & Telemetry) */}
      <Html
        transform
        distanceFactor={3.6}
        position={[0, 0.8, 0.24]}
        style={{
          width: '300px',
          height: '185px',
          pointerEvents: 'none',
          userSelect: 'none',
          background: '#04070B',
          borderRadius: '4px',
          padding: '14px',
          boxSizing: 'border-box',
          fontFamily: 'var(--font-mono, monospace)',
          color: '#4ADE9A',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          border: '1px solid rgba(74, 222, 154, 0.3)',
          boxShadow: 'inset 0 0 16px rgba(74, 222, 154, 0.15)',
        }}
      >
        {/* Screen Top Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(74, 222, 154, 0.2)', paddingBottom: '4px' }}>
          <span style={{ fontSize: '8.5px', letterSpacing: '0.12em', color: '#9EABB8' }}>
            KG // UNIT-403
          </span>
          <span style={{ fontSize: '8.5px', color: '#4ADE9A', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#4ADE9A', display: 'inline-block' }} />
            IST ONLINE
          </span>
        </div>

        {/* Screen Central Channel Readout */}
        <div style={{ margin: 'auto 0', textAlign: 'center' }}>
          <div style={{ fontSize: '9px', color: '#38BDF8', letterSpacing: '0.1em', marginBottom: '2px' }}>
            CHANNEL SELECTED
          </div>
          <div style={{ fontSize: '18px', fontWeight: 800, color: '#FFFFFF', letterSpacing: '0.04em' }}>
            {activeChannel === 'EMAIL' && '✉ kishorgogoi403'}
            {activeChannel === 'LINKEDIN' && '💼 in/kishorgogoi'}
            {activeChannel === 'GITHUB' && '🐙 /KISHOR403'}
            {activeChannel === 'PING' && '⚡ QUICK CONNECT'}
          </div>
          <div style={{ fontSize: '9.5px', color: '#9EABB8', marginTop: '3px' }}>
            {screenMessage || 'Tap mechanical key below to execute'}
          </div>
        </div>

        {/* Screen Footer Readout */}
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '8px', color: '#6A7885' }}>
          <span>MODE: DIRECT DISPATCH</span>
          <span style={{ color: '#4ADE9A' }}>SIGNAL 100%</span>
        </div>
      </Html>

      {/* ─── Mechanical Keypad (4 Tactile 3D Keys) ─── */}
      <group position={[0, -1.25, 0.15]}>
        {/* Row 1 */}
        <MechanicalKey
          position={[-0.8, 0.38, 0]}
          label="COPY MAIL"
          sub="Preferred"
          color="#4ADE9A"
          onClick={() => onAction('copy-email')}
        />
        <MechanicalKey
          position={[0.8, 0.38, 0]}
          label="LINKEDIN"
          sub="Network"
          color="#38BDF8"
          onClick={() => onAction('linkedin')}
        />

        {/* Row 2 */}
        <MechanicalKey
          position={[-0.8, -0.38, 0]}
          label="GITHUB"
          sub="Projects"
          color="#E8EAED"
          onClick={() => onAction('github')}
        />
        <MechanicalKey
          position={[0.8, -0.38, 0]}
          label="QUICK PING"
          sub="Say Hello"
          color="#F2A93B"
          onClick={() => onAction('quick-ping')}
        />
      </group>

      {/* Speaker Grille Slots (Bottom) */}
      <group position={[0, -2.1, 0.22]}>
        {[-0.8, -0.4, 0, 0.4, 0.8].map((x, i) => (
          <mesh key={i} position={[x, 0, 0]}>
            <boxGeometry args={[0.08, 0.25, 0.02]} />
            <meshBasicMaterial color="#0A0E13" />
          </mesh>
        ))}
      </group>
    </group>
  )
}

/* ─── Canvas Wrapper ─── */
export default function Contact3DCanvas({
  activeChannel = 'EMAIL',
  onSelectChannel,
  screenMessage = '',
  onAction,
}) {
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', minHeight: '480px' }}>
      <Canvas
        camera={{ position: [0, 0, 6.2], fov: 42 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        {/* Studio Lighting */}
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 7, 5]} intensity={1.5} color="#FFFFFF" />
        <pointLight position={[-5, -4, 3]} intensity={0.8} color="#38BDF8" />
        <pointLight position={[0, -5, 2]} intensity={0.6} color="#4ADE9A" />

        <Float speed={1.5} rotationIntensity={0.15} floatIntensity={0.3}>
          <CyberCommunicator
            activeChannel={activeChannel}
            onSelectChannel={onSelectChannel}
            screenMessage={screenMessage}
            onAction={onAction}
          />
        </Float>
      </Canvas>
    </div>
  )
}
