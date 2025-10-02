import Image from 'next/image'
import { Suspense } from 'react'
import { getEvents } from '@/libs/server'
import EventsGrid from '@/components/events/EventsGrid'
import EventCardSkeleton from '@/components/events/EventSkeleton'

async function EventsContent() {
  const events: EventItem[] = await getEvents()

  const groupedEvents = new Map<string, { date: string; photos: string[] }>()

  for (const event of events) {
    if (!groupedEvents.has(event.title)) {
      groupedEvents.set(event.title, {
        date: event.date,
        photos: [],
      })
    }
    const urls = event.photos?.map((photo) => photo.url) ?? []
    groupedEvents.get(event.title)!.photos.push(...urls)
  }

  const sortedEvents = Array.from(groupedEvents.entries())
    .map(([title, data]) => ({ title, ...data }))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return <EventsGrid events={sortedEvents} />
}

function EventsLoading() {
  return (
    <div className="container mx-auto max-w-6xl px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <EventCardSkeleton key={i} />
        ))}
      </div>
    </div>
  )
}

export default function PastEventsPage() {
  return (
    <div className="bg-tansa-blue">
      {/* Header Section */}
      <div className="max-w-6xl h-[300px] mx-auto flex items-center justify-between py-16 relative overflow-clip">
        {/* Left text */}
        <div className="font-newkansas font-bold text-white leading-none text-8xl">
          <h1>Past</h1>
          <h1>Events</h1>
        </div>
        {/* Bear image */}
        <div className="absolute right-0 bottom-[-190px] select-none">
          <Image
            src="/bears/hooray 1.svg"
            alt="Bear"
            width={450}
            height={450}
            className="object-contain"
            priority // Prioritize header image
            quality={50} // Lower quality for smaller file size

          />
        </div>
      </div>

      {/* Events Grid */}
      <div className="bg-tansa-cream py-12 border-t-8 border-tansa-cream">
        <Suspense fallback={<EventsLoading />}>
          <EventsContent />
        </Suspense>
      </div>
    </div>
  )
}
