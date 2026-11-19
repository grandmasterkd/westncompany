import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'

import appCss from '../styles/globals.css?url'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      { title: 'westn.co' },
    ],
    icon: [
      { rel: 'icon', href: '/westn-logo-icon.svg', type: 'image/svg+xml' },
      { rel: 'shortcut icon', href: '/westn-logo-icon.svg', type: 'image/svg+xml' },
    ],
    links: [{ rel: 'stylesheet', href: appCss }],
    scripts: [
      {
        src: 'https://www.googletagmanager.com/gtag/js?id=GTM-WDXNTMD9',
        async: true,
      },
      {
        children: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'GTM-WDXNTMD9');
        `,
      },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
      <meta name="google-site-verification" content="34F8IqSMkl1iGAe31_rqTX0cK0EkdcyERdoT3ODa_DQ" />
        <HeadContent />
        <link rel="icon" href="/westn-logo-icon.svg" type="image/svg+xml" />
      </head>
      <body className="antialiased">
        {children}
        <Scripts />
      </body>
    </html>
  )
}
