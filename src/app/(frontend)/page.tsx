import React from 'react'
import './styles.css'
import Image from 'next/image'

export default async function HomePage() {
  return (
    <div>
      <div className="bg-tansa-blue h-[400px]">
        <header>
          <div className="relative h-[400px] w-full  top-0 ">
            <h1 className="text-xl absolute top-15 left-65">Hello! We are TANSA!</h1>
            <p className=" absolute top-40 left-65 text-[clamp(1rem,3vw,2.5rem)]">
              We are the largest socio-cultural club at the University of Auckland and AUT.
            </p>
            <div className="bear">
              <Image
                src="./bears/bear 1.svg"
                alt="TANSA bear"
                width={300}
                height={300}
                className="absolute  bottom-0 right-0 w-[clamp(150px,20vw,300px)]"
              />
            </div>
          </div>
        </header>
      </div>

      <div className="bg-tansa-cream h-[600px]"></div>
    </div>
  )
}
