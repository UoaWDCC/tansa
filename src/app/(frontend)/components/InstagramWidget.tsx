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
    <div className="embedsocial-hashtag" data-ref="636cc88bfcebf34c012ce78822b9d909e8f36d5e">
      <a
        className="feed-powered-by-es feed-powered-by-es-feed-img es-widget-branding"
        href="https://embedsocial.com/social-media-aggregator/"
        target="_blank"
        rel="noopener noreferrer"
        title="Instagram widget"
      >
        <img src="https://embedsocial.com/cdn/icon/embedsocial-logo.webp" alt="EmbedSocial" />
        <div className="es-widget-branding-text">Instagram widget</div>
      </a>
    </div>
  )
}

export default InstagramWidget
