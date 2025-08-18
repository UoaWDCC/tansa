export default function EventCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden animate-pulse">
      {/* Image skeleton */}
      <div className="relative aspect-[4/3] bg-gray-200">
        <div className="absolute top-3 right-3 bg-gray-300 h-6 w-16 rounded-full"></div>
      </div>

      {/* Content skeleton */}
      <div className="p-4">
        <div className="h-6 bg-gray-200 rounded mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-2/3"></div>
      </div>
    </div>
  )
}
