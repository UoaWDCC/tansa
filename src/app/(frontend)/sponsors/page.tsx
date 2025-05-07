// app/gallery/page.tsx
import React, { Suspense, useEffect, useState } from 'react'
import { getEventsWithPhotos } from '@/libs/server'
import Loading from './loading'
import fs from 'node:fs'
import Image from 'next/image'
import GalleryClient from '@/components/GalleryClient'
import Papa, { ParseResult } from 'papaparse'
import { number } from 'node_modules/payload/dist/fields/validations'

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

export default function AboutPage() {
  return (
    <div>
      <div className="bg-tansa-blue h-[400px]"></div>
      <div className="mt-15 mx-auto w-[50vw]">
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols6 gap-5">
          {sponsors.map((sponsor, index) => (
            <div key={index} className="flex items-center gap-4">
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
