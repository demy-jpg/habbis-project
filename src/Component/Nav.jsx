import React from 'react'
import { Link } from 'react-router-dom'

const Nav = () => {
  return (
 
      <nav className="relative z-10 flex justify-center pt-4">
        <div className="flex items-center justify-between w-[700px] bg-white rounded-xl px-8 py-4 shadow-lg">
          <div className="flex items-center gap-2">
            <div className="text-blue-600 text-3xl">◉</div>
            <h2 className="text-3xl font-bold text-blue-600">
              FOKOREMOVALS
            </h2>
          </div>

          <ul className="flex gap-8 text-2xl text-gray-600">
            <li className="text-blue-600 cursor-pointer">Home</li>
            <li className="cursor-pointer hover:text-blue-600">Contact</li>
            <li className="cursor-pointer hover:text-blue-600">Service</li>
          </ul>
        </div>
      </nav>
    
  )
}

export default Nav
