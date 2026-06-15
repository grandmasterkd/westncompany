export type LegacyProjectImage = {
  src: string
  alt: string
}

export type LegacyProjectSection = {
  id: string
  title: string
  images: LegacyProjectImage[]
}

function legacyAsset(folder: string, filename: string): string {
  const rawBase = import.meta.env.BASE_URL || '/'
  const base = rawBase.endsWith('/') ? rawBase : `${rawBase}/`
  return `${base}legacy-projects/${folder}/${encodeURI(filename)}`
}

function altFromFilename(filename: string): string {
  const base = filename.replace(/\.[^.]+$/, '')
  return base
    .replace(/[@_-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function section(
  id: string,
  title: string,
  files: readonly string[],
): LegacyProjectSection {
  return {
    id,
    title,
    images: files.map((file) => ({
      src: legacyAsset(id, file),
      alt: altFromFilename(file),
    })),
  }
}

export const legacyProjectSections: LegacyProjectSection[] = [
  section('red-hat', 'Red Hat', [
    'Asset 8@4x-100.jpg',
    'Asset 9@4x-100.jpg',
    'Asset 10@4x-100.jpg',
  ]),
  section('3fm-afroconnect-2023', '3FM Afroconnect 2023', [
    'Asset 2@4x-100.jpg',
    'Asset 3@4x-100.jpg',
    'Asset 4@4x-100.jpg',
    'Asset 5@4x-100.jpg',
    'Asset 6@4x-100.jpg',
  ]),
  section('chicki-fries', 'Chicki Fries', [
    'brand-identity-color-theme.jpg',
    'brand-identity-icons.jpg',
    'campaign-identity-splash-screen.jpg',
    'campaign-identity-social-media-design-i.jpg',
    'campaign-identity-social-meida-deisgn-ii.jpg',
    'campaign-identity-social-media-design-iii.jpg',
    'campaign-identity-social-media-deisgn-iv.jpg',
    'campaign-identity-social-media-design-v.jpg',
  ]),
  section('general-posters', 'General Posters', [
    'combined-legacy-design-poster-projects.jpg',
  ]),
]
