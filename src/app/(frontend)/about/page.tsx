// app/gallery/page.tsx

'use client'

import { ExecutiveTeam, ExecutiveTeamSelect } from '@/payload-types'
import { useEffect, useState } from 'react'

export default function AboutPage() {
  const [executives, setExecutives] = useState<ExecutiveTeam[]>([])

  useEffect(() => {
    fetchExecutives()
  }, [])

  async function fetchExecutives(): Promise<any> {
    try {
      const response = await fetch('/api/executive-team', {
        method: 'GET',
      })

      if (!response.ok) {
        console.error('Error fetching executives.')
      }

      const data = await response.json()
      setExecutives(data.executives)
    } catch (error) {
      console.error('Error fetching executives:', error)
    }
  }

  return (
    <div>
      <div className="bg-tansa-blue h-[400px]"></div>
      <h1>about us page</h1>

      <div className="bg-tansa-cream h-[600px]">
        <ul>
          {executives.map((executive) => (
            <li key={executive.id}>
              <h3>
                {executive.name} - {executive.role}
              </h3>
              {executive.ethnicity && (
                <p>
                  <strong>Ethnicity:</strong> {executive.ethnicity}
                </p>
              )}
              {executive.university && (
                <p>
                  <strong>University:</strong> {executive.university}
                </p>
              )}
              {executive.studying && (
                <p>
                  <strong>Studying:</strong> {executive.studying}
                </p>
              )}
              {executive.fun_fact && (
                <p>
                  <strong>Fun Fact:</strong> {executive.fun_fact}
                </p>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
