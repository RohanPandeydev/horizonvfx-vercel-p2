'use client'

import Image from 'next/image'
import React from 'react'

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-transparent backdrop-blur-sm">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo with colored lines */}
          <div className="flex flex-col">
            {/* Colored horizontal lines (TV test pattern) */}
            <div className="flex flex-col mb-1">
              <div className="h-0.5 w-12 bg-red-500"></div>
              <div className="h-0.5 w-12 bg-orange-500"></div>
              <div className="h-0.5 w-12 bg-yellow-500"></div>
              <div className="h-0.5 w-12 bg-green-500"></div>
              <div className="h-0.5 w-12 bg-blue-500"></div>
              <div className="h-0.5 w-12 bg-purple-500"></div>
            </div>
            {/* VHS ENTERTAINMENT text */}
            <div className="text-white font-bold">
             <Image src="logo.svg" alt="Logo" width={160} height={41} priority/>
            </div>
          </div>
          
          {/* Navigation Links */}
          <div className="flex items-center gap-8">
            <a href="#work" className="text-white hover:text-gray-300 transition-colors">
              ► Work
            </a>
            <a href="#contact" className="text-white hover:text-gray-300 transition-colors">
              ► Contact
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar