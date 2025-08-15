import Image from 'next/image'
import Link from 'next/link'

interface EventCardProps {
  title: string
  date: string
  photoUrls: string[]
  slug: string
}

export default function EventCard({ title, date, photoUrls, slug }: EventCardProps) {
  const coverImage = photoUrls[0] || '/placeholder-event.jpg' // Fallback image
  const photoCount = photoUrls.length

  return (
    <Link href={`/events/${slug}`} className="group cursor-pointer">
      <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        {/* Cover Image */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={coverImage}
            alt={`${title} cover`}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
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
        </div>

        {/* Event Info */}
        <div className="p-4">
          <h3 className="font-bold text-lg text-tansa-blue font-newkansas line-clamp-2 group-hover:text-tansa-blue/80 transition-colors">
            {title}
          </h3>
          <p className="text-sm text-gray-600 mt-1">{date}</p>
        </div>
      </div>
    </Link>
  )
}
