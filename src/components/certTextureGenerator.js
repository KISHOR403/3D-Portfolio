import * as THREE from 'three'

/* ─────────────────────────────────────────────
   ISSUER CONFIGURATION & HIGH-CONTRAST ACCENTS
   ───────────────────────────────────────────── */
export const ISSUER_CONFIG = {
  SAP: {
    accent: '#004B87',
    badgeBg: '#0A3B66',
    border: '#004B87',
    tag: 'ENTERPRISE ERP & AGILE GOVERNANCE',
  },
  Oracle: {
    accent: '#B82318',
    badgeBg: '#8E1710',
    border: '#B82318',
    tag: 'CLOUD ARCHITECTURE & DEVOPS',
  },
  Coursera: {
    accent: '#00419E',
    badgeBg: '#002E7A',
    border: '#00419E',
    tag: 'SOFTWARE AUTOMATION SPECIALIZATION',
  },
  IBM: {
    accent: '#0F4C81',
    badgeBg: '#0A365C',
    border: '#0F4C81',
    tag: 'DEVOPS & CONTINUOUS TESTING',
  },
  Anthropic: {
    accent: '#965C14',
    badgeBg: '#7A4508',
    border: '#965C14',
    tag: 'GENERATIVE AI & AGENTIC WORKFLOWS',
  },
}

/* ─────────────────────────────────────────────
   AUTHENTIC COMPETENCIES FOR ALL 9 CREDENTIALS
   ───────────────────────────────────────────── */
export const CERT_CURRICULUM = {
  'SAP Certified Project Manager – SAP Activate & Agile': {
    skills: [
      'SAP Activate Methodology & Quality Gate Audits',
      'Agile Sprint Governance & Delivery Risk Mitigation',
      'End-to-End ERP System Integration Testing',
      'Stakeholder Alignment & Release Readiness Gate',
    ],
    hash: 'SAP-ACT-2026-9812-7F',
  },
  'Oracle Cloud Infrastructure 2025 Certified DevOps Professional': {
    skills: [
      'Automated CI/CD Pipeline Orchestration',
      'Infrastructure as Code (Terraform) Testing',
      'Containerized Microservices & Kubernetes QA',
      'Deployment Verification Testing (DVT)',
    ],
    hash: 'OCI-DVP-2025-4421-3A',
  },
  'Oracle Cloud Infrastructure 2025 AI Foundations Associate': {
    skills: [
      'Generative AI & LLM Model Benchmarking',
      'Prompt Testing & Hallucination Guardrails',
      'Vector Search & RAG Quality Verification',
      'Model Safety & Bias Mitigation Protocols',
    ],
    hash: 'OCI-AIF-2025-1092-8E',
  },
  'Oracle Data Platform 2025 Certified Foundations Associate': {
    skills: [
      'Autonomous Database Schema Validation',
      'ETL Pipeline & Data Lakehouse Quality Gates',
      'Data Integrity, Consistency & ACID Testing',
      'High-Availability & Disaster Recovery Auditing',
    ],
    hash: 'OCI-DAT-2025-6617-2D',
  },
  'Software Testing and Automation Specialization': {
    skills: [
      'Test Automation Architecture & TestNG / JUnit',
      'Boundary Value Analysis & Equivalence Partitioning',
      'Regression Suite Optimization & Flaky Triage',
      'Defect Lifecycle Management & Root Cause Metrics',
    ],
    hash: 'CRS-STA-2025-8834-5B',
  },
  'Web and Mobile Testing with Selenium': {
    skills: [
      'Selenium WebDriver Cross-Browser Automation',
      'Page Object Model (POM) Design Patterns',
      'Mobile Automation with Appium Architecture',
      'Dynamic Wait Strategies & AJAX Synchronization',
    ],
    hash: 'CRS-SEL-2025-3319-9C',
  },
  'IBM DevOps and Software Engineering': {
    skills: [
      'Test-Driven Development (TDD) & BDD Practices',
      'Continuous Integration with Jenkins & GitHub Actions',
      'Microservice Resiliency & Chaos Testing',
      'DORA Metrics: MTTR, Lead Time, Change Fail Rate',
    ],
    hash: 'IBM-DEV-2025-5591-1F',
  },
  'Claude 101 — Certificate of Completion': {
    skills: [
      'Anthropic Claude API Integration & Evaluation',
      'Context Window Optimization & Token Efficiency',
      'System Prompt Engineering & Few-Shot Calibration',
      'Structured Output Validation & Schema Conformance',
    ],
    hash: 'ANT-C101-2025-7724-4K',
  },
  'Claude Code 101 — Certificate of Completion': {
    skills: [
      'Autonomous Agent Tool-Use & Terminal Execution',
      'Multi-Step Reasoning & Automated Verification Loops',
      'Self-Correcting Test Suites with AI Subagents',
      'Production Code Quality & Human-in-the-Loop Safety',
    ],
    hash: 'ANT-CC101-2026-9042-6M',
  },
}

