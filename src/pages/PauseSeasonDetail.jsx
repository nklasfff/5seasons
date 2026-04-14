import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import pauseData from '../data/pause_presence.json'
import StickyNav from '../components/ui/StickyNav.jsx'
import ScrollToTop from '../components/ui/ScrollToTop.jsx'
import { seasonClass } from '../lib/seasonClass.js'
import { seasonCardImages, seasonCardImagesOld } from '../lib/seasonImage.js'
import { useThemeMode } from '../lib/theme.js'

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
  const mode = useThemeMode()

  const practice = seasonal_practices.find((sp) => sp.season === seasonId)
  const breathPractice = breath_practices.find(
    (bp) => bp.id === practice?.breath_practice_id,
  )

  const [activeSection, setActiveSection] = useState(null)

  useEffect(() => {
    window.scrollTo(0, 0)
    setActiveSection(null)
  }, [seasonId])

  const cardImages = mode === 'dark' ? seasonCardImagesOld : seasonCardImages
  const cardStyle = mode === 'dark' ? {} : { mixBlendMode: 'multiply' }

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
      <img
        src={cardImages[seasonId]}
        alt={practice.season_name}
        className="mx-auto mb-6 w-[180px] object-contain"
        style={cardStyle}
      />

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
        {activeSection === 'breath' && breathPractice && (
          <div className="space-y-8">
            <div>
              <p className="cinzel mb-1 text-[9px] uppercase tracking-[0.28em] text-muted">{breathPractice.suitable_for}</p>
              <h3 className="cinzel text-[15px] font-light uppercase tracking-[0.16em] text-accent mb-6">{breathPractice.name}</h3>
              <div className="space-y-5">
                {breathPractice.steps.map((step, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <span className="cinzel text-[9px] tracking-[0.2em] text-muted flex-shrink-0 mt-1">{String(i + 1).padStart(2, '0')}</span>
                    <p className="text-[14.5px] leading-[1.8]">{step}</p>
                  </div>
                ))}
              </div>
              {breathPractice.note && (
                <p className="mt-6 text-[13px] leading-[1.8] italic text-muted">{breathPractice.note}</p>
              )}
              {practice.breath_note && (
                <p className="mt-4 text-[13px] leading-[1.8] italic text-muted">{practice.breath_note}</p>
              )}
            </div>
            {practice.inner_practice && (
              <div className="border-t pt-8" style={{ borderColor: 'color-mix(in srgb, var(--accent) 15%, transparent)' }}>
                <p className="text-[14.5px] leading-[1.8]">{practice.inner_practice}</p>
              </div>
            )}
          </div>
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
