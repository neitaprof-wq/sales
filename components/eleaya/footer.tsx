import { Heart, Mail, MapPin } from "lucide-react"

const locations = ["DMV", "Atlanta, GA", "North Carolina"]

export function Footer() {
  return (
    <footer className="px-5 py-16 md:px-10 md:py-24">
      <div id="contact" className="mx-auto flex max-w-6xl scroll-mt-20 flex-col items-center gap-6 rounded-4xl border-4 border-card bg-card p-10 text-center shadow-md md:p-16">
        <h2 className="text-balance font-display text-4xl font-700 tracking-tight md:text-5xl">
          Booking &amp; representation
        </h2>
        <p className="max-w-md text-pretty text-lg leading-relaxed text-muted-foreground">
          Talent agents, casting directors, and managers — reach out for auditions, film and TV
          projects, commercials, and modeling bookings. Available for work in the DMV (D.C.,
          Maryland &amp; Virginia), Atlanta, GA, and North Carolina. Full portfolio, resume, and
          availability provided on request.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-2">
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
        <div className="flex flex-wrap items-center justify-center gap-3">
          <a
            href="mailto:eleayaneita@gmail.com"
            className="inline-flex items-center gap-2 rounded-full bg-pink px-6 py-3 font-display font-600 text-pink-foreground shadow-md transition-transform hover:-translate-y-0.5"
          >
            <Mail className="size-5" aria-hidden="true" />
            eleayaneita@gmail.com
          </a>
          <a
            href="https://www.youtube.com/@eleayanevaehlelescorner7327"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-sunny px-6 py-3 font-display font-600 text-sunny-foreground shadow-md transition-transform hover:-translate-y-0.5"
          >
            YouTube: Lele&apos;s Corner
          </a>
        </div>
        <p className="mt-4 flex items-center gap-1.5 font-display text-sm text-muted-foreground">
          Made with <Heart className="size-4 fill-pink text-pink" aria-hidden="true" /> for Eleaya
          Neveah
        </p>
      </div>
    </footer>
  )
}
