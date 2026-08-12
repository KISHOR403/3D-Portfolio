import { useRef, useState, useEffect, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Html } from '@react-three/drei'
import * as THREE from 'three'
import {
  Database, Eye, RotateCcw, Workflow, RefreshCw, Cpu, FileText, Bug,
  Activity, History, GitBranch, Server, Box, Table,
  Infinity as InfinityIcon, PenTool, Video, Sparkles, Smartphone, Layers,
} from 'lucide-react'

const TestNGIcon = ({ size }) => (<svg width={size} height={size} viewBox="0 0 100 100" style={{display:'inline-block',verticalAlign:'middle',flexShrink:0}}><rect width="100" height="100" rx="20" fill="#dc2626"/><text x="50" y="65" fontFamily="Arial" fontWeight="bold" fontSize="50" fill="white" textAnchor="middle">Tn</text></svg>)
const RestAssuredIcon = ({ size }) => (<svg width={size} height={size} viewBox="0 0 100 100" style={{display:'inline-block',verticalAlign:'middle',flexShrink:0}}><circle cx="50" cy="50" r="45" fill="#16a34a"/><text x="50" y="65" fontFamily="Arial" fontWeight="bold" fontSize="40" fill="white" textAnchor="middle">RA</text></svg>)
const TestRailIcon = ({ size }) => (<svg width={size} height={size} viewBox="0 0 100 100" style={{display:'inline-block',verticalAlign:'middle',flexShrink:0}}><rect width="100" height="100" rx="20" fill="#0052CC"/><path d="M30 50 L45 65 L70 35" stroke="white" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" fill="none"/></svg>)
const JUnitIcon = ({ size }) => (<svg width={size} height={size} viewBox="0 0 100 100" style={{display:'inline-block',verticalAlign:'middle',flexShrink:0}}><rect width="100" height="100" rx="20" fill="#2563eb"/><text x="40" y="70" fontFamily="Arial" fontWeight="bold" fontSize="60" fill="white" textAnchor="middle">J</text></svg>)

const SKILL_ICONS = { 'SQL':Database,'Manual Testing':Eye,'Agile':RotateCcw,'API Testing':Cpu,'Mobile Testing':Smartphone,'Bug Tracking':Bug,'Git':GitBranch,'Jenkins':Server,'POM Pattern':Box,'Data-Driven':Table,'CI/CD':InfinityIcon,'REST APIs':Cpu }
const BRAND_SLUGS = { 'Java':'java/F89820','JavaScript':'javascript/F7DF1E','HTML':'html5/E34F26','CSS':'css3/1572B6','React':'react/61DAFB','Node.js':'nodedotjs/339933','Express.js':'express/E8EAED','MongoDB':'mongodb/47A248','Redux':'redux/764ABC','Tailwind CSS':'tailwindcss/06B6D4','Selenium':'selenium/43B02A','Appium':'appium/E42D42','Postman':'postman/FF6C37','Git':'git/F05032','GitHub':'github/E8EAED','Jira':'jira/0052CC','Jenkins':'jenkins/D24939','GitHub Actions':'githubactions/2088FF','Canva':'canva/00C4CC','Figma':'figma/F24E1E' }

export function SmartSkillIcon({ name, size = 10 }) {
  const [f, setF] = useState(false)
  const n = name?.trim() || ''
  if (n === 'TestNG') return <TestNGIcon size={size}/>
  if (n === 'REST Assured') return <RestAssuredIcon size={size}/>
  if (n === 'TestRail') return <TestRailIcon size={size}/>
  if (n === 'JUnit') return <JUnitIcon size={size}/>
  const s = BRAND_SLUGS[n]
  if (s && !f) return <img src={`https://cdn.simpleicons.org/${s}`} alt={n} onError={()=>setF(true)} style={{width:size,height:size,objectFit:'contain',display:'inline-block',verticalAlign:'middle',flexShrink:0}}/>
  const F = SKILL_ICONS[n] || Layers
  return <F size={size} style={{opacity:0.9,flexShrink:0}}/>
}

export const RAW_SKILLS = [
  { id:'java', name:'Java', fullName:'Java Programming', category:'Languages & Querying', featured:true, color:'#F89820' },
  { id:'js', name:'JavaScript', fullName:'JavaScript (ES6+)', category:'Languages & Querying', featured:true, color:'#F7DF1E' },
  { id:'react', name:'React', fullName:'React.js', category:'Full Stack Development', featured:true, color:'#61DAFB' },
  { id:'node', name:'Node.js', fullName:'Node.js Runtime', category:'Full Stack Development', featured:true, color:'#339933' },
  { id:'html', name:'HTML', fullName:'HTML5 Markup', category:'Languages & Querying', featured:false, color:'#E34F26' },
  { id:'css', name:'CSS', fullName:'CSS3 Styling', category:'Languages & Querying', featured:false, color:'#1572B6' },

  { id:'sql', name:'SQL', fullName:'SQL Queries', category:'Languages & Querying', featured:true, color:'#38BDF8' },
  { id:'mongo', name:'MongoDB', fullName:'MongoDB', category:'Full Stack Development', featured:true, color:'#47A248' },
  { id:'tailwind', name:'Tailwind CSS', fullName:'Tailwind CSS', category:'Full Stack Development', featured:true, color:'#06B6D4' },
  { id:'restapi', name:'REST APIs', fullName:'RESTful APIs', category:'Full Stack Development', featured:true, color:'#F2A93B' },
  { id:'express', name:'Express.js', fullName:'Express.js', category:'Full Stack Development', featured:false, color:'#E8EAED' },
  { id:'redux', name:'Redux', fullName:'Redux', category:'Full Stack Development', featured:false, color:'#764ABC' },
  { id:'junit', name:'JUnit', fullName:'JUnit Testing', category:'Automation Tools & Frameworks', featured:false, color:'#2563eb' },
  { id:'pom', name:'POM Pattern', fullName:'Page Object Model', category:'Design Patterns', featured:false, color:'#4ADE9A' },

  { id:'selenium', name:'Selenium', fullName:'Selenium WebDriver', category:'Automation Tools & Frameworks', featured:true, color:'#43B02A' },
  { id:'appium', name:'Appium', fullName:'Appium Mobile', category:'Automation Tools & Frameworks', featured:true, color:'#E42D42' },
  { id:'testng', name:'TestNG', fullName:'TestNG Framework', category:'Automation Tools & Frameworks', featured:true, color:'#dc2626' },
  { id:'restassured', name:'REST Assured', fullName:'REST Assured', category:'Automation Tools & Frameworks', featured:true, color:'#16a34a' },
  { id:'postman', name:'Postman', fullName:'Postman API', category:'Automation Tools & Frameworks', featured:false, color:'#FF6C37' },
  { id:'ddt', name:'Data-Driven', fullName:'Data-Driven Testing', category:'Design Patterns', featured:false, color:'#F2A93B' },
  { id:'apitest', name:'API Testing', fullName:'API Automation', category:'Testing Skills & Methodologies', featured:false, color:'#38BDF8' },
  { id:'github', name:'GitHub', fullName:'GitHub Repos', category:'Developer Tools', featured:false, color:'#E8EAED' },
  { id:'testrail', name:'TestRail', fullName:'TestRail Mgmt', category:'Developer Tools', featured:false, color:'#0052CC' },

  { id:'manual', name:'Manual Testing', fullName:'Manual QA', category:'Testing Skills & Methodologies', featured:true, color:'#F2A93B' },
  { id:'agile', name:'Agile', fullName:'Agile & Scrum', category:'Testing Skills & Methodologies', featured:true, color:'#4ADE9A' },
  { id:'git', name:'Git', fullName:'Git Version Control', category:'Developer Tools', featured:true, color:'#F05032' },
  { id:'jira', name:'Jira', fullName:'Jira Tracking', category:'Developer Tools', featured:true, color:'#0052CC' },
  { id:'jenkins', name:'Jenkins', fullName:'Jenkins CI/CD', category:'Developer Tools', featured:true, color:'#D24939' },
  { id:'cicd', name:'CI/CD', fullName:'CI/CD Pipelines', category:'Design Patterns', featured:true, color:'#4ADE9A' },
  { id:'actions', name:'GitHub Actions', fullName:'GitHub Actions', category:'Developer Tools', featured:false, color:'#2088FF' },
  { id:'figma', name:'Figma', fullName:'Figma UI/UX', category:'Content Creation & Design', featured:false, color:'#F24E1E' },
  { id:'canva', name:'Canva', fullName:'Canva Design', category:'Content Creation & Design', featured:false, color:'#00C4CC' },
  { id:'bugtrack', name:'Bug Tracking', fullName:'Bug Tracking', category:'Testing Skills & Methodologies', featured:false, color:'#E8615C' },
  { id:'mobile', name:'Mobile Testing', fullName:'Mobile Testing', category:'Testing Skills & Methodologies', featured:false, color:'#A78BFA' },
]

function FibonacciSphereCluster({ activeCategory, hoveredSkillId, setHoveredSkillId, deviceTier, orbitDensity }) {
  const groupRef = useRef()

  useFrame((_, delta) => {
    if (groupRef.current && !hoveredSkillId) {
      groupRef.current.rotation.y += delta * 0.10
    }
  })

  const visibleSkills = useMemo(() => {
    return RAW_SKILLS.filter(s => orbitDensity !== 'core' || s.featured)
  }, [orbitDensity])

  const N = visibleSkills.length
  const phi = Math.PI * (3 - Math.sqrt(5)) // Golden ratio angle

  const R = deviceTier === 'mobile' ? 2.1 : (deviceTier === 'tablet' ? 2.9 : 3.4)

  const nodes = useMemo(() => {
    return visibleSkills.map((skill, i) => {
      const y = N > 1 ? 1 - (i / (N - 1)) * 2 : 0
      const radiusAtY = Math.sqrt(Math.max(0, 1 - y * y))
      const theta = phi * i
      const x = Math.cos(theta) * radiusAtY * R
      const z = Math.sin(theta) * radiusAtY * R
      return { skill, pos: [x, y * R, z] }
    })
  }, [visibleSkills, N, R])

  return (
    <group ref={groupRef}>
      {/* Holographic Mesh Globe matching cluster radius */}
      <mesh>
        <sphereGeometry args={[R * 0.88, 32, 32]} />
        <meshBasicMaterial color="#38BDF8" wireframe transparent opacity={0.10} />
      </mesh>
      {/* Inner Glowing Reactor Core */}
      <mesh>
        <sphereGeometry args={[deviceTier === 'mobile' ? 0.85 : 1.1, 24, 24]} />
        <meshStandardMaterial color="#081524" emissive="#4ADE9A" emissiveIntensity={0.4} wireframe />
      </mesh>

      {nodes.map(({ skill, pos }) => {
        const isMatch = !activeCategory || activeCategory === 'All' || skill.category === activeCategory
        const isHov = hoveredSkillId === skill.id
        const df = deviceTier === 'mobile' ? 14 : (deviceTier === 'tablet' ? 18 : 15)
        const fontSz = deviceTier === 'mobile' ? '0.40rem' : (deviceTier === 'tablet' ? '0.44rem' : '0.50rem')
        const iconSz = deviceTier === 'mobile' ? 7 : (deviceTier === 'tablet' ? 8 : 9)

        return (
          <Html key={skill.id} position={pos} center distanceFactor={df} zIndexRange={[1,100]}
            style={{
              pointerEvents: isMatch ? 'auto' : 'none',
              transition: 'transform 0.2s ease, opacity 0.2s ease',
              transform: `scale(${isHov ? 1.2 : isMatch ? 1 : 0.75})`,
              opacity: isHov ? 1.0 : isMatch ? 0.92 : 0.12,
              zIndex: isHov ? 100 : 10,
            }}>
            <div onMouseEnter={() => setHoveredSkillId(skill.id)} onMouseLeave={() => setHoveredSkillId(null)}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '2px 6px', borderRadius: '999px',
                background: isHov ? `color-mix(in srgb, ${skill.color} 25%, #070e17)` : 'rgba(10, 16, 26, 0.92)',
                backdropFilter: 'blur(6px)', border: `1px solid ${isHov ? skill.color : 'rgba(255, 255, 255, 0.15)'}`,
                boxShadow: isHov ? `0 0 16px ${skill.color}80` : '0 2px 6px rgba(0,0,0,0.4)',
                color: '#E5E7EB', fontFamily: 'var(--font-mono)', fontSize: fontSz, fontWeight: 600,
                whiteSpace: 'nowrap', cursor: 'pointer', userSelect: 'none', position: 'relative'
              }}>
              <SmartSkillIcon name={skill.name} size={iconSz} />
              <span>{skill.name}</span>
              {isHov && (
                <div style={{ position:'absolute',bottom:'140%',left:'50%',transform:'translateX(-50%)',background:'#070d14',
                  border:`1px solid ${skill.color}`,borderRadius:'6px',padding:'4px 8px',
                  boxShadow:`0 6px 16px rgba(0,0,0,0.8)`,zIndex:1000,pointerEvents:'none',minWidth:'110px',textAlign:'center' }}>
                  <div style={{fontSize:'0.45rem',color:skill.color,textTransform:'uppercase',letterSpacing:'0.06em'}}>{skill.category}</div>
                  <div style={{fontSize:'0.58rem',color:'#FFF',fontWeight:700,marginTop:'2px'}}>{skill.fullName}</div>
                </div>
              )}
            </div>
          </Html>
        )
      })}
    </group>
  )
}