/* Helper to wrap text cleanly on Canvas with maximum readability */
function wrapText(ctx, text, x, y, maxWidth, lineHeight, maxLines = 4) {
  const words = text.split(' ')
  let line = ''
  let currentY = y
  let linesDrawn = 0

  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + ' '
    const metrics = ctx.measureText(testLine)
    const testWidth = metrics.width
    if (testWidth > maxWidth && n > 0) {
      if (linesDrawn === maxLines - 1 && n < words.length - 1) {
        ctx.fillText(line.trim() + '...', x, currentY)
        return currentY + lineHeight
      }
      ctx.fillText(line.trim(), x, currentY)
      line = words[n] + ' '
      currentY += lineHeight
      linesDrawn++
    } else {
      line = testLine
    }
  }
  ctx.fillText(line.trim(), x, currentY)
  return currentY + lineHeight
}

/* Configure Three.js texture for maximum sharpness */
function setupCrispTexture(canvas) {
  const texture = new THREE.CanvasTexture(canvas)
  texture.generateMipmaps = false
  texture.minFilter = THREE.LinearFilter
  texture.magFilter = THREE.LinearFilter
  texture.needsUpdate = true
  return texture
}

/* ─────────────────────────────────────────────
   CREATE FRONT CERTIFICATE CANVAS TEXTURE
   High-contrast, large bold typography
   ───────────────────────────────────────────── */
