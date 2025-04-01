import GalleryClient from '@/app/components/GalleryClient'
import { getEventsWithPhotos } from '@/libs/server'

// Server component that fetches data
export default async function GalleryPage() {
  // Fetch data server-side
  const events = await getEventsWithPhotos()

  return <main className="">{events ? <GalleryClient events={events} /> : 'Loading'}</main>
}
