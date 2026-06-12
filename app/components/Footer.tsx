import { Link } from '@tanstack/react-router'
import { type RefObject } from 'react'

import FooterBooking from './FooterBooking'
import ToptalBadge from './ToptalBadge'

type FooterProps = {
  footerObserveRef: RefObject<HTMLElement | null>
  footerSlotRef: RefObject<HTMLDivElement | null>
}

const footerLinkClass =
  'text-sm text-white/70 no-underline transition hover:text-white'

export default function Footer({
  footerObserveRef,
  footerSlotRef,
}: FooterProps) {
  const handleBookingSubmit = (payload: {
    email: string
    date: Date
    time: string
  }) => {
    const dateLabel = payload.date.toLocaleDateString('en-GB', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
    const body = [
      'Discovery call booking',
      '',
      `Email: ${payload.email}`,
      `Date: ${dateLabel}`,
      `Time: ${payload.time}`,
    ].join('\n')
    const mailto = `mailto:kingdavidamoah3@gmail.com?subject=${encodeURIComponent('Discovery call booking')}&body=${encodeURIComponent(body)}`
    window.location.href = mailto
  }

  return (
    <footer
      ref={footerObserveRef}
      className="page-frame relative flex min-h-screen flex-col bg-black text-white"
    >
      <div
        ref={footerSlotRef}
        className="pointer-events-none mx-auto w-[min(30vw,280px)] md:w-[min(12vw,280px)] shrink-0 touch-none select-none overflow-hidden rounded-2xl bg-black"
        style={{ aspectRatio: '1' }}
        aria-hidden
      >
        <video
          className="h-full w-full object-cover"
          src="/westn-logo-animation.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
        />
      </div>

      <div className="mt-6 grid min-h-0 flex-1 grid-cols-1 items-stretch gap-8 lg:mt-8 lg:grid-cols-2 lg:gap-10">
        <FooterBooking onSubmit={handleBookingSubmit} />

        <div className="flex min-h-0 flex-col lg:pt-1">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-x-10 sm:gap-y-8">
          <div className="space-y-8">
            <div>
              <h3 className="font-ui text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-white/45">
                Contact
              </h3>
              <ul className="mt-3 list-none space-y-2 p-0">
                <li>
                  <a
                    href="https://www.instagram.com/westn.co/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={footerLinkClass}
                  >
                    Instagram
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/in/king-david-amoah-017908178/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={footerLinkClass}
                  >
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:kingdavidamoah3@gmail.com"
                    className={footerLinkClass}
                  >
                    kingdavidamoah3@gmail.com
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-ui text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-white/45">
                Labs
              </h3>
              <p className="mt-3 text-sm text-white/70">usewestnai [Coming Soon] </p>
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="font-ui text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-white/45">
                Services
              </h3>
              <ul className="mt-3 list-none space-y-2 p-0">
                {[
                 " Brand Automation, Scaling & Growth",
                  'Brand Identity Design',
                  'Brand Strategy & Positioning',
                  'Target Research & Compettive Analysis',
                  'Product Design & Development'
                
                ].map((item) => (
                  <li key={item} className="text-sm text-white/70">
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-ui text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-white/45">
                Legal
              </h3>
              <ul className="mt-3 list-none space-y-2 p-0">
                <li>
                  <Link to="/privacy" className={footerLinkClass}>
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className={footerLinkClass}>
                    Terms and Conditions
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          </div>

          <div className="mt-8 flex justify-start lg:justify-end lg:mt-auto lg:pt-6">
            <ToptalBadge />
          </div>
        </div>
      </div>

<hr className="mt-8 md:mt-6 border-white/20" />

      <div className="mt-auto flex shrink-0 flex-col items-start justify-between gap-4 pt-6 sm:flex-row sm:items-center">
        <img
          src="/westn-logo-white.svg"
          alt="westn"
          className="h-7 w-auto shrink-0 opacity-90"
          width={120}
          height={28}
        />
        <p className="text-sm text-white/40 sm:ml-auto sm:text-right">
          © {new Date().getFullYear()} westn.co. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
