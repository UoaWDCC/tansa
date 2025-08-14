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
      {/* HEADER */}
      <div className="bg-tansa-blue overflow-hidden">
        <div className="max-w-6xl h-[300px] relative mx-auto flex items-center justify-between py-16">
          <div>
            <h1 className="text-6xl text-tansa-cream font-newkansas">Meet our</h1>
            <h1 className="text-8xl text-tansa-cream font-newkansas">Team!</h1>
          </div>
          <div className="w-[400px] bottom-[-70px] absolute right-0 select-none">
            <Image
              src="/bears/lying_on_stomach.svg"
              alt="bear lying on stomach"
              width={400}
              height={400}
              className="object-contain"
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
              <h1 className="text-3xl text-tansa-blue font-newkansas">{title}</h1>
            </div>
            <div className="mx-auto flex flex-wrap justify-center gap-10 pt-6 pb-6">
              {members.map((member) => (
                <div key={member.id} className="flex flex-col items-center w-[250px] min-h-[350px]">
                  <Image
                    src={member.profileImage?.url || '/placeholder.svg'}
                    alt={member.name}
                    width={250}
                    height={250}
                    className="rounded-md object-cover h-[250px] w-[250px]"
                  />
                  <p className="mt-2 text-center text-2xl text-tansa-blue font-newkansas">
                    {member.name}
                  </p>
                  <p className="text-center text-base text-tansa-blue font-newkansas">
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
