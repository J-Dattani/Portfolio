import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import Section from './Section.jsx'
import { ExternalLink, Calendar, Clock } from 'lucide-react'

const container = {
  hidden: { opacity: 0 }, 
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
}

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
}

export default function Articles() {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const MEDIUM_USERNAME = '@work.jdattani'
        const RSS_URL = `https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/${MEDIUM_USERNAME}`
        
        const response = await fetch(RSS_URL)
        const data = await response.json()
        
        if (data.status === 'ok' && data.items) {
          // Get latest 3 articles
          const latestArticles = data.items.slice(0, 3).map(article => {
            // Extract thumbnail from content
            const imgRegex = /<img[^>]+src="([^">]+)"/
            const imgMatch = article.content?.match(imgRegex)
            const thumbnail = imgMatch ? imgMatch[1] : null
            
            // Calculate read time (rough estimate: 200 words per minute)
            const wordCount = article.content?.replace(/<[^>]*>/g, '').split(/\s+/).length || 0
            const readTime = Math.ceil(wordCount / 200)
            
            return {
              title: article.title,
              link: article.link,
              pubDate: new Date(article.pubDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
              }),
              thumbnail: thumbnail,
              categories: article.categories || [],
              author: article.author,
              description: article.description?.replace(/<[^>]*>/g, '').substring(0, 150) + '...',
              readTime: readTime
            }
          })
          
          setArticles(latestArticles)
        }
        setLoading(false)
      } catch (err) {
        console.error('Error fetching Medium articles:', err)
        setLoading(false)
      }
    }

    fetchArticles()
  }, [])

  return (
    <Section id="articles" title="Latest Articles">
      <p className="text-center text-slate-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto">
        Sharing my thoughts, experiences, and learnings through writing on Medium.
      </p>

      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading articles...</p>
        </div>
      ) : articles.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-400">No articles found. Check back soon!</p>
        </div>
      ) : (
        <>
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
          >
            {articles.map((article, idx) => (
              <motion.article
                key={idx}
                variants={item}
                whileHover={{ y: -8, scale: 1.02 }}
                className="glass rounded-2xl overflow-hidden gradient-glow hover:shadow-2xl transition-all duration-300 cursor-pointer group"
                onClick={() => window.open(article.link, '_blank', 'noopener,noreferrer')}
              >
                {/* Thumbnail */}
                {article.thumbnail && (
                  <div className="relative h-48 overflow-hidden bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30">
                    <img
                      src={article.thumbnail}
                      alt={`Thumbnail for ${article.title}`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                )}

                {/* Content */}
                <div className="p-6">
                  {/* Meta info */}
                  <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar size={14} />
                      {article.pubDate}
                    </span>
                    {article.readTime > 0 && (
                      <span className="flex items-center gap-1">
                        <Clock size={14} />
                        {article.readTime} min read
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="font-bold text-lg mb-2 text-slate-800 dark:text-slate-100 line-clamp-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {article.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-3 mb-4">
                    {article.description}
                  </p>

                  {/* Categories */}
                  {article.categories.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {article.categories.slice(0, 3).map((cat, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 text-xs rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300"
                        >
                          {cat}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Read more link */}
                  <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-medium text-sm group-hover:gap-3 transition-all">
                    Read on Medium
                    <ExternalLink size={16} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>

          {/* View More Button */}
          <div className="text-center mt-4">
            <motion.a
              href="https://medium.com/@work.jdattani"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:border-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-400 transition-colors"
            >
              View All Articles
              <ExternalLink size={16} />
            </motion.a>
          </div>
        </>
      )}
    </Section>
  )
}
