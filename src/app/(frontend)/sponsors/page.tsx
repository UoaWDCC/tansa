// app/gallery/page.tsx
import { Suspense } from 'react'
import { getEventsWithPhotos } from '@/libs/server'
import Loading from './loading'
import GalleryClient from '@/components/GalleryClient'

export default function AboutPage() {
  return <div>hello from the sponsors page</div>
}
