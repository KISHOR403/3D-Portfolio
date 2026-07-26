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

/* Each orbit has RADICALLY different tilt so they never converge */
const ORBIT_CONFIGS = [
  { radius: 2.8, rotX: 1.26, rotZ: 0.0,   speed: 0.14,  color: '#4ADE9A' },
  { radius: 4.2, rotX: 0.70, rotZ: 0.50,  speed:-0.10,  color: '#F2A93B' },
  { radius: 5.8, rotX: 0.44, rotZ:-0.30,  speed: 0.07,  color: '#38BDF8' },
  { radius: 7.4, rotX: 0.21, rotZ: 0.10,  speed:-0.05,  color: '#A78BFA' },
]

const ang = (i, n, off = 0) => (Math.PI * 2 / n) * i + off

export const ALL_ORBIT_SKILLS = [
  { id:'java',name:'Java',fullName:'Java Programming',category:'Languages & Querying',orbit:0,initialAngle:ang(0,5),color:'#F89820' },
  { id:'js',name:'JavaScript',fullName:'JavaScript (ES6+)',category:'Languages & Querying',orbit:0,initialAngle:ang(1,5),color:'#F7DF1E' },
  { id:'html',name:'HTML',fullName:'HTML5 Markup',category:'Languages & Querying',orbit:0,initialAngle:ang(2,5),color:'#E34F26' },
  { id:'css',name:'CSS',fullName:'CSS3 Styling',category:'Languages & Querying',orbit:0,initialAngle:ang(3,5),color:'#1572B6' },
  { id:'sql',name:'SQL',fullName:'SQL Queries',category:'Languages & Querying',orbit:0,initialAngle:ang(4,5),color:'#38BDF8' },

  { id:'react',name:'React',fullName:'React.js',category:'Full Stack Development',orbit:1,initialAngle:ang(0,8,0.4),color:'#61DAFB' },
  { id:'node',name:'Node.js',fullName:'Node.js Runtime',category:'Full Stack Development',orbit:1,initialAngle:ang(1,8,0.4),color:'#339933' },
  { id:'express',name:'Express.js',fullName:'Express.js',category:'Full Stack Development',orbit:1,initialAngle:ang(2,8,0.4),color:'#E8EAED' },
  { id:'mongo',name:'MongoDB',fullName:'MongoDB',category:'Full Stack Development',orbit:1,initialAngle:ang(3,8,0.4),color:'#47A248' },
  { id:'redux',name:'Redux',fullName:'Redux',category:'Full Stack Development',orbit:1,initialAngle:ang(4,8,0.4),color:'#764ABC' },
  { id:'tailwind',name:'Tailwind CSS',fullName:'Tailwind CSS',category:'Full Stack Development',orbit:1,initialAngle:ang(5,8,0.4),color:'#06B6D4' },
  { id:'restapi',name:'REST APIs',fullName:'RESTful APIs',category:'Full Stack Development',orbit:1,initialAngle:ang(6,8,0.4),color:'#F2A93B' },
  { id:'manual',name:'Manual Testing',fullName:'Manual QA',category:'Testing Skills & Methodologies',orbit:1,initialAngle:ang(7,8,0.4),color:'#F2A93B' },

  { id:'selenium',name:'Selenium',fullName:'Selenium WebDriver',category:'Automation Tools & Frameworks',orbit:2,initialAngle:ang(0,9,0.9),color:'#43B02A' },
  { id:'appium',name:'Appium',fullName:'Appium Mobile',category:'Automation Tools & Frameworks',orbit:2,initialAngle:ang(1,9,0.9),color:'#E42D42' },
  { id:'testng',name:'TestNG',fullName:'TestNG Framework',category:'Automation Tools & Frameworks',orbit:2,initialAngle:ang(2,9,0.9),color:'#dc2626' },
  { id:'junit',name:'JUnit',fullName:'JUnit Testing',category:'Automation Tools & Frameworks',orbit:2,initialAngle:ang(3,9,0.9),color:'#2563eb' },
  { id:'restassured',name:'REST Assured',fullName:'REST Assured',category:'Automation Tools & Frameworks',orbit:2,initialAngle:ang(4,9,0.9),color:'#16a34a' },
  { id:'postman',name:'Postman',fullName:'Postman API',category:'Automation Tools & Frameworks',orbit:2,initialAngle:ang(5,9,0.9),color:'#FF6C37' },
  { id:'pom',name:'POM Pattern',fullName:'Page Object Model',category:'Design Patterns',orbit:2,initialAngle:ang(6,9,0.9),color:'#4ADE9A' },
  { id:'ddt',name:'Data-Driven',fullName:'Data-Driven Testing',category:'Design Patterns',orbit:2,initialAngle:ang(7,9,0.9),color:'#F2A93B' },
  { id:'apitest',name:'API Testing',fullName:'API Automation',category:'Testing Skills & Methodologies',orbit:2,initialAngle:ang(8,9,0.9),color:'#38BDF8' },

  { id:'git',name:'Git',fullName:'Git Version Control',category:'Developer Tools',orbit:3,initialAngle:ang(0,10,1.5),color:'#F05032' },
  { id:'github',name:'GitHub',fullName:'GitHub Repos',category:'Developer Tools',orbit:3,initialAngle:ang(1,10,1.5),color:'#E8EAED' },
  { id:'jira',name:'Jira',fullName:'Jira Tracking',category:'Developer Tools',orbit:3,initialAngle:ang(2,10,1.5),color:'#0052CC' },
  { id:'testrail',name:'TestRail',fullName:'TestRail Mgmt',category:'Developer Tools',orbit:3,initialAngle:ang(3,10,1.5),color:'#0052CC' },
  { id:'jenkins',name:'Jenkins',fullName:'Jenkins CI/CD',category:'Developer Tools',orbit:3,initialAngle:ang(4,10,1.5),color:'#D24939' },
  { id:'actions',name:'GitHub Actions',fullName:'GitHub Actions',category:'Developer Tools',orbit:3,initialAngle:ang(5,10,1.5),color:'#2088FF' },
  { id:'cicd',name:'CI/CD',fullName:'CI/CD Pipelines',category:'Design Patterns',orbit:3,initialAngle:ang(6,10,1.5),color:'#4ADE9A' },
  { id:'figma',name:'Figma',fullName:'Figma UI/UX',category:'Content Creation & Design',orbit:3,initialAngle:ang(7,10,1.5),color:'#F24E1E' },
  { id:'canva',name:'Canva',fullName:'Canva Design',category:'Content Creation & Design',orbit:3,initialAngle:ang(8,10,1.5),color:'#00C4CC' },
  { id:'bugtrack',name:'Bug Tracking',fullName:'Bug Tracking',category:'Testing Skills & Methodologies',orbit:3,initialAngle:ang(9,10,1.5),color:'#E8615C' },
  { id:'mobile',name:'Mobile Testing',fullName:'Mobile Testing',category:'Testing Skills & Methodologies',orbit:3,initialAngle:ang(9,10,1.5+0.63),color:'#A78BFA' },
  { id:'agile',name:'Agile',fullName:'Agile & Scrum',category:'Testing Skills & Methodologies',orbit:3,initialAngle:ang(9,10,1.5+1.26),color:'#4ADE9A' },
]

