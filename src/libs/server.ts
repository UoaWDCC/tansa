import { payloadClient } from './payloadclient'

interface MediaItem {
  id: number
  title: string
  url?: string
  alt: string
  width?: number
  height?: number
}

export async function getGalleryPhotos(): Promise<MediaItem[]> {
  const client = await payloadClient()
  const galleryPhotos = await client.find({
    collection: 'media',
    limit: 10,
  })

  return galleryPhotos.docs as MediaItem[]
}
