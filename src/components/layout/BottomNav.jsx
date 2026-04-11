import { NavLink } from 'react-router-dom'
import { navItems } from './navItems.js'

export default function BottomNav() {
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
    </nav>
  )
}
