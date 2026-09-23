import { PhotoSlot } from "./photo-slot"

export function About() {
  return (
    <section id="about" className="scroll-mt-20 px-5 py-16 md:px-10 md:py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-[1fr_1.2fr]">
        <PhotoSlot
          label="Eleaya Neveah portrait"
          src="/images/eleaya-portrait.jpg"
          tint="cyan"
          className="aspect-square w-full overflow-hidden rounded-4xl border-4 border-card shadow-xl"
        />
        <div className="flex flex-col gap-5">
          <h2 className="font-display text-4xl font-700 tracking-tight md:text-5xl">
            About Eleaya
          </h2>
          <p className="text-pretty text-lg leading-relaxed text-muted-foreground">
            Eleaya Neveah is an 11-year-old aspiring actress and model with a natural presence on
            camera and on stage. She is available for casting in the DMV (Washington, D.C.,
            Maryland &amp; Virginia), Atlanta, GA, and North Carolina, and is happy to travel for
            the right opportunity. She takes direction quickly, memorizes lines with ease, and
            brings warmth and energy to every role — a great fit for film, television, commercials,
            and print and runway modeling. A huge K-pop fan, she loves performing, dance, and
            music, and she shares her world on YouTube. Professional, reliable, and endlessly
            enthusiastic, she is ready for her next casting call.
          </p>
          <ul className="flex flex-wrap gap-3">
            {["Film & TV", "Commercials", "Print modeling", "Runway", "K-pop fan", "Dance & Song"].map((item) => (
              <li
                key={item}
                className="rounded-full bg-muted px-4 py-2 font-display font-600 text-foreground"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
