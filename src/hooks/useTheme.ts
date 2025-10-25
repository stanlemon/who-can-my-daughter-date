import { useEffect, useState } from 'react'

type Theme = 'light' | 'dark'
type ThemeMode = 'light' | 'dark' | 'system'

interface UseThemeReturn {
  theme: Theme
  themeMode: ThemeMode
  setThemeMode: (mode: ThemeMode) => void
  toggleTheme: () => void
}

const getSystemTheme = (): Theme => {
  if (typeof window === 'undefined') return 'light'
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

const getStoredThemeMode = (): ThemeMode => {
  if (typeof window === 'undefined') return 'system'
  const stored = localStorage.getItem('theme-mode')
  if (stored === 'light' || stored === 'dark' || stored === 'system') {
    return stored
  }
  return 'system'
}

export const useTheme = (): UseThemeReturn => {
  const [themeMode, setThemeModeState] = useState<ThemeMode>(getStoredThemeMode)
  const [systemTheme, setSystemTheme] = useState<Theme>(getSystemTheme)

  const theme: Theme = themeMode === 'system' ? systemTheme : themeMode

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = (e: MediaQueryListEvent) => {
      setSystemTheme(e.matches ? 'dark' : 'light')
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
  }, [theme])

  const setThemeMode = (mode: ThemeMode): void => {
    setThemeModeState(mode)
    localStorage.setItem('theme-mode', mode)
  }

  const toggleTheme = (): void => {
    if (themeMode === 'system') {
      setThemeMode(systemTheme === 'dark' ? 'light' : 'dark')
    } else {
      setThemeMode(theme === 'dark' ? 'light' : 'dark')
    }
  }

  return {
    theme,
    themeMode,
    setThemeMode,
    toggleTheme,
  }
}
