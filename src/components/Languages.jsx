import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Code2, Palette, FileCode, Database, Cpu, Zap } from 'lucide-react'

// Language configuration with colors and icons
const languageConfig = {
  HTML: { color: '#e34c26', icon: FileCode },
  CSS: { color: '#563d7c', icon: Palette },
  JavaScript: { color: '#f1e05a', icon: Code2 },
  PHP: { color: '#4F5D95', icon: Code2 },
  Python: { color: '#3572A5', icon: Cpu },
  C: { color: '#555555', icon: Cpu },
  Java: { color: '#b07219', icon: Code2 },
  TypeScript: { color: '#2b7489', icon: Code2 },
  'C++': { color: '#f34b7d', icon: Cpu },
  'C#': { color: '#178600', icon: Cpu },
  Ruby: { color: '#701516', icon: Zap },
  Go: { color: '#00ADD8', icon: Zap },
  Rust: { color: '#dea584', icon: Database },
  Swift: { color: '#ffac45', icon: Zap },
  Kotlin: { color: '#A97BFF', icon: Code2 },
}

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: 'spring', stiffness: 100, damping: 15 },
  },
}

const barVariants = {
  hidden: { width: 0 },
  visible: (percentage) => ({
    width: `${percentage}%`,
    transition: { duration: 1.2, ease: 'easeOut', delay: 0.3 },
  }),
}

export default function Languages() {
  const [languages, setLanguages] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const username = 'J-Dattani'
        
        // Fetch all repositories
        const reposResponse = await fetch(
          `https://api.github.com/users/${username}/repos?per_page=100`
        )
        
        if (!reposResponse.ok) {
          throw new Error('Failed to fetch repositories')
        }
        
        const repos = await reposResponse.json()
        
        // Aggregate language bytes across all repos
        const languageTotals = {}
        
        for (const repo of repos) {
          if (!repo.fork) { // Skip forked repos
            const langResponse = await fetch(repo.languages_url)
            if (langResponse.ok) {
              const langData = await langResponse.json()
              
              Object.entries(langData).forEach(([lang, bytes]) => {
                languageTotals[lang] = (languageTotals[lang] || 0) + bytes
              })
            }
          }
        }
        
        // Calculate percentages
        const totalBytes = Object.values(languageTotals).reduce((a, b) => a + b, 0)
        
        const languageData = Object.entries(languageTotals)
          .map(([name, bytes]) => ({
            name,
            percentage: ((bytes / totalBytes) * 100).toFixed(2),
            bytes,
            color: languageConfig[name]?.color || '#8b5cf6',
            icon: languageConfig[name]?.icon || Code2,
          }))
          .sort((a, b) => b.bytes - a.bytes)
          .slice(0, 10) // Top 10 languages
        
        setLanguages(languageData)
        setLoading(false)
      } catch (err) {
        console.error('Error fetching language data:', err)
        setError(err.message)
        setLoading(false)
      }
    }

    fetchLanguages()
  }, [])

  if (loading) {
    return (
      <div className="mt-8">
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          <p className="mt-4 text-gray-600">Loading language statistics...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="mt-8">
        <div className="text-center py-12 text-red-600">
          <p>Error loading language data. Please try again later.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="mt-12">
      <h3 className="text-2xl font-bold text-center mb-8 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
        Most Used Languages
      </h3>
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        className="space-y-4 max-w-3xl mx-auto"
      >
        {languages.map((lang) => {
          const Icon = lang.icon
          return (
            <motion.div
              key={lang.name}
              variants={itemVariants}
              className="glass rounded-2xl p-5 gradient-glow hover:scale-[1.02] transition-transform cursor-pointer"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div 
                    className="inline-flex items-center justify-center w-10 h-10 rounded-xl"
                    style={{ 
                      backgroundColor: `${lang.color}20`,
                      color: lang.color 
                    }}
                  >
                    <Icon size={18} />
                  </div>
                  <span className="font-semibold text-lg">{lang.name}</span>
                </div>
                <span 
                  className="font-bold text-xl"
                  style={{ color: lang.color }}
                >
                  {lang.percentage}%
                </span>
              </div>
              <div className="relative h-3 bg-gray-200/50 dark:bg-gray-700/50 rounded-full overflow-hidden">
                <motion.div
                  custom={lang.percentage}
                  variants={barVariants}
                  className="absolute top-0 left-0 h-full rounded-full"
                  style={{ backgroundColor: lang.color }}
                />
              </div>
            </motion.div>
          )
        })}
      </motion.div>
      <p className="text-center text-sm text-gray-500 mt-6">
        Real-time statistics from all GitHub repositories (excluding forks)
      </p>
    </div>
  )
}
