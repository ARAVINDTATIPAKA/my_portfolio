'use client'

import { motion, Variants, TargetAndTransition } from 'framer-motion'

/* ── easing presets ── */
const EASE_OUT   = [0.22, 1, 0.36, 1] as const
const EASE_SPRING= [0.34, 1.56, 0.64, 1] as const
const EASE_EXPO  = [0.76, 0, 0.24, 1] as const

/* ─────────────────────────────────────────────
   REVEAL — wraps any element with scroll-trigger
   variant prop picks the animation style
───────────────────────────────────────────────*/
interface RevealProps {
  children: React.ReactNode
  delay?: number
  variant?: 'fade-up' | 'fade-left' | 'fade-right' | 'clip-up'
           | 'blur-in' | 'scale-in' | 'rotate-in' | 'slide-over' | 'rise'
  style?: React.CSSProperties
  className?: string
  once?: boolean
  margin?: string
}

const VARIANTS_MAP: Record<string, { hidden: TargetAndTransition; visible: TargetAndTransition }> = {

  /* generic fade + rise — hero eyebrow, section labels */
  'fade-up': {
    hidden:  { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0,
      transition: { duration: 0.7, ease: EASE_OUT } },
  },

  /* left → right — about text col, left-side content */
  'fade-left': {
    hidden:  { opacity: 0, x: -56 },
    visible: { opacity: 1, x: 0,
      transition: { duration: 0.75, ease: EASE_OUT } },
  },

  /* right → left — process col, right-side content */
  'fade-right': {
    hidden:  { opacity: 0, x: 56 },
    visible: { opacity: 1, x: 0,
      transition: { duration: 0.75, ease: EASE_OUT } },
  },

  /* mask wipe upward — section headings */
  'clip-up': {
    hidden:  { opacity: 1, clipPath: 'inset(100% 0 0 0)' },
    visible: { opacity: 1, clipPath: 'inset(0% 0 0 0)',
      transition: { duration: 0.65, ease: EASE_EXPO } },
  },

  /* blur + rise — hero headline, body text */
  'blur-in': {
    hidden:  { opacity: 0, filter: 'blur(12px)', y: 20 },
    visible: { opacity: 1, filter: 'blur(0px)', y: 0,
      transition: { duration: 0.8, ease: EASE_OUT } },
  },

  /* pop scale — skill tags, stat numbers, cards */
  'scale-in': {
    hidden:  { opacity: 0, scale: 0.82 },
    visible: { opacity: 1, scale: 1,
      transition: { duration: 0.55, ease: EASE_SPRING } },
  },

  /* tilt in — buttons, CTAs */
  'rotate-in': {
    hidden:  { opacity: 0, rotate: -8, y: 24 },
    visible: { opacity: 1, rotate: 0, y: 0,
      transition: { duration: 0.65, ease: EASE_SPRING } },
  },

  /* slide over from slight right with fade — timeline cards */
  'slide-over': {
    hidden:  { opacity: 0, x: 32, y: 12 },
    visible: { opacity: 1, x: 0, y: 0,
      transition: { duration: 0.6, ease: EASE_OUT } },
  },

  /* pure vertical rise, no opacity — for numbers/stats */
  'rise': {
    hidden:  { opacity: 0, y: 60, scale: 0.9 },
    visible: { opacity: 1, y: 0, scale: 1,
      transition: { duration: 0.6, ease: EASE_SPRING } },
  },
}

export function Reveal({
  children,
  delay = 0,
  variant = 'fade-up',
  style,
  className,
  once = true,
  margin = '-60px 0px',
}: RevealProps) {
  const v = VARIANTS_MAP[variant] ?? VARIANTS_MAP['fade-up']

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin }}
      variants={{
        hidden: v.hidden,
        visible: {
          ...v.visible,
          transition: {
            ...v.visible.transition,
            delay,
          },
        },
      }}
      style={style}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* ─────────────────────────────────────────────
   STAGGER CONTAINER + per-item variants
   Different variant sets for different sections
───────────────────────────────────────────────*/

/* Work cards — staggered with alternating directions */
export const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
}

export const itemVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_OUT },
  },
}

/* Timeline nodes — slide in from left staggered */
export const timelineContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06, delayChildren: 0 },
  },
}

export const timelineItemVariants: Variants = {
  hidden: { opacity: 0, x: -24, y: 12 },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: { duration: 0.55, ease: EASE_OUT },
  },
}

/* Stats — pop up with spring stagger */
export const statsContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: 0.1 },
  },
}

export const statsItemVariants: Variants = {
  hidden: { opacity: 0, y: 48, scale: 0.88 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: EASE_SPRING },
  },
}

/* Process steps — wipe in from left */
export const processContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
}

export const processItemVariants: Variants = {
  hidden: { opacity: 0, x: -32 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: EASE_OUT },
  },
}

/* Testimonials — scale + blur */
export const testimonialsContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
}

export const testimonialsItemVariants: Variants = {
  hidden: { opacity: 0, scale: 0.92, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.65, ease: EASE_OUT },
  },
}

/* Skill tags — pop with spring, large stagger */
export const skillsContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.04, delayChildren: 0.3 },
  },
}

export const skillsItemVariants: Variants = {
  hidden: { opacity: 0, scale: 0.7, y: 12 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.45, ease: EASE_SPRING },
  },
}