function useEarthTexture() {
  return useMemo(() => {
    const c = document.createElement('canvas'); c.width = 1024; c.height = 512
    const ctx = c.getContext('2d')
    const g = ctx.createLinearGradient(0,0,0,512)
    g.addColorStop(0,'#091322'); g.addColorStop(0.5,'#0b192e'); g.addColorStop(1,'#08101d')
    ctx.fillStyle = g; ctx.fillRect(0,0,1024,512)
    ctx.strokeStyle = 'rgba(56,189,248,0.08)'; ctx.lineWidth = 1
    for(let x=0;x<=1024;x+=64){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,512);ctx.stroke()}
    for(let y=0;y<=512;y+=32){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(1024,y);ctx.stroke()}
    const continents = [{cx:240,cy:170,rx:110,ry:75},{cx:310,cy:330,rx:65,ry:95},{cx:520,cy:150,rx:60,ry:50},{cx:530,cy:270,rx:80,ry:90},{cx:720,cy:160,rx:150,ry:95},{cx:830,cy:350,rx:60,ry:55},{cx:690,cy:230,rx:45,ry:45}]
    ctx.fillStyle = 'rgba(74,222,154,0.65)'
    continents.forEach(({cx,cy,rx,ry})=>{for(let x=cx-rx;x<=cx+rx;x+=12)for(let y=cy-ry;y<=cy+ry;y+=12){const dx=(x-cx)/rx,dy=(y-cy)/ry;if(dx*dx+dy*dy<=1){ctx.beginPath();ctx.arc(x+(Math.random()-0.5)*4,y+(Math.random()-0.5)*4,Math.sin(x*0.05+y*0.05)>0?2.5:1.8,0,Math.PI*2);ctx.fill()}}})
    const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t
  }, [])
}

