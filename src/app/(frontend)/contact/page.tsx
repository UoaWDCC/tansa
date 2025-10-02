// app/contact/page.tsx
import Image from 'next/image';
import { Mail, Instagram, Linkedin, Facebook } from "lucide-react";

export default function ContactPage() {
  return (
    <div>
      {/* Hero Section */}
      <div className="relative bg-tansa-blue h-[300px] flex items-center justify-center overflow-hidden">
        <h1 className="font-newkansas text-white text-6xl">Contact Us</h1>

        {/* Bear poking out */}
        <div className="absolute bottom-[-250px] right-[200px]">
          <Image
            src="/bears/running-pointing.svg"
            alt="Bear"
            width={420}
            height={420}
            className="object-contain mx-auto"
          />
        </div>
      </div>


      {/* Contact Info Section */}
      <div className="bg-tansa-cream min-h-[300px] flex flex-col items-center justify-center px-6">
        <h2 className="text-3xl font-newkansas mb-8 text-gray-600">Get in Touch</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-2xl w-full">
          {/* Email */}
          <a
            href="mailto:tansa.ausa@gmail.com"
            className="flex items-center gap-4 p-4 bg-white rounded-2xl shadow hover:shadow-lg transition"
          >
            <Mail className="text-tansa-blue w-8 h-8" />
            <span className="font-bold text-tansa-blue text-lg">tansa.ausa@gmail.com</span>
          </a>

          {/* Instagram */}
          <a
            href="https://instagram.com/tansa.uoa"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 p-4 bg-white rounded-2xl shadow hover:shadow-lg transition"
          >
            <Instagram className="text-pink-500 w-8 h-8" />
            <span className="font-bold text-tansa-blue text-lg">@tansa.uoa</span>
          </a>

          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/company/taiwanese-newzealand-students-association"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 p-4 bg-white rounded-2xl shadow hover:shadow-lg transition"
          >
            <Linkedin className="text-blue-700 w-8 h-8" />
            <span className="font-bold text-tansa-blue text-lg">LinkedIn</span>
          </a>

          {/* Facebook */}
          <a
            href="https://www.facebook.com/TANSA.UoA"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 p-4 bg-white rounded-2xl shadow hover:shadow-lg transition"
          >
            <Facebook className="text-blue-600 w-8 h-8" />
            <span className="font-bold text-tansa-blue text-lg">Facebook</span>
          </a>
        </div>
      </div>
    </div>
  );
}
