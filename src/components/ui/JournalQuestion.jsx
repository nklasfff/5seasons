import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { clearEntry, getEntry, setEntry } from '../../lib/journal.js'

export default function JournalQuestion({ seasonId, number, question }) {
  const [value, setValue] = useState(() => getEntry(seasonId, number))
  const [showSaved, setShowSaved] = useState(false)
  const textareaRef = useRef(null)
  const saveTimerRef = useRef(null)
  const savedTimerRef = useRef(null)

  // When the season changes (parent re-renders with a new seasonId), reload
  // the stored value for this slot.
  useEffect(() => {
    setValue(getEntry(seasonId, number))
  }, [seasonId, number])

  // Auto-size the textarea to its content so there is never an inner scroll.
  useLayoutEffect(() => {
    const el = textareaRef.current
    if (!el) return
    el.style.height = 'auto'
    el.style.height = `${el.scrollHeight}px`
  }, [value])

  // Cleanup pending timers on unmount.
  useEffect(() => {
    return () => {
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current)
      if (savedTimerRef.current) clearTimeout(savedTimerRef.current)
    }
  }, [])

  const handleChange = (e) => {
    const next = e.target.value
    setValue(next)

    // Debounce the write + Saved flash so it feels unhurried.
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current)
    saveTimerRef.current = setTimeout(() => {
      setEntry(seasonId, number, next)
      if (next.trim().length > 0) {
        setShowSaved(true)
        if (savedTimerRef.current) clearTimeout(savedTimerRef.current)
        savedTimerRef.current = setTimeout(() => setShowSaved(false), 1400)
      }
    }, 450)
  }

  const handleClear = () => {
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current)
    if (savedTimerRef.current) clearTimeout(savedTimerRef.current)
    clearEntry(seasonId, number)
    setValue('')
    setShowSaved(false)
  }

  const hasContent = value.trim().length > 0

  return (
    <div
      className="border-b py-5 last:border-0"
      style={{
        borderColor: 'color-mix(in srgb, var(--accent) 10%, transparent)',
      }}
    >
      <p className="cinzel mb-1 text-[9px] font-light tracking-[0.22em] text-accent">
        {String(number).padStart(2, '0')}
      </p>
      <p className="text-[14.5px] italic leading-[1.72] text-heading">
        {question}
      </p>

      <textarea
        ref={textareaRef}
        value={value}
        onChange={handleChange}
        placeholder="Begin writing…"
        rows={3}
        className="mt-4 w-full resize-none bg-transparent text-[14.5px] italic leading-[1.78] text-heading placeholder:italic placeholder:text-muted focus:outline-none"
        style={{
          border: 'none',
          borderBottom:
            '0.5px solid color-mix(in srgb, var(--accent) 18%, transparent)',
          padding: '0.35rem 0 0.65rem 0',
          minHeight: '4.2rem',
          fontFamily: "'Cormorant Garamond', Georgia, serif",
        }}
      />

      <div className="mt-2 flex h-4 items-center justify-between">
        <span
          className={`cinzel text-[8.5px] font-light uppercase tracking-[0.28em] text-accent transition-opacity duration-700 ${
            showSaved ? 'opacity-100' : 'opacity-0'
          }`}
          aria-hidden={!showSaved}
        >
          Saved
        </span>
        {hasContent && (
          <button
            type="button"
            onClick={handleClear}
            className="cinzel text-[8.5px] font-light uppercase tracking-[0.24em] text-muted transition-colors hover:text-accent"
          >
            Clear this entry
          </button>
        )}
      </div>
    </div>
  )
}
