import { motion, useReducedMotion } from 'framer-motion'
import { createFileRoute, Link } from '@tanstack/react-router'

import WorkCoverDragHover from '../components/WorkCoverDragHover'
import { projects, ProjectCoverImage } from '../components/WorkScroll'

export const Route = createFileRoute('/work/')({
  component: WorkIndexPage,
})

const cardSpring = {
  type: 'spring' as const,
  stiffness: 120,
  damping: 14,
  mass: 0.85,
}

function WorkIndexPage() {
  const reduceMotion = useReducedMotion()

  return (
    <main className="page-frame mx-auto max-w-[1400px] pb-16 pt-54 md:pb-24 md:pt-32">
      <motion.header
        className="mb-8 md:mb-12"
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <h1 className="mt-20 font-display text-[clamp(2rem,5vw,3rem)] font-semibold tracking-tight text-[var(--color-text)]">
          Work
        </h1>
        <p className="mt-0 max-w-xl text-sm leading-relaxed text-[var(--color-text-muted)] md:text-base">
          A curated set of brand and identity work, strategy, visual systems, and
          art direction in one thread.
        </p>
        {/* <p className="mt-3 font-ui text-[0.7rem] uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
          ({projects.length})
        </p> */}
      </motion.header>

      <ul className="m-0 grid list-none grid-cols-1 gap-x-5 gap-y-8 p-0 md:grid-cols-2 md:gap-x-6 md:gap-y-10">
        {projects.map((project, index) => (
          <motion.li
            key={project.id}
            initial={
              reduceMotion
                ? { opacity: 0 }
                : {
                    opacity: 0,
                    y: 56,
                    rotate: index % 2 === 0 ? -5.5 : 5.5,
                    scale: 0.94,
                  }
            }
            whileInView={
              reduceMotion
                ? { opacity: 1 }
                : {
                    opacity: 1,
                    y: 0,
                    rotate: 0,
                    scale: 1,
                  }
            }
            viewport={{ once: true, margin: '-12% 0px -8% 0px' }}
            transition={
              reduceMotion
                ? { duration: 0.28, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }
                : { ...cardSpring, delay: index * 0.09 }
            }
          >
            <article>
              <Link
                to="/work/$slug"
                params={{ slug: project.slug }}
                className="block rounded-2xl text-inherit no-underline outline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-text)]"
              >
                <WorkCoverDragHover className="aspect-[11/12] w-full overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-soft)]">
                  <ProjectCoverImage
                    project={project}
                    loading={index < 2 ? 'eager' : 'lazy'}
                    className="absolute inset-0 h-full w-full object-cover transition-[transform] duration-[650ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform group-hover:scale-[1.035]"
                  />
                </WorkCoverDragHover>
                <div className="mt-3 md:mt-3.5">
                  <h2 className="font-display text-lg font-semibold tracking-tight text-[var(--color-text)] md:text-xl">
                    {project.name}
                  </h2>
                  {project.description ? (
                    <p className="mt-2 max-w-md text-sm leading-relaxed text-[var(--color-text-muted)] md:text-[0.9375rem]">
                      {project.description}
                    </p>
                  ) : null}
                </div>
              </Link>
            </article>
          </motion.li>
        ))}
      </ul>
    </main>
  )
}