function getDeviceTier() {
  if (typeof window === 'undefined') return 'desktop'
  const w = window.innerWidth
  if (w < 640) return 'mobile'
  if (w < 1024) return 'tablet'
  return 'desktop'
}

export default function EarthSkillsCanvas({ activeCategory, hoveredSkillId, setHoveredSkillId, orbitDensity = 'core' }) {
  const [deviceTier, setDeviceTier] = useState(getDeviceTier)

  useEffect(() => {
    const handleResize = () => setDeviceTier(getDeviceTier())
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const camZ = deviceTier === 'mobile' ? 15 : (deviceTier === 'tablet' ? 18 : 15)
  const fov = deviceTier === 'mobile' ? 38 : (deviceTier === 'tablet' ? 40 : 36)
  const containerHeight = deviceTier === 'mobile' ? '360px' : (deviceTier === 'tablet' ? '500px' : '580px')

  return (
    <div style={{
      width: '100%',
      height: containerHeight,
      position: 'relative',
      overflow: 'hidden',
      background: 'transparent',
      touchAction: 'pan-y',
    }}>
      <Canvas camera={{position:[0, 0, camZ], fov}} gl={{antialias:true,alpha:true}} dpr={[1, 1.5]} style={{background:'transparent'}}>
        <ambientLight intensity={1.2}/>
        <directionalLight position={[10,10,10]} intensity={2.0} color="#FFFFFF"/>
        <directionalLight position={[-10,-10,-10]} intensity={0.8} color="#38BDF8"/>
        <pointLight position={[0,0,8]} intensity={1.2} color="#4ADE9A"/>
        <OrbitControls enableZoom={false} enablePan={false} rotateSpeed={0.6} autoRotate={!hoveredSkillId} autoRotateSpeed={0.4}/>

        <FibonacciSphereCluster
          activeCategory={activeCategory}
          hoveredSkillId={hoveredSkillId}
          setHoveredSkillId={setHoveredSkillId}
          deviceTier={deviceTier}
          orbitDensity={orbitDensity}
        />
      </Canvas>
    </div>
  )
}
