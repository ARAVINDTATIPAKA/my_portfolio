'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import type { Theme } from '@/types'

interface ThemeContextType {
  theme: Theme
  setTheme: (t: Theme) => void
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'funky',
  setTheme: () => {},
})

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('funky')

  useEffect(() => {
    const saved = localStorage.getItem('portfolio-theme') as Theme
    if (saved === 'serious' || saved === 'funky') setThemeState(saved)
  }, [])

  const setTheme = (t: Theme) => {
    setThemeState(t)
    localStorage.setItem('portfolio-theme', t)
    document.documentElement.setAttribute('data-theme', t === 'serious' ? 'serious' : '')
  }

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme === 'serious' ? 'serious' : '')
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
