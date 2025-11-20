import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(request: NextRequest) {
  try {
    const { amount, formData } = await request.json()

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: 'nzd',
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        type: 'signup',
        firstName: formData?.firstName || '',
        lastName: formData?.lastName || '',
        email: formData?.email || '',
        phoneNumber: formData?.phoneNumber || '',
        gender: formData?.gender || '',
        ethnicity: formData?.ethnicity || '',
        universityId: formData?.universityId || '',
        upi: formData?.upi || '',
        areaOfStudy: formData?.areaOfStudy || '',
        yearLevel: formData?.yearLevel || '',
      },
    })

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
    })
  } catch (err) {
    console.error('Error creating payment intent:', err)
    return NextResponse.json({ error: 'Failed to create payment intent' }, { status: 500 })
  }
}
