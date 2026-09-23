import { Camera } from "lucide-react"

type PhotoSlotProps = {
  label: string
  /** Optional real photo path once uploaded, e.g. "/images/eleaya-1.jpg" */
  src?: string
  className?: string
  tint?: "pink" | "cyan" | "sunny" | "plum"
}

const tints: Record<NonNullable<PhotoSlotProps["tint"]>, string> = {
  pink: "from-pink/25 to-pink/5 text-pink",
  cyan: "from-cyan/30 to-cyan/5 text-cyan-foreground",
  sunny: "from-sunny/35 to-sunny/5 text-sunny-foreground",
  plum: "from-foreground/15 to-foreground/5 text-foreground",
}

export function PhotoSlot({ label, src, className, tint = "pink" }: PhotoSlotProps) {
  if (src) {
    return (
      <div className={className}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src || "/placeholder.svg"} alt={label} className="h-full w-full object-cover" />
      </div>
    )
  }

  return (
    <div
      className={`flex flex-col items-center justify-center gap-3 bg-gradient-to-br p-6 text-center ${tints[tint]} ${className ?? ""}`}
      role="img"
      aria-label={`Photo placeholder: ${label}`}
    >
      <span className="flex size-12 items-center justify-center rounded-full bg-card/70 shadow-sm">
        <Camera className="size-6" aria-hidden="true" />
      </span>
      <span className="font-display text-sm font-600 leading-snug">{label}</span>
    </div>
  )
}
