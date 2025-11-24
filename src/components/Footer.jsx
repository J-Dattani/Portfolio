export default function Footer() {
  const year = new Date().getFullYear()
  const links = [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#how', label: 'How I Work' },
    { href: '#achievements', label: 'Achievements' },
    { href: '#skills', label: 'Skills' },
    { href: '#experience', label: 'Experience' },
    { href: '#contact', label: 'Contact' },
  ]
  return (
    <footer className="mt-16 border-t border-slate-200/70">
      <div className="container mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-slate-600 dark:text-slate-400">© {year} Jaymin Dattani. All rights reserved.</p>
        <nav className="flex flex-wrap gap-4 text-sm">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              {l.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  )
}
