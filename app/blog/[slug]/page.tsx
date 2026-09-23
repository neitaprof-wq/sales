import Link from "next/link"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { ArrowLeft } from "lucide-react"
import { SiteHeader } from "@/components/eleaya/site-header"
import { Footer } from "@/components/eleaya/footer"
import { getAllPosts, getPostBySlug } from "@/lib/blog-posts"

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    return {}
  }

  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      url: `/blog/${post.slug}`,
    },
  }
}

function formatDate(date: string) {
  return new Date(`${date}T00:00:00`).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <article className="px-5 py-16 md:px-10 md:py-24">
        <div className="mx-auto max-w-2xl">
          <Link
            href="/blog"
            className="mb-8 inline-flex items-center gap-1.5 font-display text-sm font-600 text-secondary transition-transform hover:-translate-x-1"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            Back to blog
          </Link>
          <span className="font-display text-sm font-600 text-muted-foreground">
            {formatDate(post.date)}
          </span>
          <h1 className="mt-2 text-balance font-display text-4xl font-700 leading-tight tracking-tight md:text-5xl">
            {post.title}
          </h1>
          <div className="mt-8 flex flex-col gap-5">
            {post.content.map((paragraph, i) => (
              <p key={i} className="text-pretty text-lg leading-relaxed text-muted-foreground">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </article>
      <Footer />
    </main>
  )
}
