import * as THREE from 'three'

/* ─────────────────────────────────────────────
   ISSUER ACCENTS & BRAND PALETTE
   ───────────────────────────────────────────── */
export const ISSUER_CONFIG = {
  SAP: {
    accent: '#2B6CB0',
    lightAccent: '#EBF8FF',
    badgeText: 'SAP SE',
    tag: 'ENTERPRISE ERP & AGILE',
  },
  Oracle: {
    accent: '#C53030',
    lightAccent: '#FFF5F5',
    badgeText: 'ORACLE CLOUD',
    tag: 'CLOUD ARCHITECTURE & DEVOPS',
  },
  Coursera: {
    accent: '#0056D2',
    lightAccent: '#EFF6FF',
    badgeText: 'COURSERA',
    tag: 'SOFTWARE AUTOMATION SPECIALIZATION',
  },
  IBM: {
    accent: '#2B4C7E',
    lightAccent: '#F0F4F8',
    badgeText: 'IBM SYSTEMS',
    tag: 'DEVOPS & CONTINUOUS TESTING',
  },
  Anthropic: {
    accent: '#B7791F',
    lightAccent: '#FFFAF0',
    badgeText: 'ANTHROPIC AI',
    tag: 'GENERATIVE AI & AGENTIC WORKFLOWS',
  },
}

/* ─────────────────────────────────────────────
   CURRICULUM & MODULE BREAKDOWN PER CERTIFICATE
   ───────────────────────────────────────────── */
