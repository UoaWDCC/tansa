import React from 'react'
import './styles.css'
import Image from 'next/image'
import InstagramWidget from '@/components/InstagramWidget'

export default async function HomePage() {
  return (
    <div>
      <div className="bg-tansa-blue h-[70vh] relative">
        <header>
          <div className="relative w-full h-[70vh] ">
            {/* Covers banner of home */}
            <div className="relative w-3/4 h-[50vh]">
              {/* Covers 3/4 width banner of home for text */}
              <div className="relative  w-full h-1/8 top-[35%] flex items-center gap-4 pl-[15%]">
                <h1 className="text-[clamp(2rem,4vw,3rem)] text-white whitespace-nowrap">Hello!</h1>
                <h2 className="text-[clamp(1rem,2.2vw,1.2rem)] mt-5 text-white whitespace-nowrap">
                  We are
                </h2>
              </div>
              <div className="relative w-full h-1/4 top-[35%] flex items-center gap-4 pl-[15%]">
                <h3 className="text-[clamp(4rem,6vw,8rem)] text-white whitespace-nowrap">TANSA!</h3>
              </div>
              <div className="relative w-full h-1/4 top-[30%] flex items-center gap-4 pl-[15%]">
                <p className="text-[clamp(1rem,2vw,3rem)] text-white  whitespace-nowrap">
                  The largest socio-cultural club at the
                </p>
              </div>
              <div className="relative w-full h-1/4 top-[18%] flex items-center gap-4 pl-[15%]">
                <p className="text-[clamp(1rem,2vw,3rem)] text-white whitespace-nowrap">
                  University of Auckland and AUT.
                </p>
              </div>
              <div className="relative w-full h-1/4 top-[10%] flex items-center gap-4 pl-[15%] ">
                <button className="bg-white hover:bg-blue-70 text-tansa-blue py-2 px-4 rounded-full">
                  <a
                    href="https://linktr.ee/tansa.ausa?fbclid=PAZXh0bgNhZW0CMTEAAadiiDBVMHQN6ViFsa9FcHEMDebruppwam1b001rZ8SxoztA-DYHSPrfZoZVmA_aem_jYajqwBJtKpurNPDNyguDQ"
                    className="font-medium "
                  >
                    Join us!
                  </a>
                </button>
              </div>
            </div>
            <div className="absolute bottom-0 right-0 w-1/4 ">
              <Image src="./bears/bear 1.svg" alt="TANSA bear" width={600} height={600} />
            </div>
          </div>
        </header>
      </div>
      <InstagramWidget />
    </div>
  )
}
