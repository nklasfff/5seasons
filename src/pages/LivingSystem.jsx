import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import seasonsData from '../data/seasons.json'
import bodyclockData from '../data/bodyclock.json'
import HorizontalNav from '../components/layout/HorizontalNav.jsx'
import PracticeRow from '../components/ui/PracticeRow.jsx'
import ScrollToTop from '../components/ui/ScrollToTop.jsx'
import { seasonClass } from '../lib/seasonClass.js'

// Determine current season from month
function getCurrentSeason() {
  const month = new Date().getMonth() // 0-11
  if (month >= 1 && month <= 3) return 'spring' // Feb-Apr
  if (month >= 4 && month <= 6) return 'summer' // May-Jul
  if (month >= 7 && month <= 8) return 'late_summer' // Aug-Sep
  if (month >= 9 && month <= 10) return 'autumn' // Oct-Nov
  return 'winter' // Dec-Jan
}

// Determine current organ from hour
function getCurrentOrgan() {
  const hour = new Date().getHours()
  const organs = bodyclockData.organs

  if (hour >= 3 && hour < 5) return organs.find(o => o.organ === 'Lungs')
  if (hour >= 5 && hour < 7) return organs.find(o => o.organ === 'Large Intestine')
  if (hour >= 7 && hour < 9) return organs.find(o => o.organ === 'Stomach')
  if (hour >= 9 && hour < 11) return organs.find(o => o.organ === 'Spleen')
  if (hour >= 11 && hour < 13) return organs.find(o => o.organ === 'Heart')
  if (hour >= 13 && hour < 15) return organs.find(o => o.organ === 'Small Intestine')
  if (hour >= 15 && hour < 17) return organs.find(o => o.organ === 'Bladder')
  if (hour >= 17 && hour < 19) return organs.find(o => o.organ === 'Kidneys')
  if (hour >= 19 && hour < 21) return organs.find(o => o.organ === 'Pericardium')
  if (hour >= 21 && hour < 23) return organs.find(o => o.organ === 'Triple Warmer')
  if (hour >= 23 || hour < 1) return organs.find(o => o.organ === 'Gallbladder')
  return organs.find(o => o.organ === 'Liver')
}

// Get element color for organ
function getElementColor(element) {
  const colors = {
    Wood: '#3a7040',
    Fire: '#8a2030',
    Earth: '#7a6010',
    Metal: '#505058',
    Water: '#2a4a80',
  }
  return colors[element] || '#3a7040'
}

// Generate dynamic description
function getDynamicDescription(seasonElement, organElement, seasonName, organName) {
  if (seasonElement === organElement) {
    return `Right now, the ${seasonName} season and the ${organName} meridian share the same elemental energy — ${seasonElement}. This is a moment of natural harmony. What the season is asking and what your body is doing are aligned. Use this time to deepen into the work that matters most.`
  }

  // Creative cycles
  const cycle = {
    Wood: 'Fire',
    Fire: 'Earth',
    Earth: 'Metal',
    Metal: 'Water',
    Water: 'Wood',
  }

  if (cycle[seasonElement] === organElement) {
    return `The ${seasonName} season (${seasonElement}) is feeding into the ${organName} meridian (${organElement}). This is a supportive relationship — the season's energy naturally flows into what your body is doing right now. There's momentum here. What wants to be created?`
  }

  if (cycle[organElement] === seasonElement) {
    return `The ${organName} meridian (${organElement}) is feeding into the ${seasonName} season (${seasonElement}). Your body's current focus is building the foundation for what the season will ask next. This moment is preparing you for what's coming.`
  }

  return `The ${seasonName} season (${seasonElement}) and the ${organName} meridian (${organElement}) are pulling in different directions. This creative tension asks you to hold both. What the season wants and what your body needs may not be the same — and that's okay. The friction creates something new.`
}

