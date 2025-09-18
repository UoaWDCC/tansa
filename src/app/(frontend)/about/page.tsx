import { getExecMembers } from '@/libs/server'
import Image from 'next/image'

export default async function AboutPage() {
  const exec = await getExecMembers()

  const categories = [
    { title: 'Presidents', members: exec.filter((m) => m.category === 'Presidents') },
    { title: 'Admin', members: exec.filter((m) => m.category === 'Admin') },
    { title: 'Marketing', members: exec.filter((m) => m.category === 'Marketing') },
    { title: 'Activities', members: exec.filter((m) => m.category === 'Activities') },
    { title: 'AESIR', members: exec.filter((m) => m.category === 'AESIR') },
    {
      title: 'Public Relations Officer',
      members: exec.filter((m) => m.category === 'Public Relations Officer'),
    },
    { title: 'Design', members: exec.filter((m) => m.category === 'Design') },
    { title: 'Photography', members: exec.filter((m) => m.category === 'Photography') },
  ]

  return (
    <div className="bg-tansa-blue">
      <div className="bg-tansa-blue overflow-hidden">
        <div className="max-w-6xl relative mx-auto flex items-center justify-between py-[clamp(2rem,6vw,4rem)] h-[clamp(180px,30vw,300px)]">
          <div>
            <h1 className="text-[clamp(2rem,4vw,3.75rem)] text-tansa-cream font-newkansas">Meet our</h1>
            <h1 className="text-[clamp(3rem,6vw,5.5rem)] text-tansa-cream font-newkansas">Team!</h1>
          </div>
          <div className="w-[clamp(200px,30vw,400px)] bottom-[-10%] absolute right-0 select-none">
            <Image
              src="/bears/lying_on_stomach.svg"
              alt="bear lying on stomach"
              width={400}
              height={400}
              className="object-contain w-full h-auto"
            />
          </div>
        </div>
      </div>
      {/* TEAM SECTIONS */}
      {categories
        .filter(({ members }) => members.length > 0)
        .map(({ title, members }) => (
          <div key={title} className="bg-tansa-cream">
            <div className="container mx-auto px-4 pt-12 text-center">
              <h1 className="text-[clamp(1.5rem,3vw,2rem)] text-tansa-blue font-newkansas">{title}</h1>
            </div>
            <div className="mx-auto flex flex-wrap justify-center gap-[clamp(1rem,3vw,2.5rem)] pt-6 pb-6">
              {members.map((member) => (
                <div key={member.id} className="flex flex-col items-center w-[clamp(150px,20vw,250px)] min-h-[clamp(220px,28vw,350px)]">
                  <Image
                    src={member.profileImage?.url || '/placeholder.svg'}
                    alt={member.name}
                    width={250}
                    height={250}
                    className="rounded-md object-cover w-full h-auto aspect-square"
                  />
                  <p className="mt-2 text-center text-[clamp(1rem,2vw,1.5rem)] text-tansa-blue font-newkansas">
                    {member.name}
                  </p>
                  <p className="text-center text-[clamp(0.8rem,1.5vw,1rem)] text-tansa-blue font-newkansas">
                    {member.position}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
    </div>
  )
}
