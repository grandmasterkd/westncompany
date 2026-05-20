import { ArrowRightIcon } from '@heroicons/react/24/solid'
import { motion, useReducedMotion } from 'framer-motion'
import gsap from 'gsap'
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react'

/**
 * Hero inspired by CREATIVECUE® — sine-track image band (diagonal sweep + sine wave).
 * https://www.creativecue.co/
 */

type CardDef = {
  id: string
  src: string
  leftPct: number
  topPct: number
  w: number
  h: number
  rot: number
}

const DESKTOP_N = 12
const MD_BREAKPOINT = 768
const MOBILE_CARD_COUNT = 8

/** Public assets under `/hero-section/` (replace files in `public/hero-section` as needed). */
const HERO_SECTION_IMAGES = [
  '/hero-section/ecole-mobile-ui.png',
  '/hero-section/saucy-menu-Restaurant Home.png',
  '/hero-section/empire-standard-manequin-preview_uShadows.jpg',
  '/hero-section/chickfries-main-campaign-banner.png',
  '/hero-section/3fm-afroconnect-campaign.webp',
  '/hero-section/manor-call-card.png',
  '/hero-section/coretech-StationeryMockup.jpg',
  '/hero-section/07.png',
  '/hero-section/06.png',
  '/hero-section/coretec-brand-biilboardf.webp',
  '/hero-section/chickifries_ad-post.webp',
  '/hero-section/saucymenu-app-icon.png',
] as const

function mobileFitCount(): number {
  return MOBILE_CARD_COUNT
}

function buildDesktopCards(): CardDef[] {
  const cards: CardDef[] = []
  const n = DESKTOP_N
  for (let i = 0; i < n; i++) {
    const t = i / (n - 1)
    // Tighter horizontal cluster (was ~1.2–94.7%).
    const leftPct = 11 + t * 78
    const diagonal = 14 + t * 58
    const sine = 11 * Math.sin(t * Math.PI * 2.35 + 0.15)
    const topPct = Math.min(82, Math.max(10, diagonal + sine))

    const wide = i % 3 === 0 || i % 5 === 2
    const tall = i % 4 === 1
    let w: number
    let h: number
    if (wide) {
      w = 332 + (i % 4) * 38
      h = 150 + (i % 3) * 18
    } else if (tall) {
      w = 202 + (i % 3) * 18
      h = 278 + (i % 4) * 22
    } else {
      w = 238 + (i % 5) * 26
      h = 226 + (i % 4) * 18
    }

    const tangent = Math.cos(t * Math.PI * 2.35 + 0.15) * 0.28
    const rot = -10 + t * 18 + tangent * 14 + (i % 2 === 0 ? -2 : 2)

    cards.push({
      id: `d-${i + 1}`,
      src: HERO_SECTION_IMAGES[i]!,
      leftPct,
      topPct,
      w,
      h,
      rot,
    })
  }
  return cards
}

function buildMobileCards(vw: number): CardDef[] {
  const count = mobileFitCount()
  const usable = Math.max(280, vw - 48)
  const cards: CardDef[] = []
  for (let i = 0; i < count; i++) {
    const t = count === 1 ? 0.5 : i / (count - 1)
    const leftPct =
      50 + Math.sin(t * Math.PI * 2.1 + 0.3) * 12 + (i % 2 === 0 ? -6 : 6)
    const topPct = 10 + t * 54
    const baseW = Math.min(215, usable * 0.6)
    const wide = i % 4 === 0 || i % 5 === 2
    const w = wide ? baseW * 1.02 : baseW * 0.78
    const h = wide ? baseW * 0.48 : baseW * 0.72
    const rot = -5 + (i % 3 - 1) * 2 + Math.sin(t * Math.PI) * 1.5
    cards.push({
      id: `m-${i + 1}`,
      src: HERO_SECTION_IMAGES[i % HERO_SECTION_IMAGES.length]!,
      leftPct,
      topPct,
      w,
      h,
      rot,
    })
  }
  return cards
}

const CARDS_DESKTOP = buildDesktopCards()

const HEADLINE = 'Building conversion-focused design and automated systems for impact-drvien humans.'
const HEADLINE_WORDS = HEADLINE.split(' ')

