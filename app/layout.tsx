import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Fredoka, Nunito } from 'next/font/google'
import './globals.css'

const fredoka = Fredoka({
  subsets: ['latin'],
  variable: '--font-fredoka',
  weight: ['400', '500', '600', '700'],
})

const nunito = Nunito({
  subsets: ['latin'],
  variable: '--font-nunito',
  weight: ['400', '600', '700', '800'],
})

export const metadata: Metadata = {
  metadataBase: new URL('https://eleayaneveah.com'),
  title: {
    default: 'Eleaya Neveah — Young Actress, Film & TV Talent, and Model in DMV, Atlanta & NC',
    template: '%s | Eleaya Neveah',
  },
  description:
    'Official talent and modeling portfolio for Eleaya Neveah — an 11-year-old aspiring actress and model available for casting in the DMV (DC, Maryland & Virginia), Atlanta, GA, and North Carolina. Available for film, television, commercials, and print and runway modeling. View headshots, gallery, and representation and booking info for casting directors and talent agents.',
  keywords: [
    'Eleaya Neveah',
    'DMV child actress',
    'DMV kids model',
    'Washington DC child model',
    'Maryland child actress',
    'Virginia young talent',
    'Atlanta child actress',
    'Atlanta kids model',
    'North Carolina child actress',
    'North Carolina kids model',
    'young actress',
    'child actress',
    'film actress',
    'television talent',
    'movie casting',
    'child model',
    'kids modeling',
    'fashion model',
    'runway model',
    'print model',
    'commercial talent',
    'on-camera talent',
    'headshots',
    'talent agent',
    'casting director',
    'representation',
    'actor portfolio',
    'dancer',
    'singer',
    'performer',
  ],
  authors: [{ name: 'Eleaya Neveah' }],
  category: 'Entertainment',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'profile',
    title: 'Eleaya Neveah — Young Actress, Film & TV Talent, and Model in DMV, Atlanta & NC',
    description:
      'Aspiring young actress and model available for casting in the DMV, Atlanta, GA, and North Carolina — film, television, commercials, and print and runway modeling. View headshots, gallery, and booking info.',
    url: 'https://eleayaneveah.com',
    siteName: 'Eleaya Neveah',
    images: [
      {
        url: '/images/eleaya-standing.jpg',
        width: 1200,
        height: 1600,
        alt: 'Eleaya Neveah full-length modeling and acting headshot',
      },
    ],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Eleaya Neveah — Young Actress, Film & TV Talent, and Model in DMV, Atlanta & NC',
    description:
      'Aspiring young actress and model available for casting in the DMV, Atlanta, GA, and North Carolina — film, television, commercials, and print and runway modeling.',
    images: ['/images/eleaya-standing.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
    },
  },
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${fredoka.variable} ${nunito.variable} scroll-smooth bg-background`}
    >
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
