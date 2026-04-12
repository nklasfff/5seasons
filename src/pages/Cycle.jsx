import { useState, useEffect } from 'react'
import cycleData from '../data/cycleData.js'
import HorizontalNav from '../components/layout/HorizontalNav.jsx'
import ScrollToTop from '../components/ui/ScrollToTop.jsx'
import heroCycleImage from '../assets/images/hero-cycle.png'

// Get phase from day
function getPhaseFromDay(day) {
  return cycleData.phases.find(p => day >= p.days[0] && day <= p.days[1]) || cycleData.phases[0]
}

// Calculate current cycle day from stored start date
function getCurrentCycleDay() {
  const stored = localStorage.getItem('cycle_day_start')
  if (!stored) return 1

  const startDate = new Date(stored)
  const today = new Date()
  const diffTime = today - startDate
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
  const cycleDay = (diffDays % 28) + 1

  return cycleDay
}

export default function Cycle() {
  const [cycleDay, setCycleDay] = useState(() => getCurrentCycleDay())
  const [selectedPhaseId, setSelectedPhaseId] = useState(null)
  const [activeTab, setActiveTab] = useState('body')

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // Determine current phase from cycle day
  const currentPhase = getPhaseFromDay(cycleDay)
  const displayPhase = selectedPhaseId
    ? cycleData.phases.find(p => p.id === selectedPhaseId)
    : currentPhase

  // Update cycle day and save to localStorage
  const updateCycleDay = (newDay) => {
    if (newDay < 1) newDay = 28
    if (newDay > 28) newDay = 1

    setCycleDay(newDay)

    // Calculate what the start date should be for this cycle day
    const today = new Date()
    const daysAgo = newDay - 1
    const startDate = new Date(today)
    startDate.setDate(startDate.getDate() - daysAgo)
    localStorage.setItem('cycle_day_start', startDate.toISOString())
  }

  // Navigate to previous/next phase
  const navigatePhase = (direction) => {
    const currentIndex = cycleData.phases.findIndex(p => p.id === displayPhase.id)
    let newIndex = currentIndex + direction
    if (newIndex < 0) newIndex = cycleData.phases.length - 1
    if (newIndex >= cycleData.phases.length) newIndex = 0
    setSelectedPhaseId(cycleData.phases[newIndex].id)
  }

  return (
    <div className="spring">
      {/* Hero */}
      <div className="-mx-6 -mt-7 md:-mx-16 bg-[#1a2820]" style={{paddingBottom: '8px'}}>
        <img
          src={heroCycleImage}
          alt="The Cycle"
          className="w-full object-contain"
          style={{background: '#1a2820'}}
        />
      </div>

      <HorizontalNav />

      {/* Lead */}
      <p className="lead mb-12">
        Just as the year moves through five seasons, the monthly cycle moves through four — each with its own element, energy, and invitation. Enter your cycle day to see where you are right now.
      </p>

      {/* Day input section */}
      <div className="mb-12">
        <p className="cinzel mb-4 text-center text-[10px] uppercase tracking-[0.28em] text-accent">
          Your Cycle Day
        </p>
        <div className="flex items-center justify-center gap-6">
          <button
            type="button"
            onClick={() => updateCycleDay(cycleDay - 1)}
            className="cinzel text-[24px] text-accent transition-opacity hover:opacity-70"
          >
            −
          </button>
          <div className="text-center">
            <p className="cinzel text-[48px] font-light text-heading">
              {cycleDay}
            </p>
            <p className="cinzel text-[9px] uppercase tracking-[0.3em] text-muted">
              Day {cycleDay} of 28
            </p>
          </div>
          <button
            type="button"
            onClick={() => updateCycleDay(cycleDay + 1)}
            className="cinzel text-[24px] text-accent transition-opacity hover:opacity-70"
          >
            +
          </button>
        </div>
      </div>

      {/* Cycle wheel */}
      <div className="mb-12">
        <CycleWheel
          currentPhase={currentPhase}
          selectedPhaseId={selectedPhaseId}
          onPhaseClick={setSelectedPhaseId}
        />
      </div>

      {/* Phase details */}
      <div className="mb-10">
        <h2 className="cinzel text-center text-[18px] font-light uppercase tracking-[0.14em] text-accent">
          {displayPhase.name}
        </h2>
        <p className="cinzel mt-1 text-center text-[9px] uppercase tracking-[0.3em] text-muted">
          {displayPhase.element}
        </p>
        <p className="lead mt-6">
          {displayPhase.invitation}
        </p>
      </div>

      {/* Navigation buttons */}
      <div className="mb-8 flex justify-center gap-6 border-b pb-2" style={{ borderColor: 'color-mix(in srgb, var(--accent) 18%, transparent)' }}>
        <NavButton label="Body" active={activeTab === 'body'} onClick={() => setActiveTab('body')} />
        <NavButton label="Mind" active={activeTab === 'mind'} onClick={() => setActiveTab('mind')} />
        <NavButton label="Practice" active={activeTab === 'practice'} onClick={() => setActiveTab('practice')} />
      </div>

      {/* Content area */}
      <div className="mb-16">
        <p className="text-[14px] leading-[1.75] text-muted">
          {displayPhase[activeTab]}
        </p>
      </div>

      {/* Phase navigation */}
      <div className="mb-12 flex items-center justify-between">
        <button
          type="button"
          onClick={() => navigatePhase(-1)}
          className="cinzel text-[9px] uppercase tracking-[0.28em] text-accent transition-opacity hover:opacity-70"
        >
          ← Previous Phase
        </button>
        <button
          type="button"
          onClick={() => navigatePhase(1)}
          className="cinzel text-[9px] uppercase tracking-[0.28em] text-accent transition-opacity hover:opacity-70"
        >
          Next Phase →
        </button>
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

/* ------------------------------------------------------------------ */
/* Cycle Wheel                                                        */
/* ------------------------------------------------------------------ */

const CX = 150
const CY = 150
const INNER_R = 55
const OUTER_R = 145

function polar(cx, cy, r, deg) {
  const rad = (deg * Math.PI) / 180
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) }
}