function readXYRot(el: HTMLElement, fallbackRot: number) {
  const x = parseFloat(String(gsap.getProperty(el, 'x'))) || 0
  const y = parseFloat(String(gsap.getProperty(el, 'y'))) || 0
  const rotation =
    parseFloat(String(gsap.getProperty(el, 'rotation'))) || fallbackRot
  return { x, y, rotation }
}

function bundleOffset(i: number, n: number) {
  return {
    x: -220 - i * 6,
    y: -175 - i * 5,
    rot: -22 + (i / Math.max(1, n - 1)) * 10,
  }
}

function bundleOffsetMobile(i: number) {
  return {
    x: (i % 2 === 0 ? -1 : 1) * (14 + (i % 3) * 5),
    y: -340 - i * 42,
    rot: -10 + (i % 3) * 4,
  }
}

function smoothstep(p: number) {
  const t = Math.max(0, Math.min(1, p))
  return t * t * (3 - 2 * t)
}

const TRAIL_MAX_PARTICLES = 720
const TRAIL_MIN_SPAWN_PX = 2.2
const TRAIL_CACHE_MAX_W = 200
const TRAIL_MIN_SAMPLE_ALPHA = 14
const TRAIL_STEP_ALONG_PX = 5.5
const TRAIL_MAX_STEPS_PER_MOVE = 14

type CachedBitmap = { canvas: HTMLCanvasElement; w: number; h: number }

type TrailParticle = {
  x: number
  y: number
  vx: number
  vy: number
  r: number
  life: number
  maxLife: number
  cr: number
  cg: number
  cb: number
}

function sampleRgbFromCache(
  cache: Map<string, CachedBitmap>,
  src: string,
  u: number,
  v: number,
): [number, number, number] | null {
  const entry = cache.get(src)
  if (!entry) return null
  const ctx = entry.canvas.getContext('2d', { willReadFrequently: true })
  if (!ctx) return null
  const cx = Math.floor(Math.max(0, Math.min(1, u)) * (entry.w - 1))
  const cy = Math.floor(Math.max(0, Math.min(1, v)) * (entry.h - 1))
  let r = 0
  let g = 0
  let b = 0
  let a = 0
  let n = 0
  for (let oy = -1; oy <= 1; oy++) {
    for (let ox = -1; ox <= 1; ox++) {
      const x = Math.max(0, Math.min(entry.w - 1, cx + ox))
      const y = Math.max(0, Math.min(entry.h - 1, cy + oy))
      const d = ctx.getImageData(x, y, 1, 1).data
      r += d[0]!
      g += d[1]!
      b += d[2]!
      a += d[3]!
      n++
    }
  }
  r = Math.round(r / n)
  g = Math.round(g / n)
  b = Math.round(b / n)
  a = a / n
  if (a < TRAIL_MIN_SAMPLE_ALPHA) return null
  return [r, g, b]
}

/** Solid filled dot only (no halo, ring, or stroke). */
function drawTrailDot(ctx: CanvasRenderingContext2D, p: TrailParticle) {
  const t = p.life / p.maxLife
  const dotR = Math.max(1.25, Math.min(3.6, p.r * 0.1))
  const alpha = 0.42 + 0.58 * t
  ctx.globalCompositeOperation = 'source-over'
  ctx.fillStyle = `rgba(${p.cr},${p.cg},${p.cb},${alpha})`
  ctx.beginPath()
  ctx.arc(p.x, p.y, dotR, 0, Math.PI * 2)
  ctx.fill()
}

function findTopCardUnderPointer(
  clientX: number,
  clientY: number,
  cards: CardDef[],
  innerRefs: Array<HTMLDivElement | null>,
): { src: string; u: number; v: number } | null {
  for (let i = cards.length - 1; i >= 0; i--) {
    const el = innerRefs[i]
    if (!el) continue
    const r = el.getBoundingClientRect()
    if (r.width <= 0 || r.height <= 0) continue
    if (
      clientX >= r.left &&
      clientX <= r.right &&
      clientY >= r.top &&
      clientY <= r.bottom
    ) {
      const u = (clientX - r.left) / r.width
      const v = (clientY - r.top) / r.height
      return { src: cards[i]!.src, u, v }
    }
  }
  return null
}

