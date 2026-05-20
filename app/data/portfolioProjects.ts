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
  caseStudy: ProjectCaseStudy
}

export const projects: PortfolioProject[] = [
  {
    id: 1,
    slug: 'salad-club-uk',
    country: 'United Kingdom',
    name: 'Salad Club',
    image: "/salad-club-brand-identity-cover.jpg",
    description:
      'Logo and visual identity for a UK wholesale restaurant chain across touchpoints from trucks to digital.',
    caseStudy: {
      year: '2025',
      industry: 'Wholesale Foods',
      services: ['Logo Design', 'Visual Identity'],
      sections: [
        {
          heading: 'Project Brief',
          paragraphs: [
            'Salad Club is a wholesale restaurant chain operating across the United Kingdom. The brief called for the creation of a logo system strong enough to hold its own across a wide range of brand touchpoints, including commercial vehicles, staff uniforms, physical storefronts, menus, digital platforms, and branded merchandise. The challenge was to design something that could scale from a small apron embroidery to a large truck wrap without losing clarity or character. It needed to feel consistent and recognisable across every surface it landed on, while remaining simple enough to be instantly memorable to a broad consumer audience.',
          ],
        },
        {
          heading: 'Creative Direction',
          paragraphs: [
            "The brand's foundation is built on a feeling. Not just eating well, but feeling right about it. Salad Club positions itself around the idea that healthy choices should feel honest and comfortable, not performative. The creative direction leaned into quiet confidence, trust, and the kind of calm that comes from making good decisions without overthinking them.",
            'The visual identity reflects that. Simple. Familiar. Grounded. The logo icon was designed to carry a sense of reassurance, something that fits naturally into everyday life rather than demanding attention. The identity speaks to people who are building better habits and want a brand that understands that balance is enough.',
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
    description: 'Strategic identity system built for clarity and long-term scale.',
    caseStudy: {
      year: '2023',
      role: 'Identity system',
      services: ['Positioning', 'Logo', 'Guidelines', 'Motion principles'],
      context: [
        'QIA operates across regulated environments where trust and precision are non-negotiable. The mark and wordmark had to feel contemporary without leaning on visual clichés in the sector.',
        'The solution pairs restrained geometry with a single accent signal used sparingly for emphasis — in UI, reports, and keynote decks.',
        'We documented grid, spacing, and partner co-branding so third-party vendors could execute without drift.',
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
    description: 'Product-led branding and mark design for an AI communications platform.',
    caseStudy: {
      year: '2024',
      role: 'Product branding',
      services: ['Naming support', 'Identity', 'Product UI skin', 'Launch assets'],
      context: [
        'Grapevine AI connects fragmented conversations into one timeline for teams. The identity had to feel fast, human, and credible to technical buyers.',
        'We developed a modular wordmark, a glyph for favicons and product chrome, and a photography approach that keeps people in frame while UI stays clean.',
        'Launch included landing pages, investor deck templates, and social snippets sized for paid acquisition.',
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
    description: 'Visual identity and art direction for a performance-focused brand.',
    caseStudy: {
      year: '2023',
      role: 'Visual identity & art direction',
      services: ['Identity', 'Campaign', 'Environmental', 'Web'],
      context: [
        'The Core speaks to discipline and progress — a brand for people who train like professionals. We avoided loud gym tropes in favour of contrast, texture, and confident type.',
        'Art direction pairs gritty photography with clean typographic locks. Motion rules keep edits punchy for short-form content.',
        'Environmental concepts explored wayfinding and locker-room moments where the mark reads at a glance under harsh lighting.',
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
    description: 'User interface and experience for ride hailing system.',
    caseStudy: {
      year: '2024',
      role: 'User Interface and Experience',
      services: ['App Interface'],
      context: [
        'The Core speaks to discipline and progress — a brand for people who train like professionals. We avoided loud gym tropes in favour of contrast, texture, and confident type.',
        'Art direction pairs gritty photography with clean typographic locks. Motion rules keep edits punchy for short-form content.',
        'Environmental concepts explored wayfinding and locker-room moments where the mark reads at a glance under harsh lighting.',
      ],
      gallery: [
        { src: '/work-cover-4.svg', alt: 'The Core identity lockups' },
        {
          src: '/hero-section/saucymenu-app-icon.png',
          alt: 'The Core iconography study',
        },
        {
          src: '/hero-section/chickfries-main-campaign-banner.png',
          alt: 'The Core campaign layout',
        },
        {
          src: '/hero-section/07.png',
          alt: 'The Core visual texture study',
        },
        {
          src: '/hero-section/06.png',
          alt: 'The Core colour and composition',
        },
        
      ],
    },
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
        'The Core speaks to discipline and progress — a brand for people who train like professionals. We avoided loud gym tropes in favour of contrast, texture, and confident type.',
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
    description: 'Brand Identity and Visual System for a Technology Retailer',
    caseStudy: {
      year: '2023',
      role: 'Brand Identity and Visual System',
      services: ['Branding', 'Visual Identity', 'Logo Design', 'Print Collateral'],
      context: [
        'The Core speaks to discipline and progress — a brand for people who train like professionals. We avoided loud gym tropes in favour of contrast, texture, and confident type.',
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
    id: 8,
    slug: 'saucy-menu-admin-dashboard',
    country: 'United Kingdom',
    name: 'Saucy Menu Admin Dashboard',
    image: '/saucymenu-admindashboard-cover.webp',
    description: 'Brand Identity and Visual System for a Technology Retailer',
    caseStudy: {
      year: '2023',
      role: 'Brand Identity and Visual System',
      services: ['Branding', 'Visual Identity', 'Logo Design', 'Print Collateral'],
      context: [
        'The Core speaks to discipline and progress — a brand for people who train like professionals. We avoided loud gym tropes in favour of contrast, texture, and confident type.',
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
    id: 9,
    slug: 'saucy-menu-enduser-app',
    country: 'United Kingdom',
    name: 'Saucy Menu App',
    image: '/saucymenu-enduser-cover.webp',
    description: 'Brand Identity and Visual System for a Technology Retailer',
    caseStudy: {
      year: '2023',
      role: 'Brand Identity and Visual System',
      services: ['Branding', 'Visual Identity', 'Logo Design', 'Print Collateral'],
      context: [
        'The Core speaks to discipline and progress — a brand for people who train like professionals. We avoided loud gym tropes in favour of contrast, texture, and confident type.',
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
    id: 10,
    slug: 'empire-standard-by-eagles',
    country: 'Ghana',
    name: 'Empire Standard by Eagles',
    image: '/empire-standard-manequin-preview_uShadows.jpg',
    description: 'Brand Identity and Visual System for a Technology Retailer',
    caseStudy: {
      year: '2023',
      role: 'Brand Identity and Visual System',
      services: ['Branding', 'Visual Identity', 'Logo Design', 'Print Collateral'],
      context: [
        'The Core speaks to discipline and progress — a brand for people who train like professionals. We avoided loud gym tropes in favour of contrast, texture, and confident type.',
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
]

export function getProjectBySlug(slug: string): PortfolioProject | undefined {
  return projects.find((p) => p.slug === slug)
}
