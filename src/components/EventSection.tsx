import Image from "next/image"

interface EventSectionProps {
  title: string
  date: string
  photoUrls: string[]
}

export default function EventSection({ title, date, photoUrls }: EventSectionProps) {
  return (
    <section className="space-y-6">
      {/* Title Row */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-tansa-blue font-newkansas">
            {title}
          </h2>
          <p className="text-sm text-gray-600">({date})</p>
        </div>
        <button className="bg-tansa-blue text-white rounded-full px-4 py-1 text-sm font-medium hover:opacity-90 transition">
          Photos
        </button>
      </div>

      {/* Photos */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {photoUrls.map((url, idx) => (
          <div key={idx} className="relative aspect-[4/3] overflow-hidden rounded-lg">
            <Image
              src={url}
              alt={`${title} photo ${idx + 1}`}
              fill
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </section>
  )
}
