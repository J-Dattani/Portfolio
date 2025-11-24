import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import profile from '../assets/profile.jpg'

// Desktop wants the name on a new line; using an explicit newline achieves that cleanly
const titleText = "Hello, I’m\nJaymin Dattani\n{ }"
const subtitle = "BTech in Computer Engineering — passionate about Web Development and cinematic UX."

const LINKEDIN_URL = 'https://www.linkedin.com/in/jaymindattani'

export default function Hero() {
  const [index, setIndex] = useState(0)
  const [done, setDone] = useState(false)
  const [showImg, setShowImg] = useState(true)
  const [imgLoaded, setImgLoaded] = useState(false)

  const speed = useMemo(() => 40, []) // typing ms per character

  useEffect(() => {
    if (index < titleText.length) {
      const id = setTimeout(() => setIndex((i) => i + 1), speed)
      return () => clearTimeout(id)
    } else {
      const id = setTimeout(() => setDone(true), 300)
      return () => clearTimeout(id)
    }
  }, [index, speed])

  const onScrollTo = (target) => {
    const el = document.querySelector(target)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section id="home" className="relative overflow-hidden pt-44 md:pt-52 pb-24 md:pb-32">
      {/* Cinematic background accents */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -left-16 w-72 h-72 rounded-full blur-3xl opacity-40" style={{ background: 'radial-gradient(closest-side, rgba(99,102,241,0.35), transparent)' }} />
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-40" style={{ background: 'radial-gradient(closest-side, rgba(234,179,8,0.25), transparent)' }} />
      </div>

  <div className="relative mx-auto max-w-[1400px] px-4 md:px-8">
        {/* Mobile layout: image first, then text inside a card */}
        <div className="md:hidden space-y-6">
          {/* Avatar first on mobile */}
          <motion.div
            id="profile-avatar-anchor"
            initial={{ opacity: 0, scale: 0.94, y: 8 }}
            animate={{ opacity: done ? 1 : 0, scale: done ? 1 : 0.94, y: done ? 0 : 8 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
            className="relative flex justify-center"
          >
            <div aria-hidden className="absolute -z-10 w-72 h-72 rounded-full blur-3xl opacity-40" style={{ background: 'radial-gradient(closest-side, rgba(99,102,241,0.25), transparent)' }} />
            <div className="relative p-1 rounded-full bg-gradient-to-br from-indigo-500/40 to-amber-400/40">
              <div className="rounded-full bg-white/70 backdrop-blur-md ring-1 ring-white/60 shadow-2xl overflow-hidden w-56 h-56 flex items-center justify-center">
                {showImg ? (
                  <img
                    src={profile}
                    alt="Portrait of Jaymin Dattani"
                    className={`w-full h-full object-cover ${imgLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
                    onLoad={() => setImgLoaded(true)}
                    onError={() => setShowImg(false)}
                  />
                ) : (
                  <div className="w-full h-full grid place-items-center bg-gradient-to-br from-white to-slate-100 dark:from-slate-800 dark:to-slate-900">
                    <div className="text-5xl font-bold text-slate-700 dark:text-slate-200 select-none">JD</div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Text card below the image */}
          <div className="glass gradient-glow rounded-[28px] ring-1 ring-white/50 p-6 shadow-xl">
            {/* Left: Title, subtitle, CTAs inside the card */}
            <div>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: 'easeOut' }}
              className="text-4xl md:text-7xl font-extrabold tracking-tight leading-tight"
            >
              <span className={`caret whitespace-pre-line ${done ? 'opacity-100' : ''}`}>{titleText.slice(0, index)}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: done ? 1 : 0, y: done ? 0 : 16 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
              className="mt-5 max-w-2xl text-slate-600 dark:text-slate-300"
            >
              {subtitle}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: done ? 1 : 0, y: done ? 0 : 16 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.15 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <button
                onClick={() => onScrollTo('#projects')}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-slate-900 dark:text-slate-100 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-900/15 dark:border-slate-300/20 shadow-sm hover:border-indigo-400 hover:shadow-md hover:-translate-y-px active:translate-y-0 transition-all"
              >
                View Projects
              </button>
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noreferrer noopener"
                className="group relative inline-flex items-center gap-2 px-5 py-3 rounded-full text-slate-900 dark:text-slate-100 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-900/15 dark:border-slate-300/20 ring-1 ring-black/5 dark:ring-white/5 hover:border-indigo-400 hover:ring-indigo-300/40 hover:shadow-md hover:-translate-y-px active:translate-y-0 transition-all"
                aria-label="Open LinkedIn profile in new tab"
              >
                {/* LinkedIn icon */}
                <svg aria-hidden xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5 fill-slate-900 dark:fill-slate-100">
                  <path d="M4.983 3.5C4.983 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.483 1.12 2.483 2.5zM.5 8h4V24h-4V8zm7.5 0h3.834v2.184h.054c.534-1.012 1.84-2.082 3.789-2.082 4.054 0 4.8 2.67 4.8 6.144V24h-4v-7.36c0-1.756-.03-4.012-2.446-4.012-2.45 0-2.826 1.914-2.826 3.888V24h-4V8z" />
                </svg>
                <span>Connect on LinkedIn</span>
              </a>
            </motion.div>
          </div>
          </div>
        </div>

        {/* Desktop layout: single card with image + text side-by-side */}
        <div
          className="hidden md:block"
        >
          <div className="glass gradient-glow rounded-[28px] ring-1 ring-white/50 p-8 md:p-14 shadow-xl hover:shadow-2xl transition-all duration-300">
            <div className="grid md:grid-cols-2 items-center gap-12">
              {/* Left: Title, subtitle, CTAs inside the card */}
              <div>
                <motion.h1
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, ease: 'easeOut' }}
                  className="text-4xl md:text-7xl font-extrabold tracking-tight leading-tight"
                >
                  <span className={`caret whitespace-pre-line ${done ? 'opacity-100' : ''}`}>{titleText.slice(0, index)}</span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: done ? 1 : 0, y: done ? 0 : 16 }}
                  transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
                  className="mt-5 max-w-2xl text-slate-600 dark:text-slate-300"
                >
                  {subtitle}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: done ? 1 : 0, y: done ? 0 : 16 }}
                  transition={{ duration: 0.6, ease: 'easeOut', delay: 0.15 }}
                  className="mt-8 flex flex-wrap gap-3"
                >
                  <button
                    onClick={() => onScrollTo('#projects')}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-slate-900 dark:text-slate-100 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-900/15 dark:border-slate-300/20 shadow-sm hover:border-indigo-400 hover:shadow-md hover:-translate-y-px active:translate-y-0 transition-all"
                  >
                    View Projects
                  </button>
                  <a
                    href={LINKEDIN_URL}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="group relative inline-flex items-center gap-2 px-5 py-3 rounded-full text-slate-900 dark:text-slate-100 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-900/15 dark:border-slate-300/20 ring-1 ring-black/5 dark:ring-white/5 hover:border-indigo-400 hover:ring-indigo-300/40 hover:shadow-md hover:-translate-y-px active:translate-y-0 transition-all"
                    aria-label="Open LinkedIn profile in new tab"
                  >
                    <svg aria-hidden xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5 fill-slate-900 dark:fill-slate-100">
                      <path d="M4.983 3.5C4.983 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.483 1.12 2.483 2.5zM.5 8h4V24h-4V8zm7.5 0h3.834v2.184h.054c.534-1.012 1.84-2.082 3.789-2.082 4.054 0 4.8 2.67 4.8 6.144V24h-4v-7.36c0-1.756-.03-4.012-2.446-4.012-2.45 0-2.826 1.914-2.826 3.888V24h-4V8z" />
                    </svg>
                    <span>Connect on LinkedIn</span>
                  </a>
                </motion.div>
              </div>

              {/* Right: Profile photo (reveals after typing) */}
              <motion.div
                id="profile-avatar-anchor"
                initial={{ opacity: 0, scale: 0.94, y: 8 }}
                animate={{ opacity: done ? 1 : 0, scale: done ? 1 : 0.94, y: done ? 0 : 8 }}
                transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
                className="relative flex justify-center md:justify-end"
              >
                <div aria-hidden className="absolute -z-10 w-72 h-72 md:w-80 md:h-80 rounded-full blur-3xl opacity-40" style={{ background: 'radial-gradient(closest-side, rgba(99,102,241,0.25), transparent)' }} />

                <div className="relative p-1 rounded-full bg-gradient-to-br from-indigo-500/40 to-amber-400/40">
                  <div className="rounded-full bg-white/70 backdrop-blur-md ring-1 ring-white/60 shadow-2xl overflow-hidden w-56 h-56 md:w-64 md:h-64 flex items-center justify-center">
                    {showImg ? (
                      <img
                        src={profile}
                        alt="Portrait of Jaymin Dattani"
                        className={`w-full h-full object-cover ${imgLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
                        onLoad={() => setImgLoaded(true)}
                        onError={() => setShowImg(false)}
                      />
                    ) : (
                      <div className="w-full h-full grid place-items-center bg-gradient-to-br from-white to-slate-100 dark:from-slate-800 dark:to-slate-900">
                        <div className="text-5xl font-bold text-slate-700 dark:text-slate-200 select-none">JD</div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>

        </div>
      </div>
      </div>
    </section>
  )
}
