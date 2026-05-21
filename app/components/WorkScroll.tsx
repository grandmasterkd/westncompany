import { Link } from '@tanstack/react-router'
import { motion, useReducedMotion } from 'framer-motion'
import { useEffect, useMemo, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { PlusCircleIcon } from '@heroicons/react/24/solid'

import {
  projects,
  getProjectBySlug,
  type PortfolioProject,
  type ProjectCaseStudy,
  type ProjectGalleryItem,
  type CaseStudyBodySection,
} from '../data/portfolioProjects'

export { projects, getProjectBySlug }
export type {
  PortfolioProject,
  ProjectCaseStudy,
  ProjectGalleryItem,
  CaseStudyBodySection,
}

type ProjectCoverImageProps = {
  project: PortfolioProject
  className?: string
  /** Use when the visible project name (or other text) already describes the image. */
  decorative?: boolean
  loading?: 'eager' | 'lazy'
}

export function ProjectCoverImage({
  project,
  className,
  decorative,
  loading = 'lazy',
}: ProjectCoverImageProps) {
  return (
    <img
      src={project.image}
      alt={decorative ? '' : `${project.name} — project preview`}
      className={className}
      loading={loading}
      decoding="async"
    />
  )
}

type WorkScrollProps = {
  onActiveProjectChange: (project: PortfolioProject | null) => void
  /** Cap projects shown (homepage). */
  limit?: number
  /** When set, show a “see more” link below the scroll (e.g. `/work`). */
  seeMoreTo?: '/work'
}

export default function WorkScroll({
  onActiveProjectChange,
  limit,
  seeMoreTo,
}: WorkScrollProps) {
  const reduceMotion = useReducedMotion()
  const visibleProjects = useMemo(
    () => (limit != null ? projects.slice(0, limit) : projects),
    [limit],
  )
  const rootRef = useRef<HTMLDivElement | null>(null)
  const sectionRefs = useRef<Array<HTMLElement | null>>([])
  const imageRefs = useRef<Array<HTMLDivElement | null>>([])
  const activeIdRef = useRef<number | null>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    gsap.registerPlugin(ScrollTrigger)

    const notify = (next: PortfolioProject | null) => {
      const nextId = next?.id ?? null
      if (activeIdRef.current === nextId) return
      activeIdRef.current = nextId
      onActiveProjectChange(next)
    }

    const readActiveFromViewport = () => {
      const midY = window.innerHeight / 2
      let hit: PortfolioProject | null = null
      for (let i = 0; i < visibleProjects.length; i++) {
        const el = sectionRefs.current[i]
        if (!el) continue
        const r = el.getBoundingClientRect()
        if (midY >= r.top && midY <= r.bottom) {
          hit = visibleProjects[i]
          break
        }
      }
      notify(hit)
    }

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: root,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: readActiveFromViewport,
      })
      readActiveFromViewport()

      visibleProjects.forEach((_, i) => {
        const section = sectionRefs.current[i]
        const image = imageRefs.current[i]
        if (!section || !image) return

        gsap.fromTo(
          image,
          { scale: 0.95, opacity: 0.6 },
          {
            scale: 1,
            opacity: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top 88%',
              end: 'center center',
              scrub: 0.65,
            },
          },
        )
      })
    }, root)

    return () => {
      ctx.revert()
      activeIdRef.current = null
    }
  }, [onActiveProjectChange, visibleProjects])

  return (
    <main>
      <div className="grid place-items-center pt-24 md:pt-16">
        <motion.h2
          className="text-center font-display max-w-[22ch] tracking-tight text-[clamp(1.65rem,4vw,2.85rem)] font-semibold leading-[1.08] text-[var(--color-text)] sm:max-w-[26ch] sm:text-[clamp(1.75rem,4.2vw,3.1rem)]"
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
          whileInView={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          Selected <span className="text-black/30">Projects</span>
        </motion.h2>
        <motion.div
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
          whileInView={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 0.45, delay: reduceMotion ? 0 : 0.12, ease: [0.22, 1, 0.36, 1] }}
        >
          <Link
            to="/work"
            className="mt-2 flex items-center gap-2 transition-opacity duration-500 hover:cursor-pointer hover:opacity-40"
          >
            <PlusCircleIcon className="size-6" />
            See All Works
          </Link>
        </motion.div>
      </div>
      <div id="home-works" ref={rootRef} className="page-frame w-full scroll-mt-24">
        {visibleProjects.map((project, index) => (
          <section
            key={project.id}
            ref={(el) => {
              sectionRefs.current[index] = el
            }}
            className="flex w-full items-center justify-center py-6 md:min-h-screen md:py-0"
          >
            <div
              ref={(el) => {
                imageRefs.current[index] = el
              }}
              className="relative aspect-[11/12] w-full max-w-[1600px] overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-soft)] md:aspect-auto md:h-[min(100vh,820px)]"
            >
              <ProjectCoverImage
                project={project}
                loading={index === 0 ? 'eager' : 'lazy'}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          </section>
        ))}
        {seeMoreTo ? (
          <div className="flex justify-center pb-8 pt-4 md:pb-12">
            <Link
              to="/work"
              className="mt-2 flex items-center gap-2 rounded-full bg-black px-5 py-3 text-white transition-opacity duration-500 hover:cursor-pointer hover:opacity-40"
            >
              <PlusCircleIcon className="size-6" />
              See All Works
            </Link>
          </div>
        ) : null}
      </div>
    </main>
  )
}
