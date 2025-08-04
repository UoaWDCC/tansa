import { payloadClient } from './payloadclient'

// Get media/all photos
export async function getMediaPhotos(): Promise<MediaItem[]> {
  const client = await payloadClient()

  // Fetch media photos with a limit of 12
  const mediaPhotos = await client.find({
    collection: 'media', // Collection name
    limit: 12, // Limit to 12 items
  })

  // Return the fetched media photos as MediaItem[] array
  return mediaPhotos.docs as MediaItem[]
}

// Get events
export async function getEvents(): Promise<EventItem[]> {
  const client = await payloadClient()

  const events = await client.find({
    collection: 'events',
    limit: 10,
  })

  return events.docs as EventItem[]
}
