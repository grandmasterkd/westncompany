import { Link } from '@tanstack/react-router'

type LegalDocumentProps = {
  title: string
  lastUpdated: string
  children: React.ReactNode
}

export default function LegalDocument({
  title,
  lastUpdated,
  children,
}: LegalDocumentProps) {
  return (
    <main className="page-frame mx-auto max-w-3xl pb-20 pt-28 md:pt-32">
      <Link
        to="/"
        className="mb-8 inline-block font-ui text-[0.7rem] uppercase tracking-[0.2em] text-[var(--color-text-muted)] no-underline transition hover:text-[var(--color-text)]"
      >
        Home
      </Link>
      <h1 className="font-display text-3xl font-semibold tracking-tight text-[var(--color-text)] md:text-4xl">
        {title}
      </h1>
      <p className="mt-2 text-sm text-[var(--color-text-muted)]">
        Last updated: {lastUpdated}
      </p>
      <div className="prose-legal mt-10 space-y-6 text-sm leading-relaxed text-[var(--color-text)]">
        {children}
      </div>
    </main>
  )
}
