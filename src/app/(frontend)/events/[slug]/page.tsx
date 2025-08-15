import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { getEvents } from '@/libs/server'
import { notFound } from 'next/navigation'

interface EventGalleryPageProps {
  params: {
    slug: string
  }
}

export default async function EventGalleryPage({ params }: EventGalleryPageProps) {
  const events: EventItem[] = await getEvents()

  // Group events by title and find the matching event
  const groupedEvents: Record<string, { date: string; photos: string[] }> = {}
  for (const event of events) {
    if (!groupedEvents[event.title]) {
      groupedEvents[event.title] = {
        date: event.date,
        photos: [],
      }
    }
    const urls = event.photos?.map((photo) => photo.url) ?? []
    groupedEvents[event.title].photos.push(...urls)
  }

  // Find event by slug
  const eventEntry = Object.entries(groupedEvents).find(
    ([title]) =>
      title
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '') === params.slug,
  )

  if (!eventEntry) {
    notFound()
  }

  const [title, { date, photos }] = eventEntry

  return (
    <div className="min-h-screen bg-tansa-cream">
      {/* Header */}
      <div className="bg-tansa-blue">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <Link
            href="/events"
            className="inline-flex items-center text-tansa-cream hover:text-tansa-cream/80 transition-colors mb-6"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Past Events
          </Link>
          <div className="text-tansa-cream">
            <h1 className="text-4xl md:text-5xl font-bold font-newkansas mb-2">{title}</h1>
            <p className="text-lg opacity-90">{date}</p>
            <p className="text-sm opacity-75 mt-2">{photos.length} photos</p>
          </div>
        </div>
      </div>

      {/* Gallery */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {photos.map((url, idx) => (
            <div
              key={idx}
              className="relative aspect-square overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow cursor-pointer group"
            >
              <Image
                src={url}
                alt={`${title} photo ${idx + 1}`}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
            </div>
          ))}
        </div>

        {/* Empty state */}
        {photos.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">No photos available for this event.</p>
          </div>
        )}
      </div>
    </div>
  )
}
