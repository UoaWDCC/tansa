import { Suspense } from 'react'
import Loading from './loading'
import { Exec } from '@/payload-types' 

async function getExecMembers(): Promise<Exec[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_CMS_URL}/api/exec?limit=100`, {
    next: { revalidate: 60 },
  });
  const data = await res.json();
  return data.docs;
}

export default async function AboutPage() {
  const exec = await getExecMembers();

  const categories = [
    { title: 'Presidents', members: exec.filter(m => m.category === 'Presidents') },
    { title: 'Admin', members: exec.filter(m => m.category === 'Admin') },
    { title: 'Marketing', members: exec.filter(m => m.category === 'Marketing') },
    { title: 'Activities', members: exec.filter(m => m.category === 'Activities') },
    { title: 'AESIR', members: exec.filter(m => m.category === 'AESIR') },
    { title: 'Public Relations Officer', members: exec.filter(m => m.category === 'Public Relations Officer') },
    { title: 'Design', members: exec.filter(m => m.category === 'Design') },
    { title: 'Photography', members: exec.filter(m => m.category === 'Photography') },
  ];

  return (
    <div>
      <div className="bg-tansa-blue h-[400px] flex flex-col justify-end relative overflow-hidden">
        <div className="container mx-20 px-20 mt-20 mb-10 relative z-10">
          <h1 className="text-6xl text-tansa-cream font-newkansas">Meet our</h1>
          <h1 className="text-8xl text-tansa-cream font-newkansas">Team!</h1>
        </div>
        <div className="absolute bottom-[-80px] right-0 z-0 w-[400px] md:w-[400px] lg:w-[500px]">
          <img
            src="/bears/lying_on_stomach.svg"
            alt="bear lying on stomach"
            width={500}
            height={500}
            className="object-contain w-full h-auto"
          />
        </div>
      </div>

      {categories.map(({ title, members }) => (
        <div key={title} className="bg-tansa-cream min-h-[500px]">
          <div className="container mx-auto px-4 pt-12 text-center">
            <h1 className="text-3xl text-tansa-blue font-newkansas">{title}</h1>
          </div>
          <div className="mx-auto flex flex-wrap justify-center gap-10 pt-10">
            {members.map((member) => (
              <div key={member.id} className="flex flex-col items-center">
                <img
                  src={member.url || '/placeholder.jpg'}
                  alt={member.name}
                  width={250}
                  height={250}
                  className="rounded-md"
                />
                <p className="mt-2 text-center text-2xl text-tansa-blue font-newkansas">{member.name}</p>
                <p className="mt-2 text-center text-base text-tansa-blue font-newkansas">{member.position}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
