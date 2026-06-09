import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Hero from './Component/Hero'
import Services from './Component/Services'
import FokeMon from './Component/FokeMon'
import Nav from './Component/Nav'
import Footer from './Component/Footer'
import Home from './pages/Home'
import Contact from './pages/Contact'
import Service from './pages/Service'
import About from './Component/About'
import WhyChoose from './Component/WhyChoose'




const App = () => {
  return (
    <BrowserRouter>
      <Nav />
         <Hero />
       
      <Services />
        <FokeMon />
        <About />
        <WhyChoose />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/service" element={<Service />} />
       
      </Routes>
    </BrowserRouter>
  )
}

export default App
