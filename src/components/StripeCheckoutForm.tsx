'use client'

import { useState, useEffect } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
  PaymentRequestButtonElement,
} from '@stripe/react-stripe-js'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Loader2,
  Palette,
  Briefcase,
  Music,
  GraduationCap,
  Cog,
  Scale,
  Stethoscope,
  FlaskConical,
  MoreHorizontal,
  User,
  Users,
  UserCheck,
  Minus,
  Tally1,
  Tally2,
  Tally3,
  Tally4,
  Mars,
  Venus,
  NonBinary,
} from 'lucide-react'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

const ethnicityOptions = [
  { value: 'nz-european', label: 'New Zealand European' },
  { value: 'maori', label: 'Māori' },
  { value: 'pacific-peoples', label: 'Pacific Peoples' },
  { value: 'asian', label: 'Asian' },
  { value: 'middle-eastern', label: 'Middle Eastern/Latin American/African' },
  { value: 'other', label: 'Other' },
  { value: 'prefer-not-to-say', label: 'Prefer not to say' },
]

const genderOptions = [
  { value: 'male', label: 'Male', icon: Mars },
  { value: 'female', label: 'Female', icon: Venus },
  { value: 'non-binary', label: 'Non-binary', icon: NonBinary },
  { value: 'other', label: 'Other', icon: MoreHorizontal },
  { value: 'prefer-not-to-say', label: 'Prefer not to say', icon: Minus },
]

const areaOfStudyOptions = [
  { value: 'arts', label: 'Arts', icon: Palette },
  { value: 'business', label: 'Business', icon: Briefcase },
  { value: 'creative-arts-industries', label: 'Creative Arts and Industries', icon: Music },
  { value: 'education-social-work', label: 'Education and Social Work', icon: GraduationCap },
  { value: 'engineering', label: 'Engineering', icon: Cog },
  { value: 'law', label: 'Law', icon: Scale },
  { value: 'medical-health-sciences', label: 'Medical and Health Sciences', icon: Stethoscope },
  { value: 'science', label: 'Science', icon: FlaskConical },
  { value: 'other', label: 'Other', icon: MoreHorizontal },
]

const yearLevelOptions = [
  { value: 'first-year', label: 'First Year', icon: Tally1 },
  { value: 'second-year', label: 'Second Year', icon: Tally2 },
  { value: 'third-year', label: 'Third Year', icon: Tally3 },
  { value: 'fourth-year', label: 'Fourth Year', icon: Tally4 },
  { value: 'postgraduate', label: 'Postgraduate', icon: GraduationCap },
]

function PaymentRequestForm({ clientSecret }: { clientSecret: string }) {
  const stripe = useStripe()
  const [paymentRequest, setPaymentRequest] = useState<any>(null)

  useEffect(() => {
    if (stripe) {
      const pr = stripe.paymentRequest({
        country: 'NZ',
        currency: 'nzd',
        total: {
          label: 'TANSA Membership',
          amount: 500, // $5.00 in cents
        },
        requestPayerName: true,
        requestPayerEmail: true,
      })

      // Check the availability of the Payment Request API.
      pr.canMakePayment().then((result) => {
        if (result) {
          setPaymentRequest(pr)
        }
      })

      pr.on('paymentmethod', async (event) => {
        // Confirm the PaymentIntent without handling potential next actions (yet).
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
          clientSecret,
          { payment_method: event.paymentMethod.id },
          { handleActions: false },
        )

        if (confirmError) {
          // Report to the browser that the payment failed, prompting it to
          // re-show the payment interface, or show an error message and close
          // the payment interface.
          event.complete('fail')
        } else {
          // Report to the browser that the confirmation was successful, prompting
          // it to close the browser payment method collection interface.
          event.complete('success')
          // Check if the PaymentIntent requires any actions and if so let Stripe.js
          // handle the flow. If using an API version older than "2019-02-11"
          // instead of the most recent API version, you may want to also handle
          // specific error codes and let stripe.js handle the flow.
          if (paymentIntent.status === 'requires_action') {
            const { error } = await stripe.confirmCardPayment(clientSecret)
            if (error) {
              // The payment failed -- ask your customer for a new payment method.
            } else {
              // The payment has succeeded.
              window.location.href = `${window.location.origin}/success`
            }
          } else {
            // The payment has succeeded.
            window.location.href = `${window.location.origin}/success`
          }
        }
      })
    }
  }, [stripe, clientSecret])

  if (paymentRequest) {
    return <PaymentRequestButtonElement options={{ paymentRequest }} />
  }

  return null
}

