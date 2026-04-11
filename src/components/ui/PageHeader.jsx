export default function PageHeader({ label }) {
  return (
    <div className="mb-7 flex items-center gap-4">
      <span className="cinzel whitespace-nowrap text-[13px] font-light uppercase tracking-[0.25em] text-accent">
        {label}
      </span>
      <div
        className="h-px flex-1"
        style={{
          background:
            'linear-gradient(to right, color-mix(in srgb, var(--accent) 30%, transparent), transparent)',
        }}
      />
    </div>
  )
}
