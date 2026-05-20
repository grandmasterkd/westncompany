import { createFileRoute } from '@tanstack/react-router'

import LegalDocument from '../components/LegalDocument'

export const Route = createFileRoute('/terms')({
  component: TermsPage,
})

function TermsPage() {
  return (
    <LegalDocument title="Terms and Conditions" lastUpdated="May 20, 2026">
      <section>
        <h2 className="font-display text-lg font-semibold">1. Agreement</h2>
        <p className="mt-3 text-[var(--color-text-muted)]">
          By accessing or using westn.co (&quot;the Site&quot;), you agree to be bound by these
          Terms and Conditions. If you do not agree, please do not use the Site.
        </p>
      </section>
      <section>
        <h2 className="font-display text-lg font-semibold">2. Services</h2>
        <p className="mt-3 text-[var(--color-text-muted)]">
          westn.co provides brand, design, and related creative services. Portfolio work
          displayed on the Site is for illustration unless otherwise stated. Engagement terms
          for paid work are governed by separate agreements between you and westn.co.
        </p>
      </section>
      <section>
        <h2 className="font-display text-lg font-semibold">3. Intellectual property</h2>
        <p className="mt-3 text-[var(--color-text-muted)]">
          Unless otherwise agreed in writing, all content on the Site—including text,
          graphics, logos, images, and layout—is owned by westn.co or its licensors and is
          protected by applicable intellectual property laws. You may not reproduce,
          distribute, or create derivative works without prior written permission.
        </p>
      </section>
      <section>
        <h2 className="font-display text-lg font-semibold">4. Acceptable use</h2>
        <p className="mt-3 text-[var(--color-text-muted)]">
          You agree not to misuse the Site, including by attempting unauthorised access,
          introducing malware, scraping content at scale without permission, or using the
          Site in any unlawful manner.
        </p>
      </section>
      <section>
        <h2 className="font-display text-lg font-semibold">5. Disclaimer</h2>
        <p className="mt-3 text-[var(--color-text-muted)]">
          The Site and its content are provided on an &quot;as is&quot; and &quot;as available&quot; basis
          without warranties of any kind, whether express or implied, including fitness for
          a particular purpose or non-infringement.
        </p>
      </section>
      <section>
        <h2 className="font-display text-lg font-semibold">6. Limitation of liability</h2>
        <p className="mt-3 text-[var(--color-text-muted)]">
          To the fullest extent permitted by law, westn.co shall not be liable for any
          indirect, incidental, special, consequential, or punitive damages arising from your
          use of the Site.
        </p>
      </section>
      <section>
        <h2 className="font-display text-lg font-semibold">7. Third-party links</h2>
        <p className="mt-3 text-[var(--color-text-muted)]">
          The Site may contain links to third-party websites. We are not responsible for the
          content or practices of those sites.
        </p>
      </section>
      <section>
        <h2 className="font-display text-lg font-semibold">8. Governing law</h2>
        <p className="mt-3 text-[var(--color-text-muted)]">
          These Terms are governed by the laws of England and Wales, without regard to
          conflict-of-law principles. Courts in England and Wales shall have exclusive
          jurisdiction, subject to mandatory consumer protections where applicable.
        </p>
      </section>
      <section>
        <h2 className="font-display text-lg font-semibold">9. Changes</h2>
        <p className="mt-3 text-[var(--color-text-muted)]">
          We may revise these Terms at any time by posting an updated version on this page.
          Continued use of the Site after changes constitutes acceptance of the revised
          Terms.
        </p>
      </section>
      <section>
        <h2 className="font-display text-lg font-semibold">10. Contact</h2>
        <p className="mt-3 text-[var(--color-text-muted)]">
          For questions about these Terms, please contact us via the contact options listed on
          westn.co.
        </p>
      </section>
    </LegalDocument>
  )
}
