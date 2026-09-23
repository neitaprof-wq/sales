import Link from "next/link"
import type { Metadata } from "next"
import { ArrowRight } from "lucide-react"
import { SiteHeader } from "@/components/eleaya/site-header"
import { Footer } from "@/components/eleaya/footer"
import { getAllPosts } from "@/lib/blog-posts"

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Follow Eleaya Neveah's journey through headshot days, K-pop dance, and audition prep — friendly, family-appropriate stories from an aspiring young actress and model.",
  alternates: {
    canonical: "/blog",
  },
}

const tints = ["bg-pink/15", "bg-secondary/20", "bg-accent/25"]

function formatDate(date: string) {
  return new Date(`${date}T00:00:00`).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}

export default function BlogIndexPage() {
  const posts = getAllPosts()

  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <section className="px-5 py-16 md:px-10 md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 flex flex-col gap-3 text-center">
            <h1 className="text-balance font-display text-4xl font-700 tracking-tight md:text-5xl">
              Eleaya&apos;s <span className="text-pink">Blog</span>
            </h1>
            <p className="mx-auto max-w-md text-pretty text-lg leading-relaxed text-muted-foreground">
              Stories from photo shoots, dance practice, and audition prep — straight from Eleaya!
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, i) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex flex-col gap-4 rounded-3xl border-4 border-card bg-card p-6 shadow-md transition-transform hover:-translate-y-1"
              >
                <span
                  className={`h-2 w-16 rounded-full ${tints[i % tints.length]}`}
                  aria-hidden="true"
                />
                <span className="font-display text-sm font-600 text-muted-foreground">
                  {formatDate(post.date)}
                </span>
                <h2 className="font-display text-2xl font-700 leading-tight">{post.title}</h2>
                <p className="leading-relaxed text-muted-foreground">{post.excerpt}</p>
                <span className="mt-auto inline-flex items-center gap-1.5 font-display text-sm font-600 text-secondary transition-transform group-hover:translate-x-1">
                  Read more
                  <ArrowRight className="size-4" aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
