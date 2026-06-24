import React, { useRef, useState, useEffect, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// Constants for ambient background
const PARTICLE_COUNT = 18
const COLORS = [
  new THREE.Color('#4ADE9A'), // signal green
  new THREE.Color('#F2A93B'), // amber
  new THREE.Color('#E8615C'), // coral
]

// Create a soft radial gradient canvas texture for glowing particles
function useCircleTexture() {
  return useMemo(() => {
    const canvas = document.createElement('canvas')
    canvas.width = 32
    canvas.height = 32
    const ctx = canvas.getContext('2d')
    const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16)
    grad.addColorStop(0, 'rgba(255, 255, 255, 1)')
    grad.addColorStop(0.3, 'rgba(255, 255, 255, 0.8)')
    grad.addColorStop(1, 'rgba(255, 255, 255, 0)')
    ctx.fillStyle = grad
    ctx.fillRect(0, 0, 32, 32)
    const texture = new THREE.CanvasTexture(canvas)
    texture.colorSpace = THREE.SRGBColorSpace
    return texture
  }, [])
}

/* ─── Ambient Particles Component ─── */
function AmbientParticles({ reducedMotion }) {
  const pointsRef = useRef()
  const geomRef = useRef()
  const texture = useCircleTexture()

  // Generate random stable positions, speeds, and colors for particles
  const { positions, colors, speeds } = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3)
    const cols = new Float32Array(PARTICLE_COUNT * 3)
    const spds = new Float32Array(PARTICLE_COUNT)

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      // Position: spread widely along width (X), height (Y), and depth (Z)
      pos[i * 3] = (Math.random() - 0.5) * 35      // X
      pos[i * 3 + 1] = (Math.random() - 0.5) * 25  // Y
      pos[i * 3 + 2] = -15 + Math.random() * 20     // Z

      // Color: cycle through the three signal colors
      const chosenColor = COLORS[i % COLORS.length]
      cols[i * 3] = chosenColor.r
      cols[i * 3 + 1] = chosenColor.g
      cols[i * 3 + 2] = chosenColor.b

      // Speed: slow drift speed
      spds[i] = 0.4 + Math.random() * 0.8
    }

    return { positions: pos, colors: cols, speeds: spds }
  }, [])

  useFrame((state, delta) => {
    if (reducedMotion || !geomRef.current) return

    const pos = geomRef.current.attributes.position.array
    const time = state.clock.getElapsedTime()

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const idx = i * 3
      // Slow upward drift
      pos[idx + 1] += speeds[i] * delta

      // Subtle horizontal waving based on sine wave
      pos[idx] += Math.sin(time + i) * 0.005

      // Loop particles back to the bottom when they rise too high
      if (pos[idx + 1] > 15) {
        pos[idx + 1] = -15
        pos[idx] = (Math.random() - 0.5) * 35
      }
    }

    geomRef.current.attributes.position.needsUpdate = true
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry ref={geomRef}>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.45}
        map={texture}
        transparent
        vertexColors
        opacity={0.35}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

/* ─── Occasional Signal Streak Component ─── */
function SignalStreak({ reducedMotion }) {
  const streakRef = useRef()
  const [streak, setStreak] = useState({
    active: false,
    x: 0,
    zStart: -40,
    zEnd: 20,
    progress: 0,
    speed: 12,
  })

  // Spawn new random build signals
  useEffect(() => {
    if (reducedMotion) return

    let timeoutId
    const scheduleNextSpawn = () => {
      const delay = 4000 + Math.random() * 5000 // every 4-9 seconds
      timeoutId = setTimeout(() => {
        // Grid spacing is 2 units (150 width / 75 lines). Pick a line near center
        const gridLines = [-8, -6, -4, -2, 0, 2, 4, 6, 8]
        const randomX = gridLines[Math.floor(Math.random() * gridLines.length)]
        
        // Random direction (forward or backward along Z)
        const dir = Math.random() > 0.5 ? 1 : -1

        setStreak({
          active: true,
          x: randomX,
          zStart: dir === 1 ? -40 : 15,
          zEnd: dir === 1 ? 15 : -40,
          progress: 0,
          speed: 12 + Math.random() * 8, // randomized speed
        })
      }, delay)
    }

    scheduleNextSpawn()
    return () => clearTimeout(timeoutId)
  }, [streak.active, reducedMotion])

  useFrame((state, delta) => {
    if (reducedMotion || !streak.active) return

    setStreak((prev) => {
      const nextProgress = prev.progress + (prev.speed * delta) / Math.abs(prev.zEnd - prev.zStart)
      if (nextProgress >= 1) {
        return { ...prev, active: false }
      }
      return { ...prev, progress: nextProgress }
    })
  })

  if (!streak.active || reducedMotion) return null

  // Calculate current Z coordinate
  const currentZ = streak.zStart + (streak.zEnd - streak.zStart) * streak.progress

  // Calculate fade opacity based on progression (fade in, hold, fade out)
  let opacity = 0
  if (streak.progress < 0.2) {
    opacity = (streak.progress / 0.2) * 0.45
  } else if (streak.progress > 0.8) {
    opacity = ((1 - streak.progress) / 0.2) * 0.45
  } else {
    opacity = 0.45
  }

  return (
    <mesh ref={streakRef} position={[streak.x, -4.0, currentZ]}>
      {/* Elongated build signal streak */}
      <boxGeometry args={[0.04, 0.02, 3.5]} />
      <meshBasicMaterial
        color="#4ADE9A"
        transparent
        opacity={opacity}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  )
}

