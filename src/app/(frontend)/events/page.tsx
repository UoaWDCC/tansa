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
    <div className="bg-tansa-blue">
      {/* Header Section */}
      <div className="max-w-6xl mx-auto flex items-center justify-between py-16 relative overflow-clip">
        {/* Left text */}
        <div className="font-newkansas font-bold text-tansa-cream leading-none text-8xl">
          <h1>
            Past
          </h1>
          <h1>
            Events
          </h1>
        </div>

        {/* Bear image */}
        <div className="absolute right-10 bottom-[-175px]">
          <Image
            src="/bears/hooray 1.svg"
            alt="Bear"
            width={450}
            height={450}
            className="object-contain"
          />
        </div>
      </div>

      {/* Events */}
      <div className="bg-tansa-cream py-12 border-t-8 border-tansa-cream">
        <div className="container mx-auto max-w-6xl space-y-20">
          {Object.entries(groupedEvents).map(([title, { date, photos }]) => (
            <EventSection
              key={title}
              title={title}
              date={date}
              photoUrls={photos}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
