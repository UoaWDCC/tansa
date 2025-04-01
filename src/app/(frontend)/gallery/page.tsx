import { getGalleryPhotos } from '@/libs/server'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Gallery = async () => {
  const galleryPhotos = await getGalleryPhotos()

  return (
    <div className="flex flex-col items-center min-w-3xl">
      <h1>Media</h1>
      <div className="grid grid-cols-3 gap-4">
        {galleryPhotos.map((photo, index) => (
          <div key={index}>
            {photo && (
              <div className="border-2 border-gray-400 max-w-xl">
                <h2>{photo.title}</h2>
                <Image
                  src={photo.url || 'placeholder.jpg'}
                  alt={photo.alt}
                  width={photo?.width || 200}
                  height={photo.height || 200}
                  className="h-[200px] w-auto"
                />
                <Link href={`posts/${photo.id}`}>Click me to go to page</Link>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Gallery
