import { createFileRoute, Link, notFound } from '@tanstack/react-router'

import { getProjectBySlug } from '../data/portfolioProjects'

export const Route = createFileRoute('/work/$slug')({
  loader: ({ params }) => {
    const project = getProjectBySlug(params.slug)
    if (!project) throw notFound()
    return { project }
  },
  component: ProjectCaseStudyPage,
})

function ProjectCaseStudyPage() {
  const { project } = Route.useLoaderData()
  const cs = project.caseStudy

  return (
    <main className="w-full pb-16 pt-24 md:pb-24 md:pt-32">
      <header className="page-frame ">
        <Link
          to="/work"
          className="mb-4 inline-block font-ui text-[0.7rem] uppercase tracking-[0.2em] text-[var(--color-text-muted)] no-underline transition hover:text-[var(--color-text)]"
        >
          {project.country}
        </Link>
        <h1 className="font-display max-w-[90%] text-left text-[clamp(2rem,5vw,3.25rem)] font-semibold leading-[1.08] tracking-tight text-[var(--color-text)]">
          {project.name}
        </h1>
      </header>

      <div className="mx-auto max-w-[1400px] w-full bg-[var(--color-bg-soft)]">
        <img
          src={project.image}
          alt={`${project.name} — hero`}
          className="m-0 block max-h-[min(92vh,980px)] min-h-[48vh] w-full object-cover object-center rounded-3xl align-top"
          loading="eager"
          decoding="async"
        />
      </div>

      <section className="relative grid w-full grid-cols-1 lg:grid-cols-[35%_65%] lg:gap-0">
        <div className="sticky top-0 box-border px-[var(--page-gutter)] py-12 lg:max-w-none lg:py-20 lg:pr-10 h-screen overflow-y-auto">
          <dl className="m-0 space-y-6 border-0 p-0">
            <div>
              <dt className="font-ui text-[0.65rem] uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
                Year
              </dt>
              <dd className="mt-1.5 m-0 font-body text-sm font-medium text-[var(--color-text)]">
                {cs.year}
              </dd>
            </div>
            {cs.industry ? (
              <div>
                <dt className="font-ui text-[0.65rem] uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
                  Industry
                </dt>
                <dd className="mt-1.5 m-0 font-body text-sm font-medium text-[var(--color-text)]">
                  {cs.industry}
                </dd>
              </div>
            ) : null}
            {cs.role ? (
              <div>
                <dt className="font-ui text-[0.65rem] uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
                  Role
                </dt>
                <dd className="mt-1.5 m-0 font-body text-sm font-medium text-[var(--color-text)]">
                  {cs.role}
                </dd>
              </div>
            ) : null}
            <div>
              <dt className="font-ui text-[0.65rem] uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
                Services
              </dt>
              <dd className="mt-2 m-0">
                <ul className="m-0 list-none space-y-1.5 p-0">
                  {cs.services.map((s) => (
                    <li
                      key={s}
                      className="font-body text-sm leading-snug text-[var(--color-text-muted)]"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          </dl>

          <div className="mt-10 space-y-12 border-t border-[var(--color-border)] pt-10">
            {cs.sections && cs.sections.length > 0
              ? cs.sections.map((section) => (
                  <section key={section.heading}>
                    <h2 className="font-ui text-[0.65rem] uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
                      {section.heading}
                    </h2>
                    <div className="mt-4 space-y-5">
                      {section.paragraphs.map((paragraph, i) => (
                        <p
                          key={i}
                          className="m-0 max-w-prose font-body text-sm leading-relaxed text-[var(--color-text)] md:text-[0.9375rem]"
                        >
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </section>
                ))
              : (cs.context ?? []).map((paragraph, i) => (
                  <p
                    key={i}
                    className="m-0 max-w-prose font-body text-sm leading-relaxed text-[var(--color-text)] md:text-[0.9375rem]"
                  >
                    {paragraph}
                  </p>
                ))}
          </div>
        </div>

        <div className="m-0 mt-12 min-w-0 p-0">
          {cs.gallery.map((item, i) => (
            <img
              key={`${item.src}-${i}`}
              src={item.src}
              alt={item.alt}
              className="m-0 block w-full max-w-none border-0 p-0 align-top leading-none"
              loading="lazy"
              decoding="async"
            />
          ))}
        </div>
      </section>
    </main>
  )
}
