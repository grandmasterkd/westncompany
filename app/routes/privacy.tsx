import { createFileRoute } from '@tanstack/react-router'

import LegalDocument from '../components/LegalDocument'

export const Route = createFileRoute('/privacy')({
  component: PrivacyPage,
})

function PrivacyPage() {
  return (
    <LegalDocument title="Privacy Policy" lastUpdated="May 20, 2026">
      <section>
        <h2 className="font-display text-lg font-semibold">1. Introduction</h2>
        <p className="mt-3 text-[var(--color-text-muted)]">
          westn.co (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) operates this website. This Privacy
          Policy explains how we collect, use, disclose, and safeguard your information when
          you visit our website or engage our services.
        </p>
      </section>
      <section>
        <h2 className="font-display text-lg font-semibold">2. Information we collect</h2>
        <p className="mt-3 text-[var(--color-text-muted)]">
          We may collect information you provide directly (such as name, email address, and
          message content when you contact us or book a call), technical data automatically
          collected when you browse our site (IP address, browser type, device information,
          and usage data), and cookies or similar technologies where applicable.
        </p>
      </section>
      <section>
        <h2 className="font-display text-lg font-semibold">3. How we use your information</h2>
        <p className="mt-3 text-[var(--color-text-muted)]">
          We use collected information to respond to enquiries, provide and improve our
          services, communicate with you about projects, maintain website security and
          performance, and comply with legal obligations.
        </p>
      </section>
      <section>
        <h2 className="font-display text-lg font-semibold">4. Sharing of information</h2>
        <p className="mt-3 text-[var(--color-text-muted)]">
          We do not sell your personal data. We may share information with trusted service
          providers who assist in hosting, analytics, or communications, subject to
          confidentiality obligations, or when required by law.
        </p>
      </section>
      <section>
        <h2 className="font-display text-lg font-semibold">5. Data retention</h2>
        <p className="mt-3 text-[var(--color-text-muted)]">
          We retain personal information only for as long as necessary to fulfil the purposes
          described in this policy, unless a longer retention period is required or permitted
          by law.
        </p>
      </section>
      <section>
        <h2 className="font-display text-lg font-semibold">6. Your rights</h2>
        <p className="mt-3 text-[var(--color-text-muted)]">
          Depending on your location, you may have rights to access, correct, delete, or
          restrict processing of your personal data, and to object to certain processing. To
          exercise these rights, contact us using the details on our website.
        </p>
      </section>
      <section>
        <h2 className="font-display text-lg font-semibold">7. Security</h2>
        <p className="mt-3 text-[var(--color-text-muted)]">
          We implement reasonable technical and organisational measures to protect your
          information. No method of transmission over the Internet is completely secure.
        </p>
      </section>
      <section>
        <h2 className="font-display text-lg font-semibold">8. Changes to this policy</h2>
        <p className="mt-3 text-[var(--color-text-muted)]">
          We may update this Privacy Policy from time to time. The revised version will be
          posted on this page with an updated date.
        </p>
      </section>
      <section>
        <h2 className="font-display text-lg font-semibold">9. Contact</h2>
        <p className="mt-3 text-[var(--color-text-muted)]">
          For questions about this Privacy Policy, please contact us via the contact options
          listed on westn.co.
        </p>
      </section>
    </LegalDocument>
  )
}
