export type ProjectGalleryItem = {
  src: string
  alt: string
}

export type CaseStudyBodySection = {
  heading: string
  paragraphs: string[]
}

export type ProjectCaseStudy = {
  year: string
  role?: string
  industry?: string
  services: string[]
  /** Left-column paragraphs when not using named `sections`. */
  context?: string[]
  /** Named blocks (e.g. Project Brief, Creative Direction). */
  sections?: CaseStudyBodySection[]
  gallery: ProjectGalleryItem[]
}

/**
 * Static file under `public/<folder>/`. Same encoding rules as Salad Club assets.
 */
function publicFolderAsset(folder: string, filename: string): string {
  const rawBase = import.meta.env.BASE_URL || '/'
  const base = rawBase.endsWith('/') ? rawBase : `${rawBase}/`
  const dir = folder.replace(/^\/+|\/+$/g, '')
  return `${base}${dir}/${encodeURI(filename)}`
}

/**
 * Convenience wrapper for `public/salad-club/` URLs.
 */
function saladClubAsset(filename: string): string {
  return publicFolderAsset('salad-club', filename)
}

/** Matches filenames in `public/salad-club/` exactly (spaces matter). Hero may repeat Artboard 1. */
const SALAD_CLUB_GALLERY_FILES = [
  'Artboard 2@4x.webp',
  'Artboard 2 copy@4x.webp',
  'Artboard 2 copy 2@4x.webp',
  'Artboard 2 copy 3@4x.webp',
  'Artboard 2 copy 4@4x.webp',
  'Artboard 2 copy 5@4x.webp',
  'Artboard 2 copy 6@4x.webp',
  'Artboard 2 copy 7@4x.webp',
  'Artboard 2 copy 8@4x.webp',
  'Artboard 2 copy 9@4x.webp',
  'Artboard 2 copy 10@4x.webp',
  'Artboard 2 copy 11@4x.webp',
  'Artboard 2 copy 12@4x.webp',
] as const

/** `public/grapevine/` — gallery excludes Artboard 1 (used as cover). */
const GRAPEVINE_GALLERY_FILES = Array.from(
  { length: 19 },
  (_, i) => `Artboard ${i + 2}@4x.webp`,
)

/** `public/quick-impact-agency/` (QIA); gallery excludes Artboard 1 (cover). */
const QUICK_IMPACT_GALLERY_FILES = [
  ...Array.from({ length: 28 }, (_, i) => `Artboard ${i + 2}@4x.webp`),
  'Artboard 30@4x.webp',
  'Artboard 30 copy@4x.webp',
  ...[2, 3, 4, 5, 6, 7, 8].map((n) => `Artboard 30 copy ${n}@4x.webp`),
] as const

/** `public/the-core/` — gallery excludes Artboard 1 (cover). */
const THE_CORE_GALLERY_FILES = Array.from(
  { length: 49 },
  (_, i) => `Artboard ${i + 2}@4x.webp`,
)

export type PortfolioProject = {
  id: number
  /** URL segment: `/work/:slug` */
  slug: string
  country: string
  name: string
  image: string
  description?: string
  /** When set, work grid opens this URL instead of the case study page. */
  externalUrl?: string
  /** Omitted for external-only listings (no case study page). */
  caseStudy?: ProjectCaseStudy
}

const ACCESS_REQUEST_EMAIL = 'kingdavidamoah3@gmail.com'

export function workCoverPillLabel(externalUrl: string): string {
  return externalUrl.startsWith('mailto:') ? 'REQUEST ACCESS' : 'OPEN APP'
}

export function workExternalOpensNewTab(externalUrl: string): boolean {
  return !externalUrl.startsWith('mailto:')
}

