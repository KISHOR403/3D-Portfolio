import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 50, y: 30 })
  const [pongPos, setPongPos] = useState(20)

  // Counter loop from 0 to 100
  useEffect(() => {
    const duration = 2200 // 2.2s total loading time
    const intervalTime = 25
    const steps = duration / intervalTime
    let currentStep = 0

    const timer = setInterval(() => {
      currentStep++
      const nextProgress = Math.min(100, Math.floor((currentStep / steps) * 100))
      setProgress(nextProgress)

      if (currentStep >= steps) {
        clearInterval(timer)
        setTimeout(() => {
          setIsComplete(true)
          setTimeout(() => {
            if (onComplete) onComplete()
          }, 800)
        }, 500)
      }
    }, intervalTime)

    return () => clearInterval(timer)
  }, [onComplete])

  // Mini pong game animation frame
  useEffect(() => {
    let dir = 1
    const pongTimer = setInterval(() => {
      setPongPos((prev) => {
        if (prev > 70) dir = -1
        if (prev < 15) dir = 1
        return prev + dir * 3
      })
    }, 40)
    return () => clearInterval(pongTimer)
  }, [])

  const handlePointerMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const clientX = e.touches ? e.touches[0].clientX : e.clientX
    const clientY = e.touches ? e.touches[0].clientY : e.clientY
    setMousePos({
      x: clientX - rect.left,
      y: clientY - rect.top,
    })
  }

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, delay: 0.4 } }}
          id="preloader-overlay"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            background: '#EAE5EC',
            color: '#0F1419',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '1.5rem 1.5rem',
            overflow: 'hidden',
            fontFamily: 'var(--font-sans)',
            userSelect: 'none',
          }}
          className="preloader-wrapper"
        >
          {/* Top Bar Header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              zIndex: 2,
            }}
          >
            {/* Top Left Brand Name */}
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: '1.1rem',
                letterSpacing: '-0.02em',
                color: '#0F1419',
              }}
            >
              KishorGogoi
            </div>

            {/* Top Right Animated Pong Game */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                height: '28px',
                width: '52px',
                position: 'relative',
              }}
              title="Mini Pong Loader"
            >
              <div
                style={{
                  width: '3px',
                  height: '16px',
                  background: '#0F1419',
                  borderRadius: '2px',
                  transform: `translateY(${Math.sin(pongPos * 0.1) * 5}px)`,
                }}
              />
              <div
                style={{
                  width: '5px',
                  height: '5px',
                  borderRadius: '50%',
                  background: '#A855F7',
                  position: 'absolute',
                  left: `${pongPos}%`,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  boxShadow: '0 0 6px rgba(168, 85, 247, 0.8)',
                }}
              />
              <div
                style={{
                  width: '3px',
                  height: '16px',
                  background: '#0F1419',
                  borderRadius: '2px',
                  position: 'absolute',
                  right: 0,
                  transform: `translateY(${Math.cos(pongPos * 0.1) * 5}px)`,
                }}
              />
            </div>
          </div>

          {/* Background Marquee Text */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: 0,
              right: 0,
              transform: 'translateY(-50%)',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              pointerEvents: 'none',
              zIndex: 1,
              opacity: 0.12,
            }}
          >
            <motion.div
              animate={{ x: ['0%', '-50%'] }}
              transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
              style={{
                display: 'inline-block',
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(3rem, 10vw, 8rem)',
                fontWeight: 900,
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                color: '#0F1419',
              }}
            >
              FULL STACK DEVELOPER &nbsp;•&nbsp; QA AUTOMATION ENGINEER &nbsp;•&nbsp; CONTENT CREATOR &nbsp;•&nbsp; FULL STACK DEVELOPER &nbsp;•&nbsp; QA AUTOMATION ENGINEER &nbsp;•&nbsp;
            </motion.div>
          </div>

          {/* Center Pill Button & Counter */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              zIndex: 3,
              position: 'relative',
            }}
          >
            <div
              onMouseMove={handlePointerMove}
              onTouchMove={handlePointerMove}
              className="preloader-pill"
              style={{
                position: 'relative',
                background: '#0F1419',
                color: '#FFFFFF',
                borderRadius: '999px',
                padding: '14px 36px',
                display: 'flex',
                alignItems: 'center',
                gap: '18px',
                boxShadow: '0 15px 35px rgba(0, 0, 0, 0.25)',
                overflow: 'hidden',
                cursor: 'default',
              }}
            >
              {/* Dynamic Mouse/Touch Tracking Glow */}
              <div
                style={{
                  position: 'absolute',
                  top: mousePos.y - 50,
                  left: mousePos.x - 50,
                  width: '100px',
                  height: '100px',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(168, 85, 247, 0.75) 0%, transparent 70%)',
                  pointerEvents: 'none',
                }}
              />

              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: '#FFFFFF',
                  position: 'relative',
                  zIndex: 2,
                }}
              >
                {progress < 100 ? 'LOADING' : 'WELCOME'}
              </span>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  color: '#4ADE9A',
                  position: 'relative',
                  zIndex: 2,
                }}
              >
                <span>{progress}%</span>
                <span
                  className="terminal-cursor"
                  style={{
                    display: 'inline-block',
                    width: '7px',
                    height: '14px',
                    background: '#4ADE9A',
                    marginLeft: '3px',
                  }}
                />
              </div>
            </div>
          </div>

          {/* Bottom Bar Info */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              zIndex: 2,
              fontFamily: 'var(--font-mono)',
              fontSize: '0.7rem',
              color: 'rgba(15, 20, 25, 0.6)',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
            }}
          >
            <span>Initialising Portfolio...</span>
            <span>2026 Portfolio</span>
          </div>

          {/* Expanding Circle Mask for Smooth Reveal */}
          {progress === 100 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 50 }}
              transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: '100px',
                height: '100px',
                borderRadius: '50%',
                background: 'var(--color-bg-base)',
                transform: 'translate(-50%, -50%)',
                zIndex: 10,
                pointerEvents: 'none',
              }}
            />
          )}

          <style>{`
            @media (max-width: 640px) {
              .preloader-wrapper {
                padding: 1.25rem 1rem !important;
              }
              .preloader-pill {
                padding: 12px 24px !important;
                gap: 12px !important;
              }
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
