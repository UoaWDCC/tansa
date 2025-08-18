import { payloadClient } from './payloadclient'
import { Sponsor } from '@/payload-types'

// Get media/all photos
export async function getMediaPhotos(): Promise<MediaItem[]> {
  const client = await payloadClient()

  // Fetch media photos with a limit of 12
  const mediaPhotos = await client.find({
    collection: 'media', // Collection name
    limit: 100, // Limit to 12 items
  })

  // Return the fetched media photos as MediaItem[] array
  return mediaPhotos.docs as MediaItem[]
}

// Get events
export async function getEvents(): Promise<EventItem[]> {
  const client = await payloadClient()

  const events = await client.find({
    collection: 'events',
    limit: 100,
  })

  return events.docs as EventItem[]
}

// Get exec members
export async function getExecMembers(): Promise<ExecMember[]> {
  const client = await payloadClient()

  const execMembers = await client.find({
    collection: 'exec', // Collection name in Payload CMS
    limit: 100,
  })

  return execMembers.docs as ExecMember[]
}

// Get sponsors from Payload
export async function getSponsors(): Promise<Sponsor[]> {
  const client = await payloadClient()

  const sponsors = await client.find({
    collection: 'sponsors', // name of your Payload collection
    limit: 100, // adjust if needed
  })

  return sponsors.docs as Sponsor[]
}
