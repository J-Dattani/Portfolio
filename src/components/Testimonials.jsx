import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Section from './Section.jsx'
import { testimonials as data } from '../data/testimonials.js'

// Minimal, elegant testimonials carousel. If data is empty, renders null.
export default function Testimonials() {
  const [idx, setIdx] = useState(0)
  if (!data || data.length === 0) return null
  const next = () => setIdx((i) => (i + 1) % data.length)
  const prev = () => setIdx((i) => (i - 1 + data.length) % data.length)

  const t = data[idx]

  return (
    <Section id="testimonials" title="Testimonials">
      <div className="relative max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-3">
          <button onClick={prev} className="px-3 py-1.5 rounded-full border border-slate-300 hover:border-indigo-400 hover:text-indigo-700 transition-colors text-sm">Prev</button>
          <div className="text-xs text-slate-500">{idx + 1} / {data.length}</div>
          <button onClick={next} className="px-3 py-1.5 rounded-full border border-slate-300 hover:border-indigo-400 hover:text-indigo-700 transition-colors text-sm">Next</button>
        </div>

        <div className="relative h-[200px] md:h-[180px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={t.author + idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="glass rounded-2xl p-6 gradient-glow absolute inset-0 flex flex-col justify-center"
            >
              <p className="text-slate-700 leading-relaxed">“{t.quote}”</p>
              <div className="mt-4 text-sm text-slate-600">— {t.author}{t.role ? `, ${t.role}` : ''}</div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </Section>
  )
}
