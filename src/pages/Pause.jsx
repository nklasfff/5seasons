import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import pauseData from '../data/pause_presence.json'
import Hero from '../components/ui/Hero.jsx'
import HorizontalNav from '../components/layout/HorizontalNav.jsx'
import InsightBlock from '../components/ui/InsightBlock.jsx'
import PracticeRow from '../components/ui/PracticeRow.jsx'
import heroImage from '../assets/images/hero-pause.jpg'
import { seasonClass } from '../lib/seasonClass.js'
import { seasonCardImages, seasonCardImagesOld } from '../lib/seasonImage.js'
import { useThemeMode } from '../lib/theme.js'

// Four topics for MINDFULNESS & BREATH section
const TOPICS = [
  { id: 'mindfulness', name: 'Mindfulness' },
  { id: 'pause', name: 'The Pause' },
  { id: 'breath', name: 'The Breath' },
  { id: 'rhythm', name: 'A Daily Rhythm' },
]

export default function Pause() {
  const { meta, introduction, mindfulness, the_pause, breath, breath_practices, daily_practice, seasonal_practices } = pauseData
  const mode = useThemeMode()

  const [activeSection, setActiveSection] = useState('mindfulness_breath')
  const [selectedTopicIndex, setSelectedTopicIndex] = useState(null)

  // Get universal breath practices (season: "all")
  const universalBreathPractices = useMemo(
    () => breath_practices.filter((bp) => bp.season === 'all'),
    [breath_practices],
  )

  const cardImages = mode === 'dark' ? seasonCardImagesOld : seasonCardImages
  const cardStyle = mode === 'dark' ? {} : { mixBlendMode: 'multiply' }

  return (
    <div className="spring">
      {/* Hero image - no text overlay */}
      <Hero image={heroImage} />
      <HorizontalNav />

      {/* Title section */}
      <div className="mb-10">
        <h1 className="cinzel text-[22px] font-light uppercase tracking-[0.12em] text-heading md:text-[24px]">
          {meta.title}
        </h1>
        <p className="cinzel mt-1 text-[9px] uppercase tracking-[0.3em] text-muted">
          {meta.subtitle}
        </p>
        <p className="lead mt-8">
          {introduction.text[0]} {introduction.text[1]}
        </p>
      </div>

      {/* Two navigation buttons */}
      <div className="flex gap-x-7 border-b pb-2" style={{ borderColor: 'color-mix(in srgb, var(--accent) 18%, transparent)' }}>
        <NavButton
          label="Mindfulness & Breath"
          active={activeSection === 'mindfulness_breath'}
          onClick={() => {
            setActiveSection('mindfulness_breath')
            setSelectedTopicIndex(null)
          }}
        />
        <NavButton
          label="The Seasons"
          active={activeSection === 'seasons'}
          onClick={() => {
            setActiveSection('seasons')
            setSelectedTopicIndex(null)
          }}
        />
      </div>

      {/* Content area */}
      <div className="mt-10 mb-16">
        {activeSection === 'mindfulness_breath' && (
          <MindfulnessBreathSection
            topics={TOPICS}
            selectedTopicIndex={selectedTopicIndex}
            setSelectedTopicIndex={setSelectedTopicIndex}
            mindfulness={mindfulness}
            thePause={the_pause}
            breath={breath}
            universalBreathPractices={universalBreathPractices}
            dailyPractice={daily_practice}
          />
        )}
        {activeSection === 'seasons' && (
          <SeasonsSection seasonalPractices={seasonal_practices} cardImages={cardImages} cardStyle={cardStyle} />
        )}
      </div>

      <div className="mb-6">
        <p className="cinzel text-center text-[9px] uppercase tracking-[0.3em] text-muted">
          Isabelle Evita Søndergaard
        </p>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Navigation Button                                                  */
/* ------------------------------------------------------------------ */

function NavButton({ label, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="cinzel pb-1 text-[11px] font-light uppercase tracking-[0.26em] transition-colors"
      style={{
        color: active ? 'var(--accent)' : 'var(--muted)',
        borderBottom: active ? '0.5px solid var(--accent)' : '0.5px solid transparent',
        marginBottom: '-9px',
      }}
    >
      {label}
    </button>
  )
}

/* ------------------------------------------------------------------ */
/* MINDFULNESS & BREATH Section                                       */
/* ------------------------------------------------------------------ */

function MindfulnessBreathSection({
  topics,
  selectedTopicIndex,
  setSelectedTopicIndex,
  mindfulness,
  thePause,
  breath,
  universalBreathPractices,
  dailyPractice,
}) {
  // If a topic is selected, show its content
  if (selectedTopicIndex !== null) {
    const topic = topics[selectedTopicIndex]
    const prevIndex = selectedTopicIndex === 0 ? topics.length - 1 : selectedTopicIndex - 1
    const nextIndex = selectedTopicIndex === topics.length - 1 ? 0 : selectedTopicIndex + 1

    return (
      <div>
        {/* Topic 1: MINDFULNESS */}
        {topic.id === 'mindfulness' && (
          <div>
            <h2 className="cinzel text-[20px] font-light uppercase tracking-[0.14em] text-accent">
              {mindfulness.title}
            </h2>
            <p className="lead mt-6">
              {mindfulness.text[0]} {mindfulness.text[1]}
            </p>

            <div className="mt-10">
              {mindfulness.four_elements.map((element) => (
                <PracticeRow
                  key={element.name}
                  title={element.name}
                  description={element.description}
                />
              ))}
            </div>

            <InsightBlock label={mindfulness.key_insight.label}>
              {mindfulness.key_insight.text}
            </InsightBlock>
          </div>
        )}

        {/* Topic 2: THE PAUSE */}
        {topic.id === 'pause' && (
          <div>
            <h2 className="cinzel text-[20px] font-light uppercase tracking-[0.14em] text-accent">
              {thePause.title}
            </h2>
            <p className="lead mt-6">
              {thePause.text[0]}
            </p>

            <div className="mt-10">
              {thePause.four_kinds.map((kind) => (
                <PracticeRow
                  key={kind.type}
                  title={kind.type}
                  description={kind.description}
                />
              ))}
            </div>
          </div>
        )}

        {/* Topic 3: THE BREATH */}
        {topic.id === 'breath' && (
          <div>
            <h2 className="cinzel text-[20px] font-light uppercase tracking-[0.14em] text-accent">
              {breath.title}
            </h2>
            <p className="lead mt-6">
              {breath.text[0]}
            </p>

            <InsightBlock label="Before you begin">
              {breath.before_you_begin}
            </InsightBlock>

            <div className="mt-10 space-y-8">
              {universalBreathPractices.map((practice, i) => (
                <div key={practice.id} className={i > 0 ? 'mt-8' : ''}>
                  <h3 className="cinzel text-[13px] font-light uppercase tracking-[0.24em] text-accent">
                    {practice.name}
                  </h3>
                  <p className="mt-1 text-[12px] italic text-muted">
                    {practice.suitable_for}
                  </p>
                  <ol className="mt-4 list-decimal space-y-2 pl-5 text-[13px] leading-[1.75] text-body">
                    {practice.steps.map((step, idx) => (
                      <li key={idx}>{step}</li>
                    ))}
                  </ol>
                  {practice.note && (
                    <InsightBlock label="Note">
                      {practice.note}
                    </InsightBlock>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Topic 4: A DAILY RHYTHM */}
        {topic.id === 'rhythm' && (
          <div>
            <h2 className="cinzel text-[20px] font-light uppercase tracking-[0.14em] text-accent">
              {dailyPractice.title}
            </h2>

            <div className="mt-10">
              <h3 className="cinzel mb-4 text-[13px] font-light uppercase tracking-[0.24em] text-accent">
                Morning
              </h3>
              {dailyPractice.morning.map((item) => (
                <PracticeRow
                  key={item.practice}
                  title={item.practice}
                  description={item.description}
                />
              ))}
            </div>

            <div className="mt-10">
              <h3 className="cinzel mb-4 text-[13px] font-light uppercase tracking-[0.24em] text-accent">
                Evening
              </h3>
              {dailyPractice.evening.map((item) => (
                <PracticeRow
                  key={item.practice}
                  title={item.practice}
                  description={item.description}
                />
              ))}
            </div>

            <InsightBlock label="Building a practice">
              {dailyPractice.building_practice_note}
            </InsightBlock>
          </div>
        )}

        {/* Topic navigation */}
        <div className="mt-12 flex items-center justify-center gap-8">
          <button
            type="button"
            onClick={() => setSelectedTopicIndex(prevIndex)}
            className="cinzel text-[10px] uppercase tracking-[0.26em] text-muted transition-colors hover:text-accent"
          >
            ← {topics[prevIndex].name}
          </button>
          <button
            type="button"
            onClick={() => setSelectedTopicIndex(nextIndex)}
            className="cinzel text-[10px] uppercase tracking-[0.26em] text-muted transition-colors hover:text-accent"
          >
            {topics[nextIndex].name} →
          </button>
        </div>
      </div>
    )
  }

  // Otherwise, show the list of topics to choose from
  return (
    <div className="space-y-4">
      {topics.map((topic, i) => (
        <button
          key={topic.id}
          type="button"
          onClick={() => setSelectedTopicIndex(i)}
          className="w-full text-left transition-opacity hover:opacity-75"
        >
          <p className="cinzel text-[13px] font-light uppercase tracking-[0.24em] text-heading">
            {topic.name}
          </p>
        </button>
      ))}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* THE SEASONS Section                                                */
/* ------------------------------------------------------------------ */

function SeasonsSection({ seasonalPractices, cardImages, cardStyle }) {
  return (
    <div className="flex flex-col" style={{ background: 'transparent' }}>
      {seasonalPractices.map((practice) => {
        const seasonId = practice.season

        return (
          <Link
            key={practice.season}
            to={`/pause/${practice.season}`}
            className={`group block ${seasonClass(seasonId)}`}
          >
            <article
              className="flex items-start gap-5 border-b py-6 transition-colors"
              style={{
                borderColor: 'color-mix(in srgb, var(--accent) 18%, transparent)',
                background: 'transparent',
              }}
            >
              <img
                src={cardImages[seasonId]}
                alt=""
                className="h-[124px] w-[124px] flex-shrink-0 object-contain"
                style={cardStyle}
              />
              <div className="min-w-0 flex-1">
                <p className="cinzel text-[9px] uppercase tracking-[0.3em] text-muted">
                  {practice.element}
                </p>
                <h2 className="cinzel mt-1 text-[19px] font-light uppercase tracking-[0.18em] text-accent">
                  {practice.season_name}
                </h2>
                <p className="mt-3 line-clamp-3 text-[13.5px] leading-[1.7] text-body">
                  {practice.invitation}
                </p>
              </div>
            </article>
          </Link>
        )
      })}
    </div>
  )
}
