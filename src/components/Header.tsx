import Link from 'next/link'
import React, { FC } from 'react'
import { Snowflake } from 'lucide-react'

interface HeaderProps {
  // Add any props needed in the future
}

const Header: FC<HeaderProps> = () => {
  return (
    <header className="absolute top-0 left-0 right-0 z-10 px-4 py-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Logo and Organization Name */}
        <div className="flex items-center space-x-4">
          <div className="h-12 w-12 rounded-full bg-white flex items-center justify-center">
            {/* Replace with your actual logo */}
            <div className="h-10 w-10 rounded-full bg-tansa-blue flex items-center justify-center text-tansa-cream"></div>
          </div>
          <div className="text-white">
            <h1 className="font-bold text-lg leading-tight">Taiwanese and New Zealand</h1>
            <h2 className="text-lg leading-tight">Students' Association</h2>
          </div>
        </div>

        {/* Navigation */}
        <nav className="hidden md:block">
          <ul className="flex items-center space-x-8 text-tansa-cream">
            <li>
              <Link href="/" className="hover:underline font-medium">
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:underline font-medium">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/events" className="hover:underline font-medium">
                Events
              </Link>
            </li>
            <li>
              <Link href="/sponsors" className="hover:underline font-medium">
                Sponsors
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:underline font-medium">
                Contact
              </Link>
            </li>
          </ul>
        </nav>

        {/* Right Side Elements */}
        <div className="flex items-center space-x-4">
          {/* Snowflake Icon */}
          <Link href="#" className="text-white">
            <Snowflake size={24} />
          </Link>

          {/* Join Us Button */}
          <Link
            href="/join"
            className="bg-tansa-cream text-gray-700 px-6 py-2 rounded-full font-medium hover:bg-gray-100 transition-colors"
          >
            Join us!
          </Link>
        </div>
      </div>

      {/* Mobile Menu - Hidden by default, would need JavaScript to toggle */}
      <div className="md:hidden">{/* Mobile menu implementation would go here */}</div>
    </header>
  )
}

export default Header
