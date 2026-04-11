import { useMemo, useState } from 'react'
import bodyclockData from '../data/bodyclock.json'
import Hero from '../components/ui/Hero.jsx'
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

// Six time periods grouping the 12 organs
const TIME_PERIODS = [
  {
    id: 'quiet',
    name: 'The Quiet Hours',
    time: '03–07',
    organs: ['Lungs', 'Large Intestine'],
  },
  {
    id: 'morning',
    name: 'Morning Energy',
    time: '07–11',
    organs: ['Stomach', 'Spleen'],
  },
  {
    id: 'heart',
    name: 'The Heart of the Day',
    time: '11–15',
    organs: ['Heart', 'Small Intestine'],
  },
  {
    id: 'descent',
    name: 'Descent into Evening',
    time: '15–19',
    organs: ['Bladder', 'Kidneys'],
  },
  {
    id: 'winddown',
    name: 'The Evening Wind-Down',
    time: '19–23',
    organs: ['Pericardium', 'Triple Warmer'],
  },
  {
    id: 'healing',
    name: 'The Healing Hours',
    time: '23–03',
    organs: ['Gallbladder', 'Liver'],
  },
]

function findActivePeriodIndex() {
  const hour = new Date().getHours()
  if (hour >= 3 && hour < 7) return 0 // Quiet
  if (hour >= 7 && hour < 11) return 1 // Morning
  if (hour >= 11 && hour < 15) return 2 // Heart
  if (hour >= 15 && hour < 19) return 3 // Descent
  if (hour >= 19 && hour < 23) return 4 // Wind-down
  return 5 // Healing (23–03)
}

