import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import { Providers } from './providers'
import { Nav } from '@/components/ui/nav/nav'
import { getSession } from '@/app/actions'

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
})
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
})

export const metadata: Metadata = {
  title: 'Markko NextJS SDK',
  description: 'Markko NextJS SDK Test Frontend',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await getSession()

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <header className="absolute top-0 right-0 flex justify-end items-center gap-4 p-6 font-[family-name:var(--font-geist-sans)]">
            {session.isLoggedIn && <p>{session.user.email}</p>}
            <Nav />
          </header>
          {children}
        </Providers>
      </body>
    </html>
  )
}
