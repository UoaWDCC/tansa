// app/sponsors/page.tsx
import React from 'react'
import fs from 'node:fs'
import Image from 'next/image'
import Papa from 'papaparse'
import { transform } from 'next/dist/build/swc/generated-native'

export const metadata = {
  title: 'Sponsors',
}

type Sponsor = {
  id: number
  image: string
  link: string
}

const file = fs.readFileSync('./public/sponsors/sponsors_test.csv', 'utf8')

const parsed = Papa.parse<Sponsor>(file, {
  delimiter: ',',
  dynamicTyping: true,
  header: true,
  skipEmptyLines: true,
})

const sponsors: Sponsor[] = parsed.data as Sponsor[]

export default function SponsorsPage() {
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
        <div className="flex flex-wrap items-center justify-center gap-7 mx-20">
          {sponsors.map((sponsor, index) => (
            <div key={index} className="flex flex-col items-center justify-center">
              <a href={sponsor.link}>
                <Image
                  src={`/sponsors/images/${sponsor.image}`}
                  alt={sponsor.image}
                  width={100}
                  height={100}
                />
              </a>
            </div>
          ))}
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
