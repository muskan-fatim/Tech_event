'use client'
import { useTheme } from '../hooks/useThemes'

export default function ThemeToggle() {
  const { theme, setTheme, mounted } = useTheme()

  if (!mounted) return null // avoid hydration mismatch

  return (
    <button
  onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
  className="px-4 py-2 rounded-xl font-medium shadow-md transition-colors duration-300
             bg-gradient-to-r from-purple-500 to-indigo-600 text-white 
             hover:from-purple-600 hover:to-indigo-700
             dark:from-purple-700 dark:to-indigo-800 dark:hover:from-purple-800 dark:hover:to-indigo-900"
>
  {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
</button>

  )
}
