import { StripeCheckoutForm } from '@/components/StripeCheckoutForm'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'

const page = () => {
  return (
    <main className="min-h-screen">
      <div className="bg-tansa-blue relative h-[400px] flex items-center justify-center">
        <h1 className="text-6xl md:text-8xl font-bold text-white font-newkansas z-10">Sign Up</h1>
      </div>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Join Our Platform</h1>
            <p className="text-slate-600">Sign up with a one-time payment of $29</p>
          </div>

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