export const CERT_CURRICULUM = {
  'SAP Certified Project Manager – SAP Activate & Agile': {
    skills: [
      'SAP Activate Methodology & Quality Gates',
      'Agile Sprint Governance & Risk Mitigation',
      'End-to-End System Integration Testing',
      'Stakeholder Alignment & Release Readiness',
    ],
    hash: 'SAP-ACT-2026-9812-7F',
  },
  'Oracle Cloud Infrastructure 2025 Certified DevOps Professional': {
    skills: [
      'Automated CI/CD Pipeline Orchestration',
      'Infrastructure as Code (Terraform) Validation',
      'Containerized Microservices & Kubernetes QA',
      'Deployment Verification Testing (DVT)',
    ],
    hash: 'OCI-DVP-2025-4421-3A',
  },
  'Oracle Cloud Infrastructure 2025 AI Foundations Associate': {
    skills: [
      'Generative AI & LLM Model Evaluation',
      'Prompt Testing & Hallucination Guardrails',
      'Vector Search & RAG Quality Benchmarking',
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
      'Black-box, White-box & Boundary Value Analysis',
      'Regression Test Optimization & Flaky Test Triage',
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
      'Microservice Resiliency Testing & Chaos Engineering',
      'DevOps Metrics (DORA): MTTR, Lead Time, Change Fail',
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

/* Helper to wrap text cleanly on Canvas */
function wrapText(ctx, text, x, y, maxWidth, lineHeight, maxLines = 3) {
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

/* ─────────────────────────────────────────────
   CREATE FRONT CERTIFICATE CANVAS TEXTURE
   ───────────────────────────────────────────── */
export function createCertFrontTexture(cert, index, total) {
  const canvas = document.createElement('canvas')
  canvas.width = 1024
  canvas.height = 1408
  const ctx = canvas.getContext('2d')
  const W = canvas.width
  const H = canvas.height

  const cfg = ISSUER_CONFIG[cert.issuer] || {
    accent: '#4A5568',
    lightAccent: '#EDF2F7',
    badgeText: cert.issuer.toUpperCase(),
    tag: 'PROFESSIONAL CREDENTIAL',
  }
  const curr = CERT_CURRICULUM[cert.title] || {
    skills: ['Quality Assurance Governance', 'Automated Verification Suites', 'Continuous Integration Testing'],
    hash: `KG-QA-${cert.year}-00${index + 1}`,
  }

  // 1. Warm parchment base with radial warm highlight
  const bgGrad = ctx.createRadialGradient(W * 0.45, H * 0.4, 50, W * 0.5, H * 0.5, W * 0.8)
  bgGrad.addColorStop(0, '#FCFAF6')
  bgGrad.addColorStop(0.7, '#F7F2E8')
  bgGrad.addColorStop(1, '#EDE5D6')
  ctx.fillStyle = bgGrad
  ctx.fillRect(0, 0, W, H)

  // 2. Subtle parchment texture noise
  ctx.fillStyle = 'rgba(160, 140, 110, 0.025)'
  for (let i = 0; i < 400; i++) {
    const rx = Math.random() * W
    const ry = Math.random() * H
    ctx.fillRect(rx, ry, Math.random() * 3 + 1, Math.random() * 2 + 1)
  }

  // 3. Elegant double border with corner accents
  const m = 44
  ctx.strokeStyle = '#D4C8B4'
  ctx.lineWidth = 2.5
  ctx.strokeRect(m, m, W - m * 2, H - m * 2)

  ctx.strokeStyle = 'rgba(180, 160, 130, 0.45)'
  ctx.lineWidth = 1
  ctx.strokeRect(m + 8, m + 8, W - (m + 8) * 2, H - (m + 8) * 2)

  // Corner ornaments
  const cLen = 22
  ctx.strokeStyle = cfg.accent
  ctx.lineWidth = 2
  // Top-left
  ctx.beginPath()
  ctx.moveTo(m + 4, m + 4 + cLen); ctx.lineTo(m + 4, m + 4); ctx.lineTo(m + 4 + cLen, m + 4)
  ctx.stroke()
  // Top-right
  ctx.beginPath()
  ctx.moveTo(W - m - 4 - cLen, m + 4); ctx.lineTo(W - m - 4, m + 4); ctx.lineTo(W - m - 4, m + 4 + cLen)
  ctx.stroke()
  // Bottom-left
  ctx.beginPath()
  ctx.moveTo(m + 4, H - m - 4 - cLen); ctx.lineTo(m + 4, H - m - 4); ctx.lineTo(m + 4 + cLen, H - m - 4)
  ctx.stroke()
  // Bottom-right
  ctx.beginPath()
  ctx.moveTo(W - m - 4 - cLen, H - m - 4); ctx.lineTo(W - m - 4, H - m - 4); ctx.lineTo(W - m - 4, H - m - 4 - cLen)
  ctx.stroke()

  // 4. Registry header line
  ctx.textAlign = 'left'
  ctx.fillStyle = '#7A6E5D'
  ctx.font = '600 15px "JetBrains Mono", monospace'
  ctx.letterSpacing = '2px'
  ctx.fillText(`KISHOR GOGOI // VERIFIED CREDENTIAL 0${index + 1} OF 0${total}`, m + 24, m + 38)

  // Top-right Year badge
  ctx.fillStyle = cfg.accent
  ctx.font = '700 15px "Space Grotesk", sans-serif'
  ctx.textAlign = 'right'
  ctx.fillText(`VALIDATED ${cert.year}`, W - m - 24, m + 38)

  // Thin separator rule
  ctx.strokeStyle = 'rgba(180, 160, 130, 0.4)'
  ctx.lineWidth = 1
  ctx.beginPath()
  ctx.moveTo(m + 24, m + 52)
  ctx.lineTo(W - m - 24, m + 52)
  ctx.stroke()

  // 5. Issuer Brand Pill & Category Tag
  const issuerY = m + 96
  ctx.textAlign = 'left'
  // Pill background
  ctx.fillStyle = cfg.accent
  const pillW = ctx.measureText(cfg.badgeText).width + 36
  ctx.beginPath()
  ctx.roundRect(m + 24, issuerY - 22, pillW + 10, 32, 6)
  ctx.fill()

  ctx.fillStyle = '#FFFFFF'
  ctx.font = '700 15px "Space Grotesk", sans-serif'
  ctx.fillText(cfg.badgeText, m + 36, issuerY)

  // Tag next to pill
  ctx.fillStyle = '#5A5040'
  ctx.font = '600 14px "Space Grotesk", sans-serif'
  ctx.fillText(`//  ${cfg.tag}`, m + pillW + 50, issuerY)

  // 6. Certification Title (Large, Editorial, High Contrast)
  ctx.textAlign = 'left'
  ctx.fillStyle = '#141A24'
  ctx.font = '700 38px "Outfit", "Space Grotesk", sans-serif'
  const titleY = issuerY + 68
  const nextY = wrapText(ctx, cert.title, m + 24, titleY, W - (m * 2 + 48), 48, 3)

  // 7. Subtitle / Verification statement
  ctx.fillStyle = '#6E6250'
  ctx.font = '400 17px "Inter", sans-serif'
  ctx.fillText(
    `Official credential issued by ${cert.issuer}. Verified passing all quality benchmarks and technical standards.`,
    m + 24,
    nextY + 14
  )

  // Decorative Rule with Diamond
  const divY = nextY + 44
  ctx.strokeStyle = '#D1C4B0'
  ctx.lineWidth = 1
  ctx.beginPath()
  ctx.moveTo(m + 24, divY)
  ctx.lineTo(W * 0.45, divY)
  ctx.moveTo(W * 0.55, divY)
  ctx.lineTo(W - m - 24, divY)
  ctx.stroke()

  // Center diamond
  ctx.fillStyle = cfg.accent
  ctx.beginPath()
  ctx.moveTo(W * 0.5, divY - 6)
  ctx.lineTo(W * 0.5 + 6, divY)
  ctx.lineTo(W * 0.5, divY + 6)
  ctx.lineTo(W * 0.5 - 6, divY)
  ctx.closePath()
  ctx.fill()

  // 8. Core Tested Competencies (Grid / Chips)
  const compY = divY + 38
  ctx.fillStyle = '#3A3226'
  ctx.font = '700 14px "JetBrains Mono", monospace'
  ctx.letterSpacing = '1px'
  ctx.fillText('VERIFIED COMPETENCY DOMAINS:', m + 24, compY)

  curr.skills.forEach((skill, i) => {
    const cardY = compY + 22 + i * 44
    // Chip container
    ctx.fillStyle = '#FFFFFF'
    ctx.strokeStyle = '#E2D8C6'
    ctx.lineWidth = 1.2
    ctx.beginPath()
    ctx.roundRect(m + 24, cardY, W - (m * 2 + 48), 34, 6)
    ctx.fill()
    ctx.stroke()

    // Status dot
    ctx.fillStyle = '#10B981' // Green pass indicator
    ctx.beginPath()
    ctx.arc(m + 42, cardY + 17, 4.5, 0, Math.PI * 2)
    ctx.fill()

    // Skill text
    ctx.fillStyle = '#1F2937'
    ctx.font = '500 15px "Space Grotesk", sans-serif'
    ctx.fillText(skill, m + 58, cardY + 22)

    // Right checkmark tag
    ctx.fillStyle = '#059669'
    ctx.font = '600 12px "JetBrains Mono", monospace'
    ctx.textAlign = 'right'
    ctx.fillText('[AUDITED]', W - m - 40, cardY + 22)
    ctx.textAlign = 'left'
  })

  // 9. Bottom Authority & Authenticity Block
  const botY = H - m - 140

  // Divider
  ctx.strokeStyle = 'rgba(180, 160, 130, 0.4)'
  ctx.lineWidth = 1
  ctx.beginPath()
  ctx.moveTo(m + 24, botY)
  ctx.lineTo(W - m - 24, botY)
  ctx.stroke()

  // Left stamp details
  ctx.fillStyle = '#4A3E2D'
  ctx.font = '600 13px "JetBrains Mono", monospace'
  ctx.fillText(`AUTHENTICATION RECORD: ${curr.hash}`, m + 24, botY + 28)

  ctx.fillStyle = '#718096'
  ctx.font = '400 13px "Space Grotesk", sans-serif'
  ctx.fillText('Quality Engineering & Testing Architecture Registry • Kishor Gogoi', m + 24, botY + 50)

  // Circular Embossed Gold Seal on the bottom-right
  const sealX = W - m - 80
  const sealY = botY + 44
  const sealR = 36

  // Outer seal ring
  ctx.strokeStyle = '#C9A96E'
  ctx.lineWidth = 2.5
  ctx.beginPath()
  ctx.arc(sealX, sealY, sealR, 0, Math.PI * 2)
  ctx.stroke()

  ctx.strokeStyle = 'rgba(201, 169, 110, 0.4)'
  ctx.lineWidth = 1
  ctx.beginPath()
  ctx.arc(sealX, sealY, sealR - 5, 0, Math.PI * 2)
  ctx.stroke()

  ctx.fillStyle = 'rgba(201, 169, 110, 0.12)'
  ctx.fill()

  // Seal star
  ctx.fillStyle = '#9C7A3C'
  ctx.font = '700 18px "Space Grotesk", sans-serif'
  ctx.textAlign = 'center'
  ctx.fillText('★', sealX, sealY + 6)

  // Document action prompt bar
  const actionY = H - m - 42
  ctx.fillStyle = cfg.accent
  ctx.beginPath()
  ctx.roundRect(m + 24, actionY - 20, W - (m * 2 + 48), 40, 8)
  ctx.fill()

  ctx.fillStyle = '#FFFFFF'
  ctx.font = '700 14px "Space Grotesk", sans-serif'
  ctx.textAlign = 'center'
  const promptText = cert.pdf
    ? 'TAP OR CLICK TO VIEW AUTHENTIC DOCUMENT (PDF) ↗'
    : 'VERIFIED CREDENTIAL RECORD — ISSUER ACCREDITED'
  ctx.fillText(promptText, W * 0.5, actionY + 5)

  const texture = new THREE.CanvasTexture(canvas)
  texture.generateMipmaps = true
  texture.minFilter = THREE.LinearMipmapLinearFilter
  texture.magFilter = THREE.LinearFilter
  texture.needsUpdate = true
  return texture
}

/* ─────────────────────────────────────────────
   CREATE VERSO (BACK OF PAGE) CANVAS TEXTURE
   ───────────────────────────────────────────── */
export function createCertVersoTexture(cert, index, total) {
  const canvas = document.createElement('canvas')
  canvas.width = 1024
  canvas.height = 1408
  const ctx = canvas.getContext('2d')
  const W = canvas.width
  const H = canvas.height

  const cfg = ISSUER_CONFIG[cert.issuer] || {
    accent: '#4A5568',
    lightAccent: '#EDF2F7',
    badgeText: cert.issuer.toUpperCase(),
    tag: 'PROFESSIONAL CREDENTIAL',
  }
  const curr = CERT_CURRICULUM[cert.title] || {
    skills: ['Quality Assurance Governance', 'Automated Verification Suites'],
    hash: `KG-QA-${cert.year}-00${index + 1}`,
  }

  // 1. Slightly softer ivory verso tone
  const bgGrad = ctx.createLinearGradient(0, 0, W, H)
  bgGrad.addColorStop(0, '#F5F1E8')
  bgGrad.addColorStop(0.5, '#EFEAE0')
  bgGrad.addColorStop(1, '#E8E1D3')
  ctx.fillStyle = bgGrad
  ctx.fillRect(0, 0, W, H)

  // Vintage ledger lines (subtle faint rules)
  ctx.strokeStyle = 'rgba(180, 165, 140, 0.12)'
  ctx.lineWidth = 1
  for (let y = 80; y < H - 80; y += 32) {
    ctx.beginPath()
    ctx.moveTo(50, y)
    ctx.lineTo(W - 50, y)
    ctx.stroke()
  }

  const m = 44
  // Border
  ctx.strokeStyle = '#D1C6B4'
  ctx.lineWidth = 1.8
  ctx.strokeRect(m, m, W - m * 2, H - m * 2)

  // Gutter shadow along the right edge (where this verso page touches the spine)
  const gutterGrad = ctx.createLinearGradient(W - m - 40, 0, W - m, 0)
  gutterGrad.addColorStop(0, 'rgba(0, 0, 0, 0)')
  gutterGrad.addColorStop(1, 'rgba(0, 0, 0, 0.12)')
  ctx.fillStyle = gutterGrad
  ctx.fillRect(W - m - 40, m, 40, H - m * 2)

  // Header
  ctx.textAlign = 'left'
  ctx.fillStyle = '#6E604D'
  ctx.font = '700 14px "JetBrains Mono", monospace'
  ctx.letterSpacing = '1.5px'
  ctx.fillText('TECHNICAL AUDIT REPORT & TESTING SYLLABUS', m + 24, m + 40)

  ctx.textAlign = 'right'
  ctx.font = '600 13px "JetBrains Mono", monospace'
  ctx.fillText(`FOLIO 0${(index + 1) * 2} // 18`, W - m - 24, m + 40)

  ctx.strokeStyle = '#D1C6B4'
  ctx.lineWidth = 1
  ctx.beginPath()
  ctx.moveTo(m + 24, m + 54)
  ctx.lineTo(W - m - 24, m + 54)
  ctx.stroke()

  // Title of the credential on verso
  ctx.textAlign = 'left'
  ctx.fillStyle = '#1B2430'
  ctx.font = '700 24px "Space Grotesk", sans-serif'
  const titleY = m + 96
  wrapText(ctx, `Audited Competencies: ${cert.title}`, m + 24, titleY, W - (m * 2 + 48), 34, 2)

  // QA Audit Scope Card
  const boxY = m + 170
  ctx.fillStyle = '#FFFFFF'
  ctx.strokeStyle = '#D8CEBE'
  ctx.lineWidth = 1.2
  ctx.beginPath()
  ctx.roundRect(m + 24, boxY, W - (m * 2 + 48), 160, 8)
  ctx.fill()
  ctx.stroke()

  ctx.fillStyle = cfg.accent
  ctx.font = '700 15px "Space Grotesk", sans-serif'
  ctx.fillText('AUDIT VERIFICATION SCOPE', m + 44, boxY + 34)

  ctx.fillStyle = '#4A5568'
  ctx.font = '400 15px "Inter", sans-serif'
  const scopeText =
    'This certification validates advanced engineering capabilities across automated test execution, quality gate enforcement, and production software reliability. Evaluated under strict industry criteria.'
  wrapText(ctx, scopeText, m + 44, boxY + 64, W - (m * 2 + 88), 24, 3)

  ctx.fillStyle = '#059669'
  ctx.font = '600 13px "JetBrains Mono", monospace'
  ctx.fillText('✓ ZERO OPEN DEFECTS  •  100% QUALITY GATE CRITERIA MET', m + 44, boxY + 138)

  // Section 2: Detailed Syllabus Pillars (4 Cards)
  const pillarsY = boxY + 195
  ctx.fillStyle = '#2D3748'
  ctx.font = '700 15px "JetBrains Mono", monospace'
  ctx.letterSpacing = '1px'
  ctx.fillText('TECHNICAL PILLARS EVALUATED:', m + 24, pillarsY)

  const pillars = [
    { title: '1. Automated Framework Design', desc: 'Robust assertions, Page Objects, modular test architecture.' },
    { title: '2. Continuous Integration Gate', desc: 'Automated triggers, Dockerized executors, instant fail-fast.' },
    { title: '3. Regression & Defect Triage', desc: 'Root cause isolation, flaky test elimination, SLA tracking.' },
    { title: '4. Enterprise Cloud Architecture', desc: 'High-availability benchmarks, security policies, data safety.' },
  ]

  pillars.forEach((p, idx) => {
    const py = pillarsY + 20 + idx * 72
    ctx.fillStyle = '#FFFFFF'
    ctx.strokeStyle = '#E0D6C6'
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.roundRect(m + 24, py, W - (m * 2 + 48), 60, 6)
    ctx.fill()
    ctx.stroke()

    ctx.fillStyle = cfg.accent
    ctx.font = '700 15px "Space Grotesk", sans-serif'
    ctx.fillText(p.title, m + 40, py + 26)

    ctx.fillStyle = '#64748B'
    ctx.font = '400 13.5px "Inter", sans-serif'
    ctx.fillText(p.desc, m + 40, py + 46)
  })

  // Sign-off / Signature Block
  const sigY = H - m - 160
  ctx.strokeStyle = '#D1C6B4'
  ctx.lineWidth = 1
  ctx.beginPath()
  ctx.moveTo(m + 24, sigY)
  ctx.lineTo(W - m - 24, sigY)
  ctx.stroke()

  ctx.fillStyle = '#4A3E2D'
  ctx.font = '600 13px "JetBrains Mono", monospace'
  ctx.fillText(`FINGERPRINT: SHA-256 [${curr.hash}]`, m + 24, sigY + 28)

  ctx.fillStyle = '#1E293B'
  ctx.font = 'italic 700 22px "Georgia", serif'
  ctx.fillText('Kishor Gogoi', m + 24, sigY + 70)

  ctx.fillStyle = '#718096'
  ctx.font = '500 13px "Space Grotesk", sans-serif'
  ctx.fillText('Senior Quality Assurance & Automation Engineer', m + 24, sigY + 95)
  ctx.fillText('Certified Test Practitioner & Cloud Systems Architect', m + 24, sigY + 115)

  // Official Stamp
  const stampX = W - m - 90
  const stampY = sigY + 70
  ctx.strokeStyle = cfg.accent
  ctx.lineWidth = 2
  ctx.beginPath()
  ctx.arc(stampX, stampY, 40, 0, Math.PI * 2)
  ctx.stroke()

  ctx.fillStyle = cfg.accent
  ctx.font = '700 11px "JetBrains Mono", monospace'
  ctx.textAlign = 'center'
  ctx.fillText('QA AUDIT', stampX, stampY - 8)
  ctx.fillText('PASS', stampX, stampY + 8)
  ctx.fillText('2025-2026', stampX, stampY + 22)

  const texture = new THREE.CanvasTexture(canvas)
  texture.generateMipmaps = true
  texture.minFilter = THREE.LinearMipmapLinearFilter
  texture.magFilter = THREE.LinearFilter
  texture.needsUpdate = true
  return texture
}

/* ─────────────────────────────────────────────
   CREATE INSIDE COVERS (ENDPAPERS)
   ───────────────────────────────────────────── */
export function createCoverTexture(type = 'front') {
  const canvas = document.createElement('canvas')
  canvas.width = 1024
  canvas.height = 1408
  const ctx = canvas.getContext('2d')
  const W = canvas.width
  const H = canvas.height

  // Rich obsidian endpaper base
  const bgGrad = ctx.createLinearGradient(0, 0, W, H)
  bgGrad.addColorStop(0, '#0F1319')
  bgGrad.addColorStop(0.5, '#141A23')
  bgGrad.addColorStop(1, '#0B0E14')
  ctx.fillStyle = bgGrad
  ctx.fillRect(0, 0, W, H)

  // Gold geometric lattice watermark
  ctx.strokeStyle = 'rgba(212, 175, 55, 0.05)'
  ctx.lineWidth = 1
  const step = 48
  for (let x = 0; x < W; x += step) {
    for (let y = 0; y < H; y += step) {
      ctx.strokeRect(x, y, step, step)
    }
  }

  const m = 44
  // Outer gold rim
  ctx.strokeStyle = 'rgba(212, 175, 55, 0.35)'
  ctx.lineWidth = 2
  ctx.strokeRect(m, m, W - m * 2, H - m * 2)

  ctx.strokeStyle = 'rgba(212, 175, 55, 0.15)'
  ctx.lineWidth = 1
  ctx.strokeRect(m + 8, m + 8, W - (m + 8) * 2, H - (m + 8) * 2)

  ctx.textAlign = 'center'

  if (type === 'front') {
    // Inside Front Cover
    ctx.fillStyle = '#D4AF37'
    ctx.font = '700 15px "JetBrains Mono", monospace'
    ctx.letterSpacing = '3px'
    ctx.fillText('AUTHENTICATED CREDENTIAL REGISTRY', W * 0.5, H * 0.28)

    ctx.fillStyle = '#FFFFFF'
    ctx.font = '700 42px "Outfit", "Space Grotesk", sans-serif'
    ctx.fillText('KISHOR GOGOI', W * 0.5, H * 0.36)

    ctx.fillStyle = '#94A3B8'
    ctx.font = '500 18px "Space Grotesk", sans-serif'
    ctx.fillText('QA Automation Engineer & Test Architect', W * 0.5, H * 0.41)

    // Divider
    ctx.strokeStyle = 'rgba(212, 175, 55, 0.4)'
    ctx.lineWidth = 1.5
    ctx.beginPath()
    ctx.moveTo(W * 0.35, H * 0.46)
    ctx.lineTo(W * 0.65, H * 0.46)
    ctx.stroke()

    ctx.fillStyle = '#CBD5E1'
    ctx.font = '400 16px "Inter", sans-serif'
    ctx.fillText('9 Professional Certifications & Specializations', W * 0.5, H * 0.52)
    ctx.fillText('SAP • Oracle • Coursera • IBM • Anthropic', W * 0.5, H * 0.56)

    ctx.fillStyle = '#D4AF37'
    ctx.font = '600 14px "JetBrains Mono", monospace'
    ctx.fillText('ESTABLISHED 2025 — 2026', W * 0.5, H * 0.62)

    // Scroll hint
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)'
    ctx.font = '500 15px "Space Grotesk", sans-serif'
    ctx.fillText('Scroll or use arrows to turn pages →', W * 0.5, H * 0.78)
  } else {
    // Inside Back Cover
    ctx.fillStyle = '#10B981'
    ctx.font = '700 16px "JetBrains Mono", monospace'
    ctx.letterSpacing = '2px'
    ctx.fillText('✓ AUDIT REGISTRY COMPLETE', W * 0.5, H * 0.35)

    ctx.fillStyle = '#FFFFFF'
    ctx.font = '700 36px "Outfit", "Space Grotesk", sans-serif'
    ctx.fillText('ALL 9 CREDENTIALS VERIFIED', W * 0.5, H * 0.43)

    ctx.fillStyle = '#94A3B8'
    ctx.font = '400 16px "Inter", sans-serif'
    ctx.fillText('Full automation test mastery across ERP, Cloud, AI, and DevOps.', W * 0.5, H * 0.5)

    ctx.fillStyle = '#D4AF37'
    ctx.font = '600 14px "JetBrains Mono", monospace'
    ctx.fillText('CONTINUE SCROLLING FOR DEPLOYMENT & CONTACT ↓', W * 0.5, H * 0.72)
  }

  const texture = new THREE.CanvasTexture(canvas)
  texture.generateMipmaps = true
  texture.minFilter = THREE.LinearMipmapLinearFilter
  texture.magFilter = THREE.LinearFilter
  texture.needsUpdate = true
  return texture
}
