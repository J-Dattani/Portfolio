import { useState } from 'react'
import { motion } from 'framer-motion'
import Section from './Section.jsx'
import { certificates as data } from '../data/certificates.js'
import { ExternalLink, Eye } from 'lucide-react'

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
}

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

function CertificateCard({ c, onPreview }) {
  const onImgError = (e) => {
    e.currentTarget.style.display = 'none'
    const fallback = e.currentTarget.parentElement.querySelector('.img-fallback')
    if (fallback) fallback.style.display = 'block'
  }
  const verifyUrl = typeof c.verifyUrl === 'string' ? c.verifyUrl.trim() : ''
  const hasVerify = verifyUrl.length > 0

  return (
    <motion.article
      variants={item}
      whileHover={{ y: -8 }}
      className="group relative overflow-hidden glass rounded-2xl gradient-glow cursor-pointer"
    >
      <div className="relative">
        {c.image && (
          <img
            src={c.image}
            alt={`${c.title} certificate preview`}
            loading="lazy"
            decoding="async"
            onError={onImgError}
            className="block w-full aspect-[16/10] object-contain bg-slate-50 p-2"
          />
        )}
        <div className="img-fallback hidden w-full aspect-[16/10] bg-gradient-to-br from-indigo-100 to-amber-100" />
      </div>

      <div className="relative z-10 p-5">
        <h3 className="font-semibold text-lg tracking-tight">{c.title}</h3>
        <p className="mt-1 text-slate-600 dark:text-slate-400 text-sm">{c.issuer} • {c.year}</p>
        {c.description && String(c.description).trim().length > 0 && (
          <p className="mt-2 text-slate-600 dark:text-slate-300 text-sm leading-snug">
            {c.description}
          </p>
        )}

        <div className="mt-4 flex items-center gap-2">
          <button
            onClick={() => onPreview(c)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-slate-300 hover:border-indigo-400 hover:text-indigo-700 transition-colors"
          >
            <Eye size={16} /> Preview
          </button>
          <a
            href={hasVerify ? verifyUrl : undefined}
            target={hasVerify ? "_blank" : undefined}
            rel={hasVerify ? "noreferrer" : undefined}
            aria-disabled={!hasVerify}
            className={
              hasVerify
                ? "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-slate-300 hover:border-indigo-400 hover:text-indigo-700 transition-colors"
                : "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/5 text-slate-500 cursor-not-allowed"
            }
            onClick={(e) => { if (!hasVerify) e.preventDefault() }}
          >
            <ExternalLink size={16} /> Verify
          </a>
        </div>
      </div>
    </motion.article>
  )
}

export default function Certificates() {
  const [selected, setSelected] = useState(null)

  return (
    <Section id="certificates" title="Certificates & Licenses">
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {data.map((c) => (
          <CertificateCard key={c.id} c={c} onPreview={(c)=>setSelected(c)} />
        ))}
      </motion.div>

      {/* Lightbox */}
      {selected && (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4"
          role="button"
          tabIndex={0}
          aria-label="Close certificate preview"
          onClick={()=>setSelected(null)}
          onKeyDown={(e)=>{ if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') setSelected(null) }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="relative max-w-5xl w-full"
            onClick={(e)=>e.stopPropagation()}
          >
            <div className="glass rounded-2xl overflow-hidden bg-white dark:bg-slate-800 max-h-[90vh] flex flex-col">
              {/* Preview area with a subtle neutral background so white certificates remain visible */}
              <div className="w-full flex-1 grid place-items-center bg-slate-50 dark:bg-slate-900 p-2 overflow-auto">
                {selected.image && (
                  <img
                    src={selected.image}
                    alt={`${selected.title} certificate large preview`}
                    decoding="async"
                    className="max-w-full max-h-[80vh] object-contain"
                  />
                )}
              </div>
              {/* Footer bar with title and Close action, pinned at the bottom */}
              <div className="p-4 flex items-center justify-between bg-slate-100/95 dark:bg-slate-800/95 border-t border-slate-200 dark:border-slate-700 sticky bottom-0">
                <div>
                  <h4 className="font-semibold truncate max-w-[60vw] dark:text-slate-100" title={selected.title}>{selected.title}</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{selected.issuer} • {selected.year}</p>
                </div>
                <button
                  onClick={()=>setSelected(null)}
                  className="px-4 py-2 rounded-full border border-slate-300 dark:border-slate-600 hover:border-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-400 bg-white dark:bg-slate-700 dark:text-slate-100"
                >Close</button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </Section>
  )
}
