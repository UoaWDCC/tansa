import { StripeCheckoutForm } from '@/components/registration-form/RegistrationForm'
import { CardContent } from '@/components/ui/card'
import Image from 'next/image'
import React from 'react'

const page = () => {
  return (
    <main className="min-h-screen select-none">
      <div className="bg-tansa-blue relative h-[300px] flex items-center justify-center flex-col text-center space-y-4 rounded-b-4x overflow-clip">
        <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold text-white font-newkansas z-10 relative">
          Join Us
        </h1>
        <p className="text-base sm:text-lg md:text-2xl text-white z-10 relative px-4">
          Join TANSA this year and get access to
          <br /> exclusive events, deals, and a vibrant community!
        </p>
        {/* Bear image */}
        <div className="absolute right-0 bottom-[-120px] sm:bottom-[-150px] md:bottom-[-190px] select-none z-0 w-[250px] sm:w-[350px] md:w-[450px]">
          <Image
            src="/bears/hooray 1.svg"
            alt="Bear"
            width={450}
            height={450}
            className="object-contain w-full h-auto"
          />
        </div>
      </div>
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="w-3xl p-6 flex gap-8">
          <div className="flex-1 w-full">
            <CardContent className="p-10 bg-white rounded-2xl">
              <StripeCheckoutForm />
            </CardContent>
          </div>
        </div>
      </div>
    </main>
  )
}

export default page
