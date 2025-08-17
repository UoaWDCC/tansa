import EventsCarousel from '@/components/EventsCarousel'
import InstagramWidget from '@/components/InstagramWidget'
import Image from 'next/image'
import React from 'react'

export default function HomePage() {
  return (
    <div className="bg-tansa-blue">
      <div className="max-w-7xl mx-auto flex items-center px-8 py-8 relative h-[calc(100vh-80px)]">
        {/* Left side text */}
        <div className="font-newkansas text-tansa-cream max-w-7xl z-10">
          <div className="flex items-baseline space-x-3">
            <h2 className="text-9xl font-bold">Hello!</h2>
            <h3 className="text-5xl font-semibold">We are</h3>
          </div>
          <h1 className="text-9xl font-extrabold mt-2">TANSA!</h1>
          <p className="text-2xl font-medium mt-4 leading-snug">
            The largest socio-cultural club at the <br />
            University of Auckland and AUT.
          </p>
        </div>

        {/* Bear image  */}
        <div className="absolute right-[-100px] bottom-0 top-0 flex items-end">
          <Image
            src="/bears/homeBear.svg"
            width={700}
            height={700}
            alt="Tansa Bear"
            className="object-contain"
            priority
          />
        </div>

        {/* Scroll down indicator */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20">
          <div className="flex flex-col items-center text-tansa-cream animate-bounce">
            <p className="text-sm font-medium">Scroll Down</p>
            <div className="text-2xl">↓</div>
          </div>
        </div>
      </div>
      <div className="bg-tansa-cream">
        <InstagramWidget />
        <EventsCarousel images={[]} />
      </div>
    </div>
  )
}
