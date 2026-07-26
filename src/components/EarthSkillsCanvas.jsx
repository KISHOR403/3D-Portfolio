import { useRef, useState, useEffect, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Html } from '@react-three/drei'
import * as THREE from 'three'
import {
  Database,
  CheckSquare,
  Eye,
  RotateCcw,
  Workflow,
  RefreshCw,
  Cpu,
  FileText,
  Bug,
  Activity,
  History,
  GitBranch,
  Server,
  Box,
  Table,
  Infinity as InfinityIcon,
  PenTool,
  Video,
  Sparkles,
  Smartphone,
  Layers,
  Globe
} from 'lucide-react'

// Custom SVG for TestNG
const TestNGIcon = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0 }}>
    <rect width="100" height="100" rx="20" fill="#dc2626" />
    <text x="50" y="65" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="50" fill="white" textAnchor="middle">
      Tn
    </text>
    <path d="M70 20 L90 20 L90 40" stroke="white" strokeWidth="5" fill="none" />
    <path d="M30 80 L10 80 L10 60" stroke="white" strokeWidth="5" fill="none" />
  </svg>
)

// Custom SVG for REST Assured
const RestAssuredIcon = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0 }}>
    <defs>
      <linearGradient id="restAssuredGradEarth" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#16a34a', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#059669', stopOpacity: 1 }} />
      </linearGradient>
    </defs>
    <circle cx="50" cy="50" r="45" fill="url(#restAssuredGradEarth)" />
    <text x="50" y="65" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="40" fill="white" textAnchor="middle">
      RA
    </text>
    <path d="M20 50 A 30 30 0 0 1 80 50" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round" />
  </svg>
)

// Custom SVG for TestRail
const TestRailIcon = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0 }}>
    <rect width="100" height="100" rx="20" fill="#0052CC" />
    <path d="M30 50 L45 65 L70 35" stroke="white" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </svg>
)

// Custom SVG for JUnit
const JUnitIcon = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0 }}>
    <rect width="100" height="100" rx="20" fill="#2563eb" />
    <text x="40" y="70" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="60" fill="white" textAnchor="middle">J</text>
    <path d="M60 40 L70 55 L90 30" stroke="#4ADE9A" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </svg>
)

// Fallback icon map for conceptual skills
const SKILL_ICONS = {
  'SQL': Database,
  'Manual Testing': Eye,
  'Agile (Scrum)': RotateCcw,
  'SDLC': Workflow,
  'STLC': RefreshCw,
  'SDLC & STLC': Workflow,
  'API Testing & Automation': Cpu,
  'API Testing': Cpu,
  'Mobile Testing': Smartphone,
  'Test Case Design': FileText,
  'Bug Tracking & Debugging': Bug,
  'Bug Tracking': Bug,
  'Defect Life Cycle': Activity,
  'Regression Testing': History,
  'Git': GitBranch,
  'Jenkins': Server,
  'Page Object Model (POM)': Box,
  'Page Object Model': Box,
  'Data-Driven Testing': Table,
  'CI/CD Integration': InfinityIcon,
  'Technical Writing': PenTool,
  'Video Editing': Video,
  'Social Media Content': Sparkles,
  'REST APIs': Cpu,
}

// Brand mapping for Simple Icons CDN
const BRAND_SLUGS = {
  'Java': 'java/F89820',
  'JavaScript': 'javascript/F7DF1E',
  'HTML': 'html5/E34F26',
  'HTML5': 'html5/E34F26',
  'CSS': 'css3/1572B6',
  'CSS3': 'css3/1572B6',
  'SQL': 'sqlite/003B57',
  'React': 'react/61DAFB',
  'Node.js': 'nodedotjs/339933',
  'Express.js': 'express/E8EAED',
  'MongoDB': 'mongodb/47A248',
  'Redux': 'redux/764ABC',
  'Tailwind CSS': 'tailwindcss/06B6D4',
  'Selenium': 'selenium/43B02A',
  'Selenium WebDriver': 'selenium/43B02A',
  'Appium': 'appium/E42D42',
  'Postman': 'postman/FF6C37',
  'Git': 'git/F05032',
  'GitHub': 'github/E8EAED',
  'Jira': 'jira/0052CC',
  'Jenkins': 'jenkins/D24939',
  'GitHub Actions': 'githubactions/2088FF',
  'Canva': 'canva/00C4CC',
  'Figma': 'figma/F24E1E',
}

