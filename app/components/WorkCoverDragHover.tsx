import { motion, useMotionValue, useReducedMotion } from 'framer-motion'
import { useCallback, useRef, useState, type ReactNode } from 'react'

type WorkCoverDragHoverProps = {
  children: ReactNode
  className?: string
}

function ExploreHoverPill() {
  return (
    <motion.div
      className="pointer-events-none whitespace-nowrap rounded-full bg-[var(--color-cta)] px-4 py-2.5 font-ui text-[0.58rem] font-semibold uppercase tracking-[0.24em] text-[var(--color-cta-fg)] shadow-[0_10px_28px_rgba(26,24,22,0.28)]"
      aria-hidden
      animate={{
        scale: [1, 1.04, 1],
        rotate: [0, -1.2, 1.2, 0],
      }}
      transition={{
        duration: 2.4,
        repeat: Infinity,
        ease: [0.42, 0, 0.58, 1],
      }}
    >
      Explore me
    </motion.div>
  )
}

export default function WorkCoverDragHover({
  children,
  className = '',
}: WorkCoverDragHoverProps) {
  const reduceMotion = useReducedMotion()
  const rootRef = useRef<HTMLDivElement | null>(null)
  const [hover, setHover] = useState(false)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const syncFromEvent = useCallback(
    (clientX: number, clientY: number) => {
      const el = rootRef.current
      if (!el) return
      if (typeof window !== 'undefined') {
        if (!window.matchMedia('(pointer: fine)').matches) return
      }
      const r = el.getBoundingClientRect()
      x.set(clientX - r.left)
      y.set(clientY - r.top)
    },
    [x, y],
  )

  const onEnter = useCallback(
    (e: React.MouseEvent) => {
      if (typeof window !== 'undefined') {
        if (!window.matchMedia('(pointer: fine)').matches) return
      }
      syncFromEvent(e.clientX, e.clientY)
      setHover(true)
    },
    [syncFromEvent],
  )

  const onMove = useCallback(
    (e: React.MouseEvent) => {
      syncFromEvent(e.clientX, e.clientY)
    },
    [syncFromEvent],
  )

  const onLeave = useCallback(() => {
    setHover(false)
  }, [])

  if (reduceMotion) {
    return (
      <div
        className={`group cursor-pointer ${className}`.trim()}
      >
        {children}
      </div>
    )
  }

  return (
    <div
      ref={rootRef}
      onMouseEnter={onEnter}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`group relative [@media(pointer:fine)]:cursor-none ${className}`.trim()}
    >
      {children}
      {hover ? (
        <motion.div
          className="pointer-events-none absolute left-0 top-0 z-20"
          style={{
            x,
            y,
            translateX: '-50%',
            translateY: '-50%',
          }}
          initial={{ opacity: 0, scale: 0.88 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 420, damping: 28, mass: 0.55 }}
        >
          <ExploreHoverPill />
        </motion.div>
      ) : null}
    </div>
  )
}
