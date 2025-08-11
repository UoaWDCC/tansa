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
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
