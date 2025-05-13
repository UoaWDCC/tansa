import configPromise from '@payload-config'
import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'

export const POST = async (req: NextRequest) => {
  const payload = await getPayload({
    config: configPromise,
  })

  try {
    const { email } = await req.json()
    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Invalid email.' }, { status: 400 })
    }

    const data = await payload.create({
      collection: 'newsletter_emails',
      data: { email },
    })

    return NextResponse.json(data, { status: 201 })
  } catch (error) {
    console.error('Newsletter error: ', error)
    return NextResponse.json({ error: 'Internal Server Error. ' }, { status: 500 })
  }
}
