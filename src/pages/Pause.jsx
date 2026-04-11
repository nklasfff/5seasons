import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import pauseData from '../data/pause_presence.json'
import Hero from '../components/ui/Hero.jsx'
import InsightBlock from '../components/ui/InsightBlock.jsx'
import PracticeRow from '../components/ui/PracticeRow.jsx'
import BreathExercise from '../components/ui/BreathExercise.jsx'
import heroImage from '../assets/images/hero-pause.jpg'
import { seasonClass } from '../lib/seasonClass.js'
import { seasonCardImages } from '../lib/seasonImage.js'

const SEASON_ORDER = ['spring', 'summer', 'late_summer', 'autumn', 'winter']

export default function Pause() {
  const { meta, mindfulness, the_pause, breath, breath_practices, daily_practice, seasonal_practices } =
    pauseData

  const [tab, setTab] = useState('mindfulness')

  return (
    <div className="spring">
      <Hero
        image={heroImage}
        label="Pause & Presence"
        title={meta.title}
        subtitle={meta.subtitle}
      />

      {/* Lead paragraph */}
      <p className="lead">{meta.description}</p>

      {/* Two tabs */}
      <div className="mt-8">
        <Tabs
          tabs={[
            { id: 'mindfulness', label: 'Mindfulness & Breath' },
            { id: 'seasons', label: 'The Seasons' },
          ]}
          active={tab}
          onChange={setTab}
        />
      </div>

      <div className="mt-10">
        {tab === 'mindfulness' && (
          <MindfulnessTab
            mindfulness={mindfulness}
            thePause={the_pause}
            breath={breath}
            breathPractices={breath_practices}
            dailyPractice={daily_practice}
          />
        )}

        {tab === 'seasons' && (
          <SeasonsTab seasonalPractices={seasonal_practices} />
        )}
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
/* Tab 1: Mindfulness & Breath                                        */
/* ------------------------------------------------------------------ */

function MindfulnessTab({ mindfulness, thePause, breath, breathPractices, dailyPractice }) {
  const [openSection, setOpenSection] = useState(null)

  const toggleSection = (id) => {
    setOpenSection((prev) => (prev === id ? null : id))
  }

  // Get specific breath practices
  const foundationalPractice = breathPractices.find((p) => p.id === 'foundational')
  const abdominalPractice = breathPractices.find((p) => p.id === 'abdominal')
  const nadiPractice = breathPractices.find((p) => p.id === 'nadi_shodhana')

  return (
    <div className="space-y-3">
      {/* Section 1: What Mindfulness Is */}
      <CollapsibleSection
        title="What Mindfulness Is"
        intro="Conscious presence. Deliberate attention."
        isOpen={openSection === 'mindfulness'}
        onToggle={() => toggleSection('mindfulness')}
      >
        <div className="space-y-4">
          {mindfulness.text.map((p, i) => (
            <p key={i} className="text-[14.5px] leading-[1.8]">
              {p}
            </p>
          ))}
        </div>

        <div className="mt-6">
          <h4 className="cinzel mb-2 text-[10px] font-normal uppercase tracking-[0.25em] text-heading">
            Four Elements
          </h4>
          <div>
            {mindfulness.four_elements.map((el) => (
              <PracticeRow
                key={el.name}
                title={el.name}
                description={el.description}
              />
            ))}
          </div>
        </div>

        {mindfulness.key_insight && (
          <InsightBlock label={mindfulness.key_insight.label}>
            {mindfulness.key_insight.text}
          </InsightBlock>
        )}
      </CollapsibleSection>

      {/* Section 2: The Pause */}
      <CollapsibleSection
        title="The Pause"
        intro="Rest as a radical act."
        isOpen={openSection === 'pause'}
        onToggle={() => toggleSection('pause')}
      >
        <div className="space-y-4">
          {thePause.text.map((p, i) => (
            <p key={i} className="text-[14.5px] leading-[1.8]">
              {p}
            </p>
          ))}
        </div>

        <div className="mt-6">
          <h4 className="cinzel mb-2 text-[10px] font-normal uppercase tracking-[0.25em] text-heading">
            The Four Kinds of Pause
          </h4>
          <div>
            {thePause.four_kinds.map((k) => (
              <PracticeRow
                key={k.type}
                title={k.type}
                description={k.description}
              />
            ))}
          </div>
        </div>
      </CollapsibleSection>

      {/* Section 3: The Breath */}
      <CollapsibleSection
        title="The Breath"
        intro="The foundation of every practice."
        isOpen={openSection === 'breath'}
        onToggle={() => toggleSection('breath')}
      >
        <div className="space-y-4">
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

        <div className="mt-6 space-y-6">
          {foundationalPractice && (
            <BreathExercise
              title={foundationalPractice.name}
              suitableFor={foundationalPractice.suitable_for}
              steps={foundationalPractice.steps}
              note={foundationalPractice.note}
            />
          )}
          {abdominalPractice && (
            <BreathExercise
              title={abdominalPractice.name}
              suitableFor={abdominalPractice.suitable_for}
              steps={abdominalPractice.steps}
              note={abdominalPractice.note}
            />
          )}
          {nadiPractice && (
            <BreathExercise
              title={nadiPractice.name}
              suitableFor={nadiPractice.suitable_for}
              steps={nadiPractice.steps}
              note={nadiPractice.note}
            />
          )}
        </div>
      </CollapsibleSection>

      {/* Section 4: A Rhythm to Grow Into */}
      <CollapsibleSection
        title="A Rhythm to Grow Into"
        intro="Morning, midday and evening."
        isOpen={openSection === 'rhythm'}
        onToggle={() => toggleSection('rhythm')}
      >
        <h4 className="cinzel mb-2 text-[10px] font-normal uppercase tracking-[0.25em] text-heading">
          Morning
        </h4>
        <div>
          {dailyPractice.morning.map((r, i) => (
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
          {dailyPractice.evening.map((r, i) => (
            <PracticeRow
              key={i}
              title={r.practice}
              description={r.description}
            />
          ))}
        </div>

        {dailyPractice.building_practice_note && (
          <InsightBlock label="Building the Practice">
            {dailyPractice.building_practice_note}
          </InsightBlock>
        )}
      </CollapsibleSection>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Collapsible Section                                                */
/* ------------------------------------------------------------------ */

function CollapsibleSection({ title, intro, isOpen, onToggle, children }) {
  return (
    <article>
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
          <p className="cinzel text-[11px] font-light uppercase tracking-[0.26em] text-accent">
            {title}
          </p>
          <p className="mt-1 text-[12px] italic text-muted">{intro}</p>
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
          <div className="pb-6 pt-5">{children}</div>
        </div>
      </div>
    </article>
  )
}

/* ------------------------------------------------------------------ */
/* Tab 2: The Seasons                                                 */
/* ------------------------------------------------------------------ */

function SeasonsTab({ seasonalPractices }) {
  return (
    <>
      <p className="lead mb-6">
        Each season carries its own invitation — a way to meet the breath,
        the body, and what you hold inside.
      </p>

      <div className="space-y-6">
        {SEASON_ORDER.map((seasonId) => {
          const practice = seasonalPractices.find((sp) => sp.season === seasonId)
          if (!practice) return null

          return (
            <Link
              key={seasonId}
              to={`/pause/${seasonId}`}
              className={`${seasonClass(seasonId)} flex gap-5 items-start border-b pb-6 last:border-0 transition-opacity hover:opacity-75`}
              style={{
                borderColor:
                  'color-mix(in srgb, var(--accent) 10%, transparent)',
              }}
            >
              <img
                src={seasonCardImages[seasonId]}
                alt=""
                className="w-[110px] h-[110px] object-contain rounded-sm"
              />
              <div className="flex-1 pt-1">
                <p className="cinzel text-[9px] uppercase tracking-[0.3em] text-muted">
                  {practice.element}
                </p>
                <h3 className="cinzel mt-1 text-[16px] font-light uppercase tracking-[0.18em] text-accent">
                  {practice.season_name}
                </h3>
                <p className="mt-3 text-[13.5px] italic leading-[1.75] text-lead">
                  {practice.invitation}
                </p>
              </div>
            </Link>
          )
        })}
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
