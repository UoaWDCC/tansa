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
    'Interns'
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
        <div className="max-w-6xl h-[300px] relative mx-auto flex items-center justify-between py-16">
          <div>
            <h1 className="text-6xl text-white font-newkansas">Meet our</h1>
            <h1 className="text-8xl text-white font-newkansas">Team!</h1>
          </div>
          <div className="w-[400px] bottom-[-70px] absolute right-0 select-none">
            <Image
              src="/bears/lying_on_stomach.svg"
              alt="bear lying on stomach"
              width={400}
              height={400}
              className="object-contain"
              priority
            />
          </div>
        </div>
      </div>

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