export function SmartSkillIcon({ name, size = 13 }) {
  const [imgFailed, setImgFailed] = useState(false)
  const normalizedName = name ? name.trim() : ''

  if (normalizedName === 'TestNG') return <TestNGIcon size={size} />
  if (normalizedName === 'REST Assured') return <RestAssuredIcon size={size} />
  if (normalizedName === 'TestRail') return <TestRailIcon size={size} />
  if (normalizedName === 'JUnit') return <JUnitIcon size={size} />

  const slug = BRAND_SLUGS[normalizedName]

  if (slug && !imgFailed) {
    return (
      <img
        src={`https://cdn.simpleicons.org/${slug}`}
        alt={normalizedName}
        onError={() => setImgFailed(true)}
        style={{
          width: `${size}px`,
          height: `${size}px`,
          objectFit: 'contain',
          display: 'inline-block',
          verticalAlign: 'middle',
          flexShrink: 0,
        }}
      />
    )
  }

  const FallbackIcon = SKILL_ICONS[normalizedName] || Layers
  return <FallbackIcon size={size} style={{ opacity: 0.9, flexShrink: 0 }} />
}

// 40 Skills distributed cleanly across 4 orbits around the 3D Earth
export const ALL_ORBIT_SKILLS = [
  // Orbit 0: Radius 3.1 (Languages & Core APIs)
  { id: 'java', name: 'Java', category: 'Languages & Querying', orbit: 0, initialAngle: 0, color: '#F89820' },
  { id: 'js', name: 'JavaScript', category: 'Languages & Querying', orbit: 0, initialAngle: (Math.PI * 2 / 8) * 1, color: '#F7DF1E' },
  { id: 'html', name: 'HTML', category: 'Languages & Querying', orbit: 0, initialAngle: (Math.PI * 2 / 8) * 2, color: '#E34F26' },
  { id: 'css', name: 'CSS', category: 'Languages & Querying', orbit: 0, initialAngle: (Math.PI * 2 / 8) * 3, color: '#1572B6' },
  { id: 'sql', name: 'SQL', category: 'Languages & Querying', orbit: 0, initialAngle: (Math.PI * 2 / 8) * 4, color: '#38BDF8' },
  { id: 'restapi', name: 'REST APIs', category: 'Full Stack Development', orbit: 0, initialAngle: (Math.PI * 2 / 8) * 5, color: '#F2A93B' },
  { id: 'agile', name: 'Agile (Scrum)', category: 'Testing Skills & Methodologies', orbit: 0, initialAngle: (Math.PI * 2 / 8) * 6, color: '#4ADE9A' },
  { id: 'sdlc', name: 'SDLC', category: 'Testing Skills & Methodologies', orbit: 0, initialAngle: (Math.PI * 2 / 8) * 7, color: '#A78BFA' },

  // Orbit 1: Radius 4.0 (Full Stack & Mobile)
  { id: 'react', name: 'React', category: 'Full Stack Development', orbit: 1, initialAngle: 0, color: '#61DAFB' },
  { id: 'node', name: 'Node.js', category: 'Full Stack Development', orbit: 1, initialAngle: (Math.PI * 2 / 9) * 1, color: '#339933' },
  { id: 'express', name: 'Express.js', category: 'Full Stack Development', orbit: 1, initialAngle: (Math.PI * 2 / 9) * 2, color: '#E8EAED' },
  { id: 'mongo', name: 'MongoDB', category: 'Full Stack Development', orbit: 1, initialAngle: (Math.PI * 2 / 9) * 3, color: '#47A248' },
  { id: 'redux', name: 'Redux', category: 'Full Stack Development', orbit: 1, initialAngle: (Math.PI * 2 / 9) * 4, color: '#764ABC' },
  { id: 'tailwind', name: 'Tailwind CSS', category: 'Full Stack Development', orbit: 1, initialAngle: (Math.PI * 2 / 9) * 5, color: '#06B6D4' },
  { id: 'manual', name: 'Manual Testing', category: 'Testing Skills & Methodologies', orbit: 1, initialAngle: (Math.PI * 2 / 9) * 6, color: '#F2A93B' },
  { id: 'mobile', name: 'Mobile Testing', category: 'Testing Skills & Methodologies', orbit: 1, initialAngle: (Math.PI * 2 / 9) * 7, color: '#38BDF8' },
  { id: 'writing', name: 'Technical Writing', category: 'Content Creation & Design', orbit: 1, initialAngle: (Math.PI * 2 / 9) * 8, color: '#E8EAED' },

  // Orbit 2: Radius 4.9 (Automation Frameworks & Design Patterns)
  { id: 'selenium', name: 'Selenium WebDriver', category: 'Automation Tools & Frameworks', orbit: 2, initialAngle: 0, color: '#43B02A' },
  { id: 'appium', name: 'Appium', category: 'Automation Tools & Frameworks', orbit: 2, initialAngle: (Math.PI * 2 / 10) * 1, color: '#E42D42' },
  { id: 'testng', name: 'TestNG', category: 'Automation Tools & Frameworks', orbit: 2, initialAngle: (Math.PI * 2 / 10) * 2, color: '#dc2626' },
  { id: 'junit', name: 'JUnit', category: 'Automation Tools & Frameworks', orbit: 2, initialAngle: (Math.PI * 2 / 10) * 3, color: '#2563eb' },
  { id: 'restassured', name: 'REST Assured', category: 'Automation Tools & Frameworks', orbit: 2, initialAngle: (Math.PI * 2 / 10) * 4, color: '#16a34a' },
  { id: 'postman', name: 'Postman', category: 'Automation Tools & Frameworks', orbit: 2, initialAngle: (Math.PI * 2 / 10) * 5, color: '#FF6C37' },
  { id: 'pom', name: 'Page Object Model (POM)', category: 'Design Patterns', orbit: 2, initialAngle: (Math.PI * 2 / 10) * 6, color: '#4ADE9A' },
  { id: 'ddt', name: 'Data-Driven Testing', category: 'Design Patterns', orbit: 2, initialAngle: (Math.PI * 2 / 10) * 7, color: '#F2A93B' },
  { id: 'apitest', name: 'API Testing & Automation', category: 'Testing Skills & Methodologies', orbit: 2, initialAngle: (Math.PI * 2 / 10) * 8, color: '#38BDF8' },
  { id: 'testcase', name: 'Test Case Design', category: 'Testing Skills & Methodologies', orbit: 2, initialAngle: (Math.PI * 2 / 10) * 9, color: '#A78BFA' },

  // Orbit 3: Radius 5.8 (DevTools, CI/CD & Content)
  { id: 'git', name: 'Git', category: 'Developer Tools', orbit: 3, initialAngle: 0, color: '#F05032' },
  { id: 'github', name: 'GitHub', category: 'Developer Tools', orbit: 3, initialAngle: (Math.PI * 2 / 11) * 1, color: '#E8EAED' },
  { id: 'jira', name: 'Jira', category: 'Developer Tools', orbit: 3, initialAngle: (Math.PI * 2 / 11) * 2, color: '#0052CC' },
  { id: 'testrail', name: 'TestRail', category: 'Developer Tools', orbit: 3, initialAngle: (Math.PI * 2 / 11) * 3, color: '#0052CC' },
  { id: 'jenkins', name: 'Jenkins', category: 'Developer Tools', orbit: 3, initialAngle: (Math.PI * 2 / 11) * 4, color: '#D24939' },
  { id: 'actions', name: 'GitHub Actions', category: 'Developer Tools', orbit: 3, initialAngle: (Math.PI * 2 / 11) * 5, color: '#2088FF' },
  { id: 'cicd', name: 'CI/CD Integration', category: 'Design Patterns', orbit: 3, initialAngle: (Math.PI * 2 / 11) * 6, color: '#4ADE9A' },
  { id: 'canva', name: 'Canva', category: 'Content Creation & Design', orbit: 3, initialAngle: (Math.PI * 2 / 11) * 7, color: '#00C4CC' },
  { id: 'figma', name: 'Figma', category: 'Content Creation & Design', orbit: 3, initialAngle: (Math.PI * 2 / 11) * 8, color: '#F24E1E' },
  { id: 'video', name: 'Video Editing', category: 'Content Creation & Design', orbit: 3, initialAngle: (Math.PI * 2 / 11) * 9, color: '#F2A93B' },
  { id: 'bugtrack', name: 'Bug Tracking & Debugging', category: 'Testing Skills & Methodologies', orbit: 3, initialAngle: (Math.PI * 2 / 11) * 10, color: '#E8615C' },
]

