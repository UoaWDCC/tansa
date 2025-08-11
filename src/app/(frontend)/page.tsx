import InstagramWidget from '@/components/InstagramWidget'
import Image from 'next/image'
import React from 'react'

export default function HomePage() {
  return (
    <div className="bg-tansa-blue">
      <div className="max-w-7xl mx-auto flex items-center px-8 py-16 relative">
        {/* Left side text */}
        <div className="font-newkansas text-tansa-cream max-w-lg z-10">
          <div className="flex items-baseline space-x-3">
            <h2 className="text-6xl font-bold">Hello!</h2>
            <h3 className="text-3xl font-semibold">We are</h3>
          </div>
          <h1 className="text-9xl font-extrabold mt-2">TANSA!</h1>
          <p className="text-2xl font-medium mt-4 leading-snug">
            The largest socio-cultural club at the University of Auckland and AUT.
          </p>
          <button className="mt-6 bg-tansa-cream text-gray-700 px-6 py-3 hover:cursor-pointer rounded-full font-bold font-sans text-lg duration-100 hover:bg-white hover:scale-105">
            Join us!
          </button>
        </div>

        {/* Bear image  */}
        <div className="absolute right-0 bottom-0 top-0 flex items-end">
          <Image
            src="/bears/homeBear.svg"
            width={400}
            height={400}
            alt="Tansa Bear"
            className="object-contain"
            priority
          />
        </div>
      </div>
      <div className="bg-tansa-cream">
        <InstagramWidget />
      </div>
    </div>
  )
}
