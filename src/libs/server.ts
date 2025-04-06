import { payloadClient } from './payloadclient'

export async function getEventsWithPhotos(): Promise<EventItem[]> {
  const client = await payloadClient()
  const eventsWithPhotos = await client.find({
    collection: 'events',
    limit: 10,
  })

  return eventsWithPhotos.docs as EventItem[]
}

export async function getMediaPhotos(): Promise<MediaItem[]> {
  const client = await payloadClient()
  const mediaPhotos = await client.find({
    collection: 'media',
    limit: 10,
  })

  return mediaPhotos.docs as MediaItem[]
}