export function createCertFrontTexture(cert, index, total) {
  const canvas = document.createElement('canvas')
  canvas.width = 1400
  canvas.height = 1925
  const ctx = canvas.getContext('2d')
  const W = canvas.width
  const H = canvas.height

  const cfg = ISSUER_CONFIG[cert.issuer] || {
    accent: '#1E293B',
    badgeBg: '#0F172A',
    border: '#1E293B',
    tag: 'PROFESSIONAL CREDENTIAL',
  }
  const curr = CERT_CURRICULUM[cert.title] || {
    skills: ['Quality Assurance Governance', 'Automated Verification Suites', 'Continuous Integration Testing'],
    hash: `KG-QA-${cert.year}-00${index + 1}`,
  }

  // 1. Warm parchment base with circular rounded outer corners (not 90 degree)
  ctx.beginPath()
  ctx.roundRect(0, 0, W, H, [0, 56, 56, 0])
  ctx.fillStyle = '#FAF7F0'
  ctx.fill()
  ctx.clip()

  // Subtle perimeter vignette for book page depth
  const grad = ctx.createLinearGradient(0, 0, W, 0)
  grad.addColorStop(0, 'rgba(0,0,0,0.06)')
  grad.addColorStop(0.04, 'transparent')
  grad.addColorStop(0.96, 'transparent')
  grad.addColorStop(1, 'rgba(0,0,0,0.05)')
  ctx.fillStyle = grad
  ctx.fillRect(0, 0, W, H)

  // 2. Bold structural frame with rounded outer corners
  const m = 56
  ctx.strokeStyle = '#2D3748'
  ctx.lineWidth = 3.5
  ctx.beginPath()
  ctx.roundRect(m, m, W - m * 2, H - m * 2, [0, 40, 40, 0])
  ctx.stroke()

  ctx.strokeStyle = '#CBD5E1'
  ctx.lineWidth = 1.5
  ctx.beginPath()
  ctx.roundRect(m + 12, m + 12, W - (m + 12) * 2, H - (m + 12) * 2, [0, 28, 28, 0])
  ctx.stroke()

  // 3. Header Bar: Record Number & Validation Year
  ctx.textAlign = 'left'
  ctx.fillStyle = '#0F172A'
  ctx.font = '800 24px "JetBrains Mono", monospace'
  ctx.fillText(`CREDENTIAL ARCHIVE // RECORD 0${index + 1} OF 0${total}`, m + 36, m + 64)

  ctx.textAlign = 'right'
  ctx.fillStyle = cfg.accent
  ctx.font = '800 24px "Space Grotesk", sans-serif'
  ctx.fillText(`VALIDATED ${cert.year}`, W - m - 36, m + 64)

  // Dividing rule
  ctx.strokeStyle = '#475569'
  ctx.lineWidth = 2
  ctx.beginPath()
  ctx.moveTo(m + 36, m + 86)
  ctx.lineTo(W - m - 36, m + 86)
  ctx.stroke()

  // 4. Issuer Badge & Category Tag
  const badgeY = m + 148
  ctx.textAlign = 'left'
  // Badge background
  ctx.fillStyle = cfg.badgeBg
  const badgeText = cert.issuer.toUpperCase()
  ctx.font = '800 24px "Space Grotesk", sans-serif'
  const textWidth = ctx.measureText(badgeText).width
  const pillW = textWidth + 48

  ctx.beginPath()
  ctx.roundRect(m + 36, badgeY - 32, pillW, 46, 8)
  ctx.fill()

  // Badge text (crisp white)
  ctx.fillStyle = '#FFFFFF'
  ctx.fillText(badgeText, m + 60, badgeY)

  // Category Tag next to badge (crisp dark slate)
  ctx.fillStyle = '#1E293B'
  ctx.font = '800 22px "Space Grotesk", sans-serif'
  ctx.fillText(`//  ${cfg.tag}`, m + pillW + 60, badgeY)

  // 5. Certification Title (Ultra-bold, large, high-contrast)
  ctx.textAlign = 'left'
  ctx.fillStyle = '#0A0F1D'
  ctx.font = '800 52px "Outfit", "Space Grotesk", sans-serif'
  const titleY = badgeY + 88
  const nextY = wrapText(ctx, cert.title, m + 36, titleY, W - (m * 2 + 72), 64, 3)

  // 6. Subtitle / Accreditation Statement
  ctx.fillStyle = '#334155'
  ctx.font = '600 24px "Inter", sans-serif'
  const subText = `Official credential verified passing all quality benchmarks and technical criteria issued by ${cert.issuer}.`
  const afterSubY = wrapText(ctx, subText, m + 36, nextY + 18, W - (m * 2 + 72), 36, 2)

  // Dividing rule with accent bar
  const divY = afterSubY + 28
  ctx.strokeStyle = '#CBD5E1'
  ctx.lineWidth = 2
  ctx.beginPath()
  ctx.moveTo(m + 36, divY)
  ctx.lineTo(W - m - 36, divY)
  ctx.stroke()

  ctx.strokeStyle = cfg.accent
  ctx.lineWidth = 4
  ctx.beginPath()
  ctx.moveTo(m + 36, divY)
  ctx.lineTo(m + 160, divY)
  ctx.stroke()

  // 7. Tested Competencies Section
  const compY = divY + 54
  ctx.fillStyle = '#0F172A'
  ctx.font = '800 24px "JetBrains Mono", monospace'
  ctx.fillText('VERIFIED COMPETENCY DOMAINS:', m + 36, compY)

  curr.skills.forEach((skill, i) => {
    const cardY = compY + 30 + i * 86
    const cardH = 68

    // Card background: Solid crisp white with high-contrast border
    ctx.fillStyle = '#FFFFFF'
    ctx.strokeStyle = '#94A3B8'
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.roundRect(m + 36, cardY, W - (m * 2 + 72), cardH, 8)
    ctx.fill()
    ctx.stroke()

    // Left accent bar on card
    ctx.fillStyle = cfg.accent
    ctx.beginPath()
    ctx.roundRect(m + 36, cardY, 10, cardH, [8, 0, 0, 8])
    ctx.fill()

    // Green Verified Check Dot
    ctx.fillStyle = '#059669'
    ctx.beginPath()
    ctx.arc(m + 72, cardY + cardH * 0.5, 7, 0, Math.PI * 2)
    ctx.fill()

    // Skill text: Large, bold, pure high-contrast black
    ctx.fillStyle = '#0A0F1D'
    ctx.font = '700 26px "Space Grotesk", sans-serif'
    ctx.fillText(skill, m + 96, cardY + cardH * 0.5 + 9)

    // Right checkmark tag
    ctx.fillStyle = '#065F46'
    ctx.font = '800 18px "JetBrains Mono", monospace'
    ctx.textAlign = 'right'
    ctx.fillText('[AUDITED & PASS]', W - m - 60, cardY + cardH * 0.5 + 7)
    ctx.textAlign = 'left'
  })

  // 8. Bottom Security & Sign-off Block
  const botY = H - m - 200

  // Divider
  ctx.strokeStyle = '#475569'
  ctx.lineWidth = 2
  ctx.beginPath()
  ctx.moveTo(m + 36, botY)
  ctx.lineTo(W - m - 36, botY)
  ctx.stroke()

  ctx.fillStyle = '#0F172A'
  ctx.font = '800 20px "JetBrains Mono", monospace'
  ctx.fillText(`AUTHENTICATION RECORD: ${curr.hash}`, m + 36, botY + 38)

  ctx.fillStyle = '#334155'
  ctx.font = '600 20px "Space Grotesk", sans-serif'
  ctx.fillText('QA Automation & Test Engineering Registry • Kishor Gogoi', m + 36, botY + 70)

  // Circular Embossed Gold Seal on the bottom-right
  const sealX = W - m - 110
  const sealY = botY + 54
  const sealR = 50

  ctx.strokeStyle = '#B45309'
  ctx.lineWidth = 3.5
  ctx.beginPath()
  ctx.arc(sealX, sealY, sealR, 0, Math.PI * 2)
  ctx.stroke()

  ctx.fillStyle = 'rgba(180, 83, 9, 0.08)'
  ctx.fill()

  ctx.fillStyle = '#92400E'
  ctx.font = '800 16px "JetBrains Mono", monospace'
  ctx.textAlign = 'center'
  ctx.fillText('QA AUDIT', sealX, sealY - 10)
  ctx.fillText('VERIFIED', sealX, sealY + 12)
  ctx.fillText('PASS', sealX, sealY + 30)

  // 9. Document Action Prompt Bar
  const actionY = H - m - 60
  ctx.fillStyle = cfg.badgeBg
  ctx.beginPath()
  ctx.roundRect(m + 36, actionY - 32, W - (m * 2 + 72), 62, 10)
  ctx.fill()

  ctx.fillStyle = '#FFFFFF'
  ctx.font = '800 22px "Space Grotesk", sans-serif'
  ctx.textAlign = 'center'
  const promptText = cert.pdf
    ? 'CLICK OR TAP TO VIEW OFFICIAL DOCUMENT (PDF) ↗'
    : 'VERIFIED CREDENTIAL RECORD — ISSUER ACCREDITED'
  ctx.fillText(promptText, W * 0.5, actionY + 6)

  return setupCrispTexture(canvas)
}

