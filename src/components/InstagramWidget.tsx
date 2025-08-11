'use client'

import { useEffect } from 'react'

const InstagramWidget: React.FC = () => {
  useEffect(() => {
    const scriptId = 'EmbedSocialHashtagScript'

    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script')
      script.id = scriptId
      script.src = 'https://embedsocial.com/cdn/ht.js'
      script.async = true
      document.head.appendChild(script)
    }
  }, [])

  return (
    <div className="bg-tansa-cream py-10">
      <div className="flex flex-col items-center justify-center w-full">
        {/* Embed widget */}
        <div
          className="embedsocial-hashtag w-full max-w-7xl"
          data-ref="636cc88bfcebf34c012ce78822b9d909e8f36d5e"
        />
      </div>
    </div>
  )
}

export default InstagramWidget
