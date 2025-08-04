import Image from 'next/image'

type EventSectionProps = {
  title: string
  date: string
  photoUrls: string[] // array of image URLs
}

export default function EventSection({ title, date, photoUrls }: EventSectionProps) {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-tansa-blue">{title}</h2>
          <p className="text-sm text-gray-500">({date})</p>
        </div>
        <button className="bg-tansa-blue text-white text-sm px-4 py-1 rounded-full hover:bg-blue-800">
          Photos
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {photoUrls.map((url, idx) => (
          <div key={idx} className="rounded-lg overflow-hidden shadow-md">
            <div className="aspect-[4/3] relative">
              <Image src={url} alt={`${title} photo ${idx + 1}`} fill className="object-cover" />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
