'use client'
import React, { useState, FC, ChangeEvent, MouseEvent } from 'react'
import { Send, Snowflake, Mail, Instagram, Facebook } from 'lucide-react'
import { subscribe } from 'diagnostics_channel'

// Interface for Footer props if needed in the future
interface FooterProps {
  // Add any props you might need
}

const Footer: FC<FooterProps> = () => {
  const [email, setEmail] = useState<string>('')
  const [subbed, setSubbed] = useState<boolean>(false)

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value)
  }

  const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email) {
      console.log('No email was submitted.')
    } else if (!emailRegex.test(email)) {
      console.log(email, 'is an invalid email.')
    } else {
      await handleAddEmail(email)
    }
  }

  const handleAddEmail = async (email: string) => {
    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (response.status === 201) {
        console.log(data.email, 'has been successfully subscribed to the newsletter!')
        setSubbed(true)
      }
    } catch (error) {
      console.error('Error during subscription:', error)
    }
  }

  return (
    <footer className="bg-tansa-blue text-white p-6 mt-auto">
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
            {!subbed ? (
              <div className="">
                <h3 className="font-bold text-xl mb-4">Subscribe to our newsletter!</h3>
                <div className="flex mb-4">
                  <input
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                    placeholder="Your email address"
                    className="bg-white px-4 py-2 w-full rounded-l text-gray-800"
                    aria-label="Insert your email here!"
                  />
                  <button
                    onClick={handleSubmit}
                    className="bg-amber-100 text-gray-800 px-2 rounded-r hover:bg-amber-200"
                    aria-label="Subscribe to our newsletter!"
                  >
                    <Send size={18} />
                  </button>
                </div>
              </div>
            ) : (
              <div className="w-full flex justify-end">
                <h3 className="font-bold text-l mb-4">Thank you for subscribing!</h3>
                <img
                  src="/bears/bear 1.svg"
                  className="w-20"
                  alt="Bear waving thanking you for subscribing to our newsletter."
                />
              </div>
            )}

            {/* Social Media Icons */}
            <div className="flex space-x-4 mt-4 py-2">
              <a href="#" className="hover:text-amber-100" aria-label="Linktree Icon">
                <Snowflake size={24} />
              </a>
              <a href="#" className="hover:text-amber-100" aria-label="Email Icon">
                <Mail size={24} />
              </a>
              <a href="#" className="hover:text-amber-100" aria-label="Instagram Icon">
                <Instagram size={24} />
              </a>
              <a href="#" className="hover:text-amber-100" aria-label="Facebook Icon">
                <Facebook size={24} />
              </a>
              {/* TikTok icon not available in lucide-react, using a text alternative */}
              <a href="#" className="hover:text-amber-100" aria-label="TikTok Icon">
                <span className="text-xl">♪</span>
              </a>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="border-t border-white/30 pt-4">
          <p className="font-bold">© 2025 TANSA + WDCC</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
