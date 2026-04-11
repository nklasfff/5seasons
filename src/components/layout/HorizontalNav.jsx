import { NavLink } from 'react-router-dom'
import { navItems } from './navItems.js'
import {
  applyTheme,
  setStoredTheme,
  useThemeMode,
} from '../../lib/theme.js'

export default function HorizontalNav() {
  const mode = useThemeMode()

  const toggle = () => {
    const next = mode === 'dark' ? 'light' : 'dark'
    setStoredTheme(next)
    applyTheme(next)
  }

  return (
    <nav className="hidden mb-6 py-6 lg:block" style={{ borderBottom: '0.5px solid rgba(100, 160, 110, 0.2)' }}>
      <div className="flex items-center justify-center gap-3">
        {navItems.map((item, index) => (
          <div key={item.to} className="flex items-center gap-3">
            <NavLink
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `cinzel text-[9px] font-light uppercase tracking-[0.28em] text-muted transition-colors hover:text-accent ${
                  isActive ? 'border-b-[0.5px] border-accent' : ''
                }`
              }
            >
              {item.label}
            </NavLink>
            {index < navItems.length - 1 && (
              <span className="cinzel text-[9px] text-muted">·</span>
            )}
          </div>
        ))}

        {/* Separator and dark mode toggle */}
        <span className="cinzel text-[9px] text-muted">·</span>
        <button
          type="button"
          onClick={toggle}
          className="cinzel text-[9px] font-light uppercase tracking-[0.28em] text-muted transition-colors hover:text-accent"
        >
          {mode === 'dark' ? 'Light' : 'Dark'}
        </button>
      </div>
    </nav>
  )
}
