import { createFileRoute, Outlet } from '@tanstack/react-router'
import { useCallback, useRef, useState, type FormEvent } from 'react'

import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import type { PortfolioProject } from '../data/portfolioProjects'

export const Route = createFileRoute('/work')({
  component: WorkLayout,
})

function WorkLayout() {
  const [activeProject] = useState<PortfolioProject | null>(null)
  const [email, setEmail] = useState('')
  const footerObserveRef = useRef<HTMLElement | null>(null)
  const footerSlotRef = useRef<HTMLDivElement | null>(null)

  const onBookSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    /* REPLACE: wire to booking / API */
  }, [])

  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      <Navbar
        activeProject={activeProject}
        footerObserveRef={footerObserveRef}
        footerSlotRef={footerSlotRef}
        email={email}
        onEmailChange={setEmail}
        onBookSubmit={onBookSubmit}
      />
      <Outlet />
      <Footer
        footerObserveRef={footerObserveRef}
        footerSlotRef={footerSlotRef}
      />
    </div>
  )
}