// Orbit Ring Parameters: [radius, rotX, rotZ, speed]
const ORBIT_CONFIGS = [
  { radius: 3.1, rotX: Math.PI * 0.15, rotZ: Math.PI * 0.08, speed: 0.22, color: '#4ADE9A' },
  { radius: 4.0, rotX: -Math.PI * 0.22, rotZ: -Math.PI * 0.18, speed: -0.18, color: '#F2A93B' },
  { radius: 4.9, rotX: Math.PI * 0.32, rotZ: Math.PI * 0.25, speed: 0.15, color: '#38BDF8' },
  { radius: 5.8, rotX: -Math.PI * 0.38, rotZ: Math.PI * 0.42, speed: -0.12, color: '#A78BFA' },
]

// Generate high-resolution procedural Earth texture on canvas
function useEarthTexture() {
  return useMemo(() => {
    const canvas = document.createElement('canvas')
    canvas.width = 1024
    canvas.height = 512
    const ctx = canvas.getContext('2d')

    const oceanGrad = ctx.createLinearGradient(0, 0, 0, 512)
    oceanGrad.addColorStop(0, '#091322')
    oceanGrad.addColorStop(0.5, '#0b192e')
    oceanGrad.addColorStop(1, '#08101d')
    ctx.fillStyle = oceanGrad
    ctx.fillRect(0, 0, 1024, 512)

    ctx.strokeStyle = 'rgba(56, 189, 248, 0.08)'
    ctx.lineWidth = 1
    for (let x = 0; x <= 1024; x += 64) {
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, 512)
      ctx.stroke()
    }
    for (let y = 0; y <= 512; y += 32) {
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(1024, y)
      ctx.stroke()
    }

    const continents = [
      { cx: 240, cy: 170, rx: 110, ry: 75 },
      { cx: 310, cy: 330, rx: 65, ry: 95 },
      { cx: 520, cy: 150, rx: 60, ry: 50 },
      { cx: 530, cy: 270, rx: 80, ry: 90 },
      { cx: 720, cy: 160, rx: 150, ry: 95 },
      { cx: 830, cy: 350, rx: 60, ry: 55 },
      { cx: 690, cy: 230, rx: 45, ry: 45 }
    ]

    ctx.fillStyle = 'rgba(74, 222, 154, 0.65)'
    continents.forEach(({ cx, cy, rx, ry }) => {
      for (let x = cx - rx; x <= cx + rx; x += 12) {
        for (let y = cy - ry; y <= cy + ry; y += 12) {
          const dx = (x - cx) / rx
          const dy = (y - cy) / ry
          if (dx * dx + dy * dy <= 1) {
            const size = (Math.sin(x * 0.05 + y * 0.05) > 0) ? 2.5 : 1.8
            ctx.beginPath()
            ctx.arc(x + (Math.random() - 0.5) * 4, y + (Math.random() - 0.5) * 4, size, 0, Math.PI * 2)
            ctx.fill()
          }
        }
      }
    })

    const techHubs = [
      { x: 690, y: 230, label: 'Bengaluru (KG HQ)', color: '#4ADE9A' },
      { x: 220, y: 170, label: 'Silicon Valley', color: '#F2A93B' },
      { x: 500, y: 140, label: 'London', color: '#38BDF8' },
      { x: 860, y: 170, label: 'Tokyo', color: '#A78BFA' }
    ]

    techHubs.forEach(hub => {
      ctx.fillStyle = hub.color
      ctx.beginPath()
      ctx.arc(hub.x, hub.y, 4, 0, Math.PI * 2)
      ctx.fill()

      ctx.strokeStyle = hub.color
      ctx.lineWidth = 1.5
      ctx.beginPath()
      ctx.arc(hub.x, hub.y, 8, 0, Math.PI * 2)
      ctx.stroke()
    })

    ctx.strokeStyle = 'rgba(74, 222, 154, 0.35)'
    ctx.setLineDash([4, 4])
    ctx.beginPath()
    ctx.moveTo(690, 230)
    ctx.quadraticCurveTo(400, 100, 220, 170)
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(690, 230)
    ctx.quadraticCurveTo(600, 120, 500, 140)
    ctx.stroke()

    ctx.setLineDash([])

    const texture = new THREE.CanvasTexture(canvas)
    texture.colorSpace = THREE.SRGBColorSpace
    return texture
  }, [])
}

