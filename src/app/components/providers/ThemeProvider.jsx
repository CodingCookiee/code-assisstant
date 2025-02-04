'use client'

import { createContext, useContext, useEffect, useState } from 'react'

const ThemeContext = createContext({})

export function ThemeProvider({ children }) {
  const [mounted, setMounted] = useState(false)
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    setMounted(true)
    const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)')
    
    const updateTheme = (e) => {
      const isDark = e.matches
      setTheme(isDark ? 'dark' : 'light')
      document.documentElement.classList.toggle('dark', isDark)
    }

    // Initial check
    updateTheme(darkModeQuery)

    // Listen for changes
    darkModeQuery.addEventListener('change', updateTheme)
    return () => darkModeQuery.removeEventListener('change', updateTheme)
  }, [])

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return null
  }

  return (
    <ThemeContext.Provider value={{ theme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
