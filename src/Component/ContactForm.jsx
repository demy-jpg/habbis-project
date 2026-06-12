import React from 'react'

const ContactForm = () => {
  return (
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
    
  )
}

export default ContactForm

