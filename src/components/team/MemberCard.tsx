'use client'

import Image from 'next/image'
import { useState, useRef, useEffect } from 'react'

interface MemberCardProps {
  member: ExecMember
  priority?: boolean
}

export default function MemberCard({ member, priority = false }: MemberCardProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1, rootMargin: '50px' },
    )

    if (cardRef.current) {
      observer.observe(cardRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={cardRef}
      className="flex flex-col items-center w-[clamp(150px,20vw,250px)] min-h-[clamp(220px,28vw,350px)] transition-opacity duration-500"
      style={{ opacity: isVisible ? 1 : 0 }}
    >
      <div className="relative w-full aspect-square rounded-md overflow-hidden bg-gray-200">
        {isVisible && (
          <Image
            src={
              member.profileImage?.url ||
              '/placeholder.svg?height=250&width=250&query=team member portrait'
            }
            alt={member.name}
            width={250}
            height={250}
            priority={priority}
            className={`rounded-md object-cover w-full h-full transition-opacity duration-300 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,..."
          />
        )}
        {!imageLoaded && isVisible && (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse" />
        )}
      </div>
      <p className="mt-2 text-center text-[clamp(1rem,2vw,1.5rem)] text-tansa-blue font-newkansas">{member.name}</p>
      <p className="text-center text-[clamp(0.8rem,1.5vw,1rem)] text-tansa-blue font-newkansas">{member.position}</p>
      <p className="text-center text-[clamp(0.8rem,1.5vw,1rem)] text-tansa-blue font-newkansas">{member.degree}</p>
    </div>
  )
}
