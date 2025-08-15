import { StripeCheckoutForm } from '@/components/StripeCheckoutForm'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'

const page = () => {
  return (
    <main className="min-h-screen">
      <div className="bg-tansa-blue relative h-[400px] flex items-center justify-center flex-col text-center space-y-4">
        <h1 className="text-6xl md:text-8xl font-bold text-white font-newkansas z-10">Sign Up</h1>
        <p className="text-lg md:text-2xl text-white font-newkansas z-10">
          Join TANSA this year for as
          <br /> little as $5.00!
        </p>
      </div>
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="w-full p-6 flex gap-8">
          <div className="flex-1 w-full">
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Complete Your Registration</CardTitle>
                <CardDescription>Enter your payment details to create your account</CardDescription>
              </CardHeader>
              <CardContent>
                <StripeCheckoutForm />
              </CardContent>
            </Card>
          </div>
          <div className="flex-1">
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Why Join TANSA?</CardTitle>
                <CardDescription>
                  As a member, you will gain access to exclusive events, networking opportunities,
                  and resources tailored for Taiwanese and New Zealand students.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Join us to connect with fellow students, participate in cultural events, and make
                  the most of your time in New Zealand!
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
}

export default page
