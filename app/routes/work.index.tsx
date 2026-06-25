import { motion, useReducedMotion } from 'framer-motion'
import { createFileRoute, Link } from '@tanstack/react-router'

import WorkProjectCard from '../components/WorkProjectCard'
import { projects } from '../components/WorkScroll'

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
        <div className="mt-20 flex flex-col gap-5 md:flex-row md:items-end md:justify-between md:gap-8">
          <div className="min-w-0 flex-1">
            <h1 className="font-display text-[clamp(2rem,5vw,3rem)] font-semibold tracking-tight text-[var(--color-text)]">
              Work
            </h1>
            <p className="mt-0 max-w-xl text-sm leading-relaxed text-[var(--color-text-muted)] md:text-base">
              A curated set of brand and identity work, strategy, visual systems, and
              art direction in one thread.
            </p>
          </div>
          <Link
            to="/legacy-projects"
            className="inline-flex w-fit shrink-0 items-center justify-center self-start rounded-full bg-[var(--color-cta)] px-5 py-2.5 font-ui text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-[var(--color-cta-fg)] no-underline transition hover:opacity-90 md:self-auto md:px-6 md:py-3 md:text-[0.65rem]"
          >
            See Legacy Projects
          </Link>
        </div>
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
              <WorkProjectCard
                project={project}
                imageLoading={index < 2 ? 'eager' : 'lazy'}
              />
            </article>
          </motion.li>
        ))}
      </ul>
    </main>
  )
}
