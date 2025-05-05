import Link from 'next/link'
import React from 'react'

const Header = () => {
  return (
    <header className={`flex items-center justify-center mt-5`}>
      <nav>
        <ul className="flex gap-6 p-4 rounded-lg shadow-md bg-stone-500 text-brown text-xl font-[500] text-white tracking-tight`">
          <li>
            <Link href="/" className="hover:underline">
              Home
            </Link>
          </li>
          <li>
            <Link href="/about" className="hover:underline">
              About us
            </Link>
          </li>
          <li>
            <Link href="/gallery" className="hover:underline">
              Events
            </Link>
          </li>
          <li>
            <Link href="/contact" className="hover:underline">
              Contact us
            </Link>
          </li>
          <li>
            <Link href="/sponsors" className="hover:underline">
              Contact us
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
