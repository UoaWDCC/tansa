import Image from 'next/image'
import EventSection from '@/components/EventSection'
import { getEvents } from '@/libs/server'

export default async function PastEventsPage() {
  const events = await getEvents()

  // Group events by title
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

  return (
    <main className="min-h-screen">
      {/* Header Section with Bear and Title */}
      <div className="bg-tansa-blue relative h-[400px] flex items-center justify-center">
        <h1 className="text-6xl md:text-8xl font-bold text-white font-newkansas z-10">
          Past Events
        </h1>
        <Image
          src="/bears/hooray 1.svg"
          alt="Bear"
          width={200}
          height={200}
          className="absolute right-12 bottom-0 hidden md:block"
        />
      </div>

      {/* Events Section */}
      <div className="bg-tansa-cream py-12">
        <div className="container mx-auto px-4 max-w-7xl space-y-16">
          {Object.entries(groupedEvents).map(([title, { date, photos }]) => (
            <EventSection key={title} title={title} date={date} photoUrls={photos} />
          ))}
        </div>
      </div>
    </main>
  )
}
