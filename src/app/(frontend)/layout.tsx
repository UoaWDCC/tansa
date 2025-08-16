import React from 'react'
import './styles.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { DM_Sans } from 'next/font/google'

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700'], // pick weights you need
})

export const metadata = {
  title: 'WDCC - Tansa',
  icons: {
    icon: '/favicon.png',
  },
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body className={`antialiased ${dmSans.className}`} suppressHydrationWarning>
        <main>
          <div className="bg-tansa-cream min-h-screen flex flex-col">
            <Header />
            {children}
            <Footer />
          </div>
        </main>
      </body>
    </html>
  )
}
