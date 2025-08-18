'use client'
import { useState } from 'react'
import EventCard from './EventCard'
import EventCardSkeleton from './EventSkeleton'

interface EventsGridProps {
  events: Array<{
    title: string
    date: string
    photos: string[]
  }>
  initialLoad?: number // Support progressive loading
}

export default function EventsGrid({ events, initialLoad = 8 }: EventsGridProps) {
  const [displayCount, setDisplayCount] = useState(initialLoad)
  const [isLoadingMore, setIsLoadingMore] = useState(false)

  const loadMore = async () => {
    setIsLoadingMore(true)
    await new Promise((resolve) => setTimeout(resolve, 500))
    setDisplayCount((prev) => Math.min(prev + 8, events.length))
    setIsLoadingMore(false)
  }

  const displayedEvents = events.slice(0, displayCount)
  const hasMore = displayCount < events.length

  return (
    <div className="container mx-auto max-w-6xl px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {displayedEvents.map(({ title, date, photos }, index) => (
          <EventCard
            key={title}
            title={title}
            date={date}
            photoUrls={photos}
            slug={title
              .toLowerCase()
              .replace(/\s+/g, '-')
              .replace(/[^a-z0-9-]/g, '')}
            priority={index < 4} // Prioritize first 4 images (above fold)
          />
        ))}

        {isLoadingMore &&
          Array.from({ length: 4 }).map((_, i) => <EventCardSkeleton key={`skeleton-${i}`} />)}
      </div>

      {hasMore && (
        <div className="flex justify-center mt-8">
          <button
            onClick={loadMore}
            disabled={isLoadingMore}
            className="bg-tansa-blue text-white px-6 py-3 rounded-full font-medium hover:bg-tansa-blue/90 transition-colors disabled:opacity-50"
          >
            {isLoadingMore ? 'Loading...' : `Load More (${events.length - displayCount} remaining)`}
          </button>
        </div>
      )}
    </div>
  )
}
