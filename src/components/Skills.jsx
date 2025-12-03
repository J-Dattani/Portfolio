import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
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

// Map icon names to icon components
function getIconComponent(iconName) {
  const iconMap = {
    FileCode,
    Palette,
    Code2,
    Database,
    Braces,
    Monitor,
    Server,
    Plug,
    GitBranch,
    Lightbulb,
    Globe,
    Star
  }
  return iconMap[iconName] || Star
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

const barVariants = {
  hidden: { width: 0 },
  visible: (percentage) => ({
    width: `${percentage}%`,
    transition: { duration: 1, ease: 'easeOut', delay: 0.2 },
  }),
}

export default function Skills() {
  const [dynamicSkills, setDynamicSkills] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDynamicSkills = async () => {
      try {
        const username = 'J-Dattani'
        const CACHE_KEY = 'github_skills_cache'
        const CACHE_DURATION = 12 * 60 * 60 * 1000 // 12 hours in milliseconds
        
        // Check if we have cached data
        const cachedData = localStorage.getItem(CACHE_KEY)
        if (cachedData) {
          const { data, timestamp } = JSON.parse(cachedData)
          const now = Date.now()
          
          // If cache is still valid (less than 12 hours old), use it
          if (now - timestamp < CACHE_DURATION) {
            console.log('Using cached skills data')
            setDynamicSkills(data)
            setLoading(false)
            return
          }
        }
        
        console.log('Fetching fresh skills data from GitHub...')
        
        // Fetch all repositories
        const reposResponse = await fetch(
          `https://api.github.com/users/${username}/repos?per_page=100`
        )
        
        if (!reposResponse.ok) {
          throw new Error('Rate limit or API error')
        }
        
        const repos = await reposResponse.json()
        
        // Calculate Web Hosting (repos with GitHub Pages or homepage)
        const hostedRepos = repos.filter(repo => 
          !repo.fork && (repo.has_pages || repo.homepage)
        ).length
        const hostingPercentage = Math.min((hostedRepos / repos.filter(r => !r.fork).length) * 100, 100)
        
        // Fetch user stats for Git contributions
        const userResponse = await fetch(`https://api.github.com/users/${username}`)
        const userData = await userResponse.json()
        
        // Calculate contributions for the whole year
        let totalContributions = 0
        
        // Fetch all commits from all repos in the past year
        const oneYearAgo = new Date()
        oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1)
        
        for (const repo of repos.slice(0, 30)) { // Limit to 30 repos to avoid rate limits
          try {
            const commitsResponse = await fetch(
              `https://api.github.com/repos/${username}/${repo.name}/commits?author=${username}&since=${oneYearAgo.toISOString()}&per_page=100`
            )
            if (commitsResponse.ok) {
              const commits = await commitsResponse.json()
              totalContributions += commits.length
            }
          } catch (e) {
            console.log(`Could not fetch commits for ${repo.name}`)
          }
        }
        
        // Add PR and Issues count
        const eventsResponse = await fetch(`https://api.github.com/users/${username}/events?per_page=100`)
        if (eventsResponse.ok) {
          const events = await eventsResponse.json()
          const prAndIssues = events.filter(e => 
            ['PullRequestEvent', 'IssuesEvent', 'PullRequestReviewEvent'].includes(e.type)
          ).length
          totalContributions += prAndIssues
        }
        
        // Git percentage based on contributions (normalized to 100)
        const gitPercentage = Math.min((totalContributions / 200) * 100, 100)
        
        // Calculate Problem Solving based on logic languages
        const logicLanguages = ['JavaScript', 'Python', 'C', 'Java', 'C++', 'PHP', 'TypeScript', 'Go', 'Rust']
        const languageTotals = {}
        
        for (const repo of repos) {
          if (!repo.fork) {
            const langResponse = await fetch(repo.languages_url)
            if (langResponse.ok) {
              const langData = await langResponse.json()
              Object.entries(langData).forEach(([lang, bytes]) => {
                if (logicLanguages.includes(lang)) {
                  languageTotals[lang] = (languageTotals[lang] || 0) + bytes
                }
              })
            }
          }
        }
        
        const totalLogicBytes = Object.values(languageTotals).reduce((a, b) => a + b, 0)
        const logicLanguageCount = Object.keys(languageTotals).length
        const problemSolvingPercentage = Math.min((logicLanguageCount * 15) + (totalLogicBytes / 1000000), 100)
        
        // Language percentages
        const allLanguageTotals = {}
        for (const repo of repos) {
          if (!repo.fork) {
            const langResponse = await fetch(repo.languages_url)
            if (langResponse.ok) {
              const langData = await langResponse.json()
              Object.entries(langData).forEach(([lang, bytes]) => {
                allLanguageTotals[lang] = (allLanguageTotals[lang] || 0) + bytes
              })
            }
          }
        }
        
        const totalBytes = Object.values(allLanguageTotals).reduce((a, b) => a + b, 0)
        
        const skillsWithProgress = [
          { 
            name: 'HTML5', 
            percentage: ((allLanguageTotals['HTML'] || 0) / totalBytes * 100).toFixed(1),
            iconName: 'FileCode',
            color: '#e34c26'
          },
          { 
            name: 'CSS3', 
            percentage: ((allLanguageTotals['CSS'] || 0) / totalBytes * 100).toFixed(1),
            iconName: 'Palette',
            color: '#563d7c'
          },
          { 
            name: 'JavaScript', 
            percentage: ((allLanguageTotals['JavaScript'] || 0) / totalBytes * 100).toFixed(1),
            iconName: 'Code2',
            color: '#f1e05a'
          },
          { 
            name: 'PHP', 
            percentage: ((allLanguageTotals['PHP'] || 0) / totalBytes * 100).toFixed(1),
            iconName: 'Code2',
            color: '#4F5D95'
          },
          { 
            name: 'MySQL', 
            percentage: 75, // Static for now as it's not detectable via GitHub API
            iconName: 'Database',
            color: '#00758f'
          },
          { 
            name: 'JSON', 
            percentage: 85,
            iconName: 'Braces',
            color: '#292929'
          },
          { 
            name: 'Responsive Design', 
            percentage: 90,
            iconName: 'Monitor',
            color: '#61dafb'
          },
          { 
            name: 'Web Hosting', 
            percentage: hostingPercentage.toFixed(1),
            iconName: 'Server',
            color: '#00c7b7',
            count: hostedRepos
          },
          { 
            name: 'API Integration', 
            percentage: 80,
            iconName: 'Plug',
            color: '#ff6c37'
          },
          { 
            name: 'Git', 
            percentage: Math.min(gitPercentage, 100).toFixed(1),
            iconName: 'GitBranch',
            color: '#f05032',
            count: totalContributions
          },
          { 
            name: 'Problem Solving', 
            percentage: problemSolvingPercentage.toFixed(1),
            iconName: 'Lightbulb',
            color: '#ffd700'
          },
        ]
        
        // Cache the data with timestamp
        localStorage.setItem(CACHE_KEY, JSON.stringify({
          data: skillsWithProgress,
          timestamp: Date.now()
        }))
        
        setDynamicSkills(skillsWithProgress)
        setLoading(false)
      } catch (err) {
        console.error('Error fetching skills data:', err)
        
        // Try to use cached data even if expired
        const cachedData = localStorage.getItem('github_skills_cache')
        if (cachedData) {
          const { data } = JSON.parse(cachedData)
          console.log('Using expired cache due to API error')
          setDynamicSkills(data)
          setLoading(false)
          return
        }
        
        // Fallback to static data if API fails and no cache
        const fallbackSkills = [
          { name: 'HTML5', percentage: '37.1', iconName: 'FileCode', color: '#e34c26' },
          { name: 'CSS3', percentage: '28.1', iconName: 'Palette', color: '#563d7c' },
          { name: 'JavaScript', percentage: '20.6', iconName: 'Code2', color: '#f1e05a' },
          { name: 'PHP', percentage: '12.4', iconName: 'Code2', color: '#4F5D95' },
          { name: 'MySQL', percentage: '75', iconName: 'Database', color: '#00758f' },
          { name: 'JSON', percentage: '85', iconName: 'Braces', color: '#292929' },
          { name: 'Responsive Design', percentage: '90', iconName: 'Monitor', color: '#61dafb' },
          { name: 'Web Hosting', percentage: '70', iconName: 'Server', color: '#00c7b7', count: 5 },
          { name: 'API Integration', percentage: '80', iconName: 'Plug', color: '#ff6c37' },
          { name: 'Git', percentage: '85', iconName: 'GitBranch', color: '#f05032', count: 161 },
          { name: 'Problem Solving', percentage: '88', iconName: 'Lightbulb', color: '#ffd700' },
        ]
        setDynamicSkills(fallbackSkills)
        setLoading(false)
      }
    }

    fetchDynamicSkills()
  }, [])

  return (
    <Section id="skills" title="Skills">
      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading skills data...</p>
        </div>
      ) : (
        <>
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
          >
            {dynamicSkills.map((skill) => {
              const Icon = getIconComponent(skill.iconName)
              return (
                <motion.div
                  key={skill.name}
                  variants={item}
                  whileHover={{ scale: 1.03, y: -4 }}
                  className="glass rounded-2xl p-5 gradient-glow hover:shadow-2xl transition-all duration-300 cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div 
                        className="inline-flex items-center justify-center w-10 h-10 rounded-xl"
                        style={{ 
                          backgroundColor: `${skill.color}20`,
                          color: skill.color 
                        }}
                      >
                        <Icon size={18} />
                      </div>
                      <span className="font-semibold text-base text-slate-800 dark:text-slate-100">{skill.name}</span>
                    </div>
                    <div className="text-right">
                      <span 
                        className="font-bold text-lg"
                        style={{ color: skill.color }}
                      >
                        {skill.percentage}%
                      </span>
                      {skill.count !== undefined && (
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                          {skill.count} {skill.name === 'Git' ? 'contributions' : 'repos'}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="relative h-2.5 bg-gray-200/50 dark:bg-gray-700/50 rounded-full overflow-hidden">
                    <motion.div
                      custom={skill.percentage}
                      variants={barVariants}
                      className="absolute top-0 left-0 h-full rounded-full"
                      style={{ backgroundColor: skill.color }}
                    />
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </>
      )}
    </Section>
  )
}
