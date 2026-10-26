import { motion } from 'framer-motion'

export default function SectionHeader({
  number = '',
  category = '',
  title,
  description = '',
  align = 'left',
  serif = false,
  badge = null,
  action = null,
  style = {},
  className = '',
  titleStyle = {},
  descriptionStyle = {},
  motionProps = {
    initial: { opacity: 0, y: 22 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-60px' },
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
}) {
  const isCenter = align === 'center'

  return (
    <motion.div
      {...motionProps}
      className={`section-header ${isCenter ? 'section-header--center' : 'section-header--left'} ${className}`}
      style={style}
    >
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: isCenter ? 'center' : 'space-between',
          width: '100%',
          gap: '1rem',
          marginBottom: '0.45rem',
        }}
      >
        <div className="section-eyebrow">
          {number && <span className="section-eyebrow-num">{number}</span>}
          {number && category && <span className="section-eyebrow-sep">//</span>}
          {category && <span className="section-eyebrow-text">{category}</span>}
          {badge}
        </div>
        {action && <div>{action}</div>}
      </div>

      <h2
        className={`section-headline-editorial ${serif ? 'is-serif' : ''}`}
        style={titleStyle}
      >
        {title}
      </h2>

      {description && (
        <p
          className="section-description"
          style={{ ...(isCenter ? { marginInline: 'auto' } : {}), ...descriptionStyle }}
        >
          {description}
        </p>
      )}
    </motion.div>
  )
}
