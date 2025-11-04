import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const links = [
  { href: '#home', label: 'Home' },
  { href: '#how', label: 'How I Work' },
  { href: '#projects', label: 'Projects' },
  { href: '#certificates', label: 'Certificates' },
  { href: '#skills', label: 'Skills' },
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
    setOpen(false)
    setActive(href) // immediate visual feedback; scroll spy will confirm
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
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
  className={`mx-auto mt-3 w-[min(100%-1rem,1100px)] rounded-2xl md:rounded-full border ${scrolled ? 'bg-white/70 backdrop-blur-xl border-white/40 shadow-lg' : 'bg-white/40 backdrop-blur-md border-white/30'} `}
      >
        <div className="flex items-center justify-between px-5 py-2">
          <a href="#home" className="font-semibold tracking-tight" onClick={(e)=>handleLinkClick(e,'#home')}>
            <span className="text-indigo-600">Jaymin Dattani</span> • Portfolio
          </a>
          <div className="hidden md:flex gap-2">
            {links.map(l => {
              const isActive = active === l.href
              return (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={(e)=>handleLinkClick(e,l.href)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`relative group px-3 py-1.5 rounded-full text-sm transition-all ${
                    isActive
                      ? 'bg-indigo-600/15 text-indigo-900 ring-1 ring-indigo-300/40'
                      : 'hover:bg-indigo-600/10 hover:text-indigo-700'
                  }`}
                >
                  {l.label}
                  {/* tiny underline only on hover when not active */}
                  {!isActive && (
                    <span className="pointer-events-none absolute left-3 right-3 bottom-0.5 h-0.5 rounded-full bg-indigo-600/60 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-200 ease-out" />
                  )}
                </a>
              )
            })}
          </div>
          <button className="md:hidden inline-flex items-center justify-center w-9 h-9 rounded-full hover:bg-black/5" onClick={()=>setOpen(v=>!v)} aria-label="Toggle menu">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden px-4 pb-3"
            >
              <div className="grid">
                {links.map(l => {
                  const isActive = active === l.href
                  return (
                    <a
                      key={l.href}
                      href={l.href}
                      onClick={(e)=>handleLinkClick(e,l.href)}
                      aria-current={isActive ? 'page' : undefined}
                      className={`relative group px-3 py-2 rounded-lg text-sm transition-colors ${
                        isActive ? 'bg-indigo-600/10 text-indigo-800' : 'hover:bg-indigo-600/10 hover:text-indigo-700'
                      }`}
                    >
                      {l.label}
                      {!isActive && (
                        <span className="pointer-events-none absolute left-3 right-3 bottom-1 h-0.5 rounded-full bg-indigo-600/60 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-200 ease-out" />
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
