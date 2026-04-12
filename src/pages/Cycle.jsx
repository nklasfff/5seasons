import { useState, useEffect } from 'react'
import cycleData from '../data/cycleData.js'
import HorizontalNav from '../components/layout/HorizontalNav.jsx'
import ScrollToTop from '../components/ui/ScrollToTop.jsx'
import heroImage from '../assets/images/hero-seasons.jpg'

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
      <div className="-mx-6 -mt-7 relative h-[320px] overflow-hidden md:-mx-16 lg:mt-12">
        <img
          src={heroImage}
          alt=""
          className="h-full w-full object-cover"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40" />
        {/* Title overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6">
          <h1 className="cinzel mb-2 text-center text-[26px] font-light uppercase tracking-[0.12em] text-white md:text-[28px]">
            The Cycle
          </h1>
          <p className="text-center text-[13px] italic text-white/90">
            Your monthly rhythm through the five elements
          </p>
        </div>
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

function CycleWheel({ currentPhase, selectedPhaseId, onPhaseClick }) {
  const radius = 140
  const centerX = 200
  const centerY = 200
  const innerRadius = 80

  // Define phases in clockwise order starting from top
  const wheelPhases = [
    { ...cycleData.phases.find(p => p.id === 'winter'), startAngle: -90, endAngle: 0 },
    { ...cycleData.phases.find(p => p.id === 'spring'), startAngle: 0, endAngle: 90 },
    { ...cycleData.phases.find(p => p.id === 'summer'), startAngle: 90, endAngle: 180 },
    { ...cycleData.phases.find(p => p.id === 'autumn'), startAngle: 180, endAngle: 270 }
  ]

  // Create path for segment
  const createSegmentPath = (startAngle, endAngle, outerR, innerR) => {
    const startRad = (startAngle * Math.PI) / 180
    const endRad = (endAngle * Math.PI) / 180

    const x1 = centerX + outerR * Math.cos(startRad)
    const y1 = centerY + outerR * Math.sin(startRad)
    const x2 = centerX + outerR * Math.cos(endRad)
    const y2 = centerY + outerR * Math.sin(endRad)
    const x3 = centerX + innerR * Math.cos(endRad)
    const y3 = centerY + innerR * Math.sin(endRad)
    const x4 = centerX + innerR * Math.cos(startRad)
    const y4 = centerY + innerR * Math.sin(startRad)

    return `M ${x1} ${y1} A ${outerR} ${outerR} 0 0 1 ${x2} ${y2} L ${x3} ${y3} A ${innerR} ${innerR} 0 0 0 ${x4} ${y4} Z`
  }

  return (
    <svg viewBox="0 0 400 400" className="mx-auto w-full max-w-[320px]">
      {wheelPhases.map((phase) => {
        const isActive = phase.id === currentPhase.id
        const isSelected = selectedPhaseId === phase.id
        const opacity = isActive || isSelected ? 0.65 : 0.22

        const midAngle = (phase.startAngle + phase.endAngle) / 2
        const midRad = (midAngle * Math.PI) / 180
        const labelRadius = (radius + innerRadius) / 2
        const labelX = centerX + labelRadius * Math.cos(midRad)
        const labelY = centerY + labelRadius * Math.sin(midRad)

        return (
          <g key={phase.id}>
            <path
              d={createSegmentPath(phase.startAngle, phase.endAngle, radius, innerRadius)}
              fill={phase.colour}
              opacity={opacity}
              className="cursor-pointer transition-opacity hover:opacity-80"
              onClick={() => onPhaseClick(phase.id)}
            />
            <text
              x={labelX}
              y={labelY - 8}
              textAnchor="middle"
              className="cinzel pointer-events-none text-[10px] uppercase tracking-wider"
              fill="var(--text)"
            >
              {phase.name.replace('Inner ', '')}
            </text>
            <text
              x={labelX}
              y={labelY + 6}
              textAnchor="middle"
              className="cinzel pointer-events-none text-[8px] uppercase tracking-wider"
              fill="var(--muted)"
            >
              Days {phase.days[0]}–{phase.days[1]}
            </text>
          </g>
        )
      })}

      {/* Center circle */}
      <circle cx={centerX} cy={centerY} r={innerRadius} fill="var(--bg)" />

      {/* Center text */}
      <text
        x={centerX}
        y={centerY}
        textAnchor="middle"
        dominantBaseline="middle"
        className="cinzel text-[13px] uppercase tracking-wider"
        fill="var(--accent)"
      >
        {(selectedPhaseId
          ? cycleData.phases.find(p => p.id === selectedPhaseId)
          : currentPhase
        ).name.replace('Inner ', '')}
      </text>
    </svg>
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
