import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'embedsocial.com',
        pathname: '/**',
      },
    ],
  },
  webpack: (config, { dev, isServer }) => {
    // Disable webpack caching in development to avoid snapshot errors
    if (dev) {
      config.cache = false
    }
    return config
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
