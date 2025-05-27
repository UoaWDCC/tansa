import { getPayload } from 'payload'
import config from '@/payload.config'

export async function GET() {
  try {
    const payload = await getPayload({
      config: config,
    })

    const sponsors = await payload.find({
      collection: 'sponsors',
      depth: 2, // This ensures we get the full logo object
      limit: 0,
    })

    return Response.json(sponsors)
  } catch (error) {
    console.error('Error fetching sponsors:', error)
    return Response.json({ error: 'Failed to fetch sponsors' }, { status: 500 })
  }
}