function ThreeDEarthGlobe() {
  const ref = useRef(), atmo = useRef()
  const tex = useEarthTexture()
  useFrame((_,d) => { if(ref.current) ref.current.rotation.y+=d*0.08; if(atmo.current) atmo.current.rotation.y+=d*0.05 })
  return (<group>
    <mesh ref={ref}><sphereGeometry args={[1.6,64,64]}/><meshStandardMaterial map={tex} roughness={0.65} metalness={0.3} emissive="#091829" emissiveIntensity={0.4}/></mesh>
    <mesh ref={atmo}><sphereGeometry args={[1.72,48,48]}/><meshBasicMaterial color="#4ADE9A" transparent opacity={0.12} side={THREE.BackSide} blending={THREE.AdditiveBlending}/></mesh>
    <mesh><sphereGeometry args={[1.62,24,24]}/><meshBasicMaterial color="#38BDF8" wireframe transparent opacity={0.06}/></mesh>
  </group>)
}

function OrbitRings() {
  return (<group>{ORBIT_CONFIGS.map((c,i) => (
    <mesh key={i} rotation={[c.rotX,0,c.rotZ]}><torusGeometry args={[c.radius,0.012,16,140]}/><meshBasicMaterial color={c.color} transparent opacity={0.30} blending={THREE.AdditiveBlending}/></mesh>
  ))}</group>)
}

