import { Link, useParams, Navigate } from 'react-router-dom'
import seasonsData from '../data/seasons.json'
import PageHeader from '../components/ui/PageHeader.jsx'
import Divider from '../components/ui/Divider.jsx'
import InsightBlock from '../components/ui/InsightBlock.jsx'
import PracticeRow from '../components/ui/PracticeRow.jsx'
import SeasonCard from '../components/ui/SeasonCard.jsx'
import { seasonClass } from '../lib/seasonClass.js'

const ADVICE_LABELS = {
  movement: 'Movement',
  food: 'Food',
  emotional: 'Emotional',
  sleep: 'Sleep',
}

export default function SeasonDetail() {
  const { id } = useParams()
  const season = seasonsData.seasons.find((s) => s.id === id)
  if (!season) return <Navigate to="/seasons" replace />

  const organEntries = Object.entries(season.organ_detail || {})

  return (
    <div className={seasonClass(season.id)}>
      <PageHeader label={season.element + ' · ' + season.name} />

      <Link
        to="/seasons"
        className="cinzel mb-4 inline-block text-[9px] uppercase tracking-[0.28em] text-muted hover:text-accent"
      >
        ← All seasons
      </Link>

      <h1 className="cinzel mb-2 text-[22px] font-light uppercase tracking-[0.12em] text-heading">
        {season.name}
      </h1>
      <p className="lead">{season.description}</p>

      <Divider />

      <SeasonCard season={season} />

      {/* Core emotions */}
      <h2 className="cinzel mt-10 text-[11px] font-light uppercase tracking-[0.26em] text-accent">
        Core Emotion
      </h2>
      <div className="mt-3 grid grid-cols-2 gap-0">
        <div
          className="border-b border-r p-3"
          style={{
            borderColor: 'color-mix(in srgb, var(--accent) 12%, transparent)',
          }}
        >
          <p className="cinzel mb-1 text-[8.5px] uppercase tracking-[0.18em] text-muted">
            Imbalanced
          </p>
          <p className="text-[13px] italic leading-[1.62]">
            {season.core_emotion_imbalanced}
          </p>
        </div>
        <div
          className="border-b p-3"
          style={{
            borderColor: 'color-mix(in srgb, var(--accent) 12%, transparent)',
          }}
        >
          <p className="cinzel mb-1 text-[8.5px] uppercase tracking-[0.18em] text-muted">
            Balanced
          </p>
          <p className="text-[13px] italic leading-[1.62]">
            {season.core_emotion_balanced}
          </p>
        </div>
      </div>

      {/* Organs */}
      {organEntries.length > 0 && (
        <>
          <h2 className="cinzel mt-10 text-[11px] font-light uppercase tracking-[0.26em] text-accent">
            The Organs
          </h2>
          <div className="mt-3 space-y-4">
            {organEntries.map(([organ, text]) => (
              <div key={organ}>
                <h3 className="cinzel mb-1 text-[10.5px] font-normal uppercase tracking-[0.25em] text-heading">
                  {organ.replace('_', ' ')}
                </h3>
                <p className="text-[14px] leading-[1.78]">{text}</p>
              </div>
            ))}
          </div>
        </>
      )}

      <Divider />

      {/* Symptoms */}
      <h2 className="cinzel text-[11px] font-light uppercase tracking-[0.26em] text-accent">
        Signs of Imbalance
      </h2>
      <div className="mt-2">
        {season.symptoms_imbalance.map((s, i) => (
          <PracticeRow key={i} description={s} />
        ))}
      </div>

      {/* Contributing causes */}
      <h2 className="cinzel mt-10 text-[11px] font-light uppercase tracking-[0.26em] text-accent">
        Contributing Causes
      </h2>
      <div className="mt-2">
        {season.contributing_causes.map((c, i) => (
          <PracticeRow key={i} description={c} />
        ))}
      </div>

      <Divider />

      {/* Seasonal advice */}
      <h2 className="cinzel text-[11px] font-light uppercase tracking-[0.26em] text-accent">
        Seasonal Advice
      </h2>
      <div className="mt-3 space-y-2">
        {Object.entries(season.seasonal_advice || {}).map(([key, value]) => (
          <InsightBlock key={key} label={ADVICE_LABELS[key] || key}>
            {value}
          </InsightBlock>
        ))}
      </div>

      {/* Themes */}
      <h2 className="cinzel mt-10 text-[11px] font-light uppercase tracking-[0.26em] text-accent">
        Themes of the Season
      </h2>
      <div className="mt-4 space-y-6">
        {season.themes.map((t) => (
          <div key={t.theme}>
            <h3 className="cinzel mb-1 text-[10.5px] font-normal uppercase tracking-[0.25em] text-heading">
              {t.theme}
            </h3>
            <p className="text-[14px] leading-[1.78]">{t.text}</p>
          </div>
        ))}
      </div>

      <Divider />

      <p className="cinzel text-center text-[9px] uppercase tracking-[0.3em] text-muted">
        {season.name} · {season.element}
      </p>
    </div>
  )
}
