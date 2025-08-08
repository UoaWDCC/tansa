'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CheckCircle, Loader2 } from 'lucide-react'
import Link from 'next/link'

export default function SuccessPage() {
  const searchParams = useSearchParams()
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [message, setMessage] = useState('')

  useEffect(() => {
    const paymentIntent = searchParams.get('payment_intent')
    const paymentIntentClientSecret = searchParams.get('payment_intent_client_secret')
    const redirectStatus = searchParams.get('redirect_status')

    if (redirectStatus === 'succeeded') {
      setStatus('success')
      setMessage('Payment successful! Your account has been created.')
    } else {
      setStatus('error')
      setMessage('Something went wrong with your payment.')
    }
  }, [searchParams])

  return (
    <main className="min-h-screen">
      <div className="bg-tansa-blue relative h-[400px] flex items-center justify-center">
        <h1 className="text-6xl md:text-8xl font-bold text-white font-newkansas z-10">Sign Up</h1>
      </div>
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          {status === 'loading' && (
            <>
              <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-slate-600" />
              <CardTitle>Processing...</CardTitle>
              <CardDescription>Please wait while we confirm your payment</CardDescription>
            </>
          )}

          {status === 'success' && (
            <>
              <CheckCircle className="h-12 w-12 mx-auto mb-4 text-green-600" />
              <CardTitle className="text-green-700">Welcome!</CardTitle>
              <CardDescription>Your registration is complete</CardDescription>
            </>
          )}

          {status === 'error' && (
            <>
              <div className="h-12 w-12 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center">
                <span className="text-red-600 text-xl">✕</span>
              </div>
              <CardTitle className="text-red-700">Payment Failed</CardTitle>
              <CardDescription>There was an issue with your payment</CardDescription>
            </>
          )}
        </CardHeader>

        <CardContent className="text-center space-y-4">
          <p className="text-slate-600">{message}</p>

          {status === 'success' && (
            <div className="space-y-2">
              <Button asChild className="w-full">
                <Link href="/">Go to Home</Link>
              </Button>
              <p className="text-sm text-slate-500">
                You should receive a confirmation email shortly.
              </p>
            </div>
          )}

          {status === 'error' && (
            <Button asChild variant="outline" className="w-full">
              <Link href="/">Try Again</Link>
            </Button>
          )}
        </CardContent>
      </Card>
    </main>
  )
}
