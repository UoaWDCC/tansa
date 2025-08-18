'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useMemo, memo } from 'react'

interface EventCardProps {
  title: string
  date: string
  photoUrls: string[]
  slug: string
  priority?: boolean // Added priority prop for above-fold images
}

function EventCard({ title, date, photoUrls, slug, priority = false }: EventCardProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false) // Track image load state

  const { coverImage, photoCount, formattedDate } = useMemo(
    () => ({
      coverImage: photoUrls[0] || '/placeholder-event.jpg',
      photoCount: photoUrls.length,
      formattedDate: new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
    }),
    [photoUrls, date],
  )

  return (
    <Link
      href={`/events/${slug}`}
      className="group cursor-pointer"
      onClick={() => setIsLoading(true)}
    >
      <div className="bg-white rounded-2xl overflow-hidden transition-all duration-300 transform hover:-translate-y-1 relative">
        {/* Cover Image */}
        <div className="relative aspect-[4/3] overflow-hidden">
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
              <div className="w-12 h-12 bg-gray-300 rounded-full animate-pulse"></div>
            </div>
          )}

          <Image
            src={coverImage || '/placeholder.svg'}
            alt={`${title} cover`}
            fill
            className={`object-cover group-hover:scale-105 transition-all duration-300 ${
              isLoading ? 'opacity-50' : ''
            } ${imageLoaded ? 'opacity-100' : 'opacity-0'}`} // Smooth fade-in when loaded
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
            priority={priority} // Use priority for above-fold images
            placeholder="blur" // Add blur placeholder
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
            onLoad={() => setImageLoaded(true)} // Track when image loads
          />

          {/* Photo count overlay */}
          <div className="absolute top-3 right-3 bg-black/70 text-white px-2 py-1 rounded-full text-xs font-medium">
            {photoCount} photo{photoCount !== 1 ? 's' : ''}
          </div>

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="bg-white/90 px-4 py-2 rounded-full font-medium text-tansa-blue">
              View Gallery
            </div>
          </div>

          {/* Loading overlay */}
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/70">
              <div className="h-8 w-8 border-4 border-tansa-blue border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
        </div>

        {/* Event Info */}
        <div className="p-4">
          <h3 className="font-bold text-lg text-tansa-blue font-newkansas line-clamp-2 group-hover:text-tansa-blue/80 transition-colors">
            {title}
          </h3>
          <p className="text-sm text-gray-600 mt-1">{formattedDate}</p>
        </div>
      </div>
    </Link>
  )
}

export default memo(EventCard)
