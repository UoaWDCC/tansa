// src/app/(frontend)/events/[slug]/page.tsx
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { getEvents } from '@/libs/server'
import { notFound } from 'next/navigation'
import EventGalleryClient from '@/components/events/EventsGalleryClient'

interface EventGalleryPageProps {
  params: { slug: string }
}

export default async function EventGalleryPage({ params }: EventGalleryPageProps) {
  const { slug } = params

  // Server-side fetch
  const events: EventItem[] = await getEvents()

  // Group events
  const groupedEvents: Record<string, { date: string; photos: string[] }> = {}
  for (const event of events) {
    if (!groupedEvents[event.title]) {
      groupedEvents[event.title] = { date: event.date, photos: [] }
    }
    const urls = event.photos?.map((p) => p.url) ?? []
    groupedEvents[event.title].photos.push(...urls)
  }

  // Find the event by slug
  const eventEntry = Object.entries(groupedEvents).find(
    ([title]) =>
      title
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '') === slug,
  )

  if (!eventEntry) notFound()

  const [title, { date, photos }] = eventEntry

  return (
    <div className="min-h-screen bg-tansa-cream">
      {/* Header */}
      <div className="bg-tansa-blue h-[300px]">
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

      {/* Client-side gallery with original layout */}
      <EventGalleryClient title={title} date={date} photos={photos} />
    </div>
  )
}
