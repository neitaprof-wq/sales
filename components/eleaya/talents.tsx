import { Clapperboard, Camera, Drama, Music } from "lucide-react"

const talents = [
  {
    icon: Clapperboard,
    title: "Film & Television",
    text: "On-camera acting for film, TV, and commercials — expressive, focused, and quick to take direction.",
    color: "bg-pink text-pink-foreground",
  },
  {
    icon: Camera,
    title: "Modeling",
    text: "Print, runway, and lifestyle modeling with fresh, professional headshots and an easy, natural presence.",
    color: "bg-secondary text-secondary-foreground",
  },
  {
    icon: Drama,
    title: "Acting & Theater",
    text: "Bringing characters and stories to life on stage, with strong memorization and comfort in front of an audience.",
    color: "bg-sunny text-sunny-foreground",
  },
  {
    icon: Music,
    title: "Dance & Song",
    text: "Trained in jazz, hip-hop, and contemporary dance, plus singing — versatile talent for musical roles.",
    color: "bg-foreground text-background",
  },
]

export function Talents() {
  return (
    <section id="talents" className="scroll-mt-20 px-5 py-16 md:px-10 md:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex flex-col gap-3 text-center">
          <h2 className="font-display text-4xl font-700 tracking-tight md:text-5xl">
            Skills &amp; specialties
          </h2>
          <p className="mx-auto max-w-md text-pretty text-lg leading-relaxed text-muted-foreground">
            A versatile young talent for film, television, modeling, and the stage — ready for the
            next role.
          </p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {talents.map(({ icon: Icon, title, text, color }) => (
            <div
              key={title}
              className="flex flex-col gap-4 rounded-3xl border-4 border-card bg-card p-6 shadow-md transition-transform hover:-translate-y-1"
            >
              <span className={`flex size-14 items-center justify-center rounded-2xl ${color}`}>
                <Icon className="size-7" aria-hidden="true" />
              </span>
              <h3 className="font-display text-2xl font-700">{title}</h3>
              <p className="leading-relaxed text-muted-foreground">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
