import { Outlet } from 'react-router-dom'
import BottomNav from './BottomNav.jsx'

export default function Layout() {
  return (
    <div className="min-h-full bg-[var(--bg)]">
      <main className="mx-auto w-full max-w-[680px] px-6 pb-[84px] pt-7 md:px-16 md:pb-14 md:pt-14 lg:pt-0">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  )
}
