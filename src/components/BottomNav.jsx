import { NavLink } from 'react-router-dom'

const tabs = [
  { to: '/',          label: 'Home',        icon: '☽' },
  { to: '/seasons',   label: 'Seasons',     icon: '❧' },
  { to: '/body-clock',label: 'Body Clock',  icon: '◎' },
  { to: '/pause',     label: 'Pause',       icon: '◌' },
  { to: '/recipes',   label: 'Recipes',     icon: '✦' },
]

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 inset-x-0 bg-background border-t border-stone-200 flex justify-around items-center h-16 z-50">
      {tabs.map(({ to, label, icon }) => (
        <NavLink
          key={to}
          to={to}
          end={to === '/'}
          className={({ isActive }) =>
            `flex flex-col items-center gap-0.5 text-xs font-heading tracking-wider uppercase transition-colors ${
              isActive ? 'text-stone-800' : 'text-stone-400 hover:text-stone-600'
            }`
          }
        >
          <span className="text-lg leading-none">{icon}</span>
          <span>{label}</span>
        </NavLink>
      ))}
    </nav>
  )
}
