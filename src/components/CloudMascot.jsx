import { useState, useEffect, useRef, useCallback } from 'react'

const STORAGE_KEY = 'portfolio_cloud_mascot_hidden'
const MASCOT_NAME = 'Cloud Buddy'

const QUOTES = [
  'Hi there! 👋',
  "I'm Kishor's QA Buddy ☁️",
  '100% Test Coverage! 🚀',
  'All CI/CD pipelines green! 🟢',
  'Automating tests... 💻',
  'Bug detected? Squashed! 🐛',
  'Quality Gates: ALL PASS 🛡️',
  'Ready to ship with confidence! ⚡',
]

export default function CloudMascot() {
  const [isHidden, setIsHidden] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) === '1'
    } catch {
      return false
    }
  })
  const [isReady, setIsReady] = useState(false)
  const [pos, setPos] = useState(null)
  const [speech, setSpeech] = useState(null)
  const [isDragging, setIsDragging] = useState(false)

  const containerRef = useRef(null)
  const iframeRef = useRef(null)
  const dragStartRef = useRef(null)
  const speechTimersRef = useRef([])
  const quoteIndexRef = useRef(0)

  // Clear timers on unmount
  useEffect(() => {
    const handleResize = () => setPos(null)
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
      speechTimersRef.current.forEach(clearTimeout)
    }
  }, [])

  const triggerSpeech = useCallback((text, duration = 3000) => {
    speechTimersRef.current.forEach(clearTimeout)
    setSpeech(text)
    speechTimersRef.current = [
      setTimeout(() => setSpeech(null), duration),
    ]
  }, [])

  const handleMascotClick = useCallback(() => {
    const quote = QUOTES[quoteIndexRef.current % QUOTES.length]
    quoteIndexRef.current += 1
    triggerSpeech(quote, 2800)
  }, [triggerSpeech])

  // Setup 3D camera auto-reset and speech bubble trigger from Three.js scene
  const setupThreeStage = useCallback((iframe) => {
    let checkInterval
    const startTime = performance.now()

    const inspectStage = async () => {
      try {
        const stage = iframe.contentDocument?.querySelector('three-d-stage')
        const controls = stage?._controls
        if (stage && controls && !stage.shadowRoot?.querySelector('.toolbar')) {
          controls.enabled = true
          controls.enableZoom = false
          controls.enablePan = false
          controls.maxPolarAngle = Math.PI / 2
          stage.style.cursor = 'grab'

          // Smoothly reset camera to front facing after orbit drag
          const { THREE } = await stage.ready
          const camera = stage._camera
          const initialSpherical = new THREE.Spherical().setFromVector3(
            camera.position.clone().sub(controls.target)
          )

          let resetTimer
          let animFrame = 0

          controls.addEventListener('start', () => {
            clearTimeout(resetTimer)
            cancelAnimationFrame(animFrame)
          })

          controls.addEventListener('end', () => {
            resetTimer = setTimeout(() => {
              const currentSpherical = new THREE.Spherical().setFromVector3(
                camera.position.clone().sub(controls.target)
              )
              const deltaTheta =
                ((initialSpherical.theta - currentSpherical.theta + 3 * Math.PI) %
                  (2 * Math.PI)) -
                Math.PI
              const startT = performance.now()

              const step = (now) => {
                const progress = Math.min(1, (now - startT) / 900)
                const ease = 1 - Math.pow(1 - progress, 3)
                const spherical = new THREE.Spherical()
                spherical.radius =
                  currentSpherical.radius +
                  (initialSpherical.radius - currentSpherical.radius) * ease
                spherical.phi =
                  currentSpherical.phi +
                  (initialSpherical.phi - currentSpherical.phi) * ease
                spherical.theta = currentSpherical.theta + deltaTheta * ease

                camera.position.copy(
                  new THREE.Vector3()
                    .setFromSpherical(spherical)
                    .add(controls.target)
                )
                controls.update()
                if (progress < 1) animFrame = requestAnimationFrame(step)
              }
              animFrame = requestAnimationFrame(step)
            }, 1500)
          })

          // Listen to waving trigger via 3D sprite bubble visibility
          const sprite = stage._scene?.children.find((c) => c.isSprite)
          if (sprite) {
            sprite.material.opacity = 0 // hide internal text sprite so HTML bubble renders
            let prevVisible = false
            const bubbleWatcher = setInterval(() => {
              if (!iframe.isConnected) return clearInterval(bubbleWatcher)
              if (sprite.visible && !prevVisible) {
                speechTimersRef.current.forEach(clearTimeout)
                setSpeech('Hi! 👋')
                speechTimersRef.current = [
                  setTimeout(() => setSpeech(`I'm ${MASCOT_NAME} ☁️`), 1100),
                  setTimeout(() => setSpeech(null), 3500),
                ]
              }
              prevVisible = sprite.visible
            }, 100)
          }

          setIsReady(true)
          return
        }

        if (performance.now() - startTime < 30000) {
          setTimeout(inspectStage, 100)
        }
      } catch {
        // Fallback: ready nonetheless
        setIsReady(true)
      }
    }

    inspectStage()
  }, [])

  // Dragging logic
  const handlePointerDown = (e) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    dragStartRef.current = {
      dx: e.clientX - rect.left,
      dy: e.clientY - rect.top,
    }
    setIsDragging(true)
    e.currentTarget.setPointerCapture(e.pointerId)
  }

  const handlePointerMove = (e) => {
    if (!dragStartRef.current || !containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const nextX = Math.min(
      Math.max(10, e.clientX - dragStartRef.current.dx),
      window.innerWidth - rect.width - 10
    )
    const nextY = Math.min(
      Math.max(10, e.clientY - dragStartRef.current.dy),
      window.innerHeight - rect.height - 10
    )
    setPos({ x: nextX, y: nextY })
  }

  const handlePointerUp = (e) => {
    dragStartRef.current = null
    setIsDragging(false)
    try {
      e.currentTarget.releasePointerCapture(e.pointerId)
    } catch {
      // ignore
    }
  }

  const hideMascot = () => {
    setIsHidden(true)
    try {
      localStorage.setItem(STORAGE_KEY, '1')
    } catch {
      // ignore
    }
  }

  const showMascot = () => {
    setIsHidden(false)
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch {
      // ignore
    }
    setTimeout(() => {
      triggerSpeech('I am back! ☁️✨', 2500)
    }, 400)
  }

  if (isHidden) {
    return (
      <button
        type="button"
        className="mascot-restore"
        aria-label={`Show ${MASCOT_NAME}`}
        title={`Show ${MASCOT_NAME}`}
        onClick={showMascot}
      >
        <span className="mascot-restore-icon" aria-hidden="true">☁️</span>
        <span className="mascot-restore-pulse" />
      </button>
    )
  }

  return (
    <div
      ref={containerRef}
      className={`mascot-float${isReady ? ' is-ready' : ''}${isDragging ? ' is-dragging' : ''}`}
      style={
        pos
          ? {
              left: `${pos.x}px`,
              top: `${pos.y}px`,
              right: 'auto',
              bottom: 'auto',
            }
          : undefined
      }
    >
      <iframe
        ref={iframeRef}
        src="/mascot/mascot.html"
        title={MASCOT_NAME}
        onLoad={(e) => setupThreeStage(e.currentTarget)}
        tabIndex={-1}
        aria-hidden="true"
      />

      {/* Speech Bubble */}
      {speech && (
        <span
          className="mascot-say"
          aria-hidden="true"
          onClick={handleMascotClick}
        >
          <span className="mascot-say-dot" />
          <span>{speech}</span>
        </span>
      )}

      {/* Drag & Move Handle */}
      <button
        type="button"
        className="mascot-grip"
        aria-label={`Move ${MASCOT_NAME} (drag to reposition)`}
        title="Drag to reposition"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onClick={handleMascotClick}
      />

      {/* Close button */}
      <button
        type="button"
        className="mascot-close"
        aria-label={`Hide ${MASCOT_NAME}`}
        title="Hide mascot"
        onClick={hideMascot}
      >
        ×
      </button>
    </div>
  )
}
