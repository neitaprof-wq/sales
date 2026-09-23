const highlights = [
  { number: "Film & TV", label: "On-camera ready" },
  { number: "Print & Runway", label: "Modeling experience" },
  { number: "Stage", label: "Trained performer" },
  { number: "Available", label: "For casting now" },
]

export function Highlights() {
  return (
    <section className="px-5 py-16 md:px-10 md:py-20">
      <div className="mx-auto grid max-w-6xl gap-4 rounded-4xl bg-pink p-8 text-pink-foreground sm:grid-cols-2 md:grid-cols-4 md:p-12">
        {highlights.map(({ number, label }) => (
          <div key={label} className="flex flex-col items-center gap-1 text-center">
            <span className="font-display text-2xl font-700 md:text-3xl">{number}</span>
            <span className="font-display text-sm font-600 uppercase tracking-wide opacity-90">
              {label}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}
