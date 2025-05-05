'use client'
import React, { useState, FC, ChangeEvent, MouseEvent } from 'react'
import { Send, Snowflake, Mail, Instagram, Facebook } from 'lucide-react'

// Interface for Footer props if needed in the future
interface FooterProps {
  // Add any props you might need
}

const Footer: FC<FooterProps> = () => {
  const [email, setEmail] = useState<string>('')

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value)
  }

  const handleSubmit = (e: MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault()
    // Handle newsletter signup logic here
    console.log('Email submitted:', email)
    setEmail('')
  }

  return (
    <footer className="bg-tansa-blue text-white p-4 mt-auto">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* About Us Section */}
          <div className="md:col-span-1">
            <h3 className="font-bold text-xl mb-4">About Us</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:underline">
                  Our Team
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Our Mission
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Our Sponsors
                </a>
              </li>
            </ul>
          </div>

          {/* Events Section */}
          <div className="md:col-span-1">
            <h3 className="font-bold text-xl mb-4">Events</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:underline">
                  Upcoming Events
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Past Events
                </a>
              </li>
            </ul>
          </div>

          {/* Recruitment Section */}
          <div className="md:col-span-1">
            <h3 className="font-bold text-xl mb-4">Recruitment</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:underline">
                  Open Roles
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Recruitment Timeline
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Expression of Interest
                </a>
              </li>
            </ul>
          </div>

          {/* Sponsor Section */}
          <div className="md:col-span-1">
            <h3 className="font-bold text-xl mb-4">Sponsor</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:underline">
                  Sponsorship Perks
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Become a Sponsor
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter Section */}
          <div className="md:col-span-1">
            <h3 className="font-bold text-xl mb-4">Sign up to our newsletter!</h3>
            <div className="flex mb-4">
              <input
                type="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="Email address"
                className="px-4 py-2 w-full rounded-l text-gray-800"
                aria-label="Email for newsletter"
              />
              <button
                onClick={handleSubmit}
                className="bg-amber-100 text-gray-800 px-2 rounded-r hover:bg-amber-200"
                aria-label="Subscribe to newsletter"
              >
                <Send size={18} />
              </button>
            </div>

            {/* Social Media Icons */}
            <div className="flex space-x-4 mt-4 py-2">
              <a href="#" className="hover:text-amber-100" aria-label="Snowflake social link">
                <Snowflake size={24} />
              </a>
              <a href="#" className="hover:text-amber-100" aria-label="Email">
                <Mail size={24} />
              </a>
              <a href="#" className="hover:text-amber-100" aria-label="Instagram">
                <Instagram size={24} />
              </a>
              <a href="#" className="hover:text-amber-100" aria-label="Facebook">
                <Facebook size={24} />
              </a>
              {/* TikTok icon not available in lucide-react, using a text alternative */}
              <a href="#" className="hover:text-amber-100" aria-label="TikTok">
                <span className="text-xl">♪</span>
              </a>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="border-t border-white/30 pt-4">
          <p>© 2025 TANSA + WDCC</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
