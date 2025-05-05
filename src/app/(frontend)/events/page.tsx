// app/gallery/page.tsx
import { Suspense } from 'react'
import { getEventsWithPhotos } from '@/libs/server'
import Loading from './loading'
import GalleryClient from '@/components/GalleryClient'

export default function AboutPage() {
  return (
    <div>
      <div className="bg-tansa-blue h-[400px]"></div>
      <div className="bg-tansa-cream h-[600px]"></div>
    </div>
  )
}
