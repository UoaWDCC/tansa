import React from 'react'
import './styles.css'
import InstagramWidget from './components/InstagramWidget'

export default async function HomePage() {
  return (
    <div>
      <div className="bg-tansa-blue h-[400px]"></div>
      <h1 className="">home page</h1>
      <InstagramWidget />
      <div className="bg-tansa-cream h-[600px]"></div>
    </div>
  )
}
