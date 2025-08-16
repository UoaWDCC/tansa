import { StripeCheckoutForm } from '@/components/registration-form/RegistrationForm'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'

const page = () => {
  return (
    <main className="min-h-screen">
      <div className="bg-tansa-blue relative h-[300px] flex items-center justify-center flex-col text-center space-y-4">
        <h1 className="text-6xl md:text-8xl font-bold text-white font-newkansas z-10">Join Us</h1>
        <p className="text-lg md:text-2xl text-white z-10">
          Join TANSA this year and get access to exclusive events, deals, and a vibrant community!
        </p>
      </div>
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="w-full p-6 flex gap-8">
          <div className="flex-1 w-full">
            <Card className="h-full">
              <CardContent>
                <StripeCheckoutForm />
              </CardContent>
            </Card>
          </div>
          <div className="flex-1 hidden lg:block">
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
