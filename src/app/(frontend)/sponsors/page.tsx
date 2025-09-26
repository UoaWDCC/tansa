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
        <div className="p-20 max-w-6xl h-[300px] mx-auto flex items-center justify-between pt-16 relative overflow-clip">
          <div className="font-newkansas font-bold text-white leading-none  text-7xl md:text-8xl">
            <h1>Our</h1>
            <h1>Sponsors</h1>
          </div>

          <div className="
    absolute
    right-0 bottom-0                /* default: keep it visible on small screens */
    sm:right-[-10px] sm:bottom-[-100px]
    md:right-[-20px] md:bottom-[-150px]
    w-[180px] sm:w-[250px] md:w-[350px] 3fdft
  ">
            <Image
              src="/bears/running-pointing.svg"
              alt="Bear"
              width={450}
              height={450}
              className="object-contain w-full h-auto"
            />
          </div>
        </div>
      </div>

      {/* Sponsors list with search */}
      <SponsorsList sponsors={sponsors} />

      {/* Map Section */}
      <div className="flex justify-center p-20 m-15 mx-auto">
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
