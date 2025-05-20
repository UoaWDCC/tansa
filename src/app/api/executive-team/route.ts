import configPromise from '@payload-config'
import { NextResponse } from 'next/server'
import { getPayload } from 'payload'

export const GET = async (): Promise<NextResponse> => {
  const payload = await getPayload({ config: configPromise })

  try {
    const data = await payload.find({
      collection: 'executive_team',
      limit: 30,
    })

    const executives = data.docs.map((doc) => ({
      id: doc.id,
      name: doc.name,
      role: doc.role,
      ethnicity: doc.ethnicity ?? null,
      university: doc.university ?? null,
      studying: doc.studying ?? null,
      fun_fact: doc.fun_fact ?? null,
    }))

    return NextResponse.json({ executives }, { status: 200 })
  } catch (error: unknown) {
    console.error('GET /api/executive error:', error)
    return NextResponse.json({ error: 'Internal Server Error. ' }, { status: 500 })
  }
}
