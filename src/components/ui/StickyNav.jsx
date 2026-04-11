import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function StickyNav({ prevLabel, prevUrl, prevOnClick, nextLabel, nextUrl, nextOnClick, currentLabel }) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 100)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!isVisible) return null

  const PrevElement = prevOnClick ? 'button' : Link
  const NextElement = nextOnClick ? 'button' : Link

  return (
    <nav
      className="fixed left-0 right-0 z-40 flex h-[44px] items-center justify-center border-t bg-[var(--bg)] px-6 transition-opacity"
      style={{
        bottom: '60px',
        borderColor: 'color-mix(in srgb, var(--accent) 15%, transparent)',
      }}
    >
      {/* Left: Previous */}
      <PrevElement
        {...(prevOnClick ? { type: 'button', onClick: prevOnClick } : { to: prevUrl })}
        className="cinzel absolute left-6 text-[9px] uppercase tracking-[0.28em] text-muted transition-colors hover:text-accent"
      >
        ← {prevLabel}
      </PrevElement>

      {/* Center: Current */}
      <p className="cinzel text-[10px] uppercase tracking-[0.28em] text-accent">
        {currentLabel}
      </p>

      {/* Right: Next */}
      <NextElement
        {...(nextOnClick ? { type: 'button', onClick: nextOnClick } : { to: nextUrl })}
        className="cinzel absolute right-6 text-[9px] uppercase tracking-[0.28em] text-muted transition-colors hover:text-accent"
      >
        {nextLabel} →
      </NextElement>
    </nav>
  )
}
