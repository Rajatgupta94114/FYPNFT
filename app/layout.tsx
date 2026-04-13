import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { TonConnectProvider } from '@/components/tonconnect-provider'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'PromptOwn - Turn Your Prompt Into Ownable AI Art',
  description: 'Generate and mint AI art as NFTs. Transform your creative prompts into valuable digital assets.',
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark" data-scroll-behavior="smooth">
      <head>
        <meta name="theme-color" content="#0a0e1f" media="(prefers-color-scheme: dark)" />
        <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
      </head>
      <body className="font-sans antialiased dark">
        <TonConnectProvider>
          {children}
        </TonConnectProvider>
              </body>
    </html>
  )
}
