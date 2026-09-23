"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"

const navLinks = [
  { label: "Home", href: "/#hero" },
  { label: "About", href: "/#about" },
  { label: "Skills", href: "/#talents" },
  { label: "Portfolio", href: "/#gallery" },
  { label: "Blog", href: "/blog" },
]

export function SiteHeader() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/90 px-5 py-4 backdrop-blur md:px-10">
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        <Link
          href="/#hero"
          className="font-display text-xl font-700 tracking-tight"
          onClick={() => setOpen(false)}
        >
          <span className="text-pink">Eleaya</span> <span className="text-secondary">Neveah</span>
        </Link>

        <nav className="hidden items-center gap-6 font-display text-sm font-600 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-foreground transition-colors hover:text-secondary"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/#contact"
            className="rounded-full bg-pink px-4 py-2 text-pink-foreground shadow-sm transition-transform hover:-translate-y-0.5"
          >
            Booking
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          className="flex size-10 items-center justify-center rounded-full bg-muted text-foreground md:hidden"
        >
          {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
        </button>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          className="mx-auto mt-4 flex max-w-6xl flex-col gap-1 font-display text-base font-600 md:hidden"
        >
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-2xl px-3 py-3 text-foreground transition-colors hover:bg-muted hover:text-secondary"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/#contact"
            onClick={() => setOpen(false)}
            className="mt-2 rounded-full bg-pink px-4 py-3 text-center text-pink-foreground shadow-sm"
          >
            Booking
          </Link>
        </nav>
      )}
    </header>
  )
}
