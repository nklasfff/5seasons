import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import pauseData from '../data/pause_presence.json'
import BreathExercise from '../components/ui/BreathExercise.jsx'
import JournalQuestion from '../components/ui/JournalQuestion.jsx'
import PageHeader from '../components/ui/PageHeader.jsx'
import { seasonClass } from '../lib/seasonClass.js'
import { seasonCardImages } from '../lib/seasonImage.js'

export default function PauseSeasonDetail() {
  const { seasonId } = useParams()
  const { seasonal_practices, breath_practices } = pauseData

  const practice = seasonal_practices.find((sp) => sp.season === seasonId)
  const breathPractice = breath_practices.find(
    (bp) => bp.id === practice?.breath_practice_id,
  )

  useEffect(() => {
    window.scrollTo(0, 0)
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

  return (
    <div className={seasonClass(seasonId)}>
      {/* Back link */}
      <div className="mb-8">
        <Link
          to="/pause"
          className="cinzel text-[10px] uppercase tracking-[0.26em] text-muted transition-colors hover:text-accent"
        >
          ← Pause & Presence
        </Link>
      </div>

      {/* Season header with card image */}
      <div className="mb-10">
        <img
          src={seasonCardImages[seasonId]}
          alt=""
          className="mx-auto mb-6 h-[160px] w-[160px] object-contain"
        />

        <p className="cinzel text-center text-[9px] uppercase tracking-[0.3em] text-muted">
          {practice.element}
        </p>
        <h1 className="cinzel mt-1 text-center text-[22px] font-light uppercase tracking-[0.18em] text-accent">
          {practice.season_name}
        </h1>
        <p className="mt-1 text-center text-[11px] italic text-muted">
          {practice.organs} · {practice.direction}
        </p>
      </div>

      {/* Invitation as lead */}
      <p className="lead mb-8">{practice.invitation}</p>

      {/* Inner practice */}
      {practice.inner_practice && (
        <div className="mb-10">
          <p className="text-[14.5px] leading-[1.8]">{practice.inner_practice}</p>
        </div>
      )}

      {/* Breath practice */}
      {breathPractice && (
        <div className="mb-10">
          <PageHeader label="Breath Practice" />
          <BreathExercise
            title={breathPractice.name}
            suitableFor={breathPractice.suitable_for}
            steps={breathPractice.steps}
            note={breathPractice.note}
          />
          {practice.breath_note && (
            <p className="mt-3 text-[13px] italic leading-[1.7] text-muted">
              {practice.breath_note}
            </p>
          )}
        </div>
      )}

      {/* Journal questions */}
      {practice.journal_questions?.length > 0 && (
        <div className="mb-10">
          <PageHeader label="Journal Questions" />
          <p className="lead mb-6">
            Questions to meet the energy of {practice.season_name.toLowerCase()}
            — write what comes, hold it as long as it serves.
          </p>
          <div>
            {practice.journal_questions.map((question, i) => (
              <JournalQuestion
                key={i}
                seasonId={seasonId}
                number={i + 1}
                question={question}
              />
            ))}
          </div>
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
