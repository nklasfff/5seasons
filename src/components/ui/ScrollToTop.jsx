import { useState, useEffect } from 'react'

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 400)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <button
      type="button"
      onClick={scrollToTop}
      className="fixed z-40 flex h-8 w-8 items-center justify-center rounded-full border bg-[var(--bg)] transition-opacity"
      style={{
        bottom: '120px',
        right: '20px',
        borderColor: 'color-mix(in srgb, var(--accent) 30%, transparent)',
        opacity: isVisible ? 1 : 0,
        pointerEvents: isVisible ? 'auto' : 'none',
      }}
      aria-label="Scroll to top"
    >
      <span className="cinzel text-[14px] text-accent">↑</span>
    </button>
  )
}
