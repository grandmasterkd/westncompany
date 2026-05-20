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
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
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