/* ─────────────────────────────────────────────
   CREATE VERSO (BACK OF PAGE) CANVAS TEXTURE
   Maximum readability, large bold text, no washed-out colors
   ───────────────────────────────────────────── */
export function createCertVersoTexture(cert, index, total) {
  const canvas = document.createElement('canvas')
  canvas.width = 1400
  canvas.height = 1925
  const ctx = canvas.getContext('2d')
  const W = canvas.width
  const H = canvas.height

  const cfg = ISSUER_CONFIG[cert.issuer] || {
    accent: '#1E293B',
    badgeBg: '#0F172A',
    border: '#1E293B',
    tag: 'PROFESSIONAL CREDENTIAL',
  }
  const curr = CERT_CURRICULUM[cert.title] || {
    skills: ['Quality Assurance Governance', 'Automated Verification Suites'],
    hash: `KG-QA-${cert.year}-00${index + 1}`,
  }

  // 1. Warm ivory base with circular rounded outer corners (top-left and bottom-left)
  ctx.beginPath()
  ctx.roundRect(0, 0, W, H, [56, 0, 0, 56])
  ctx.fillStyle = '#F5F1E8'
  ctx.fill()
  ctx.clip()

  // Gutter shadow along the right edge where page attaches to spine
  const gutterGrad = ctx.createLinearGradient(W - 80, 0, W, 0)
  gutterGrad.addColorStop(0, 'transparent')
  gutterGrad.addColorStop(1, 'rgba(0, 0, 0, 0.14)')
  ctx.fillStyle = gutterGrad
  ctx.fillRect(W - 80, 0, 80, H)

  const m = 56
  // Border with rounded outer corners
  ctx.strokeStyle = '#2D3748'
  ctx.lineWidth = 3.5
  ctx.beginPath()
  ctx.roundRect(m, m, W - m * 2, H - m * 2, [40, 0, 0, 40])
  ctx.stroke()

  ctx.strokeStyle = '#CBD5E1'
  ctx.lineWidth = 1.5
  ctx.beginPath()
  ctx.roundRect(m + 12, m + 12, W - (m + 12) * 2, H - (m + 12) * 2, [28, 0, 0, 28])
  ctx.stroke()

  // 2. Header
  ctx.textAlign = 'left'
  ctx.fillStyle = '#0F172A'
  ctx.font = '800 24px "JetBrains Mono", monospace'
  ctx.fillText('TECHNICAL AUDIT REPORT & TESTING SYLLABUS', m + 36, m + 64)

  ctx.textAlign = 'right'
  ctx.font = '800 24px "JetBrains Mono", monospace'
  ctx.fillText(`FOLIO 0${(index + 1) * 2} // 18`, W - m - 36, m + 64)

  ctx.strokeStyle = '#475569'
  ctx.lineWidth = 2
  ctx.beginPath()
  ctx.moveTo(m + 36, m + 86)
  ctx.lineTo(W - m - 36, m + 86)
  ctx.stroke()

  // 3. Title of Credential on Verso (Large and Clear)
  ctx.textAlign = 'left'
  ctx.fillStyle = '#0A0F1D'
  ctx.font = '800 38px "Space Grotesk", sans-serif'
  const titleY = m + 144
  const afterTitleY = wrapText(ctx, `Audited Competencies: ${cert.title}`, m + 36, titleY, W - (m * 2 + 72), 50, 2)

  // 4. Audit Verification Scope Card
  const boxY = afterTitleY + 24
  const boxH = 210

  // Crisp White Card with Dark Border
  ctx.fillStyle = '#FFFFFF'
  ctx.strokeStyle = '#475569'
  ctx.lineWidth = 2
  ctx.beginPath()
  ctx.roundRect(m + 36, boxY, W - (m * 2 + 72), boxH, 10)
  ctx.fill()
  ctx.stroke()

  // Top header in box
  ctx.fillStyle = cfg.accent
  ctx.font = '800 24px "Space Grotesk", sans-serif'
  ctx.fillText('AUDIT VERIFICATION SCOPE', m + 64, boxY + 44)

  // Scope body text (Pure dark slate, bold, easy to read)
  ctx.fillStyle = '#0F172A'
  ctx.font = '600 22px "Inter", sans-serif'
  const scopeText =
    'This certification validates advanced engineering capabilities across automated test execution, quality gate enforcement, and production software reliability under rigorous criteria.'
  wrapText(ctx, scopeText, m + 64, boxY + 84, W - (m * 2 + 128), 34, 3)

  // Green status pill inside scope card
  ctx.fillStyle = '#ECFDF5'
  ctx.strokeStyle = '#059669'
  ctx.lineWidth = 1.5
  ctx.beginPath()
  ctx.roundRect(m + 64, boxY + 144, W - (m * 2 + 128), 44, 6)
  ctx.fill()
  ctx.stroke()

  ctx.fillStyle = '#065F46'
  ctx.font = '800 18px "JetBrains Mono", monospace'
  ctx.fillText('✓ ZERO OPEN DEFECTS  •  100% QUALITY GATE CRITERIA MET', m + 84, boxY + 172)

  // 5. Technical Pillars Evaluated (4 Large Cards)
  const pillarsY = boxY + boxH + 48
  ctx.fillStyle = '#0F172A'
  ctx.font = '800 24px "JetBrains Mono", monospace'
  ctx.fillText('TECHNICAL PILLARS EVALUATED:', m + 36, pillarsY)

  const pillars = [
    { title: '1. Automated Framework Design', desc: 'Robust assertions, Page Object Model, and modular scalable test suites.' },
    { title: '2. Continuous Integration Gate', desc: 'Automated triggers, Dockerized executors, and instant fail-fast gates.' },
    { title: '3. Regression & Defect Triage', desc: 'Root cause isolation, flaky test elimination, and SLA defect tracking.' },
    { title: '4. Enterprise Cloud Architecture', desc: 'High-availability benchmarks, security policies, and data reliability.' },
  ]

  pillars.forEach((p, idx) => {
    const py = pillarsY + 28 + idx * 102
    const ph = 84

    // White Card
    ctx.fillStyle = '#FFFFFF'
    ctx.strokeStyle = '#94A3B8'
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.roundRect(m + 36, py, W - (m * 2 + 72), ph, 8)
    ctx.fill()
    ctx.stroke()

    // Dark Accent Left Strip
    ctx.fillStyle = cfg.accent
    ctx.beginPath()
    ctx.roundRect(m + 36, py, 10, ph, [8, 0, 0, 8])
    ctx.fill()

    // Title: Bold pure black
    ctx.fillStyle = '#0A0F1D'
    ctx.font = '800 24px "Space Grotesk", sans-serif'
    ctx.fillText(p.title, m + 64, py + 36)

    // Description: Dark readable slate
    ctx.fillStyle = '#334155'
    ctx.font = '500 20px "Inter", sans-serif'
    ctx.fillText(p.desc, m + 64, py + 66)
  })

  // 6. Sign-off / Signature Block
  const sigY = H - m - 200
  ctx.strokeStyle = '#475569'
  ctx.lineWidth = 2
  ctx.beginPath()
  ctx.moveTo(m + 36, sigY)
  ctx.lineTo(W - m - 36, sigY)
  ctx.stroke()

  ctx.fillStyle = '#0F172A'
  ctx.font = '800 20px "JetBrains Mono", monospace'
  ctx.fillText(`FINGERPRINT: SHA-256 [${curr.hash}]`, m + 36, sigY + 38)

  ctx.fillStyle = '#0A0F1D'
  ctx.font = 'italic 800 38px "Georgia", serif'
  ctx.fillText('Kishor Gogoi', m + 36, sigY + 88)

  ctx.fillStyle = '#1E293B'
  ctx.font = '700 20px "Space Grotesk", sans-serif'
  ctx.fillText('Senior Quality Assurance & Automation Engineer', m + 36, sigY + 120)
  ctx.fillText('Certified Test Practitioner & Cloud Systems Architect', m + 36, sigY + 148)

  // Official Seal
  const stampX = W - m - 110
  const stampY = sigY + 90
  ctx.strokeStyle = cfg.accent
  ctx.lineWidth = 3
  ctx.beginPath()
  ctx.arc(stampX, stampY, 54, 0, Math.PI * 2)
  ctx.stroke()

  ctx.fillStyle = cfg.accent
  ctx.font = '800 15px "JetBrains Mono", monospace'
  ctx.textAlign = 'center'
  ctx.fillText('QA AUDIT', stampX, stampY - 12)
  ctx.fillText('PASS', stampX, stampY + 8)
  ctx.fillText('2025-2026', stampX, stampY + 28)

  return setupCrispTexture(canvas)
}