export default function LivingSystem() {
  const currentSeasonId = useMemo(() => getCurrentSeason(), [])
  const currentOrgan = useMemo(() => getCurrentOrgan(), [])

  const season = seasonsData.seasons.find(s => s.id === currentSeasonId)

  const seasonElement = season.element
  const organElement = currentOrgan.element

  const description = getDynamicDescription(seasonElement, organElement, season.name, currentOrgan.organ)

  // Get time window
  const hour = new Date().getHours()
  const timeWindow = `${hour.toString().padStart(2, '0')}:00–${((hour + 2) % 24).toString().padStart(2, '0')}:00`

  return (
    <div className={seasonClass(currentSeasonId)}>
      <HorizontalNav />

      {/* Back link */}
      <div className="mb-6">
        <Link
          to="/"
          className="cinzel text-[9px] uppercase tracking-[0.28em] text-muted transition-colors hover:text-accent"
        >
          ← Home
        </Link>
      </div>

      {/* Title */}
      <div className="mb-10">
        <h1 className="cinzel text-[22px] font-light uppercase tracking-[0.12em] text-heading md:text-[24px]">
          The Living System
        </h1>
        <p className="cinzel mt-1 text-[9px] uppercase tracking-[0.3em] text-muted">
          Season · Organ · This Moment
        </p>
      </div>

      {/* Two info pills */}
      <div className="mb-8 flex items-center gap-4">
        <div className="flex-1 rounded-sm border px-4 py-3" style={{ borderColor: 'var(--accent)', background: 'var(--accent-light)' }}>
          <p className="cinzel text-[11px] uppercase tracking-[0.24em] text-accent">
            {season.name}
          </p>
          <p className="cinzel mt-1 text-[9px] uppercase tracking-[0.3em]" style={{ color: 'color-mix(in srgb, var(--accent) 70%, var(--text))' }}>
            {seasonElement}
          </p>
        </div>
        <div className="h-px w-8 flex-shrink-0" style={{ background: 'var(--border)' }} />
        <div className="flex-1 rounded-sm border px-4 py-3" style={{ borderColor: getElementColor(organElement), background: `color-mix(in srgb, ${getElementColor(organElement)} 12%, var(--bg))` }}>
          <p className="cinzel text-[11px] uppercase tracking-[0.24em]" style={{ color: getElementColor(organElement) }}>
            {currentOrgan.organ}
          </p>
          <p className="cinzel mt-1 text-[9px] uppercase tracking-[0.3em]" style={{ color: `color-mix(in srgb, ${getElementColor(organElement)} 70%, var(--text))` }}>
            {timeWindow} · {organElement}
          </p>
        </div>
      </div>

      {/* Dynamic description */}
      <p className="lead mb-12">
        {description}
      </p>

      {/* Three illustrations */}
      <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-3">
        <div className="text-center">
          <svg viewBox="0 0 200 120" className="mx-auto mb-3 w-full max-w-[200px]">
            <circle cx="70" cy="60" r="25" fill="var(--accent)" opacity="0.3" />
            <circle cx="130" cy="60" r="25" fill={getElementColor(organElement)} opacity="0.3" />
            <line x1="95" y1="60" x2="105" y2="60" stroke="var(--accent)" strokeWidth="1.5" />
          </svg>
          <p className="cinzel text-[9px] uppercase tracking-[0.28em] text-muted">
            When season and moment align
          </p>
        </div>

        <div className="text-center">
          <svg viewBox="0 0 200 120" className="mx-auto mb-3 w-full max-w-[200px]">
            <circle cx="70" cy="50" r="30" fill="var(--accent)" opacity="0.3" />
            <circle cx="130" cy="70" r="20" fill={getElementColor(organElement)} opacity="0.3" />
            <path d="M 100 50 Q 115 60 130 70" stroke="var(--accent)" strokeWidth="1.5" fill="none" />
          </svg>
          <p className="cinzel text-[9px] uppercase tracking-[0.28em] text-muted">
            When energies pull in different directions
          </p>
        </div>

        <div className="text-center">
          <svg viewBox="0 0 200 120" className="mx-auto mb-3 w-full max-w-[200px]">
            <circle cx="85" cy="60" r="25" fill="var(--accent)" opacity="0.3" />
            <circle cx="115" cy="60" r="25" fill={getElementColor(organElement)} opacity="0.3" />
            <circle cx="90" cy="50" r="2" fill="var(--accent)" opacity="0.6" />
            <circle cx="110" cy="70" r="2" fill="var(--accent)" opacity="0.6" />
            <circle cx="100" cy="45" r="2" fill={getElementColor(organElement)} opacity="0.6" />
            <circle cx="100" cy="75" r="2" fill={getElementColor(organElement)} opacity="0.6" />
            <circle cx="95" cy="65" r="2" fill="var(--accent)" opacity="0.6" />
            <circle cx="105" cy="55" r="2" fill={getElementColor(organElement)} opacity="0.6" />
          </svg>
          <p className="cinzel text-[9px] uppercase tracking-[0.28em] text-muted">
            When something new is becoming possible
          </p>
        </div>
      </div>

      {/* Right Now For You section */}
      <div className="mb-16">
        <h2 className="cinzel mb-6 text-[13px] font-light uppercase tracking-[0.25em] text-accent">
          Right Now For You
        </h2>

        <div>
          <PracticeRow
            title="What the season is asking"
            description={season.keywords.slice(0, 3).join('. ') + '. ' + season.description.split('.')[0] + '.'}
          />
          <PracticeRow
            title="What this organ window is asking"
            description={currentOrgan.description}
          />
          <PracticeRow
            title="How they work together in this moment"
            description={seasonElement === organElement
              ? "The energies are aligned. This is a time to go deep into what matters most — the season and your body are asking for the same thing."
              : "The energies are in dialogue. Notice where the season's invitation and your body's needs create space for something unexpected. The friction is generative."}
          />
        </div>
      </div>

      <div className="mb-6">
        <p className="cinzel text-center text-[9px] uppercase tracking-[0.3em] text-muted">
          Isabelle Evita Søndergaard
        </p>
      </div>

      <ScrollToTop />
    </div>
  )
}