// 3D Earth Globe component
function ThreeDEarthGlobe() {
  const earthRef = useRef()
  const atmosphereRef = useRef()
  const earthTexture = useEarthTexture()

  useFrame((state, delta) => {
    if (earthRef.current) {
      earthRef.current.rotation.y += delta * 0.08
    }
    if (atmosphereRef.current) {
      atmosphereRef.current.rotation.y += delta * 0.05
    }
  })

  return (
    <group>
      <mesh ref={earthRef} position={[0, 0, 0]}>
        <sphereGeometry args={[2.0, 64, 64]} />
        <meshStandardMaterial
          map={earthTexture}
          roughness={0.65}
          metalness={0.3}
          emissive="#091829"
          emissiveIntensity={0.4}
        />
      </mesh>

      <mesh ref={atmosphereRef} position={[0, 0, 0]}>
        <sphereGeometry args={[2.14, 48, 48]} />
        <meshBasicMaterial
          color="#4ADE9A"
          transparent
          opacity={0.12}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[2.02, 24, 24]} />
        <meshBasicMaterial
          color="#38BDF8"
          wireframe
          transparent
          opacity={0.06}
        />
      </mesh>
    </group>
  )
}

// Orbital Ring Wireframes
function OrbitRings() {
  return (
    <group>
      {ORBIT_CONFIGS.map((config, index) => (
        <mesh
          key={index}
          rotation={[config.rotX, 0, config.rotZ]}
        >
          <torusGeometry args={[config.radius, 0.012, 16, 100]} />
          <meshBasicMaterial
            color={config.color}
            transparent
            opacity={0.25}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}
    </group>
  )
}

// Single Orbiting Skill Badge Node
function OrbitingSkillNode({ skill, activeCategory, hoveredSkillId, setHoveredSkillId }) {
  const orbitConfig = ORBIT_CONFIGS[skill.orbit]
  const angleRef = useRef(skill.initialAngle)
  const [pos, setPos] = useState([0, 0, 0])
  const [depthZ, setDepthZ] = useState(1)

  useFrame((state, delta) => {
    const speedFactor = hoveredSkillId === skill.id ? 0.05 : 1.0
    angleRef.current += orbitConfig.speed * delta * speedFactor

    const theta = angleRef.current
    const R = orbitConfig.radius

    const x0 = R * Math.cos(theta)
    const y0 = 0
    const z0 = R * Math.sin(theta)

    const rotX = orbitConfig.rotX
    const rotZ = orbitConfig.rotZ

    const y1 = y0 * Math.cos(rotX) - z0 * Math.sin(rotX)
    const z1 = y0 * Math.sin(rotX) + z0 * Math.cos(rotX)
    const x1 = x0

    const x2 = x1 * Math.cos(rotZ) - y1 * Math.sin(rotZ)
    const y2 = x1 * Math.sin(rotZ) + y1 * Math.cos(rotZ)
    const z2 = z1

    setPos([x2, y2, z2])
    setDepthZ(z2)
  })

  const isMatchCategory = !activeCategory || activeCategory === 'All' || skill.category === activeCategory
  const isHovered = hoveredSkillId === skill.id
  const isBehindEarth = depthZ < -0.3 && Math.sqrt(pos[0] * pos[0] + pos[1] * pos[1]) < 2.3

  const opacity = !isMatchCategory ? 0.15 : (isBehindEarth ? 0.25 : (isHovered ? 1.0 : 0.92))
  const scale = isHovered ? 1.25 : (isBehindEarth ? 0.8 : 1.0)
  const zIndex = isHovered ? 100 : (isBehindEarth ? 1 : 10)

  return (
    <Html
      position={pos}
      center
      distanceFactor={9.5}
      zIndexRange={[1, 100]}
      style={{
        pointerEvents: 'auto',
        transition: 'transform 0.2s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.25s ease',
        transform: `scale(${scale})`,
        opacity: opacity,
        zIndex: zIndex,
      }}
    >
      <div
        onMouseEnter={() => setHoveredSkillId(skill.id)}
        onMouseLeave={() => setHoveredSkillId(null)}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.4rem',
          padding: '0.35rem 0.7rem',
          borderRadius: '999px',
          background: isHovered
            ? `color-mix(in srgb, ${skill.color} 25%, #0d1520)`
            : 'rgba(13, 21, 32, 0.88)',
          backdropFilter: 'blur(8px)',
          border: `1px solid ${isHovered ? skill.color : 'rgba(255, 255, 255, 0.18)'}`,
          boxShadow: isHovered
            ? `0 0 20px ${skill.color}80, 0 4px 16px rgba(0,0,0,0.6)`
            : `0 2px 8px rgba(0,0,0,0.4), 0 0 6px ${skill.color}20`,
          color: '#F3F4F6',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.72rem',
          fontWeight: 600,
          whiteSpace: 'nowrap',
          cursor: 'pointer',
          userSelect: 'none',
          position: 'relative',
        }}
      >
        <SmartSkillIcon name={skill.name} size={13} />
        <span>{skill.name}</span>

        {isHovered && (
          <div
            style={{
              position: 'absolute',
              bottom: '125%',
              left: '50%',
              transform: 'translateX(-50%)',
              background: '#0a1017',
              border: `1px solid ${skill.color}`,
              borderRadius: '8px',
              padding: '0.4rem 0.75rem',
              boxShadow: `0 8px 24px rgba(0,0,0,0.8), 0 0 12px ${skill.color}40`,
              zIndex: 1000,
              pointerEvents: 'none',
              minWidth: '150px',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: '0.65rem', color: skill.color, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              {skill.category}
            </div>
            <div style={{ fontSize: '0.75rem', color: '#FFF', fontWeight: 700, marginTop: '2px' }}>
              {skill.name}
            </div>
            <div style={{ fontSize: '0.62rem', color: '#9CA3AF', marginTop: '2px' }}>
              ✦ Production Verified
            </div>
          </div>
        )}
      </div>
    </Html>
  )
}

export default function EarthSkillsCanvas({ activeCategory, hoveredSkillId, setHoveredSkillId }) {
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div style={{
      width: '100%',
      height: isMobile ? '450px' : '580px',
      position: 'relative',
      borderRadius: '20px',
      overflow: 'hidden',
      background: 'radial-gradient(ellipse at center, rgba(16, 26, 40, 0.8) 0%, rgba(9, 14, 23, 0.95) 100%)',
      border: '1px solid var(--color-border-hairline)',
      boxShadow: 'inset 0 0 60px rgba(0, 0, 0, 0.6), 0 12px 40px rgba(0, 0, 0, 0.4)',
    }}>
      <div style={{
        position: 'absolute',
        top: '1rem',
        left: '1rem',
        zIndex: 10,
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.68rem',
        color: 'var(--color-accent-pass)',
        background: 'rgba(74, 222, 154, 0.08)',
        border: '1px solid rgba(74, 222, 154, 0.2)',
        borderRadius: '999px',
        padding: '4px 12px',
        pointerEvents: 'none',
      }}>
        <Globe size={12} />
        <span>Interactive 3D Earth Orbit · Drag to Rotate</span>
      </div>

      <Canvas
        camera={{ position: [0, 0, 11], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={1.2} />
        <directionalLight position={[10, 10, 10]} intensity={2.0} color="#FFFFFF" />
        <directionalLight position={[-10, -10, -10]} intensity={1.0} color="#38BDF8" />
        <pointLight position={[0, 0, 8]} intensity={1.5} color="#4ADE9A" />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          rotateSpeed={0.6}
          autoRotate={hoveredSkillId === null}
          autoRotateSpeed={0.4}
        />

        <ThreeDEarthGlobe />

        <OrbitRings />

        {ALL_ORBIT_SKILLS.map((skill) => (
          <OrbitingSkillNode
            key={skill.id}
            skill={skill}
            activeCategory={activeCategory}
            hoveredSkillId={hoveredSkillId}
            setHoveredSkillId={setHoveredSkillId}
          />
        ))}
      </Canvas>
    </div>
  )
}
