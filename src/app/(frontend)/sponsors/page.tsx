// app/sponsors/page.tsx
import React from 'react'
import Image from 'next/image'
import { getSponsors } from '@/libs/server'
import SponsorsList from '@/components/SponsorsList'

export default async function SponsorsPage() {
  const sponsors = await getSponsors()

  return (
    <div>
      <div className="bg-tansa-blue">
        {/* Header Section */}
        <div className="max-w-6xl h-[300px] mx-auto flex items-center justify-between pt-16 relative overflow-clip">
          <div className="font-newkansas font-bold text-white leading-none text-8xl">
            <h1>Our</h1>
            <h1>Sponsors</h1>
          </div>

          <div className="absolute right-[-20px] bottom-[-250px]">
            <Image
              src="/bears/running-pointing.svg"
              alt="Bear"
              width={450}
              height={450}
              quality={50}
              className="object-contain"
            />
          </div>
        </div>
      </div>

      {/* Sponsors list with search */}
      <SponsorsList sponsors={sponsors} />

      {/* Map Section */}
      <div className="flex justify-center m-15 mx-auto">
        <iframe
          src="https://www.google.com/maps/d/embed?mid=1xX0X1w1pNLM0xoZjKMIOh_6y0CxNEiY&ehbc=2E312F"
          width="640"
          height="480"
          title="Sponsors Map"
          className="border-0"
          loading="lazy"
        />
      </div>
    </div>
  )
}
