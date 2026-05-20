import { createFileRoute } from '@tanstack/react-router'
import { useCallback, useRef, useState, type FormEvent } from 'react'

import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import HomeWorkIntro from '../components/HomeWorkIntro'
import WorkScroll from '../components/WorkScroll'
import Footer from '../components/Footer'
import type { PortfolioProject } from '../components/WorkScroll'

export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {
  const [activeProject, setActiveProject] = useState<PortfolioProject | null>(
    null,
  )
  const [email, setEmail] = useState('')
  const footerObserveRef = useRef<HTMLElement | null>(null)
  const footerSlotRef = useRef<HTMLDivElement | null>(null)

  const handleActiveProjectChange = useCallback(
    (project: PortfolioProject | null) => {
      setActiveProject(project)
    },
    [],
  )

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
      <main>
        <Hero />
        <HomeWorkIntro />
        <WorkScroll
          limit={5}
          seeMoreTo="/work"
          onActiveProjectChange={handleActiveProjectChange}
        />
        <Footer
          footerObserveRef={footerObserveRef}
          footerSlotRef={footerSlotRef}
        />
      </main>
    </div>
  )
}
