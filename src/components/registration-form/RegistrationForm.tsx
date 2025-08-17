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
import RegistrationTextInput from './RegistrationTextInput'
import RegistrationDropdown from './RegistrationDropdown'
import RegistrationHeading from './RegistrationHeading'

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
      <div className="space-y-4">
        <RegistrationHeading label="Personal Information" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <RegistrationTextInput
            label="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Enter your first name"
            required
          />

          <RegistrationTextInput
            label="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Enter your last name"
            required
          />

          <RegistrationTextInput
            label="Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Enter your phone number"
            required
          />

          <RegistrationTextInput
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            type="email"
            required
          />

          <RegistrationDropdown
            label="Gender"
            value={gender}
            onValueChange={setGender}
            placeholder="Select your gender"
            options={genderOptions}
            required
          />

          <RegistrationDropdown
            label="Ethnicity"
            value={ethnicity}
            onValueChange={setEthnicity}
            placeholder="Select your ethnicity"
            options={ethnicityOptions}
            required
          />
        </div>
      </div>

      {/* University Information Section */}
      <div className="space-y-4">
        <RegistrationHeading
          label="University Information"
          subtitle="If you are not a university student or recent alumni, you unfortunately cannot register for TANSA."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <RegistrationTextInput
            label="UoA ID or AUT Student Number"
            value={universityId}
            subtitle="For example, 123456789 (UoA) and 12345678 (AUT)."
            onChange={(e) => setUniversityId(e.target.value)}
            placeholder="Enter your UoA ID or AUT student number"
            required
          />
          <RegistrationTextInput
            label="UoA UPI or AUT Network Login"
            value={upi}
            subtitle="For example, setn738 (UoA) and ses7129 (AUT)."
            onChange={(e) => setUpi(e.target.value)}
            placeholder="Enter your UoA UPI or AUT network login"
            required
          />

          <RegistrationDropdown
            label="Area of Study"
            value={areaOfStudy}
            onValueChange={setAreaOfStudy}
            placeholder="Select your area of study"
            options={areaOfStudyOptions}
            required
          />

          <RegistrationDropdown
            label="Year Level"
            value={yearLevel}
            onValueChange={setYearLevel}
            placeholder="Select your year level"
            options={yearLevelOptions}
            required
          />
        </div>
      </div>

      {/* Payment Section */}
      <div className="space-y-4">
        <RegistrationHeading label="Payment Details" />

        {/* Express Payment Methods */}
        <div className="space-y-3">
          <PaymentRequestForm clientSecret={clientSecret} />
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

      <Button
        type="submit"
        disabled={!stripe || isLoading}
        className="w-full bg-tansa-blue text-white"
      >
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
