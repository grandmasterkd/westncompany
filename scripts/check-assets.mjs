/**
 * Cloudflare Workers static assets must be ≤ 25 MiB per file.
 * Run before deploy: npm run check:assets
 */
import { readdir, stat } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const PUBLIC_DIR = join(dirname(fileURLToPath(import.meta.url)), '..', 'public')
const MAX_BYTES = 25 * 1024 * 1024
const WARN_BYTES = 20 * 1024 * 1024

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true })
  const files = []
  for (const entry of entries) {
    const path = join(dir, entry.name)
    if (entry.isDirectory()) {
      files.push(...(await walk(path)))
    } else if (entry.isFile()) {
      files.push(path)
    }
  }
  return files
}

function formatMiB(bytes) {
  return `${(bytes / 1024 / 1024).toFixed(2)} MiB`
}

const files = await walk(PUBLIC_DIR)
const oversized = []
const warnings = []

for (const file of files) {
  const { size } = await stat(file)
  const rel = file.replace(PUBLIC_DIR + '/', '')
  if (size > MAX_BYTES) oversized.push({ rel, size })
  else if (size > WARN_BYTES) warnings.push({ rel, size })
}

if (warnings.length) {
  console.log('⚠️  Large assets (under limit, consider compressing):')
  for (const { rel, size } of warnings.sort((a, b) => b.size - a.size)) {
    console.log(`   ${formatMiB(size).padStart(10)}  ${rel}`)
  }
  console.log()
}

if (oversized.length) {
  console.error('✘ Deploy blocked: files exceed Cloudflare 25 MiB limit:\n')
  for (const { rel, size } of oversized.sort((a, b) => b.size - a.size)) {
    console.error(`   ${formatMiB(size).padStart(10)}  ${rel}`)
  }
  console.error(
    `\nCompress or replace ${oversized.length} file(s) in public/ before deploying.`,
  )
  process.exit(1)
}

console.log(`✔ All ${files.length} public assets are within the 25 MiB Cloudflare limit.`)
