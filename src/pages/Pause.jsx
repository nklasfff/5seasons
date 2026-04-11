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

// TCM-ish month mapping. Matches the Recipes page.
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
    mindfulness,
    the_pause,
    breath,
    breath_practices,
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

  // Active season (only meaningful when Seasons tab is open). Theming wrapper
  // tracks it so the page accent shifts when the user picks a season.
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

      <p className="text-[15px] leading-[1.82]">{meta.description}</p>

      <div className="mt-12">
        <Tabs
          tabs={[
            { id: 'foundations', label: 'Mindfulness & Breath' },
            { id: 'seasons', label: 'The Seasons' },
          ]}
          active={tab}
          onChange={setTab}
        />
      </div>

      <div className="mt-12">
        {tab === 'foundations' ? (
          <FoundationsTab
            mindfulness={mindfulness}
            thePause={the_pause}
            breath={breath}
            practices={generalPractices}
          />
        ) : (
          <SeasonsTab
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

function FoundationsTab({ mindfulness, thePause, breath, practices }) {
  return (
    <>
      {/* Mindfulness */}
      <section>
        <h2 className="cinzel text-[11px] font-light uppercase tracking-[0.26em] text-accent">
          {mindfulness.title}
        </h2>
        <p className="mt-1 text-[11px] italic text-muted">
          {mindfulness.subtitle}
        </p>
        <div className="mt-4 space-y-4">
          {mindfulness.text.map((p, i) => (
            <p key={i} className="text-[14.5px] leading-[1.8]">
              {p}
            </p>
          ))}
        </div>

        {mindfulness.key_insight && (
          <InsightBlock label={mindfulness.key_insight.label}>
            {mindfulness.key_insight.text}
          </InsightBlock>
        )}

        {mindfulness.four_elements && (
          <div className="mt-6">
            <h3 className="cinzel mb-2 text-[10.5px] font-normal uppercase tracking-[0.25em] text-heading">
              Four Elements
            </h3>
            {mindfulness.four_elements.map((el) => (
              <PracticeRow
                key={el.name}
                title={el.name}
                description={el.description}
              />
            ))}
          </div>
        )}
      </section>

      <Divider />

      {/* The Pause */}
      <section>
        <h2 className="cinzel text-[11px] font-light uppercase tracking-[0.26em] text-accent">
          {thePause.title}
        </h2>
        <p className="mt-1 text-[11px] italic text-muted">
          {thePause.subtitle}
        </p>
        <div className="mt-4 space-y-4">
          {thePause.text.map((p, i) => (
            <p key={i} className="text-[14.5px] leading-[1.8]">
              {p}
            </p>
          ))}
        </div>

        <h3 className="cinzel mb-2 mt-6 text-[10.5px] font-normal uppercase tracking-[0.25em] text-heading">
          The Four Kinds of Pause
        </h3>
        <div>
          {thePause.four_kinds.map((k) => (
            <PracticeRow
              key={k.type}
              title={k.type}
              description={k.description}
            />
          ))}
        </div>
      </section>

      <Divider />

      {/* Breath + carousel */}
      <section>
        <h2 className="cinzel text-[11px] font-light uppercase tracking-[0.26em] text-accent">
          {breath.title}
        </h2>
        <p className="mt-1 text-[11px] italic text-muted">{breath.subtitle}</p>
        <div className="mt-4 space-y-4">
          {breath.text.map((p, i) => (
            <p key={i} className="text-[14.5px] leading-[1.8]">
              {p}
            </p>
          ))}
        </div>

        {breath.before_you_begin && (
          <InsightBlock label="Before You Begin">
            {breath.before_you_begin}
          </InsightBlock>
        )}

        <BreathCarousel practices={practices} />
      </section>
    </>
  )
}

function BreathCarousel({ practices }) {
  const [i, setI] = useState(0)
  if (!practices || practices.length === 0) return null
  const current = practices[i]
  const atStart = i === 0
  const atEnd = i === practices.length - 1

  return (
    <div className="mt-8">
      <div
        className="flex items-baseline justify-between border-b pb-3"
        style={{
          borderColor: 'color-mix(in srgb, var(--accent) 20%, transparent)',
        }}
      >
        <p className="cinzel text-[10px] font-light uppercase tracking-[0.26em] text-accent">
          Practice {String(i + 1).padStart(2, '0')} ·{' '}
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
            onClick={() => setI((idx) => Math.min(practices.length - 1, idx + 1))}
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

/* ------------------------------------------------------------------ */
/* Tab 2: The Seasons                                                  */
/* ------------------------------------------------------------------ */

function SeasonsTab({ seasonalPractices, practicesById, selected, onSelect }) {
  const current = seasonalPractices.find((sp) => sp.season === selected)

  return (
    <>
      <SeasonSelector selected={selected} onSelect={onSelect} />

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
