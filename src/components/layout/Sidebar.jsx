import { NavLink } from 'react-router-dom'
import { navItems } from './navItems.js'

export default function Sidebar() {
  return (
    <aside className="hidden w-[220px] flex-shrink-0 px-10 py-14 md:block">
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
    </aside>
  )
}
