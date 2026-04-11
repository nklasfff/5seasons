import { useMemo, useState } from 'react'
import bodyclockData from '../data/bodyclock.json'
import Hero from '../components/ui/Hero.jsx'
import InsightBlock from '../components/ui/InsightBlock.jsx'
import PracticeRow from '../components/ui/PracticeRow.jsx'
import StickyNav from '../components/ui/StickyNav.jsx'
import ScrollToTop from '../components/ui/ScrollToTop.jsx'
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
  const { meta, introduction, organs, daily_rhythm, symptoms_guide } = bodyclockData

  const organsByName = useMemo(
    () => Object.fromEntries(organs.map((o) => [o.organ, o])),
    [organs],
  )

  const activePeriodIndex = useMemo(() => findActivePeriodIndex(), [])

  const [activeSection, setActiveSection] = useState('clock')
  const [selectedPeriodIndex, setSelectedPeriodIndex] = useState(null)

  return (
    <div className="spring">
      {/* Back link - only show in period detail */}
      {selectedPeriodIndex !== null && (
        <div className="pt-4 pl-4">
          <button
            type="button"
            onClick={() => setSelectedPeriodIndex(null)}
            className="cinzel text-[9px] uppercase tracking-[0.28em] text-muted transition-colors hover:text-accent"
          >
            ← The Clock
          </button>
        </div>
      )}

      {/* Hero image - no text overlay */}
      <Hero image={heroImage} />

      {/* Title section */}
      <div className="mb-10">
        <h1 className="cinzel text-[22px] font-light uppercase tracking-[0.12em] text-heading md:text-[24px]">
          {meta.title}
        </h1>
        <p className="lead mt-8">
          {introduction.text[0]} {introduction.text[3]}
        </p>
      </div>

      {/* Three navigation buttons */}
      <div className="flex gap-x-7 border-b pb-2" style={{ borderColor: 'color-mix(in srgb, var(--accent) 18%, transparent)' }}>
        <NavButton
          label="The Clock"
          active={activeSection === 'clock'}
          onClick={() => {
            setActiveSection('clock')
            setSelectedPeriodIndex(null)
          }}
        />
        <NavButton
          label="Today's Rhythm"
          active={activeSection === 'rhythm'}
          onClick={() => {
            setActiveSection('rhythm')
            setSelectedPeriodIndex(null)
          }}
        />
        <NavButton
          label="Symptoms"
          active={activeSection === 'symptoms'}
          onClick={() => {
            setActiveSection('symptoms')
            setSelectedPeriodIndex(null)
          }}
        />
      </div>

      {/* Content area */}
      <div className="mt-10 mb-16">
        {activeSection === 'clock' && (
          <TheClockSection
            periods={TIME_PERIODS}
            organsByName={organsByName}
            activePeriodIndex={activePeriodIndex}
            selectedPeriodIndex={selectedPeriodIndex}
            setSelectedPeriodIndex={setSelectedPeriodIndex}
          />
        )}
        {activeSection === 'rhythm' && <TodaysRhythmSection items={daily_rhythm} />}
        {activeSection === 'symptoms' && <SymptomsSection items={symptoms_guide} />}
      </div>

      <div className="mt-16 mb-6">
        <p className="cinzel text-center text-[9px] uppercase tracking-[0.3em] text-muted">
          Isabelle Evita Søndergaard
        </p>
      </div>

      {/* Sticky navigation - only show in period detail */}
      {selectedPeriodIndex !== null && (() => {
        const prevIndex = selectedPeriodIndex === 0 ? TIME_PERIODS.length - 1 : selectedPeriodIndex - 1
        const nextIndex = selectedPeriodIndex === TIME_PERIODS.length - 1 ? 0 : selectedPeriodIndex + 1
        return (
          <StickyNav
            prevLabel={TIME_PERIODS[prevIndex].name}
            prevOnClick={() => setSelectedPeriodIndex(prevIndex)}
            nextLabel={TIME_PERIODS[nextIndex].name}
            nextOnClick={() => setSelectedPeriodIndex(nextIndex)}
            currentLabel={TIME_PERIODS[selectedPeriodIndex].name}
          />
        )
      })()}

      {/* Scroll to top button */}
      <ScrollToTop />
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
/* THE CLOCK Section                                                  */
/* ------------------------------------------------------------------ */

function TheClockSection({
  periods,
  organsByName,
  activePeriodIndex,
  selectedPeriodIndex,
  setSelectedPeriodIndex,
}) {
  // If a period is selected, show its content
  if (selectedPeriodIndex !== null) {
    const period = periods[selectedPeriodIndex]
    const periodOrgans = period.organs.map((name) => organsByName[name])
    const firstOrgan = periodOrgans[0]
    const seasonId = SEASON_NAME_TO_ID[firstOrgan.season] || 'spring'

    const prevIndex = selectedPeriodIndex === 0 ? periods.length - 1 : selectedPeriodIndex - 1
    const nextIndex = selectedPeriodIndex === periods.length - 1 ? 0 : selectedPeriodIndex + 1

    return (
      <div className={seasonClass(seasonId)}>
        <div>
          <h2 className="cinzel text-[20px] font-light uppercase tracking-[0.14em] text-accent">
            {period.name}
          </h2>
          <p className="cinzel mt-1 text-[9px] uppercase tracking-[0.3em] text-muted">
            {period.time}
          </p>
        </div>

        <div className="mt-10 space-y-8">
          {periodOrgans.map((organ) => (
            <div key={organ.organ}>
              <h3 className="cinzel text-[13px] font-light uppercase tracking-[0.24em] text-accent">
                {organ.organ}
              </h3>
              <p className="lead mt-4">{organ.description}</p>
              {organ.practice && (
                <InsightBlock label="Practice">{organ.practice}</InsightBlock>
              )}
            </div>
          ))}
        </div>

      </div>
    )
  }

  // Otherwise, show the list of periods to choose from
  return (
    <div className="space-y-4">
      {periods.map((period, i) => {
        const periodOrgans = period.organs.map((name) => organsByName[name])
        const firstOrgan = periodOrgans[0]
        const seasonId = SEASON_NAME_TO_ID[firstOrgan.season] || 'spring'
        const isActive = i === activePeriodIndex

        return (
          <button
            key={period.id}
            type="button"
            onClick={() => setSelectedPeriodIndex(i)}
            className={`${seasonClass(seasonId)} w-full text-left transition-opacity hover:opacity-75`}
          >
            <p
              className="cinzel text-[13px] font-light uppercase tracking-[0.24em]"
              style={{
                color: isActive ? 'var(--accent)' : 'var(--heading)',
              }}
            >
              {period.name} · {period.time}
            </p>
            <p className="mt-1 text-[12px] italic text-muted">
              {period.organs.join(' · ')}
            </p>
          </button>
        )
      })}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* TODAY'S RHYTHM Section                                             */
/* ------------------------------------------------------------------ */

function TodaysRhythmSection({ items }) {
  return (
    <div>
      <p className="lead mb-8">
        A practical map of the day — what the body clock asks for at each window.
      </p>

      <div>
        {items.map((r, i) => (
          <PracticeRow
            key={i}
            title={`${r.time} · ${r.title}`}
            description={r.guidance}
          />
        ))}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* SYMPTOMS Section                                                   */
/* ------------------------------------------------------------------ */

function SymptomsSection({ items }) {
  return (
    <div>
      <p className="lead mb-8">
        The body clock speaks through symptoms — waking at a particular hour, craving sugar at a certain time.
      </p>

      <div className="space-y-6">
        {items.map((s, i) => (
          <div key={i}>
            <p className="text-[14px] italic leading-[1.7] text-lead">
              {s.symptom} → <span className="cinzel text-[11px] not-italic uppercase tracking-[0.24em] text-accent">{s.organ}</span>
            </p>
            <p className="mt-2 text-[13px] leading-[1.75] text-muted">{s.meaning}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
