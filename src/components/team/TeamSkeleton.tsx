export default function TeamSkeleton() {
  return (
    <div className="bg-tansa-blue">
      <div className="bg-tansa-blue overflow-hidden">
        <div className="max-w-6xl relative mx-auto flex items-center justify-between py-[clamp(2rem,6vw,4rem)] h-[clamp(180px,30vw,300px)]">
          <div>
            <div className="h-[clamp(2rem,4vw,4rem)] w-[clamp(150px,25vw,250px)] bg-white/20 rounded animate-pulse mb-4" />
            <div className="h-[clamp(2.5rem,5vw,5rem)] w-[clamp(200px,30vw,320px)] bg-white/20 rounded animate-pulse" />
          </div>
          <div className="w-[clamp(200px,30vw,400px)] bottom-[-10%] absolute right-0">
            <div className="w-full aspect-square bg-white/10 rounded animate-pulse" />
          </div>
        </div>
      </div>

      {/* Skeleton for team sections */}
      {[1, 2, 3].map((section) => (
        <div key={section} className="bg-tansa-cream">
          <div className="container mx-auto px-4 pt-12 text-center">
            <div className="h-[clamp(1.5rem,3vw,2rem)] w-[clamp(150px,25vw,200px)] bg-gray-300 rounded animate-pulse mx-auto" />
          </div>
          <div className="mx-auto flex flex-wrap justify-center gap-[clamp(1rem,3vw,2.5rem)] pt-6 pb-6">
            {[1, 2, 3, 4].map((card) => (
              <div key={card} className="flex flex-col items-center w-[clamp(150px,20vw,250px)] min-h-[clamp(220px,28vw,350px)]">
                <div className="w-full aspect-square bg-gray-300 rounded-md animate-pulse" />
                <div className="mt-2 h-[clamp(1rem,2vw,1.5rem)] w-[clamp(100px,15vw,150px)] bg-gray-300 rounded animate-pulse" />
                <div className="mt-1 h-[clamp(0.8rem,1.5vw,1rem)] w-[clamp(80px,12vw,120px)] bg-gray-300 rounded animate-pulse" />
                <div className="mt-1 h-[clamp(0.8rem,1.5vw,1rem)] w-[clamp(90px,13vw,140px)] bg-gray-300 rounded animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
