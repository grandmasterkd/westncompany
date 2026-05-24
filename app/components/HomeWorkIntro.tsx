import { motion, useReducedMotion } from 'framer-motion'

const blocks = [
  {
    label: 'ORIGIN',
    content: (
      <h2 className="mt-0 font-display max-w-[42rem] text-[clamp(1.35rem,3.2vw,2rem)] font-semibold leading-[1.22] tracking-tight text-[var(--color-text)]">
        With roots from Accra, Ghana. I believe in developing digital
        experiences for brands that impact their people.
      </h2>
    ),
  },
  {
    label: 'AMBITION',
    content: (
      <h2 className="mt-0 font-display max-w-[42rem] text-[clamp(1.35rem,3.2vw,2rem)] font-semibold leading-[1.22] tracking-tight text-[var(--color-text)]">
        To create future ready digital products with{' '}
        <span className="bg-blue-500 px-2 text-white">1Million</span> humans that see a
        need to move the world forward.
      </h2>
    ),
  },
  {
    label: 'HOW WE HELP',
    content: (
      <ul className="mt-0 space-y-1 font-display max-w-[42rem] text-[clamp(1.35rem,3.2vw,2rem)] font-semibold leading-[1.22] tracking-tight text-[var(--color-text)]">
        <li>Strategy & Consultation</li>
        <li>Branding</li>
        <li>Software Design, Architecture & Development</li>
        <li>Artificial Intelligence & Automation</li>
      </ul>
    ),
  },
] as const

export default function HomeWorkIntro() {
  const reduceMotion = useReducedMotion()

  return (
    <main className="mx-auto md:min-h-screen h-auto w-full max-w-[1400px] px-6 md:px-10 lg:px-0">
      <hr className="my-20 border-black/20" />
      <section className="space-y-12 md:space-y-24">
        {blocks.map((block, index) => (
          <motion.div
            key={block.label}
            className="grid grid-cols-1 gap-4 md:grid-cols-2"
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 28 }}
            whileInView={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-8% 0px -6% 0px' }}
            transition={{
              duration: reduceMotion ? 0.25 : 0.55,
              delay: reduceMotion ? 0 : index * 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <p className="mt-0 font-ui text-md font-medium uppercase tracking-[0.1em] text-black/50 no-underline transition hover:opacity-60">
              {block.label}
            </p>
            {block.content}
          </motion.div>
        ))}
      </section>
    </main>
  )
}
