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

// Determine current state (harmony, tension, or transformation)
function getCurrentState(seasonElement, organElement) {
  if (seasonElement === organElement) return 'harmony'

  const cycle = {
    Wood: 'Fire',
    Fire: 'Earth',
    Earth: 'Metal',
    Metal: 'Water',
    Water: 'Wood',
  }

  if (cycle[seasonElement] === organElement || cycle[organElement] === seasonElement) {
    return 'transformation'
  }

  return 'tension'
}

export default function LivingSystem() {
  const currentSeasonId = useMemo(() => getCurrentSeason(), [])
  const currentOrgan = useMemo(() => getCurrentOrgan(), [])

  const season = seasonsData.seasons.find(s => s.id === currentSeasonId)

  const seasonElement = season.element
  const organElement = currentOrgan.element

  const description = getDynamicDescription(seasonElement, organElement, season.name, currentOrgan.organ)
  const currentState = getCurrentState(seasonElement, organElement)

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

      <style>{`
        .illustration-container {
          perspective: 400px;
        }

        @keyframes breathe-3d {
          from { transform: rotateY(0deg); }
          to { transform: rotateY(360deg); }
        }

        @keyframes pulse-harmony {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.04); }
        }

        @keyframes orbit-sphere {
          0% { transform: translate(0, 0); }
          25% { transform: translate(8px, 0); }
          50% { transform: translate(0, 0); }
          75% { transform: translate(-8px, 0); }
          100% { transform: translate(0, 0); }
        }

        @keyframes travel-path {
          from { offset-distance: 0%; }
          to { offset-distance: 100%; }
        }

        @keyframes rotate-composition {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes pulse-lens {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.6; }
        }
      `}</style>

      {/* Section 1: Harmony */}
      <div className="mb-10">
        <div className="illustration-container">
          <svg
            viewBox="0 0 280 160"
            className="mx-auto mb-4 w-full max-w-[280px]"
            style={{
              animation: 'breathe-3d 12s linear infinite',
              filter: `drop-shadow(0 4px 12px color-mix(in srgb, var(--accent) 30%, transparent))`
            }}
          >
            <defs>
              {/* Radial gradients for 3D sphere effect - Left sphere */}
              <radialGradient id="sphereGradientLeft" cx="35%" cy="35%">
                <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.9" />
                <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.15" />
              </radialGradient>

              {/* Radial gradients for 3D sphere effect - Right sphere */}
              <radialGradient id="sphereGradientRight" cx="35%" cy="35%">
                <stop offset="0%" stopColor={getElementColor(organElement)} stopOpacity="0.9" />
                <stop offset="100%" stopColor={getElementColor(organElement)} stopOpacity="0.15" />
              </radialGradient>

              {/* Glow filter */}
              <filter id="glowLeft">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>

              <filter id="glowRight">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>

              {/* Gradient for connecting line */}
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="var(--accent)" />
                <stop offset="100%" stopColor={getElementColor(organElement)} />
              </linearGradient>
            </defs>

            {/* Left sphere */}
            <g style={{ animation: 'pulse-harmony 4s ease-in-out infinite', transformOrigin: '95px 80px' }}>
              <circle
                cx="95"
                cy="80"
                r="32"
                fill="url(#sphereGradientLeft)"
                stroke="var(--accent)"
                strokeWidth="1"
                filter="url(#glowLeft)"
              />
            </g>

            {/* Right sphere */}
            <g style={{ animation: 'pulse-harmony 4s ease-in-out infinite', transformOrigin: '185px 80px' }}>
              <circle
                cx="185"
                cy="80"
                r="32"
                fill="url(#sphereGradientRight)"
                stroke={getElementColor(organElement)}
                strokeWidth="1"
                filter="url(#glowRight)"
              />
            </g>

            {/* Connecting line with gradient */}
            <line
              x1="127"
              y1="80"
              x2="153"
              y2="80"
              stroke="url(#lineGradient)"
              strokeWidth="0.8"
              opacity="0.6"
            />

            {/* Glowing diamond at center */}
            <rect
              x="138"
              y="78"
              width="4"
              height="4"
              fill="var(--accent)"
              transform="rotate(45 140 80)"
              filter="url(#glowLeft)"
            />
          </svg>
        </div>
        <h3 className="cinzel mb-3 text-center text-[11px] uppercase tracking-[0.28em] text-accent">
          Harmony
        </h3>
        <p className="text-center text-[14px] leading-[1.75] text-muted">
          When the season and the organ share the same elemental energy, everything flows in one direction.
          The body and the year are asking the same thing — there is no conflict, only depth and focus.
        </p>
      </div>

      {/* Section 2: Creative Tension */}
      <div className="mb-10">
        <div className="illustration-container">
          <svg
            viewBox="0 0 280 160"
            className="mx-auto mb-4 w-full max-w-[280px]"
            style={{
              animation: 'breathe-3d 12s linear infinite',
              filter: `drop-shadow(0 4px 12px color-mix(in srgb, var(--accent) 30%, transparent))`
            }}
          >
            <defs>
              {/* Radial gradients for 3D sphere effect - Left sphere */}
              <radialGradient id="sphereGradientTensionLeft" cx="35%" cy="35%">
                <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.9" />
                <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.15" />
              </radialGradient>

              {/* Radial gradients for 3D sphere effect - Right sphere */}
              <radialGradient id="sphereGradientTensionRight" cx="35%" cy="35%">
                <stop offset="0%" stopColor={getElementColor(organElement)} stopOpacity="0.9" />
                <stop offset="100%" stopColor={getElementColor(organElement)} stopOpacity="0.15" />
              </radialGradient>

              {/* Glow filters */}
              <filter id="glowTensionLeft">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>

              <filter id="glowTensionRight">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>

              {/* Path for dot animation */}
              <path id="curvedPath" d="M 126 75 Q 155 55 183 82" fill="none" />
            </defs>

            {/* Left sphere - larger, with orbit animation */}
            <g style={{ animation: 'orbit-sphere 6s ease-in-out infinite' }}>
              <circle
                cx="90"
                cy="75"
                r="36"
                fill="url(#sphereGradientTensionLeft)"
                stroke="var(--accent)"
                strokeWidth="1"
                filter="url(#glowTensionLeft)"
              />
            </g>

            {/* Right sphere - smaller, offset vertically */}
            <circle
              cx="195"
              cy="82"
              r="28"
              fill="url(#sphereGradientTensionRight)"
              stroke={getElementColor(organElement)}
              strokeWidth="1"
              filter="url(#glowTensionRight)"
            />

            {/* Curved path connecting them */}
            <path
              d="M 126 75 Q 155 55 183 82"
              stroke="var(--accent)"
              strokeWidth="0.8"
              fill="none"
              opacity="0.5"
            />

            {/* Animated dot traveling along path */}
            <circle
              r="2.5"
              fill={getElementColor(organElement)}
              filter="url(#glowTensionRight)"
              style={{
                offsetPath: 'path("M 126 75 Q 155 55 183 82")',
                animation: 'travel-path 3s ease-in-out infinite'
              }}
            />
          </svg>
        </div>
        <h3 className="cinzel mb-3 text-center text-[11px] uppercase tracking-[0.28em] text-accent">
          Creative Tension
        </h3>
        <p className="text-center text-[14px] leading-[1.75] text-muted">
          When different elements are active, you are being asked to hold two things at once.
          This is not conflict — it is the friction that makes new patterns possible.
        </p>
      </div>

      {/* Section 3: Transformation */}
      <div className="mb-10">
        <div className="illustration-container">
          <svg
            viewBox="0 0 280 160"
            className="mx-auto mb-4 w-full max-w-[280px]"
            style={{
              animation: 'breathe-3d 12s linear infinite',
              filter: `drop-shadow(0 4px 12px color-mix(in srgb, var(--accent) 30%, transparent))`
            }}
          >
            <defs>
              {/* Radial gradients for 3D sphere effect - Left sphere */}
              <radialGradient id="sphereGradientTransLeft" cx="35%" cy="35%">
                <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.9" />
                <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.15" />
              </radialGradient>

              {/* Radial gradients for 3D sphere effect - Right sphere */}
              <radialGradient id="sphereGradientTransRight" cx="35%" cy="35%">
                <stop offset="0%" stopColor={getElementColor(organElement)} stopOpacity="0.9" />
                <stop offset="100%" stopColor={getElementColor(organElement)} stopOpacity="0.15" />
              </radialGradient>

              {/* Gradient for lens overlap */}
              <linearGradient id="lensGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.35" />
                <stop offset="100%" stopColor={getElementColor(organElement)} stopOpacity="0.35" />
              </linearGradient>

              {/* Clip path for vesica piscis (lens shape) */}
              <clipPath id="vesicaClip">
                <circle cx="118" cy="80" r="32" />
              </clipPath>

              {/* Glow filters */}
              <filter id="glowTransLeft">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>

              <filter id="glowTransRight">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>

              <filter id="glowDot">
                <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>

            {/* Rotating composition wrapper */}
            <g style={{ animation: 'rotate-composition 10s linear infinite', transformOrigin: '140px 80px' }}>
              {/* Left sphere */}
              <circle
                cx="118"
                cy="80"
                r="32"
                fill="url(#sphereGradientTransLeft)"
                stroke="var(--accent)"
                strokeWidth="1"
                filter="url(#glowTransLeft)"
              />

              {/* Right sphere */}
              <circle
                cx="162"
                cy="80"
                r="32"
                fill="url(#sphereGradientTransRight)"
                stroke={getElementColor(organElement)}
                strokeWidth="1"
                filter="url(#glowTransRight)"
              />

              {/* Vesica piscis - overlapping lens shape with pulsing gradient */}
              <circle
                cx="162"
                cy="80"
                r="32"
                fill="url(#lensGradient)"
                clipPath="url(#vesicaClip)"
                style={{ animation: 'pulse-lens 10s ease-in-out infinite' }}
              />

              {/* 8 radiating spokes with glowing dots */}
              {/* Spoke 1: 0° (right) */}
              <line x1="140" y1="80" x2="158" y2="80" stroke="var(--accent)" strokeWidth="0.5" opacity="0.5" />
              <circle cx="158" cy="80" r="1.5" fill="var(--accent)" filter="url(#glowDot)" />

              {/* Spoke 2: 45° */}
              <line x1="140" y1="80" x2="153" y2="67" stroke="var(--accent)" strokeWidth="0.5" opacity="0.5" />
              <circle cx="153" cy="67" r="1.5" fill="var(--accent)" filter="url(#glowDot)" />

              {/* Spoke 3: 90° (up) */}
              <line x1="140" y1="80" x2="140" y2="62" stroke="var(--accent)" strokeWidth="0.5" opacity="0.5" />
              <circle cx="140" cy="62" r="1.5" fill="var(--accent)" filter="url(#glowDot)" />

              {/* Spoke 4: 135° */}
              <line x1="140" y1="80" x2="127" y2="67" stroke="var(--accent)" strokeWidth="0.5" opacity="0.5" />
              <circle cx="127" cy="67" r="1.5" fill="var(--accent)" filter="url(#glowDot)" />

              {/* Spoke 5: 180° (left) */}
              <line x1="140" y1="80" x2="122" y2="80" stroke="var(--accent)" strokeWidth="0.5" opacity="0.5" />
              <circle cx="122" cy="80" r="1.5" fill="var(--accent)" filter="url(#glowDot)" />

              {/* Spoke 6: 225° */}
              <line x1="140" y1="80" x2="127" y2="93" stroke="var(--accent)" strokeWidth="0.5" opacity="0.5" />
              <circle cx="127" cy="93" r="1.5" fill="var(--accent)" filter="url(#glowDot)" />

              {/* Spoke 7: 270° (down) */}
              <line x1="140" y1="80" x2="140" y2="98" stroke="var(--accent)" strokeWidth="0.5" opacity="0.5" />
              <circle cx="140" cy="98" r="1.5" fill="var(--accent)" filter="url(#glowDot)" />

              {/* Spoke 8: 315° */}
              <line x1="140" y1="80" x2="153" y2="93" stroke="var(--accent)" strokeWidth="0.5" opacity="0.5" />
              <circle cx="153" cy="93" r="1.5" fill="var(--accent)" filter="url(#glowDot)" />
            </g>
          </svg>
        </div>
        <h3 className="cinzel mb-3 text-center text-[11px] uppercase tracking-[0.28em] text-accent">
          Transformation
        </h3>
        <p className="text-center text-[14px] leading-[1.75] text-muted">
          When one energy feeds into the next, something is completing and something is beginning.
          The old and the new coexist briefly — this is the threshold where change happens.
        </p>
      </div>

      {/* Current state highlight */}
      <div className="mb-12 rounded-sm border px-6 py-5" style={{
        borderColor: 'var(--accent)',
        background: 'var(--accent-light)'
      }}>
        <p className="cinzel mb-2 text-[10px] uppercase tracking-[0.28em] text-accent">
          Right Now
        </p>
        <p className="text-[14px] leading-[1.75]" style={{ color: 'color-mix(in srgb, var(--accent) 85%, var(--text))' }}>
          {currentState === 'harmony' && `The ${season.name} season and the ${currentOrgan.organ} meridian are in harmony — both ${seasonElement}. This is a moment of natural alignment.`}
          {currentState === 'transformation' && `The ${season.name} season (${seasonElement}) and the ${currentOrgan.organ} meridian (${organElement}) are in a transformative relationship — one energy is feeding into the next.`}
          {currentState === 'tension' && `The ${season.name} season (${seasonElement}) and the ${currentOrgan.organ} meridian (${organElement}) are in creative tension — holding different elemental energies at once.`}
        </p>
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
