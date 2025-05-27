import SkeletonCard from '@/components/Skeleton'
import { getMediaPhotos } from '@/libs/server'
import Image from 'next/image'
import { Suspense } from 'react'

export default async function GalleryPage() {
  return (
    <main className="min-h-screen">
      <div className="bg-tansa-blue h-[400px] flex items-center justify-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white">Media Gallery</h1>
      </div>
      <div className="bg-tansa-cream py-12">
        <div className="container mx-auto px-4 max-w-7xl">
          <Suspense
            fallback={
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {Array.from({ length: 8 }).map((_, i) => (
                  <SkeletonCard key={i} />
                ))}
              </div>
            }
          >
            <MediaSection />
          </Suspense>
        </div>
      </div>
    </main>
  )
}

// This is a separate component to use with <Suspense>
async function MediaSection() {
  const photos = await getMediaPhotos()

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {photos.map((photo) => (
        <div
          key={photo.id}
          className="rounded-lg overflow-hidden bg-white shadow-md hover:shadow-lg transition-shadow duration-300 group"
        >
          <div className="aspect-square relative overflow-hidden">
            <Image
              src={photo.url || '/placeholder.svg'}
              alt={photo.alt || `Media image titled ${photo.title}`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>
      ))}
    </div>
  )
}
