import { PhotoSlot } from "./photo-slot"

const slots = [
  {
    label: "Eleaya Neveah full-length modeling headshot",
    src: "/images/eleaya-standing.jpg",
    tint: "pink" as const,
    span: "col-span-2 row-span-2",
  },
  {
    label: "Eleaya Neveah fashion modeling pose",
    src: "/images/eleaya-pose.jpg",
    tint: "cyan" as const,
    span: "",
  },
  {
    label: "Eleaya Neveah acting headshot portrait",
    src: "/images/eleaya-portrait.jpg",
    tint: "plum" as const,
    span: "",
  },
]

export function Gallery() {
  return (
    <section id="gallery" className="scroll-mt-20 bg-muted/50 px-5 py-16 md:px-10 md:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex flex-col gap-3">
          <h2 className="font-display text-4xl font-700 tracking-tight md:text-5xl">
            Portfolio &amp; headshots
          </h2>
          <p className="max-w-md text-pretty text-lg leading-relaxed text-muted-foreground">
            Professional headshots and modeling photos of Eleaya Neveah for casting directors and
            talent agents.
          </p>
        </div>
        <div className="grid auto-rows-[160px] grid-cols-2 gap-4 sm:auto-rows-[220px] md:grid-cols-3">
          {slots.map((slot, i) => (
            <PhotoSlot
              key={i}
              label={slot.label}
              src={slot.src}
              tint={slot.tint}
              className={`h-full w-full overflow-hidden rounded-3xl border-4 border-card shadow-md ${slot.span}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
