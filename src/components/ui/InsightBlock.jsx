export default function InsightBlock({ label, children }) {
  return (
    <div
      className="my-4 rounded-r px-4 py-3"
      style={{
        background: 'color-mix(in srgb, var(--accent-light) 55%, transparent)',
        borderLeft: '2px solid color-mix(in srgb, var(--accent) 35%, transparent)',
      }}
    >
      {label && (
        <p className="cinzel mb-2 text-[9px] font-light uppercase tracking-[0.28em] text-accent">
          {label}
        </p>
      )}
      <p className="text-[13.5px] italic leading-[1.74] text-lead">{children}</p>
    </div>
  )
}
