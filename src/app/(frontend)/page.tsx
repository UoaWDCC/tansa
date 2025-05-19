import React from 'react'
import './styles.css'

export default async function HomePage() {
  return (
    <div>
      <div className="bg-tansa-blue h-[400px]"></div>
      <h1 className="text-center text-4xl font-bold mt-8 text-tansa-blue">@tansa.uoa</h1>
      <div className="bg-tansa-cream h-[600px] flex justify-center items-center">
        {/* Instagram Post Embed */}
        <div className="instagram-post rounded-lg overflow-hidden">
          <iframe
            src="https://www.instagram.com/p/DG7kw_IS3Wz/embed"
            width="400"
            height="480"
            frameBorder="0"
            scrolling="no"
            allowTransparency={true}
            className="rounded-lg"
          ></iframe>
        </div>
      </div>
    </div>
  )
}
