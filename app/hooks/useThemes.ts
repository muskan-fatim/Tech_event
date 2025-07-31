'use client'
import { useEffect, useState } from 'react'

export function useTheme() {
  const [theme, setThemeState] = useState<'light' | 'dark'>('light')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    const initial = savedTheme || systemTheme

    document.documentElement.classList.remove('light', 'dark')
    document.documentElement.classList.add(initial)
    setThemeState(initial)
  }, [])

  const setTheme = (newTheme: 'light' | 'dark') => {
    localStorage.setItem('theme', newTheme)
    document.documentElement.classList.remove('light', 'dark')
    document.documentElement.classList.add(newTheme)
    setThemeState(newTheme)
  }

  return { theme, setTheme, mounted }
}
