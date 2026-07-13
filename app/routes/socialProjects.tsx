import { createFileRoute } from '@tanstack/react-router'
import { useCallback, useRef, useState, type FormEvent } from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import { socialProjectSections } from '#/data/socialProjects'

export const Route = createFileRoute('/socialProjects')({
  component: SocialProjectPage,
})

function SocialProjectPage() {
  const [email, setEmail] = useState('')
  const footerObserveRef = useRef<HTMLElement | null>(null)
  const footerSlotRef = useRef<HTMLDivElement | null>(null)

  const onBookSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }, [])

  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      <Navbar
        activeProject={null}
        footerObserveRef={footerObserveRef}
        footerSlotRef={footerSlotRef}
        email={email}
        onEmailChange={setEmail}
        onBookSubmit={onBookSubmit}
      />
      <main className="page-frame mx-auto max-w-[1400px] pb-16 pt-54 md:pb-24 md:pt-32">
        <header className="mb-8 md:mb-12">
          <h1 className="mt-20 font-display text-[clamp(2rem,5vw,3rem)] font-semibold tracking-tight text-[var(--color-text)]">
            Social Media
          </h1>
        </header>

        <div className="space-y-12 md:space-y-16">
          {socialProjectSections.map((section) => (
            <section key={section.id}>
              <div className='grid gap-y-1.5' >

              
              <h2 className="font-display text-lg font-semibold tracking-tight text-[var(--color-text)] md:text-xl">
                {section.title}
              </h2>
              <p className='text-black/50 text-sm ' >{section?.description}</p>
             
              <div className='mt-2 flex flex-wrap gap-2' >{section?.tags?.map((item, ix) => <span key={ix} className='bg-black/5 hover:bg-black hover:text-white transition duration-500 ease-in-out py-2 px-3.5 tracking-tight capitalize text-xs rounded-full'  >{item}</span>  )} </div>
              <div className='mt-2 flex flex-wrap gap-2' >{section?.collaborators?.map((item, ix) => <span key={ix} className='bg-blue-500 text-white hover:bg-purple-900 hover:text-purple-200 transition duration-500 ease-in-out py-2 px-3.5 tracking-tight capitalize text-xs rounded-full'  >{ `Collaborator: ${item}`}</span>  )} </div>
              </div>
              <ul className="m-0 mt-6 grid list-none grid-cols-1 gap-4 p-0 md:grid-cols-2 md:gap-x-5 md:gap-y-8">
                {section.images.map((image) => (
                  <li key={image.src}>
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="block h-auto w-full"
                      loading="lazy"
                      decoding="async"
                    />
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </main>
      <Footer footerObserveRef={footerObserveRef} footerSlotRef={footerSlotRef} />
    </div>
  )
}
