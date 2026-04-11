import { useMemo, useState } from 'react'
import bodyclockData from '../data/bodyclock.json'
import Hero from '../components/ui/Hero.jsx'
import Divider from '../components/ui/Divider.jsx'
import InsightBlock from '../components/ui/InsightBlock.jsx'
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

// Return the first sentence of a paragraph (fall back to the whole thing).
function firstSentence(text) {
  if (!text) return ''
  const match = text.match(/^[^.!?]*[.!?]/)
  return match ? match[0] : text
}

export default function BodyClock() {
  const { meta, organs, daily_rhythm, symptoms_guide } = bodyclockData

  const initialIndex = useMemo(
    () => findOrganIndexForHour(organs, new Date().getHours()),
    [organs],
  )
  const [index, setIndex] = useState(initialIndex)
  const [tab, setTab] = useState('rhythm')

  const selected = organs[index]
  const selectedSeasonId = SEASON_NAME_TO_ID[selected.season] || 'spring'

  return (
    <div className={seasonClass(selectedSeasonId)}>
      <Hero
        image={heroImage}
        label="Body Clock"
        title={meta.title}
        subtitle={meta.subtitle}
      />

      {/* 24-hour timeline */}
      <Timeline
        organs={organs}
        selectedIndex={index}
        onSelect={setIndex}
      />

      {/* Selected organ — collapsed by default */}
      <OrganCard key={index} organ={selected} />

      <Divider />

      {/* Daily rhythm + symptoms behind tabs */}
      <Tabs
        tabs={[
          { id: 'rhythm', label: 'Daily Rhythm' },
          { id: 'symptoms', label: 'Symptoms Guide' },
        ]}
        active={tab}
        onChange={setTab}
      />

      <div className="mt-8">
        {tab === 'rhythm' ? (
          <DailyRhythm items={daily_rhythm} />
        ) : (
          <SymptomsGuide items={symptoms_guide} />
        )}
      </div>

      <Divider />

      <p className="cinzel text-center text-[9px] uppercase tracking-[0.3em] text-muted">
        Isabelle Evita Søndergaard
      </p>
    </div>
  )
}

function Timeline({ organs, selectedIndex, onSelect }) {
  return (
    <div className="grid grid-cols-4 gap-2 sm:grid-cols-6">
      {organs.map((organ, i) => {
        const seasonId = SEASON_NAME_TO_ID[organ.season] || 'spring'
        const isActive = i === selectedIndex
        return (
          <button
            key={i}
            type="button"
            onClick={() => onSelect(i)}
            className={`${seasonClass(seasonId)} flex flex-col items-center gap-1 rounded-sm px-2 py-3 text-center transition-colors`}
            style={{
              background: isActive
                ? 'var(--accent-light)'
                : 'color-mix(in srgb, var(--accent-light) 40%, transparent)',
              border: isActive
                ? '0.5px solid var(--accent)'
                : '0.5px solid color-mix(in srgb, var(--accent) 18%, transparent)',
            }}
            aria-pressed={isActive}
          >
            <span
              className="cinzel text-[9px] font-light uppercase tracking-[0.22em]"
              style={{
                color: isActive
                  ? 'var(--accent)'
                  : 'color-mix(in srgb, var(--accent) 55%, #5a6a58)',
              }}
            >
              {organ.time_start}
            </span>
            <span
              className="cinzel text-[9px] font-light uppercase leading-[1.25] tracking-[0.14em]"
              style={{
                color: isActive ? 'var(--accent)' : '#182818',
              }}
            >
              {organ.organ}
            </span>
          </button>
        )
      })}
    </div>
  )
}

function OrganCard({ organ }) {
  const [open, setOpen] = useState(false)
  const oneLine = firstSentence(organ.description)
  const rest = organ.description.slice(oneLine.length).trim()

  return (
    <article
      className="mt-10 rounded-sm"
      style={{
        background: 'var(--accent-light)',
        border:
          '0.5px solid color-mix(in srgb, var(--accent) 22%, transparent)',
      }}
    >
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full px-6 py-5 text-left"
        aria-expanded={open}
      >
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <p className="cinzel text-[11px] font-light uppercase tracking-[0.26em] text-accent">
            {organ.time_start} — {organ.time_end}
          </p>
          <p className="cinzel text-[9px] uppercase tracking-[0.28em] text-muted">
            {organ.element} · {organ.season}
          </p>
        </div>
        <h3 className="cinzel mt-2 text-[19px] font-light uppercase tracking-[0.18em] text-accent">
          {organ.organ}
        </h3>
        <p className="mt-3 text-[13.5px] italic leading-[1.72] text-lead">
          {oneLine}
        </p>
        <div className="mt-4 flex items-center gap-2">
          <span className="cinzel text-[9px] font-light uppercase tracking-[0.24em] text-muted">
            {open ? 'Hide detail' : 'Read more'}
          </span>
          <span
            className="cinzel text-[12px] font-light text-muted"
            aria-hidden="true"
          >
            {open ? '−' : '+'}
          </span>
        </div>
      </button>

      {open && (
        <div
          className="border-t px-6 pb-6 pt-5"
          style={{
            borderColor:
              'color-mix(in srgb, var(--accent) 16%, transparent)',
          }}
        >
          {rest && (
            <p className="text-[14.5px] leading-[1.8]">{rest}</p>
          )}

          {organ.signs_of_imbalance?.length > 0 && (
            <div className="mt-5">
              <p className="cinzel mb-1 text-[9px] font-light uppercase tracking-[0.24em] text-muted">
                Signs of Imbalance
              </p>
              <div>
                {organ.signs_of_imbalance.map((s, i) => (
                  <PracticeRow key={i} description={s} />
                ))}
              </div>
            </div>
          )}

          {organ.practice && (
            <InsightBlock label="Practice">{organ.practice}</InsightBlock>
          )}
        </div>
      )}
    </article>
  )
}

function DailyRhythm({ items }) {
  return (
    <div>
      {items.map((r, i) => (
        <PracticeRow
          key={i}
          title={`${r.time} · ${r.title}`}
          description={r.guidance}
        />
      ))}
    </div>
  )
}

function SymptomsGuide({ items }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2">
      {items.map((s, i) => (
        <div
          key={i}
          className="border-b border-r p-4 last:border-b-0 sm:[&:nth-child(even)]:border-r-0"
          style={{
            borderColor:
              'color-mix(in srgb, var(--accent) 12%, transparent)',
          }}
        >
          <p className="cinzel mb-1 text-[9px] font-light uppercase tracking-[0.24em] text-accent">
            {s.organ}
          </p>
          <h3 className="text-[14px] font-medium leading-[1.45] text-heading">
            {s.symptom}
          </h3>
          <p className="mt-1.5 text-[13px] leading-[1.68]">{s.meaning}</p>
        </div>
      ))}
    </div>
  )
}

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
            className="cinzel pb-1 text-[10px] font-light uppercase tracking-[0.26em] transition-colors"
            style={{
              color: isActive ? 'var(--accent)' : '#5a6a58',
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
