import coverImage from '../assets/images/cover-seasons-poster.jpg'

export default function Home() {
  return (
    <div
      className="-mx-6 -mt-7 flex min-h-[calc(100svh-60px)] flex-col overflow-hidden bg-[#1a2820] md:-mx-16 md:-mt-14 md:min-h-screen"
    >
      {/* Image area (top ~75%) */}
      <div className="relative flex-1 bg-[#1a2820]">
        <img
          src={coverImage}
          alt=""
          className="h-full w-full object-cover object-top opacity-[0.88]"
        />
        {/* Soft gradient fade into the dark bottom section */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent to-[#1a2820]" />
      </div>

      {/* Title block (dark bottom ~25%) */}
      <div className="flex flex-col items-center bg-[#1a2820] px-8 pb-10 pt-0 md:px-16">
        <p className="cinzel mb-3 text-[9px] font-light uppercase tracking-[0.38em] text-green-200/55">
          A Companion
        </p>
        <h1 className="cinzel mb-2 text-center text-[22px] font-light uppercase tracking-[0.1em] text-[#e8f0e8]">
          The Energy of the 5 Seasons
        </h1>
        <p className="mb-5 text-center text-[13px] italic text-green-200/75">
          A Guide to Living in Harmony with the Year
        </p>
        <div className="mb-3 h-px w-8 bg-green-200/35" />
        <p className="cinzel text-[9px] uppercase tracking-[0.3em] text-green-200/55">
          Isabelle Evita Søndergaard
        </p>
        <p className="mt-5 max-w-sm text-center text-[11.5px] italic leading-[1.7] text-green-200/72">
          Every season has its own energy, its own organs, and its own
          invitation. When we align with the natural rhythm of the year, we
          stop working against ourselves — and start working with the
          intelligence that is already in us.
        </p>
      </div>
    </div>
  )
}
