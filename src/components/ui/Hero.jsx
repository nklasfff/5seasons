// Shorter hero band used at the top of content pages. Follows the CLAUDE.md
// cover pattern: dark background, image with gentle opacity, soft gradient
// fade at the bottom, title block overlaid. Bleeds out of the Layout padding.
export default function Hero({ image, label, title, subtitle }) {
  return (
    <div className="relative -mx-6 -mt-7 mb-10 h-[240px] overflow-hidden bg-[#1a2820] md:-mx-16 md:-mt-14 md:mb-14 md:h-[320px]">
      <img
        src={image}
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-[0.85]"
      />
      {/* Dark gradient fade at the bottom for legibility */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-44 bg-gradient-to-b from-transparent via-[#1a2820]/70 to-[#1a2820]" />

      <div className="absolute inset-x-0 bottom-0 flex flex-col items-center px-8 pb-8 md:pb-10">
        {label && (
          <p className="cinzel mb-2 text-[9px] font-light uppercase tracking-[0.38em] text-green-200/70">
            {label}
          </p>
        )}
        <h1 className="cinzel text-center text-[20px] font-light uppercase leading-[1.2] tracking-[0.12em] text-[#e8f0e8] md:text-[22px]">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-2 text-center text-[12.5px] italic text-green-200/80">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  )
}
