export type LegacyProjectImage = {
  src: string
  alt: string
}

export type LegacyProjectSection = {
  id: string
  title: string
  description: string,
  tags: string[],
  collaborators: string[],
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
  description: string,
  tags: string[],
  collaborators: string[],
  files: readonly string[],
): LegacyProjectSection {
  return {
    id,
    title,
    description,
    tags,
    collaborators,
    images: files.map((file) => ({
      src: legacyAsset(id, file),
      alt: altFromFilename(file),
    })),
  }
}

export const legacyProjectSections: LegacyProjectSection[] = [
  section('red-hat', 'Red Hat', "", ["illustrations", "typography" , "label design", "logo design" , "package design" , "food and beverage"], [], [
    'Asset 8@4x-100.jpg',
    'Asset 9@4x-100.jpg',
    'Asset 10@4x-100.jpg',
  ]),
  section('3fm-afroconnect-2023', '3FM Afroconnect 2023',  "3FM AfroConnect is the biggest Pan-African gathering in Ghana, organized annually by 3FM 92.7 to celebrate African heritage, culture, and unity. The event invites people from across the continent to represent their home countries through cultural displays, music, fashion, and food",  ["visual identiy", "posters", "creative direction", "creative thinking", "composition art", "culture", "concept art", "heritage", "banner design", "marketing design", "campaigns", "illustrations", "typography", "color scheme", "print", "design system", "social media ads", "events", "marketing", "community"], [], [
    'Asset 2@4x-100.jpg',
    'Asset 3@4x-100.jpg',
    'Asset 4@4x-100.jpg',
    'Asset 5@4x-100.jpg',
    'Asset 6@4x-100.jpg',
  ] ),
  section('chicki-fries', 'Chicki Fries', "A sports themed visual identity project for a food vendor at the Lusail Stadium during the 2022 FIFA World Cup in Qatar.", ["illustrations", "typography" , "visual identity" , "brand identity" , "food packaging" , "art direction" , "logo design" , "concept art" , "fifa", "fifa world cup", "brand marketing" , "marketing design" , "print design" , "campaign ads" , "sports" , "banner ads" , "posters" , "food and beverage" , "advertising and marketing"], ["Ebenezer Agyeman"],[
    'brand-identity-color-theme.jpg',
    'brand-identity-icons.jpg',
    'campaign-identity-splash-screen.jpg',
    'campaign-identity-social-media-design-i.jpg',
    'campaign-identity-social-meida-deisgn-ii.jpg',
    'campaign-identity-social-media-design-iii.jpg',
    'campaign-identity-social-media-deisgn-iv.jpg',
    'campaign-identity-social-media-design-v.jpg',
  ]),
  section('its-padel', 'Its Padel', "", ["sports", "padel", "posters", "ad campaign" , "marketing design" , "social media" , "social media ads" , "digital signage" , "website graphics" , "one-pager" ], [], [
    '1.jpg',
    '2.jpg',
    '3.jpg',
    '4.jpg',
  ]),
  section('general-posters', 'General Posters', "", [], [], [
    'combined-legacy-design-poster-projects.jpg',
  ]),
]
