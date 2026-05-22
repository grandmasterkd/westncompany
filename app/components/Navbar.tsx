import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from 'framer-motion'
import { Link } from '@tanstack/react-router'
import {
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
  type FormEvent,
  type RefObject,
} from 'react'
import {
  workCoverPillLabel,
  workExternalOpensNewTab,
} from '../data/portfolioProjects'
import { ProjectCoverImage, type PortfolioProject } from './WorkScroll'

const pillH = 52
const navTop = 20
const MD_BREAKPOINT = 768

const navLinkClass =
  'text-[0.72rem] font-medium uppercase tracking-[0.1em] text-[var(--color-text)] no-underline transition hover:opacity-70'

function pageGutterPx(vw: number): number {
  return Math.min(Math.max(vw * 0.04, 20), 40)
}

function clampNavWidth(vw: number): number {
  if (vw < MD_BREAKPOINT) {
    const gutter = pageGutterPx(vw)
    return vw - gutter * 2
  }
  return Math.min(vw * 0.4, 400)
}

function navLeft(vw: number, w: number): number {
  if (vw < MD_BREAKPOINT) return pageGutterPx(vw)
  return (vw - w) / 2
}

function computeFooterMorph(footerEl: HTMLElement): boolean {
  const r = footerEl.getBoundingClientRect()
  const vh = window.innerHeight
  return r.top < vh * 0.74 && r.bottom > vh * 0.2
}

type NavbarProps = {
  activeProject: PortfolioProject | null
  footerSlotRef: RefObject<HTMLDivElement | null>
  footerObserveRef: RefObject<HTMLElement | null>
  email?: string
  onEmailChange?: (v: string) => void
  onBookSubmit?: (e: FormEvent<HTMLFormElement>) => void
}

