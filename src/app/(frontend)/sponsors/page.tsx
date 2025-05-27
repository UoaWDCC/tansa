// app/sponsors/page.tsx
import React from 'react'
import Image from 'next/image'
import Papa from 'papaparse'
import { transform } from 'next/dist/build/swc/generated-native'
import { Sponsor } from '@/payload-types'
export const metadata = {
  title: 'Sponsors',
}

async function getSponsors() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
    const response = await fetch(`${baseUrl}/api/sponsors`, {
      method: 'GET',
      cache: 'no-store',
    })

    if (!response.ok) {
      throw new Error('Failed to fetch sponsors')
    }

    const data = await response.json()
    console.log('Sponsors API response:', data)
    return data.docs || []
  } catch (error) {
    console.error('Error fetching sponsors:', error)
    return []
  }
}

export default async function SponsorsPage() {
  const sponsors = await getSponsors()
  console.log('Sponsors from API:', sponsors)

  return (
    <div>
      <div className="bg-tansa-blue h-[400px]"> 
        <div className="flex justify-end h-full overflow-hidden ">
          <Image 
          src="/bears/running and pointing 1.svg"
          alt="bear-icon"
          width={300}
          height={0}
          style={{ transform: 'translateY(30%)' }}
          />
        </div>
      </div>

      <div className="mt-15">
        <div className="flex flex-wrap justify-center gap-7 mx-20">
          {sponsors.length === 0 ? (
            <div className="text-center w-full text-red-500">
              No sponsors found or failed to load sponsors.
            </div>
          ) : (
            sponsors.map((sponsor: Sponsor) => {
              const imageSrc =
                sponsor.logo && typeof sponsor.logo !== 'number' && sponsor.logo.url
                  ? sponsor.logo.url
                  : '/sponsors/images/default.png'

              const imageAlt = sponsor.name || 'Sponsor Logo'

              const imageElement = (
                <>
                  <Image
                    src={imageSrc}
                    alt={imageAlt}
                    width={200}
                    height={200}
                    className="rounded"
                  />
                  <div className="absolute inset-0 bg-gray-800 bg-opacity-50 opacity-0 group-hover:opacity-90 flex items-center justify-center transition-opacity duration-200 rounded">
                    <span className="text-white text-center text-xs px-2">
                      {sponsor.sponsorshipDetails}
                    </span>
                  </div>
                </>
              )

              return (
                <div
                  key={sponsor.id}
                  className="flex flex-col items-center justify-center w-full max-w-36"
                >
                  <div className="relative group w-full flex justify-center items-center">
                    {sponsor.instagram ? (
                      <a
                        href={sponsor.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block"
                      >
                        {imageElement}
                      </a>
                    ) : (
                      <div className="block">{imageElement}</div>
                    )}
                  </div>
                </div>
              )
            })
          )}
        </div>
      </div>
      <div className="flex justify-center mt-15 mx-auto">
        <iframe
          src="https://www.google.com/maps/d/embed?mid=1xX0X1w1pNLM0xoZjKMIOh_6y0CxNEiY&ehbc=2E312F"
          width="640"
          height="480"
        />
      </div>
      <div className="bg-tansa-cream h-[100px]"></div>
    </div>
  )
}
