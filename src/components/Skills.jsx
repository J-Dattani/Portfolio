import { motion } from 'framer-motion'
import Section from './Section.jsx'
import { skills as data } from '../data/skills.js'
import {
  Code2,
  Database,
  Globe,
  GitBranch,
  Server,
  Plug,
  Braces,
  Palette,
  Monitor,
  Lightbulb,
  FileCode,
  Star
} from 'lucide-react'

function getIcon(label) {
  const l = label.toLowerCase()
  if (l.includes('html')) return FileCode
  if (l.includes('css')) return Palette
  if (l.includes('javascript')) return Code2
  if (l === 'php') return Code2
  if (l.includes('mysql')) return Database
  if (l.includes('json')) return Braces
  if (l.includes('responsive')) return Monitor
  if (l.includes('hosting')) return Server
  if (l.includes('api')) return Plug
  if (l === 'git') return GitBranch
  if (l.includes('problem')) return Lightbulb
  if (l.includes('web')) return Globe
  return Star
}

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.05 },
  },
}

const item = {
  hidden: { opacity: 0, y: 18, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 320, damping: 22, mass: 0.6 },
  },
}

export default function Skills() {
  return (
    <Section id="skills" title="Skills">
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        className="grid xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4"
      >
        {data.map((label) => {
          const Icon = getIcon(label)
          return (
            <motion.div
              key={label}
              variants={item}
              whileHover={{ y: -6 }}
              className="glass rounded-2xl p-4 flex items-center gap-3 gradient-glow"
            >
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-indigo-600/10 text-indigo-700">
                <Icon size={18} />
              </div>
              <span className="font-medium text-sm">{label}</span>
            </motion.div>
          )
        })}
      </motion.div>
    </Section>
  )
}