export default function Navbar({
  activeProject,
  footerSlotRef,
  footerObserveRef,
}: NavbarProps) {
  const reduceMotion = useReducedMotion()
  const [footerMode, setFooterMode] = useState(false)
  const footerLayoutRef = useRef(false)

  const topPx = useMotionValue(navTop)
  const leftPx = useMotionValue(0)
  const widthPx = useMotionValue(220)
  const heightPx = useMotionValue(pillH)
  const radiusPx = useMotionValue(9999)

  const springTop = useSpring(topPx, { stiffness: 380, damping: 42, mass: 0.8 })
  const springLeft = useSpring(leftPx, { stiffness: 380, damping: 42, mass: 0.8 })
  const springW = useSpring(widthPx, { stiffness: 380, damping: 42, mass: 0.8 })
  const springH = useSpring(heightPx, { stiffness: 380, damping: 42, mass: 0.8 })
  const springR = useSpring(radiusPx, { stiffness: 420, damping: 44, mass: 0.7 })

  const applyLayout = useCallback(() => {
    const vw = window.innerWidth
    const w = clampNavWidth(vw)
    const isFooter = footerLayoutRef.current

    if (isFooter) {
      const slot = footerSlotRef.current
      if (slot) {
        const rect = slot.getBoundingClientRect()
        if (rect.width > 0 && rect.height > 0) {
          topPx.set(rect.top)
          leftPx.set(rect.left)
          widthPx.set(rect.width)
          heightPx.set(rect.height)
          radiusPx.set(16)
          return
        }
      }
    }

    topPx.set(navTop)
    leftPx.set(navLeft(vw, w))
    widthPx.set(w)
    heightPx.set(pillH)
    radiusPx.set(15)
  }, [footerSlotRef, heightPx, leftPx, radiusPx, topPx, widthPx])

  const sync = useCallback(() => {
    const footer = footerObserveRef.current
    let next = false
    if (footer) {
      next = computeFooterMorph(footer)
    }
    if (next !== footerLayoutRef.current) {
      footerLayoutRef.current = next
      setFooterMode(next)
    }
    applyLayout()
  }, [applyLayout, footerObserveRef])

  useLayoutEffect(() => {
    sync()
    const onScroll = () => {
      sync()
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [sync])

  return (
    <motion.header
      className="pointer-events-none fixed z-50 will-change-transform"
      style={{
        top: springTop,
        left: springLeft,
        width: springW,
        height: springH,
        borderRadius: springR,
      }}
    >
      <motion.div
        className={
          footerMode
            ? 'pointer-events-none flex h-full w-full flex-col items-center justify-center overflow-hidden bg-transparent'
            : 'pointer-events-auto flex h-full w-full flex-col items-center justify-center overflow-hidden bg-white/40 backdrop-blur-md'
        }
        style={{ borderRadius: 'inherit' }}
      >
        <AnimatePresence mode="wait">
          {footerMode ? (
            <div key="footer-video-pass-through" className="h-full w-full " aria-hidden />
          ) : activeProject ? (
            <motion.div
              key={`proj-${activeProject.id}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="flex w-full min-w-0 items-center justify-between gap-3 px-4"
            >
              <div className="flex min-w-0 flex-1 items-center gap-2.5 overflow-hidden">
                <div className="h-9 w-9 shrink-0 overflow-hidden rounded-full bg-[var(--color-placeholder)]">
                  <ProjectCoverImage
                    project={activeProject}
                    decorative
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1 overflow-hidden text-left">
                  <span className="sr-only">{activeProject.name}</span>
                  <span
                    aria-hidden
                    className="inline-flex max-w-full min-w-0 flex-nowrap items-baseline"
                  >
                    {activeProject.name
                      .trim()
                      .split(/\s+/)
                      .filter(Boolean)
                      .map((word, i, arr) => {
                        const wordStagger = reduceMotion ? 0 : 0.07
                        return (
                          <span
                            key={`${activeProject.id}-${word}-${i}`}
                            className="inline-block whitespace-nowrap"
                          >
                            <span className="inline-block overflow-hidden align-bottom">
                              <motion.span
                                className={`inline-block ${navLinkClass}`}
                                initial={{ y: '108%', skewY: 2.2 }}
                                animate={{ y: 0, skewY: 0 }}
                                transition={{
                                  duration: reduceMotion ? 0 : 0.52,
                                  delay: reduceMotion ? 0 : i * wordStagger,
                                  ease: [0.25, 0.9, 0.3, 1],
                                }}
                              >
                                {word}
                              </motion.span>
                            </span>
                            {i < arr.length - 1 ? '\u00a0' : null}
                          </span>
                        )
                      })}
                  </span>
                </div>
              </div>
              <motion.div
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: reduceMotion ? 0 : 0.35,
                  delay: reduceMotion
                    ? 0
                    : 0.06 +
                      activeProject.name
                        .trim()
                        .split(/\s+/)
                        .filter(Boolean).length *
                        0.07,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {activeProject.externalUrl ? (
                  <a
                    href={activeProject.externalUrl}
                    className={`shrink-0 ${navLinkClass}`}
                    {...(workExternalOpensNewTab(activeProject.externalUrl)
                      ? { target: '_blank', rel: 'noopener noreferrer' }
                      : {})}
                  >
                    {workCoverPillLabel(activeProject.externalUrl)}
                  </a>
                ) : (
                  <Link
                    to="/work/$slug"
                    params={{ slug: activeProject.slug }}
                    className={`shrink-0 ${navLinkClass}`}
                  >
                    See work
                  </Link>
                )}
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="default-links"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="flex w-full items-center justify-between gap-2 px-5"
            >
              <Link to="/work" className={navLinkClass}>
                Work
              </Link>
              {/* LOGO PLACEHOLDER — REPLACE: westn brand mark */}
              <Link
                to="/"
                className="flex shrink-0 items-center justify-center no-underline"
                aria-label="Home"
              >
                <img
                  src="/westn-logo-main.svg"
                  alt="Logo"
                  className="h-16 w-16 md:h-24 md:w-24"
                />
                {/* <svg
                  width="28"
                  height="28"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden
                >
                  <circle
                    cx="16"
                    cy="16"
                    r="11"
                    stroke="var(--color-text)"
                    strokeOpacity="0.35"
                    strokeWidth="1.2"
                  />
                  <path
                    d="M10 18c3-4 8-7 12-8-4 2-6 6-6 10 0-3 2-6 5-8-4 1-8 4-11 6z"
                    fill="var(--color-accent)"
                    fillOpacity="0.85"
                  />
                </svg> */}
              </Link>
              <a
                href="https://www.linkedin.com/in/king-david-amoah-017908178/"
                target="_blank"
                rel="noopener noreferrer"
                className={navLinkClass}
              >
                ABOUT
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.header>
  )
}