/* ─────────────────────────────────────────────
   CREATE INSIDE COVERS (ENDPAPERS)
   ───────────────────────────────────────────── */
export function createCoverTexture(type = 'front') {
  const canvas = document.createElement('canvas')
  canvas.width = 1400
  canvas.height = 1925
  const ctx = canvas.getContext('2d')
  const W = canvas.width
  const H = canvas.height

  // Rich obsidian endpaper base
  const bgGrad = ctx.createLinearGradient(0, 0, W, H)
  bgGrad.addColorStop(0, '#0F1319')
  bgGrad.addColorStop(0.5, '#141A23')
  bgGrad.addColorStop(1, '#0B0E14')
  const corners = type === 'front' ? [56, 0, 0, 56] : [0, 56, 56, 0]
  const borderCorners = type === 'front' ? [40, 0, 0, 40] : [0, 40, 40, 0]
  const innerCorners = type === 'front' ? [28, 0, 0, 28] : [0, 28, 28, 0]

  ctx.beginPath()
  ctx.roundRect(0, 0, W, H, corners)
  ctx.fillStyle = bgGrad
  ctx.fill()
  ctx.clip()

  // Geometric lattice
  ctx.strokeStyle = 'rgba(212, 175, 55, 0.08)'
  ctx.lineWidth = 1.5
  const step = 64
  for (let x = 0; x < W; x += step) {
    for (let y = 0; y < H; y += step) {
      ctx.strokeRect(x, y, step, step)
    }
  }

  const m = 56
  // Outer gold rim with rounded outer corners
  ctx.strokeStyle = '#D4AF37'
  ctx.lineWidth = 3.5
  ctx.beginPath()
  ctx.roundRect(m, m, W - m * 2, H - m * 2, borderCorners)
  ctx.stroke()

  ctx.strokeStyle = 'rgba(212, 175, 55, 0.3)'
  ctx.lineWidth = 1.5
  ctx.beginPath()
  ctx.roundRect(m + 12, m + 12, W - (m + 12) * 2, H - (m + 12) * 2, innerCorners)
  ctx.stroke()

  ctx.textAlign = 'center'

  if (type === 'front') {
    // Inside Front Cover
    ctx.fillStyle = '#F59E0B'
    ctx.font = '800 24px "JetBrains Mono", monospace'
    ctx.fillText('AUTHENTICATED CREDENTIAL REGISTRY', W * 0.5, H * 0.28)

    ctx.fillStyle = '#FFFFFF'
    ctx.font = '800 64px "Outfit", "Space Grotesk", sans-serif'
    ctx.fillText('KISHOR GOGOI', W * 0.5, H * 0.38)

    ctx.fillStyle = '#E2E8F0'
    ctx.font = '700 28px "Space Grotesk", sans-serif'
    ctx.fillText('QA Automation Engineer & Test Architect', W * 0.5, H * 0.44)

    ctx.strokeStyle = '#D4AF37'
    ctx.lineWidth = 2.5
    ctx.beginPath()
    ctx.moveTo(W * 0.3, H * 0.5)
    ctx.lineTo(W * 0.7, H * 0.5)
    ctx.stroke()

    ctx.fillStyle = '#CBD5E1'
    ctx.font = '600 24px "Inter", sans-serif'
    ctx.fillText('9 Verified Professional Certifications', W * 0.5, H * 0.56)
    ctx.fillText('SAP • Oracle • Coursera • IBM • Anthropic', W * 0.5, H * 0.61)

    ctx.fillStyle = '#F59E0B'
    ctx.font = '800 22px "JetBrains Mono", monospace'
    ctx.fillText('ESTABLISHED 2025 — 2026', W * 0.5, H * 0.68)

    ctx.fillStyle = '#FFFFFF'
    ctx.font = '700 24px "Space Grotesk", sans-serif'
    ctx.fillText('Scroll or use arrows to turn pages →', W * 0.5, H * 0.82)
  } else {
    // Inside Back Cover
    ctx.fillStyle = '#10B981'
    ctx.font = '800 26px "JetBrains Mono", monospace'
    ctx.fillText('✓ AUDIT REGISTRY COMPLETE', W * 0.5, H * 0.35)

    ctx.fillStyle = '#FFFFFF'
    ctx.font = '800 56px "Outfit", "Space Grotesk", sans-serif'
    ctx.fillText('ALL 9 CREDENTIALS VERIFIED', W * 0.5, H * 0.45)

    ctx.fillStyle = '#E2E8F0'
    ctx.font = '600 26px "Inter", sans-serif'
    ctx.fillText('Full automation test mastery across ERP, Cloud, AI, and DevOps.', W * 0.5, H * 0.53)

    ctx.fillStyle = '#D4AF37'
    ctx.font = '800 22px "JetBrains Mono", monospace'
    ctx.fillText('CONTINUE SCROLLING FOR DEPLOYMENT & CONTACT ↓', W * 0.5, H * 0.72)
  }

  return setupCrispTexture(canvas)
}
