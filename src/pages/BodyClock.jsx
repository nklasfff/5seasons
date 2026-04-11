import { useState } from 'react'
import bodyclockData from '../data/bodyclock.json'
import Hero from '../components/ui/Hero.jsx'
import PracticeRow from '../components/ui/PracticeRow.jsx'
import heroImage from '../assets/images/hero-body-clock.jpg'

const SEASON_NAME_TO_ID = {
  Spring: 'spring',
  Summer: 'summer',
  'Late Summer': 'late_summer',
  Autumn: 'autumn',
  Winter: 'winter',
}

export default function BodyClock() {
  const { meta, introduction, organs, daily_rhythm, symptoms_guide, emotion_and_organs } =
    bodyclockData

  const [activeSection, setActiveSection] = useState('clock')
  const [selectedOrganIndex, setSelectedOrganIndex] = useState(null)
  const [activeSubButton, setActiveSubButton] = useState(null)

  return (
    <div className="spring">
      {/* Hero image - no text overlay */}
      <Hero image={heroImage} />

      {/* Title section */}
      <div className="mb-10">
        <h1 className="cinzel text-[22px] font-light uppercase tracking-[0.12em] text-heading md:text-[24px]">
          {meta.title}
        </h1>
        <p className="cinzel mt-1 text-[9px] uppercase tracking-[0.3em] text-muted">
          Twelve organs. Twenty-four hours.
        </p>
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
            setSelectedOrganIndex(null)
            setActiveSubButton(null)
          }}
        />
        <NavButton
          label="Today's Rhythm"
          active={activeSection === 'rhythm'}
          onClick={() => {
            setActiveSection('rhythm')
            setSelectedOrganIndex(null)
            setActiveSubButton(null)
          }}
        />
        <NavButton
          label="Symptoms"
          active={activeSection === 'symptoms'}
          onClick={() => {
            setActiveSection('symptoms')
            setSelectedOrganIndex(null)
            setActiveSubButton(null)
          }}
        />
      </div>

      {/* Content area */}
      <div className="mt-10 mb-16">
        {activeSection === 'clock' && (
          <TheClockSection
            organs={organs}
            emotionData={emotion_and_organs}
            selectedOrganIndex={selectedOrganIndex}
            setSelectedOrganIndex={setSelectedOrganIndex}
            activeSubButton={activeSubButton}
            setActiveSubButton={setActiveSubButton}
          />
        )}
        {activeSection === 'rhythm' && <TodaysRhythmSection items={daily_rhythm} />}
        {activeSection === 'symptoms' && <SymptomsSection items={symptoms_guide} />}
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
/* THE CLOCK Section                                                  */
/* ------------------------------------------------------------------ */

function TheClockSection({
  organs,
  emotionData,
  selectedOrganIndex,
  setSelectedOrganIndex,
  activeSubButton,
  setActiveSubButton,
}) {
  const selectedOrgan = selectedOrganIndex !== null ? organs[selectedOrganIndex] : null
  const organEmotion = selectedOrgan
    ? emotionData.find((e) => e.organ === selectedOrgan.organ)
    : null

  return (
    <div>
      {/* Organ list */}
      <div className="space-y-4">
        {organs.map((organ, i) => {
          const firstSentence = organ.description.split(/[.!?]/)[0] + '.'
          const seasonId = SEASON_NAME_TO_ID[organ.season] || 'spring'
          const isSelected = selectedOrganIndex === i

          return (
            <button
              key={i}
              type="button"
              onClick={() => {
                if (isSelected) {
                  setSelectedOrganIndex(null)
                  setActiveSubButton(null)
                } else {
                  setSelectedOrganIndex(i)
                  setActiveSubButton(null)
                }
              }}
              className={`w-full text-left transition-opacity hover:opacity-75 ${isSelected ? 'opacity-100' : 'opacity-100'}`}
            >
              <p className="cinzel text-[10px] uppercase tracking-[0.26em] text-accent">
                {organ.time_start}–{organ.time_end}
              </p>
              <p className="cinzel mt-1 text-[13px] font-light uppercase tracking-[0.24em] text-heading">
                {organ.organ}
              </p>
              <p className="mt-2 text-[13.5px] leading-[1.7] text-muted">
                {firstSentence}
              </p>
            </button>
          )
        })}
      </div>

      {/* Organ detail panel */}
      {selectedOrgan && (
        <div className="mt-12 space-y-8">
          <div>
            <h2 className="cinzel text-[20px] font-light uppercase tracking-[0.14em] text-accent">
              {selectedOrgan.organ}
            </h2>
            <p className="cinzel mt-1 text-[9px] uppercase tracking-[0.3em] text-muted">
              {selectedOrgan.element} · {selectedOrgan.season}
            </p>
            <p className="lead mt-6">{selectedOrgan.description}</p>
          </div>

          {/* Three sub-buttons */}
          <div className="flex gap-x-7 border-b pb-2" style={{ borderColor: 'color-mix(in srgb, var(--accent) 15%, transparent)' }}>
            <SubButton
              label="Practice"
              active={activeSubButton === 'practice'}
              onClick={() => setActiveSubButton(activeSubButton === 'practice' ? null : 'practice')}
            />
            <SubButton
              label="Imbalance"
              active={activeSubButton === 'imbalance'}
              onClick={() => setActiveSubButton(activeSubButton === 'imbalance' ? null : 'imbalance')}
            />
            <SubButton
              label="Emotion"
              active={activeSubButton === 'emotion'}
              onClick={() => setActiveSubButton(activeSubButton === 'emotion' ? null : 'emotion')}
            />
          </div>

          {/* Sub-button content */}
          {activeSubButton === 'practice' && selectedOrgan.practice && (
            <div className="mt-6">
              <p className="text-[14.5px] leading-[1.8]">{selectedOrgan.practice}</p>
            </div>
          )}

          {activeSubButton === 'imbalance' && selectedOrgan.signs_of_imbalance && (
            <div className="mt-6 space-y-2">
              {selectedOrgan.signs_of_imbalance.map((sign, i) => (
                <p key={i} className="text-[13.5px] leading-[1.75] text-muted">
                  · {sign}
                </p>
              ))}
            </div>
          )}

          {activeSubButton === 'emotion' && organEmotion && (
            <div className="mt-6 space-y-4">
              <div>
                <p className="cinzel text-[10px] uppercase tracking-[0.24em] text-accent">
                  {organEmotion.emotion}
                </p>
                <p className="mt-2 text-[14px] leading-[1.8]">
                  <strong className="font-medium text-heading">Balanced.</strong>{' '}
                  {organEmotion.balanced}
                </p>
              </div>
              <div>
                <p className="text-[14px] leading-[1.8]">
                  <strong className="font-medium text-heading">Imbalanced.</strong>{' '}
                  {organEmotion.imbalanced}
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Sub-Button                                                         */
/* ------------------------------------------------------------------ */

function SubButton({ label, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="cinzel pb-1 text-[10px] font-light uppercase tracking-[0.26em] transition-colors"
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
