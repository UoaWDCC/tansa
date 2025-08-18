'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { Sponsor } from '@/payload-types'

type SponsorsListProps = {
  sponsors: Sponsor[]
}

export default function SponsorsList({ sponsors }: SponsorsListProps) {
  const [search, setSearch] = useState('')

  const filteredSponsors = sponsors.filter((sponsor) =>
    sponsor.name?.toLowerCase().includes(search.toLowerCase()),
  )

  return (
    <div className="mt-15 bg-tansa-cream">
      <div className="max-w-6xl mx-auto px-4 pb-8">
        <input
          type="text"
          placeholder="Search sponsors..."
          className="w-full p-3 rounded border border-gray-300 mb-8 bg-white font-bold"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          aria-label="Search sponsors"
        />
      </div>

      <div className="flex flex-wrap justify-start max-w-7xl w-full gap-4 mx-auto">
        {filteredSponsors.length === 0 ? (
          <div className="w-full text-center text-red-500">No sponsors found.</div>
        ) : (
          filteredSponsors.map(({ id, name, logo, instagram, sponsorshipDetails }) => {
            const imageSrc =
              logo && typeof logo !== 'number' && logo.url
                ? logo.url
                : '/sponsors/images/default.png'
            const imageAlt = name || 'Sponsor Logo'

            const imageElement = (
              <div className="relative group w-full flex justify-center items-center select-none">
                <Image src={imageSrc} alt={imageAlt} width={200} height={200} className="rounded" />

                {/* Hover popup */}
                {sponsorshipDetails && (
                  <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-3 w-60 bg-white text-black p-3 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-center text-sm z-10 select-none pointer-events-none group-hover:pointer-events-auto">
                    <h3 className="font-bold mb-1">{name}</h3>
                    <p>{sponsorshipDetails}</p>
                  </div>
                )}

                {/* Optional semi-transparent overlay on hover */}
              </div>
            )

            return (
              <div key={id} className="flex flex-col items-center justify-center w-full max-w-25">
                {instagram ? (
                  <a href={instagram} target="_blank" rel="noopener noreferrer" className="block">
                    {imageElement}
                  </a>
                ) : (
                  <div className="block">{imageElement}</div>
                )}
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
