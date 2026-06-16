import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Hero from './Component/Hero'
import Navbar from './Component/Navbar'


function App() {
  return (
    <div className="min-h-screen bg-[#dce5b8]">
      <Navbar />
      <Hero />
    </div>
  );
}

export default App;