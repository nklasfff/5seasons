import bodyclockData from '../data/bodyclock.json'
import PageHeader from '../components/ui/PageHeader.jsx'
import Divider from '../components/ui/Divider.jsx'
import InsightBlock from '../components/ui/InsightBlock.jsx'
import PracticeRow from '../components/ui/PracticeRow.jsx'
import { seasonClass } from '../lib/seasonClass.js'

// The organ data uses display-name seasons ("Late Summer") — map to our ids.
const SEASON_NAME_TO_ID = {
  Spring: 'spring',
  Summer: 'summer',
  'Late Summer': 'late_summer',
  Autumn: 'autumn',
  Winter: 'winter',
}

export default function BodyClock() {
  const { meta, introduction, organs, daily_rhythm, symptoms_guide } =
    bodyclockData

  return (
    <div className="spring">
      {/* Hero */}
      <PageHeader label="Body Clock" />
      <h1 className="cinzel mb-3 text-[22px] font-light uppercase tracking-[0.12em] text-heading">
        {meta.title}
      </h1>
      <p className="lead mb-2">{meta.subtitle}</p>
      <Divider />
      <p className="text-[15px] leading-[1.82]">{meta.description}</p>

      <Divider />

      {/* Introduction */}
      <section>
        <h2 className="cinzel text-[11px] font-light uppercase tracking-[0.26em] text-accent">
          {introduction.title}
        </h2>
        <div className="mt-4 space-y-4">
          {introduction.text.map((p, i) => (
            <p key={i} className="text-[14.5px] leading-[1.8]">
              {p}
            </p>
          ))}
        </div>
      </section>

      <Divider />

      {/* Twelve organ windows */}
      <section>
        <h2 className="cinzel text-[11px] font-light uppercase tracking-[0.26em] text-accent">
          The Twelve Organ Windows
        </h2>
        <p className="mt-2 text-[13.5px] italic leading-[1.74] text-muted">
          Twenty-four hours, twelve two-hour windows. One continuous cycle of
          Qi moving through the meridians.
        </p>

        <div className="mt-6 space-y-5">
          {organs.map((organ, i) => (
            <OrganCard key={i} organ={organ} />
          ))}
        </div>
      </section>

      <Divider />

      {/* Daily rhythm */}
      <section>
        <h2 className="cinzel text-[11px] font-light uppercase tracking-[0.26em] text-accent">
          A Daily Rhythm
        </h2>
        <p className="mt-2 text-[13.5px] italic leading-[1.74] text-muted">
          A gentler scaffolding for the day — moments to protect and moments
          to lean into.
        </p>

        <div className="mt-4">
          {daily_rhythm.map((r, i) => (
            <PracticeRow
              key={i}
              title={`${r.time} · ${r.title}`}
              description={r.guidance}
            />
          ))}
        </div>
      </section>

      <Divider />

      {/* Symptoms guide */}
      <section>
        <h2 className="cinzel text-[11px] font-light uppercase tracking-[0.26em] text-accent">
          Symptoms Guide
        </h2>
        <p className="mt-2 text-[13.5px] italic leading-[1.74] text-muted">
          When a symptom recurs at the same time each day, the clock is often
          the first place to look.
        </p>

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2">
          {symptoms_guide.map((s, i) => (
            <SymptomCell key={i} symptom={s} />
          ))}
        </div>
      </section>

      <Divider />

      <p className="cinzel text-center text-[9px] uppercase tracking-[0.3em] text-muted">
        Isabelle Evita Søndergaard
      </p>
    </div>
  )
}

function OrganCard({ organ }) {
  const seasonId = SEASON_NAME_TO_ID[organ.season] || 'spring'

  return (
    <article
      className={`${seasonClass(seasonId)} rounded-sm p-5`}
      style={{
        background: 'var(--accent-light)',
        border:
          '0.5px solid color-mix(in srgb, var(--accent) 22%, transparent)',
      }}
    >
      {/* Header row */}
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <p className="cinzel text-[11px] font-light uppercase tracking-[0.26em] text-accent">
          {organ.time_start} — {organ.time_end}
        </p>
        <p className="cinzel text-[9px] uppercase tracking-[0.28em] text-muted">
          {organ.element} · {organ.season}
        </p>
      </div>

      <h3 className="cinzel mt-2 text-[17px] font-light uppercase tracking-[0.18em] text-accent">
        {organ.organ}
      </h3>

      <p className="mt-3 text-[14px] leading-[1.78]">{organ.description}</p>

      {/* Signs of imbalance */}
      {organ.signs_of_imbalance?.length > 0 && (
        <div className="mt-4">
          <p className="cinzel mb-1 text-[9px] font-light uppercase tracking-[0.24em] text-muted">
            Signs of Imbalance
          </p>
          <div>
            {organ.signs_of_imbalance.map((s, i) => (
              <PracticeRow key={i} description={s} />
            ))}
          </div>
        </div>
      )}

      {/* Practice tip */}
      {organ.practice && (
        <InsightBlock label="Practice">{organ.practice}</InsightBlock>
      )}
    </article>
  )
}

function SymptomCell({ symptom }) {
  return (
    <div
      className="border-b border-r p-4 last:border-b-0 sm:[&:nth-child(even)]:border-r-0"
      style={{
        borderColor: 'color-mix(in srgb, var(--accent) 12%, transparent)',
      }}
    >
      <p className="cinzel mb-1 text-[9px] font-light uppercase tracking-[0.24em] text-accent">
        {symptom.organ}
      </p>
      <h3 className="text-[14px] font-medium leading-[1.45] text-heading">
        {symptom.symptom}
      </h3>
      <p className="mt-1.5 text-[13px] leading-[1.68]">{symptom.meaning}</p>
    </div>
  )
}
