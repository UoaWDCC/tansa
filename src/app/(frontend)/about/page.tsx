import { Suspense } from 'react'
import { getExecMembers } from '@/libs/server'
import Image from 'next/image'
import TeamSection from '@/components/team/TeamSection'
import TeamSkeleton from '@/components/team/TeamSkeleton'
import { ErrorBoundary } from '@/components/events/ErrorBoundary'

function processTeamCategories(exec: Awaited<ReturnType<typeof getExecMembers>>) {
  const categoryMap = new Map<string, typeof exec>()

  // Group members by category efficiently
  exec.forEach((member) => {
    const existing = categoryMap.get(member.category) || []
    categoryMap.set(member.category, [...existing, member])
  })

  // Define category order
  const categoryOrder = [
    'Presidents',
    'Admin',
    'Marketing',
    'Activities',
    'AESIR',
    'Public Relations Officer',
    'Design',
    'Photography',
    'Interns',
  ]

  return categoryOrder
    .map((title) => ({
      title,
      members: categoryMap.get(title) || [],
    }))
    .filter(({ members }) => members.length > 0)
}

async function TeamContent() {
  const exec = await getExecMembers()
  const categories = processTeamCategories(exec)

  return (
    <div className="bg-tansa-blue">
      <div className="bg-tansa-blue overflow-hidden">
        {/* HERO SECTION - stays like original */}
        <div
          className="max-w-6xl relative mx-auto flex items-center justify-between 
                py-[clamp(1.5rem,4vw,4.5rem)] h-[clamp(180px,25vw,300px)] lg:h-[300px] lg:py-16"
        >
          <div className="pl-4 sm:pl-8 md:pl-12 mt-[clamp(0.5rem,2vw,1rem)] lg:mt-0 relative z-10">
            {/* Text scales on small screens, fixed look on large screens */}
            <h1 className="text-[clamp(2.5rem,5.5vw,4rem)] sm:text-[clamp(3rem,7vw,5rem)] lg:text-6xl text-white font-newkansas">
              Meet our
            </h1>
            <h1 className="text-[clamp(3.5rem,9vw,6rem)] sm:text-[clamp(4rem,10vw,6.5rem)] lg:text-8xl text-white font-newkansas mt-0 sm:mt-4 lg:mt-0">
              Team!
            </h1>
          </div>

          {/* Bear scales on small screens, fixed position/size on large screens */}
          <div className="w-[clamp(180px,30vw,400px)] lg:w-[400px] absolute right-2 sm:right-4 md:right-10 bottom-[-40px] sm:bottom-[-50px] lg:bottom-[-70px] select-none z-0">
            <Image
              src="/bears/lying_on_stomach.svg"
              alt="bear lying on stomach"
              width={400}
              height={400}
              className="object-contain w-full h-auto"
              priority
            />
          </div>
        </div>
      </div>

      {/* TEAM SECTIONS - responsive improvements preserved */}
      {categories.map(({ title, members }, index) => (
        <TeamSection key={title} title={title} members={members} isFirst={index === 0} />
      ))}
    </div>
  )
}

export default function AboutPage() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<TeamSkeleton />}>
        <TeamContent />
      </Suspense>
    </ErrorBoundary>
  )
}
