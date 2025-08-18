import MemberCard from './MemberCard'

interface TeamSectionProps {
  title: string
  members: ExecMember[]
  isFirst?: boolean
}

export default function TeamSection({ title, members, isFirst = false }: TeamSectionProps) {
  if (members.length === 0) return null

  return (
    <div className="bg-tansa-cream">
      <div className="container mx-auto px-4 pt-12 text-center">
        <h1 className="text-3xl text-tansa-blue font-newkansas">{title}</h1>
      </div>
      <div className="mx-auto flex flex-wrap justify-center gap-10 pt-6 pb-6">
        {members.map((member, index) => (
          <MemberCard
            key={member.id}
            member={member}
            priority={isFirst && index < 4} // Prioritize first 4 images in first section
          />
        ))}
      </div>
    </div>
  )
}
