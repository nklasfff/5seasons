import { useMemo, useState } from 'react'
import pauseData from '../data/pause_presence.json'
import Hero from '../components/ui/Hero.jsx'
import Divider from '../components/ui/Divider.jsx'
import InsightBlock from '../components/ui/InsightBlock.jsx'
import PracticeRow from '../components/ui/PracticeRow.jsx'
import BreathExercise from '../components/ui/BreathExercise.jsx'
import JournalQuestion from '../components/ui/JournalQuestion.jsx'
import heroImage from '../assets/images/hero-pause.jpg'
import { seasonClass } from '../lib/seasonClass.js'

const SEASON_ORDER = ['spring', 'summer', 'late_summer', 'autumn', 'winter']
const SEASON_LABELS = {
  spring: 'Spring',
  summer: 'Summer',
  late_summer: 'Late Summer',
  autumn: 'Autumn',
  winter: 'Winter',
}

function getCurrentSeason() {
  const m = new Date().getMonth()
  if (m >= 2 && m <= 4) return 'spring'
  if (m === 5 || m === 6) return 'summer'
  if (m === 7) return 'late_summer'
  if (m >= 8 && m <= 10) return 'autumn'
  return 'winter'
}

export default function Pause() {
  const {
    meta,
    introduction,
    mindfulness,
    the_pause,
    breath,
    breath_practices,
    daily_practice,
    seasonal_practices,
  } = pauseData

  const practicesById = useMemo(
    () => Object.fromEntries(breath_practices.map((p) => [p.id, p])),
    [breath_practices],
  )
  const generalPractices = useMemo(
    () => breath_practices.filter((p) => p.season === 'all'),
    [breath_practices],
  )

  const [tab, setTab] = useState('foundations')
  const [seasonId, setSeasonId] = useState(() => getCurrentSeason())

  const wrapperClass = tab === 'seasons' ? seasonClass(seasonId) : 'spring'

  return (
    <div className={wrapperClass}>
      <Hero
        image={heroImage}
        label="Pause & Presence"
        title={meta.title}
        subtitle={meta.subtitle}
      />

      {/* Warm italic lead */}
      <p className="lead">{meta.description}</p>
      <p className="mt-5 text-[14.5px] italic leading-[1.86] text-lead">
        {introduction.text[0]}
      </p>

      <Divider />

      <Tabs
        tabs={[
          { id: 'foundations', label: 'Mindfulness & Breath' },
          { id: 'seasons', label: 'The Seasons' },
        ]}
        active={tab}
        onChange={setTab}
      />

      <div className="mt-12">
        {tab === 'foundations' ? (
          <FoundationsTab
            intro={introduction.text[2]}
            thePause={the_pause}
            breath={breath}
            practices={generalPractices}
            dailyPractice={daily_practice}
            mindfulness={mindfulness}
          />
        ) : (
          <SeasonsTab
            intro={introduction.text[3]}
            seasonalPractices={seasonal_practices}
            practicesById={practicesById}
            selected={seasonId}
            onSelect={setSeasonId}
          />
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
/* Tab 1: Mindfulness & Breath                                         */
/* ------------------------------------------------------------------ */

function FoundationsTab({
  intro,
  thePause,
  breath,
  practices,
  dailyPractice,
  mindfulness,
}) {
  const [openId, setOpenId] = useState('pause')
  const toggle = (id) => setOpenId((prev) => (prev === id ? null : id))

  const cards = [
    {
      id: 'pause',
      title: 'The Pause',
      oneLine: 'Rest as a radical act',
      render: () => <PauseContent data={thePause} />,
    },
    {
      id: 'breath',
      title: 'Breath',
      oneLine: 'The foundation of every practice',
      render: () => <BreathContent data={breath} practices={practices} />,
    },
    {
      id: 'rhythm',
      title: 'Daily Rhythm',
      oneLine: 'Morning and evening anchors',
      render: () => <DailyRhythmContent data={dailyPractice} />,
    },
    {
      id: 'mindfulness',
      title: 'Mindfulness',
      oneLine: 'Conscious presence, deliberate attention',
      render: () => <MindfulnessContent data={mindfulness} />,
    },
  ]

  return (
    <>
      <p className="text-[14px] italic leading-[1.8] text-lead">{intro}</p>

      <div className="mt-10 space-y-4">
        {cards.map((c) => (
          <ExpandableCard
            key={c.id}
            title={c.title}
            oneLine={c.oneLine}
            open={openId === c.id}
            onToggle={() => toggle(c.id)}
          >
            {c.render()}
          </ExpandableCard>
        ))}
      </div>
    </>
  )
}

function ExpandableCard({ title, oneLine, open, onToggle, children }) {
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
        onClick={onToggle}
        className="flex w-full items-center gap-4 px-6 py-5 text-left"
        aria-expanded={open}
      >
        <div className="min-w-0 flex-1">
          <h3 className="cinzel text-[13px] font-light uppercase tracking-[0.24em] text-accent">
            {title}
          </h3>
          <p className="mt-1.5 text-[12.5px] italic leading-[1.6] text-muted">
            {oneLine}
          </p>
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
            className="border-t px-6 pb-7 pt-5"
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

/* ---------- Mindfulness card content helpers ---------- */

function PauseContent({ data }) {
  return (
    <>
      <div className="space-y-4">
        {data.text.map((p, i) => (
          <p key={i} className="text-[14.5px] leading-[1.8]">
            {p}
          </p>
        ))}
      </div>
      <h4 className="cinzel mb-2 mt-6 text-[10px] font-normal uppercase tracking-[0.25em] text-heading">
        The Four Kinds of Pause
      </h4>
      <div>
        {data.four_kinds.map((k) => (
          <PracticeRow key={k.type} title={k.type} description={k.description} />
        ))}
      </div>
    </>
  )
}

function BreathContent({ data, practices }) {
  return (
    <>
      <div className="space-y-4">
        {data.text.map((p, i) => (
          <p key={i} className="text-[14.5px] leading-[1.8]">
            {p}
          </p>
        ))}
      </div>
      {data.before_you_begin && (
        <InsightBlock label="Before You Begin">
          {data.before_you_begin}
        </InsightBlock>
      )}
      <BreathCarousel practices={practices} />
    </>
  )
}

function BreathCarousel({ practices }) {
  const [i, setI] = useState(0)
  if (!practices?.length) return null
  const current = practices[i]
  const atStart = i === 0
  const atEnd = i === practices.length - 1

  return (
    <div className="mt-6">
      <div
        className="flex items-baseline justify-between border-b pb-3"
        style={{
          borderColor: 'color-mix(in srgb, var(--accent) 20%, transparent)',
        }}
      >
        <p className="cinzel text-[10px] font-light uppercase tracking-[0.26em] text-accent">
          Practice {String(i + 1).padStart(2, '0')}{' '}
          <span className="text-muted">
            of {String(practices.length).padStart(2, '0')}
          </span>
        </p>
        <div className="flex items-center gap-5">
          <button
            type="button"
            onClick={() => setI((idx) => Math.max(0, idx - 1))}
            disabled={atStart}
            className="cinzel text-[10px] uppercase tracking-[0.22em] transition-colors disabled:cursor-not-allowed disabled:opacity-30"
            style={{ color: atStart ? '#5a6a58' : 'var(--accent)' }}
          >
            ← Previous
          </button>
          <button
            type="button"
            onClick={() =>
              setI((idx) => Math.min(practices.length - 1, idx + 1))
            }
            disabled={atEnd}
            className="cinzel text-[10px] uppercase tracking-[0.22em] transition-colors disabled:cursor-not-allowed disabled:opacity-30"
            style={{ color: atEnd ? '#5a6a58' : 'var(--accent)' }}
          >
            Next →
          </button>
        </div>
      </div>
      <BreathExercise
        key={current.id}
        title={current.name}
        suitableFor={current.suitable_for}
        steps={current.steps}
        note={current.note}
      />
    </div>
  )
}

function DailyRhythmContent({ data }) {
  return (
    <>
      <h4 className="cinzel mb-2 text-[10px] font-normal uppercase tracking-[0.25em] text-heading">
        Morning
      </h4>
      <div>
        {data.morning.map((r, i) => (
          <PracticeRow
            key={i}
            title={r.practice}
            description={r.description}
          />
        ))}
      </div>

      <h4 className="cinzel mb-2 mt-6 text-[10px] font-normal uppercase tracking-[0.25em] text-heading">
        Evening
      </h4>
      <div>
        {data.evening.map((r, i) => (
          <PracticeRow
            key={i}
            title={r.practice}
            description={r.description}
          />
        ))}
      </div>

      {data.building_practice_note && (
        <InsightBlock label="Building the Practice">
          {data.building_practice_note}
        </InsightBlock>
      )}
    </>
  )
}

function MindfulnessContent({ data }) {
  return (
    <>
      <div className="space-y-4">
        {data.text.map((p, i) => (
          <p key={i} className="text-[14.5px] leading-[1.8]">
            {p}
          </p>
        ))}
      </div>
      {data.key_insight && (
        <InsightBlock label={data.key_insight.label}>
          {data.key_insight.text}
        </InsightBlock>
      )}
      {data.four_elements && (
        <>
          <h4 className="cinzel mb-2 mt-6 text-[10px] font-normal uppercase tracking-[0.25em] text-heading">
            Four Elements
          </h4>
          <div>
            {data.four_elements.map((el) => (
              <PracticeRow
                key={el.name}
                title={el.name}
                description={el.description}
              />
            ))}
          </div>
        </>
      )}
    </>
  )
}

/* ------------------------------------------------------------------ */
/* Tab 2: Seasons                                                      */
/* ------------------------------------------------------------------ */

function SeasonsTab({
  intro,
  seasonalPractices,
  practicesById,
  selected,
  onSelect,
}) {
  const current = seasonalPractices.find((sp) => sp.season === selected)

  return (
    <>
      <p className="text-[14px] italic leading-[1.8] text-lead">{intro}</p>

      <div className="mt-10">
        <SeasonSelector selected={selected} onSelect={onSelect} />
      </div>

      {current && (
        <div className="mt-10">
          <SeasonalPractice
            practice={current}
            breath={practicesById[current.breath_practice_id]}
          />
        </div>
      )}
    </>
  )
}

function SeasonSelector({ selected, onSelect }) {
  return (
    <div className="flex flex-wrap gap-x-7 gap-y-3">
      {SEASON_ORDER.map((id) => {
        const isActive = selected === id
        return (
          <button
            key={id}
            type="button"
            onClick={() => onSelect(id)}
            className={`${seasonClass(id)} cinzel pb-1 text-[10px] font-light uppercase tracking-[0.26em] transition-colors`}
            style={{
              color: isActive ? 'var(--accent)' : '#5a6a58',
              borderBottom: isActive
                ? '0.5px solid var(--accent)'
                : '0.5px solid transparent',
            }}
            aria-pressed={isActive}
          >
            {SEASON_LABELS[id]}
          </button>
        )
      })}
    </div>
  )
}

function SeasonalPractice({ practice, breath }) {
  return (
    <section>
      <p className="cinzel text-[9px] uppercase tracking-[0.3em] text-muted">
        {practice.element}
      </p>
      <h2 className="cinzel mt-1 text-[19px] font-light uppercase tracking-[0.18em] text-accent">
        {practice.season_name}
      </h2>
      <p
        className="mt-1 text-[11px] italic"
        style={{
          color: 'color-mix(in srgb, var(--accent) 80%, #5a6a58)',
        }}
      >
        {practice.organs} · {practice.direction}
      </p>

      <InsightBlock label="Invitation">{practice.invitation}</InsightBlock>

      {practice.inner_practice && (
        <p className="mt-4 text-[14.5px] leading-[1.8]">
          {practice.inner_practice}
        </p>
      )}

      {breath && (
        <div className="mt-8">
          <h3 className="cinzel mb-2 text-[10.5px] font-normal uppercase tracking-[0.25em] text-heading">
            Breath Practice
          </h3>
          <BreathExercise
            title={breath.name}
            suitableFor={breath.suitable_for}
            steps={breath.steps}
            note={breath.note}
          />
          {practice.breath_note && (
            <p className="mt-2 text-[13px] italic leading-[1.7] text-muted">
              {practice.breath_note}
            </p>
          )}
        </div>
      )}

      {practice.journal_questions?.length > 0 && (
        <div className="mt-10">
          <h3 className="cinzel mb-2 text-[10.5px] font-normal uppercase tracking-[0.25em] text-heading">
            Journal Questions
          </h3>
          <div>
            {practice.journal_questions.map((q, i) => (
              <JournalQuestion key={i} number={i + 1} question={q} />
            ))}
          </div>
        </div>
      )}
    </section>
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
