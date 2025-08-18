export default function TeamSkeleton() {
  return (
    <div className="bg-tansa-blue">
      <div className="bg-tansa-blue overflow-hidden">
        <div className="max-w-6xl h-[300px] relative mx-auto flex items-center justify-between py-16">
          <div>
            <div className="h-16 w-64 bg-white/20 rounded animate-pulse mb-4" />
            <div className="h-20 w-80 bg-white/20 rounded animate-pulse" />
          </div>
          <div className="w-[400px] bottom-[-70px] absolute right-0">
            <div className="w-[400px] h-[400px] bg-white/10 rounded animate-pulse" />
          </div>
        </div>
      </div>

      {/* Skeleton for team sections */}
      {[1, 2, 3].map((section) => (
        <div key={section} className="bg-tansa-cream">
          <div className="container mx-auto px-4 pt-12 text-center">
            <div className="h-8 w-48 bg-gray-300 rounded animate-pulse mx-auto" />
          </div>
          <div className="mx-auto flex flex-wrap justify-center gap-10 pt-6 pb-6">
            {[1, 2, 3, 4].map((card) => (
              <div key={card} className="flex flex-col items-center w-[250px] min-h-[350px]">
                <div className="w-[250px] h-[250px] bg-gray-300 rounded-md animate-pulse" />
                <div className="mt-2 h-6 w-32 bg-gray-300 rounded animate-pulse" />
                <div className="mt-1 h-4 w-24 bg-gray-300 rounded animate-pulse" />
                <div className="mt-1 h-4 w-28 bg-gray-300 rounded animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
