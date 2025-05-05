// app/gallery/page.tsx
import { Suspense } from 'react'
import { getEventsWithPhotos } from '@/libs/server'
import Loading from './loading'
import GalleryClient from '@/components/GalleryClient'

const GalleryPage = async () => {
  const events = await getEventsWithPhotos()

  return (
    <Suspense fallback={<Loading />}>
      <GalleryClient events={events} />
    </Suspense>
  )
}

export default GalleryPage