function accessRequestMailto(projectName: string): string {
  const subject = `${projectName} access request`
  const body = `Hi,\n\nI would like to request access to view the ${projectName}.\n\nThank you.`
  return `mailto:${ACCESS_REQUEST_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

export const projects: PortfolioProject[] = [
  {
    id: 1,
    slug: 'salad-club-uk',
    country: 'United Kingdom',
    name: 'Salad Club',
    image: "/salad-club-brand-identity-cover.jpg",
    description:
      'Visual identity built on trust and calm, helping people feel good about honest, everyday healthy choices.',
    caseStudy: {
      year: '2025',
      industry: 'Wholesale Foods',
      services: ['Logo Design', 'Visual Identity'],
      sections: [
        {
          heading: 'Project Brief',
          paragraphs: [
            'Salad Club is about more than food that tastes good. It is about meals that feel right. The brand supports your body, your mind, and the life you are building, one plate at a time, with healthy habits that ripple outward from you to your home and the people around you.',
            'At the centre of the work is trust: trusting yourself, trusting your instincts, and trusting that the healthier choice does not have to be loud, perfect, or performative. It only has to be honest. Customers should feel comfortable knowing they are doing something good for themselves, and proud that their greener choices matter here.',
          ],
        },
        {
          heading: 'Creative Direction',
          paragraphs: [
            'The logo icon carries that feeling forward. It is simple, calm, and familiar, designed as a small reassurance in the day, a visual reminder that you can trust your eating habits, that balance is enough, and that choosing well can also feel easy.',
            'The identity scales across trucks, uniforms, storefronts, menus, digital platforms, and merchandise without losing clarity. It stays recognisable and grounded, speaking to people who want a brand that understands quiet confidence over performance.',
          ],
        },
      ],
      gallery: SALAD_CLUB_GALLERY_FILES.map((file, i) => ({
        src: saladClubAsset(file),
        alt: `Salad Club — project visual ${i + 1}`,
      })),
    },
  },
  {
    id: 2,
    slug: 'qia',
    country: 'Germany/Ghana',
    name: 'Quick Impact Agency',
    image: "/qia-identity-cover.jpg",
    description:
      'Brand identity for an ecosystem steward: modern, approachable, and built to earn trust with partners and communities.',
    caseStudy: {
      year: '2023',
      role: 'Identity system',
      services: ['Positioning', 'Logo', 'Guidelines', 'Visual Identity'],
      context: [
        'Quick Impact Agency is a comprehensive brand identity initiative shaped around QIA’s commitment to restoring ecosystems and empowering communities. The work captures the organisation’s role as a steward of the earth and a catalyst for positive change, translating that mission into a visual and narrative system partners can recognise and believe in.',
        'The creative direction balances modernity with approachability: contemporary design paired with natural, human-centred imagery so the brand feels fresh and welcoming while remaining deeply professional. It is tailored to resonate with corporate partners and communities alike, emphasising sustainability, care, and a forward-thinking outlook.',
        'The goal is a brand that is not only recognisable but trustworthy, communicating that QIA leads with compassion and action, and can be counted on where impact matters most.',
      ],
      gallery: QUICK_IMPACT_GALLERY_FILES.map((file, i) => ({
        src: publicFolderAsset('quick-impact-agency', file),
        alt: `Quick Impact Agency — project visual ${i + 1}`,
      })),
    },
  },
  {
    id: 3,
    slug: 'grapevine-ai',
    name: 'Grapevine AI',
    country: 'United States',
    image: "/grapevine-identity-cover.webp",
    description:
      'Identity for a platform that champions student freedom of choice through AI-driven academic and career guidance.',
    caseStudy: {
      year: '2024',
      role: 'Product branding',
      services: ['Logo', 'Visual Identity', 'Marketing Assets'],
      context: [
        'Grapevine champions the freedom of choice in shaping one’s future. Rather than reinventing institutions from scratch, the platform leverages existing resources within schools and organisations to give students a clearer path forward.',
        'The brand supports a comprehensive AI ecosystem that personalises academic planning, career acceleration, and employ-to-student relationships, helping learners navigate decisions with confidence instead of guesswork.',
        'The identity had to feel credible to institutions and inviting to students: intelligent without feeling cold, and human enough to carry the promise that technology can open doors rather than narrow them.',
      ],
      gallery: GRAPEVINE_GALLERY_FILES.map((file, i) => ({
        src: publicFolderAsset('grapevine', file),
        alt: `Grapevine AI — project visual ${i + 1}`,
      })),
    },
  },
  {
    id: 4,
    slug: 'the-core',
    country: 'Germany',
    name: 'The Core',
    image: "/thecore-identity-cover.png",
    description:
      'Brand identity rooted in the belief that crystals can transform homes and the hearts within them.',
    caseStudy: {
      year: '2023',
      role: 'Visual identity & art direction',
      services: ['Brand Identity', 'Logo', 'Strategy'],
      context: [
        'The Core begins with a simple truth: our homes are more than the spaces we live in. They are reflections of our souls, sanctuaries where we seek peace, balance, and inspiration.',
        'Imagine stepping into a room after a long day and feeling an almost imperceptible shift. The air feels lighter, the energy calmer. At the centre sits a luminous crystal, its soft radiance gently anchoring the space. That moment is the emotional heart of the brand.',
        'The identity is built on the timeless belief that crystals hold the power to transform not just homes, but hearts. The visual system carries that quiet magic forward: serene, intentional, and designed to make wellbeing feel present the moment you walk through the door.',
      ],
      gallery: THE_CORE_GALLERY_FILES.map((file, i) => ({
        src: publicFolderAsset('the-core', file),
        alt: `The Core — project visual ${i + 1}`,
      })),
    },
  },
  {
    id: 5,
    slug: 'canmove-app',
    country: 'United States',
    name: 'Canmove App',
    image: '/canmove-map-screen.webp',
    externalUrl:
      'https://www.figma.com/design/BIBY31wEQJevU04xiVJqSn/canmove-UI-1.0?node-id=0-1&t=wLp7rzr1axd1UJbw-1',
    description: 'User interface and experience for ride hailing system.',
  },
  {
    id: 6,
    slug: 'techlife-electronics',
    country: 'Ghana',
    name: 'Techlife Electronics',
    image: '/techlife-identity-cover.webp',
    description: 'Brand Identity and Visual System for a Technology Retailer',
    caseStudy: {
      year: '2023',
      role: 'Brand Identity and Visual System',
      services: ['Branding', 'Visual Identity', 'Logo Design', 'Print Collateral'],
      context: [
        'Techlife Electronics is a technology retailer serving Ghana with a need for a cohesive brand system across retail, print, and digital touchpoints.',
        'Art direction pairs gritty photography with clean typographic locks. Motion rules keep edits punchy for short-form content.',
        'Environmental concepts explored wayfinding and locker-room moments where the mark reads at a glance under harsh lighting.',
      ],
      gallery: [
        { src: '/techlife/1.webp', alt: 'Techlife identity overview' },
        {
          src: '/techlife/2.webp',
          alt: 'Techlife identity logo overview',
        },
        {
          src: '/techlife/3.webp',
          alt: 'Techlife pattern lookup',
        },
        {
          src: '/techlife/4.webp',
          alt: 'Techlife identity stationary mockup',
        },
        {
          src: '/techlife/5.webp',
          alt: 'Techlife identity color lookup',
        },
        {
          src: '/techlife/6.webp',
          alt: 'Techlife identity typeface overview',
        },
        {
          src: '/techlife/7.webp',
          alt: 'Techlife identity brand merchandise lookup',
        },  {
          src: '/techlife/8.webp',
          alt: 'Techlife identity primary color palette',
        },
        {
          src: '/techlife/9.webp',
          alt: 'Techlife identity people & product lookup',
        },
        {
          src: '/techlife/10.webp',
          alt: 'Techlife identity secondary color palette',
        },
        {
          src: '/techlife/11.webp',
          alt: 'Techlife identity social media lookup',
        },
        {
          src: '/techlife/12.webp',
          alt: 'Techlife identity website overview',
        },
        {
          src: '/techlife/13.webp',
          alt: 'Techlife identity logo cover',
        },
      ],
    },
  },
  {
    id: 7,
    slug: 'saucy-menu-website',
    country: 'United Kingdom',
    name: 'Saucy Menu',
    image: '/saucymenu-landingpage-cover.webp',
    externalUrl: 'https://www.saucymenu.com/',
    description:
      'Intelligent restaurant assistant with AI menus, chat, and guest-safe ordering.',
  },
  {
    id: 8,
    slug: 'saucy-menu-admin-dashboard',
    country: 'United Kingdom',
    name: 'Saucy Menu Admin Dashboard',
    image: '/saucymenu-admindashboard-cover.webp',
    externalUrl: accessRequestMailto('Saucy Menu Admin Dashboard'),
    description: 'Dashboard interface and experience for restaurant operators.',
  },
  {
    id: 9,
    slug: 'saucy-menu-enduser-app',
    country: 'United Kingdom',
    name: 'Saucy Menu App',
    image: '/saucymenu-enduser-cover.webp',
    externalUrl:
      'https://menu.saucymenu.com/?id=71f27e62-8d37-4317-a9c7-a8b1949f4cde',
    description: 'Guest-facing menu experience with AI chat and personalised dish guidance.',
  },
  {
    id: 10,
    slug: 'empire-standard-by-eagles',
    country: 'Ghana',
    name: 'Empire Standard by Eagles',
    image: '/empire-standard-manequin-preview_uShadows.jpg',
    description:
      'Quiet power and intentional dress for the modern African businessman who builds legacy without excess.',
    caseStudy: {
      year: '2026',
      role: 'Visual Identity and Strategy',
      services: ['Strategy', 'Visual Identity', 'Logo Design', 'Print Collateral'],
      context: [
        'Born from the belief that true power is quiet, disciplined, and intentional. The Empire Standard Collection represents the modern African businessman who builds influence without noise and commands respect without excess.',
        'Inspired by empires that were not inherited but constructed, from trade routes to boardrooms. This collection reflects men who understand that standards create empires, and empires are sustained by standards.',
        'Every silhouette is purposeful. Every cut communicates authority. Every fabric choice reflects restraint, structure, and longevity. This collection is for men who value precision over decoration and measure success in legacy, not applause.',
        'From executive meetings to private negotiations, Empire Standard outfits the man whose presence sets the tone before he speaks. Because in business you do not chase power. You establish the standard.',
      ],
      gallery: [
        { src: '/empire-standard-collection/Artboard 0@4x.webp', alt: 'Techlife identity overview' },
        {
          src: '/empire-standard-collection/Artboard 1@4x.webp',
          alt: 'Techlife identity logo overview',
        },
        {
          src: '/empire-standard-collection/Artboard 2@4x.webp',
          alt: 'Techlife pattern lookup',
        },
        {
          src: '/empire-standard-collection/Artboard 4@4x.webp',
          alt: 'Techlife identity stationary mockup',
        },
        {
          src: '/empire-standard-collection/Artboard 5@4x.webp',
          alt: 'Techlife identity color lookup',
        },
        {
          src: '/empire-standard-collection/Artboard 6@4x.webp',
          alt: 'Techlife identity typeface overview',
        },
        {
          src: '/empire-standard-collection/Artboard 7@4x.webp',
          alt: 'Techlife identity brand merchandise lookup',
        }
      ],
    },
  },
]

export function getProjectBySlug(slug: string): PortfolioProject | undefined {
  return projects.find((p) => p.slug === slug)
}
