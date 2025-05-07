// app/sponsors/page.tsx
import React from 'react'
import fs from 'node:fs'
import Image from 'next/image'
import Papa, { ParseResult } from 'papaparse'

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
      <div className="bg-tansa-blue h-[400px]"></div>

      <div className="mt-15">
        <div className="flex flex-wrap justify-center gap-7 mx-20">
          {sponsors.map((sponsor, index) => (
            <div key={index} className="flex flex-col items-center items-center">
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
      <div className="bg-tansa-cream h-[600px]"></div>
    </div>
  )
}
