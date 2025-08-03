import React from 'react'
import './styles.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'WDCC - Tansa',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html className="bg-tansa-blue" lang="en">
      <body className={`antialiased bg-tansa-blue`} suppressHydrationWarning>
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
