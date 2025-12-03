import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const links = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#how', label: 'How I Work' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#articles', label: 'Articles' },
  { href: '#certificates', label: 'Certificates' },
  { href: '#achievements', label: 'Achievements' },
  { href: '#experience', label: 'Experience' },
  { href: '#contact', label: 'Contact' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('#home')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Detect which section is active while scrolling (minimal + performant)
  useEffect(() => {
    const ids = links.map(l => l.href)
    const onScrollSpy = () => {
      const y = window.scrollY + 120 // header offset
      let current = '#home'
      for (const href of ids) {
        const el = document.querySelector(href)
        if (el && el.offsetTop <= y) current = href
      }
      setActive(current)
    }
    onScrollSpy()
    window.addEventListener('scroll', onScrollSpy, { passive: true })
    window.addEventListener('resize', onScrollSpy)
    return () => {
      window.removeEventListener('scroll', onScrollSpy)
      window.removeEventListener('resize', onScrollSpy)
    }
  }, [])

  const handleLinkClick = (e, href) => {
    e.preventDefault()
    setActive(href) // immediate visual feedback; scroll spy will confirm
    setOpen(false) // close mobile menu
    
    // Small delay to let menu close before scrolling
    setTimeout(() => {
      const el = document.querySelector(href)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }, 100)
  }

  return (
    <div className="fixed top-0 inset-x-0 z-50">
      {/* Skip to content for keyboard users */}
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[60] focus:px-3 focus:py-2 focus:bg-white focus:text-indigo-700 focus:rounded-md focus:shadow">
        Skip to content
      </a>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        role="navigation"
        aria-label="Primary"
  className={`mx-auto mt-3 w-[min(100%-1rem,1200px)] rounded-2xl md:rounded-full border transition-colors ${scrolled ? 'bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border-white/40 dark:border-slate-700/40 shadow-lg' : 'bg-white/40 dark:bg-slate-900/40 backdrop-blur-md border-white/30 dark:border-slate-700/30'} `}
      >
        <div className="flex items-center justify-between px-5 py-2">
          <a href="#home" className="font-semibold tracking-tight dark:text-slate-100" onClick={(e)=>handleLinkClick(e,'#home')}>
            <span className="text-indigo-600 dark:text-indigo-400">Jaymin Dattani</span> • Portfolio
          </a>
          <div className="hidden lg:flex gap-1.5 flex-wrap">
            {links.map(l => {
              const isActive = active === l.href
              return (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={(e)=>handleLinkClick(e,l.href)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`relative group px-2.5 py-1.5 rounded-full text-xs transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-indigo-600/15 dark:bg-indigo-500/20 text-indigo-900 dark:text-indigo-300 ring-1 ring-indigo-300/40 dark:ring-indigo-500/40'
                      : 'hover:bg-indigo-600/10 dark:hover:bg-indigo-500/15 hover:text-indigo-700 dark:hover:text-indigo-300 dark:text-slate-300'
                  }`}
                >
                  {l.label}
                  {/* tiny underline only on hover when not active */}
                  {!isActive && (
                    <span className="pointer-events-none absolute left-2.5 right-2.5 bottom-0.5 h-0.5 rounded-full bg-indigo-600/60 dark:bg-indigo-400/60 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-200 ease-out" />
                  )}
                </a>
              )
            })}
          </div>
          <button className="lg:hidden inline-flex items-center justify-center w-9 h-9 rounded-full hover:bg-black/5 dark:hover:bg-white/10 dark:text-slate-100" onClick={()=>setOpen(v=>!v)} aria-label="Toggle menu" aria-expanded={open}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              {open ? (
                <path d="M6 18L18 6M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              )}
            </svg>
          </button>
        </div>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden px-4 pb-3 overflow-hidden"
            >
              <div className="grid gap-1 pt-2">
                {links.map(l => {
                  const isActive = active === l.href
                  return (
                    <a
                      key={l.href}
                      href={l.href}
                      onClick={(e)=>handleLinkClick(e,l.href)}
                      aria-current={isActive ? 'page' : undefined}
                      className={`relative group px-3 py-2.5 rounded-lg text-sm transition-colors ${
                        isActive ? 'bg-indigo-600/10 dark:bg-indigo-500/20 text-indigo-800 dark:text-indigo-300' : 'hover:bg-indigo-600/10 dark:hover:bg-indigo-500/15 hover:text-indigo-700 dark:hover:text-indigo-300 dark:text-slate-300'
                      }`}
                    >
                      {l.label}
                      {!isActive && (
                        <span className="pointer-events-none absolute left-3 right-3 bottom-1 h-0.5 rounded-full bg-indigo-600/60 dark:bg-indigo-400/60 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-200 ease-out" />
                      )}
                    </a>
                  )
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </div>
  )
}
