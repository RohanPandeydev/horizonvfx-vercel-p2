'use client'

import React from 'react'

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Darker Linear Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-950 via-blue-950 to-black"></div>
      
      {/* Video Container with RGB Border */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6">
        <div className="relative rounded-lg p-[3px] rgb-border">
          {/* Video Box */}
          <div className="relative bg-black rounded-lg aspect-video flex items-center justify-center overflow-hidden">
            <video 
              className="w-full h-full object-cover"
              autoPlay
              loop
              muted
              playsInline
            >
              <source src="https://www.horizonvfx.in/images/Video1.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero