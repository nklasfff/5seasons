import { NavLink } from 'react-router-dom'
import { navItems } from './navItems.js'
import {
  applyTheme,
  setStoredTheme,
  useThemeMode,
} from '../../lib/theme.js'

export default function Sidebar() {
  const mode = useThemeMode()

  const toggle = () => {
    const next = mode === 'dark' ? 'light' : 'dark'
    setStoredTheme(next)
    applyTheme(next)
  }

  return (
    <aside className="hidden w-[220px] flex-shrink-0 px-10 py-14 lg:flex lg:flex-col">
      <div>
        <p className="cinzel mb-10 text-[10px] font-light uppercase tracking-[0.3em] text-accent">
          Five Seasons
        </p>
        <ul className="flex flex-col gap-5">
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `cinzel text-[11px] font-light uppercase tracking-[0.26em] ${
                    isActive ? 'text-accent' : 'text-muted hover:text-heading'
                  }`
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      {/* Theme toggle at bottom */}
      <div className="mt-auto pt-10">
        <button
          type="button"
          onClick={toggle}
          aria-label={mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          className="cinzel text-[20px] text-muted transition-colors hover:text-accent"
        >
          {mode === 'dark' ? '○' : '●'}
        </button>
      </div>
    </aside>
  )
}
