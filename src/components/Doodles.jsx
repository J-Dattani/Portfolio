import { useEffect, useState, useCallback } from 'react'
import { motion } from 'framer-motion'

// Use official brand glyphs from Simple Icons CDN (CC0-1.0)
// Slugs reference: https://simpleicons.org
const slugs = [
  // web core
  'html5','css3','javascript','typescript','nodedotjs','react','nextdotjs','angular','vuedotjs','svelte','vite','tailwindcss','bootstrap',
  // backend & langs
  'php','laravel','java','spring','kotlin','swift','python','django','flask','go','rust','ruby','dotnet','c','cplusplus','csharp',
  // data & infra
  'mysql','postgresql','mongodb','redis','firebase','supabase','git','github','gitlab','docker','kubernetes','amazonwebservices','microsoftazure','vercel','netlify'
]

export default function Doodles() {
  // Compute a tiled grid that spans the whole page height, not just the viewport
  const [baseSlots, setBaseSlots] = useState(() => [])
  const [vw, setVw] = useState(() => (typeof window !== 'undefined' ? window.innerWidth : 1024))

  const recomputeSlots = useCallback(() => {
    const main = document.getElementById('main')
    const totalH = main ? main.scrollHeight : document.documentElement.scrollHeight
    const w = window.innerWidth
    setVw(w)
    // Responsive density
    let colsPct, stepY, sizes
    if (w < 380) {
      // Too small: hide doodles for clarity
      setBaseSlots([])
      return
    } else if (w < 640) {
      colsPct = [8, 36, 64, 92]
      stepY = 180
      sizes = [18, 22, 26, 30]
    } else {
      colsPct = [3, 13, 23, 33, 43, 53, 63, 73, 83, 93]
      stepY = 140
      sizes = [36, 40, 44, 48]
    }
    const rowsPx = []
    for (let y = 60; y < totalH - 60; y += stepY) rowsPx.push(y)

    const safe = (xPct, y) => {
      // Avoid hero heading region (left/top area only)
      const inHero = xPct >= 10 && xPct <= 58 && y >= 120 && y <= 480
      // Rough avatar column exclusion (refined later by circle)
      const inAvatar = xPct >= 66 && xPct <= 95 && y >= 140 && y <= 520
      return !(inHero || inAvatar)
    }

    const out = []
    for (const y of rowsPx) {
      for (const [ci, col] of colsPct.entries()) {
        const xPct = col
        if (!safe(xPct, y)) continue
        const size = sizes[(ci + Math.floor(y / stepY)) % sizes.length]
        out.push({ x: `${xPct}%`, y, size })
      }
    }
    setBaseSlots(out)
  }, [])

  useEffect(() => {
    recomputeSlots()
    const onResize = () => {
      // Recompute after resize; schedule to run after layout settles
      window.requestAnimationFrame(recomputeSlots)
    }
    window.addEventListener('resize', onResize)
    const t = setTimeout(recomputeSlots, 400) // once after fonts/images settle
    return () => { window.removeEventListener('resize', onResize); clearTimeout(t) }
  }, [recomputeSlots])

  // Further refine with a circular safe zone around the avatar's real position
  const [slots, setSlots] = useState(baseSlots)
  useEffect(() => {
    const el = document.getElementById('profile-avatar-anchor')
    if (!el) {
      setSlots(baseSlots)
      return
    }
    const rect = el.getBoundingClientRect()
    const cx = rect.left + rect.width / 2 + window.scrollX
    const cy = rect.top + rect.height / 2 + window.scrollY
    const radius = Math.max(rect.width, rect.height) / 2 + 80 // margin beyond avatar ring

    const toPxX = (xStr) => (parseFloat(xStr) / 100) * window.innerWidth
    const filtered = baseSlots.filter((s) => {
      const dx = toPxX(s.x) - cx
      const dy = s.y - cy
      const d = Math.hypot(dx, dy)
      return d > radius
    })
    setSlots(filtered)
  }, [baseSlots])

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-visible">
      {slots.map((slot, i) => {
        const slug = slugs[i % slugs.length]
        const src = `https://cdn.simpleicons.org/${slug}/9CA3AF` // gray-400, lighter base tone
        const angle = ((i * 37) % 31) - 15 // -15..15 deg
        const flip = (i * 17) % 2 ? -1 : 1
        const targetOpacity = vw < 640 ? 0.12 : 0.18
        return (
          <motion.img
            key={`${slug}-${slot.x}-${slot.y}`}
            src={src}
            alt=""
            width={slot.size}
            height={slot.size}
            style={{ top: slot.y, left: slot.x, '--rot': `${angle}deg`, '--flip': flip }}
            className="absolute grayscale select-none float-slow"
            loading="lazy"
            decoding="async"
            onError={(e) => { e.currentTarget.style.display = 'none' }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: targetOpacity, y: 0 }}
            transition={{ duration: 1.1, ease: 'easeOut', delay: 0.04 * (i % 8) }}
          />
        )
      })}
    </div>
  )
}
