import {
  applyTheme,
  setStoredTheme,
  useThemeMode,
} from '../../lib/theme.js'

export default function ThemeToggle() {
  const mode = useThemeMode()

  const toggle = () => {
    const next = mode === 'dark' ? 'light' : 'dark'
    setStoredTheme(next)
    applyTheme(next)
  }

  const label =
    mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className="fixed right-4 top-4 z-40 flex h-9 w-9 items-center justify-center rounded-full md:right-6 md:top-6"
      style={{
        background: 'color-mix(in srgb, var(--surface) 85%, transparent)',
        border: '0.5px solid var(--border)',
        color: 'var(--muted)',
        backdropFilter: 'blur(6px)',
        WebkitBackdropFilter: 'blur(6px)',
      }}
    >
      {mode === 'dark' ? <SunIcon /> : <MoonIcon />}
    </button>
  )
}

function SunIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="M4 12H2" />
      <path d="M22 12h-2" />
      <path d="M5.64 5.64 4.22 4.22" />
      <path d="M19.78 19.78l-1.42-1.42" />
      <path d="M5.64 18.36 4.22 19.78" />
      <path d="M19.78 4.22l-1.42 1.42" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="15"
      height="15"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  )
}
