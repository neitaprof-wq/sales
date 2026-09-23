import { SiteHeader } from "@/components/eleaya/site-header"
import { Hero } from "@/components/eleaya/hero"
import { About } from "@/components/eleaya/about"
import { Talents } from "@/components/eleaya/talents"
import { Gallery } from "@/components/eleaya/gallery"
import { Highlights } from "@/components/eleaya/highlights"
import { Footer } from "@/components/eleaya/footer"

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Eleaya Neveah",
  url: "https://eleayaneveah.com",
  image: "https://eleayaneveah.com/images/eleaya-standing.jpg",
  jobTitle: ["Actress", "Model", "Performer"],
  description:
    "11-year-old aspiring actress and model from the DMV available for film, television, commercials, and print and runway modeling.",
  email: "eleayaneita@gmail.com",
  homeLocation: {
    "@type": "Place",
    name: "DMV (Washington, D.C., Maryland & Virginia)",
    address: {
      "@type": "PostalAddress",
      addressRegion: "DC-MD-VA",
      addressCountry: "US",
    },
  },
  sameAs: ["https://www.youtube.com/@eleayanevaehlelescorner7327"],
  knowsAbout: [
    "Film Acting",
    "Television Acting",
    "Commercial Acting",
    "Print Modeling",
    "Runway Modeling",
    "Dance",
    "Singing",
    "K-pop",
  ],
  worksFor: {
    "@type": "Organization",
    name: "Independent Talent",
  },
}

export default function Page() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <SiteHeader />
      <Hero />
      <About />
      <Talents />
      <Gallery />
      <Highlights />
      <Footer />
    </main>
  )
}
