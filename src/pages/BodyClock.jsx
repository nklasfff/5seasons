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

function firstSentence(text) {
  if (!text) return ''
  const match = text.match(/^[^.!?]*[.!?]/)
  return match ? match[0] : text
}

export default function BodyClock() {
  const { meta, introduction, organs, daily_rhythm, symptoms_guide } =
    bodyclockData

  const initialIndex = useMemo(
    () => findOrganIndexForHour(organs, new Date().getHours()),
    [organs],
  )
  const [openIndex, setOpenIndex] = useState(initialIndex)
  const [tab, setTab] = useState('rhythm')

  return (
    <div className="spring">
      <Hero
        image={heroImage}
        label="Body Clock"
        title={meta.title}
        subtitle={meta.subtitle}
      />

      {/* Warm italic lead */}
      <p className="lead">{meta.description}</p>
      <p className="mt-5 text-[14.5px] italic leading-[1.86] text-lead">
        {introduction.text[0]}
      </p>

      <Divider />

      {/* Twelve organ windows */}
      <section>
        <h2 className="cinzel text-[11px] font-light uppercase tracking-[0.26em] text-accent">
          The Twelve Organ Windows
        </h2>
        <p className="mt-2 text-[13.5px] italic leading-[1.74] text-muted">
          Twenty-four hours, twelve two-hour windows. The clock begins at
          three in the morning, when the lungs rise first.
        </p>

        <div className="mt-8 space-y-4">
          {organs.map((organ, i) => (
            <OrganCard
              key={i}
              organ={organ}
              open={openIndex === i}
              onToggle={() =>
                setOpenIndex((cur) => (cur === i ? null : i))
              }
            />
          ))}
        </div>
      </section>

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

      <div className="mt-10">
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

/* ------------------------------------------------------------------ */
/* Organ card — themed in its season, collapsible                      */
/* ------------------------------------------------------------------ */

function OrganCard({ organ, open, onToggle }) {
  const seasonId = SEASON_NAME_TO_ID[organ.season] || 'spring'
  const head = firstSentence(organ.description)
  const rest = organ.description.slice(head.length).trim()

  return (
    <article
      className={`${seasonClass(seasonId)} rounded-sm`}
      style={{
        background:
          'color-mix(in srgb, var(--accent-light) 55%, transparent)',
        border:
          '0.5px solid color-mix(in srgb, var(--accent) 20%, transparent)',
      }}
    >
      <button
        type="button"
        onClick={onToggle}
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

        <div className="mt-2 flex items-start justify-between gap-4">
          <h3 className="cinzel text-[17px] font-light uppercase leading-[1.25] tracking-[0.18em] text-accent">
            {organ.organ}
          </h3>
          <span
            className="cinzel mt-[2px] text-[14px] font-light text-muted"
            aria-hidden="true"
          >
            {open ? '−' : '+'}
          </span>
        </div>

        <p className="mt-3 text-[13.5px] italic leading-[1.72] text-lead">
          {head}
        </p>
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
            {rest && <p className="text-[14.5px] leading-[1.8]">{rest}</p>}

            {organ.signs_of_imbalance?.length > 0 && (
              <div className="mt-5">
                <h4 className="cinzel mb-1 text-[10px] font-normal uppercase tracking-[0.25em] text-heading">
                  Signs of Imbalance
                </h4>
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
        </div>
      </div>
    </article>
  )
}

/* ------------------------------------------------------------------ */
/* Rhythm + symptoms                                                   */
/* ------------------------------------------------------------------ */

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