function sineTrackSample(
  i: number,
  n: number,
  p: number,
  targetRot: number,
): { x: number; y: number; rot: number; sc: number } {
  const b = bundleOffset(i, n)
  const t = i / Math.max(1, n - 1)
  const easeP = smoothstep(p)
  const wave = Math.sin((t * 0.65 + p * 0.9) * Math.PI * 2.2) * (1 - p) * 48
  const dip = Math.sin(p * Math.PI) * (1 - p) * 36
  return {
    x: b.x * (1 - easeP) + wave + dip * Math.cos(t * Math.PI),
    y: b.y * (1 - easeP) - wave * 0.35 + dip * 0.6 * Math.sin(t * Math.PI),
    rot: b.rot * (1 - easeP) + targetRot * easeP,
    sc: 0.32 + easeP * 0.68 + Math.sin(p * Math.PI) * 0.06,
  }
}

function sineTrackSampleMobile(
  i: number,
  n: number,
  p: number,
  targetRot: number,
): { x: number; y: number; rot: number; sc: number } {
  const b = bundleOffsetMobile(i)
  const t = i / Math.max(1, n - 1)
  const easeP = smoothstep(p)
  const horizDrift = Math.sin((t + p * 0.65) * Math.PI * 1.5) * (1 - p) * 18
  const downward = p * (160 + t * 90)
  return {
    x: b.x * (1 - easeP) + horizDrift,
    y: b.y * (1 - easeP) + downward,
    rot: b.rot * (1 - easeP) + targetRot * easeP,
    sc: 0.28 + easeP * 0.72 + Math.sin(p * Math.PI) * 0.05,
  }
}

