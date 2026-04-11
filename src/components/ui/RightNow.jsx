import { useEffect, useMemo, useState } from 'react'
import bodyclockData from '../../data/bodyclock.json'
import InsightBlock from './InsightBlock.jsx'
import PracticeRow from './PracticeRow.jsx'
import { seasonClass } from '../../lib/seasonClass.js'

const SEASON_NAME_TO_ID = {
  Spring: 'spring',
  Summer: 'summer',
  'Late Summer': 'late_summer',
  Autumn: 'autumn',
  Winter: 'winter',
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

function firstSentence(text) {
  if (!text) return ''
  const m = text.match(/^[^.!?]*[.!?]/)
  return m ? m[0] : text
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

  // Tick every minute so the active segment shifts when a new window begins.
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

  const head = firstSentence(selected.description)
  const rest = selected.description.slice(head.length).trim()

  // Reset user override when the clicked index catches up to the active one,
  // so after a while the page naturally follows the hour again.
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
        selectedIndex={selectedIndex}
        now={now}
        onSelect={handleSelect}
      />

      {/* Selected organ detail */}
      <div className="mt-10 text-center">
        <p className="cinzel text-[9px] font-light uppercase tracking-[0.3em] text-muted">
          {selected.time_start} — {selected.time_end} · {selected.element} ·{' '}
          {selected.season}
        </p>
        <h3 className="cinzel mt-3 text-[26px] font-light uppercase leading-[1.1] tracking-[0.18em] text-accent">
          {selected.organ}
        </h3>
      </div>

      <p className="lead mt-6 text-center">{head}</p>
      {rest && (
        <p className="mt-5 text-[14.5px] leading-[1.8]">{rest}</p>
      )}

      {/* Three collapsible cards */}
      <div className="mt-10 space-y-4">
        <CollapsibleCard
          title="Right Now"
          oneLine="A gentle practice for this hour"
        >
          <InsightBlock label="Practice">{selected.practice}</InsightBlock>
        </CollapsibleCard>

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

const CX = 200
const CY = 200
const INNER_R = 96
const OUTER_R = 146
const ACTIVE_OUTER_R = 156
const SEGMENT_GAP_DEG = 0.7 // thin gap between segments

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

function Clock({ organs, activeIndex, selectedIndex, now, onSelect }) {
  // Convert a time-of-day hour (0-24, may wrap) into an SVG angle where
  // 0h = top (-90°) and we proceed clockwise.
  const timeToDeg = (hours) => (hours / 24) * 360 - 90

  const cardinals = [
    { hour: 0, label: '00' },
    { hour: 6, label: '06' },
    { hour: 12, label: '12' },
    { hour: 18, label: '18' },
  ]

  return (
    <div className="mx-auto w-full max-w-[360px]">
      <svg
        viewBox="0 0 400 400"
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
          const isSelected = i === selectedIndex
          const rOuter = isActive ? ACTIVE_OUTER_R : OUTER_R
          const d = ringSegmentPath(CX, CY, INNER_R, rOuter, startDeg, endDeg)
          const colour = organ.element_colour
          return (
            <path
              key={i}
              d={d}
              fill={colour}
              fillOpacity={isActive ? 0.82 : isSelected ? 0.52 : 0.2}
              stroke={colour}
              strokeOpacity={isActive ? 0.95 : isSelected ? 0.55 : 0.28}
              strokeWidth={isActive ? 1.1 : 0.6}
              style={{
                filter: isActive ? `drop-shadow(0 0 10px ${colour})` : undefined,
                cursor: 'pointer',
                transition:
                  'fill-opacity 320ms ease, stroke-opacity 320ms ease',
              }}
              onClick={() => onSelect(i)}
            />
          )
        })}

        {/* Cardinal time labels outside the outer ring */}
        {cardinals.map(({ hour, label }) => {
          const deg = timeToDeg(hour)
          const { x, y } = polar(CX, CY, ACTIVE_OUTER_R + 18, deg)
          return (
            <text
              key={hour}
              x={x}
              y={y}
              textAnchor="middle"
              dominantBaseline="middle"
              className="cinzel"
              fontSize="10"
              fill="#5a6a58"
              style={{ letterSpacing: '0.22em', fontWeight: 300 }}
            >
              {label}
            </text>
          )
        })}

        {/* Inner hub */}
        <circle
          cx={CX}
          cy={CY}
          r={INNER_R - 8}
          fill="#faf8f5"
          stroke="#182818"
          strokeOpacity={0.06}
          strokeWidth={0.75}
        />

        {/* Current time in the hub */}
        <text
          x={CX}
          y={CY - 4}
          textAnchor="middle"
          dominantBaseline="middle"
          className="cinzel"
          fontSize="17"
          fill="#182818"
          style={{ letterSpacing: '0.18em', fontWeight: 300 }}
        >
          {formatClockTime(now)}
        </text>
        <text
          x={CX}
          y={CY + 18}
          textAnchor="middle"
          dominantBaseline="middle"
          className="cinzel"
          fontSize="8.5"
          fill="#5a6a58"
          style={{ letterSpacing: '0.32em', fontWeight: 300 }}
        >
          RIGHT NOW
        </text>
      </svg>
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
                  color: isNow ? 'var(--accent)' : '#182818',
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
/* Collapsible card (local — keeps RightNow self-contained)            */
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
