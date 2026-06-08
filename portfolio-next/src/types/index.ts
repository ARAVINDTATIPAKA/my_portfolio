export type Theme = 'funky' | 'serious'

export interface Project {
  id: string
  title: string
  desc: string
  tags: string[]
  year: string
  caseStudyKey: string
  mvp?: boolean
  mockBg: string
  bgText: string
}

export interface TimelineNode {
  date: string
  type: 'role' | 'work' | 'milestone' | 'now'
  company?: string
  title: string
  period?: string
  desc: string
}

export interface Testimonial {
  quote: string
  name: string
  role: string
  initials: string
}

export interface AIStep {
  num: string
  title: string
  desc: string
  tools: string[]
  position: 'above' | 'below'
}
