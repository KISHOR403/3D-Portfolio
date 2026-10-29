import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import portrait from '../assets/profile-cutout.png'

export default function Hero({ onOpenResume }) {
  const reduceMotion = useReducedMotion()

  return (
    <section id="hero" className="editorial-hero">
      <div className="editorial-hero-inner">
        <div className="editorial-hero-background" aria-hidden="true">
          <div className="editorial-backdrop-word">KISHOR GOGOI</div>
          <svg className="editorial-hero-wave" viewBox="0 0 1800 800" preserveAspectRatio="none">
            <path d="M420 340 C545 370 585 475 715 465 C850 454 874 329 1010 337 C1129 344 1180 397 1274 457 C1369 517 1427 579 1500 687" />
            <circle cx="1274" cy="457" r="9" />
            <circle className="editorial-wave-core" cx="1274" cy="457" r="3" />
          </svg>
        </div>

        <motion.div
          className="editorial-copy editorial-copy-left"
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.12, ease: 'easeOut' }}
        >
          <div className="editorial-kicker">
            <span className="editorial-kicker-index">01</span><i />
            <span>Software quality <b>·</b> Test automation</span>
          </div>
          <h1 className="editorial-title"><span>Quality</span><span>is never</span><span>an accident.</span></h1>
          <p className="editorial-intro">Thoughtful testing. Reliable releases.<br />Better digital experiences.</p>
          <a className="editorial-left-link" href="#pipeline-runs">
            <span className="editorial-round-arrow"><ArrowUpRight size={17} strokeWidth={1.4} /></span>
            <span>Explore my work</span>
          </a>
        </motion.div>

        <div className="editorial-portrait-wrap">
          <motion.img
            className="editorial-portrait"
            src={portrait}
            alt="Kishor Gogoi, software quality engineer"
            fetchPriority="high"
            initial={reduceMotion ? false : { y: 24, scale: 0.985 }}
            animate={{ y: 0, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>

        <motion.aside
          className="editorial-copy editorial-copy-right"
          initial={reduceMotion ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.32, ease: 'easeOut' }}
        >
          <div className="editorial-main-copy">
            <span className="editorial-index">01 <i /> QUALITY, BY DESIGN</span>
            <p className="editorial-support">Building confidence in software through manual testing, automation frameworks, API validation, and attention to detail.</p>
            <a className="editorial-text-link" href="#pipeline-runs">
              Explore my projects <ArrowUpRight size={15} strokeWidth={1.5} />
            </a>
            <button className="editorial-text-link editorial-resume-link" type="button" onClick={onOpenResume}>
              Download resume <ArrowUpRight size={15} strokeWidth={1.5} />
            </button>
          </div>
          <div className="editorial-facts-rail" aria-label="Testing specialties and role">
            <span className="editorial-rail-star" aria-hidden="true">✦</span>
            <span>Manual<br />Automation<br />API</span>
            <i />
            <span>QA<br />Engineer</span>
          </div>
        </motion.aside>

        <div className="editorial-bottom-rule">
          <span>Independent QA Engineer</span>
          <span>Bengaluru, India</span>
          <span>Available for opportunities <i /></span>
        </div>
      </div>
    </section>
  )
}
