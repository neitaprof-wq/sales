import { MapPin, Sparkles, Star } from "lucide-react"
import { PhotoSlot } from "./photo-slot"

const locations = ["DMV", "Atlanta, GA", "North Carolina"]

export function Hero() {
  return (
    <section
      id="hero"
      className="relative scroll-mt-20 overflow-hidden px-5 pb-16 pt-10 md:px-10 md:pb-24 md:pt-16"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2">
        <div className="flex flex-col gap-6">
          <span className="inline-flex w-fit items-center gap-2 rounded-full bg-cyan/60 px-4 py-1.5 font-display text-sm font-600 text-cyan-foreground">
            <Sparkles className="size-4" aria-hidden="true" />
            Young Actress • Film &amp; TV Talent • Model
          </span>
          <h1 className="text-balance font-display text-5xl font-700 leading-[0.95] tracking-tight md:text-7xl">
            Hi, I&apos;m{" "}
            <span className="text-pink">Eleaya</span>{" "}
            <span className="text-secondary">Neveah</span>
          </h1>
          <p className="max-w-md text-pretty text-lg leading-relaxed text-muted-foreground">
            An 11-year-old aspiring actress and model available for casting in the DMV, Atlanta,
            GA, and North Carolina, ready for film, television, commercials, and print and runway
            modeling. Camera-ready, quick to learn, a proud K-pop fan, and available now for
            casting and representation.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="#gallery"
              className="rounded-full bg-pink px-6 py-3 font-display font-600 text-pink-foreground shadow-md transition-transform hover:-translate-y-0.5"
            >
              View portfolio &amp; headshots
            </a>
            <a
              href="#contact"
              className="rounded-full bg-sunny px-6 py-3 font-display font-600 text-sunny-foreground shadow-md transition-transform hover:-translate-y-0.5"
            >
              Booking &amp; representation
            </a>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-display text-sm font-600 text-muted-foreground">
              Available in
            </span>
            {locations.map((location) => (
              <span
                key={location}
                className="inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1.5 font-display text-sm font-600 text-foreground"
              >
                <MapPin className="size-3.5 text-secondary" aria-hidden="true" />
                {location}
              </span>
            ))}
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-sm md:mx-0 md:max-w-none">
          <div className="absolute -left-2 -top-3 z-10 flex size-12 rotate-[-12deg] items-center justify-center rounded-2xl bg-sunny text-sunny-foreground shadow-lg md:-left-4 md:-top-4 md:size-16">
            <Star className="size-6 fill-current md:size-8" aria-hidden="true" />
          </div>
          <PhotoSlot
            label="Eleaya Neveah"
            src="/images/eleaya-standing.jpg"
            tint="pink"
            className="aspect-[4/5] w-full overflow-hidden rounded-4xl border-4 border-card shadow-xl"
          />
          <div className="absolute -bottom-4 right-1 z-10 rotate-3 rounded-2xl bg-card px-4 py-2.5 text-center font-display text-xs font-600 shadow-lg md:-right-3 md:px-5 md:py-3 md:text-sm">
            <span className="text-secondary">Age 11</span> • DMV • Atlanta • NC
          </div>
        </div>
      </div>
    </section>
  )
}