function ringSegmentPath(cx, cy, rInner, rOuter, startDeg, endDeg) {
  const p1 = polar(cx, cy, rOuter, startDeg)
  const p2 = polar(cx, cy, rOuter, endDeg)
  const p3 = polar(cx, cy, rInner, endDeg)
  const p4 = polar(cx, cy, rInner, startDeg)
  const sweep = endDeg - startDeg
  const largeArc = sweep > 180 ? 1 : 0
  return [
    `M ${p1.x.toFixed(2)} ${p1.y.toFixed(2)}`,
    `A ${rOuter} ${rOuter} 0 ${largeArc} 1 ${p2.x.toFixed(2)} ${p2.y.toFixed(2)}`,
    `L ${p3.x.toFixed(2)} ${p3.y.toFixed(2)}`,
    `A ${rInner} ${rInner} 0 ${largeArc} 0 ${p4.x.toFixed(2)} ${p4.y.toFixed(2)}`,
    'Z',
  ].join(' ')
}

function CycleWheel({ currentPhase, selectedPhaseId, onPhaseClick }) {
  // Define phases in clockwise order starting from top
  // Each phase gets 90 degrees, starting from -90 (top)
  const wheelPhases = [
    {
      ...cycleData.phases.find(p => p.id === 'winter'),
      startDeg: -90,
      endDeg: 0,
      colour: '#2a4a80'
    },
    {
      ...cycleData.phases.find(p => p.id === 'spring'),
      startDeg: 0,
      endDeg: 90,
      colour: '#3a7040'
    },
    {
      ...cycleData.phases.find(p => p.id === 'summer'),
      startDeg: 90,
      endDeg: 180,
      colour: '#8a2030'
    },
    {
      ...cycleData.phases.find(p => p.id === 'autumn'),
      startDeg: 180,
      endDeg: 270,
      colour: '#505058'
    }
  ]

  const activePhaseName = (selectedPhaseId
    ? cycleData.phases.find(p => p.id === selectedPhaseId)
    : currentPhase
  ).name.replace('Inner ', '')

  return (
    <div className="mx-auto w-full max-w-[300px]">
      <svg viewBox="0 0 300 300" className="block h-auto w-full">
        {/* Segments */}
        {wheelPhases.map((phase) => {
          const isActive = phase.id === currentPhase.id
          const isSelected = selectedPhaseId === phase.id
          const fillOpacity = isActive || isSelected ? 0.65 : 0.22

          const d = ringSegmentPath(CX, CY, INNER_R, OUTER_R, phase.startDeg, phase.endDeg)

          // Calculate label position (middle of segment)
          const midDeg = (phase.startDeg + phase.endDeg) / 2
          const labelRadius = (INNER_R + OUTER_R) / 2
          const labelPos = polar(CX, CY, labelRadius, midDeg)

          return (
            <g key={phase.id}>
              <path
                d={d}
                fill={phase.colour}
                style={{
                  fillOpacity,
                  cursor: 'pointer',
                  transition: 'fill-opacity 320ms ease',
                }}
                onMouseEnter={(e) => {
                  if (!isActive && !isSelected) {
                    e.currentTarget.style.fillOpacity = '0.40'
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive && !isSelected) {
                    e.currentTarget.style.fillOpacity = '0.22'
                  }
                }}
                onClick={() => onPhaseClick(phase.id)}
              />
              {/* Phase name */}
              <text
                x={labelPos.x}
                y={labelPos.y - 6}
                textAnchor="middle"
                dominantBaseline="middle"
                className="cinzel pointer-events-none"
                fontSize="10"
                fill="white"
                style={{ letterSpacing: '0.1em', fontWeight: 300, textTransform: 'uppercase' }}
              >
                {phase.name.replace('Inner ', '')}
              </text>
              {/* Day range */}
              <text
                x={labelPos.x}
                y={labelPos.y + 6}
                textAnchor="middle"
                dominantBaseline="middle"
                className="cinzel pointer-events-none"
                fontSize="8"
                fill="white"
                fillOpacity="0.6"
                style={{ letterSpacing: '0.1em', fontWeight: 300 }}
              >
                Days {phase.days[0]}–{phase.days[1]}
              </text>
            </g>
          )
        })}

        {/* Center circle */}
        <circle cx={CX} cy={CY} r={INNER_R} fill="var(--bg)" />

        {/* Center text - active phase name */}
        <text
          x={CX}
          y={CY}
          textAnchor="middle"
          dominantBaseline="middle"
          className="cinzel"
          fontSize="12"
          fill="var(--accent)"
          style={{ letterSpacing: '0.12em', fontWeight: 300, textTransform: 'uppercase' }}
        >
          {activePhaseName}
        </text>
      </svg>
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
