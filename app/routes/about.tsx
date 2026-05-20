import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/about')({
  component: AboutPlaceholder,
})

function AboutPlaceholder() {
  return <div>Coming soon</div>
}
