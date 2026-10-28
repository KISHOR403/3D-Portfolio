import { useRef, useEffect, useMemo, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { RoundedBox } from '@react-three/drei'
import * as THREE from 'three'
import {
  createCertFrontTexture,
  createCertVersoTexture,
  createCoverTexture,
} from './certTextureGenerator'

const PAGE_W = 3.2
const PAGE_H = 4.4
const SEG_X = 64
const SEG_Y = 32

/* ─────────────────────────────────────────────
   CALCULATE PHYSICAL PAPER CURL VERTICES
   Conserves arc length strictly: dx/ds = W*cos(theta), dz/ds = W*sin(theta)
   ───────────────────────────────────────────── */
function applyCurledDeformation(geometry, t, isBack = false) {
  const pos = geometry.attributes.position
  const uv = geometry.attributes.uv
  const count = pos.count

  // Clamped at 0 (flat on right side)
  if (t <= 0.0005) {
    for (let i = 0; i < count; i++) {
      const u = uv.getX(i)
      const v = uv.getY(i) - 0.5
      const zOffset = isBack ? -0.003 : 0.002
      pos.setXYZ(i, u * PAGE_W, v * PAGE_H, zOffset)
    }
    geometry.computeVertexNormals()
    pos.needsUpdate = true
    return
  }

  // Clamped at 1 (flat on left side)
  if (t >= 0.9995) {
    for (let i = 0; i < count; i++) {
      const u = uv.getX(i)
      const v = uv.getY(i) - 0.5
      const zOffset = isBack ? 0.003 : -0.002
      pos.setXYZ(i, -u * PAGE_W, v * PAGE_H, zOffset)
    }
    geometry.computeVertexNormals()
    pos.needsUpdate = true
    return
  }

  // Active curl deformation for t in (0, 1)
  const numSteps = 64
  const du = 1.0 / numSteps
  const xProfile = new Float32Array(numSteps + 1)
  const zProfile = new Float32Array(numSteps + 1)

  let currX = 0
  let currZ = 0
  xProfile[0] = 0
  zProfile[0] = 0

  // The bend crest travels from outer edge (1) towards spine (0) as t advances:
  const sBend = 1.0 - t

  for (let s = 1; s <= numSteps; s++) {
    const uVal = s * du
    const baseAngle = t * Math.PI

    // Curl wave formula:
    const dist = uVal - sBend
    const curlWave = 0.5 * (1.0 + Math.tanh(dist * 6.0))
    const curlLift = Math.sin(Math.PI * t) * 1.55

    let theta = baseAngle * (1.0 - 0.65 * Math.sin(Math.PI * t)) + curlLift * curlWave
    theta = (1.0 - t * t) * theta + (t * t) * Math.PI
    theta = Math.max(0, Math.min(Math.PI, theta))

    currX += PAGE_W * du * Math.cos(theta)
    currZ += PAGE_W * du * Math.sin(theta)

    xProfile[s] = currX
    zProfile[s] = currZ
  }

  // Map along grid vertices with subtle diagonal corner curl
  for (let i = 0; i < count; i++) {
    const u = uv.getX(i)
    const v = uv.getY(i) - 0.5

    const stepF = u * numSteps
    const idx0 = Math.floor(stepF)
    const idx1 = Math.min(numSteps, idx0 + 1)
    const frac = stepF - idx0

    let vx = xProfile[idx0] * (1 - frac) + xProfile[idx1] * frac
    let vz = zProfile[idx0] * (1 - frac) + zProfile[idx1] * frac

    // Corner curl: bottom-right corner curls slightly earlier than top-right
    const cornerCurl = 0.15 * v * Math.sin(Math.PI * t) * (u * u)
    vz += cornerCurl

    // Elevation offset to prevent Z-fighting with base pages
    const baseElevation = 0.02 + Math.sin(Math.PI * t) * 0.05
    const thicknessOffset = isBack ? -0.003 : 0.003
    vz += baseElevation + thicknessOffset

    pos.setXYZ(i, vx, v * PAGE_H, vz)
  }

  geometry.computeVertexNormals()
  pos.needsUpdate = true
}

/* ─────────────────────────────────────────────
   3D BOOK OBJECT (WITH PAGES, SPINES, MESHES)
   ───────────────────────────────────────────── */
function BookModel({
  pageProgress,
  certifications,
  onSelectCert,
  isMobile,
}) {
  const { camera } = useThree()

  // Target and smoothed progress for silk-smooth turning
  const smoothedProgress = useRef(pageProgress)
  const frontMeshRef = useRef()
  const backMeshRef = useRef()
  const shadowPlaneRef = useRef()

  // Pre-generate Canvas Textures for all 9 certifications
  const textures = useMemo(() => {
    const N = certifications.length
    const frontTexs = certifications.map((c, i) => createCertFrontTexture(c, i, N))
    const versoTexs = certifications.map((c, i) => createCertVersoTexture(c, i, N))
    const frontCover = createCoverTexture('front')
    const backCover = createCoverTexture('back')
    return { frontTexs, versoTexs, frontCover, backCover }
  }, [certifications])

  // Geometry references
  const frontGeom = useMemo(() => new THREE.PlaneGeometry(PAGE_W, PAGE_H, SEG_X, SEG_Y), [])
  const backGeom = useMemo(() => {
    const g = new THREE.PlaneGeometry(PAGE_W, PAGE_H, SEG_X, SEG_Y)
    // Flip UV.x for backface so verso text reads left-to-right correctly!
    const uvs = g.attributes.uv
    for (let i = 0; i < uvs.count; i++) {
      uvs.setX(i, 1.0 - uvs.getX(i))
    }
    uvs.needsUpdate = true
    return g
  }, [])

  // Materials with alpha transparency for rounded paper corners
  const frontMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        roughness: 1.0,
        metalness: 0.0,
        side: THREE.FrontSide,
        transparent: true,
        alphaTest: 0.5,
      }),
    []
  )

  const backMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        roughness: 1.0,
        metalness: 0.0,
        side: THREE.BackSide,
        transparent: true,
        alphaTest: 0.5,
      }),
    []
  )

  const leftBaseMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        roughness: 1.0,
        metalness: 0.0,
        transparent: true,
        alphaTest: 0.5,
      }),
    []
  )

  const rightBaseMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        roughness: 1.0,
        metalness: 0.0,
        transparent: true,
        alphaTest: 0.5,
      }),
    []
  )

  // Adjust camera distance for mobile / desktop
  useEffect(() => {
    if (isMobile) {
      camera.position.set(0, -0.05, 8.4)
      camera.fov = 36
    } else {
      camera.position.set(0, -0.05, 6.7)
      camera.fov = 34
    }
    camera.lookAt(0, 0, 0)
    camera.updateProjectionMatrix()
  }, [isMobile, camera])

  // Frame animation loop
  useFrame((_, delta) => {
    // Smooth lerp to target scroll progress
    smoothedProgress.current += (pageProgress - smoothedProgress.current) * Math.min(1, delta * 12)
    const p = Math.max(0, Math.min(certifications.length - 0.001, smoothedProgress.current))

    const currentIndex = Math.floor(p)
    const turnT = p - currentIndex

    // 1. Update textures of active page and base pages
    // Turning page front texture:
    frontMat.map = textures.frontTexs[currentIndex]
    frontMat.needsUpdate = true

    // Turning page back texture:
    backMat.map = textures.versoTexs[currentIndex]
    backMat.needsUpdate = true

    // Left base page:
    if (currentIndex === 0) {
      leftBaseMat.map = textures.frontCover
    } else {
      leftBaseMat.map = textures.versoTexs[currentIndex - 1]
    }
    leftBaseMat.needsUpdate = true

    // Right base page:
    if (currentIndex + 1 < certifications.length) {
      rightBaseMat.map = textures.frontTexs[currentIndex + 1]
    } else {
      rightBaseMat.map = textures.backCover
    }
    rightBaseMat.needsUpdate = true

    // 2. Deform the 3D sheet with physical paper curl math!
    if (frontMeshRef.current && backMeshRef.current) {
      applyCurledDeformation(frontGeom, turnT, false)
      applyCurledDeformation(backGeom, turnT, true)
    }

    // 3. Dynamic moving contact shadow
    if (shadowPlaneRef.current) {
      const shadow = shadowPlaneRef.current
      if (turnT < 0.5) {
        // Shadow on right page
        shadow.position.x = PAGE_W * 0.5 * (1.0 - turnT * 0.6)
        shadow.position.z = 0.008
        shadow.scale.x = 0.5 + Math.sin(Math.PI * turnT) * 0.7
        shadow.material.opacity = Math.sin(Math.PI * turnT) * 0.42
      } else {
        // Shadow on left page as paper lands
        shadow.position.x = -PAGE_W * 0.5 * (turnT * 0.8)
        shadow.position.z = 0.008
        shadow.scale.x = 0.5 + Math.sin(Math.PI * turnT) * 0.7
        shadow.material.opacity = Math.sin(Math.PI * turnT) * 0.35
      }
    }
  })

  // Handle click on the book
  const handleClick = () => {
    const curr = Math.floor(Math.max(0, Math.min(certifications.length - 1, smoothedProgress.current)))
    onSelectCert(certifications[curr])
  }

  return (
    <group rotation={[0.1, 0, 0]} onClick={handleClick} style={{ cursor: 'pointer' }}>
      {/* ─── 1. HARDCOVER LEATHER BOARD (ROUNDED CORNERS) ─── */}
      <RoundedBox
        args={[PAGE_W * 2 + 0.44, PAGE_H + 0.4, 0.14]}
        radius={0.16}
        smoothness={8}
        position={[0, 0, -0.09]}
      >
        <meshStandardMaterial color="#0E1217" roughness={0.75} metalness={0.15} />
      </RoundedBox>

      {/* Gold embossed trim on cover edge (rounded) */}
      <RoundedBox
        args={[PAGE_W * 2 + 0.36, PAGE_H + 0.34, 0.005]}
        radius={0.14}
        smoothness={6}
        position={[0, 0, -0.015]}
      >
        <meshStandardMaterial color="#D4AF37" roughness={0.4} metalness={0.6} wireframe />
      </RoundedBox>

      {/* ─── 2. CENTRAL SPINE HINGE ─── */}
      <mesh position={[0, 0, -0.01]} rotation={[0, 0, 0]}>
        <cylinderGeometry args={[0.16, 0.16, PAGE_H + 0.36, 32]} />
        <meshStandardMaterial color="#141820" roughness={0.65} metalness={0.25} />
      </mesh>

      {/* Spine decorative gold ribs */}
      {[-1.6, -0.8, 0, 0.8, 1.6].map((y, idx) => (
        <mesh key={idx} position={[0, y, 0.08]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.165, 0.012, 16, 32]} />
          <meshStandardMaterial color="#D4AF37" roughness={0.3} metalness={0.8} />
        </mesh>
      ))}

      {/* ─── 3. PAGE BLOCK (LAYERED PAPER EDGES WITH ROUNDED CORNERS) ─── */}
      {/* Left paper block */}
      <RoundedBox
        args={[PAGE_W - 0.04, PAGE_H - 0.04, 0.06]}
        radius={0.08}
        smoothness={4}
        position={[-PAGE_W * 0.5, 0, -0.035]}
      >
        <meshStandardMaterial color="#EAE4D8" roughness={0.9} metalness={0.05} />
      </RoundedBox>

      {/* Right paper block */}
      <RoundedBox
        args={[PAGE_W - 0.04, PAGE_H - 0.04, 0.06]}
        radius={0.08}
        smoothness={4}
        position={[PAGE_W * 0.5, 0, -0.035]}
      >
        <meshStandardMaterial color="#EAE4D8" roughness={0.9} metalness={0.05} />
      </RoundedBox>

      {/* ─── 4. LEFT BASE PAGE (FLAT RECTO/VERSO) ─── */}
      <mesh position={[-PAGE_W * 0.5, 0, 0.005]} material={leftBaseMat}>
        <planeGeometry args={[PAGE_W, PAGE_H]} />
      </mesh>

      {/* ─── 5. RIGHT BASE PAGE (UNDERLYING NEXT SHEET) ─── */}
      <mesh position={[PAGE_W * 0.5, 0, 0.005]} material={rightBaseMat}>
        <planeGeometry args={[PAGE_W, PAGE_H]} />
      </mesh>

      {/* ─── 6. DYNAMIC MOVING DROP SHADOW ─── */}
      <mesh ref={shadowPlaneRef} position={[PAGE_W * 0.5, 0, 0.008]}>
        <planeGeometry args={[PAGE_W * 0.9, PAGE_H * 0.96]} />
        <meshBasicMaterial color="#000000" transparent opacity={0.3} depthWrite={false} />
      </mesh>

      {/* ─── 7. THE TURNING PAGE (FRONT & BACK 3D CURVED MESH) ─── */}
      {/* Front Face (Certificate) */}
      <mesh ref={frontMeshRef} geometry={frontGeom} material={frontMat} castShadow />

      {/* Back Face (Syllabus & Verso) */}
      <mesh ref={backMeshRef} geometry={backGeom} material={backMat} castShadow />
    </group>
  )
}

/* ─────────────────────────────────────────────
   EXPORTED THREE.JS CANVAS CONTAINER
   ───────────────────────────────────────────── */
export default function CertBookCanvas({
  pageProgress,
  certifications,
  onSelectCert,
}) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <div className="cert-3d-canvas-wrapper" style={{ width: '100%', height: '100%' }}>
      <Canvas
        camera={{ position: [0, -0.05, 6.7], fov: 34 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        {/* Soft, even ambient lighting */}
        <ambientLight intensity={0.9} color="#FFFFFF" />

        {/* Directional Key Light with controlled intensity to eliminate glare */}
        <directionalLight position={[2, 6, 5]} intensity={0.65} color="#FFFFFF" castShadow />

        {/* Soft fill point light */}
        <pointLight position={[0, 0, 2.5]} intensity={0.25} color="#E2E8F0" />

        {/* 3D Book Experience */}
        <BookModel
          pageProgress={pageProgress}
          certifications={certifications}
          onSelectCert={onSelectCert}
          isMobile={isMobile}
        />
      </Canvas>
    </div>
  )
}
