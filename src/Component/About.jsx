import React from 'react'

const About  = () => {
  return (
    <section className="relative w-full bg-[#1e60ff] px-6 py-16 text-white md:px-12 lg:px-24 lg:py-24">
      <div className="mx-auto max-w-7xl">
        {/* Main Header */}
        <h2 className="font-serif text-5xl md:text-2xl lg:text-5xl font-normal mb-5 tracking-wide">
          About Us
        </h2>

        {/* Content Layout */}
        <div className="flex flex-col justify-between gap-12 md:flex-row md:items-end">
          {/* Descriptive Text */}
          <p className="max-w-2xl text-base md:text-lg lg:text-xl font-normal leading-relaxed text-blue-50">
            At Foko Removals, we're all about making your move smooth and stress-free. 
            Whether it's a single item, full house, or office relocation — we've got 
            you covered with a friendly team, fair prices, and full insurance for 
            peace of mind.
          </p>

          {/* Right-aligned Tagline */}
          <div className="whitespace-nowrap text-right text-sm md:text-base lg:text-lg font-medium text-blue-100 opacity-90">
            Reliable, Fast & Timely
          </div>
        </div>
      </div>
    </section>
  );
}

export default About 
