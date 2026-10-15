import { useRef, useMemo, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { MeshDistortMaterial, Float } from '@react-three/drei'
import * as THREE from 'three'

/* ─── Iridescent Fluid Glass Orb ─── */
function FluidGlassOrb({ mood = 'emerald', formActive = false, isSending = false }) {
  const orbRef = useRef()
  const innerRef = useRef()
  const lightRef = useRef()

  // Color profiles for Apple/Linear style chromatic moods
  const colors = useMemo(() => {
    switch (mood) {
      case 'azure':
        return {
          primary: '#38BDF8',
          secondary: '#818CF8',
          accent: '#C084FC',
          emissive: '#0284C7',
        }
      case 'lavender':
        return {
          primary: '#A78BFA',
          secondary: '#F472B6',
          accent: '#38BDF8',
          emissive: '#7C3AED',
        }
      case 'emerald':
      default:
        return {
          primary: '#4ADE9A',
          secondary: '#38BDF8',
          accent: '#FACC15',
          emissive: '#16A34A',
        }
    }
  }, [mood])

  // Mouse-reactive orbit animation & light dynamics
  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime()
    const pX = state.pointer.x
    const pY = state.pointer.y

    // Smooth tilt towards mouse
    if (orbRef.current) {
      const speed = isSending ? 2.5 : formActive ? 1.4 : 0.8
      orbRef.current.rotation.y += delta * speed * 0.4
      orbRef.current.rotation.x = THREE.MathUtils.damp(
        orbRef.current.rotation.x,
        -pY * 0.35,
        4,
        delta
      )
      orbRef.current.rotation.z = THREE.MathUtils.damp(
        orbRef.current.rotation.z,
        pX * 0.35,
        4,
        delta
      )
    }

    if (innerRef.current) {
      innerRef.current.rotation.y -= delta * 0.5
      innerRef.current.rotation.x += delta * 0.3
    }

    // Dynamic light tracking mouse with smooth lag
    if (lightRef.current) {
      lightRef.current.position.x = THREE.MathUtils.lerp(lightRef.current.position.x, pX * 4, 0.05)
      lightRef.current.position.y = THREE.MathUtils.lerp(lightRef.current.position.y, pY * 4, 0.05)
      lightRef.current.position.z = 3 + Math.sin(t * 2) * 0.5
    }
  })

  const distortSpeed = isSending ? 4.5 : formActive ? 2.8 : 1.8
  const distortAmount = isSending ? 0.65 : formActive ? 0.45 : 0.35

  return (
    <group>
      {/* Dynamic Cursor Light that creates fluid chromatic specular trails */}
      <pointLight
        ref={lightRef}
        position={[0, 0, 3.5]}
        intensity={2.2}
        color={colors.primary}
        distance={12}
      />

      {/* Floating Orbital Halos / Linear Rings */}
      <mesh rotation={[Math.PI / 3, 0.2, 0]}>
        <torusGeometry args={[2.2, 0.008, 16, 96]} />
        <meshBasicMaterial color={colors.primary} transparent opacity={0.3} />
      </mesh>
      <mesh rotation={[-Math.PI / 4, 0.4, 0]}>
        <torusGeometry args={[2.5, 0.006, 16, 96]} />
        <meshBasicMaterial color={colors.secondary} transparent opacity={0.2} />
      </mesh>

      {/* Outer Fluid Morphing Glass Shell */}
      <mesh ref={orbRef}>
        <sphereGeometry args={[1.5, 64, 64]} />
        <MeshDistortMaterial
          color={colors.primary}
          emissive={colors.emissive}
          emissiveIntensity={isSending ? 0.8 : 0.35}
          roughness={0.08}
          metalness={0.88}
          clearcoat={1}
          clearcoatRoughness={0.1}
          distort={distortAmount}
          speed={distortSpeed}
        />
      </mesh>

      {/* Inner Chromatic Nucleus */}
      <mesh ref={innerRef} scale={[0.82, 0.82, 0.82]}>
        <sphereGeometry args={[1.4, 32, 32]} />
        <meshStandardMaterial
          color="#070C12"
          emissive={colors.secondary}
          emissiveIntensity={formActive ? 1.4 : 0.8}
          wireframe
          transparent
          opacity={0.35}
        />
      </mesh>
    </group>
  )
}

/* ─── Ambient Luminous Micro-Motes ─── */
function Motes({ count = 40, mood = 'emerald' }) {
  const pointsRef = useRef()

  const { positions } = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 8
      pos[i * 3 + 1] = (Math.random() - 0.5) * 8
      pos[i * 3 + 2] = (Math.random() - 0.5) * 6
    }
    return { positions: pos }
  }, [count])

  useFrame((_, delta) => {
    if (!pointsRef.current) return
    pointsRef.current.rotation.y += delta * 0.06
    pointsRef.current.rotation.x += delta * 0.03
  })

  const moteColor = mood === 'azure' ? '#38BDF8' : mood === 'lavender' ? '#C084FC' : '#4ADE9A'

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color={moteColor}
        transparent
        opacity={0.5}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

/* ─── Main 3D Canvas Scene ─── */
export default function Contact3DCanvas({
  mood = 'emerald',
  formActive = false,
  isSending = false,
}) {
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', minHeight: '440px' }}>
      <Canvas
        camera={{ position: [0, 0, 4.6], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        {/* Soft Studio Lighting */}
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 6, 4]} intensity={1.5} color="#FFFFFF" />
        <directionalLight position={[-5, -4, -2]} intensity={0.8} color="#38BDF8" />
        <pointLight position={[0, -4, 2]} intensity={0.5} color="#4ADE9A" />

        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.4}>
          <FluidGlassOrb mood={mood} formActive={formActive} isSending={isSending} />
        </Float>

        <Motes mood={mood} count={40} />
      </Canvas>
    </div>
  )
}
