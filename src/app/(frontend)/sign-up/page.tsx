import { StripeCheckoutForm } from '@/components/registration-form/RegistrationForm'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'

const page = () => {
  return (
    <main className="min-h-screen select-none">
      <div className="bg-tansa-blue relative h-[300px] flex items-center justify-center flex-col text-center space-y-4 rounded-b-4xl">
        <h1 className="text-6xl md:text-8xl font-bold text-white font-newkansas z-10">Join Us</h1>
        <p className="text-lg md:text-2xl text-white z-10">
          Join TANSA this year and get access to exclusive events, deals, and a vibrant community!
        </p>
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
