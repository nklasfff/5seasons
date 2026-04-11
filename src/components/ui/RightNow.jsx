import { useEffect, useMemo, useState } from 'react'
import bodyclockData from '../../data/bodyclock.json'
import PracticeRow from './PracticeRow.jsx'
import { seasonClass } from '../../lib/seasonClass.js'

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

function formatClockTime(date) {
  const h = String(date.getHours()).padStart(2, '0')
  const m = String(date.getMinutes()).padStart(2, '0')
  return `${h}:${m}`
}

export default function RightNow() {
  const { organs } = bodyclockData
  const [now, setNow] = useState(() => new Date())
  const [userSelected, setUserSelected] = useState(null)

  // Tick every minute so the active segment and the hub time stay in sync.
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
  const selectedColour = ELEMENT_COLOUR[selected.element] || '#a8c4d6'
  const seasonId = SEASON_NAME_TO_ID[selected.season] || 'spring'

  const handleSelect = (i) => {
    setUserSelected((prev) => {
      if (i === activeIndex) return null
      return i
    })
  }

  return (
    <div className={seasonClass(seasonId)}>
      <Clock
        organs={organs}
        activeIndex={activeIndex}
        selectedOrgan={selected}
        selectedColour={selectedColour}
        now={now}
        onSelect={handleSelect}
      />

      <WisdomCard organ={selected} colour={selectedColour} />

      {/* Progressive disclosure — signs and today’s rhythm */}
      <div className="mt-6 space-y-4">
        <CollapsibleCard
          title="Signs of Imbalance"
          oneLine={`${selected.signs_of_imbalance.length} signs to recognise`}
        >
          <div>
            {selected.signs_of_imbalance.map((s, i) => (
              <PracticeRow key={i} description={s} />
            ))}
          </div>
        </CollapsibleCard>

        <TodayRhythmCard organs={organs} activeIndex={activeIndex} />
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* SVG clock                                                           */
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

function Clock({
  organs,
  activeIndex,
  selectedOrgan,
  selectedColour,
  now,
  onSelect,
}) {
  const timeToDeg = (hours) => (hours / 24) * 360 - 90

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
          const colour = ELEMENT_COLOUR[organ.element] || '#686870'
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

function WisdomCard({ organ, colour }) {
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
/* Today's rhythm card                                                 */
/* ------------------------------------------------------------------ */

function TodayRhythmCard({ organs, activeIndex }) {
  const reordered = Array.from(
    { length: 12 },
    (_, k) => organs[(activeIndex + k) % 12],
  )

  return (
    <CollapsibleCard title="Today’s Rhythm" oneLine="What is coming">
      <div>
        {reordered.map((organ, k) => {
          const seasonId = SEASON_NAME_TO_ID[organ.season] || 'spring'
          const isNow = k === 0
          return (
            <div
              key={`${organ.organ}-${k}`}
              className={`${seasonClass(seasonId)} flex items-baseline gap-3 border-b py-3 last:border-0`}
              style={{
                borderColor:
                  'color-mix(in srgb, var(--accent) 10%, transparent)',
              }}
            >
              <span className="cinzel min-w-[52px] text-[10px] font-light uppercase tracking-[0.22em] text-accent">
                {organ.time_start}
              </span>
              <span
                className="cinzel flex-1 text-[11px] font-light uppercase tracking-[0.18em]"
                style={{
                  color: isNow ? 'var(--accent)' : 'var(--heading)',
                }}
              >
                {organ.organ}
                {isNow && (
                  <span className="cinzel ml-2 text-[8.5px] tracking-[0.28em] text-muted">
                    NOW
                  </span>
                )}
              </span>
              <span className="cinzel text-[9px] font-light uppercase tracking-[0.24em] text-muted">
                {organ.element}
              </span>
            </div>
          )
        })}
      </div>
    </CollapsibleCard>
  )
}

/* ------------------------------------------------------------------ */
/* Collapsible card (local)                                            */
/* ------------------------------------------------------------------ */

function CollapsibleCard({ title, oneLine, children }) {
  const [open, setOpen] = useState(false)
  return (
    <article
      className="rounded-sm"
      style={{
        background:
          'color-mix(in srgb, var(--accent-light) 55%, transparent)',
        border:
          '0.5px solid color-mix(in srgb, var(--accent) 18%, transparent)',
      }}
    >
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center gap-4 px-6 py-5 text-left"
        aria-expanded={open}
      >
        <div className="min-w-0 flex-1">
          <h4 className="cinzel text-[13px] font-light uppercase tracking-[0.24em] text-accent">
            {title}
          </h4>
          {oneLine && (
            <p className="mt-1.5 text-[12.5px] italic leading-[1.6] text-muted">
              {oneLine}
            </p>
          )}
        </div>
        <span
          className="cinzel text-[14px] font-light text-muted"
          aria-hidden="true"
        >
          {open ? '−' : '+'}
        </span>
      </button>
      <div className="collapse-grid" data-open={open}>
        <div className="collapse-inner">
          <div
            className="border-t px-6 pb-6 pt-5"
            style={{
              borderColor:
                'color-mix(in srgb, var(--accent) 16%, transparent)',
            }}
          >
            {children}
          </div>
        </div>
      </div>
    </article>
  )
}
