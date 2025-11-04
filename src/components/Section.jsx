import { motion } from 'framer-motion'

export default function Section({ id, title, children, className = '' }) {
  return (
    <section id={id} className={`py-24 md:py-32 ${className}`}>
      <div className="container">
        {title && (
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="text-2xl md:text-4xl font-extrabold tracking-tight"
          >
            {title}
          </motion.h2>
        )}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.05 }}
          className={title ? 'mt-6' : ''}
        >
          {children}
        </motion.div>
      </div>
    </section>
  )
}
