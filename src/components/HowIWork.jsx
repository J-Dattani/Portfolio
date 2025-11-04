import { motion } from 'framer-motion'
import Section from './Section.jsx'
import { Search, PenTool, Code2, Rocket } from 'lucide-react'

const steps = [
  {
    title: 'Discover',
    desc: 'Clarify goals, users, and constraints to align on the problem and success metrics.',
    Icon: Search,
  },
  {
    title: 'Design',
    desc: 'Sketch flows, define structure, and craft accessible UI with modern patterns.',
    Icon: PenTool,
  },
  {
    title: 'Develop',
    desc: 'Build iteratively with clean components, performance, and tests in mind.',
    Icon: Code2,
  },
  {
    title: 'Deliver',
    desc: 'Polish micro‑interactions, QA, and ship a smooth, production‑ready experience.',
    Icon: Rocket,
  },
]

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

export default function HowIWork() {
  return (
    <Section id="how" title="How I Work">
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {steps.map(({ title, desc, Icon }) => (
          <motion.div
            key={title}
            variants={item}
            whileHover={{ y: -6 }}
            className="relative glass rounded-2xl p-6 gradient-glow overflow-hidden"
          >
            <div className="relative z-10">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-indigo-600/10 text-indigo-700">
                <Icon size={20} />
              </div>
              <h3 className="mt-4 font-semibold text-lg">{title}</h3>
              <p className="mt-2 text-slate-600 text-sm leading-relaxed">{desc}</p>
            </div>
            {/* Accent light */}
            <div className="pointer-events-none absolute -bottom-12 -right-12 w-40 h-40 rounded-full blur-3xl opacity-40" style={{ background: 'radial-gradient(closest-side, rgba(99,102,241,0.18), transparent)' }} />
          </motion.div>
        ))}
      </motion.div>
    </Section>
  )
}
