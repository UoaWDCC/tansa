'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CheckCircle, Loader2, XCircle } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import Image from 'next/image'

type Status = 'loading' | 'success' | 'error'

const STATUS_CONFIG: Record<
  Status,
  {
    icon: JSX.Element
    title: string
    description: string
    color: string
    message: string
  }
> = {
  loading: {
    icon: <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-slate-600" />,
    title: 'Processing...',
    description: 'Please wait while we confirm your payment',
    color: 'text-slate-600',
    message: 'We’re verifying your payment details...',
  },
  success: {
    icon: <CheckCircle className="h-12 w-12 mx-auto mb-4 text-green-600" />,
    title: 'Welcome!',
    description: 'Your registration is complete',
    color: 'text-green-700',
    message: 'Payment successful! Your account has been created.',
  },
  error: {
    icon: <XCircle className="h-12 w-12 mx-auto mb-4 text-red-600" />,
    title: 'Payment Failed',
    description: 'There was an issue with your payment',
    color: 'text-red-700',
    message: 'Something went wrong with your payment.',
  },
}

export default function SuccessPage() {
  const searchParams = useSearchParams()
  const [status, setStatus] = useState<Status>('loading')

  useEffect(() => {
    const redirectStatus = searchParams.get('redirect_status')

    if (redirectStatus === 'succeeded') {
      setStatus('success')
    } else if (redirectStatus) {
      setStatus('error')
    }
  }, [searchParams])

  const { icon, title, description, color, message } = STATUS_CONFIG[status]

  return (
    <main className="min-h-screen">
      {/* Hero Header */}
      <div className="bg-tansa-blue relative h-[300px] flex items-center justify-center flex-col text-center space-y-4 rounded-b-4x overflow-clip">
        <h1 className="text-6xl md:text-8xl font-bold text-white font-newkansas z-10">Join Us</h1>
        <p className="text-lg md:text-2xl text-white z-10">
          Join TANSA this year and get access to
          <br /> exclusive events, deals, and a vibrant community!
        </p>
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

      {/* Status Card */}
      <div className="flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-md"
        >
          <Card>
            <CardHeader className="text-center">
              {icon}
              <CardTitle className={color}>{title}</CardTitle>
              <CardDescription>{description}</CardDescription>
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
        </motion.div>
      </div>
    </main>
  )
}