function CheckoutForm({ clientSecret }: { clientSecret: string }) {
  const stripe = useStripe()
  const elements = useElements()
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')

  // Form state variables
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [gender, setGender] = useState('')
  const [ethnicity, setEthnicity] = useState('')
  const [universityId, setUniversityId] = useState('')
  const [upi, setUpi] = useState('')
  const [areaOfStudy, setAreaOfStudy] = useState('')
  const [yearLevel, setYearLevel] = useState('')
  const [email, setEmail] = useState('')

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    if (!stripe || !elements) {
      return
    }

    setIsLoading(true)
    setMessage('')

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/success`,
        receipt_email: email,
      },
    })

    if (error) {
      if (error.type === 'card_error' || error.type === 'validation_error') {
        setMessage(error.message || 'An error occurred')
      } else {
        setMessage('An unexpected error occurred.')
      }
    }

    setIsLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Personal Information Section */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
          <p className="text-sm text-gray-600">Please provide your basic personal details</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name *</Label>
            <Input
              id="firstName"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Enter your first name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name *</Label>
            <Input
              id="lastName"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Enter your last name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phoneNumber">Phone Number *</Label>
            <Input
              id="phoneNumber"
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Enter your phone number"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="gender">Gender *</Label>
            <Select value={gender} onValueChange={setGender} required>
              <SelectTrigger>
                <SelectValue placeholder="Select your gender" />
              </SelectTrigger>
              <SelectContent>
                {genderOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    <div className="flex items-center gap-2">
                      <option.icon className="h-4 w-4" />
                      {option.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="ethnicity">Ethnicity *</Label>
            <Select value={ethnicity} onValueChange={setEthnicity} required>
              <SelectTrigger>
                <SelectValue placeholder="Select your ethnicity" />
              </SelectTrigger>
              <SelectContent>
                {ethnicityOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* University Information Section */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">University Information</h3>
          <p className="text-sm text-gray-600">
            Academic details and university identification.{' '}
            <span className="font-semibold">
              If you are not a university student or recent alumni, you unfortunately cannot
              register for TANSA.
            </span>
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="universityId">UoA ID / AUT Student Number</Label>
            <span className="italic text-xs text-gray-500">
              For example, 123456789 (UoA) and 12345678 (AUT).
            </span>
            <Input
              id="universityId"
              type="text"
              value={universityId}
              onChange={(e) => setUniversityId(e.target.value)}
              placeholder="Enter your ID / Student Number"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="upi">UoA UPI / AUT Network Login </Label>
            <span className="italic text-xs text-gray-500">
              For example, setn738 (UoA) and ses7129 (AUT).
            </span>
            <Input
              id="upi"
              type="text"
              value={upi}
              onChange={(e) => setUpi(e.target.value)}
              placeholder="Enter your UPI / Network Login"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="areaOfStudy">Area of Study *</Label>
            <Select value={areaOfStudy} onValueChange={setAreaOfStudy} required>
              <SelectTrigger>
                <SelectValue placeholder="Select your area of study" />
              </SelectTrigger>
              <SelectContent>
                {areaOfStudyOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    <div className="flex items-center gap-2">
                      <option.icon className="h-4 w-4" />
                      {option.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="yearLevel">Year Level *</Label>
            <Select value={yearLevel} onValueChange={setYearLevel} required>
              <SelectTrigger>
                <SelectValue placeholder="Select your year level" />
              </SelectTrigger>
              <SelectContent>
                {yearLevelOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    <div className="flex items-center gap-2">
                      <option.icon className="h-4 w-4" />
                      {option.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Payment Section */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Payment Details</h3>
          <p className="text-sm text-gray-600">Complete your membership registration payment</p>
        </div>

        {/* Express Payment Methods */}
        <div className="space-y-3">
          <PaymentRequestForm clientSecret={clientSecret} />
          <div className="flex items-center gap-4">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="text-sm text-gray-500 bg-white px-3">or pay with card</span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>
        </div>

        <div className="border rounded-md p-3">
          <PaymentElement />
        </div>
      </div>

      {message && (
        <Alert variant="destructive">
          <AlertDescription>{message}</AlertDescription>
        </Alert>
      )}

      <Button type="submit" disabled={!stripe || isLoading} className="w-full">
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Processing...
          </>
        ) : (
          'Complete Registration - $5.00'
        )}
      </Button>
    </form>
  )
}

export function StripeCheckoutForm() {
  const [clientSecret, setClientSecret] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: 2900 }), // $29.00
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to create payment intent')
        }
        return res.json()
      })
      .then((data) => {
        if (data.error) {
          throw new Error(data.error)
        }
        setClientSecret(data.clientSecret)
        setLoading(false)
      })
      .catch((err) => {
        console.error('Error:', err)
        setError(err.message)
        setLoading(false)
      })
  }, [])

  const appearance = {
    theme: 'stripe' as const,
    variables: {
      colorPrimary: '#0f172a',
    },
  }

  const options = {
    clientSecret,
    appearance,
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-6 w-6 animate-spin" />
        <span className="ml-2">Loading payment form...</span>
      </div>
    )
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>Error loading payment form: {error}</AlertDescription>
      </Alert>
    )
  }

  return (
    <div>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm clientSecret={clientSecret} />
        </Elements>
      )}
    </div>
  )
}
