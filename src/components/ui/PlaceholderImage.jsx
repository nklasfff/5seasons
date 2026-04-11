export default function PlaceholderImage({ label, className = '' }) {
  return (
    <div
      className={`flex items-center justify-center overflow-hidden ${className}`}
      style={{
        background:
          'linear-gradient(135deg, var(--accent-light), color-mix(in srgb, var(--accent) 12%, #faf8f5))',
        border:
          '0.5px solid color-mix(in srgb, var(--accent) 20%, transparent)',
      }}
    >
      <span className="cinzel px-3 text-center text-[9px] font-light uppercase tracking-[0.28em] text-accent">
        {label}
      </span>
    </div>
  )
}
