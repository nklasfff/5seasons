import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import pauseData from '../data/pause_presence.json'
import InsightBlock from '../components/ui/InsightBlock.jsx'
import PracticeRow from '../components/ui/PracticeRow.jsx'
import StickyNav from '../components/ui/StickyNav.jsx'
import ScrollToTop from '../components/ui/ScrollToTop.jsx'
import cardSpring from '../assets/images/card-spring.png'
import cardSummer from '../assets/images/card-summer.png'
import cardLateSummer from '../assets/images/card-latesummer.png'
import cardAutumn from '../assets/images/card-autumn.png'
import cardWinter from '../assets/images/card-winter.png'
import { seasonClass } from '../lib/seasonClass.js'

const SEASON_CARDS = {
  spring: cardSpring,
  summer: cardSummer,
  late_summer: cardLateSummer,
  autumn: cardAutumn,
  winter: cardWinter,
}

const SEASON_ORDER = ['spring', 'summer', 'late_summer', 'autumn', 'winter']
const SEASON_NAMES = {
  spring: 'Spring',
  summer: 'Summer',
  late_summer: 'Late Summer',
  autumn: 'Autumn',
  winter: 'Winter',
}

export default function PauseSeasonDetail() {
  const { seasonId } = useParams()
  const { seasonal_practices, breath_practices } = pauseData

  const practice = seasonal_practices.find((sp) => sp.season === seasonId)
  const breathPractice = breath_practices.find(
    (bp) => bp.id === practice?.breath_practice_id,
  )

  const [activeSection, setActiveSection] = useState(null)

  useEffect(() => {
    window.scrollTo(0, 0)
    setActiveSection(null)
  }, [seasonId])

  if (!practice) {
    return (
      <div className="spring">
        <div className="py-16 text-center">
          <p className="text-[14px] italic text-muted">Season not found.</p>
          <Link
            to="/pause"
            className="cinzel mt-4 inline-block text-[10px] uppercase tracking-[0.26em] text-accent"
          >
            ← Back to Pause
          </Link>
        </div>
      </div>
    )
  }

  // Get previous and next season
  const currentIndex = SEASON_ORDER.indexOf(seasonId)
  const prevSeasonId = currentIndex === 0 ? SEASON_ORDER[SEASON_ORDER.length - 1] : SEASON_ORDER[currentIndex - 1]
  const nextSeasonId = currentIndex === SEASON_ORDER.length - 1 ? SEASON_ORDER[0] : SEASON_ORDER[currentIndex + 1]

  return (
    <div className={seasonClass(seasonId)} style={{ background: 'transparent' }}>
      {/* Back link */}
      <div className="pt-4 pl-4">
        <Link
          to="/pause"
          className="cinzel text-[9px] uppercase tracking-[0.28em] text-muted transition-colors hover:text-accent"
        >
          ← All Seasons
        </Link>
      </div>

      {/* Season card image - 180px centered */}
      <div className="mx-auto mb-6 h-[180px] w-[180px]" style={{ background: '#faf8f5' }}>
        <img
          src={SEASON_CARDS[seasonId]}
          alt={practice.season_name}
          className="h-full w-full object-contain"
        />
      </div>

      {/* Season name and element */}
      <h1 className="cinzel text-center text-[22px] font-light uppercase tracking-[0.14em] text-accent md:text-[24px]">
        {practice.season_name}
      </h1>
      <p className="cinzel mt-1 text-center text-[9px] uppercase tracking-[0.3em] text-muted">
        {practice.element}
      </p>

      {/* Invitation text - always visible */}
      <p className="lead mt-8">
        {practice.invitation}
      </p>

      {/* Two navigation buttons */}
      <div className="mt-10 flex gap-x-7 border-b pb-2" style={{ borderColor: 'color-mix(in srgb, var(--accent) 18%, transparent)' }}>
        <NavButton
          label="Breath Practice"
          active={activeSection === 'breath'}
          onClick={() => setActiveSection('breath')}
        />
        <NavButton
          label="Journal"
          active={activeSection === 'journal'}
          onClick={() => setActiveSection('journal')}
        />
      </div>

      {/* Content area */}
      <div className="mt-10 mb-16">
        {activeSection === 'breath' && (
          <BreathPracticeSection
            breathPractice={breathPractice}
            breathNote={practice.breath_note}
          />
        )}
        {activeSection === 'journal' && (
          <JournalSection
            seasonId={seasonId}
            questions={practice.journal_questions}
          />
        )}
      </div>

      <div className="mt-16 mb-6">
        <p className="cinzel text-center text-[9px] uppercase tracking-[0.3em] text-muted">
          Isabelle Evita Søndergaard
        </p>
      </div>

      {/* Sticky bottom navigation */}
      <StickyNav
        prevLabel={SEASON_NAMES[prevSeasonId]}
        prevUrl={`/pause/${prevSeasonId}`}
        nextLabel={SEASON_NAMES[nextSeasonId]}
        nextUrl={`/pause/${nextSeasonId}`}
        currentLabel={practice.season_name}
      />

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
/* BREATH PRACTICE Section                                            */
/* ------------------------------------------------------------------ */

function BreathPracticeSection({ breathPractice, breathNote }) {
  if (!breathPractice) {
    return (
      <p className="text-[14px] italic text-muted">
        No breath practice available for this season.
      </p>
    )
  }

  return (
    <div>
      <h2 className="cinzel text-[20px] font-light uppercase tracking-[0.14em] text-accent">
        {breathPractice.name}
      </h2>
      <p className="mt-2 text-[12px] italic text-muted">
        {breathPractice.suitable_for}
      </p>

      <div className="mt-10">
        {breathPractice.steps.map((step, i) => (
          <PracticeRow
            key={i}
            title={`${i + 1}.`}
            description={step}
          />
        ))}
      </div>

      {breathPractice.note && (
        <InsightBlock label="Note">
          {breathPractice.note}
        </InsightBlock>
      )}

      {breathNote && (
        <div className="mt-6">
          <p className="text-[13px] italic leading-[1.75] text-muted">
            {breathNote}
          </p>
        </div>
      )}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* JOURNAL Section                                                    */
/* ------------------------------------------------------------------ */

function JournalSection({ seasonId, questions }) {
  if (!questions || questions.length === 0) {
    return (
      <p className="text-[14px] italic text-muted">
        No journal questions available for this season.
      </p>
    )
  }

  return (
    <div className="space-y-8">
      {questions.map((question, i) => (
        <JournalQuestion
          key={i}
          seasonId={seasonId}
          index={i}
          question={question}
        />
      ))}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Journal Question with localStorage                                 */
/* ------------------------------------------------------------------ */

function JournalQuestion({ seasonId, index, question }) {
  const storageKey = `pause_journal_${seasonId}_${index}`
  const [value, setValue] = useState('')
  const [showSaved, setShowSaved] = useState(false)

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey)
      if (saved) {
        setValue(saved)
      }
    } catch (e) {
      // localStorage not available
    }
  }, [storageKey])

  // Save to localStorage on change
  const handleChange = (e) => {
    const newValue = e.target.value
    setValue(newValue)

    try {
      localStorage.setItem(storageKey, newValue)
      setShowSaved(true)
      setTimeout(() => setShowSaved(false), 2000)
    } catch (e) {
      // localStorage not available
    }
  }

  return (
    <div>
      <p className="mb-3 text-[14px] italic leading-[1.7] text-lead">
        {question}
      </p>
      <textarea
        value={value}
        onChange={handleChange}
        placeholder="Write here..."
        rows={4}
        className="w-full resize-none border-0 border-b bg-transparent px-0 py-2 text-[13px] leading-[1.75] text-body placeholder-italic placeholder-muted focus:outline-none focus:ring-0"
        style={{
          borderColor: 'color-mix(in srgb, var(--accent) 20%, transparent)',
        }}
      />
      {showSaved && (
        <p className="cinzel mt-2 text-[9px] uppercase tracking-[0.3em] text-muted opacity-100 transition-opacity">
          Saved
        </p>
      )}
    </div>
  )
}