export default function BodyClock() {
  const { meta, introduction, organs, symptoms_guide, seasons_connection, emotion_and_organs } =
    bodyclockData

  const organsByName = useMemo(
    () => Object.fromEntries(organs.map((o) => [o.organ, o])),
    [organs],
  )

  const activePeriodIndex = useMemo(() => findActivePeriodIndex(), [])
  const [openPeriodId, setOpenPeriodId] = useState(TIME_PERIODS[activePeriodIndex].id)
  const [tab, setTab] = useState(null)

  // Determine current season based on active period
  const activePeriod = TIME_PERIODS[activePeriodIndex]
  const firstOrganName = activePeriod.organs[0]
  const firstOrgan = organsByName[firstOrganName]
  const seasonId = firstOrgan
    ? SEASON_NAME_TO_ID[firstOrgan.season] || 'spring'
    : 'spring'

  const togglePeriod = (id) => {
    setOpenPeriodId((prev) => (prev === id ? null : id))
  }

  return (
    <div className={seasonClass(seasonId)}>
      <Hero
        image={heroImage}
        label="Body Clock"
        title={meta.title}
        subtitle={meta.subtitle}
      />

      {/* Lead paragraph */}
      <p className="lead">
        {introduction.text[0]} {introduction.text[1]}
      </p>

      {/* Timeline of six periods */}
      <div className="mt-10 space-y-3">
        {TIME_PERIODS.map((period, i) => {
          const isActive = i === activePeriodIndex
          const isOpen = openPeriodId === period.id
          const periodOrgans = period.organs.map((name) => organsByName[name])
          const periodSeasonId = periodOrgans[0]
            ? SEASON_NAME_TO_ID[periodOrgans[0].season] || 'spring'
            : 'spring'

          return (
            <TimePeriod
              key={period.id}
              period={period}
              organs={periodOrgans}
              seasonId={periodSeasonId}
              isActive={isActive}
              isOpen={isOpen}
              onToggle={() => togglePeriod(period.id)}
            />
          )
        })}
      </div>

      {/* Three tabs: Symptoms · Seasons · Emotions */}
      <div className="mt-16">
        <Tabs
          tabs={[
            { id: 'symptoms', label: 'Symptoms' },
            { id: 'seasons', label: 'Seasons' },
            { id: 'emotions', label: 'Emotions' },
          ]}
          active={tab}
          onChange={setTab}
        />
      </div>

      {tab && (
        <div className="mt-10">
          {tab === 'symptoms' && <SymptomsTab items={symptoms_guide} />}
          {tab === 'seasons' && <SeasonsTab data={seasons_connection} />}
          {tab === 'emotions' && <EmotionsTab items={emotion_and_organs} />}
        </div>
      )}

      <div className="mt-16 mb-6">
        <p className="cinzel text-center text-[9px] uppercase tracking-[0.3em] text-muted">
          Isabelle Evita Søndergaard
        </p>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Time Period Collapsible                                             */
/* ------------------------------------------------------------------ */

function TimePeriod({ period, organs, seasonId, isActive, isOpen, onToggle }) {
  return (
    <article className={seasonClass(seasonId)}>
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-baseline justify-between gap-4 border-b py-4 text-left transition-colors"
        style={{
          borderColor: 'color-mix(in srgb, var(--accent) 15%, transparent)',
        }}
        aria-expanded={isOpen}
      >
        <div className="flex-1">
          <p
            className="cinzel text-[11px] font-light uppercase tracking-[0.26em]"
            style={{
              color: isActive ? 'var(--accent)' : 'var(--heading)',
            }}
          >
            {period.name}
          </p>
          <p className="mt-1 text-[12px] italic text-muted">
            {period.time} · {period.organs.join(' · ')}
          </p>
        </div>
        <span
          className="cinzel text-[14px] font-light text-muted"
          aria-hidden="true"
        >
          {isOpen ? '−' : '+'}
        </span>
      </button>

      <div className="collapse-grid" data-open={isOpen}>
        <div className="collapse-inner">
          <div className="pb-6 pt-5">
            {organs.map((organ) => (
              <OrganDetail key={organ.organ} organ={organ} />
            ))}
          </div>
        </div>
      </div>
    </article>
  )
}

/* ------------------------------------------------------------------ */
/* Organ Detail (shown inside period)                                 */
/* ------------------------------------------------------------------ */

function OrganDetail({ organ }) {
  return (
    <div className="mb-8 last:mb-0">
      <h3 className="cinzel text-[13px] font-light uppercase tracking-[0.24em] text-accent">
        {organ.organ} · {organ.time_start}—{organ.time_end}
      </h3>
      <p className="mt-1 text-[11px] italic text-muted">
        {organ.element} · {organ.season}
      </p>

      <p className="mt-4 text-[14px] leading-[1.8]">{organ.description}</p>

      {organ.signs_of_imbalance?.length > 0 && (
        <div className="mt-4">
          <p className="cinzel mb-2 text-[9px] uppercase tracking-[0.22em] text-muted">
            Signs of Imbalance
          </p>
          <ul className="space-y-1">
            {organ.signs_of_imbalance.map((sign, i) => (
              <li key={i} className="text-[12.5px] italic leading-[1.7] text-muted">
                {sign}
              </li>
            ))}
          </ul>
        </div>
      )}

      {organ.practice && (
        <InsightBlock label="Practice">{organ.practice}</InsightBlock>
      )}
    </div>
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
/* Seasons Tab                                                         */
/* ------------------------------------------------------------------ */

function SeasonsTab({ data }) {
  return (
    <>
      <p className="lead mb-6">{data.text}</p>

      <div className="space-y-8">
        {data.connections.map((conn) => (
          <div key={conn.season} className={seasonClass(conn.season.toLowerCase().replace(' ', '_'))}>
            <h3 className="cinzel text-[13px] font-light uppercase tracking-[0.24em] text-accent">
              {conn.season} · {conn.element}
            </h3>
            <div className="mt-3">
              {conn.organs.map((organ, i) => (
                <p key={i} className="text-[13px] leading-[1.7]">
                  {organ}
                </p>
              ))}
            </div>
            <p className="mt-3 text-[13.5px] italic leading-[1.75] text-muted">
              {conn.note}
            </p>
          </div>
        ))}
      </div>
    </>
  )
}

/* ------------------------------------------------------------------ */
/* Emotions Tab                                                        */
/* ------------------------------------------------------------------ */

function EmotionsTab({ items }) {
  return (
    <>
      <p className="lead mb-6">
        Each organ holds an emotion. When an organ is balanced, the emotion
        serves us. When strained, the emotion distorts.
      </p>

      <div className="space-y-6">
        {items.map((item) => (
          <div
            key={item.organ}
            className="border-b pb-5 last:border-0"
            style={{
              borderColor: 'color-mix(in srgb, var(--accent) 10%, transparent)',
            }}
          >
            <h3 className="cinzel text-[11px] font-light uppercase tracking-[0.26em] text-accent">
              {item.organ} · {item.emotion}
            </h3>
            <p className="mt-2 text-[13.5px] leading-[1.7]">
              <strong className="font-medium text-heading">Balanced.</strong>{' '}
              {item.balanced}
            </p>
            <p className="mt-2 text-[13.5px] leading-[1.7]">
              <strong className="font-medium text-heading">Imbalanced.</strong>{' '}
              {item.imbalanced}
            </p>
          </div>
        ))}
      </div>
    </>
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
            onClick={() => onChange(isActive ? null : t.id)}
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
