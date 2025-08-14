import { StripeCheckoutForm } from '@/components/StripeCheckoutForm'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Image from 'next/image'
import React from 'react'

const page = () => {
  return (
    <main className="bg-tansa-blue">
      {/* Header Section */}
      <div className="max-w-6xl h-[300px] mx-auto flex items-center justify-between py-16 relative overflow-clip">
        {/* Left text */}
        <div className="font-newkansas font-bold text-tansa-cream leading-none text-8xl">
          <h1>Join Us!</h1>
        </div>

        {/* Bear image */}
        <div className="absolute right-0 bottom-[-190px] select-none">
          <Image
            src="/bears/hooray 1.svg"
            alt="Bear"
            width={450}
            height={450}
            className="object-contain"
          />
        </div>
      </div>
      <div className="flex items-center justify-center p-4 bg-tansa-cream">
        <div className="min-w-4xl">
          <Card>
            <CardHeader>
              <CardTitle>Complete Your Registration</CardTitle>
              <CardDescription>Enter your payment details to create your account</CardDescription>
            </CardHeader>
            <CardContent>
              <StripeCheckoutForm />
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}

export default page
