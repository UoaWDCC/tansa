import configPromise from '@payload-config'
import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'

export const POST = async (req: NextRequest) => {
  const payload = await getPayload({
    config: configPromise,
  })

  try {
    const { email } = await req.json()

    // Check that we receive an email, and its of valid type.
    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Invalid email.' }, { status: 400 })
    }
    // Add the data to the newsletter_email collection.
    const data = await payload.create({
      collection: 'newsletter_emails',
      data: { email },
    })
    return NextResponse.json(data, { status: 201 })
  } catch (error) {
    // Most likely duplicate email in system.
    return NextResponse.json({ error: 'Internal Server Error. ' }, { status: 500 })
  }
}
