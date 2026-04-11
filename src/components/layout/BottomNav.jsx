import { NavLink } from 'react-router-dom'
import { navItems } from './navItems.js'
import {
  applyTheme,
  setStoredTheme,
  useThemeMode,
} from '../../lib/theme.js'

export default function BottomNav() {
  const mode = useThemeMode()

  const toggle = () => {
    const next = mode === 'dark' ? 'light' : 'dark'
    setStoredTheme(next)
    applyTheme(next)
  }

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-30 flex h-[60px] items-center justify-around bg-[var(--bg)] lg:hidden"
      style={{ borderTop: '0.5px solid var(--border)' }}
    >
      {navItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.to === '/'}
          className={({ isActive }) =>
            `cinzel text-[7.5px] font-light uppercase tracking-[0.15em] ${
              isActive ? 'text-accent' : 'text-muted'
            }`
          }
        >
          {item.label}
        </NavLink>
      ))}

      {/* Theme toggle as sixth element */}
      <button
        type="button"
        onClick={toggle}
        aria-label={mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        className="cinzel text-[16px] text-muted"
      >
        {mode === 'dark' ? '○' : '●'}
      </button>
    </nav>
  )
}
