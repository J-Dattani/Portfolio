import { motion } from 'framer-motion'
import Section from './Section.jsx'
import { experience as data } from '../data/experience.js'
import { Briefcase, Calendar, MapPin } from 'lucide-react'

export default function Experience() {
  return (
    <Section id="experience" title="Experience">
      <div className="relative">
        {/* Center timeline line */}
        <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-indigo-200 via-slate-200 to-amber-200" />

        <div className="space-y-12">
          {data.map((item, idx) => {
            const isLeft = idx % 2 === 0
            const xFrom = isLeft ? -40 : 40
            return (
              <div key={item.company + idx} className="grid md:grid-cols-2 md:gap-10 items-stretch">
                {/* Left spacer / card */}
                <div className={`${isLeft ? '' : 'md:order-2'}`}>
                  <motion.article
                    initial={{ opacity: 0, x: xFrom }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    className="relative glass rounded-2xl p-6 gradient-glow h-full"
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 inline-flex items-center justify-center w-10 h-10 rounded-xl bg-indigo-600/10 text-indigo-700">
                        <Briefcase size={18} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg leading-tight">
                          {item.role} <span className="text-slate-500">— {item.company}</span>
                        </h3>
                        <div className="mt-1 flex flex-wrap gap-3 text-sm text-slate-600">
                          <span className="inline-flex items-center gap-1"><Calendar size={14} /> {item.period}</span>
                          <span className="inline-flex items-center gap-1"><MapPin size={14} /> {item.location}</span>
                        </div>
                      </div>
                    </div>

                    <ul className="mt-4 space-y-2 text-sm text-slate-700 list-disc pl-6">
                      {item.bullets?.map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                    </ul>

                    {/* Center dot for timeline on md+ */}
                    <div className={`hidden md:block absolute top-6 ${isLeft ? 'right-[-34px]' : 'left-[-34px]'} w-4 h-4 rounded-full bg-white border-2 border-indigo-300 shadow`} />
                  </motion.article>
                </div>

                {/* Spacer to keep grid alignment on desktop */}
                <div className="hidden md:block" />
              </div>
            )
          })}
        </div>
      </div>
    </Section>
  )
}
