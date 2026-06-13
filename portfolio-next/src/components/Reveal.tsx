'use client'

import { motion } from 'framer-motion'

interface RevealProps {
  children: React.ReactNode
  delay?: number
  y?: number
  style?: React.CSSProperties
  className?: string
}

/** Scroll-triggered fade-up reveal. Animates once when it enters the viewport. */
export function Reveal({ children, delay = 0, y = 28, style, className }: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px 0px' }}
      transition={{ duration: 0.65, delay, ease: [0.25, 0.46, 0.45, 0.94] as const }}
      style={style}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/** Variants for staggered card/item grids. Apply containerVariants to the parent, itemVariants to each child. */
export const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.09, delayChildren: 0.05 },
  },
}

export const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
}
