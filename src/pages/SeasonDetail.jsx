import { useState } from 'react'
import { Link, useParams, Navigate } from 'react-router-dom'
import seasonsData from '../data/seasons.json'
import Hero from '../components/ui/Hero.jsx'
import HorizontalNav from '../components/layout/HorizontalNav.jsx'
import StickyNav from '../components/ui/StickyNav.jsx'
import ScrollToTop from '../components/ui/ScrollToTop.jsx'
import heroImage from '../assets/images/hero-seasons.jpg'
import { seasonClass } from '../lib/seasonClass.js'

const SEASON_ORDER = ['spring', 'summer', 'late_summer', 'autumn', 'winter']

const SEASON_LABELS = {
  spring: 'Spring',
  summer: 'Summer',
  late_summer: 'Late Summer',
  autumn: 'Autumn',
  winter: 'Winter',
}

export default function SeasonDetail() {
  const { id } = useParams()
  const [activeSection, setActiveSection] = useState(null)

  const season = seasonsData.seasons.find((s) => s.id === id)
  if (!season) return <Navigate to="/seasons" replace />

  const currentIndex = SEASON_ORDER.indexOf(id)
  const prevIndex = currentIndex === 0 ? SEASON_ORDER.length - 1 : currentIndex - 1
  const nextIndex = currentIndex === SEASON_ORDER.length - 1 ? 0 : currentIndex + 1
  const prevSeason = SEASON_ORDER[prevIndex]
  const nextSeason = SEASON_ORDER[nextIndex]

  return (
    <div className={`${seasonClass(season.id)} pb-28`}>
      {/* Back link */}
      <div className="pt-4 pl-4">
        <Link
          to="/seasons"
          className="cinzel text-[9px] uppercase tracking-[0.28em] text-muted transition-colors hover:text-accent"
        >
          ← All Seasons
        </Link>
      </div>

      {/* Hero image - no text overlay */}
      <Hero image={heroImage} />
      <HorizontalNav />

      {/* Welcome section - always visible */}
      <div className="mb-10">
        <h1 className="cinzel text-[22px] font-light uppercase tracking-[0.12em] text-accent md:text-[24px]">
          {season.name}
        </h1>
        <p className="cinzel mt-1 text-[9px] uppercase tracking-[0.3em] text-muted">
          {season.element}
        </p>
        <p className="lead mt-8">
          {season.description.split(/[.!?]/).slice(0, 2).join('. ').trim()}.
        </p>
      </div>

      {/* Three navigation buttons */}
      <div className="flex gap-x-7 border-b pb-2" style={{ borderColor: 'color-mix(in srgb, var(--accent) 18%, transparent)' }}>
        <NavButton
          label="Organs"
          active={activeSection === 'organs'}
          onClick={() => setActiveSection(activeSection === 'organs' ? null : 'organs')}
        />
        <NavButton
          label="Advice"
          active={activeSection === 'advice'}
          onClick={() => setActiveSection(activeSection === 'advice' ? null : 'advice')}
        />
        <NavButton
          label="Themes"
          active={activeSection === 'themes'}
          onClick={() => setActiveSection(activeSection === 'themes' ? null : 'themes')}
        />
      </div>

      {/* Content area - empty by default */}
      {activeSection && (
        <div className="mt-10 mb-16">
          {activeSection === 'organs' && <OrgansContent season={season} />}
          {activeSection === 'advice' && <AdviceContent season={season} />}
          {activeSection === 'themes' && <ThemesContent season={season} />}
        </div>
      )}

      <div className="mt-16 mb-6">
        <p className="cinzel text-center text-[9px] uppercase tracking-[0.3em] text-muted">
          Isabelle Evita Søndergaard
        </p>
      </div>

      {/* Sticky bottom navigation */}
      <div className="mt-12">
        <StickyNav
          prevLabel={SEASON_LABELS[prevSeason]}
          prevUrl={`/seasons/${prevSeason}`}
          nextLabel={SEASON_LABELS[nextSeason]}
          nextUrl={`/seasons/${nextSeason}`}
          currentLabel={season.name}
        />
      </div>

      {/* Scroll to top button */}
      <ScrollToTop />
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Navigation Button                                                  */
/* ------------------------------------------------------------------ */

function NavButton({ label, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="cinzel pb-1 text-[11px] font-light uppercase tracking-[0.26em] transition-colors"
      style={{
        color: active ? 'var(--accent)' : 'var(--muted)',
        borderBottom: active ? '0.5px solid var(--accent)' : '0.5px solid transparent',
        marginBottom: '-9px',
      }}
    >
      {label}
    </button>
  )
}

/* ------------------------------------------------------------------ */
/* ORGANS Content                                                     */
/* ------------------------------------------------------------------ */

function OrgansContent({ season }) {
  const organEntries = Object.entries(season.organ_detail || {})

  return (
    <div className="space-y-8">
      {organEntries.map(([organKey, text]) => {
        const organName = organKey.charAt(0).toUpperCase() + organKey.slice(1).replace('_', ' ')
        return (
          <div key={organKey}>
            <h3 className="cinzel mb-3 text-[13px] font-light uppercase tracking-[0.24em] text-accent">
              {organName}
            </h3>
            <p className="text-[14.5px] leading-[1.8]">{text}</p>
          </div>
        )
      })}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* ADVICE Content                                                     */
/* ------------------------------------------------------------------ */

function AdviceContent({ season }) {
  const sections = [
    { key: 'food', label: 'Food' },
    { key: 'movement', label: 'Movement' },
    { key: 'emotional', label: 'Emotional' },
    { key: 'sleep', label: 'Sleep' },
  ]

  return (
    <div className="space-y-8">
      {sections.map(({ key, label }) => {
        const text = season.seasonal_advice?.[key]
        if (!text) return null

        return (
          <div key={key}>
            <h3 className="cinzel mb-3 text-[13px] font-light uppercase tracking-[0.24em] text-accent">
              {label}
            </h3>
            <p className="text-[14.5px] leading-[1.8]">{text}</p>
          </div>
        )
      })}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* THEMES Content                                                     */
/* ------------------------------------------------------------------ */

function ThemesContent({ season }) {
  return (
    <div className="space-y-8">
      {season.themes.map((theme) => (
        <div key={theme.theme}>
          <h3 className="cinzel mb-3 text-[13px] font-light uppercase tracking-[0.24em] text-accent">
            {theme.theme}
          </h3>
          <p className="text-[14.5px] leading-[1.8]">{theme.text}</p>
        </div>
      ))}
    </div>
  )
}
