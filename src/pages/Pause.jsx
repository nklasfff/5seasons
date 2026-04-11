import pauseData from '../data/pause_presence.json'
import PageHeader from '../components/ui/PageHeader.jsx'
import Divider from '../components/ui/Divider.jsx'
import InsightBlock from '../components/ui/InsightBlock.jsx'
import PracticeRow from '../components/ui/PracticeRow.jsx'
import BreathExercise from '../components/ui/BreathExercise.jsx'
import JournalQuestion from '../components/ui/JournalQuestion.jsx'
import { seasonClass } from '../lib/seasonClass.js'

export default function Pause() {
  const {
    meta,
    mindfulness,
    the_pause,
    breath,
    breath_practices,
    seasonal_practices,
  } = pauseData

  const practicesById = Object.fromEntries(
    breath_practices.map((p) => [p.id, p]),
  )
  const generalPractices = breath_practices.filter((p) => p.season === 'all')

  return (
    <div className="spring">
      {/* Hero header */}
      <PageHeader label="Pause & Presence" />
      <h1 className="cinzel mb-3 text-[22px] font-light uppercase tracking-[0.12em] text-heading">
        {meta.title}
      </h1>
      <p className="lead mb-2">{meta.subtitle}</p>
      <Divider />
      <p className="text-[15px] leading-[1.82]">{meta.description}</p>

      <Divider />

      {/* Part One */}
      <p className="cinzel text-center text-[10px] font-light uppercase tracking-[0.32em] text-muted">
        Part One
      </p>
      <p className="cinzel mt-2 text-center text-[11px] uppercase tracking-[0.26em] text-accent">
        Foundations
      </p>

      {/* Mindfulness */}
      <section className="mt-10">
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

      {/* The four kinds of pause */}
      <section>
        <h2 className="cinzel text-[11px] font-light uppercase tracking-[0.26em] text-accent">
          {the_pause.title}
        </h2>
        <p className="mt-1 text-[11px] italic text-muted">
          {the_pause.subtitle}
        </p>
        <div className="mt-4 space-y-4">
          {the_pause.text.map((p, i) => (
            <p key={i} className="text-[14.5px] leading-[1.8]">
              {p}
            </p>
          ))}
        </div>

        <h3 className="cinzel mb-2 mt-6 text-[10.5px] font-normal uppercase tracking-[0.25em] text-heading">
          The Four Kinds of Pause
        </h3>
        <div>
          {the_pause.four_kinds.map((k) => (
            <PracticeRow
              key={k.type}
              title={k.type}
              description={k.description}
            />
          ))}
        </div>
      </section>

      <Divider />

      {/* Breath practices (general / all-season) */}
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

        <div className="mt-6">
          {generalPractices.map((p) => (
            <BreathExercise
              key={p.id}
              title={p.name}
              suitableFor={p.suitable_for}
              steps={p.steps}
              note={p.note}
            />
          ))}
        </div>
      </section>

      <Divider />

      {/* Part Two */}
      <p className="cinzel text-center text-[10px] font-light uppercase tracking-[0.32em] text-muted">
        Part Two
      </p>
      <p className="cinzel mt-2 text-center text-[11px] uppercase tracking-[0.26em] text-accent">
        The Five Seasons
      </p>

      <div className="mt-8 space-y-16">
        {seasonal_practices.map((sp) => (
          <SeasonalPractice
            key={sp.season}
            practice={sp}
            breath={practicesById[sp.breath_practice_id]}
          />
        ))}
      </div>

      <Divider />

      <p className="cinzel text-center text-[9px] uppercase tracking-[0.3em] text-muted">
        Isabelle Evita Søndergaard
      </p>
    </div>
  )
}

function SeasonalPractice({ practice, breath }) {
  return (
    <section className={seasonClass(practice.season)}>
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

      {/* Breath practice for this season */}
      {breath && (
        <div className="mt-6">
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

      {/* Journal questions */}
      {practice.journal_questions?.length > 0 && (
        <div className="mt-8">
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
