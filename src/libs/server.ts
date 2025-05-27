import { payloadClient } from './payloadclient'

// Function to get media photos from the collection
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
