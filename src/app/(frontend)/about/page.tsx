// app/gallery/page.tsx

import { Suspense } from 'react'
import { getEventsWithPhotos } from '@/libs/server'
import Loading from './loading'

export default function AboutPage() {
  return (
    <div>
      <div className="bg-tansa-blue h-[400px] flex flex-col justify-end relative overflow-hidden">
        <div className="container mx-20 px-20 mt-20 mb-10 relative z-10">
          <h1 className="text-6xl text-tansa-cream font-newkansas">Meet our</h1>
          <h1 className="text-8xl text-tansa-cream font-newkansas">Team!</h1>
        </div>
        <div className="absolute bottom-[-80px] right-0 z-0 w-[400px] md:w-[400px] lg:w-[500px]">
          <img
            src="/bears/lying_on_stomach.svg"
            alt="bear lying on stomach"
            width={500}
            height={500}
            className="object-contain w-full h-auto"
          />
        </div>
      </div>
      <div className="bg-tansa-cream h-[600px]">
        <div className="container mx-auto px-4 pt-12 text-center">
          <h1 className="text-3xl text-tansa-blue font-newkansas">Presidents</h1>
        </div>
        <div className="mx-auto flex justify-center gap-15 pt-10">
          <div className="flex flex-col items-center">
            <img src="/placeholder.jpg" alt="placeholder" width={250} height={250} className="rounded-md"></img>
            <p className="mt-2 text-center text-2xl text-tansa-blue font-newkansas">Joey Wu</p>
            <p className="mt-2 text-center text-base text-tansa-blue font-newkansas">President</p>
          </div>
          <div className="flex flex-col items-center">
            <img src="/placeholder.jpg" alt="placeholder" width={250} height={250} className="rounded-md"></img>
            <p className="mt-2 text-center text-2xl text-tansa-blue font-newkansas">Nicole Burlace</p>
            <p className="mt-2 text-center text-base text-tansa-blue font-newkansas">Vice President</p>
          </div>
          </div>
      </div>
    </div>
  )
}
