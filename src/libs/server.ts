import { payloadClient } from './payloadclient'

export async function getMediaPhotos(): Promise<MediaItem[]> {
  const client = await payloadClient()
  const mediaPhotos = await client.find({
    collection: 'media',
    limit: 12,
  })

  return mediaPhotos.docs as MediaItem[]
}