/* ─── Main Scene with grid, scroll parallax & camera interpolation ─── */
function PipelineGridScene({ reducedMotion }) {
  const groupRef = useRef()
  const gridRef = useRef()
  const scrollYRef = useRef(0)

  // Sync scrollY position
  useEffect(() => {
    const handleScroll = () => {
      scrollYRef.current = window.scrollY
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Configure gridHelper material transparency and opacity
  useEffect(() => {
    if (gridRef.current) {
      gridRef.current.material.transparent = true
      gridRef.current.material.opacity = 0.25
      gridRef.current.material.depthWrite = false
    }
  }, [])

  useFrame((state, delta) => {
    // 1. Parallax camera vertical offset
    // Camera is initially at [0, 6, 25] looking down.
    // Move camera down by 65% of screen scroll distance (scaled to WebGL coordinates)
    const targetY = 6 - scrollYRef.current * 0.007
    state.camera.position.y += (targetY - state.camera.position.y) * 0.08 // lerp for smooth scroll ease
  })

  return (
    <group ref={groupRef}>
      {/* 
        3D Perspective Grid
        Color #232C35 (hairline border) at low opacity to stay extremely subtle.
      */}
      <gridHelper
        ref={gridRef}
        args={[150, 75, '#232C35', '#232C35']}
        position={[0, -4.05, 0]}
      />

      {/* Ambient glowing particles */}
      <AmbientParticles reducedMotion={reducedMotion} />

      {/* Sparse data signal streaks */}
      <SignalStreak reducedMotion={reducedMotion} />
    </group>
  )
}

/* ─── Exported PipelineGridBg with Fallback and Optimizations ─── */
export default function PipelineGridBg() {
  const [isMobile, setIsMobile] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const [isTabVisible, setIsTabVisible] = useState(true)

  // Responsive & Performance checks
  useEffect(() => {
    // 1. Mobile screen check (disable WebGL canvas to avoid running two contexts)
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)

    // 2. Prefers reduced motion check
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mediaQuery.matches)
    const handleMediaChange = (e) => setReducedMotion(e.matches)
    mediaQuery.addEventListener('change', handleMediaChange)

    // 3. Tab visibility listener (pause render loop entirely when tab inactive)
    const handleVisibility = () => {
      setIsTabVisible(document.visibilityState === 'visible')
    }
    document.addEventListener('visibilitychange', handleVisibility)

    return () => {
      window.removeEventListener('resize', checkMobile)
      mediaQuery.removeEventListener('change', handleMediaChange)
      document.removeEventListener('visibilitychange', handleVisibility)
    }
  }, [])

  // Mobile Fallback: high-performance CSS perspective grid
  if (isMobile) {
    return (
      <div style={{
        position: 'fixed',
        inset: 0,
        zIndex: -1,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}>
        <div className="perspective-grid-fallback" />
      </div>
    )
  }

  // Desktop: Interactive 3D WebGL Canvas
  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: -1,
      pointerEvents: 'none',
      overflow: 'hidden',
    }}>
      <Canvas
        camera={{ position: [0, 6, 25], fov: 50, near: 0.1, far: 100 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
        style={{ background: 'transparent' }}
        frameloop={isTabVisible ? 'always' : 'never'}
      >
        <PipelineGridScene reducedMotion={reducedMotion} />
      </Canvas>
    </div>
  )
}
