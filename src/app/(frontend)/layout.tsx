import React from 'react'
import './styles.css'
import Header from '../../components/Header'

export const metadata = {
  title: 'WDCC - Tansa',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body className={`antialiased`} suppressHydrationWarning>
        <main>
          <Header />
          {children}
        </main>
      </body>
    </html>
  )
}
