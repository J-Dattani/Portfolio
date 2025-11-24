import { motion } from 'framer-motion'
import Section from './Section.jsx'
import { projects as data } from '../data/projects.js'
import { ExternalLink, Github } from 'lucide-react'

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

function ProjectCard({ p }) {
  const liveUrl = typeof p.live === 'string' ? p.live.trim() : ''
  const hasLive = liveUrl.length > 0
  const onImgError = (e) => {
    e.currentTarget.style.display = 'none'
    const fallback = e.currentTarget.parentElement.querySelector('.img-fallback')
    if (fallback) fallback.style.display = 'block'
  }

  return (
    <motion.article
      variants={item}
      whileHover={{ y: -8 }}
      className="group relative overflow-hidden glass rounded-2xl gradient-glow cursor-pointer"
    >
      <div className="relative">
        {p.cover && (
          <img
            src={p.cover}
            alt={p.title + ' cover'}
            loading="lazy"
            onError={onImgError}
            className="block w-full aspect-[16/9] object-cover"
          />
        )}
        <div className="img-fallback hidden w-full aspect-[16/9] bg-gradient-to-br from-indigo-100 to-amber-100" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white/80 via-white/30 to-white/0 opacity-90" />
      </div>

      <div className="relative z-10 p-5">
        <h3 className="font-semibold text-lg tracking-tight">{p.title}</h3>
        <p className="mt-2 text-slate-600 dark:text-slate-300 text-sm leading-relaxed">{p.summary}</p>

        <div className="mt-3 flex flex-wrap gap-2">
          {p.stack?.map((s) => (
            <span key={s} className="px-2 py-0.5 rounded-full text-xs bg-black/5">
              {s}
            </span>
          ))}
        </div>

        <div className="mt-5 flex items-center gap-2">
          <a
            href={p.repo}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-slate-300 dark:border-slate-600 hover:border-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-400 dark:text-slate-300 transition-colors"
          >
            <Github size={16} /> Code
          </a>
          <a
            href={hasLive ? liveUrl : undefined}
            target={hasLive ? '_blank' : undefined}
            rel={hasLive ? 'noreferrer' : undefined}
            aria-disabled={!hasLive}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full ${
              hasLive
                ? 'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-slate-300 dark:border-slate-600 hover:border-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-400 dark:text-slate-300 transition-colors'
                : 'bg-black/5 dark:bg-white/5 text-slate-500 dark:text-slate-400 cursor-not-allowed'
            } transition-colors`}
            onClick={(e) => {
              if (!hasLive) e.preventDefault()
            }}
          >
            <ExternalLink size={16} /> Live
          </a>
        </div>
      </div>
    </motion.article>
  )
}

export default function Projects() {
  return (
    <Section id="projects" title="Projects">
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {data.map((p) => (
          <ProjectCard key={p.id} p={p} />
        ))}
      </motion.div>
    </Section>
  )
}
