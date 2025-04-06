'use client'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { Playfair_Display } from 'next/font/google'
import { Calendar, ChevronLeft, ChevronRight, Grid, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

// Initialize the Playfair Display font
const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['600', '700'],
})

interface GalleryClientProps {
  events: EventItem[]
}

export default function GalleryClient({ events }: GalleryClientProps) {
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null)
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)
  const [viewMode, setViewMode] = useState<'carousel' | 'grid'>('carousel')
  const [isHydrated, setIsHydrated] = useState(false)

  const openEventGallery = (event: EventItem) => {
    setSelectedEvent(event)
    setCurrentPhotoIndex(0)
    setViewMode('carousel')
  }

  const closeEventGallery = () => {
    setSelectedEvent(null)
  }

  const nextPhoto = () => {
    if (!selectedEvent) return
    setCurrentPhotoIndex((prev) => (prev === selectedEvent.photos.length - 1 ? 0 : prev + 1))
  }

  const prevPhoto = () => {
    if (!selectedEvent) return
    setCurrentPhotoIndex((prev) => (prev === 0 ? selectedEvent.photos.length - 1 : prev - 1))
  }

  const goToPhoto = (index: number) => {
    setCurrentPhotoIndex(index)
    setViewMode('carousel')
  }

  const toggleViewMode = () => {
    setViewMode((prev) => (prev === 'carousel' ? 'grid' : 'carousel'))
  }

  // Mark the component as hydrated once it's mounted
  useEffect(() => {
    setIsHydrated(true)
  }, [])

  if (!isHydrated) return null // Prevent hydration mismatch until mounted

  return (
    <>
      {/* Gallery Content */}
      <section className="w-full py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          {/* Events Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <div
                key={event.id}
                className="group relative overflow-hidden rounded-lg shadow-md cursor-pointer transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg"
                onClick={() => openEventGallery(event)}
              >
                <div className="relative h-100 w-full">
                  <Image
                    src={event.coverImage.url || '/placeholder.svg'}
                    alt={event.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <h3 className={`${playfair.className} text-lg font-semibold mb-1`}>
                      {event.title}
                    </h3>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-white/80">
                        <Calendar className="h-3 w-3 mr-1" />
                        <span>{event.date}</span>
                      </div>
                      <div className="text-sm text-white/80">{event.photos.length} photos</div>
                    </div>
                  </div>
                  <div className="absolute top-3 right-3 bg-[#c1452b] text-white text-xs font-medium px-2 py-1 rounded">
                    {event.category}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Event Photo Gallery Modal */}
          {selectedEvent && (
            <div className="fixed inset-0 z-50 bg-black/90 flex flex-col">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-4 bg-black/50 text-white">
                <div>
                  <h2 className={`${playfair.className} text-xl md:text-2xl font-semibold`}>
                    {selectedEvent.title}
                  </h2>
                  <div className="flex items-center text-sm text-white/80">
                    <Calendar className="h-3 w-3 mr-1" />
                    <span>{selectedEvent.date}</span>
                    <span className="mx-2">•</span>
                    <span>
                      {currentPhotoIndex + 1} of {selectedEvent.photos.length}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-white/20"
                    onClick={toggleViewMode}
                  >
                    <Grid className="h-5 w-5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-white/20"
                    onClick={closeEventGallery}
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              {/* Photo View Area */}
              <div className="flex-1 overflow-hidden relative">
                {viewMode === 'carousel' ? (
                  <>
                    {/* Carousel View */}
                    <div className="h-full flex items-center justify-center p-4">
                      <div className="relative max-h-full max-w-full">
                        <Image
                          src={
                            selectedEvent.photos[currentPhotoIndex].photo.url || '/placeholder.svg'
                          }
                          alt={`Photo ${currentPhotoIndex + 1} from ${selectedEvent.title}`}
                          width={1200}
                          height={800}
                          className="max-h-[80vh] w-auto object-contain"
                        />
                        {selectedEvent.photos[currentPhotoIndex].photo.title && (
                          <div className="absolute bottom-0 left-0 right-0 p-4 bg-black/50 text-white text-center">
                            {selectedEvent.photos[currentPhotoIndex].photo.title}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Navigation Buttons */}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-1/2 left-4 -translate-y-1/2 text-white hover:bg-white/20 h-12 w-12 rounded-full"
                      onClick={prevPhoto}
                    >
                      <ChevronLeft className="h-8 w-8" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-1/2 right-4 -translate-y-1/2 text-white hover:bg-white/20 h-12 w-12 rounded-full"
                      onClick={nextPhoto}
                    >
                      <ChevronRight className="h-8 w-8" />
                    </Button>
                  </>
                ) : (
                  // Grid View
                  <div className="h-full overflow-auto p-4">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {selectedEvent.photos.map((photo, index) => (
                        <div
                          key={photo.id}
                          className={`relative cursor-pointer rounded-lg overflow-hidden border-2 ${index === currentPhotoIndex ? 'border-[#c1452b]' : 'border-transparent'}`}
                          onClick={() => goToPhoto(index)}
                        >
                          <div className="relative h-60 w-full">
                            <Image
                              src={photo.photo.url || '/placeholder.svg'}
                              alt={photo.photo.event || `Photo ${index + 1}`}
                              fill
                              className="object-cover"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Thumbnail Navigation */}
              {viewMode === 'carousel' && (
                <div className="p-2 bg-black/50">
                  <div className="flex overflow-x-auto gap-2 pb-2">
                    {selectedEvent.photos.map((photo, index) => (
                      <div
                        key={photo.id}
                        className={`relative flex-shrink-0 cursor-pointer rounded-md overflow-hidden border-2 ${index === currentPhotoIndex ? 'border-[#c1452b]' : 'border-transparent'}`}
                        onClick={() => setCurrentPhotoIndex(index)}
                      >
                        <div className="relative h-16 w-24">
                          <Image
                            src={photo.photo.url || '/placeholder.svg'}
                            alt={photo.photo.event || `Thumbnail ${index + 1}`}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
