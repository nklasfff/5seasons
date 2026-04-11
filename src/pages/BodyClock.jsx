import { useMemo, useState } from 'react'
import bodyclockData from '../data/bodyclock.json'
import PageHeader from '../components/ui/PageHeader.jsx'
import Divider from '../components/ui/Divider.jsx'
import InsightBlock from '../components/ui/InsightBlock.jsx'
import PracticeRow from '../components/ui/PracticeRow.jsx'
import { seasonClass } from '../lib/seasonClass.js'

const SEASON_NAME_TO_ID = {
  Spring: 'spring',
  Summer: 'summer',
  'Late Summer': 'late_summer',
  Autumn: 'autumn',
  Winter: 'winter',
}

// Given an HH:MM string, return the starting hour as an integer.
const hourOf = (t) => parseInt(t.split(':')[0], 10)

// Find the organ whose two-hour window contains the given hour (handles the
// Gallbladder window which wraps midnight).
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
  const { meta, introduction, organs, daily_rhythm, symptoms_guide } =
    bodyclockData

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
      {/* Hero */}
      <PageHeader label="Body Clock" />
      <h1 className="cinzel mb-3 text-[22px] font-light uppercase tracking-[0.12em] text-heading">
        {meta.title}
      </h1>
      <p className="lead">{meta.subtitle}</p>

      <Divider />

      <p className="text-[15px] leading-[1.82]">{meta.description}</p>

      {/* Introduction */}
      <section className="mt-10">
        <h2 className="cinzel text-[11px] font-light uppercase tracking-[0.26em] text-accent">
          {introduction.title}
        </h2>
        <div className="mt-4 space-y-4">
          {introduction.text.map((p, i) => (
            <p key={i} className="text-[14.5px] leading-[1.8]">
              {p}
            </p>
          ))}
        </div>
      </section>

      <Divider />

      {/* 24-hour timeline */}
      <section>
        <h2 className="cinzel text-[11px] font-light uppercase tracking-[0.26em] text-accent">
          The Day in Twelve Windows
        </h2>
        <p className="mt-2 text-[13.5px] italic leading-[1.74] text-muted">
          Tap any window to meet its organ. The clock begins at three in the
          morning, when the lungs rise first.
        </p>

        <Timeline
          organs={organs}
          selectedIndex={index}
          onSelect={setIndex}
        />
      </section>

      {/* Selected organ detail panel */}
      <OrganDetail organ={selected} />

      <Divider />

      {/* Tabs: rhythm / symptoms */}
      <section>
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
      </section>

      <Divider />

      <p className="cinzel text-center text-[9px] uppercase tracking-[0.3em] text-muted">
        Isabelle Evita Søndergaard
      </p>
    </div>
  )
}

function Timeline({ organs, selectedIndex, onSelect }) {
  return (
    <div className="mt-6 grid grid-cols-4 gap-2 sm:grid-cols-6">
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

function OrganDetail({ organ }) {
  return (
    <article
      className="mt-10 rounded-sm p-6"
      style={{
        background: 'var(--accent-light)',
        border:
          '0.5px solid color-mix(in srgb, var(--accent) 22%, transparent)',
      }}
    >
      {/* Header row */}
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

      <p className="mt-4 text-[14.5px] leading-[1.8]">{organ.description}</p>

      {/* Signs of imbalance */}
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

      {/* Practice tip */}
      {organ.practice && (
        <InsightBlock label="Practice">{organ.practice}</InsightBlock>
      )}
    </article>
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
