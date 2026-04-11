import { useEffect, useMemo, useState } from 'react'
import bodyclockData from '../data/bodyclock.json'
import Hero from '../components/ui/Hero.jsx'
import PracticeRow from '../components/ui/PracticeRow.jsx'
import heroImage from '../assets/images/hero-body-clock.jpg'
import { seasonClass } from '../lib/seasonClass.js'

const SEASON_NAME_TO_ID = {
  Spring: 'spring',
  Summer: 'summer',
  'Late Summer': 'late_summer',
  Autumn: 'autumn',
  Winter: 'winter',
}

// Element palette as specified in CLAUDE.md
const ELEMENT_COLOUR = {
  Wood: '#4a8050',
  Fire: '#903040',
  Earth: '#8a6820',
  Metal: '#686870',
  Water: '#3a5080',
}

const hourOf = (t) => parseInt(t.split(':')[0], 10)

function findOrganIndexForHour(organs, hour) {
  for (let i = 0; i < organs.length; i++) {
    const s = hourOf(organs[i].time_start)
    const e = hourOf(organs[i].time_end)
    const contains = s < e ? hour >= s && hour < e : hour >= s || hour < e
    if (contains) return i
  }
  return 0
}

export default function BodyClock() {
  const { meta, organs, daily_rhythm, symptoms_guide } = bodyclockData

  const [now, setNow] = useState(() => new Date())
  const [userSelected, setUserSelected] = useState(null)
  const [tab, setTab] = useState('clock')

  // Tick every minute so the active segment stays in sync
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 60 * 1000)
    return () => clearInterval(id)
  }, [])

  const activeIndex = useMemo(
    () => findOrganIndexForHour(organs, now.getHours()),
    [organs, now],
  )
  const selectedIndex = userSelected ?? activeIndex
  const selected = organs[selectedIndex]
  const seasonId = SEASON_NAME_TO_ID[selected.season] || 'spring'

  const handleSelect = (i) => {
    setUserSelected((prev) => {
      if (i === activeIndex) return null
      return i
    })
  }

  return (
    <div className={seasonClass(seasonId)}>
      <Hero
        image={heroImage}
        label="Body Clock"
        title={meta.title}
        subtitle={meta.subtitle}
      />

      {/* Warm italic lead */}
      <p className="lead">{meta.description}</p>

      {/* Tabs */}
      <div className="mt-8">
        <Tabs
          tabs={[
            { id: 'clock', label: 'The Clock' },
            { id: 'rhythm', label: 'Daily Rhythm' },
            { id: 'symptoms', label: 'Symptoms' },
          ]}
          active={tab}
          onChange={setTab}
        />
      </div>

      {/* Tab content */}
      <div className="mt-10">
        {tab === 'clock' && (
          <TheClockTab
            organs={organs}
            activeIndex={activeIndex}
            selectedOrgan={selected}
            now={now}
            onSelect={handleSelect}
          />
        )}

        {tab === 'rhythm' && <DailyRhythmTab items={daily_rhythm} />}

        {tab === 'symptoms' && <SymptomsTab items={symptoms_guide} />}
      </div>

      <div className="mt-16 mb-6">
        <p className="cinzel text-center text-[9px] uppercase tracking-[0.3em] text-muted">
          Isabelle Evita Søndergaard
        </p>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* The Clock Tab                                                       */
/* ------------------------------------------------------------------ */

function TheClockTab({ organs, activeIndex, selectedOrgan, now, onSelect }) {
  return (
    <>
      <OrganClock
        organs={organs}
        activeIndex={activeIndex}
        selectedOrgan={selectedOrgan}
        now={now}
        onSelect={onSelect}
      />

      <InfoPanel organ={selectedOrgan} />
    </>
  )
}

/* ------------------------------------------------------------------ */
/* Daily Rhythm Tab                                                    */
/* ------------------------------------------------------------------ */

function DailyRhythmTab({ items }) {
  return (
    <>
      <p className="lead mb-6">
        A practical map of the day — what the body clock asks for at each
        window, and what it offers in return.
      </p>

      <div>
        {items.map((r, i) => (
          <PracticeRow
            key={i}
            title={`${r.time} · ${r.title}`}
            description={r.guidance}
          />
        ))}
      </div>
    </>
  )
}

/* ------------------------------------------------------------------ */
/* Symptoms Tab                                                        */
/* ------------------------------------------------------------------ */

function SymptomsTab({ items }) {
  return (
    <>
      <p className="lead mb-6">
        The body clock speaks through symptoms. Waking at a particular hour,
        craving sugar at a certain time — these are not random.
      </p>

      <div>
        {items.map((s, i) => (
          <PracticeRow
            key={i}
            title={`${s.symptom} · ${s.organ}`}
            description={s.meaning}
          />
        ))}
      </div>
    </>
  )
}

/* ------------------------------------------------------------------ */
/* Organ Clock SVG                                                     */
/* ------------------------------------------------------------------ */

const CX = 170
const CY = 170
const INNER_R = 68
const OUTER_R = 162
const SEGMENT_GAP_DEG = 0.6

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

function formatClockTime(date) {
  const h = String(date.getHours()).padStart(2, '0')
  const m = String(date.getMinutes()).padStart(2, '0')
  return `${h}:${m}`
}

function OrganClock({ organs, activeIndex, selectedOrgan, now, onSelect }) {
  const timeToDeg = (hours) => (hours / 24) * 360 - 90
  const selectedColour =
    ELEMENT_COLOUR[selectedOrgan.element] || ELEMENT_COLOUR.Metal

  return (
    <div className="mx-auto w-full max-w-[360px]">
      <svg
        viewBox="0 0 340 340"
        className="block h-auto w-full"
        role="img"
        aria-label="Organ clock"
      >
        {/* Segments */}
        {organs.map((organ, i) => {
          const startH = hourOf(organ.time_start)
          const endH = hourOf(organ.time_end)
          const adjustedEnd = endH <= startH ? endH + 24 : endH
          const startDeg = timeToDeg(startH) + SEGMENT_GAP_DEG / 2
          const endDeg = timeToDeg(adjustedEnd) - SEGMENT_GAP_DEG / 2
          const isActive = i === activeIndex
          const d = ringSegmentPath(CX, CY, INNER_R, OUTER_R, startDeg, endDeg)
          const colour = ELEMENT_COLOUR[organ.element] || ELEMENT_COLOUR.Metal
          return (
            <path
              key={i}
              d={d}
              fill={colour}
              stroke={colour}
              strokeWidth={isActive ? 1.5 : 0.5}
              style={{
                fillOpacity: isActive ? 0.65 : 0.22,
                strokeOpacity: isActive ? 1.0 : 0.4,
                cursor: 'pointer',
                transition:
                  'fill-opacity 320ms ease, stroke-opacity 320ms ease',
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.fillOpacity = '0.40'
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.fillOpacity = '0.22'
                }
              }}
              onClick={() => onSelect(i)}
            />
          )
        })}

        {/* Center circle - 68px radius as per CLAUDE.md */}
        <circle
          cx={CX}
          cy={CY}
          r={INNER_R}
          className="clock-center"
          strokeWidth={0.5}
        />

        {/* Line 1: Current time — Cinzel 11px, muted */}
        <text
          x={CX}
          y={CY - 18}
          textAnchor="middle"
          dominantBaseline="middle"
          className="cinzel"
          fontSize="11"
          style={{
            fill: '#7a8a78',
            letterSpacing: '0.1em',
            fontWeight: 300,
          }}
        >
          {formatClockTime(now)}
        </text>

        {/* Line 2: Active organ name — Cinzel 14px, accent colour */}
        <text
          x={CX}
          y={CY + 2}
          textAnchor="middle"
          dominantBaseline="middle"
          className="cinzel"
          fontSize="14"
          style={{
            fill: selectedColour,
            letterSpacing: '0.12em',
            fontWeight: 300,
            textTransform: 'uppercase',
          }}
        >
          {selectedOrgan.organ}
        </text>

        {/* Line 3: "active now" — Cinzel 8px, very muted */}
        <text
          x={CX}
          y={CY + 18}
          textAnchor="middle"
          dominantBaseline="middle"
          className="cinzel"
          fontSize="8"
          style={{
            fill: 'rgba(122,138,120,0.5)',
            letterSpacing: '0.2em',
            fontWeight: 300,
            textTransform: 'lowercase',
          }}
        >
          active now
        </text>
      </svg>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Info panel below clock — sits directly on page background          */
/* ------------------------------------------------------------------ */

function InfoPanel({ organ }) {
  return (
    <div className="mt-6 px-1">
      <p className="cinzel mb-1 text-[10px] uppercase tracking-[0.3em] text-accent">
        {organ.organ} · {organ.time_start}—{organ.time_end}
      </p>

      <p className="cinzel mb-3 text-[18px] font-light tracking-[0.12em] text-heading">
        {organ.element} · {organ.season}
      </p>

      <p className="mb-4 text-[14px] italic leading-[1.82]">
        {organ.description}
      </p>

      {organ.practice && (
        <>
          <p className="cinzel mb-2 text-[9px] uppercase tracking-[0.22em] text-accent/70">
            Practice
          </p>
          <p className="text-[13.5px] leading-[1.74]">{organ.practice}</p>
        </>
      )}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Tabs                                                                */
/* ------------------------------------------------------------------ */

function Tabs({ tabs, active, onChange }) {
  return (
    <div
      className="flex gap-x-7 border-b pb-2"
      style={{
        borderColor: 'color-mix(in srgb, var(--accent) 18%, transparent)',
      }}
      role="tablist"
    >
      {tabs.map((t) => {
        const isActive = active === t.id
        return (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(t.id)}
            className="cinzel pb-1 text-[11px] font-light uppercase tracking-[0.26em] transition-colors"
            style={{
              color: isActive ? 'var(--accent)' : 'var(--muted)',
              borderBottom: isActive
                ? '0.5px solid var(--accent)'
                : '0.5px solid transparent',
              marginBottom: '-9px',
            }}
          >
            {t.label}
          </button>
        )
      })}
    </div>
  )
}
