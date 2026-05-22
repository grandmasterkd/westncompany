import { Link } from '@tanstack/react-router'

import {
  type PortfolioProject,
  workCoverPillLabel,
  workExternalOpensNewTab,
} from '../data/portfolioProjects'
import WorkCoverDragHover from './WorkCoverDragHover'
import { ProjectCoverImage } from './WorkScroll'

type WorkProjectCardProps = {
  project: PortfolioProject
  imageLoading: 'eager' | 'lazy'
}

export default function WorkProjectCard({
  project,
  imageLoading,
}: WorkProjectCardProps) {
  const external = project.externalUrl
  const pillLabel = external ? workCoverPillLabel(external) : undefined
  const linkClass =
    'block rounded-2xl text-inherit no-underline outline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-text)]'

  const content = (
    <>
      <WorkCoverDragHover
        pillLabel={pillLabel}
        className="aspect-[11/12] w-full overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-soft)]"
      >
        <ProjectCoverImage
          project={project}
          loading={imageLoading}
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
    </>
  )

  if (external) {
    return (
      <a
        href={external}
        className={linkClass}
        {...(workExternalOpensNewTab(external)
          ? { target: '_blank', rel: 'noopener noreferrer' }
          : {})}
      >
        {content}
      </a>
    )
  }

  return (
    <Link to="/work/$slug" params={{ slug: project.slug }} className={linkClass}>
      {content}
    </Link>
  )
}