function OrbitingSkillNode({ skill, activeCategory, hoveredSkillId, setHoveredSkillId, isMobile }) {
  const cfg = ORBIT_CONFIGS[skill.orbit]
  const angleRef = useRef(skill.initialAngle)
  const [pos, setPos] = useState([0,0,0])
  const [depthZ, setDepthZ] = useState(1)

  useFrame((_,delta) => {
    angleRef.current += cfg.speed * delta * (hoveredSkillId === skill.id ? 0.05 : 1.0)
    const t = angleRef.current, R = cfg.radius
    const lx = R*Math.cos(t), ly = R*Math.sin(t)
    const y1 = ly*Math.cos(cfg.rotX), z1 = ly*Math.sin(cfg.rotX)
    const x2 = lx*Math.cos(cfg.rotZ) - y1*Math.sin(cfg.rotZ)
    const y2 = lx*Math.sin(cfg.rotZ) + y1*Math.cos(cfg.rotZ)
    setPos([x2,y2,z1]); setDepthZ(z1)
  })

  const isMatch = !activeCategory || activeCategory === 'All' || skill.category === activeCategory
  const isHov = hoveredSkillId === skill.id
  const behind = depthZ < -0.2 && Math.sqrt(pos[0]**2+pos[1]**2) < 1.8
  const op = !isMatch ? 0.05 : behind ? 0.15 : isHov ? 1 : 0.88
  const sc = isHov ? 1.15 : behind ? 0.65 : 1
  const df = isMobile ? 18 : 14

  return (
    <Html position={pos} center distanceFactor={df} zIndexRange={[1,100]}
      style={{ pointerEvents: isMatch&&!behind?'auto':'none', transition:'transform 0.15s ease,opacity 0.2s ease', transform:`scale(${sc})`, opacity:op, zIndex:isHov?100:behind?1:10 }}>
      <div onMouseEnter={()=>setHoveredSkillId(skill.id)} onMouseLeave={()=>setHoveredSkillId(null)}
        style={{ display:'inline-flex',alignItems:'center',gap:'3px',padding:'2px 5px',borderRadius:'999px',
          background:isHov?`color-mix(in srgb,${skill.color} 25%,#0a111a)`:'rgba(10,16,26,0.88)',
          backdropFilter:'blur(4px)',border:`1px solid ${isHov?skill.color:'rgba(255,255,255,0.12)'}`,
          boxShadow:isHov?`0 0 14px ${skill.color}80`:'0 1px 4px rgba(0,0,0,0.3)',
          color:'#E5E7EB',fontFamily:'var(--font-mono)',fontSize:isMobile?'0.42rem':'0.50rem',fontWeight:600,
          whiteSpace:'nowrap',cursor:'pointer',userSelect:'none',position:'relative' }}>
        <SmartSkillIcon name={skill.name} size={isMobile?7:9}/>
        <span>{skill.name}</span>
        {isHov && (
          <div style={{ position:'absolute',bottom:'140%',left:'50%',transform:'translateX(-50%)',background:'#070d14',
            border:`1px solid ${skill.color}`,borderRadius:'6px',padding:'4px 8px',
            boxShadow:`0 6px 16px rgba(0,0,0,0.8)`,zIndex:1000,pointerEvents:'none',minWidth:'100px',textAlign:'center' }}>
            <div style={{fontSize:'0.45rem',color:skill.color,textTransform:'uppercase',letterSpacing:'0.06em'}}>{skill.category}</div>
            <div style={{fontSize:'0.58rem',color:'#FFF',fontWeight:700,marginTop:'2px'}}>{skill.fullName}</div>
          </div>
        )}
      </div>
    </Html>
  )
}

export default function EarthSkillsCanvas({ activeCategory, hoveredSkillId, setHoveredSkillId }) {
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768)
  useEffect(() => { const h=()=>setIsMobile(window.innerWidth<768); window.addEventListener('resize',h); return ()=>window.removeEventListener('resize',h) }, [])

  const camZ = isMobile ? 18 : 14
  const fov = isMobile ? 50 : 38

  return (
    <div style={{ width:'100%', height:isMobile?'420px':'620px', position:'relative', overflow:'hidden', background:'transparent' }}>
      <Canvas camera={{position:[0,1.5,camZ],fov}} gl={{antialias:true,alpha:true}} dpr={[1,1.5]} style={{background:'transparent'}}>
        <ambientLight intensity={1.2}/>
        <directionalLight position={[10,10,10]} intensity={2.0} color="#FFFFFF"/>
        <directionalLight position={[-10,-10,-10]} intensity={0.8} color="#38BDF8"/>
        <pointLight position={[0,0,8]} intensity={1.2} color="#4ADE9A"/>
        <OrbitControls enableZoom={false} enablePan={false} rotateSpeed={0.6} autoRotate={!hoveredSkillId} autoRotateSpeed={0.4}/>
        <ThreeDEarthGlobe/>
        <OrbitRings/>
        {ALL_ORBIT_SKILLS.map(s=>(<OrbitingSkillNode key={s.id} skill={s} activeCategory={activeCategory} hoveredSkillId={hoveredSkillId} setHoveredSkillId={setHoveredSkillId} isMobile={isMobile}/>))}
      </Canvas>
    </div>
  )
}
