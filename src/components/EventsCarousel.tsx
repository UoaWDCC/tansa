'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface CarouselImage {
  id: string
  src: string
  alt: string
  title?: string
  description?: string
}

interface EventsCarouselProps {
  images: CarouselImage[]
  autoPlay?: boolean
  autoPlayInterval?: number
  className?: string
}

const EventsCarousel: React.FC<EventsCarouselProps> = ({
  images = [],
  autoPlay = true,
  autoPlayInterval = 5000,
  className = '',
}) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  // Auto-play functionality
  useEffect(() => {
    if (!autoPlay || images.length <= 1) return

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1))
    }, autoPlayInterval)

    return () => clearInterval(interval)
  }, [autoPlay, autoPlayInterval, images.length])

  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? images.length - 1 : currentIndex - 1)
  }

  const goToNext = () => {
    setCurrentIndex(currentIndex === images.length - 1 ? 0 : currentIndex + 1)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  // Always render the carousel structure, even if images is empty
  return (
    <div className={`relative w-full ${className}`}>
      {/* Main Image Container */}
      <div className="relative h-96 overflow-hidden rounded-lg bg-gray-100">
        {images.length > 0 ? (
          images.map((image, index) => (
            <div
              key={image.id}
              className={`absolute inset-0 transition-all duration-500 ease-in-out ${
                index === currentIndex
                  ? 'translate-x-0 scale-105 opacity-100 z-20 shadow-2xl'
                  : 'scale-90 opacity-40 z-10 ' +
                    (index < currentIndex ? '-translate-x-full' : 'translate-x-full')
              }`}
              style={{ pointerEvents: index === currentIndex ? 'auto' : 'none' }}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover rounded-lg"
                priority={index === 0}
              />

              {/* Image Overlay with Title and Description */}
              {(image.title || image.description) && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                  {image.title && (
                    <h3 className="text-white text-xl font-bold mb-2">{image.title}</h3>
                  )}
                  {image.description && (
                    <p className="text-white/90 text-sm">{image.description}</p>
                  )}
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500 text-lg">No images to display</p>
          </div>
        )}

        {/* Navigation Arrows */}
        {(images.length > 1 || images.length === 0) && (
          <>
            <Button
              variant="ghost"
              size="icon"
              className={`absolute left-4 top-1/2 -translate-y-1/2 ${images.length > 1 ? 'bg-black/20 hover:bg-black/40 text-white' : 'bg-black/10 text-gray-400 cursor-not-allowed'} border-0 rounded-full h-12 w-12`}
              onClick={images.length > 1 ? goToPrevious : undefined}
              aria-label="Previous image"
              disabled={images.length === 0}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className={`absolute right-4 top-1/2 -translate-y-1/2 ${images.length > 1 ? 'bg-black/20 hover:bg-black/40 text-white' : 'bg-black/10 text-gray-400 cursor-not-allowed'} border-0 rounded-full h-12 w-12`}
              onClick={images.length > 1 ? goToNext : undefined}
              aria-label="Next image"
              disabled={images.length === 0}
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </>
        )}
      </div>

      {/* Progress Dots */}
      <div className="flex justify-center space-x-2 mt-4">
        {images.length > 1 ? (
          images.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex ? 'bg-tansa-blue scale-110' : 'bg-gray-300 hover:bg-gray-400'
              }`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))
        ) : (
          <span className="h-3 w-3 bg-gray-300 rounded-full mx-1 inline-block opacity-50" />
        )}
      </div>

      {/* Image Counter */}
      {images.length > 1 && (
        <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
          {currentIndex + 1} / {images.length}
        </div>
      )}
    </div>
  )

  return (
    <div className={`relative w-full ${className}`}>
      {/* Main Image Container */}
      <div className="relative h-96 overflow-hidden rounded-lg bg-gray-100">
        {images.map((image, index) => (
          <div
            key={image.id}
            className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
              index === currentIndex
                ? 'translate-x-0'
                : index < currentIndex
                  ? '-translate-x-full'
                  : 'translate-x-full'
            }`}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover"
              priority={index === 0}
            />

            {/* Image Overlay with Title and Description */}
            {(image.title || image.description) && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                {image.title && (
                  <h3 className="text-white text-xl font-bold mb-2">{image.title}</h3>
                )}
                {image.description && <p className="text-white/90 text-sm">{image.description}</p>}
              </div>
            )}
          </div>
        ))}

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white border-0 rounded-full h-12 w-12"
              onClick={goToPrevious}
              aria-label="Previous image"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white border-0 rounded-full h-12 w-12"
              onClick={goToNext}
              aria-label="Next image"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </>
        )}
      </div>

      {/* Progress Dots */}
      {images.length > 1 && (
        <div className="flex justify-center space-x-2 mt-4">
          {images.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex ? 'bg-tansa-blue scale-110' : 'bg-gray-300 hover:bg-gray-400'
              }`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Image Counter */}
      {images.length > 1 && (
        <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
          {currentIndex + 1} / {images.length}
        </div>
      )}
    </div>
  )
}

export default EventsCarousel
