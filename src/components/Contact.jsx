import Section from './Section.jsx'
import { Mail, Linkedin, Github, ArrowUpRight, BookOpen } from 'lucide-react'

function LinkCard({ label, subtitle, href, Icon }) {
  const external = href?.startsWith('http')
  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noreferrer' : undefined}
      aria-label={`${label} — ${subtitle ?? href}`}
      className="group relative block overflow-hidden rounded-2xl glass ring-1 ring-slate-200/60 hover:ring-indigo-300/60 transition-all"
    >
      {/* shimmer sweep */}
  <span className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-indigo-500/10 to-transparent opacity-0 group-hover:opacity-100 origin-left scale-x-0 group-hover:scale-x-100 transition-[transform,opacity] duration-500" />
      <div className="relative flex items-center justify-between gap-3 p-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-indigo-50 text-indigo-700 shadow-sm transition-transform group-hover:scale-105">
            <Icon size={18} />
          </div>
          <div>
            <div className="font-medium text-slate-800 dark:text-slate-200">{label}</div>
            {subtitle && <div className="text-xs text-slate-500 dark:text-slate-400">{subtitle}</div>}
          </div>
        </div>
        <div className="text-slate-400 dark:text-slate-500 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
          <ArrowUpRight size={18} />
        </div>
      </div>
    </a>
  )
}

export default function Contact() {
  const links = [
    { label: 'Email', subtitle: 'work.jdattani@gmail.com', href: 'mailto:work.jdattani@gmail.com', Icon: Mail },
    { label: 'LinkedIn', subtitle: 'linkedin.com/in/jaymin-dattani-ba6695294', href: 'https://linkedin.com/in/jaymin-dattani-ba6695294', Icon: Linkedin },
    { label: 'GitHub', subtitle: 'github.com/J-Dattani', href: 'https://github.com/J-Dattani', Icon: Github },
    { label: 'Medium', subtitle: 'medium.com/@work.jdattani', href: 'https://medium.com/@work.jdattani', Icon: BookOpen },
  ]

  return (
    <Section id="contact" title="Contact">
      <div className="grid sm:grid-cols-2 gap-4">
        {links.map((l) => (
          <LinkCard key={l.label} {...l} />
        ))}
      </div>
    </Section>
  )
}
