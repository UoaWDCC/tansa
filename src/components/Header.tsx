'use client'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { ArrowRight, MoveRight, PawPrint } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'

const Header = () => {
  const pathname = usePathname()
  const router = useRouter()
  const [loadingPath, setLoadingPath] = useState<string | null>(null)

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About Us' },
    { href: '/events', label: 'Events' },
    { href: '/sponsors', label: 'Sponsors' },
    { href: '/contact', label: 'Contact' },
  ]

  const handleClick = (href: string) => {
    if (pathname !== href) {
      setLoadingPath(href)
      router.push(href)
    }
  }

  // Reset loading state when route changes
  useEffect(() => {
    setLoadingPath(null)
  }, [pathname])

  return (
    <header className="sticky top-0 z-50 px-4 py-4 bg-tansa-blue">
      <div className="flex items-center justify-between w-full">
        {/*Left Side Element*/}
        <Link href="/" className="flex-1">
          <div className="flex items-center space-x-6 group">
            <div className="h-16 w-16 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
              <Image
                src="/TANSA-LOGO.svg"
                width={500}
                height={500}
                alt="tansa bear logo"
                className="transition-all duration-300 group-hover:rotate-6"
              />
            </div>

            <div className="text-white select-none">
              <h1 className="font-bold text-lg text-tansa-cream leading-tight transition-colors duration-300 group-hover:text-white">
                Taiwanese and New Zealand
              </h1>
              <h2 className="text-lg text-tansa-cream leading-tight transition-colors duration-300 group-hover:text-white">
                Students' Association
              </h2>
            </div>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:block flex-2">
          <ul className="flex items-center justify-center space-x-10 text-tansa-cream">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`relative px-2 py-1 font-bold group flex items-center ${
                    pathname === item.href ? 'text-tansa-cream' : 'hover:text-white'
                  }`}
                >
                  <span className="flex items-center relative">
                    <span className="transition-transform duration-200 group-hover:-translate-x-4 ml-1 mr-2">
                      {item.label}
                    </span>
                    <ArrowRight className="h-4 w-4 absolute transition-all duration-200 opacity-0 group-hover:opacity-100 right-[-24px] group-hover:right-0" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Right Side Elements */}
        <div className="flex-1 flex justify-end">
          <div className="flex items-center space-x-4">
            {/* Snowflake Icon */}
            <Link
              href="https://linktr.ee/tansa.ausa"
              target="blank"
              className="text-white transition-all duration-300 hover:scale-110"
            >
              <Image src="/icons/linktree.svg" width={20} height={20} alt="LinkTree" />
            </Link>

            {/* Join Us Button */}
            <Link
              href="/sign-up"
              className="bg-tansa-cream text-tansa-blue px-3 py-2 rounded-full font-bold transition-transform duration-200 group-hover:-translate-x-6 flex items-center group relative min-w-[110px]"
            >
              <span className="inline-block h-4 w-4 relative">
                <PawPrint className="absolute h-4 w-4 left-0 top-0 transition-transform duration-200 group-hover:-translate-x-6 opacity-100 group-hover:opacity-0" />
              </span>
              <span className="mx-2 flex items-center relative">
                <span className="transition-transform duration-200 group-hover:-translate-x-4 ml-1 mr-2">
                  Join TANSA!
                </span>
                <ArrowRight className="h-4 w-4 absolute transition-all duration-200 opacity-0 group-hover:opacity-100 right-[-24px] group-hover:right-0" />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
