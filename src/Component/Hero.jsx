import React from 'react'
import { FaPhoneAlt, FaEnvelope } from "react-icons/fa";

const Hero = () => {
  return (
    <section
      className="relative min-h-screen bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1600518464441-9154a4dea21b')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-10 min-h-[90vh] flex items-center justify-between">

        {/* Left Side */}
        <div className="max-w-2xl text-white">
          <p className="mb-8 text-lg font-medium">
            Trusted By 100+
          </p>

          <h1 className="text-7xl font-bold leading-tight">
            <span className="text-blue-500">
              Foko Removals
            </span>{" "}
            – Your
            <br />
            Move, Our Mission
          </h1>

          <p className="mt-6 text-2xl text-gray-200">
            Reliable man & van and removal services,
            based in Loughborough, serving across the UK.
          </p>

          <div className="mt-10 space-y-6">
            <div className="flex items-center gap-4 text-2xl">
              <div className="bg-white/20 p-4 rounded-full">
                <FaPhoneAlt />
              </div>
              <span className='text-lg/15 font-bold cursor-pointer'>07920021955</span>
            </div>

            <div className="flex items-center gap-4 text-2xl">
              <div className="bg-white/20 p-4 rounded-full">
                <FaEnvelope />
              </div>
              <span className='text-lg/15 font-bold cursor-pointer'>info@fokoremovals.co.uk</span>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className=".w-[520px] p-10 rounded-3xl backdrop-blur-lg bg-white/10 border border-white/20 text-white">

          <h2 className="text-4xl font-bold text-center mb-8">
            Client Contact Form
          </h2>

          <div className="space-y-6">
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full bg-transparent border-b border-gray-300 py-3 outline-none placeholder:text-gray-300"
            />

            <input
              type="email"
              placeholder="Enter your email"
              className="w-full bg-transparent border-b border-gray-300 py-3 outline-none placeholder:text-gray-300"
            />

            <input
              type="text"
              placeholder="Enter your phone number"
              className="w-full bg-transparent border-b border-gray-300 py-3 outline-none placeholder:text-gray-300"
            />

            <input
              type="text"
              placeholder="Enter your address"
              className="w-full bg-transparent border-b border-gray-300 py-3 outline-none placeholder:text-gray-300"
            />

            <textarea
              rows="4"
              placeholder="Type your message..."
              className="w-full bg-transparent border-b border-gray-300 py-3 outline-none resize-none placeholder:text-gray-300"
            ></textarea>

            <button className="w-full py-4 rounded-full text-xl font-semibold .bg-gradient-to-r from-blue-600 to-blue-400 hover:opacity-90">
              Send Message
            </button>
          </div>

        </div>
      </div>
    
    </section>
  )
}

export default Hero
