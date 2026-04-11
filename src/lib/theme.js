import { useEffect, useState } from 'react'

const STORAGE_KEY = 'fiveseasons:theme'

export function getStoredTheme() {
  if (typeof window === 'undefined') return null
  try {
    const v = window.localStorage.getItem(STORAGE_KEY)
    return v === 'light' || v === 'dark' ? v : null
  } catch {
    return null
  }
}

export function setStoredTheme(theme) {
  if (typeof window === 'undefined') return
  try {
    if (theme === 'light' || theme === 'dark') {
      window.localStorage.setItem(STORAGE_KEY, theme)
    } else {
      window.localStorage.removeItem(STORAGE_KEY)
    }
  } catch {
    // ignore quota / disabled
  }
}

export function applyTheme(theme) {
  if (typeof document === 'undefined') return
  const root = document.documentElement
  if (theme === 'light' || theme === 'dark') {
    root.setAttribute('data-theme', theme)
  } else {
    root.removeAttribute('data-theme')
  }
}

function getSystemMode() {
  if (typeof window === 'undefined') return 'light'
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
}

// Effective mode right now — what the user actually sees.
export function getEffectiveMode() {
  return getStoredTheme() ?? getSystemMode()
}

// React hook: returns the current effective mode ('light' | 'dark') and
// updates whenever the stored preference or the OS setting changes.
export function useThemeMode() {
  const [mode, setMode] = useState(() => getEffectiveMode())

  useEffect(() => {
    const recompute = () => setMode(getEffectiveMode())

    // OS setting changes
    const mq = window.matchMedia?.('(prefers-color-scheme: dark)')
    mq?.addEventListener?.('change', recompute)

    // data-theme attribute changes on <html>
    const observer = new MutationObserver(recompute)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    })

    return () => {
      mq?.removeEventListener?.('change', recompute)
      observer.disconnect()
    }
  }, [])

  return mode
}
