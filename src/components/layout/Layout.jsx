import { Outlet } from 'react-router-dom'
import BottomNav from './BottomNav.jsx'
import Sidebar from './Sidebar.jsx'
import {
  applyTheme,
  setStoredTheme,
  useThemeMode,
} from '../../lib/theme.js'

export default function Layout() {
  const mode = useThemeMode()

  const toggle = () => {
    const next = mode === 'dark' ? 'light' : 'dark'
    setStoredTheme(next)
    applyTheme(next)
  }

  return (
    <div className="min-h-full bg-[var(--bg)] lg:flex">
      <Sidebar />
      <main className="mx-auto w-full max-w-[680px] px-6 pb-[84px] pt-7 md:px-16 md:pb-14 md:pt-14">
        <Outlet />
      </main>
      <BottomNav />

      {/* Dark mode toggle - top right corner */}
      <button
        type="button"
        onClick={toggle}
        aria-label={mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        className="theme-toggle cinzel fixed z-40 flex h-[28px] w-[28px] items-center justify-center rounded-full text-[10px] text-accent transition-colors hover:opacity-75"
        style={{
          top: '12px',
          right: '12px',
          background: 'transparent',
          border: '0.5px solid color-mix(in srgb, var(--accent) 30%, transparent)',
        }}
      >
        {mode === 'dark' ? '○' : '●'}
      </button>
    </div>
  )
}
