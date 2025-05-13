// app/gallery/page.tsx
import { Suspense } from 'react'
import { getEventsWithPhotos } from '@/libs/server'
import Loading from './loading'
// import GalleryClient from '@/components/GalleryClient'
import bear from '/bears/lying_on_stomach.png'

export default function AboutPage() {
  return (
    <div>
      <div className="bg-tansa-blue h-[400px] flex flex-col justify-end relative overflow-hidden">
        <div className="container mx-20 px-20 mt-20 mb-10 relative z-10">
          <h1 className="text-6xl font-bold text-tansa-cream">Meet our</h1>
          <h1 className="text-8xl font-bold text-tansa-cream">Team!</h1>
        </div>
        <div className="absolute bottom-[-80px] right-0 z-0 w-[400px] md:w-[400px] lg:w-[500px]">
          <img
            src="/bears/lying_on_stomach.png"
            alt="bear lying on stomach"
            width={500}
            height={500}
            className="object-contain w-full h-auto"
          />
        </div>
      </div>
      <div className="bg-tansa-cream h-[600px]">

      </div>
    </div>
  )
}