export default function Hero() {
  const reduceMotion = useReducedMotion()
  const [copyEntered, setCopyEntered] = useState(false)
  const [viewportW, setViewportW] = useState<number | null>(null)
  const trackRef = useRef<HTMLDivElement | null>(null)
  const trailCanvasRef = useRef<HTMLCanvasElement | null>(null)
  const imageCacheRef = useRef<Map<string, CachedBitmap>>(new Map())
  const trailParticlesRef = useRef<TrailParticle[]>([])
  const trailLastRef = useRef<{ mx: number; my: number } | null>(null)
  const trailRafRef = useRef<number>(0)
  const innerEls = useRef<Array<HTMLDivElement | null>>([])
  const introDone = useRef(false)
  const restTransforms = useRef<
    Array<{ x: number; y: number; rotation: number }>
  >([])

  const setInnerRef = useCallback((el: HTMLDivElement | null, index: number) => {
    innerEls.current[index] = el
  }, [])

  useLayoutEffect(() => {
    setViewportW(window.innerWidth)
    const onResize = () => setViewportW(window.innerWidth)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const effectiveW = viewportW ?? MD_BREAKPOINT

  const cards = useMemo(() => {
    return effectiveW < MD_BREAKPOINT
      ? buildMobileCards(effectiveW)
      : CARDS_DESKTOP
  }, [effectiveW])

  const deckKey = useMemo(() => {
    return effectiveW < MD_BREAKPOINT ? `m-${mobileFitCount()}` : 'd'
  }, [effectiveW])

  const cardsRef = useRef(cards)
  cardsRef.current = cards

  useEffect(() => {
    const cache = imageCacheRef.current
    let cancelled = false
    for (const src of HERO_SECTION_IMAGES) {
      if (cache.has(src)) continue
      const img = new Image()
      img.onload = () => {
        if (cancelled) return
        const nw = img.naturalWidth || 1
        const nh = img.naturalHeight || 1
        const scale = Math.min(1, TRAIL_CACHE_MAX_W / nw)
        const w = Math.max(1, Math.round(nw * scale))
        const h = Math.max(1, Math.round(nh * scale))
        const canvas = document.createElement('canvas')
        canvas.width = w
        canvas.height = h
        const c2d = canvas.getContext('2d')
        if (!c2d) return
        c2d.drawImage(img, 0, 0, w, h)
        cache.set(src, { canvas, w, h })
      }
      img.onerror = () => {}
      img.src = src
    }
    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    return () => {
      if (trailRafRef.current) {
        cancelAnimationFrame(trailRafRef.current)
        trailRafRef.current = 0
      }
    }
  }, [])

  const runTrailFrame = useCallback(() => {
    const canvas = trailCanvasRef.current
    const track = trackRef.current
    if (!canvas || !track) return
    const parts = trailParticlesRef.current
    const rect = track.getBoundingClientRect()
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const cssW = Math.max(1, rect.width)
    const cssH = Math.max(1, rect.height)
    const bufW = Math.round(cssW * dpr)
    const bufH = Math.round(cssH * dpr)
    if (canvas.width !== bufW || canvas.height !== bufH) {
      canvas.width = bufW
      canvas.height = bufH
      canvas.style.width = `${cssW}px`
      canvas.style.height = `${cssH}px`
    }
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    ctx.clearRect(0, 0, cssW, cssH)
    for (let i = parts.length - 1; i >= 0; i--) {
      const p = parts[i]!
      p.x += p.vx
      p.y += p.vy
      p.vx *= 0.972
      p.vy *= 0.972
      p.life -= 1
      if (p.life <= 0) {
        parts.splice(i, 1)
        continue
      }
      drawTrailDot(ctx, p)
    }
    ctx.globalCompositeOperation = 'source-over'
  }, [])

  const scheduleTrailLoop = useCallback(() => {
    if (trailRafRef.current) return
    const tick = () => {
      runTrailFrame()
      if (trailParticlesRef.current.length > 0) {
        trailRafRef.current = requestAnimationFrame(tick)
      } else {
        trailRafRef.current = 0
      }
    }
    trailRafRef.current = requestAnimationFrame(tick)
  }, [runTrailFrame])

  const spawnTrailDots = useCallback(
    (
      clientX: number,
      clientY: number,
      mx: number,
      my: number,
      cardsSlice: CardDef[],
    ) => {
      if (reduceMotion) return
      if (effectiveW < MD_BREAKPOINT) return
      if (!introDone.current) return

      const hit = findTopCardUnderPointer(
        clientX,
        clientY,
        cardsSlice,
        innerEls.current,
      )
      if (!hit) {
        trailLastRef.current = { mx, my }
        return
      }
      const rgb = sampleRgbFromCache(imageCacheRef.current, hit.src, hit.u, hit.v)
      if (!rgb) {
        trailLastRef.current = { mx, my }
        return
      }
      const prev = trailLastRef.current
      if (prev) {
        const dist = Math.hypot(mx - prev.mx, my - prev.my)
        if (dist < TRAIL_MIN_SPAWN_PX) {
          trailLastRef.current = { mx, my }
          return
        }
      }

      const [cr, cg, cb] = rgb
      let vx = 0
      let vy = 0
      if (prev) {
        const dx = mx - prev.mx
        const dy = my - prev.my
        const len = Math.hypot(dx, dy) || 1
        const sp = Math.min(len * 0.26, 16)
        vx = (dx / len) * sp
        vy = (dy / len) * sp
      }
      trailLastRef.current = { mx, my }

      const parts = trailParticlesRef.current
      const pushParticle = (
        x: number,
        y: number,
        pvx: number,
        pvy: number,
        radius: number,
        lifeFrames: number,
      ) => {
        while (parts.length >= TRAIL_MAX_PARTICLES) parts.shift()
        parts.push({
          x,
          y,
          vx: pvx,
          vy: pvy,
          r: radius,
          life: lifeFrames,
          maxLife: lifeFrames,
          cr,
          cg,
          cb,
        })
      }

      const vlen = Math.hypot(vx, vy) || 1
      const px = -vy / vlen
      const py = vx / vlen

      if (!prev) {
        pushParticle(mx, my, 0, 0, 18 + Math.random() * 14, 100 + Math.floor(Math.random() * 45))
        for (let k = 0; k < 8; k++) {
          const ang = Math.random() * Math.PI * 2
          const rs = 4 + Math.random() * 24
          pushParticle(
            mx + Math.cos(ang) * rs,
            my + Math.sin(ang) * rs,
            (Math.random() - 0.5) * 5,
            (Math.random() - 0.5) * 5,
            9 + Math.random() * 16,
            72 + Math.floor(Math.random() * 40),
          )
        }
      } else {
        const dist = Math.hypot(mx - prev.mx, my - prev.my)
        const steps = Math.min(
          TRAIL_MAX_STEPS_PER_MOVE,
          Math.max(1, Math.ceil(dist / TRAIL_STEP_ALONG_PX)),
        )
        for (let s = 0; s < steps; s++) {
          const f = (s + 0.35 + Math.random() * 0.3) / steps
          const bx = prev.mx + (mx - prev.mx) * Math.min(1, f)
          const by = prev.my + (my - prev.my) * Math.min(1, f)
          const spread = (Math.random() - 0.5) * 34
          const along = (Math.random() - 0.5) * 10
          const ox = bx + px * spread + (vx / vlen) * along
          const oy = by + py * spread + (vy / vlen) * along
          const rMain = 16 + Math.random() * 22
          const life0 = 88 + Math.floor(Math.random() * 55)
          pushParticle(
            ox,
            oy,
            vx * (0.55 + Math.random() * 0.35) + (Math.random() - 0.5) * 6,
            vy * (0.55 + Math.random() * 0.35) + (Math.random() - 0.5) * 6,
            rMain,
            life0,
          )
          if (Math.random() < 0.72) {
            pushParticle(
              ox + (Math.random() - 0.5) * 20,
              oy + (Math.random() - 0.5) * 20,
              vx * 0.35 + (Math.random() - 0.5) * 7,
              vy * 0.35 + (Math.random() - 0.5) * 7,
              7 + Math.random() * 12,
              55 + Math.floor(Math.random() * 40),
            )
          }
          if (Math.random() < 0.45) {
            pushParticle(
              ox + px * ((Math.random() - 0.5) * 28),
              oy + py * ((Math.random() - 0.5) * 28),
              vx * 0.22 + (Math.random() - 0.5) * 5,
              vy * 0.22 + (Math.random() - 0.5) * 5,
              5 + Math.random() * 9,
              40 + Math.floor(Math.random() * 30),
            )
          }
        }
      }
      scheduleTrailLoop()
    },
    [effectiveW, reduceMotion, scheduleTrailLoop],
  )

  const clearCursorTrail = useCallback(() => {
    trailParticlesRef.current = []
    trailLastRef.current = null
    if (trailRafRef.current) {
      cancelAnimationFrame(trailRafRef.current)
      trailRafRef.current = 0
    }
    const canvas = trailCanvasRef.current
    if (canvas) {
      const ctx = canvas.getContext('2d')
      if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height)
    }
  }, [])

  useEffect(() => {
    if (effectiveW < MD_BREAKPOINT) clearCursorTrail()
  }, [effectiveW, clearCursorTrail])

  useEffect(() => {
    if (reduceMotion) clearCursorTrail()
  }, [reduceMotion, clearCursorTrail])

  useLayoutEffect(() => {
    if (viewportW === null) return

    const cardDefs = cardsRef.current

    if (reduceMotion) {
      cardDefs.forEach((_, i) => {
        const el = innerEls.current[i]
        if (el) gsap.set(el, { clearProps: 'transform,filter,opacity' })
      })
      introDone.current = true
      setCopyEntered(true)
      return
    }

    const isMobile = (viewportW ?? MD_BREAKPOINT) < MD_BREAKPOINT
    const trackSample = isMobile ? sineTrackSampleMobile : sineTrackSample

    const ctx = gsap.context(() => {
      const els = cardDefs
        .map((_, i) => innerEls.current[i])
        .filter(Boolean) as HTMLDivElement[]
      if (els.length === 0) return

      const n = els.length
      const b = (i: number) =>
        isMobile ? bundleOffsetMobile(i) : bundleOffset(i, n)

      gsap.set(els, {
        opacity: 0,
        filter: 'brightness(0.55)',
        scale: 0.28,
        x: (i: number) => b(i).x,
        y: (i: number) => b(i).y,
        rotation: (i: number) => b(i).rot,
        transformOrigin: '50% 50%',
      })

      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        onComplete: () => {
          introDone.current = true
          els.forEach((el, i) => {
            restTransforms.current[i] = readXYRot(el, cardDefs[i]!.rot)
          })
          setCopyEntered(true)
        },
      })

      const pathSteps = 5
      const stepDur = 0.34
      for (let s = 1; s <= pathSteps; s++) {
        const p = s / pathSteps
        tl.to(
          els,
          {
            x: (i: number) => trackSample(i, n, p, cardDefs[i]!.rot).x,
            y: (i: number) => trackSample(i, n, p, cardDefs[i]!.rot).y,
            rotation: (i: number) =>
              trackSample(i, n, p, cardDefs[i]!.rot).rot,
            scale: (i: number) => trackSample(i, n, p, cardDefs[i]!.rot).sc,
            opacity: 0.2 + p * 0.8,
            filter: `brightness(${0.72 + p * 0.45})`,
            duration: stepDur,
            ease: 'power2.inOut',
            stagger: { each: isMobile ? 0.04 : 0.048, from: 'start' },
          },
          s === 1 ? 0 : '>',
        )
      }

      tl.to(
        els,
        {
          x: 0,
          y: 0,
          rotation: (i: number) => cardDefs[i]!.rot,
          scale: 1,
          opacity: 1,
          filter: 'brightness(1)',
          duration: 0.92,
          stagger: { each: 0.055, from: 'start' },
          ease: 'power3.out',
        },
        '>-0.04',
      )

      tl.to(
        els,
        {
          keyframes: [
            {
              filter: 'brightness(1.42)',
              scale: 1.045,
              y: -8,
              duration: 0.14,
              ease: 'power2.out',
            },
            {
              filter: 'brightness(1.08)',
              scale: 1.02,
              y: 3,
              duration: 0.18,
              ease: 'power2.inOut',
            },
            {
              filter: 'brightness(1)',
              scale: 1,
              y: 0,
              duration: 0.32,
              ease: 'power2.out',
            },
          ],
          stagger: { each: 0.042, from: 'start' },
        },
        '>-0.12',
      )
    }, trackRef)

    return () => {
      ctx.revert()
      introDone.current = false
      restTransforms.current = []
      setCopyEntered(false)
    }
  }, [reduceMotion, deckKey, viewportW])

  const onPointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!introDone.current || reduceMotion) return
      const track = trackRef.current
      if (!track) return
      const rect = track.getBoundingClientRect()
      const mx = e.clientX - rect.left
      const my = e.clientY - rect.top
      const els = cards
        .map((_, i) => innerEls.current[i])
        .filter(Boolean) as HTMLDivElement[]
      els.forEach((el, i) => {
        const r = el.getBoundingClientRect()
        const cx = r.left + r.width / 2 - rect.left
        const cy = r.top + r.height / 2 - rect.top
        const dx = mx - cx
        const dy = my - cy
        const len = Math.hypot(dx, dy) + 0.001
        const nx = dx / len
        const ny = dy / len
        const mag = Math.min(26, 3800 / (len + 100))
        const rest = restTransforms.current[i] ?? {
          x: 0,
          y: 0,
          rotation: cards[i]!.rot,
        }
        gsap.to(el, {
          x: rest.x + nx * mag,
          y: rest.y + ny * mag,
          rotation: rest.rotation + nx * 2.2 * (mag / 26),
          duration: 0.28,
          ease: 'power3.out',
          overwrite: 'auto',
        })
      })
      spawnTrailDots(e.clientX, e.clientY, mx, my, cards)
    },
    [reduceMotion, cards, spawnTrailDots],
  )

  const onPointerLeave = useCallback(() => {
    if (effectiveW >= MD_BREAKPOINT) clearCursorTrail()
    if (!introDone.current || reduceMotion) return
    const els = cards
      .map((_, i) => innerEls.current[i])
      .filter(Boolean) as HTMLDivElement[]
    els.forEach((el, i) => {
      const rest = restTransforms.current[i] ?? {
        x: 0,
        y: 0,
        rotation: cards[i]!.rot,
      }
      gsap.to(el, {
        x: rest.x,
        y: rest.y,
        rotation: rest.rotation,
        duration: 0.5,
        ease: 'elastic.out(1, 0.42)',
        overwrite: 'auto',
      })
    })
  }, [reduceMotion, cards, effectiveW, clearCursorTrail])

  const wordStagger = reduceMotion ? 0 : 0.09
  const subDelay =
    reduceMotion ? 0 : HEADLINE_WORDS.length * wordStagger + 0.12

  return (
    <section className="page-frame flex w-full min-w-0 max-w-full flex-col overflow-x-clip bg-[var(--color-bg)] max-md:min-h-0 md:min-h-screen">
      <div
        ref={trackRef}
        className="relative isolate mt-20 h-[min(44vh,360px)] max-h-[360px] w-full min-w-0 max-w-full shrink-0 touch-pan-y overflow-hidden md:mt-28 md:h-auto md:max-h-none md:min-h-0 md:flex-1 md:overflow-x-clip md:overflow-y-visible"
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
      >
        <div
          className="pointer-events-none absolute inset-0 z-0 opacity-[0.04]"
          aria-hidden
        >
          <svg className="h-full w-full" preserveAspectRatio="none" viewBox="0 0 100 100">
            <defs>
              <linearGradient id="sinefade" x1="0" x2="1" y1="0" y2="1">
                <stop offset="0%" stopColor="var(--color-text)" stopOpacity="0" />
                <stop offset="35%" stopColor="var(--color-text)" stopOpacity="0.5" />
                <stop offset="100%" stopColor="var(--color-text)" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d="M 4 14 C 22 42, 38 8, 58 52 S 88 78, 96 88"
              fill="none"
              stroke="url(#sinefade)"
              strokeWidth="0.35"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </div>

        {cards.map((c, index) => (
          <div
            key={c.id}
            className="absolute z-[2] cursor-default md:z-[3]"
            style={{
              left: `${c.leftPct}%`,
              top: `${c.topPct}%`,
              width: c.w,
              height: c.h,
              zIndex: 10 + index,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <div
              ref={(el) => setInnerRef(el, index)}
              className="h-full w-full will-change-transform"
            >
              <div className="relative h-full w-full overflow-hidden rounded-xl bg-[var(--color-placeholder)] shadow-[0_1px_0_rgba(31,28,24,0.06)]">
                <img
                  src={c.src}
                  alt=""
                  draggable={false}
                  decoding="async"
                  loading={index < 3 ? 'eager' : 'lazy'}
                  className="pointer-events-none h-full w-full select-none object-cover"
                />
              </div>
            </div>
          </div>
        ))}

        <canvas
          ref={trailCanvasRef}
          className="pointer-events-none absolute inset-0 z-[40] hidden md:block"
          aria-hidden
        />
      </div>

      <div className="relative z-10 flex shrink-0 flex-col pt-3 pl-2 md:pl-6 pb-[var(--page-gutter)]">
        <h1 className="font-display max-w-[22ch] tracking-normal text-[clamp(1.65rem,4vw,2.85rem)] font-semibold leading-[1.08] text-[var(--color-text)] sm:max-w-[26ch] sm:text-[clamp(1.75rem,4.2vw,3.1rem)]">
          <span className="sr-only">{HEADLINE}</span>
          <span aria-hidden className="inline-block">
            {HEADLINE_WORDS.map((word, i) => (
              <span key={`${word}-${i}`} className="inline-block whitespace-nowrap">
                <span className="inline-block overflow-hidden align-bottom">
                  <motion.span
                    className="inline-block"
                    initial={{ y: '108%', skewY: 2.5 }}
                    animate={
                      copyEntered
                        ? { y: 0, skewY: 0 }
                        : { y: '108%', skewY: 2.5 }
                    }
                    transition={{
                      duration: reduceMotion ? 0 : 0.58,
                      delay: reduceMotion ? 0 : i * wordStagger,
                      ease: [0.25, 0.9, 0.3, 1],
                    }}
                  >
                    {word}
                  </motion.span>
                </span>
                {i < HEADLINE_WORDS.length - 1 ? '\u00a0' : null}
              </span>
            ))}
          </span>
        </h1>

        <motion.p
          className=" mt-3 w-auto tracking-normal text-base leading-snug text-[var(--color-text-muted)] sm:text-lg sm:leading-relaxed"
          initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
          animate={
            copyEntered
              ? { opacity: 1, clipPath: 'inset(0 0 0% 0)' }
              : { opacity: 0, clipPath: 'inset(0 0 100% 0)' }
          }
          transition={{
            duration: reduceMotion ? 0 : 0.62,
            delay: subDelay,
            ease: [0.22, 1, 0.34, 1],
          }}
        >
          Shaping the future we see through design, digital products and stories that move us forward.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={
            copyEntered ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }
          }
          transition={{
            duration: reduceMotion ? 0 : 0.48,
            delay: subDelay + 0.14,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mt-4 flex items-center gap-0"
        >
          <a
            href="#book"
            className="inline-flex items-center justify-center rounded-full bg-blue-500 px-8 py-3 text-sm font-medium uppercase tracking-normal text-[var(--color-cta-fg)] no-underline transition hover:opacity-90"
          >
            BOOK NOW
          </a>
          <ArrowRightIcon className=' bg-blue-500 rounded-full p-3 text-white w-13 h-11' />
        </motion.div>
      </div>
    </section>
  )
}
