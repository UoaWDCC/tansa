'use client'
import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

const Header = () => {
  const pathname = usePathname()

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About Us' },
    { href: '/events', label: 'Events' },
    { href: '/sponsors', label: 'Sponsors' },
    { href: '/contact', label: 'Contact' },
  ]

  return (
    <header className="sticky top-0 z-50 px-4 py-4 bg-tansa-blue">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Tansa Logo and Name */}
        <Link href="/">
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
        <nav className="hidden md:block ">
          <ul className="flex items-center space-x-8 text-tansa-cream pl-24">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`relative px-2 py-1 font-bold group ${
                    pathname === item.href ? 'text-tansa-cream' : 'hover:text-white'
                  }`}
                >
                  <span className="relative z-10">{item.label}</span>

                  {/* Hover and active indicator (underline) */}
                  <span
                    className={`absolute left-0 bottom-0 h-0.5 bg-white transition-all duration-300 ${
                      pathname === item.href ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  ></span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Right Side Elements */}
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
            className="bg-tansa-cream text-gray-700 px-5 py-2 rounded-full font-bold transition-all duration-100 hover:bg-white hover:scale-105"
          >
            Join us!
          </Link>
        </div>
      </div>
    </header>
  )
}

export default Header
